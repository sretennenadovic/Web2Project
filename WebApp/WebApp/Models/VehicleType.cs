using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class VehicleType
    {
        public int Id { get; set; }
        [Required]
        [StringLength(15)]
        public string Name { get; set; }
        public List<Vehicle> Vehicles { get; set; }
    }
}