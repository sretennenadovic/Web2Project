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
    public class TicketsController : ApiController
    {
        private IUnitOfWork db;

        public TicketsController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/Tickets
        public IEnumerable<Ticket> GetTickets()
        {
            return db.Tickets.GetAll();
        }

        // GET: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {
            Ticket ticket = db.Tickets.Get(id);
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicket(int id, Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            db.Tickets.Update(ticket);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        // POST: api/Tickets
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
          
            db.Tickets.Add(ticket);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult DeleteTicket(int id)
        {
            Ticket ticket = db.Tickets.Get(id);
            if (ticket == null)
            {
                return NotFound();
            }

            db.Tickets.Remove(ticket);
            db.Complete();

            return Ok(ticket);
        }

        [Route("api/Tickets/UnauthorizedTicket")]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult UnauthorizedTicket(Ticket ticket)
        {
            ticket.IsValid = true;
            ticket.TicketTypeId = db.TicketTypes.Find(x => x.Name.Equals("Vremenska")).FirstOrDefault().Id;
            ticket.ApplicationUserId = null;
            int catalog = db.Catalogs.Find(x => x.ValidFrom < DateTime.Now && x.ValidTo > DateTime.Now).FirstOrDefault().Id;
            ticket.CatalogHistoryId = db.CatalogHistories.Find(x => x.TicketTypeId == ticket.TicketTypeId && x.CatalogId == catalog).FirstOrDefault().Id;
            ticket.TimeIssued = DateTime.Now;
         
            db.Tickets.Add(ticket);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}