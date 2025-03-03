using System.Security.Claims;
using JudgeBackend.DTO;
using JudgeBackend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("users")]
[ApiController]
[Authorize]
public class UserController : Controller
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<IActionResult> GetUsers() => Ok(await _userService.GetAllUsers());

    [HttpPost]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<IActionResult> CreateUser(UserCreate user)
    {
        var newuser = await _userService.CreateUser(user);
        return CreatedAtAction(nameof(GetUsers), new { id = newuser?.ID}, user);
    }

    // Student Endpoint Grab User Papers and Labs
    [HttpGet("papers-labs")]
    public async Task<IActionResult> GetUserPapersAndLabs()
    {
        if (!User.Identity!.IsAuthenticated) return Unauthorized("User is not Logged In. Please Login.");

        var username = User.Identity.Name;
        var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(role))
            return Unauthorized("Invalid user session.");

        if (role != "Student") return Forbid("Access to this Endpoint is Denied. Only Students can retrieve enrolled papers.");

        var student = await _userService.GetStudentByUsername(username);

        // Map enrolled papers and labs
        var result = student!.EnrolledPapers.Select(p => new
        {
            PaperID = p.Paper.ID,
            PaperName = p.Paper.Name,
            Labs = p.Paper.Labs.Select(l => new
            {
                LabID = l.ID,
                LabName = l.Name,
                LabDescription = l.Description
            }).ToList()
        }).ToList();

        return Ok(result);
    }
}