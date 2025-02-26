public class JudgeRequest
{
    public string SourceCode { get; set; } = default!;
    public string Language { get; set; } = default!;
    public string Input { get; set; } = default!;
    public string ExpetedOutput { get; set; } = default!;
}