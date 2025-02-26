using JudgeBackend.DTO;

public interface ILabService
{
    Task<List<LabDTO>> GetAllLabsAsync();
    Task<LabDTO?> GetLabByIdAsync(int id);
    Task<List<LabDTO>> GetLabsByPaperIdAsync(int paperId);
    Task<LabDTO> CreateLabAsync(LabCreate labCreate);
    Task<bool> UpdateLabAsync(int id, LabUpdate labUpdate);
    Task<bool> DeleteLabAsync(int id);
}