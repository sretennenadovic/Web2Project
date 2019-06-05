using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class CatalogAdminInfo
    {
        public Catalog Catalog { get; set; }
        public IEnumerable<TicketType> TicketTypes { get; set; }
        public IEnumerable<CatalogHistory> CatalogHistory {get;set;}
    }
}