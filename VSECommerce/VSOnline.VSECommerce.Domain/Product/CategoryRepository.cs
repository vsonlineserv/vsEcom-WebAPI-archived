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
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain 
{
    public static class CategoryRepository
    {
        public static Category CreateCategory(this IGenericRepository<Category> cat, CategoryDTO categoryDto)
        {
            Category catObj =   new Category();
            categoryDto.ToEntity(catObj);            
            cat.Add(catObj);
            return catObj;
        }

        public static int DeleteCategory(this IGenericRepository<Category> cat, int id)
        {           
            var query = "UPDATE Category SET IsDeleted = 1 WHERE CategoryId={0}";
            EfUnitOfWork unitofWork = new EfUnitOfWork();
            return unitofWork.ExecuteCommand(query, id);
        }

        public static  List<MenuResult> GetCategoryMenu(this IGenericRepository<Category> categoryRepository)
        {
            var parentCategories = GetAllCategory(categoryRepository);
            var menuResultList = new List<MenuResult>();
             
            foreach(Category parentCategory in parentCategories)
            {        
                MenuResult menuResult= new MenuResult();
                menuResult.ParentCategoryId = parentCategory.CategoryId;
                menuResult.ParentCategoryName = parentCategory.Name;

                var subCategories = categoryRepository.Find(x => x.ParentCategoryId == parentCategory.CategoryId
                    && x.IsDeleted != true && x.Published == true).OrderBy(z=>z.GroupDisplayOrder)
                    .ThenBy(y=>y.CategoryGroupTag).ThenBy(g=>g.DisplayOrder);                
                menuResult.SubMenu = new List<SubMenuResult>();
                foreach(Category category in subCategories)
                {
                    SubMenuResult subMenuResult = new SubMenuResult();
                    subMenuResult.SubCategoryId = category.CategoryId;
                    subMenuResult.SubCategoryName = category.Name;
                    subMenuResult.CategoryGroupTag = category.CategoryGroupTag;
                    menuResult.SubMenu.Add(subMenuResult);
                }
                menuResultList.Add(menuResult);
            }
            return menuResultList;
        }

        public static RetailerProductFilterResult GetRetailerProductFilterResult(this IGenericRepository<Category> categoryRepository,
            RetailerProductFilterResult retailerProductFilterResult, List<int> categoryList)
        {
            
            var subCategoryFilter = GetAllSubCategory(categoryRepository, categoryList);
            List<int?> parentCategoryIdList = subCategoryFilter.Select(x => x.ParentCategoryId).ToList();
            var parentCategories = GetParentCategory(categoryRepository, parentCategoryIdList);

            retailerProductFilterResult.CategoryFilter = parentCategories.Select(cf => new CategoryFilterDTO { CategoryId=cf.CategoryId, Name= cf.Name })
                .ToList<CategoryFilterDTO>();
             retailerProductFilterResult.SubCategoryFilter = subCategoryFilter;

            return retailerProductFilterResult;

        }

        public static RetailerProductFilterResult GetRetailerProductFilterResult(this IGenericRepository<Category> categoryRepository, 
            RetailerProductFilterResult retailerProductFilterResult)
        {
            var parentCategories = GetAllCategory(categoryRepository);
            var subCategoryFilter = GetAllSubCategory(categoryRepository);

            retailerProductFilterResult.CategoryFilter = parentCategories.Select(cf => new CategoryFilterDTO { CategoryId = cf.CategoryId, Name = cf.Name })
                .ToList<CategoryFilterDTO>();
            retailerProductFilterResult.SubCategoryFilter = subCategoryFilter;

            return retailerProductFilterResult;

        }

        public static string GetStoresCategoryQuery(this IGenericRepository<Category> categoryRepository, int storeId)
        {
            var query = @"SELECT distinct Category from Pricing 
                            Inner Join Product ON Product.ProductId = Pricing.Product
                            Inner Join Category On Category.CategoryId = Product.Category
                            WHERE Store = {storeId}".FormatWith(new { storeId });
            return query;
        }

        private static List<Category> GetAllCategory(IGenericRepository<Category> categoryRepository)
        {
            return categoryRepository.GetAll().Where<Category>(x => x.ParentCategoryId == null
                && x.IsDeleted != true && x.Published == true).OrderBy(x=>x.DisplayOrder).ToList<Category>();
        }

        private static List<Category> GetParentCategory(IGenericRepository<Category> categoryRepository, List<int?> parentCategoryList)
        {
            return categoryRepository.GetAll().Where<Category>(x => x.ParentCategoryId == null && parentCategoryList.Contains(x.CategoryId)
                && x.IsDeleted != true && x.Published == true).OrderBy(x => x.DisplayOrder).ToList<Category>();
        }

        private static List<SubCategoryFilterDTO> GetAllSubCategory(IGenericRepository<Category> categoryRepository, List<int> categoryList)
        {
            //need to handle if parent category is not deleted..
            return categoryRepository.GetAll().Where<Category>(x => x.ParentCategoryId != null
              && x.IsDeleted != true && x.Published == true && categoryList.Contains(x.CategoryId))
              .Select(cf => new SubCategoryFilterDTO { CategoryId = cf.CategoryId, Name = cf.Name, ParentCategoryId = cf.ParentCategoryId })
              .ToList<SubCategoryFilterDTO>();
        }

        private static List<SubCategoryFilterDTO> GetAllSubCategory(IGenericRepository<Category> categoryRepository)
        {
            //need to handle if parent category is not deleted..
            return categoryRepository.GetAll().Where<Category>(x => x.ParentCategoryId != null
              && x.IsDeleted != true && x.Published == true)
              .Select(cf => new SubCategoryFilterDTO { CategoryId = cf.CategoryId, Name = cf.Name, ParentCategoryId= cf.ParentCategoryId })
              .ToList<SubCategoryFilterDTO>();
        }
    }
}
