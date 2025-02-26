using JudgeBackend.DTO;
using JudgeBackend.Models;

namespace JudgeBackend.Interfaces
{
    public interface IPaperService
    {
        Task<List<Paper>> GetAllPapers();                           // Admin & Teachers can list all papers
        Task<List<Paper>> GetPapersByTeacher(int teacherId);        // Teachers can get their papers
        Task<List<Paper>> GetPapersForStudent(int studentId);       // Students can view papers they are enrolled in
        Task<Paper?> GetPaperById(int paperId);                     // Anyone with access can fetch a specific paper
        Task<Paper?> CreatePaper(PaperCreate paper);                // Admin only
        Task<Paper?> UpdatePaper(int paperId, Paper updatedPaper);  // Admin only
        Task<bool> DeletePaper(int paperId);                        // Admin only
    }
}