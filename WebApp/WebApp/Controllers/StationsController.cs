using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class StationsController : ApiController
    {
        private IUnitOfWork db;

        public StationsController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/Stations
        public IEnumerable<Station> GetStations()
        {
            return db.Stations.GetAll();
        }

        // GET: api/Stations/5
        [ResponseType(typeof(Station))]
        public IHttpActionResult GetStation(int id)
        {
            Station station = db.Stations.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            return Ok(station);
        }

        // PUT: api/Stations/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult PutStation(int id, Station station)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }

            if (id != station.Id)
            {
                return Ok(false);
            }

            var s = db.Stations.Get(id);
            s.Address = station.Address;
            s.Latitude = station.Latitude;
            s.Longitude = station.Longitude;
            s.Name = station.Name;

            db.Stations.Update(s);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
                {
                    return Ok(false);
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        // POST: api/Stations
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostStation(Station station)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }

            db.Stations.Add(station);
            db.Complete();

            return Ok(true);
        }

        // DELETE: api/Stations/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult DeleteStation(int id)
        {
            Station station = db.Stations.Get(id);
            if (station == null)
            {
                return Ok(false);
            }

            db.Stations.Remove(station);
            db.Complete();

            return Ok(true);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StationExists(int id)
        {
            return db.Stations.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}