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
    
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Prevents cascading delete
            modelBuilder.Entity<Submission>()
                .HasOne(s => s.Student)
                .WithMany(s => s.Submissions)
                .HasForeignKey(s => s.StudentID)
                .OnDelete(DeleteBehavior.Restrict);

            // Prevents cascading delete
            modelBuilder.Entity<StudentPaper>()
                .HasOne(sp => sp.Student)
                .WithMany(s => s.EnrolledPapers)
                .HasForeignKey(sp => sp.StudentID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}