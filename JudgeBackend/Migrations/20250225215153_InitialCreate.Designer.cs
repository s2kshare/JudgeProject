﻿// <auto-generated />
using System;
using JudgeBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace JudgeBackend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250225215153_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("JudgeBackend.Models.Lab", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExpectedOutput")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Input")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("PaperID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("PaperID");

                    b.ToTable("Labs");
                });

            modelBuilder.Entity("JudgeBackend.Models.Paper", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TeacherID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("TeacherID");

                    b.ToTable("Papers");
                });

            modelBuilder.Entity("JudgeBackend.Models.StudentPaper", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("PaperID")
                        .HasColumnType("int");

                    b.Property<int>("StudentID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("PaperID");

                    b.HasIndex("StudentID");

                    b.ToTable("StudentPaper");
                });

            modelBuilder.Entity("JudgeBackend.Models.Submission", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("LabID")
                        .HasColumnType("int");

                    b.Property<string>("Output")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Result")
                        .HasColumnType("int");

                    b.Property<string>("SourceCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StudentID")
                        .HasColumnType("int");

                    b.Property<DateTime>("SubmissionDate")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("LabID");

                    b.HasIndex("StudentID");

                    b.ToTable("Submissions");
                });

            modelBuilder.Entity("JudgeBackend.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Users");

                    b.HasDiscriminator().HasValue("User");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("JudgeBackend.Models.Admin", b =>
                {
                    b.HasBaseType("JudgeBackend.Models.User");

                    b.HasDiscriminator().HasValue("Admin");
                });

            modelBuilder.Entity("JudgeBackend.Models.Student", b =>
                {
                    b.HasBaseType("JudgeBackend.Models.User");

                    b.HasDiscriminator().HasValue("Student");
                });

            modelBuilder.Entity("JudgeBackend.Models.Teacher", b =>
                {
                    b.HasBaseType("JudgeBackend.Models.User");

                    b.HasDiscriminator().HasValue("Teacher");
                });

            modelBuilder.Entity("JudgeBackend.Models.Lab", b =>
                {
                    b.HasOne("JudgeBackend.Models.Paper", "Paper")
                        .WithMany("Labs")
                        .HasForeignKey("PaperID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Paper");
                });

            modelBuilder.Entity("JudgeBackend.Models.Paper", b =>
                {
                    b.HasOne("JudgeBackend.Models.Teacher", "Teacher")
                        .WithMany("Papers")
                        .HasForeignKey("TeacherID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("JudgeBackend.Models.StudentPaper", b =>
                {
                    b.HasOne("JudgeBackend.Models.Paper", "Paper")
                        .WithMany("EnrolledStudents")
                        .HasForeignKey("PaperID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JudgeBackend.Models.Student", "Student")
                        .WithMany("EnrolledPapers")
                        .HasForeignKey("StudentID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Paper");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("JudgeBackend.Models.Submission", b =>
                {
                    b.HasOne("JudgeBackend.Models.Lab", "Lab")
                        .WithMany("Submissions")
                        .HasForeignKey("LabID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JudgeBackend.Models.Student", "Student")
                        .WithMany("Submissions")
                        .HasForeignKey("StudentID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Lab");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("JudgeBackend.Models.Lab", b =>
                {
                    b.Navigation("Submissions");
                });

            modelBuilder.Entity("JudgeBackend.Models.Paper", b =>
                {
                    b.Navigation("EnrolledStudents");

                    b.Navigation("Labs");
                });

            modelBuilder.Entity("JudgeBackend.Models.Student", b =>
                {
                    b.Navigation("EnrolledPapers");

                    b.Navigation("Submissions");
                });

            modelBuilder.Entity("JudgeBackend.Models.Teacher", b =>
                {
                    b.Navigation("Papers");
                });
#pragma warning restore 612, 618
        }
    }
}
