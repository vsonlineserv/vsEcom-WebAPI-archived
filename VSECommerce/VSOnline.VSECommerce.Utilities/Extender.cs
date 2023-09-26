// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace VSOnline.VSECommerce.Utilities
{
   public static class Extender
    {
        public static bool HasItems(this IEnumerable source)
        {
            return source != null && source.GetEnumerator().MoveNext();
        }
    }
}
