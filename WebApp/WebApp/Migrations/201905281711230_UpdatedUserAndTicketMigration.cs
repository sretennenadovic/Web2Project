namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedUserAndTicketMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketTypeId = c.Int(),
                        CatalogHistoryId = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                        IsValid = c.Boolean(nullable: false),
                        TimeIssued = c.String(nullable: false, maxLength: 20),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .ForeignKey("dbo.CatalogHistories", t => t.CatalogHistoryId, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeId)
                .Index(t => t.TicketTypeId)
                .Index(t => t.CatalogHistoryId)
                .Index(t => t.ApplicationUserId);
            
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String(nullable: false, maxLength: 15));
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String(nullable: false, maxLength: 15));
            AddColumn("dbo.AspNetUsers", "BirthDate", c => c.String(nullable: false, maxLength: 20));
            AddColumn("dbo.AspNetUsers", "Address", c => c.String(nullable: false, maxLength: 30));
            AddColumn("dbo.AspNetUsers", "Approved", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "ImageUrl", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "VerificationStatus", c => c.String(nullable: false, maxLength: 30));
            AddColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "PassengerTypeId");
            AddForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "TicketTypeId", "dbo.TicketTypes");
            DropForeignKey("dbo.Tickets", "CatalogHistoryId", "dbo.CatalogHistories");
            DropForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            DropIndex("dbo.Tickets", new[] { "ApplicationUserId" });
            DropIndex("dbo.Tickets", new[] { "CatalogHistoryId" });
            DropIndex("dbo.Tickets", new[] { "TicketTypeId" });
            DropColumn("dbo.AspNetUsers", "PassengerTypeId");
            DropColumn("dbo.AspNetUsers", "VerificationStatus");
            DropColumn("dbo.AspNetUsers", "ImageUrl");
            DropColumn("dbo.AspNetUsers", "Approved");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "BirthDate");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropTable("dbo.Tickets");
        }
    }
}
