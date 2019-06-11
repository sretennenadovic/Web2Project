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
using System.Data.Entity.Migrations;

namespace WebApp.Controllers
{
    [AllowAnonymous]
    public class LinesController : ApiController
    {
        private IUnitOfWork db;

        public LinesController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/Lines
        public IEnumerable<Line> GetLines()
        {
            return db.Lines.GetAll();
        }

        // GET: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult GetLine(int id)
        {
            Line line = db.Lines.Get(id);
            if (line == null)
            {
                return NotFound();
            }

            return Ok(line);
        }

        [Authorize(Roles = "Admin")]
        // PUT: api/Lines/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }

            if (id != line.Id)
            {
                return Ok(false);
            }

            List<Station> stations = new List<Station>();

            foreach (var item in line.Stations)
            {
                stations.Add(db.Stations.Find(x => x.Id == item.Id).FirstOrDefault());
            }

            var l = db.Lines.Get(line.Id);
            l.Stations.Clear();
            db.Complete();

            l.Name = line.Name;
            l.LineTypeId = line.LineTypeId;
            l.Number = line.Number;
            l.Stations = stations;
            l.Order = line.Order;

            db.Lines.Update(l);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        [Authorize(Roles = "Admin")]
        // POST: api/Lines
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostLine(Line line)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }

            Line newLine = new Line();
            newLine.Name = line.Name;
            newLine.LineTypeId = line.LineTypeId;
            newLine.Number = line.Number;
            newLine.Order = line.Order;

            List<Station> stations = new List<Station>();

            foreach (var item in line.Stations)
            {
                stations.Add(db.Stations.Find(x => x.Id == item.Id).FirstOrDefault());
                db.Complete();
            }

            newLine.Stations = stations;

            db.Lines.Add(newLine);
            db.Complete();

            return Ok(true);
        }

        [Authorize(Roles = "Admin")]
        // DELETE: api/Lines/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = db.Lines.Get(id);
            if (line == null)
            {
                return Ok(false);
            }

            db.Lines.Remove(line);
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

        private bool LineExists(int id)
        {
            return db.Lines.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}