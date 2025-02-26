using JudgeBackend.DTO;

public class UploadService : IUploadService
{
    private static readonly Dictionary<string, string> ALLOWED_EXTENSIONS = new()
    {
        { ".cs", "C#" },
        { ".py", "Python" },
        { ".java", "Java" }
    };

    public Task<SubmissionValidate> ValidateSubmissionFileAsync(IFormFile file)
    {
        var fileName = file.FileName;
        var fileExtension = Path.GetExtension(fileName);

        if (!ALLOWED_EXTENSIONS.TryGetValue(fileExtension, out var language))
            return Task.FromResult(new SubmissionValidate
            {
                IsValid = false,
                Message = "Invalid file format."
            });

        if (file.Length > 5 * 1024 * 1024)
            return Task.FromResult(new SubmissionValidate
            {
                IsValid = false,
                Message = "Exceeds file size limit (5MB).",
                Language = language
            });

        return Task.FromResult(new SubmissionValidate
        {
            IsValid = true,
            Language = language
        });
    }
}
