using JudgeBackend.Data;
using JudgeBackend.Interfaces;
using JudgeBackend.Models;
using JudgeBackend.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Service Dependency Injections
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPaperService, PaperService>();
builder.Services.AddScoped<ILabService, LabService>();
builder.Services.AddHttpContextAccessor();

// Allow CORS via Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // * Frontend URL
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Authentication + Auth
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.LoginPath  = "/auth/login";
        options.LogoutPath = "/auth/logout";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromHours(1); // Expiration time
        options.SlidingExpiration = true; // Refresh expiration on activity
    });
builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("JudgeDbConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

// Ensure database is created and seed Admin
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
    SeedAdminUser(dbContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();

static void SeedAdminUser(ApplicationDbContext dbContext)
{
    if (!dbContext.Users.Any(u => u.Username == "admin"))
    {
        var admin = new Admin
        {
            Username = "admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin"),
            Role = "Admin",
            Email = "admin@localhost.com",
            FirstName = "Admin",
            LastName = "User"
        };

        dbContext.Users.Add(admin);
        dbContext.SaveChanges();
        Console.WriteLine("[✅] Admin User Created!");
    }
}