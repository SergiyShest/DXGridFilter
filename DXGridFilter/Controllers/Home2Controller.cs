using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DevExpress.Web;
using DevExpress.Web.Mvc;
using DevExpress.XtraPrinting;
using DevExpressMvcApplication1.Models;

namespace DevExpressMvcApplication1.Controllers {
    public class Home2Controller : Controller {
        //
        // GET: /Home/

        public ActionResult Index() {
            return View(PersonsList.GetPersons());
        }

        public ActionResult GridViewPartial() {
            return PartialView(PersonsList.GetPersons());
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult EditingAddNew([ModelBinder(typeof(DevExpressEditorsBinder))] Person person) {
            if(ModelState.IsValid)
                PersonsList.AddPerson(person);
            return PartialView("GridViewPartial", PersonsList.GetPersons());
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult EditingUpdate([ModelBinder(typeof(DevExpressEditorsBinder))] Person personInfo) {
            if(ModelState.IsValid)
                PersonsList.UpdatePerson(personInfo);
            return PartialView("GridViewPartial", PersonsList.GetPersons());
        }

        public ActionResult EditingDelete(int personId) {
            PersonsList.DeletePerson(personId);
            return PartialView("GridViewPartial", PersonsList.GetPersons());
        }
        
    }
}
