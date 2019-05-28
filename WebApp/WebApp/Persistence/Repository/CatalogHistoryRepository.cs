using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class CatalogHistoryRepository : Repository<CatalogHistory, int>, ICatalogHistoryRepository
    {
        public CatalogHistoryRepository(DbContext context) : base(context)
        {
        }
    }
}