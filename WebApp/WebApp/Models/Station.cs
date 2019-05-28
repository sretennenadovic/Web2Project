using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {
        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        [Required]
        [StringLength(30)]
        public string Address { get; set; }

        public List<Line> Lines { get; set; }
    }
}