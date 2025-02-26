namespace JudgeBackend.DTO
{
    public class SubmissionValidate
    {
        public bool IsValid { get; set; }
        public string? Message { get; set; }
        public string? Language { get; set; }
    }
}