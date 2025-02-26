using JudgeBackend.Data;
using JudgeBackend.DTO;
using JudgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JudgeBackend.Services
{
    public class LabService : ILabService
    {
        private readonly ApplicationDbContext _context;
        public LabService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<LabDTO>> GetAllLabsAsync()
        {
            return await _context.Labs.Select(l => new LabDTO
            {
                ID = l.ID,
                Name = l.Name,
                Description = l.Description,
                PaperID = l.PaperID
            }).ToListAsync();
        }

        public async Task<LabDTO?> GetLabByIdAsync(int id)
        {
            return await _context.Labs
                .Where(l => l.ID == id)
                .Select(l => new LabDTO
                {
                    ID = l.ID,
                    Name = l.Name,
                    PaperID = l.PaperID
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<LabDTO>> GetLabsByPaperIdAsync(int paperId)
        {
            return await _context.Labs
                .Where(l => l.PaperID == paperId)
                .Select(l => new LabDTO
                {
                    ID = l.ID,
                    Name = l.Name,
                    PaperID = l.PaperID
                })
                .ToListAsync();
        }

        public async Task<LabDTO> CreateLabAsync(LabCreate labDto)
        {
            var newLab = new Lab
            {
                Name = labDto.Name,
                PaperID = labDto.PaperID
            };

            _context.Labs.Add(newLab);
            await _context.SaveChangesAsync();

            return new LabDTO
            {
                ID = newLab.ID,
                Name = newLab.Name,
                PaperID = newLab.PaperID
            };
        }

        public async Task<bool> UpdateLabAsync(int id, LabUpdate labDto)
        {
            var existingLab = await _context.Labs.FindAsync(id);
            if (existingLab == null)
                return false;

            existingLab.Name = labDto.Name;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteLabAsync(int id)
        {
            var lab = await _context.Labs.FindAsync(id);
            if (lab == null)
                return false;

            _context.Labs.Remove(lab);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}