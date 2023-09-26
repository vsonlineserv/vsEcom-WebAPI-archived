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
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.Specification;
using VSOnline.VSECommerce.Core;
using System.Web.Http;

namespace VSOnline.VSECommerce.Web.Controllers
{
    
    [Authorize(Roles = "Administrators")]
    public class AdminCategoryController : APIBaseController
    {      
        IUnitOfWork _unitOfWork = null;

        public AdminCategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [ActionName("GetParentCategory")]
        public List<CategoryDTO> GetParentCategory()
        {
            return GetAllCategoryDTO().Where(x=>x.ParentCategoryId == null).ToList();
        } 

        [HttpPost]
        [ActionName("AddNewCategory")]
        [Authorize(Roles = "Administrators")]
        public BaseUpdateResultSet AddNewCategory(CategoryModel categoryModel)
        {
            BaseUpdateResultSet result = new BaseUpdateResultSet();

            result.Status = Enums.UpdateStatus.Failure;          

            if (categoryModel.CategoryId > 0)
            {
                try
                {
                    var category = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == categoryModel.CategoryId).FirstOrDefault();

                    if (category.CategoryId > 0)
                    {
                        category.Name = categoryModel.Name;
                        category.CategoryGroupTag = categoryModel.CategoryGroupTag;
                        category.ParentCategoryId = categoryModel.SelectedCategory;
                        category.FlagShowBuy = categoryModel.FlagShowBuy;
                        category.GroupDisplayOrder = categoryModel.GroupDisplayOrder;
                        category.UpdatedOnUtc = DateTime.Now;
                        _unitOfWork.UpdateAndSave(category);
                        result.UpdatedId = category.CategoryId;
                        result.Status = Enums.UpdateStatus.Success;
                    }
                }
                catch
                {
                    result.Status = Enums.UpdateStatus.Error;
                }
            }

            else
            {
                var categoryExist = _unitOfWork.CategoryRepository.Find(x => x.Name == categoryModel.Name && x.ParentCategoryId == categoryModel.SelectedCategory).ToList();
                if (categoryExist.Count > 0)
                {
                    result.Status = Enums.UpdateStatus.AlreadyExist;
                }
                else
                {
                    try
                    {
                        CategoryDTO categoryDTO = new CategoryDTO();
                        categoryDTO.Name = categoryModel.Name;
                        categoryDTO.CategoryGroupTag = categoryModel.CategoryGroupTag;
                        categoryDTO.ParentCategoryId = categoryModel.SelectedCategory;
                        categoryDTO.FlagShowBuy = categoryModel.FlagShowBuy;
                        categoryDTO.GroupDisplayOrder = categoryModel.GroupDisplayOrder;
                        categoryDTO.CreatedOnUtc = DateTime.UtcNow;
                        categoryDTO.UpdatedOnUtc = DateTime.UtcNow;
                        CreateCategoryDTO(categoryDTO);
                        result.UpdatedId = categoryDTO.CategoryId;
                        result.Status = Enums.UpdateStatus.Success;
                    }
                    catch
                    {
                        result.Status = Enums.UpdateStatus.Error;
                    }
                }
            }
            return result;
        }

        [HttpDelete]
        public int DeleteCategory(int categoryId)
        {
            return DeleteCategoryFromDB(categoryId);            
        }

        public Category GetCategoryDetails(int categoryId)
        {
            var category = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == categoryId).FirstOrDefault();
            return category;
        }

        public List<CategoryMasterFilter> GetCategoryFilters(int categoryId)
        {
            using (ProductSpecificationDataContext dc = new ProductSpecificationDataContext())
            {
                ProductSpecificationRepository repo = new ProductSpecificationRepository(dc);
                return repo.GetCategoryMasterFilter(categoryId);
            }
        }

        [HttpPost]
        [ActionName("UpdateFilterParameters")]
        public bool UpdateFilterParameters(List<CategoryMasterFilterResultSet> categoryMasterFilter)
        {
            using (ProductSpecificationDataContext dc = new ProductSpecificationDataContext())
            {
                ProductSpecificationRepository repo = new ProductSpecificationRepository(dc);
                repo.AddCategoryMasterFilter(categoryMasterFilter);
            }
            return true;
        }

        #region Repository
        protected CategoryDTO CreateCategoryDTO(CategoryDTO categoryDto)
        {
            var categoryObject = _unitOfWork.CategoryRepository.CreateCategory(categoryDto);
            _unitOfWork.Commit();
            categoryDto.CategoryId = categoryObject.CategoryId;
            return categoryDto;
        }

        private List<CategoryDTO> GetAllCategoryDTO()
        {
            IEnumerable<Category> category = _unitOfWork.CategoryRepository.Find(a => a.IsDeleted != true);
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
