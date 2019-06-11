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
using WebApp.Models.BindingModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [AllowAnonymous]
    public class CatalogsController : ApiController
    {
        private IUnitOfWork db;

        public CatalogsController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/Catalogs
        public IEnumerable<Catalog> GetCatalogs()
        {
            return db.Catalogs.GetAll();
        }

        // GET: api/Catalogs/5
        [ResponseType(typeof(Catalog))]
        public IHttpActionResult GetCatalog(int id)
        {
            Catalog catalog = db.Catalogs.Get(id);
            if (catalog == null)
            {
                return NotFound();
            }

            return Ok(catalog);
        }

        [Authorize(Roles ="Admin")]
        // PUT: api/Catalogs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCatalog(int id, Catalog catalog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != catalog.Id)
            {
                return BadRequest();
            }

            db.Catalogs.Update(catalog);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatalogExists(id))
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

        [Authorize(Roles = "Admin")]
        // POST: api/Catalogs
        [ResponseType(typeof(Catalog))]
        public IHttpActionResult PostCatalog(Catalog catalog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Catalogs.Add(catalog);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = catalog.Id }, catalog);
        }

        [Authorize(Roles = "Admin")]
        // DELETE: api/Catalogs/5
        [ResponseType(typeof(Catalog))]
        public IHttpActionResult DeleteCatalog(int id)
        {
            Catalog catalog = db.Catalogs.Get(id);
            if (catalog == null)
            {
                return NotFound();
            }

            db.Catalogs.Remove(catalog);
            db.Complete();

            return Ok(catalog);
        }

        
        [Route("api/Catalogs/GetCatalogInfo")]
        [ResponseType(typeof(CatalogInfo))]
        public IHttpActionResult GetCatalogInfo()
        {
            CatalogInfo ci = new CatalogInfo();
            ci.PassengerTypes = db.PassengerTypes.GetAll();
            ci.TicketTypes = db.TicketTypes.GetAll();

            List<TicketPrices> tp = new List<TicketPrices>();
            float price = 0;
            foreach (var item in ci.TicketTypes)
            {
                foreach (var item2 in ci.PassengerTypes)
                {
                    price = getPrice(item.Id, item2.Id);
                    tp.Add(new TicketPrices() { TicketName = item.Name, PassengerTypeString = item2.Name, Price = price});
                }
            }
            
            ci.TicketPrices = tp;

            return Ok(ci);
        }
        //racunanje cene karte za odredjen tip karte, odredjenog korisnika po zadnjem cenovniku
        private float getPrice(int id1, int id2)
        {         
            int catalog = db.Catalogs.Find(x => x.ValidFrom < DateTime.Now && x.ValidTo == null).FirstOrDefault().Id;

            float cHistory = db.CatalogHistories.Find(x => x.TicketTypeId == id1 && x.CatalogId == catalog).FirstOrDefault().TicketPrice;
            float discount = db.PassengerTypes.Find(x => x.Id == id2).FirstOrDefault().Discount;

            return discount * cHistory;
        }


        [Route("api/Catalogs/GetAdminCatalogInfo")]
        [ResponseType(typeof(CatalogAdminInfo))]
        public IHttpActionResult GetAdminCatalogInfo()
        {
            CatalogAdminInfo cai = new CatalogAdminInfo();
            cai.Catalog = db.Catalogs.Find(x => x.ValidFrom < DateTime.Now && x.ValidTo == null).FirstOrDefault();
            cai.TicketTypes = db.TicketTypes.GetAll();
            cai.CatalogHistory = db.CatalogHistories.Find(x => x.CatalogId == cai.Catalog.Id).ToList();

            return Ok(cai);
        }

        //dobavi za admina odredjen ali ne katalog vec sire od toga zato ovaj info
        [Route("api/Catalogs/GetSpecificOne/{id}")]
        [ResponseType(typeof(CatalogInfo))]
        public IHttpActionResult GetSpecificOne(int id)
        {
            CatalogInfo ci = new CatalogInfo();
            ci.PassengerTypes = db.PassengerTypes.GetAll();
            ci.TicketTypes = db.TicketTypes.GetAll();

            List<TicketPrices> tp = new List<TicketPrices>();
            float price = 0;
            foreach (var item in ci.TicketTypes)
            {
                foreach (var item2 in ci.PassengerTypes)
                {
                    price = getPriceForSpecificOne(id,item.Id, item2.Id);
                    tp.Add(new TicketPrices() { TicketName = item.Name, PassengerTypeString = item2.Name, Price = price });
                }
            }

            ci.TicketPrices = tp;

            return Ok(ci);
        }

        private float getPriceForSpecificOne(int id, int id1, int id2)
        {
            float cHistory = db.CatalogHistories.Find(x => x.TicketTypeId == id1 && x.CatalogId == id).FirstOrDefault().TicketPrice;
            float discount = db.PassengerTypes.Find(x => x.Id == id2).FirstOrDefault().Discount;

            return discount * cHistory;
        }

        //prvo moramo dodati katalog, ali pre toga update stari, pa onda katalog history 4 puta za 4 vrste karata
        [Route("api/Catalogs/PostNewOne")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostNewOne(NewCatalog catalog)
        {   
            Catalog oldCatalog = db.Catalogs.Find(x => x.ValidTo == null).FirstOrDefault();
            oldCatalog.ValidTo = catalog.validFrom;
            db.Catalogs.Update(oldCatalog);

            db.Catalogs.Add(new Catalog() { ValidFrom=catalog.validFrom});
            db.Complete();

            int newCatalogId = db.Catalogs.Find(x => x.ValidFrom == catalog.validFrom).FirstOrDefault().Id;

            for (int i = 0; i < db.TicketTypes.GetAll().Count(); i++)
            {
                db.CatalogHistories.Add(new CatalogHistory()
                {
                    CatalogId = newCatalogId,
                    TicketPrice = catalog.TicketPrices[i].TicketPrice,
                    TicketTypeId = catalog.TicketPrices[i].TicketTypeId
                });
            }
           
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

        private bool CatalogExists(int id)
        {
            return db.Catalogs.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}