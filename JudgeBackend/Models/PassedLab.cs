using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JudgeBackend.Models
{
    public class PassedLab
    {
        [Key]
        public int ID { get; set; }

        // Foreign Key - StudentPaper (ensuring score is tied to a paper)
        [ForeignKey("StudentPaperID")]
        public int StudentPaperID { get; set; }
        public StudentPaper StudentPaper { get; set; } = default!;

        // Foreign Key - Lab that was passed
        [ForeignKey("LabID")]
        public int LabID { get; set; }
        public Lab Lab { get; set; } = default!;
    }
}
