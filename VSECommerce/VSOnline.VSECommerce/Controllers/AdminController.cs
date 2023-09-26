////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Web.Http;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Core.Caching;
using VSOnline.VSECommerce.Domain.Helper;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.Settings;
                                  
namespace VSOnline.VSECommerce.Web.Controllers
{
    [Authorize(Roles = "Administrators")]
    public class AdminController : ApiController
    {      
        IUnitOfWork _unitOfWork = null;
        ICacheManager _cacheManager = null;

        public AdminController(IUnitOfWork unitOfWork, ICacheManager cacheManager)
        {
            _unitOfWork = unitOfWork;
            _cacheManager = cacheManager;
        }

        [HttpGet]
        [ActionName("GetAllCategory")]
        public List<CategoryDTO> GetAllCategory()
        {
           return GetAllCategoryDTO();
        }

        [HttpGet]
        [ActionName("GetTopCategory")]
        public List<CategoryDTO> GetTopCategory()
        {
            var query = AdminHelperQuery.GetTopCategoryQuery();
            var categoryList = _unitOfWork.ExecuteQuery<TopCategoryResultSet>(query).ToList<TopCategoryResultSet>();
            var categoryIdList = categoryList.Select(x=>x.Category).ToList();
            var topCategories = _unitOfWork.CategoryRepository.Find(x => categoryIdList.Contains(x.CategoryId)).ToList();
            List<CategoryDTO> catDTO = new List<CategoryDTO>();
            return topCategories.ToEntityList(catDTO);
        }

        [HttpGet]
        [ActionName("GetShowHomePageCategory")]
        public List<CategoryDTO> GetShowHomePageCategory()
        {
            var topCategories = _unitOfWork.CategoryRepository.Find(x => x.ShowOnHomePage == true).ToList();
            List<CategoryDTO> catDTO = new List<CategoryDTO>();
            return topCategories.ToEntityList(catDTO);
        }      

        [HttpGet]
        public string ShowCategoryInHomePage(int categoryId, bool flagShow)
        {
            try
            {
                var category = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == categoryId).FirstOrDefault();
                category.ShowOnHomePage = flagShow;
                _unitOfWork.UpdateAndSave(category);
                _unitOfWork.Commit();
                return Enums.UpdateStatus.Success.ToString();
            }
            catch
            {

            }
            return Enums.UpdateStatus.Failure.ToString();

        }
 
        [HttpGet]
        public List<SiteSettings> GetSiteSettings()
        {
            List<SiteSettings> siteSettingsList = SiteSettingsService.GetAllSiteSettings();
            return siteSettingsList;
        }
         [HttpGet]
         [ActionName("UpdateSiteSettings")]
        public bool UpdateSiteSettings(string siteKey, string value)
        {
            return SiteSettingsService.UpdateSiteSettings(siteKey,value);
        }
        
        [HttpPut]
        public CategoryDTO CreateCategory(CategoryModel categoryModel)
        {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.Name = categoryModel.Name;
            categoryDTO.CreatedOnUtc = DateTime.UtcNow;
            categoryDTO.UpdatedOnUtc = DateTime.UtcNow;
            CreateCategoryDTO(categoryDTO);

            return categoryDTO;
        }

        [HttpDelete]
        public int DeleteCategory(int categoryId)
        {
            return DeleteCategoryFromDB(categoryId);            
        }

        [HttpGet]
        [ActionName("RemoveCache")]
        public bool RemoveCache()
        {
            try
            {
                _cacheManager.Clear();
                return true;
            }
            catch
            {

            }
            return false;
        }

        [HttpGet]
        [ActionName("LoadProductIndex")]
        public bool LoadProductIndex()
        {
            try
            {
                bool flagLoadIndex = VSOnline.VSECommerce.Domain.Search.SearchClient.LoadIndex();
                return flagLoadIndex;
            }
            catch
            {

            }
            return false;
        } 

        #region Repository
        protected CategoryDTO CreateCategoryDTO(CategoryDTO categoryDto)
        {
            _unitOfWork.CategoryRepository.CreateCategory(categoryDto);
            _unitOfWork.Commit();
            return categoryDto;
        }

        private List<CategoryDTO> GetAllCategoryDTO()
        {
            IEnumerable<Category> category = _unitOfWork.CategoryRepository.Find(a => a.IsDeleted == false);
            List<Category> categoryList = category.ToList();
            List<CategoryDTO> catDToList = new List<CategoryDTO>();
            return categoryList.ToEntityList(catDToList);
        }

        private int DeleteCategoryFromDB(int id)
        {
            return _unitOfWork.CategoryRepository.DeleteCategory(id);
        }

        #endregion
    }                       
}
