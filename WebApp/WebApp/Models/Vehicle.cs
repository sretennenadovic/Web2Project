using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int VehicleTypeId { get; set; }
        public VehicleType VehicleType { get; set; }
        public int LineId { get; set; }
        public Line Line { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}