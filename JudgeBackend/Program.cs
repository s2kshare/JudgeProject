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
builder.Services.AddScoped<IUploadService, UploadService>();
builder.Services.AddScoped<ISubmissionService, SubmissionService>();
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
        options.ExpireTimeSpan = TimeSpan.FromHours(5); // Expiration time
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
    SeedDummyData(dbContext);
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

static void SeedDummyData(ApplicationDbContext dbContext)
{
    if (!dbContext.Users.Any(u => u.Username == "teacher1"))
    {
        var teacher = new Teacher
        {
            Username = "teacher1",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
            Role = "Teacher",
            Email = "teacher1@school.com",
            FirstName = "John",
            LastName = "Doe"
        };

        dbContext.Users.Add(teacher);
        dbContext.SaveChanges();
        Console.WriteLine("[✅] Teacher Created!");
    }

    var teacherUser = dbContext.Users.OfType<Teacher>().FirstOrDefault(t => t.Username == "teacher1");

    if (!dbContext.Papers.Any(p => p.Name == "Introduction to Algorithms"))
    {
        var paper = new Paper
        {
            Name = "Introduction to Algorithms",
            TeacherID = teacherUser!.ID
        };

        dbContext.Papers.Add(paper);
        dbContext.SaveChanges();
        Console.WriteLine("[✅] Paper Created!");
    }

    var paperEntity = dbContext.Papers.FirstOrDefault(p => p.Name == "Introduction to Algorithms");

    if (!dbContext.Labs.Any(l => l.PaperID == paperEntity!.ID))
    {
        var labs = new List<Lab>
        {
            new Lab { Name = "Sorting Algorithms", Description = "Lab on sorting techniques", PaperID = paperEntity!.ID, Input="", ExpectedOutput = "" },
            new Lab { Name = "Graph Theory", Description = "Exploring graphs and shortest path", PaperID = paperEntity!.ID, Input = "", ExpectedOutput = "" },
            new Lab { Name = "Dynamic Programming", Description = "Practice with DP problems", PaperID = paperEntity!.ID, Input = "", ExpectedOutput = "" }
        };

        dbContext.Labs.AddRange(labs);
        dbContext.SaveChanges();
        Console.WriteLine("[✅] Labs Created!");
    }

    if (!dbContext.Users.Any(u => u.Username == "student1"))
    {
        var student = new Student
        {
            Username = "student1",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
            Role = "Student",
            Email = "student1@school.com",
            FirstName = "Alice",
            LastName = "Smith"
        };

        dbContext.Users.Add(student);
        dbContext.SaveChanges();
        Console.WriteLine("[✅] Student Created!");
    }

    var studentUser = dbContext.Users.OfType<Student>().FirstOrDefault(s => s.Username == "student1");

    if (!dbContext.StudentPapers.Any(sp => sp.ID == studentUser!.ID && sp.PaperID == paperEntity!.ID))
    {
        var enrollment = new StudentPaper
        {
            StudentID = studentUser!.ID,
            PaperID = paperEntity!.ID
        };

        dbContext.StudentPapers.Add(enrollment);
        dbContext.SaveChanges();
        Console.WriteLine("[✅] Student Enrolled in Paper!");
    }
}


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