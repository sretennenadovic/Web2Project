using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        public StationRepository(DbContext context) : base(context)
        {
        }
        public new IEnumerable<Station> GetAll()
        {
            return context.Set<Station>().Include("Lines").ToList();
        }

    }
}