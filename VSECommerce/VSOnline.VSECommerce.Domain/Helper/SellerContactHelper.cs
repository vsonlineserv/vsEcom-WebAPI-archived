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
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public class SellerContactHelper
    {
        public static string InsertSellerContactQuery(int productId, int branchId, string name, string email, string mobileNumber, string subject)
        {

            var query = @"INSERT INTO [ProductContact]
           ([ContactName]
           ,[Mobile]
           ,[Email]
            ,[Subject]
           ,[ProductId]
           ,[StoreId]
           ,[UpdatedOnUtc])
     VALUES
           ('{name}'
           ,{mobile}
            ,'{email}'
            , @subject
            ,{productId}
            , @branchId
           ,'{date}')".FormatWith(new { name = name, mobile= mobileNumber, email = email,
                          productId = productId
                          ,date = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm") });
            return query;
        }

        public static string GetSellerInbox(int branchId)
        {
            var query = @"SELECT Id,ContactName,Mobile,ProductContact.Email,ProductContact.ProductId,StoreId, 
                        [Subject], Reply, DATEADD(mi, 330, ProductContact.UpdatedOnUtc)  UpdatedOnIST
                        , DATEADD(mi, 330, ProductContact.ReplyDate) ReplyDateIST
                        ,Product.Name ProductName, SellerBranch.BranchName
                        from ProductContact
                        Inner Join Product ON ProductContact.ProductId = Product.ProductId
                        Inner Join SellerBranch ON ProductContact.StoreId = SellerBranch.BranchId
                        WHERE StoreId = {branchId}
                        Order By ProductContact.UpdatedOnUtc DESC".FormatWith(new { branchId });
            return query;
        }

        public static string VerifyDuplicateInbox(int productId, int branchId, string name, string email, string mobileNumber)
        {
            
            var query = @"select count(*) from  ProductContact
                WHERE mobile='{mobileNumber}' AND Email = '{email}' AND ProductId= {productId} AND StoreId = {branchId}
                AND UpdatedOnUtc > '{allowedDate}'"
                .FormatWith(new { mobileNumber, email, productId, branchId, allowedDate = DateTime.UtcNow.AddHours(-2).ToString("yyyy-MM-dd HH:mm")});
            return query;
        }


        public static string UpdateReply(int mailId, string reply)
        {
            var query = @"UPDATE ProductContact SET Reply = '{reply}' , ReplyDate = '{curDate}' WHERE Id = @mailId"
                .FormatWith(new { reply, curDate = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm") });
            return query;
        }

        public static string GetContactInformation (int mailId)
        {
            var query = @"SELECT ContactName, Mobile, Email, ProductId, StoreId from ProductContact WHERE Id = {mailId}"
                  .FormatWith(new { mailId });
            return query;
        }
    }
}
