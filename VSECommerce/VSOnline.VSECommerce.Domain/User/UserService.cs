////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain ResultSet
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Persistence;
using System.Data.Entity;
using VSOnline.VSECommerce.Persistence.Migration;
using VSOnline.VSECommerce.Domain.DTO;
using AutoMapper;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain
{
    public class UserService
    {
        public bool AddUser(UserModel userModel)
        {
            try
            {
                User user = new User();

                user.Password = GeneratePassword(userModel.Password, user.PasswordSalt);
                user.Username = userModel.Email;
                user.Email = userModel.Email;
                user.UserGuid = Guid.NewGuid();
                user.FirstName = userModel.FirstName;

                user.PhoneNumber1 = userModel.PhoneNumber1;
                user.PasswordFormatId = 1;
                user.PasswordSalt = DateTime.Now.Year + "_VBuy.in";
                user.Password = GeneratePassword(userModel.Password, user.PasswordSalt);
                user.CreatedOnUtc = DateTime.UtcNow;
                user.IsMerchant = false;

                using (DataContext dbCxt = new DataContext())
                {
                    dbCxt.Entry(user).State = EntityState.Added;
                    dbCxt.SaveChanges();
                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool CheckUserExist(string userName)
        {
            try
            {                
                using (DataContext dbCxt = new DataContext())
                {
                    string name = dbCxt.Database.SqlQuery<string>("Select Top 1 UserName from [User] WHERE UserName={0}", userName).FirstOrDefault<string>();                    
                   return !string.IsNullOrEmpty(name);
                }

            } 
            catch
            {
                return false;
            }
            
        }

        public bool CheckUserDataInPasswordReset(string username, string uniqueId)
        {
           
            try
            {
                using (DataContext dbCxt = new DataContext())
                {
                    string userInPasswordReset = dbCxt.Database.SqlQuery<string>(@"Select Top 1 UserName from passwordreset
                    WHERE UserName={0} AND PasswordResetToken={1} AND FlagCompleted = 0",
               username, uniqueId).FirstOrDefault<string>();               
                    return !string.IsNullOrEmpty(userInPasswordReset);
                }

            }
            catch
            {
                return false;
            }
        }

        public void PasswordResetCompeleted(string username, string uniqueId)
        {
            try
            {
                using (DataContext dbCxt = new DataContext())
                {
                    string updateFlagQuery = @"UPDATE passwordreset SET FlagCompleted = 1
                    WHERE UserName='{username}' AND PasswordResetToken='{uniqueId}'".FormatWith(new { username, uniqueId });

                    dbCxt.Database.ExecuteSqlCommand(updateFlagQuery);
                }

            }
            catch
            {
               
            }
        }

        public bool UpdatePassword(string userName , string password)
        {
            try
            {
                var passwordSalt = DateTime.Now.Year + "_VBuy.in";
                var updatedPassword = GeneratePassword(password, passwordSalt);

                using (DataContext dbCxt = new DataContext())
                {
                    User user = dbCxt.Users.Where<User>(x => x.Username == userName).FirstOrDefault<User>();                    
                    user.Password = updatedPassword;
                    user.PasswordSalt = passwordSalt;
                    user.UpdatedOnUtc = DateTime.UtcNow;
                    dbCxt.Entry(user).State = EntityState.Modified;
                    dbCxt.SaveChanges();
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        //only for merchant
        public bool AddUser(RetailerUserDTO retailerUserDTO)
        {
            try
            {
                User user = new User();

                user.Username = retailerUserDTO.Email;
                user.Email = retailerUserDTO.Email;
                user.UserGuid = Guid.NewGuid();
                user.FirstName = retailerUserDTO.FirstName;
                user.LastName = retailerUserDTO.LastName;
                user.PhoneNumber1 = retailerUserDTO.PhoneNumber1;
                user.PasswordFormatId = 1;      
                user.PasswordSalt = DateTime.Now.Year + "_VBuy.in";
                user.Password = GeneratePassword(retailerUserDTO.Password, user.PasswordSalt);
                user.CreatedOnUtc = DateTime.UtcNow;
                user.IsMerchant = true;

                using (DataContext dbCxt = new DataContext())
                {
                    dbCxt.Entry(user).State = EntityState.Added;
                    dbCxt.SaveChanges();
                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        private byte[] GeneratePassword(string password, string passwordSalt)
        {
            SHA256Managed crypt = new SHA256Managed();
            string hash = String.Empty;
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(password + passwordSalt), 0, Encoding.UTF8.GetByteCount(password + passwordSalt));
           // return Convert.ToBase64String(crypto);
            return crypto;
        }

        public bool ValidateUser(string email, string password)
        {
            var userSaltQuery = "select Password, PasswordSalt from [USER] WHERE Username= '{email}'"
                .FormatWith(new { email });

            DataContext unitofWork = new DataContext();
            var userPassword = unitofWork.Database.SqlQuery<PasswordResult>(userSaltQuery).FirstOrDefault<PasswordResult>();

            if (userPassword!=null && !String.IsNullOrEmpty(userPassword.PasswordSalt))
             {
                 var passwordHash = GeneratePassword(password, userPassword.PasswordSalt);
                 var userEnterdPassword = "0x" + BitConverter.ToString(passwordHash).Replace("-", "");
                 var dbPassword = "0x" + BitConverter.ToString(userPassword.Password).Replace("-", "");
                 return (userEnterdPassword == dbPassword);
             }
            return false;              
        }

        public int GetUserId(string userName)
        {
            User user = new User();
            using (DataContext dbCxt = new DataContext())
            {
                user = dbCxt.Users.Where<User>(x => x.Username == userName).FirstOrDefault<User>();
            }
            return user.UserId;
        }

        public User GetUser(string userName)
        {
            User user = new User();
            using (DataContext dbCxt = new DataContext())
            {
                user = dbCxt.Users.Where<User>(x => x.Username == userName).FirstOrDefault<User>();
            }
            return user;
        }

        public bool VBuyHighLevelUsers(string userName)
        {
            var userRole = GetUserRole(userName);

            if (userRole == Enums.Role.Administrators.ToString() || userRole == Enums.Role.Marketing.ToString() || userRole == Enums.Role.SalesSupport.ToString()
            || userRole == Enums.Role.Support.ToString())
            {
                return true;
            }
            return false;
        }

        public string GetUserRole (string userName)
        {
            using (DataContext dbCxt = new DataContext())
            {
              User user =  dbCxt.Users.Where<User>(x => x.Username == userName).FirstOrDefault<User>();
              if (user.IsSuperAdmin == true)
              {
                  return Enums.Role.Administrators.ToString();
              }
               else if(user.IsMerchant)
               {
                   return Enums.Role.StoreModerator.ToString();
               }               
               else if (user.IsSales == true)
               {
                   return Enums.Role.SalesSupport.ToString();
               }
               else if (user.IsMarketing == true)
               {
                   return Enums.Role.Marketing.ToString();
               }
               else if (user.IsSupport == true)
               {
                   return Enums.Role.Support.ToString();
               }
               else if(user.UserId >0)
               {
                   return Enums.Role.Registered.ToString();
               }
              
            }
            return Enums.Role.Guests.ToString();
        }

        public string GenerateResetPasswordLinkQuery(string username, out string passwordResetToken)
        {
            //Check if the user already exist in password reset .

            //else insert 
            using (DataContext dbCxt = new DataContext())
            {
                string userInPasswordReset = dbCxt.Database.SqlQuery<string>("Select Top 1 UserName from passwordreset WHERE UserName={0}", username).FirstOrDefault<string>();

                passwordResetToken = Convert.ToString(GenerateUniquePasswordResetToken(username));
                DateTime PasswordResetExpiration = DateTime.UtcNow.AddDays(1);
                
                if (!string.IsNullOrEmpty(userInPasswordReset))
                {
                    //if user already exist then update the PasswordResteToken, expirydate column 
                    var query = @"Update passwordreset SET PasswordResetToken = '{passwordresettoken}',
                    PasswordResetExpiration = '{PasswordResetExpiration}'
                    , FlagCompleted = 0
                        WHERE Username= @username"
                      .FormatWith(new { username, PasswordResetToken = passwordResetToken, PasswordResetExpiration = PasswordResetExpiration });

                    return query;
                }
                else if (!string.IsNullOrEmpty(username))
                {
                    var query = @"insert into passwordreset (UserName,PasswordResetToken,PasswordResetExpiration) 
                        Values(@username,'{PasswordResetToken}','{PasswordResetExpiration}')"
                       .FormatWith(new { username, PasswordResetToken = passwordResetToken, PasswordResetExpiration = PasswordResetExpiration.ToString("yyyy-MM-dd") });

                    return query;
                }
            }

            return string.Empty;
        }


        private Guid GenerateUniquePasswordResetToken(string username)
        {
            return Guid.NewGuid();
        }

        public bool ValidateAndCreateUser(string email, string name )
        {
            User user = GetUser(email);
            if(user!=null &&  user.Email == email)
            {
                return true;
            }
            else if (user == null)
            {
                UserModel userModel = new UserModel();

                userModel.Email = email;
                userModel.FirstName = name;
                userModel.Password = email;
                userModel.ConfirmPassword = email;


                return AddUser(userModel);

            }
            return false;

        }

        public User GetUser(int userId)
        {
            User user = new User();
            using (DataContext dbCxt = new DataContext())
            {
                user = dbCxt.Users.Where<User>(x => x.UserId == userId).FirstOrDefault<User>();
            }
            return user;
        }
    }
}
