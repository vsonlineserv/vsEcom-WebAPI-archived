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
using System.Web;
using System.IO;
using VSOnline.VSECommerce.Utilities;
using System.Text;
using System.Configuration;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Data;
using System.Data.OleDb;
using System.Security.Claims;
using System.Data.SqlClient;
using ExcelDataReader;


namespace VSOnline.VSECommerce.Web.Controllers
{
    public class FileUploadController : ApiController
    {
        IUnitOfWork _unitOfWork = null;

        public FileUploadController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Authorize(Roles = "Administrators , StoreAdmin , StoreModerator")]
        public string UploadFile(int productId)
        {
            //Todo:We need to ensure that the user doesnt try to upload a lot of files without product. 
            //tampering our server shoud be avoided & security to be improved.
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {

                    // Get the uploaded image from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files[0];

                    if (httpPostedFile.ContentType == "image/jpeg" || httpPostedFile.ContentType == "image/png" ||
                        httpPostedFile.ContentType == "image/jpg" || httpPostedFile.ContentType == "image/gif")
                    {

                        if (httpPostedFile != null && productId>0)
                        {

                                var product = _unitOfWork.ProductRepository.Find(x=>x.ProductId == productId).First<Product>();
                                bool flagTransfer = false;
                                string folderName = ConfigurationManager.AppSettings["ImageFolder"].ToString();

                                if (string.IsNullOrEmpty(product.PictureName))
                                {
                                    var fileName = folderName + product.ProductId + "_1_" + httpPostedFile.FileName;
                                    flagTransfer = FtpTransfer(httpPostedFile, fileName);
                                    product.PictureName = flagTransfer? fileName : "";
                                }
                                else if (string.IsNullOrEmpty(product.PictureName1))
                                {
                                    var fileName = folderName + product.ProductId + "_2_" + httpPostedFile.FileName;
                                    flagTransfer = FtpTransfer(httpPostedFile, fileName);
                                    product.PictureName1 = flagTransfer ? fileName : "";
                                }
                                else if (string.IsNullOrEmpty(product.PictureName2))
                                {
                                    var fileName = folderName + product.ProductId + "_3_" + httpPostedFile.FileName;
                                    flagTransfer = FtpTransfer(httpPostedFile, fileName);
                                    product.PictureName2 = flagTransfer ? fileName : "";
                                }
                                else
                                {
                                    return "No more files can be added.";
                                }
                                if (flagTransfer)
                                {
                                    _unitOfWork.UpdateAndSave(product);
                                    return Enums.UpdateStatus.Success.ToString();
                                }
                                else
                                {
                                    return Enums.UpdateStatus.Error.ToString();
                                }
                        }
                    }
                    else
                    {
                        return Enums.UpdateStatus.Failure.ToString();
                    }
                }
            }
            catch(Exception)
            {
                //log later
            }
            return Enums.UpdateStatus.Failure.ToString();
        }


        /// <summary>
        /// if .txt format, then it is tab seperated.
        /// only CSV with Tab seperated can be processed.
        /// </summary>
        /// <returns></returns>
        public string UploadBulkProducts()
        {
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    // Get the uploaded image from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files[0];
                      var currentUser = ClaimsPrincipal.Current.Identity.Name;
                        var  retailer = _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);

                    if (httpPostedFile.ContentType == "application/vnd.ms-excel"
                         || httpPostedFile.ContentType == "application/csv" || httpPostedFile.ContentType == "text/plain"
                        || httpPostedFile.ContentType == "text/comma-separated-values" || httpPostedFile.ContentType == "application/vnd.msexcel")
                    {
                        var csvProductDataTable = new DataTable();
                        
                            string folderNameExcel = ConfigurationManager.AppSettings["productUploadFolder"].ToString();
                            var fileName = folderNameExcel + "_" + DateTime.UtcNow.ToString() + "_" + currentUser +  "_" + httpPostedFile.FileName;

                            
                            if (httpPostedFile.ContentType == "text/plain")
                            {
                                csvProductDataTable = ImportCSV(httpPostedFile, new string[] { "\t" });
                            }
                            else
                            {
                                csvProductDataTable = ImportfromExcelProductData(httpPostedFile);
                            }

                            FtpTransfer(httpPostedFile, fileName);

                            if (csvProductDataTable != null &&  csvProductDataTable.Rows.Count>0)
                            {
                                VSOnline.VSECommerce.Domain.Loader.ImportProductData executeLoader = new Domain.Loader.ImportProductData();
                                var flagDataProcessed = executeLoader.ImportDataTableToProduct(csvProductDataTable, retailer.Branches[0].BranchName, retailer.StoreId, retailer.Branches[0].BranchId);
                                return flagDataProcessed;                                
                            }                     
                        
                    }
                    return Enums.UpdateStatus.Error.ToString();
                }
            }
            catch
            {
                  return Enums.UpdateStatus.Error.ToString();
            }
            return Enums.UpdateStatus.Failure.ToString();

        }

        public string UploadBulkImagesInZip()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var currentUser = ClaimsPrincipal.Current.Identity.Name;
                var httpPostedFile = HttpContext.Current.Request.Files[0];        
                var flagTransferFiles = FtpTransferExtractZip(httpPostedFile);

                if (flagTransferFiles)
                {
                   return Enums.UpdateStatus.Success.ToString();
                }

            }
            return Enums.UpdateStatus.Failure.ToString();
        }

        public string UploadImagesInBulk()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var currentUser = ClaimsPrincipal.Current.Identity.Name;
                var httpPostedFile = HttpContext.Current.Request.Files[0];
                string folderName = ConfigurationManager.AppSettings["ImageFolder"].ToString();

                string ftpAddress = ConfigurationManager.AppSettings["FTPAddress"].ToString();
                string username = ConfigurationManager.AppSettings["FTPUserName"].ToString();
                string password = ConfigurationManager.AppSettings["FTPPassword"].ToString();

                bool flagTransfer = false;
                if (!httpPostedFile.FileName.Contains("/"))
                {
                    var fileName = httpPostedFile.FileName;                    
                    flagTransfer = FtpTransfer(httpPostedFile, fileName);
                }
                if (httpPostedFile.FileName.Contains("/"))
                {
                    CreateDirectoryinFTP(httpPostedFile.FileName, ftpAddress, username, password);
                    flagTransfer = FtpTransfer(httpPostedFile, httpPostedFile.FileName);
                }

                if (flagTransfer)
                {
                    return Enums.UpdateStatus.Success.ToString();
                }

            }
            return Enums.UpdateStatus.Failure.ToString();
        }

        private DataTable ImportfromExcelProductData(HttpPostedFile httpPostedFile)
        {
           //https:/github.com/ExcelDataReader/ExcelDataReader/issues/101
            //Choose one of either 1 or 2
            //1. Reading from a binary Excel file ('97-2003 format; *.xls)

            IExcelDataReader excelReader = ExcelReaderFactory.CreateBinaryReader(httpPostedFile.InputStream);

            ////2. Reading from a OpenXml Excel file (2007 format; *.xlsx)
            //IExcelDataReader excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);           

            //4. DataSet - Create column names from first row
            excelReader.IsFirstRowAsColumnNames = true;
            DataSet result = excelReader.AsDataSet();

            //6. Free resources (IExcelDataReader is IDisposable)
            excelReader.Close();
            if (result!=null && result.Tables.Count > 0)
            {
                return result.Tables[0];
            }
            return null;
        }

        private DataTable ImportCSV(HttpPostedFile httpPostedFile, string[] sepString)
        {
            DataTable dt = new DataTable();
            using (StreamReader sr = new StreamReader(httpPostedFile.InputStream))
            {

                string firstLine = sr.ReadLine();
                var headers = firstLine.Split(sepString, StringSplitOptions.None);
                foreach (var header in headers)
                {
                    //create column headers
                    dt.Columns.Add(header);
                }
                int columnInterval = headers.Count();
                string newLine = sr.ReadLine();
                while (newLine != null)
                {
                    //loop adds each row to the datatable
                    var fields = newLine.Split(sepString, StringSplitOptions.None); // csv delimiter    
                    var currentLength = fields.Count();
                    if (currentLength < columnInterval)
                    {
                        while (currentLength < columnInterval)
                        {
                            //if the count of items in the row is less than the column row go to next line until count matches column number total
                            newLine += sr.ReadLine();
                            currentLength = newLine.Split(sepString, StringSplitOptions.None).Count();
                        }
                        fields = newLine.Split(sepString, StringSplitOptions.None);
                    }
                    if (currentLength > columnInterval)
                    {
                        //ideally never executes - but if csv row has too many separators, line is skipped
                        //newLine = sr.ReadLine();
                        //continue;
                    }
                    dt.Rows.Add(fields);
                    newLine = sr.ReadLine();
                }
                sr.Close();
            }

            return dt;
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

        public bool FtpTransferExtractZip(HttpPostedFile httpPostedFile)
        {
            //To Configure for each account.
            string ftpAddress = ConfigurationManager.AppSettings["FTPAddress"].ToString();
            string username = ConfigurationManager.AppSettings["FTPUserName"].ToString();
            string password = ConfigurationManager.AppSettings["FTPPassword"].ToString();

            try
            {
                ZipInputStream zipInputStream = new ZipInputStream(httpPostedFile.InputStream);

                        byte[] myByteArray = new byte[40960];
                        using (MemoryStream mem = new MemoryStream(myByteArray))
                        {
                            using (ZipInputStream zipStream = new ZipInputStream(httpPostedFile.InputStream))
                            {
                                ZipEntry currentEntry=zipStream.GetNextEntry();
                                while (currentEntry  != null)
                                {
                                    if (currentEntry.IsFile)
                                    {
                                        byte[] data = new byte[currentEntry.Size];
                                        // currentEntry.Read(data, 0, data.Length);
                                        zipStream.Read(data, 0, data.Length);
                                        // do what ever with the data
                                        WebRequest request = WebRequest.Create("ftp://" + ftpAddress + "/" + currentEntry.Name);
                                        request.Method = WebRequestMethods.Ftp.UploadFile;
                                        request.Credentials = new NetworkCredential(username, password);
                                        Stream reqStream = request.GetRequestStream();
                                        reqStream.Write(data, 0, data.Length);
                                        reqStream.Close();
                                    }
                                    else if(currentEntry.IsDirectory)
                                    {
                                        CreateDirectoryinFTP(currentEntry.Name,ftpAddress,username, password);
                                    }
                                    currentEntry=zipStream.GetNextEntry();
                                }
                            
                            }
                        }
                     
               // }
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        private void CreateDirectoryinFTP(string directoryName, string ftpAddress, string username, string password)
        {
            string[] folderArray = directoryName.Split('/');
            string folderName = "";
            for (int i = 0; i < folderArray.Length; i++)
            {
                if (!string.IsNullOrEmpty(folderArray[i]) && folderArray[i].Length > 2 && !folderArray[i].Contains("."))
                {

                    folderName = string.IsNullOrEmpty(folderName) ? folderArray[i] : folderName + "/" + folderArray[i];
                    if (!DirectoryExists(folderName, username, password, ftpAddress))
                    {
                        WebRequest request = WebRequest.Create("ftp://" + ftpAddress + "/" + folderName);
                        request.Method = WebRequestMethods.Ftp.MakeDirectory;
                        request.Credentials = new NetworkCredential(username, password);
                        var response = request.GetResponse();
                    }
                }
            }
        }

        public bool DirectoryExists(string directory, string username, string password, string ftpAddress)
        {
            bool directoryExists= false;

            var request = WebRequest.Create("ftp://" + ftpAddress + "/" + directory + "/");
            request.Method = WebRequestMethods.Ftp.ListDirectory;
            request.Credentials = new NetworkCredential(username, password);

            try
            {
                using (request.GetResponse())
                {
                    directoryExists = true;
                }
            }
            catch (WebException ex)
            {
                if (ex.Response != null)
                {
                    FtpWebResponse response = (FtpWebResponse)ex.Response;
                    if (response.StatusCode == FtpStatusCode.ActionNotTakenFileUnavailable)
                    {
                        directoryExists = false;
                    }
                }                 
            }
            finally
            {
                request = null;
            }

            return directoryExists;
        }
    }
}
