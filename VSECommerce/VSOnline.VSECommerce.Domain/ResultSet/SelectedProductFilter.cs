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
        public class SelectedProductFilter
        {
            public SelectedProductFilterList SelectedProductFilterList { get; set; }
          
        }

        public class SelectedProductFilterList
        {
            public string FilterParameter { get; set; }
            public string FilterValueText { get; set; }
        }
}
