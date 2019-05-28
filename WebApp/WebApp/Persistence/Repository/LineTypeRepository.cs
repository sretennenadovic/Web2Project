using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineTypeRepository : Repository<LineType, int>, ILineTypeRepository
    {
        public LineTypeRepository(DbContext context) : base(context)
        {
        }
    }
}