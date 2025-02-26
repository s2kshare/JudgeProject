using JudgeBackend.Enum;

public class JudgeResponse
{
    public SubmissionResult Result { get; set; } = default!;
    public string? std_out { get; set; }
    public string? std_err { get; set; }
    public int? exit_code { get; set; }
}