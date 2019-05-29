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
    public class CatalogHistoriesController : ApiController
    {
        private IUnitOfWork db;

        public CatalogHistoriesController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/CatalogHistories
        public IEnumerable<CatalogHistory> GetCatalogHistories()
        {
            return db.CatalogHistories.GetAll();
        }

        // GET: api/CatalogHistories/5
        [ResponseType(typeof(CatalogHistory))]
        public IHttpActionResult GetCatalogHistory(int id)
        {
            CatalogHistory catalogHistory = db.CatalogHistories.Get(id);
            if (catalogHistory == null)
            {
                return NotFound();
            }

            return Ok(catalogHistory);
        }

        // PUT: api/CatalogHistories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCatalogHistory(int id, CatalogHistory catalogHistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != catalogHistory.Id)
            {
                return BadRequest();
            }

            db.CatalogHistories.Update(catalogHistory);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatalogHistoryExists(id))
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

        // POST: api/CatalogHistories
        [ResponseType(typeof(CatalogHistory))]
        public IHttpActionResult PostCatalogHistory(CatalogHistory catalogHistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CatalogHistories.Add(catalogHistory);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = catalogHistory.Id }, catalogHistory);
        }

        // DELETE: api/CatalogHistories/5
        [ResponseType(typeof(CatalogHistory))]
        public IHttpActionResult DeleteCatalogHistory(int id)
        {
            CatalogHistory catalogHistory = db.CatalogHistories.Get(id);
            if (catalogHistory == null)
            {
                return NotFound();
            }

            db.CatalogHistories.Remove(catalogHistory);
            db.Complete();

            return Ok(catalogHistory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CatalogHistoryExists(int id)
        {
            return db.CatalogHistories.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}