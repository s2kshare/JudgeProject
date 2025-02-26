using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace JudgeBackend.Models
{
    public abstract class User
    {
        [Key] public int ID { get; set; }
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        [EmailAddress, Required]
        public string Email { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        public string Role { get; set; } = default!;
    }

    public class Student : User
    {
        // * Many to Many: a Student is enrolled in many papers.
        public List<StudentPaper> EnrolledPapers { get; set; } = [];

        // * One to Many: a Student can submit many submissions
        public List<Submission> Submissions { get; set; } = new List<Submission>();
    }

    public class Teacher : User
    {
        // * One to Many: a Teacher manages multiple papers
        public List<Paper> Papers { get; set; } = new List<Paper>();
    }

    public class Admin : User
    {

    }

}