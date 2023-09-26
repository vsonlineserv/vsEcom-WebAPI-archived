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
using VSOnline.VSECommerce.Persistence;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Domain
{
    public class EfUnitOfWork : DataContext, IUnitOfWork
    {
        private readonly EfGenericRepository<SiteSettings> _siteSettingsRepo;
        private readonly EfGenericRepository<Category> _categoryRepo;
        private readonly EfGenericRepository<Product> _productRepo;
        private readonly EfGenericRepository<Seller> _sellerRepo;
        private readonly EfGenericRepository<SellerBranch> _sellerBranchRepo;
        private readonly EfGenericRepository<Pricing> _pricingRepo;
        private readonly EfGenericRepository<Manufacturer> _manufacturerRepo;
        private readonly EfGenericRepository<OrderProduct> _orderProductRepo;
        private readonly EfGenericRepository<UserWishlist> _userWishlistRepo;


        public DbSet<SiteSettings> SiteSettingValues { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<SellerBranch> SellerBranch { get; set; }
        public DbSet<Pricing> Pricings { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<UserWishlist> UserWishlist { get; set; }


        public EfUnitOfWork()
        {
            _siteSettingsRepo = new EfGenericRepository<SiteSettings>(SiteSettingValues);
            _categoryRepo = new EfGenericRepository<Category>(Categories);
            _productRepo = new EfGenericRepository<Product>(Products);
            _sellerRepo = new EfGenericRepository<Seller>(Sellers);
            _sellerBranchRepo = new EfGenericRepository<SellerBranch>(SellerBranch);
            _pricingRepo = new EfGenericRepository<Pricing>(Pricings);
            _manufacturerRepo = new EfGenericRepository<Manufacturer>(Manufacturers);
            _userWishlistRepo = new EfGenericRepository<UserWishlist>(UserWishlist);
            _orderProductRepo = new EfGenericRepository<OrderProduct>(OrderProducts);
        }

        #region IUnitOfWork Implementation

        public IGenericRepository<Category> CategoryRepository
        {
            get { return _categoryRepo; }
        }

        public IGenericRepository<Product> ProductRepository
        {
            get { return _productRepo; }
        }

        public IGenericRepository<Seller> SellerRepository
        {
            get { return _sellerRepo; }
        }

        public IGenericRepository<SellerBranch> SellerBranchRepository
        {
            get { return _sellerBranchRepo; }
        }

        public IGenericRepository<Pricing> PricingRepository 
        {
            get { return _pricingRepo; }
        }

        public IGenericRepository<Manufacturer> ManufacturerRepository
        {
            get { return _manufacturerRepo; }
        }

        public IGenericRepository<UserWishlist> UserWishlistRepository
        {
            get { return _userWishlistRepo; }
        }

        public IGenericRepository<OrderProduct> OrderRepository
        {
            get { return _orderProductRepo; }
        }

        public void Commit()
        {             
            this.SaveChanges();
        }    

        public List<T> ExecuteQuery<T>(string query)
        {
            try
            {
                return this.Database.SqlQuery<T>(query).ToList<T>();
            }
            catch
            {

            }
            return new List<T>();
        }

        public void UpdateAndSave(object entity)
        {
            this.Entry(entity).State = EntityState.Modified;
            this.SaveChanges();
        }

        #endregion
        public int ExecuteCommand(string query)
        {                     
            query = query + " AND 1={0}";
            return this.Database.ExecuteSqlCommand(query, 1);
        }

        public int ExecuteCommand(string query, params object[] parameters)
        {
            return this.Database.ExecuteSqlCommand(query, parameters);
        }
    }
}
                                           