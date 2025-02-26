using System.Security.Claims;
using JudgeBackend.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class LabController : Controller
{
    private readonly ILabService _labService;
    public LabController(ILabService labService)
    {
        _labService = labService;
    }

    // ✅ Get all labs (Admins & Teachers)
    [HttpGet]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult<List<LabDTO>>> GetAllLabs()
    {
        var labs = await _labService.GetAllLabsAsync();
        return Ok(labs);
    }

    // ✅ Get a specific lab by ID (Admins, Teachers, and Students)
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,Teacher,Student")]
    public async Task<ActionResult<LabDTO>> GetLabById(int id)
    {
        var lab = await _labService.GetLabByIdAsync(id);
        if (lab == null)
            return NotFound();

        return Ok(lab);
    }

    // ✅ Get labs by paper ID (Admins & Teachers)
    [HttpGet("paper/{paperId}")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult<List<LabDTO>>> GetLabsByPaperId(int paperId)
    {
        var labs = await _labService.GetLabsByPaperIdAsync(paperId);
        return Ok(labs);
    }

    // ✅ Create a new lab (Admin only)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<LabDTO>> CreateLab([FromBody] LabCreate labDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var newLab = await _labService.CreateLabAsync(labDto);
        return CreatedAtAction(nameof(GetLabById), new { id = newLab.ID }, newLab);
    }

    // ✅ Update a lab (Admin only)
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateLab(int id, [FromBody] LabUpdate labDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _labService.UpdateLabAsync(id, labDto);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    // ✅ Delete a lab (Admin only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteLab(int id)
    {
        var deleted = await _labService.DeleteLabAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}