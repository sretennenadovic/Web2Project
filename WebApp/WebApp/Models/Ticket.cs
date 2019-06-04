using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int? TicketTypeId { get; set; }
        public TicketType TicketType { get; set; }
        public int CatalogHistoryId { get; set; }
        public CatalogHistory CatalogHistory { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public bool IsValid { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime TimeIssued { get; set; }
    }
}