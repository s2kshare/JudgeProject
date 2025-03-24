using JudgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JudgeBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Paper> Papers { get; set; }
        public DbSet<Lab> Labs { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<StudentPaper> StudentPapers { get; set; }
    

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Prevents cascading delete for Submission
            modelBuilder.Entity<Submission>()
                .HasOne(s => s.Student)
                .WithMany(s => s.Submissions)
                .HasForeignKey(s => s.StudentID)
                .OnDelete(DeleteBehavior.Restrict);

            // Prevents cascading delete for StudentPaper
            modelBuilder.Entity<StudentPaper>()
                .HasOne(sp => sp.Student)
                .WithMany(s => s.EnrolledPapers)
                .HasForeignKey(sp => sp.StudentID)
                .OnDelete(DeleteBehavior.Restrict);

            // Set one of the foreign keys to "NoAction" to avoid cascade conflict
            modelBuilder.Entity<PassedLab>()
                .HasOne(p => p.StudentPaper)
                .WithMany()
                .HasForeignKey(p => p.StudentPaperID)
                .OnDelete(DeleteBehavior.NoAction);  // or DeleteBehavior.SetNull
            modelBuilder.Entity<PassedLab>()
                .HasOne(p => p.Lab)
                .WithMany()
                .HasForeignKey(p => p.LabID)
                .OnDelete(DeleteBehavior.Cascade);  // Keep cascade for LabID
        }
    }
}