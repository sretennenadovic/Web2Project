using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IPassengerTypesRepository PassengerTypes { get; set; }
        ITicketTypeRepository TicketTypes { get; set; }
        IVehicleTypeRepository VehicleTypes { get; set; }
        ICatalogRepository Catalogs { get; set; }
        ICatalogHistoryRepository CatalogHistories { get; set; }
        int Complete();
    }
}
