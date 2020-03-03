using System.Web.Mvc;

namespace GridViewCustomFiltersMvc {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult GridViewPartial() {
            return PartialView(NorthwindDataProvider.GetProducts());
        }

        public ActionResult GridViewCustomActionPartial(string filterExpression) {
            ViewData["filterExpression"] = filterExpression;
            return PartialView("GridViewPartial", NorthwindDataProvider.GetProducts());
        }
    }
}