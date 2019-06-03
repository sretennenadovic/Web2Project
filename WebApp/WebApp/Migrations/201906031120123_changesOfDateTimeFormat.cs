namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changesOfDateTimeFormat : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Catalogs", "ValidFrom", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Catalogs", "ValidTo", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Tickets", "TimeIssued", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tickets", "TimeIssued", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Catalogs", "ValidTo", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Catalogs", "ValidFrom", c => c.String(nullable: false, maxLength: 20));
        }
    }
}
