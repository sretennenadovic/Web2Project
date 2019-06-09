namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class orderAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Lines", "Order", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Lines", "Order");
        }
    }
}
