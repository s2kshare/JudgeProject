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

    /// <summary>
    /// Endpoint to retrieve all users. Accessible by Admins and Teachers.
    /// </summary>
    /// <returns>List of all users.</returns>
    [HttpGet]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<IActionResult> GetUsers()
    {
        // Retrieve all users from the user service
        var users = await _userService.GetAllUsers();
        // Return the list of users in the response
        return Ok(users);
    }

    /// <summary>
    /// Endpoint to create a new user. Accessible by Admins and Teachers.
    /// </summary>
    /// <param name="user">The user details for creation.</param>
    /// <returns>ActionResult indicating the result of the user creation attempt.</returns>
    [HttpPost]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<IActionResult> CreateUser(UserCreate user)
    {
        // Call the user service to create a new user
        var newuser = await _userService.CreateUser(user);
        
        // Return a Created response with the new user's ID if creation was successful
        return CreatedAtAction(nameof(GetUsers), new { id = newuser?.ID }, user);
    }

    /// <summary>
    /// Endpoint for Students to view enrolled papers and labs
    /// </summary>
    /// <returns>List of papers and labs enrolled in</returns>
    [HttpGet("student-home")]
    [Authorize(Roles = "Student,Admin")]
    public async Task<IActionResult> GetStudentPapersAndLabs()
    {
        Console.WriteLine("[!] Initialized");
        // Check if user is authenticated
        if (!User.Identity!.IsAuthenticated)
            return Unauthorized("User is not Logged In. Please Login.");

        // Get the username from the ClaimsPrincipal
        // var username = User.Identity.Name;
        var username = "s2k";
        if (string.IsNullOrEmpty(username))
            return BadRequest("Username is Null or Empty.");
        Console.WriteLine(username);

        // Check if the user exists
        if (await _userService.UserExists(username) == false)
            return BadRequest("Invalid user session. Either Cookie has Expired or User is not logged in. Please Login Again.");

        // Get the student with enrolled papers and labs from the database
        var student = await _userService.GetStudentWithPaperAndLabs(username);
        if (student == null)
            return NotFound("No papers were found for this student.");

        // Create a result object to return
        var result = new
        {
            papers = student.EnrolledPapers.Select(p => new
            {
                paperID = p.Paper.ID,
                paperName = p.Paper.Name,
                labs = p.Paper.Labs.Select(l => new
                {
                    labID = l.ID,
                    labName = l.Name,
                    labNumber = l.Number,
                    labDescription = l.Description
                }).ToList()
            }).ToList()
        };

        // Return the result
        return Ok(result);
    }

    /// <summary>
    /// Endpoint to enroll a student in a paper. Accessible by Admins and Teachers.
    /// </summary>
    /// <param name="request">The enrollment request containing student and paper IDs.</param>
    /// <returns>ActionResult indicating the result of the enrollment attempt.</returns>
    [HttpPost("enroll")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<IActionResult> EnrollStudent([FromBody] StudentEnrollmentRequest request)
    {
        // Call the user service to enroll the student in the specified paper
        var result = await _userService.EnrollStudentInPaper(request.StudentID, request.PaperID);

        // Return Ok response if enrollment was successful, otherwise return BadRequest
        return result ? Ok("Student enrolled successfully.") : BadRequest("Failed to enroll student.");
    }

    /// <summary>
    /// Endpoint to remove a student from a paper. Accessible by Admins and Teachers.
    /// </summary>
    /// <param name="request">The enrollment request containing student and paper IDs.</param>
    /// <returns>ActionResult indicating the result of the removal attempt.</returns>
    [HttpDelete("enroll")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<IActionResult> RemoveStudent([FromBody] StudentEnrollmentRequest request)
    {
        // Call the user service to remove the student from the specified paper
        var result = await _userService.RemoveStudentFromPaper(request.StudentID, request.PaperID);

        // Return Ok response if removal was successful, otherwise return NotFound
        return result ? Ok("Student removed successfully.") : NotFound("Student not found in this paper.");
    }
}