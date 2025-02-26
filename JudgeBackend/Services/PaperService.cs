using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JudgeBackend.Data;
using JudgeBackend.DTO;
using JudgeBackend.Interfaces;
using JudgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JudgeBackend.Services
{
    public class PaperService : IPaperService
    {
        private readonly ApplicationDbContext _context;

        public PaperService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Paper>> GetAllPapers()
        {
            return await _context.Papers.ToListAsync();
        }

        public async Task<List<Paper>> GetPapersByTeacher(int teacherId)
        {
            return await _context.Papers
                .Where(p => p.TeacherID == teacherId)
                .ToListAsync();
        }

        public async Task<List<Paper>> GetPapersForStudent(int studentId)
        {
            return await _context.Papers
                .Where(p => p.EnrolledStudents.Any(s => s.ID == studentId))
                .ToListAsync();
        }

        public async Task<Paper?> GetPaperById(int paperId)
        {
            return await _context.Papers
                .Include(p => p.Labs) // Include Labs in query
                .FirstOrDefaultAsync(p => p.ID == paperId);
        }

        public async Task<Paper?> CreatePaper(PaperCreate paper)
        {
            var newPaper = new Paper
            {
                Name = paper.Name,
                TeacherID = paper.TeacherID != null ? paper.TeacherID.Value : 0
            };
            _context.Papers.Add(newPaper);
            await _context.SaveChangesAsync();
            return newPaper;
        }

        public async Task<Paper?> UpdatePaper(int paperId, Paper updatedPaper)
        {
            var existingPaper = await _context.Papers.FindAsync(paperId);
            if (existingPaper == null) return null;

            existingPaper.Name = updatedPaper.Name;
            existingPaper.TeacherID = updatedPaper.TeacherID;

            await _context.SaveChangesAsync();
            return existingPaper;
        }

        public async Task<bool> DeletePaper(int paperId)
        {
            var paper = await _context.Papers.FindAsync(paperId);
            if (paper == null) return false;

            _context.Papers.Remove(paper);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
