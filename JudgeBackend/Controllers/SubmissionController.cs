using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using JudgeBackend.DTO;

[Route("api/[controller]")]
[ApiController]
public class SubmissionController : Controller
{
    private readonly ISubmissionService _submissionService;
    private readonly IUploadService _uploadService;

    public SubmissionController(ISubmissionService submissionService, IUploadService uploadService)
    {
        _submissionService = submissionService;
        _uploadService = uploadService;
    }

    // ✅ Get all submissions (Admins & Teachers)
    [HttpGet]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult<List<SubmissionDTO>>> GetAllSubmissions()
    {
        var submissions = await _submissionService.GetAllSubmissionsAsync();
        return Ok(submissions);
    }

    // ✅ Get a specific submission by ID (Admins, Teachers, and the Student who submitted it)
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,Teacher,Student")]
    public async Task<ActionResult<SubmissionDTO>> GetSubmissionById(int id)
    {
        var submission = await _submissionService.GetSubmissionByIdAsync(id);
        if (submission == null)
            return NotFound();

        return Ok(submission);
    }

    // ✅ Get submissions by Lab ID (Admins & Teachers)
    [HttpGet("lab/{labId}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult<List<SubmissionDTO>>> GetSubmissionsByLabId(int labId)
    {
        var submissions = await _submissionService.GetSubmissionsByLabIdAsync(labId);
        return Ok(submissions);
    }

    // ✅ Submit a lab (Students only)
    [HttpPost]
    [Authorize(Roles = "Student")]
    public async Task<ActionResult<SubmissionDTO>> SubmitLab([FromForm] SubmissionCreate submissionDto)
    {
        SubmissionValidate validationUpload = await _uploadService.ValidateSubmissionFileAsync(submissionDto.SourceFile);
        if (!validationUpload.IsValid)
            return BadRequest(validationUpload.Message);

        var submission = await _submissionService.SubmitLabAsync(submissionDto);
        // TODO: Fix response

        return CreatedAtAction(nameof(GetSubmissionById), submission);
    }

    // ✅ Delete a submission (Admin only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteSubmission(int id)
    {
        var deleted = await _submissionService.DeleteSubmissionAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
