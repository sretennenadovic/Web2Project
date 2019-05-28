using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class CatalogHistory
    {   
        public int Id { get; set; }
        [Required]
        [Range(0, 15000)]
        public float TicketPrice { get; set; }
        [Required]
        public int CatalogId { get; set; }
        public Catalog Catalog { get; set; }
        [Required]
        public int TicketTypeId { get; set; }
        public TicketType TicketType { get; set; }
    }
}