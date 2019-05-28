namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedUserMigration : DbMigration
    {
        public override void Up()
        {
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
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            DropColumn("dbo.AspNetUsers", "PassengerTypeId");
            DropColumn("dbo.AspNetUsers", "VerificationStatus");
            DropColumn("dbo.AspNetUsers", "ImageUrl");
            DropColumn("dbo.AspNetUsers", "Approved");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "BirthDate");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
        }
    }
}
