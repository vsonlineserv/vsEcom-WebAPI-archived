////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain ResultSet
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace VSOnline.VSECommerce.Domain
{
    public class ShoppingCartDatContext :  DbContext
    {
        public ShoppingCartDatContext()
            : base("VBuyContext")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<ShoppingCartItem> ShoppingCartItems{ get; set; }
        public DbSet<BuyerAddress> BuyerAddress { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<OrderProductItem> OrderProductItems { get; set; }
        public DbSet<Discount> Discounts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ShoppingCartDatContext>(null);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);

        }

    }
}
