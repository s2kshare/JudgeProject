
using System.ComponentModel;
using JudgeBackend.Data;

namespace JudgeBackend.Services
{
    public class SubmissionService : ISubmissionService
    {
        private readonly ApplicationDbContext _context;
        public SubmissionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<bool> DeleteSubmissionAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<SubmissionDTO>> GetAllSubmissionsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SubmissionDTO?> GetSubmissionByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<SubmissionDTO>> GetSubmissionsByLabIdAsync(int labId)
        {
            throw new NotImplementedException();
        }

        public async Task<SubmissionDTO> SubmitLabAsync(SubmissionCreate submissionDto)
        {
            var lab = await _context.Labs.FindAsync(submissionDto.LabID);
            if (lab == null) throw new Exception("Lab not found");
            
            var source_code = ExtractCodeFromSubmissionFileAsync(submissionDto.SourceFile);
            if (source_code == null) throw new Exception("Source code not found");

            JudgeRequest request = new JudgeRequest
            {
                SourceCode = source_code,
                Language = submissionDto.Language!,
                Input = lab.Input,
                ExpetedOutput = lab.ExpectedOutput
            };

            // TODO: Implement submission VIA API

            throw new NotImplementedException();
        }

        private string ExtractCodeFromSubmissionFileAsync(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            return reader.ReadToEnd();
        }
    }
}