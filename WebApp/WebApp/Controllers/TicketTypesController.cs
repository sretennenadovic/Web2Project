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
    public class TicketTypesController : ApiController
    {
        private IUnitOfWork db;

        public TicketTypesController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/TicketTypes
        public IEnumerable<TicketType> GetTicketTypes()
        {
            return db.TicketTypes.GetAll();
        }

        // GET: api/TicketTypes/5
        [ResponseType(typeof(TicketType))]
        public IHttpActionResult GetTicketType(int id)
        {
            TicketType ticketType = db.TicketTypes.Get(id);
            if (ticketType == null)
            {
                return NotFound();
            }

            return Ok(ticketType);
        }

        // PUT: api/TicketTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicketType(int id, TicketType ticketType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticketType.Id)
            {
                return BadRequest();
            }

            db.TicketTypes.Update(ticketType);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketTypeExists(id))
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

        // POST: api/TicketTypes
        [ResponseType(typeof(TicketType))]
        public IHttpActionResult PostTicketType(TicketType ticketType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TicketTypes.Add(ticketType);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = ticketType.Id }, ticketType);
        }

        // DELETE: api/TicketTypes/5
        [ResponseType(typeof(TicketType))]
        public IHttpActionResult DeleteTicketType(int id)
        {
            TicketType ticketType = db.TicketTypes.Get(id);
            if (ticketType == null)
            {
                return NotFound();
            }

            db.TicketTypes.Remove(ticketType);
            db.Complete();

            return Ok(ticketType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketTypeExists(int id)
        {
            return db.TicketTypes.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}