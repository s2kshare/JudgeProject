namespace JudgeBackend.DTO
{
    public class ScoreboardDTO
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; } = default!;
        public int Score { get; set; }
        public int PassedLabs { get; set; }
    }
}