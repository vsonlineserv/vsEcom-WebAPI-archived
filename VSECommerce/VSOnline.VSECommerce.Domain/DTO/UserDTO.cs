////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace VSOnline.VSECommerce.Domain.DTO
{
    public class UserDTO
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        public string Password { get; set; }
        public int PasswordFormatId { get; set; }
        public string PasswordSalt { get; set; }
        public bool IsMerchant { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
        public string LastIpAddress { get; set; }
        public System.DateTime CreatedOnUtc { get; set; }
        public Nullable<System.DateTime> UpdatedOnUtc { get; set; }
        public Nullable<System.DateTime> LastLoginDateUtc { get; set; }
        public Nullable<int> BillingAddress_Id { get; set; }
        public Nullable<int> ShippingAddress_Id { get; set; }
    }

    public class UserModel
    {
       
        [Required]
        public string FirstName { get; set; }
        [Required]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
         @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
         @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage = "Email Address not valid")]
        public string Email { get; set; }

        [RegularExpression("^([0-9]{10,}|)$", ErrorMessage = "Invalid Phone Number")]
        public string PhoneNumber1 { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }       
    }

    public class RetailerUserDTO
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
         [Required]
        public string BusinessName { get; set; }
         
        [Required]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
         @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" + 
         @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage="Email Address not valid")]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^([0-9]{10}|)$", ErrorMessage = "Invalid Phone Number")]
        public string PhoneNumber1 { get; set; }
         [Required]
         [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string Password { get; set; }
         [Required]
         [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        [Required]
        public string Address1 { get; set; }
        [Required]
        public string Address2 { get; set; }

        [Required]
        [RegularExpression("^([0-9]{6,}|)$", ErrorMessage = "Invalid Pin Code")]        
        public string Pincode {get; set;}
        [Required]
        public string State {get; set;}
        [Required]
        public int Country {get; set;}
        [Required]
        public string City { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        //public Nullable<System.DateTime> CreatedOnUtc { get; set; }
    }
}

