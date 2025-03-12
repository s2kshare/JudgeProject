using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JudgeBackend.Models
{
    public class Paper
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; } = default!;
        public string? Code { get; set; }
    
        // * The Teacher managing this paper
        [ForeignKey("TeacherID")]
        public int TeacherID { get; set; }
        public Teacher Teacher { get; set; } = default!;

        public List<Lab> Labs { get; set; } = new List<Lab>();

        public List<StudentPaper> EnrolledStudents { get; set; } = [];
    }
}