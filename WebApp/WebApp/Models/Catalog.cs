using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Catalog
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="datetime2")]
        public DateTime ValidFrom { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? ValidTo { get; set; }
        public List<CatalogHistory> CatalogHistories { get; set; }

    }
}