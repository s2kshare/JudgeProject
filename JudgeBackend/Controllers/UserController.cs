using System.Security.Claims;
using JudgeBackend.DTO;
using JudgeBackend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("users")]
[ApiController]
[Authorize(Roles = "Admin")]
public class UserController : Controller
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers() => Ok(await _userService.GetAllUsers());

    [HttpPost]
    public async Task<IActionResult> CreateUser(UserCreate user)
    {
        var newuser = await _userService.CreateUser(user);
        return CreatedAtAction(nameof(GetUsers), new { id = newuser?.ID}, user);
    }
}