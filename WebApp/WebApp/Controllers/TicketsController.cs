using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.BindingModels;
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

        [Route("api/Tickets/PostUnauthorizedTicket")]
        [ResponseType(typeof(DateTime))]
        public IHttpActionResult PostUnauthorizedTicket(TicketUnauthorized tu)
        {
            SendEmail("JGSP Sreten", "jgsp@mail.com", tu.mail, "Kupovina karte", $"Uspesno ste kupili kartu u {DateTime.Now}, a istice {DateTime.Now.AddHours(1)}");

            string s = tu.mail;
            Ticket ticket = new Ticket();
            ticket.IsValid = true;
            ticket.TicketTypeId = db.TicketTypes.Find(x => x.Name.Equals("Vremenska")).FirstOrDefault().Id;
            ticket.ApplicationUserId = null;
            int catalog = db.Catalogs.Find(x => x.ValidFrom < DateTime.Now && x.ValidTo > DateTime.Now).FirstOrDefault().Id;
            ticket.CatalogHistoryId = db.CatalogHistories.Find(x => x.TicketTypeId == ticket.TicketTypeId && x.CatalogId == catalog).FirstOrDefault().Id;
            ticket.TimeIssued = DateTime.Now;
         
            db.Tickets.Add(ticket);
            db.Complete();

            return Ok(ticket.TimeIssued);
        }

        private void SendEmail(string sendername, string sender, string recipient, string subject, string body)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.mailtrap.io", 2525)
            {
                Credentials = new System.Net.NetworkCredential()
                {
                    UserName = "c84922d535ae2f",
                    Password = "60943990394f6d"
                },

                EnableSsl = true
            };

            MailAddress from = new MailAddress(sender, sendername);
            MailAddress to = new MailAddress(recipient, "");
            MailMessage mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body
            };



            smtpClient.Send(mailMessage);
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