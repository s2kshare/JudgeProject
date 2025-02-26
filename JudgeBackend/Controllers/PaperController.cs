using JudgeBackend.DTO;
using JudgeBackend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("papers")]
[ApiController]
[Authorize]
public class PaperController : ControllerBase
{
    private readonly IPaperService _paperService;
    public PaperController(IPaperService paperService)
    {
        _paperService = paperService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetPapers() => Ok(await _paperService.GetAllPapers());

    [HttpPost]
    public async Task<IActionResult> CreatePaper(PaperCreate paper)
    {
        var newPaper = await _paperService.CreatePaper(paper);
        return CreatedAtAction(nameof(GetPapers), new { id = newPaper?.ID }, paper);
    }
}