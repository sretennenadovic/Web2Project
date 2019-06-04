namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TicketUserIdChanged : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "ApplicationUserId" });
            AlterColumn("dbo.Tickets", "ApplicationUserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Tickets", "ApplicationUserId");
            AddForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "ApplicationUserId" });
            AlterColumn("dbo.Tickets", "ApplicationUserId", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Tickets", "ApplicationUserId");
            AddForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
