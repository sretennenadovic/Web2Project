using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class ScheduleInfo
    {
        public IEnumerable<ScheduleType> ScheduleTypes { get; set; }
        public IEnumerable<LineType> LineTypes { get; set; }
        public IEnumerable<Line> Lines { get; set; }
    }
}