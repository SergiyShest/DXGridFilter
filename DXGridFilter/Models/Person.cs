using System;
using System.ComponentModel.DataAnnotations;

namespace DevExpressMvcApplication1.Models {
    public class Person {
        public Person() {
            PersonID = 0;
            FirstName = string.Empty;
            MiddleName = string.Empty;
            LastName = string.Empty;
        }

        public Person(int id, String firstName, string middleName, String lastName, string status, string group, int age, bool isMen) {
            this.PersonID = id;
            this.FirstName = firstName;
            this.MiddleName = middleName;
            this.LastName = lastName;
            this.Status = status;

            this.Group = group;
            this.Age = age;
          this.IsMen = isMen;
        }

        [Key]
        public int PersonID { get; set; }

        public string Group { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        public int Age { get; set; }

        public bool IsMen { get; set; }

        public string Status { get; set; }
    }
}