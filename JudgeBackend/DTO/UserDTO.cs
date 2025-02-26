namespace JudgeBackend.DTO
{
    public class UserDTO
    {
        public int ID { get; set; }
        public string Username { get; set; } = default!;
        public string Role { get; set; } = default!;
    }
}