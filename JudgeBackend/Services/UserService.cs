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
                    var newStudent = new Teacher
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

        public async Task<Student?> GetUserWithPaperAndLabs(int userID)
            => await _context.Students.Include(s => s.EnrolledPapers).ThenInclude(sp => sp.Paper).ThenInclude(p => p.Labs).FirstOrDefaultAsync(s => s.ID == userID);

        public async Task<Student?> GetStudentByUsername(string username)
        {
            var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(u => u.Username == username);
            return student;
        }
    }
}