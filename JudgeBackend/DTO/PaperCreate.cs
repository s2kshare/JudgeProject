namespace JudgeBackend.DTO
{
    public class PaperCreate
    {
        public string Name { get; set; } = default!;
        public int? TeacherID { get; set; }
    }
}