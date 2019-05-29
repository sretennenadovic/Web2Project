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
    public class VehicleTypesController : ApiController
    {
        private IUnitOfWork db;

        public VehicleTypesController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/VehicleTypes
        public IEnumerable<VehicleType> GetVehicleTypes()
        {
            return db.VehicleTypes.GetAll();
        }

        // GET: api/VehicleTypes/5
        [ResponseType(typeof(VehicleType))]
        public IHttpActionResult GetVehicleType(int id)
        {
            VehicleType vehicleType = db.VehicleTypes.Get(id);
            if (vehicleType == null)
            {
                return NotFound();
            }

            return Ok(vehicleType);
        }

        // PUT: api/VehicleTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicleType(int id, VehicleType vehicleType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicleType.Id)
            {
                return BadRequest();
            }

            db.VehicleTypes.Update(vehicleType);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/VehicleTypes
        [ResponseType(typeof(VehicleType))]
        public IHttpActionResult PostVehicleType(VehicleType vehicleType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.VehicleTypes.Add(vehicleType);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = vehicleType.Id }, vehicleType);
        }

        // DELETE: api/VehicleTypes/5
        [ResponseType(typeof(VehicleType))]
        public IHttpActionResult DeleteVehicleType(int id)
        {
            VehicleType vehicleType = db.VehicleTypes.Get(id);
            if (vehicleType == null)
            {
                return NotFound();
            }

            db.VehicleTypes.Remove(vehicleType);
            db.Complete();

            return Ok(vehicleType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleTypeExists(int id)
        {
            return db.VehicleTypes.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}