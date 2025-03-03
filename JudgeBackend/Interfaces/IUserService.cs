using JudgeBackend.DTO;
using JudgeBackend.Models;

public interface IUserService
{
    Task<User?> ValidateUser(string username, string password);
    Task<User?> CreateUser(UserCreate user);
    Task<List<UserDTO>> GetAllUsers();
    Task<Student?> GetStudentWithPaperAndLabs(string username);
    Task<Student?> GetStudentByUsername(string username);
    Task<bool> EnrollStudentInPaper(int studentID, int paperID);
    Task<bool> RemoveStudentFromPaper(int studentID, int paperID);
    Task<bool> UserExists(string username);
}

