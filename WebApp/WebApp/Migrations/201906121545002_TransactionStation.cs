namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TransactionStation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stations", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stations", "RowVersion");
        }
    }
}
