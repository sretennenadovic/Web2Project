using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class TicketHistory
    {
        public IEnumerable<Ticket> Tickets { get; set; }
        public IEnumerable<TicketType> TicketTypes { get; set; }
    }
}