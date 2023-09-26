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

namespace VSOnline.VSECommerce.Domain.ResultSet
{
    public class CatalogFilter
    {
        public int[] Categories {get; set;}
        public int[] Products {get; set;}
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }

    public class SearchFilter
    {
        public string Search {get; set;}
        public string Address { get; set; }
    }
    
    public class Location
    {
        public string Latitude { get; set; }
        public string Longitude { get; set; }

    }
  
    public class CatalogMapView
    {
        
    }
}
