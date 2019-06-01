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
            ci.TicketTypes = db.TicketTypes.GetAll();
            ci.PassengerTypes = db.PassengerTypes.GetAll();

            return Ok(ci);
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