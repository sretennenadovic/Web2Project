﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.BindingModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [AllowAnonymous]
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

        [Authorize(Roles = "Admin")]
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

        [Authorize]
        // POST: api/Tickets
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext()
                                    .GetUserManager<ApplicationUserManager>()
                                    .FindById(User.Identity.GetUserId());

            if (user.Approved)
            {

                Ticket newTicket = new Ticket();
                newTicket.ApplicationUserId = user.Id;
                newTicket.IsValid = true;
                newTicket.TimeIssued = DateTime.Now;
                newTicket.TicketTypeId = ticket.TicketTypeId;

                int catalogId = db.Catalogs.Find(x => x.ValidFrom < DateTime.Now && x.ValidTo == null).FirstOrDefault().Id;
                newTicket.CatalogHistoryId = db.CatalogHistories.Find(x => x.TicketTypeId == ticket.TicketTypeId && x.CatalogId == catalogId).FirstOrDefault().Id;

                db.Tickets.Add(newTicket);
                db.Complete();

                return Ok(true);
            }
            else
            {
                return Ok(false);
            }          
        }

        [Authorize(Roles = "Admin")]
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

        //metoda za kontrolera, za id karte dobije nazad da li je vazeca ili ne
        //u zavisnosti od njenog tipa
        [Route("api/Tickets/GetTicketValidation/{id}")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult GetTicketValidation(int id)
        {
            Ticket ticket = db.Tickets.Get(id);           
            if (ticket == null)
            {
                return Ok(false);
            }

            if (CheckValidation(ticket))
            {
                db.Tickets.Update(ticket);
                db.Complete();
                return Ok(true);
            }
            else
            {
                db.Tickets.Update(ticket);
                db.Complete();
                return Ok(false);
            }
        }

        private bool CheckValidation(Ticket ticket)
        {
            List<TicketType> types = db.TicketTypes.GetAll().ToList();
            bool isValid = false;

            if (ticket.TicketType.Name.Equals(types[0].Name))
            {
                double hours = (DateTime.Now - ticket.TimeIssued).TotalHours;
                isValid = hours > 1 ? false : true;
            }else if (ticket.TicketType.Name.Equals(types[1].Name))
            {
                isValid = DateTime.Now.Date == ticket.TimeIssued.Date;
            }
            else if (ticket.TicketType.Name.Equals(types[2].Name))
            {
                isValid = DateTime.Now.Month == ticket.TimeIssued.Month;
            }
            else if (ticket.TicketType.Name.Equals(types[3].Name))
            {
                isValid = DateTime.Now.Year == ticket.TimeIssued.Year;
            }

            ticket.IsValid = isValid;
            return isValid;
        }

        [Route("api/Tickets/PostUnauthorizedTicket")]
        [ResponseType(typeof(DateTime))]
        public IHttpActionResult PostUnauthorizedTicket(TicketUnauthorized tu)
        {
            string s = tu.mail;
            Ticket ticket = new Ticket();
            ticket.IsValid = true;
            ticket.TicketTypeId = db.TicketTypes.Find(x => x.Name.Equals("Vremenska")).FirstOrDefault().Id;
            ticket.ApplicationUserId = null;
            int catalog = db.Catalogs.Find(x => x.ValidFrom < DateTime.Now && x.ValidTo == null).FirstOrDefault().Id;
            ticket.CatalogHistoryId = db.CatalogHistories.Find(x => x.TicketTypeId == ticket.TicketTypeId && x.CatalogId == catalog).FirstOrDefault().Id;
            ticket.TimeIssued = DateTime.Now;
         
            db.Tickets.Add(ticket);
            db.Complete();

            SendEmail(tu.mail, "Kupovina karte", $"Uspesno ste kupili kartu ID: {ticket.Id} u {DateTime.Now}, a istice {DateTime.Now.AddHours(1)}");


            return Ok(ticket.TimeIssued);
        }

        private void SendEmail(string recipient, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient smtpserver = new SmtpClient("smtp.gmail.com");
            try
            {
                mail.To.Add(recipient);
            }
            catch (Exception e) { }
            mail.Subject = subject;
            mail.Body = body;
            mail.From = new MailAddress("titovrentavehicle@gmail.com");
            smtpserver.Port = 587;
            smtpserver.Credentials = new System.Net.NetworkCredential("titovrentavehicle@gmail.com", "drugtito");
            smtpserver.EnableSsl = true;
            smtpserver.Send(mail);
        }

        [Route("api/Tickets/GetTicketHistory")]
        [ResponseType(typeof(TicketHistory))]
        public IHttpActionResult GetTicketHistory()
        {
            TicketHistory th = new TicketHistory();

            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext()
                                   .GetUserManager<ApplicationUserManager>()
                                   .FindById(User.Identity.GetUserId());

            th.Tickets = db.Tickets.Find(x => x.ApplicationUserId.Equals(user.Id)).ToList();
            th.TicketTypes = db.TicketTypes.GetAll().ToList();

            return Ok(th);
        }

        
        [Route("api/Tickets/GetTicketPrice/{idCh}/{idTt}")]
        [ResponseType(typeof(float))]
        public IHttpActionResult GetTicketPrice(int idCh, int idTt)
        {
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext()
                                   .GetUserManager<ApplicationUserManager>()
                                   .FindById(User.Identity.GetUserId());

            float price = db.CatalogHistories.Find(x => x.TicketTypeId == idTt && x.Id == idCh).FirstOrDefault().TicketPrice;
            if (user.Approved)
            {
                price = price * db.PassengerTypes.Find(x => x.Id == user.PassengerTypeId).FirstOrDefault().Discount;
            }
            return Ok(price);
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