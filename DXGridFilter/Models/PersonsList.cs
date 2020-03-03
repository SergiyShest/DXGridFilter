using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevExpressMvcApplication1.Models {
    public class PersonsList {
        public static List<Person> GetPersons() {
            if(HttpContext.Current.Session["Persons"] == null) {
                List<Person> list = new List<Person>();

                list.Add(new Person(1, "David", "Jordan", "Adler", "Undeleted", "Group 1", 25,true));
                list.Add(new Person(2, "Michael", "Christopher", "Alcamo", "Undeleted", "Group 1", 30, true));
                list.Add(new Person(3, "Amy", "Gabrielle", "Altmann", "Undeleted", "Group 2", 41, true));
                list.Add(new Person(4, "Meredith", "Margot", "Berman", "Undeleted", "Group 2", 20, false));
                list.Add(new Person(5, "Margot", "Sydney", "Atlas", "Undeleted", "Group 1", 35, false));
                list.Add(new Person(6, "Eric", "Zachary", "Berkowitz", "Undeleted", "Group 1", 42, true));
                list.Add(new Person(7, "Kyle", "Adler", "Bernardo", "Undeleted", "Group 2", 39, true));
                list.Add(new Person(8, "Liz", "Altmann", "Bice", "Undeleted", "Group 1", 28, false));
                list.Add(new Person(9, "Eric2", "Zachary", "Berkowitz", "Undeleted2", "Group 1", 42, true));
                list.Add(new Person(10, "Kyle2", "Adler", "Bernardo", "Undeleted2", "Group 2", 39, true));
                list.Add(new Person(11, "Liz2", "Altmann", "Bice", "Undeleted2", "Group 1", 28, false));
                HttpContext.Current.Session["Persons"] = list;
            }
            return (List<Person>)HttpContext.Current.Session["Persons"];
        }

        public static void AddPerson(Person person) {
            List<Person> list = GetPersons();
            person.PersonID = list.Count + 1;

            list.Add(person);
        }

        public static void UpdatePerson(Person personInfo) {
            Person editedPerson = GetPersons().Where(m => m.PersonID == personInfo.PersonID).First();

            editedPerson.FirstName = personInfo.FirstName;
            editedPerson.MiddleName = personInfo.MiddleName;
            editedPerson.LastName = personInfo.LastName;
        }

        public static void DeletePerson(int personId) {
            List<Person> list = GetPersons();
            Person deletedPerson = list.Where(m => m.PersonID == personId).First();
            if(deletedPerson != null) {
                list.Remove(deletedPerson);
            }
        }
    }
}