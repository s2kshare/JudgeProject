using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JudgeBackend.Migrations
{
    /// <inheritdoc />
    public partial class StudentPapersDBSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentPaper_Papers_PaperID",
                table: "StudentPaper");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentPaper_Users_StudentID",
                table: "StudentPaper");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentPaper",
                table: "StudentPaper");

            migrationBuilder.RenameTable(
                name: "StudentPaper",
                newName: "StudentPapers");

            migrationBuilder.RenameIndex(
                name: "IX_StudentPaper_StudentID",
                table: "StudentPapers",
                newName: "IX_StudentPapers_StudentID");

            migrationBuilder.RenameIndex(
                name: "IX_StudentPaper_PaperID",
                table: "StudentPapers",
                newName: "IX_StudentPapers_PaperID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentPapers",
                table: "StudentPapers",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentPapers_Papers_PaperID",
                table: "StudentPapers",
                column: "PaperID",
                principalTable: "Papers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentPapers_Users_StudentID",
                table: "StudentPapers",
                column: "StudentID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentPapers_Papers_PaperID",
                table: "StudentPapers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentPapers_Users_StudentID",
                table: "StudentPapers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentPapers",
                table: "StudentPapers");

            migrationBuilder.RenameTable(
                name: "StudentPapers",
                newName: "StudentPaper");

            migrationBuilder.RenameIndex(
                name: "IX_StudentPapers_StudentID",
                table: "StudentPaper",
                newName: "IX_StudentPaper_StudentID");

            migrationBuilder.RenameIndex(
                name: "IX_StudentPapers_PaperID",
                table: "StudentPaper",
                newName: "IX_StudentPaper_PaperID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentPaper",
                table: "StudentPaper",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentPaper_Papers_PaperID",
                table: "StudentPaper",
                column: "PaperID",
                principalTable: "Papers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentPaper_Users_StudentID",
                table: "StudentPaper",
                column: "StudentID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
