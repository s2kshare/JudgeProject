using System.Security.Claims;
using JudgeBackend.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

[Route("auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;

    public AuthController(IUserService userService, IConfiguration configuration)
    {
        _userService = userService;
        _configuration = configuration;
    }

    [HttpGet("check-services")]
    public async Task<IActionResult> DashboardUtils()
    {
        bool apiActive = false;
        bool dbActive = false;
        string apiMessage = string.Empty;
        string dbMessage = string.Empty;


        // Ignore SSL Errors (for local development only):
        var httpClientHandler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
        };

        using var httpClient = new HttpClient(httpClientHandler);
        #region  Docker Judge API Ping
        try
        {
            // Pinging Docker Judge API
            var response = await httpClient.GetAsync("http://localhost:5000/ping");
            if (response.IsSuccessStatusCode)
                apiActive = true;
            else
                return StatusCode((int)response.StatusCode, "Ping failed");
        }
        catch (HttpRequestException e)
        {
            apiMessage = e.Message;
        }
        #endregion
    
        #region Docker Judge DB Ping
        try {
            string sql_connection_string = _configuration.GetConnectionString("JudgeDbConnection");

            using (var connection = new SqlConnection(sql_connection_string))
            {
                await connection.OpenAsync();
                dbActive = true;
            }
        }
        catch (Exception e)
        {
            dbMessage = e.Message;
        }
        #endregion

        if (!dbActive || !apiActive)
            return BadRequest(new { apiActive, dbActive, apiMessage, dbMessage });

        return Ok(new { apiActive, dbActive  });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Invalid Request. Username and password are required.");
        }

        var user = await _userService.ValidateUser(request.Username, request.Password);
        if (user == null)
        {
            return Unauthorized("Invalid Username or Password.");
        }

        // Claims and Sign In
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };
        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

        return Ok(new { message = "Login Successful", user.ID, user.Role, user.Username });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { message = "Logout Successful" });
    }
}