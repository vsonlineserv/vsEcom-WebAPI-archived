////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain Repository
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Utilities;
using AutoMapper;

namespace VSOnline.VSECommerce.Domain
{
    public static class SellerBranchRepository
    {
        public static List<RetailerLocationMapDTO> GetStoreLocations(this IGenericRepository<SellerBranch> sellerBranchRepository, IEnumerable<int> branchIdList)
        {
            var sellerBranches = sellerBranchRepository.Find(x => branchIdList.Contains(x.BranchId), y => y.SellerMap)
                .ToList<SellerBranch>();

            List<RetailerLocationMapDTO> retailerLocationMapDTOList = new List<RetailerLocationMapDTO>();
            
            Mapper.Map<IEnumerable<SellerBranch>,
            IEnumerable<RetailerLocationMapDTO>>(sellerBranches, retailerLocationMapDTOList);

            return retailerLocationMapDTOList;
        }

        public static string GetStoresWithinAreaQuery(this IGenericRepository<SellerBranch> sellerRepository, decimal latitude,
            decimal longitude, int radius)
        {
            //Earth Radius 6371 KM. 
            string query = @"SELECT BranchId,Store,
                    ACOS( SIN( RADIANS( Latitude ) ) * SIN( RADIANS( {lat} ) ) + COS( RADIANS( Latitude ) )
                    * COS( RADIANS( {lat} )) * COS( RADIANS( Longitude ) - RADIANS( {lng} )) ) * 6380 AS 'Distance'
                    FROM SellerBranch
                    WHERE
                    ACOS( SIN( RADIANS( Latitude) ) * SIN( RADIANS( {lat} ) ) + COS( RADIANS( Latitude ) )
                    * COS( RADIANS( {lat} )) * COS( RADIANS( Longitude ) - RADIANS( {lng} )) ) * 6371 < {radius}
                    ORDER BY 'Distance'".FormatWith(new { lat = latitude, lng=longitude, radius }); ;
            return query;
        }
    }
}
