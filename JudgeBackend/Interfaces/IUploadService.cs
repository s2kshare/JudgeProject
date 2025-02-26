using System.Threading.Tasks;
using JudgeBackend.DTO;
using Microsoft.AspNetCore.Http;

public interface IUploadService
{
    Task<SubmissionValidate> ValidateSubmissionFileAsync(IFormFile file);
}
