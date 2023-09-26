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
    public class MenuResult
    {
        public int ParentCategoryId { get; set; }
        public string ParentCategoryName { get; set; }
        public List<SubMenuResult> SubMenu { get; set; }
    }

    public class SubMenuResult
    {
        public int SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryGroupTag { get; set; }
    }
}
