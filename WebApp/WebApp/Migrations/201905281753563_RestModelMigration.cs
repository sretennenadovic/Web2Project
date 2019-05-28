namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RestModelMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 20),
                        Number = c.Int(nullable: false),
                        LineTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.LineTypes", t => t.LineTypeId, cascadeDelete: true)
                .Index(t => t.LineTypeId);
            
            CreateTable(
                "dbo.LineTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 15),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 20),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        Address = c.String(nullable: false, maxLength: 30),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VehicleTypeId = c.Int(nullable: false),
                        LineId = c.Int(nullable: false),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .ForeignKey("dbo.VehicleTypes", t => t.VehicleTypeId, cascadeDelete: true)
                .Index(t => t.VehicleTypeId)
                .Index(t => t.LineId);
            
            CreateTable(
                "dbo.Schedules",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Departure = c.String(nullable: false),
                        ScheduleTypeId = c.Int(nullable: false),
                        LineId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .ForeignKey("dbo.ScheduleTypes", t => t.ScheduleTypeId, cascadeDelete: true)
                .Index(t => t.ScheduleTypeId)
                .Index(t => t.LineId);
            
            CreateTable(
                "dbo.ScheduleTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 20),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.Line_Id })
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Station_Id)
                .Index(t => t.Line_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Schedules", "ScheduleTypeId", "dbo.ScheduleTypes");
            DropForeignKey("dbo.Schedules", "LineId", "dbo.Lines");
            DropForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes");
            DropForeignKey("dbo.Vehicles", "LineId", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.Lines", "LineTypeId", "dbo.LineTypes");
            DropIndex("dbo.StationLines", new[] { "Line_Id" });
            DropIndex("dbo.StationLines", new[] { "Station_Id" });
            DropIndex("dbo.Schedules", new[] { "LineId" });
            DropIndex("dbo.Schedules", new[] { "ScheduleTypeId" });
            DropIndex("dbo.Vehicles", new[] { "LineId" });
            DropIndex("dbo.Vehicles", new[] { "VehicleTypeId" });
            DropIndex("dbo.Lines", new[] { "LineTypeId" });
            DropTable("dbo.StationLines");
            DropTable("dbo.ScheduleTypes");
            DropTable("dbo.Schedules");
            DropTable("dbo.Vehicles");
            DropTable("dbo.Stations");
            DropTable("dbo.LineTypes");
            DropTable("dbo.Lines");
        }
    }
}
