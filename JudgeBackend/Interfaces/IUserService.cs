using JudgeBackend.DTO;
using JudgeBackend.Models;

public interface IUserService
{
    Task<User?> ValidateUser(string username, string password);
    Task<User?> CreateUser(UserCreate user);
    Task<List<UserDTO>> GetAllUsers();
}

