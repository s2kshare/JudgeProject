public class SubmissionCreate
{
    public int StudentID { get; set; }
    public int LabID { get; set; }
    public IFormFile SourceFile { get; set; } = default!;
    public string? Language { get; set; }
}