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
using System.Data.Common;
using System.IO;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;

namespace VSOnline.VSECommerce.Domain.Loader
{
    class LoaderHelper
    {
      

        public static string GetColumn(DataRow Row, int Ordinal)
        {
            return Row.Table.Columns[Ordinal].ColumnName;
        }
    }
}
