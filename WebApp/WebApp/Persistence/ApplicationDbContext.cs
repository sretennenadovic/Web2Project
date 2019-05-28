﻿using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebApp.Models;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<PassengerType> PassengerTypes { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<CatalogHistory> CatalogHistories { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<LineType> LineTypes { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ScheduleType> ScheduleTypes { get; set; }
        public DbSet<Schedule> Schedules { get; set; }


        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}