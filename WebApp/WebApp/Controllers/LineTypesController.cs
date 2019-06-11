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
    [AllowAnonymous]
    public class LineTypesController : ApiController
    {
        private IUnitOfWork db;

        public LineTypesController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/LineTypes
        public IEnumerable<LineType> GetLineTypes()
        {
            return db.LineTypes.GetAll();
        }

        // GET: api/LineTypes/5
        [ResponseType(typeof(LineType))]
        public IHttpActionResult GetLineType(int id)
        {
            LineType lineType = db.LineTypes.Get(id);
            if (lineType == null)
            {
                return NotFound();
            }

            return Ok(lineType);
        }

        [Authorize(Roles = "Admin")]
        // PUT: api/LineTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLineType(int id, LineType lineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lineType.Id)
            {
                return BadRequest();
            }

            db.LineTypes.Update(lineType);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineTypeExists(id))
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
        // POST: api/LineTypes
        [ResponseType(typeof(LineType))]
        public IHttpActionResult PostLineType(LineType lineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LineTypes.Add(lineType);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = lineType.Id }, lineType);
        }

        [Authorize(Roles = "Admin")]
        // DELETE: api/LineTypes/5
        [ResponseType(typeof(LineType))]
        public IHttpActionResult DeleteLineType(int id)
        {
            LineType lineType = db.LineTypes.Get(id);
            if (lineType == null)
            {
                return NotFound();
            }

            db.LineTypes.Remove(lineType);
            db.Complete();

            return Ok(lineType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LineTypeExists(int id)
        {
            return db.LineTypes.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}