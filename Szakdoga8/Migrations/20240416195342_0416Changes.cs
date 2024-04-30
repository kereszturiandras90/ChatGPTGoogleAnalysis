using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Szakdoga8.Migrations
{
    /// <inheritdoc />
    public partial class _0416Changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateTimeOfTranslation",
                table: "Translation",
                type: "datetime",
                nullable: true,
                defaultValueSql: "(getdate())");

            migrationBuilder.AddColumn<double>(
                name: "GPTBLEU",
                table: "Translation",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "GoogleBLEU",
                table: "Translation",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReferenceTranslation",
                table: "Translation",
                type: "nvarchar(4000)",
                maxLength: 4000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTimeOfTranslation",
                table: "Translation");

            migrationBuilder.DropColumn(
                name: "GPTBLEU",
                table: "Translation");

            migrationBuilder.DropColumn(
                name: "GoogleBLEU",
                table: "Translation");

            migrationBuilder.DropColumn(
                name: "ReferenceTranslation",
                table: "Translation");
        }
    }
}
