using JudgeBackend.DTO;
using JudgeBackend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("papers")]
[ApiController]
// [Authorize]
public class PaperController : ControllerBase
{
    private readonly IPaperService _paperService;
    public PaperController(IPaperService paperService)
    {
        _paperService = paperService;
    }
    
    /// <summary>
    /// Endpoint to retrieve all papers. Accessible by all authenticated users.
    /// </summary>
    /// <returns>List of all papers.</returns>
    [HttpGet]
    public async Task<IActionResult> GetPapers()
    {
        var papers = await _paperService.GetAllPapers();
        return Ok(papers);
    }

    /// <summary>
    /// Endpoint to create a new paper. Accessible by Admins and Teachers.
    /// </summary>
    /// <param name="paper">The paper details for creation.</param>
    /// <returns>ActionResult indicating the result of the paper creation attempt.</returns>
    [HttpPost]
    public async Task<IActionResult> CreatePaper(PaperCreate paper)
    {
        var newPaper = await _paperService.CreatePaper(paper);
        return CreatedAtAction(nameof(GetPapers), new { id = newPaper?.ID }, paper);
    }

    [HttpGet("{id}/scoreboard")]
    public async Task<IActionResult> GetPaperScoreboard(int id)
    {
        var scoreboard = await _paperService.GetScoreboard(id);
        if (scoreboard == null)
            return NotFound($"Couldn't find the paper by ID: {id}");
        return Ok(scoreboard);
    }
}