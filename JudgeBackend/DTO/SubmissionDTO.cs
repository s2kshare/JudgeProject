    public class SubmissionDTO
    {
        public string SourceCode { get; set; } = default!;
        public string Output { get; set; } = default!;
        public int StudentID { get; set; }
        public int LabID { get; set; }
    }