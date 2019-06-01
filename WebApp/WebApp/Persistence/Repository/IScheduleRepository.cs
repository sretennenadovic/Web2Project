using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Models.BindingModels;

namespace WebApp.Persistence.Repository
{
    public interface IScheduleRepository : IRepository<Schedule, int>
    {
    }
}
