using Microsoft.VisualStudio.TestTools.UnitTesting;
using GridViewCustomFiltersMvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GridViewCustomFiltersMvc.Tests
{
    [TestClass()]
    public class HomeControllerTests
    {
        [TestMethod()]
        public void GetSelectedRowDataTest()
        {
            HomeController home= new HomeController();
            List<string> idsList= new List<string>(){"1234","123"};

            var res = home.GetSelectedRowData(idsList.ToArray(), "");

        }
    }
}