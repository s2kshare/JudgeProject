using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JudgeBackend.Models
{
    public class StudentPaper
    {
        [Key]
        public int ID { get; set; }
        public int Score { get; set; } = 0;

        #region Navigation Properties
        [ForeignKey("StudentID")]
        public int StudentID { get; set; }
        public Student Student { get; set; } = default!;

        [ForeignKey("PaperID")]
        public int PaperID { get; set; }
        public Paper Paper { get; set; } = default!;
        public List<PassedLab> PassedLabs { get; set; } = new List<PassedLab>();
        #endregion

    }
}