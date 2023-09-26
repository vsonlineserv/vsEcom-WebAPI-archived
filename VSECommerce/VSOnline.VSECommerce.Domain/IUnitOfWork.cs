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
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Domain
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Category> CategoryRepository { get; }
        IGenericRepository<Product> ProductRepository { get; }
        IGenericRepository<Seller> SellerRepository { get; }
        IGenericRepository<OrderProduct> OrderRepository { get; }
        IGenericRepository<SellerBranch> SellerBranchRepository { get; }
        IGenericRepository<Pricing> PricingRepository { get; }
        IGenericRepository<Manufacturer> ManufacturerRepository { get; }
        IGenericRepository<UserWishlist> UserWishlistRepository { get; }
        List<T> ExecuteQuery<T>(string query);
        int ExecuteCommand(string query);
        int ExecuteCommand(string query, params object[] parameters);
        void Commit();
        void UpdateAndSave(object entity);
    }
}
