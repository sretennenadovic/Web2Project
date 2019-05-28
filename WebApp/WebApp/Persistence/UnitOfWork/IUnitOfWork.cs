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
        ITicketRepository Tickets { get; set; }
        IVehicleRepository Vehicles { get; set; }
        ILineRepository Lines { get; set; }
        IStationRepository Stations { get; set; }
        IScheduleRepository Schedules { get; set; }
        IScheduleTypeRepository ScheduleTypes { get; set; }
        ILineTypeRepository LineTypes { get; set; }
       
        int Complete();
    }
}
