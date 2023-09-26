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
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Domain.ResultSet
{
    public class NewProductResultSet
    {
        public Enums.UpdateStatus Status { get; set;}
        public Product NewProduct { get; set; }
        public string StatusString
        {
            get
            {
                return Status.ToString();
            }
        }
    }

    public class BaseUpdateResultSet
    {
        public Enums.UpdateStatus Status { get; set; }
        public int UpdatedId { get; set; }
        public string StatusString
        {
            get
            {
                return Status.ToString();
            }
        }
    }
}
