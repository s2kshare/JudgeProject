using JudgeBackend.DTO;

public interface ISubmissionService
{
    Task<List<SubmissionDTO>> GetAllSubmissionsAsync();
    Task<SubmissionDTO?> GetSubmissionByIdAsync(int id);
    Task<List<SubmissionDTO>> GetSubmissionsByLabIdAsync(int labId);
    Task<SubmissionDTO> SubmitLabAsync(SubmissionCreate submissionDto);
    Task<bool> DeleteSubmissionAsync(int id);
}