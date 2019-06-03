using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int? TicketTypeId { get; set; }
        public TicketType TicketType { get; set; }
        [Required]
        public int CatalogHistoryId { get; set; }
        public CatalogHistory CatalogHistory { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        [Required]
        public bool IsValid { get; set; }
        [Required]
        [StringLength(20)]
        public string TimeIssued { get; set; }
    }
}