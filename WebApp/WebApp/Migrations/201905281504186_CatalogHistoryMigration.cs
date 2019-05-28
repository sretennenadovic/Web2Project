namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CatalogHistoryMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CatalogHistories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketPrice = c.Single(nullable: false),
                        CatalogId = c.Int(nullable: false),
                        TicketTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Catalogs", t => t.CatalogId, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeId, cascadeDelete: true)
                .Index(t => t.CatalogId)
                .Index(t => t.TicketTypeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CatalogHistories", "TicketTypeId", "dbo.TicketTypes");
            DropForeignKey("dbo.CatalogHistories", "CatalogId", "dbo.Catalogs");
            DropIndex("dbo.CatalogHistories", new[] { "TicketTypeId" });
            DropIndex("dbo.CatalogHistories", new[] { "CatalogId" });
            DropTable("dbo.CatalogHistories");
        }
    }
}
