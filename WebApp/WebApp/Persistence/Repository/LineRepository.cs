using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        public LineRepository(DbContext context) : base(context)
        {
            var myContext = context.Set<Line>();
        }

        public new IEnumerable<Line> GetAll()
        {
            return context.Set<Line>().Include("Stations").ToList();
        }
    }
}