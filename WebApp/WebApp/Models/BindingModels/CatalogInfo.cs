using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class CatalogInfo
    {
        public IEnumerable<TicketType> TicketTypes { get; set; }
        public IEnumerable<PassengerType> PassengerTypes { get; set; }

        public IEnumerable<TicketPrices> TicketPrices { get; set; }
    }
}