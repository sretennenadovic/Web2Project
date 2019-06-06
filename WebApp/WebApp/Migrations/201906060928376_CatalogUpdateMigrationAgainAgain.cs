namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CatalogUpdateMigrationAgainAgain : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Catalogs", "ValidTo", c => c.DateTime(precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Catalogs", "ValidTo", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
    }
}
