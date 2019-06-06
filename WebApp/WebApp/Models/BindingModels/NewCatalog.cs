using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class NewCatalog
    {
        public DateTime validFrom { get; set; }
        public List<CatalogHistory> TicketPrices { get; set; }
    }
}