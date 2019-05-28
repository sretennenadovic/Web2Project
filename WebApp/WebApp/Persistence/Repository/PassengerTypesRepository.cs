using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PassengerTypesRepository : Repository<PassengerType, int>, IPassengerTypesRepository
    {
        public PassengerTypesRepository(DbContext context) : base(context)
        {
        }
    }
}