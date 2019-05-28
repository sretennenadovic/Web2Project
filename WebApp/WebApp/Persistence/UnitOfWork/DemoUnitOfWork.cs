using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Unity;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
      
        public DemoUnitOfWork(DbContext context)
        {
            _context = context;
        }

        [Dependency]
        public IPassengerTypesRepository PassengerTypes { get; set; }
        [Dependency]
        public ITicketTypeRepository TicketTypes { get; set; } 
        [Dependency]
        public IVehicleTypeRepository VehicleTypes { get; set; }
        [Dependency]
        public ICatalogRepository Catalogs { get; set; }
        [Dependency]
        public ICatalogHistoryRepository CatalogHistories { get; set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}