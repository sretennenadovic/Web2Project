namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedAppUser : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AspNetUsers", "ImageUrl", c => c.String());
            AlterColumn("dbo.AspNetUsers", "VerificationStatus", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AspNetUsers", "VerificationStatus", c => c.String(nullable: false, maxLength: 30));
            AlterColumn("dbo.AspNetUsers", "ImageUrl", c => c.String(nullable: false));
        }
    }
}
