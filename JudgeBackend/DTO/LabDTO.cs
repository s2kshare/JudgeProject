namespace JudgeBackend.DTO
{
    public class LabDTO
    {
        public int ID { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public int PaperID { get; set; }
    }

}