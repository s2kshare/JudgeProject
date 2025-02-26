using System.ComponentModel.DataAnnotations;

namespace JudgeBackend.Models
{
    public class StudentPaper
    {
        [Key]
        public int ID { get; set; }

        public int StudentID { get; set; }
        public Student Student { get; set; } = default!;

        public int PaperID { get; set; }
        public Paper Paper { get; set; } = default!;
    }
}