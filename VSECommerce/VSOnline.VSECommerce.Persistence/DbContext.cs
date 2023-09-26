// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext()
            : base("VBuyContext")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<User> Users{get; set;}
        public DbSet<Role> Roles{get; set;}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<DataContext>(null);            
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Product>()
            .HasRequired<Manufacturer>(o => o.ManufacturerDetails)
            .WithMany(e => e.ProductCollection)
            .HasForeignKey(x => x.Manufacturer);

            modelBuilder.Entity<Product>()
           .HasRequired<Category>(o => o.CategoryDetails)
           .WithMany()
           .HasForeignKey(x => x.Category);

            base.OnModelCreating(modelBuilder);

        }
    }
  
}
