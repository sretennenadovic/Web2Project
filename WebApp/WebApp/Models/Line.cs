using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Line
    {
        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }
        [Required]
        [Range(1,100)]
        public int Number { get; set; }
        [Required]
        public int LineTypeId { get; set; }
        public LineType LineType { get; set; }

        public List<Station> Stations { get; set; }
        public List<Vehicle> Vehicles { get; set; }
        public List<Schedule> Schedules { get; set; }
        public string Order { get; set; }

    }
}