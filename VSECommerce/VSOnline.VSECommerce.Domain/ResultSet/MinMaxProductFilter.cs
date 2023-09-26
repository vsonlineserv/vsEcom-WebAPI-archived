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

namespace VSOnline.VSECommerce.Domain.ResultSet
{
   public class MinMaxProductFilter
    {
       public decimal? Min {get; set;}
       public decimal? Max {get; set;}
    }

   public class BaseProductFilter
   {
       public decimal? Min { get; set; }
       public decimal? Max { get; set; }
       public List<BrandFilterDTO> Brand { get; set; }
   }

   public class ProductFilter
   {
       public string FilterParameter { get; set; }
       public string FilterValueText { get; set; }
   }
}
