using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ChangedColumnNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Reservation",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Reservation",
                newName: "EndTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Reservation",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Reservation",
                newName: "EndDate");
        }
    }
}
