using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class CatalogRepository : Repository<Catalog, int>, ICatalogRepository
    {
        public CatalogRepository(DbContext context) : base(context)
        {
        }
    }
}