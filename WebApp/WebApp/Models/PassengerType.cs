using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class PassengerType
    {
        public int Id { get; set; }
        [Required]
        [StringLength(15)]
        public string Name { get; set; }
        [Required]
        public float Discount { get; set; }
    }
}