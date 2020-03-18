using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;
using datagrid_mvc5.Models;
using DevExpress.Utils.Extensions;
using Newtonsoft.Json;

namespace GridViewCustomFiltersMvc
{
    public class HomeController : Controller
    {



        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GridViewPartial()
        {
            return PartialView(orders);
        }
        Northwind _db = new Northwind();

        private List<Order> _orders;
        List<Order> orders
        {
            get
            {
                if (_orders == null)
                    _orders = _db.Orders.ToList();
                return _orders;
            }
        }
        public ActionResult GridViewCustomActionPartial(string filterExpression)
        {
            ViewData["filterExpression"] = filterExpression;
            return PartialView("GridViewPartial", orders);
        }

       public ActionResult GetSelectedRowData(string ids,string fieldName)
       {
           var pr = typeof(Order).GetProperty(fieldName);

         //  var idsString = "10248,10247,10250";
           var orders=  _db.Orders.SqlQuery($"Select * from Orders where OrderId in ({ids})");


            List<object> res= new List<object>();
            try
            {

                foreach (var order in orders)
                {
                    res.Add(pr.GetValue(order));
                }
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
            }

           var json = JsonConvert.SerializeObject(res);
           return Content(json, "application/json");
        }

    }
}