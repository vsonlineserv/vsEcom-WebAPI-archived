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
using System.Web;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Web.Http;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Configuration;
using System.IO;
using System.Net;

                    
namespace VSOnline.VSECommerce.Web.Controllers
{
    [Authorize(Roles = "Administrators")]
    public class AdminFileUploadController : ApiController
    {       
        IUnitOfWork _unitOfWork = null;

        public AdminFileUploadController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Authorize(Roles = "Administrators")]
        public string UploadHomeBannerImages()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
              
                var httpPostedFile = HttpContext.Current.Request.Files[0];
                string folderName = ConfigurationManager.AppSettings["imageUrlBaseFolder"].ToString()
                    + ConfigurationManager.AppSettings["homeFolder"].ToString();

                bool flagTransfer = false;
                var fileNameHosted = httpPostedFile.FileName;

                if (ValidateImageNames(fileNameHosted))
                {
                var fileName = folderName +  httpPostedFile.FileName.Trim();
                flagTransfer = FtpTransfer(httpPostedFile, fileName);

                if (flagTransfer)
                {
                    return Enums.UpdateStatus.Success.ToString();
                }
                }
            }
            return Enums.UpdateStatus.Failure.ToString();

        }

        private bool ValidateImageNames(string fileName)
        {
              string strBannerNames = ConfigurationManager.AppSettings["HomeImageNames"].ToString();
                string[] strAllBannerNames = strBannerNames.Split(',');
                var listBannerNames = strAllBannerNames.ToList();
                return listBannerNames.Contains(fileName);
               
        }
        
        public string UploadHomeCartegoryImages()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection

                var httpPostedFile = HttpContext.Current.Request.Files[0];
                string folderName = ConfigurationManager.AppSettings["imageUrlBaseFolder"].ToString()
                    + ConfigurationManager.AppSettings["homeCategoryFolder"].ToString();

                bool flagTransfer = false;
                var fileNameHosted = httpPostedFile.FileName;
                var fileName = folderName + httpPostedFile.FileName.Trim();
                flagTransfer = FtpTransfer(httpPostedFile, fileName);

                if (flagTransfer)
                {
                    return Enums.UpdateStatus.Success.ToString();
                }
            }
            return Enums.UpdateStatus.Failure.ToString();
        }

        public string UploadMenuCategoryImages()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection

                var httpPostedFile = HttpContext.Current.Request.Files[0];
                string folderName = ConfigurationManager.AppSettings["imageUrlBaseFolder"].ToString()
                    + ConfigurationManager.AppSettings["menuCategoryFolder"].ToString();

                bool flagTransfer = false;
                var fileNameHosted = httpPostedFile.FileName;
                var fileName = folderName + httpPostedFile.FileName.Trim();
                flagTransfer = FtpTransfer(httpPostedFile, fileName);

                if (flagTransfer)
                {
                    return Enums.UpdateStatus.Success.ToString();
                }
            }
            return Enums.UpdateStatus.Failure.ToString();
        }

        private bool FtpTransfer(HttpPostedFile httpPostedFile, string fileName)
        {
            try
            {
                //To Configure for each account.
                string ftpAddress = ConfigurationManager.AppSettings["FTPAddress"].ToString();
                string username = ConfigurationManager.AppSettings["FTPUserName"].ToString();
                string password = ConfigurationManager.AppSettings["FTPPassword"].ToString();

                using (BinaryReader streamBinary = new BinaryReader(httpPostedFile.InputStream))
                {
                    byte[] buffer = streamBinary.ReadBytes(httpPostedFile.ContentLength);

                    WebRequest request = WebRequest.Create("ftp://" + ftpAddress + "/" + fileName);
                    request.Method = WebRequestMethods.Ftp.UploadFile;
                    request.Credentials = new NetworkCredential(username, password);
                    Stream reqStream = request.GetRequestStream();
                    reqStream.Write(buffer, 0, buffer.Length);
                    reqStream.Close();
                }
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
    }                       
}
