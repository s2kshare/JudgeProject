using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JudgeBackend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Papers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TeacherID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Papers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Papers_Users_TeacherID",
                        column: x => x.TeacherID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Labs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Input = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpectedOutput = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaperID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Labs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Labs_Papers_PaperID",
                        column: x => x.PaperID,
                        principalTable: "Papers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentPapers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    PaperID = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentPapers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_StudentPapers_Papers_PaperID",
                        column: x => x.PaperID,
                        principalTable: "Papers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentPapers_Users_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Submissions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SourceCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Result = table.Column<int>(type: "int", nullable: false),
                    Output = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubmissionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    LabID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submissions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Submissions_Labs_LabID",
                        column: x => x.LabID,
                        principalTable: "Labs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Submissions_Users_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PassedLab",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentPaperID = table.Column<int>(type: "int", nullable: false),
                    LabID = table.Column<int>(type: "int", nullable: false),
                    StudentPaperID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PassedLab", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PassedLab_Labs_LabID",
                        column: x => x.LabID,
                        principalTable: "Labs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassedLab_StudentPapers_StudentPaperID",
                        column: x => x.StudentPaperID,
                        principalTable: "StudentPapers",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PassedLab_StudentPapers_StudentPaperID1",
                        column: x => x.StudentPaperID1,
                        principalTable: "StudentPapers",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Labs_PaperID",
                table: "Labs",
                column: "PaperID");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TeacherID",
                table: "Papers",
                column: "TeacherID");

            migrationBuilder.CreateIndex(
                name: "IX_PassedLab_LabID",
                table: "PassedLab",
                column: "LabID");

            migrationBuilder.CreateIndex(
                name: "IX_PassedLab_StudentPaperID",
                table: "PassedLab",
                column: "StudentPaperID");

            migrationBuilder.CreateIndex(
                name: "IX_PassedLab_StudentPaperID1",
                table: "PassedLab",
                column: "StudentPaperID1");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPapers_PaperID",
                table: "StudentPapers",
                column: "PaperID");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPapers_StudentID",
                table: "StudentPapers",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_LabID",
                table: "Submissions",
                column: "LabID");

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_StudentID",
                table: "Submissions",
                column: "StudentID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PassedLab");

            migrationBuilder.DropTable(
                name: "Submissions");

            migrationBuilder.DropTable(
                name: "StudentPapers");

            migrationBuilder.DropTable(
                name: "Labs");

            migrationBuilder.DropTable(
                name: "Papers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
