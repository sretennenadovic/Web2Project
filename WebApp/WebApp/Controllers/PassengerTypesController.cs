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
    public class PassengerTypesController : ApiController
    {
        private IUnitOfWork db;

        public PassengerTypesController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/PassengerTypes
        public IEnumerable<PassengerType> GetPassengerTypes()
        {
            return db.PassengerTypes.GetAll();
        }

        // GET: api/PassengerTypes/5
        [ResponseType(typeof(PassengerType))]
        public IHttpActionResult GetPassengerType(int id)
        {
            PassengerType passengerType = db.PassengerTypes.Get(id);
            if (passengerType == null)
            {
                return NotFound();
            }

            return Ok(passengerType);
        }

        // PUT: api/PassengerTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPassengerType(int id, PassengerType passengerType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != passengerType.Id)
            {
                return BadRequest();
            }

            db.PassengerTypes.Update(passengerType);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerTypeExists(id))
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

        // POST: api/PassengerTypes
        [ResponseType(typeof(PassengerType))]
        public IHttpActionResult PostPassengerType(PassengerType passengerType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PassengerTypes.Add(passengerType);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = passengerType.Id }, passengerType);
        }

        // DELETE: api/PassengerTypes/5
        [ResponseType(typeof(PassengerType))]
        public IHttpActionResult DeletePassengerType(int id)
        {
            PassengerType passengerType = db.PassengerTypes.Get(id);
            if (passengerType == null)
            {
                return NotFound();
            }

            db.PassengerTypes.Remove(passengerType);
            db.Complete();

            return Ok(passengerType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PassengerTypeExists(int id)
        {
            return db.PassengerTypes.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}