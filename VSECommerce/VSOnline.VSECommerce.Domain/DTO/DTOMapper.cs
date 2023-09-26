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
using VSOnline.VSECommerce.Persistence.Entity;
using AutoMapper;


namespace VSOnline.VSECommerce.Domain.DTO
{
    public static class DTOMapper
    {
        public static Category ToEntity(this CategoryDTO dto, Category destination)
        {            
            return Mapper.Map(dto, destination);
        }

        public static List<CategoryDTO> ToEntityList(this List<Category> categoryList,
            List<CategoryDTO> categoryDTOList)
        {
            return Mapper.Map<List<Category>, List<CategoryDTO>>(categoryList, categoryDTOList);
        }

        public static List<ProductModelWithCategory> ToProductModelWithCategoryList(this List<Product> productList, List<ProductModelWithCategory> productModelWithCategoryList)
        {
            return Mapper.Map<List<Product>, List<ProductModelWithCategory>>(productList, productModelWithCategoryList);
        }
    }
}                                                             
