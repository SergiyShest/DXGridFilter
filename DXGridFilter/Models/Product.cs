
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class Product {
    public int ProductID { get; set; }
    [Required(ErrorMessage = "Product Name is required")]
    public string ProductName { get; set; }
    public decimal? UnitPrice { get; set; }
    public int? UnitsOnOrder { get; set; }

     public DateTime? ProductDate { get; set; }

}
