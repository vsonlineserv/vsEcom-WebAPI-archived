////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Configuration;


namespace VSOnline.VSECommerce.Web.Controllers
{
    public class LoginController : ApiController
    {
        IUnitOfWork _unitOfWork = null;

        public LoginController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [ActionName("RegisterRetailer")]
        public IHttpActionResult RegisterRetailer([FromBody] RetailerUserDTO retailerUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserService userService = new UserService();
            if (userService.AddUser(retailerUserDTO) == true)
            {
                var user = userService.GetUser(retailerUserDTO.Email);
                try
                {
                    AddSeller(retailerUserDTO, user.UserId);
                    if (Convert.ToBoolean(ConfigurationManager.AppSettings["AddUserEnableMail"]) == true)
                    {
                        VSOnline.VSECommerce.Domain.Helper.MailHelper.SendRegisterRetailerMail(user.Username, retailerUserDTO.Email, retailerUserDTO.BusinessName);
                    }
                }
                catch
                {

                }
                return Ok();
            }
            return BadRequest("User not registered.");
        }


        [HttpPost]
        [ActionName("RegisterUser")]
        public IHttpActionResult RegisterUser([FromBody] UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserService userService = new UserService();
            if (userService.AddUser(userModel) == true)
            {
                var user = userService.GetUser(userModel.Email);
                try
                {

                    //VSOnline.VSECommerce.Domain.Helper.MailHelper.SendRegisterUserMail(user.Username, userModel.Email);
                    VSOnline.VSECommerce.Domain.Helper.MailHelper.SendWelcomeMail(userModel.Email);
                }
                catch
                {

                }
                return Ok();
            }
            return BadRequest("User not registered.");
        }

        private void AddSeller(RetailerUserDTO retailerUserDTO, int userid)
        {
            try
            {
                //Add user as Seller.               
                Seller newSeller = new Seller();
                newSeller.StoreName = retailerUserDTO.BusinessName;
                newSeller.PrimaryContact = userid;
                newSeller.CreatedOnUtc = DateTime.UtcNow;
                newSeller.CreatedUser = userid;
                _unitOfWork.SellerRepository.Add(newSeller);

                SellerBranch branch = new SellerBranch();
                branch.Store = newSeller.StoreId;
                branch.Address1 = retailerUserDTO.Address1;
                branch.Address2 = retailerUserDTO.Address2;
                branch.BranchName = retailerUserDTO.BusinessName;
                branch.Email = retailerUserDTO.Email;
                branch.Country = retailerUserDTO.Country;
                branch.State = retailerUserDTO.State;
                branch.City = retailerUserDTO.City;
                branch.PostalCode = retailerUserDTO.Pincode;
                branch.PhoneNumber = retailerUserDTO.PhoneNumber1;
                branch.Latitude = retailerUserDTO.Latitude;
                branch.Longitude = retailerUserDTO.Longitude;

                branch.CreatedOnUtc = DateTime.UtcNow;
                newSeller.Branches.Add(branch);
                _unitOfWork.SellerRepository.Add(newSeller);
                _unitOfWork.Commit();

            }
            catch
            {

            }
        }

        [HttpGet]
        [ActionName("ForgotPassword")]
        public bool ForgotPassword(string username)
        {
            UserService userService = new UserService();
            if (userService.CheckUserExist(username))
            {
                string passwordResetToken = "";
                var query = userService.GenerateResetPasswordLinkQuery(username, out passwordResetToken);
                var execQuery = _unitOfWork.ExecuteCommand(query, new SqlParameter("@username", username));
                if (execQuery > 0)
                {
                    var user = userService.GetUser(username);
                    try
                    {
                        VSOnline.VSECommerce.Domain.Helper.MailHelper.SendForgetPasswordMail(user.Email, passwordResetToken, username);
                    }
                    catch
                    {

                    }
                    return true;
                }
            }
            return false;
        }


        [HttpPost]
        [ActionName("ResetPassword")]
        public bool ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            UserService userService = new UserService();
            if (userService.CheckUserExist(resetPasswordDTO.UserName) && userService.CheckUserDataInPasswordReset(resetPasswordDTO.UserName, resetPasswordDTO.UniqueId))
            {
                if (userService.UpdatePassword(resetPasswordDTO.UserName, resetPasswordDTO.Password))
                {
                    userService.PasswordResetCompeleted(resetPasswordDTO.UserName, resetPasswordDTO.UniqueId);
                    return true;
                }
            }

            return false;
        }

        [HttpPost]
        [ActionName("ChangePassword")]
        [Authorize(Roles = "Administrators , StoreAdmin , StoreModerator, Registered, SalesSupport, Support, Marketing")]
        public bool ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            UserService userService = new UserService();
            if (userService.CheckUserExist(changePasswordDTO.UserName) && userService.ValidateUser(changePasswordDTO.UserName, changePasswordDTO.CurrentPassword))
            {
                return userService.UpdatePassword(changePasswordDTO.UserName, changePasswordDTO.NewPassword);
            }

            return false;
        }

        [HttpGet]
        [ActionName("GetMyDetails")]
        public UserDTO GetMyDetails(string username)
        {
            UserDTO userDTO = new UserDTO();
            UserService userService = new UserService();
            if (userService.CheckUserExist(username))
            {
                var currentUser = ClaimsPrincipal.Current.Identity.Name;

                if (username == currentUser)
                {
                    var user = userService.GetUser(username);
                    userDTO.FirstName = user.FirstName;
                    userDTO.LastName = user.LastName;
                    userDTO.PhoneNumber1 = user.PhoneNumber1;
                    userDTO.Email = user.Email;
                }

                return userDTO;
            }

            return userDTO;
        }
    }
}
