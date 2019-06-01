using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using WebApp.Models.BindingModels;

namespace WebApp.Persistence.Repository
{
    public class ScheduleRepository : Repository<Schedule, int>, IScheduleRepository
    {
        public ScheduleRepository(DbContext context) : base(context)
        {
            
        }

    }
}