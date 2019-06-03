using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class TicketPrices
    {
        public string TicketName { get; set; }
        public string PassengerTypeString { get; set; }
        public float Price { get; set; }
    }
}