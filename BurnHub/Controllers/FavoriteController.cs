using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BurnHub.Controllers
{
    public class FavoriteController : Controller
    {
        // GET: FavoriteController
        public ActionResult Index()
        {
            return View();
        }

        // GET: FavoriteController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: FavoriteController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FavoriteController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FavoriteController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FavoriteController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FavoriteController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: FavoriteController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
