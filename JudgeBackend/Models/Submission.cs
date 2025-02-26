using System.ComponentModel.DataAnnotations.Schema;

namespace JudgeBackend.Models
{
    public enum SubmissionResult
    {
        Success, Error, Failed
    }

    public class Submission
    {
        public int ID { get; set; }
        public string SourceCode { get; set; } = default!;
        public SubmissionResult Result { get; set; }
        public string Output { get; set; } = default!;
        public DateTime SubmissionDate { get; set; } = DateTime.Now;


        // * Each submission is made by a student
        [ForeignKey("StudentID")]
        public int StudentID { get; set; }
        public Student Student { get; set; } = default!;
    

        // * Each submission is for a specific lab
        [ForeignKey("LabID")]
        public int LabID { get; set; }
        public Lab Lab { get; set; } = default!;

    }
}