using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ordo.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailOutbox : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmailOutboxMessage",
                table: "EmailOutboxMessage");

            migrationBuilder.RenameTable(
                name: "EmailOutboxMessage",
                newName: "EmailOutbox");

            migrationBuilder.RenameIndex(
                name: "IX_EmailOutboxMessage_SentAt_FailedAt_NextAttemptAt",
                table: "EmailOutbox",
                newName: "IX_EmailOutbox_SentAt_FailedAt_NextAttemptAt");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmailOutbox",
                table: "EmailOutbox",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmailOutbox",
                table: "EmailOutbox");

            migrationBuilder.RenameTable(
                name: "EmailOutbox",
                newName: "EmailOutboxMessage");

            migrationBuilder.RenameIndex(
                name: "IX_EmailOutbox_SentAt_FailedAt_NextAttemptAt",
                table: "EmailOutboxMessage",
                newName: "IX_EmailOutboxMessage_SentAt_FailedAt_NextAttemptAt");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmailOutboxMessage",
                table: "EmailOutboxMessage",
                column: "Id");
        }
    }
}
