using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Szakdoga8.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Translation",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InputText = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    OutputTextGoogle = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    OutputTextGPT = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    SourceLanguage = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    TargetLanguage = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    FeedbackGoogle = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    FeedbackGPT = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Feedback = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Translat__3214EC070A63DEA6", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Translation");
        }
    }
}
