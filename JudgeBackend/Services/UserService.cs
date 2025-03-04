using System.Security.Cryptography;
using JudgeBackend.Data;
using JudgeBackend.DTO;
using JudgeBackend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace JudgeBackend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // Login Validation
        public async Task<User?> ValidateUser(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null || !VerifyPassword(password, user.PasswordHash)) return null;

            return user;
        }
        private bool VerifyPassword(string password, string storedHash) => BCrypt.Net.BCrypt.Verify(password, storedHash);

        // Register User
        public async Task<User?> CreateUser(UserCreate user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username)) return null;

            switch (user.Role)
            {
                case nameof(Admin):
                    return null;
                case nameof(Teacher):
                    var newTeacher = new Teacher
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Username = user.Username,
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password),
                        Role = user.Role
                    };

                    return AddUser(newTeacher);
                default:
                    var newStudent = new Student
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Username = user.Username,
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password),
                        Role = user.Role
                    };

                    return AddUser(newStudent);
            }
        }

        private User AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            return await _context.Users.Select(u => new UserDTO {
                ID = u.ID,
                Username = u.Username,
                Role = u.Role
            }).ToListAsync();
        }

        public async Task<Student?> GetStudentWithPaperAndLabs(string username)
        {
            return await _context.Students
                .Include(s => s.EnrolledPapers)
                .ThenInclude(sp => sp.Paper)
                .ThenInclude(p => p.Labs)
                .FirstOrDefaultAsync(s => s.Username == username);
        }

        public async Task<Student?> GetStudentByUsername(string username)
        {
            var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(u => u.Username == username);
            return student;
        }

        public async Task<bool> EnrollStudentInPaper(int studentID, int paperID)
        {
            Console.WriteLine("[!] Enrolling student in paper");
            Console.WriteLine("[!] Student ID: " + studentID);
            Console.WriteLine("[!] Paper ID: " + paperID);

            var users = await _context.Users.ToListAsync();
            foreach (var user in users)
            {
                Console.WriteLine("[!] User: " + user.ID + " | " + user.Username + " | " + user.Role);
            }

            var student = await _context.Users
                .OfType<Student>()  // This ensures you only get Student objects
                .Include(s => s.EnrolledPapers)
                .ThenInclude(sp => sp.Paper)
                .FirstOrDefaultAsync(s => s.ID == studentID);

            var paper = await _context.Papers.FindAsync(paperID);

            if (student == null)
            {
                Console.WriteLine($"[!] Student with ID {studentID} not found.");
                return false; // Or throw an exception or return an error result as needed
            }

            if (paper == null)
            {
                Console.WriteLine($"[!] Paper with ID {paperID} not found.");
                return false; // Or throw an exception or return an error result as needed
            }

            // Check if the student is already enrolled in the paper
            var existingEnrollment = await _context.StudentPapers
                .FirstOrDefaultAsync(sp => sp.StudentID == studentID && sp.PaperID == paperID);

            if (existingEnrollment != null)
            {
                Console.WriteLine("[!] Student already enrolled in this paper");
                return false; // Already enrolled
            }

            // Enroll the student
            var enrollment = new StudentPaper
            {
                StudentID = studentID,
                PaperID = paperID
            };

            _context.StudentPapers.Add(enrollment);
            await _context.SaveChangesAsync();
            Console.WriteLine("[!] Student enrolled successfully");
            return true;

        }

        public async Task<bool> RemoveStudentFromPaper(int studentID, int paperID)
        {
            var enrollment = await _context.StudentPapers
                .FirstOrDefaultAsync(sp => sp.StudentID == studentID && sp.PaperID == paperID);
    
            if (enrollment == null) return false; // Not found

            _context.StudentPapers.Remove(enrollment);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<bool> UserExists(string username)
        {
            return _context.Users.AnyAsync(u => u.Username == username);
        }
    }
}