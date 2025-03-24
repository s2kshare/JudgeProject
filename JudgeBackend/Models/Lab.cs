using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JudgeBackend.Models
{
    public class Lab
    {
        [Key] public int ID { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public int Number { get; set; }
        public string Input { get; set; } = default!;
        public string ExpectedOutput { get; set; } = default!;

        #region Navigation Properties
        // Each lab is associated with one paper.
        [ForeignKey("PaperID")]
        public int PaperID { get; set; }
        public Paper Paper { get; set; } = default!;
        

        // One-to-many: a lab can have many submissions.
        public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
        #endregion
    }
}