using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
 
namespace VSOnline.VSECommerce.Web.Models
{
    public class WebUserContext
    {
        public WebUserContext(UserDTO user)
        {
            Username = user.Username;
            FirstName = user.FirstName;
            LastName = user.LastName;
            PhoneNumber1 = user.PhoneNumber1;
            LastLoginDateUtc = user.LastLoginDateUtc;

        }

        public WebUserContext(string username)
        {
            Username = username;
        }

        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        public bool IsTaxExempt { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public Nullable<System.DateTime> LastLoginDateUtc { get; set; }
        public Nullable<int> BillingAddress_Id { get; set; }
        public Nullable<int> ShippingAddress_Id { get; set; }
    }
}