using System.Security.Claims;
using JudgeBackend.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IUserService _userService;
    public AuthController(IUserService userService)
    {
        _userService = userService;
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