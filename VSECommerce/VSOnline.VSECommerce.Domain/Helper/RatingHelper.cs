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
    public class RatingHelper
    {
        public static string InsertProductRatingQuery(int productId, int rating, int currentUserId, int lowest, int highest)
        {
            int verifiedRating = rating < lowest ? lowest : rating;
            verifiedRating = verifiedRating > highest ? highest : rating;

            var query = @"INSERT INTO [ProductRating]
           ([ProductId]
           ,[Rating]
           , [User]
           ,[UpdatedOnUtc])
     VALUES
           (@productId
           ,{rating}
           , {user}
           ,'{date}')".FormatWith(new { productId = productId, rating = verifiedRating, user = currentUserId, date = DateTime.UtcNow.ToString("yyyy-MM-dd")});
            return query;
        }

        public static string InsertSellerRatingQuery(int branchId, int rating, int currentUserId, int lowest, int highest)
        {
            int verifiedRating = rating < lowest ? lowest : rating;
            verifiedRating = verifiedRating > highest ? highest : rating;

            var query = @"INSERT INTO [SellerRating]
           ([BranchId]
           ,[Rating]
            , [User]
           ,[UpdatedOnUtc])
     VALUES
           ({branchId}
           ,{rating}
            , {user}
           ,'{date}')".FormatWith(new { branchId = branchId, rating = verifiedRating,user = currentUserId, date = DateTime.UtcNow.ToString("yyyy-MM-dd") });
            return query;
        }

        public static string GetProductRating(int productId)
        {
            var query = @"SELECT [ProductId], Rating, Count(*) RatingCount from ProductRating
                        WHERE ProductId = {productId}
                        GROUP BY [ProductId], Rating".FormatWith(new { productId = productId });
            return query;
        }

        public static string GetSellerRating(int branchid)
        {
            var query = @"SELECT BranchId, Rating, Count(*) RatingCount from SellerRating
                        WHERE BranchId = {branchid}
                        GROUP BY BranchId,Rating".FormatWith(new { branchid = branchid });
            return query;
        }
        
    }
}
