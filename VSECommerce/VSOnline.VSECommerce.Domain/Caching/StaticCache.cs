﻿////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Core.Caching
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Runtime.Caching;


namespace VSOnline.VSECommerce.Core.Caching
{
    
    public partial class StaticCache : ICache
    {
		private ObjectCache _cache;

        protected ObjectCache Cache
        {
            get
            {
				if (_cache == null)
				{
					_cache = new MemoryCache("VBuy.in");
				}
				return _cache;
            }
        }

        public IEnumerable<KeyValuePair<string, object>> Entries
        {
            get
            {
				return Cache;
            }
        }

		public object Get(string key)
        {
			return Cache.Get(key);
        }

		public void Set(string key, object value, int? cacheTime)
		{
			var cacheItem = new CacheItem(key, value);
			CacheItemPolicy policy = null;
			if (cacheTime.GetValueOrDefault() > 0)
			{
				policy = new CacheItemPolicy { AbsoluteExpiration = DateTime.Now + TimeSpan.FromMinutes(cacheTime.Value) };
			}

			Cache.Add(cacheItem, policy);
		}

        public bool Contains(string key)
        {
            return Cache.Contains(key);
        }

        public void Remove(string key)
        {
            Cache.Remove(key);
        }

		public bool IsSingleton
		{
			get { return true; }
		}
	}
}
