using JudgeBackend.Models;

public class JudgeResponse
{
    public SubmissionResult? Result { get; set; } = default!;
    public int labID { get; set; }
    public string? source_code { get; set; } = default!;
    public string? std_out { get; set; }
    public string? std_err { get; set; }
    public int? exit_code { get; set; }
    public DateTime submittedAt { get; set; }
}