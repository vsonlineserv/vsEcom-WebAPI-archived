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
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain;
//using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class CatalogueController : ApiController
    {
        IUnitOfWork _unitOfWork = null;

        public CatalogueController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public List<ProductPricingModel> GetCatalogue(SearchFilter filter)
        {
          return  _unitOfWork.PricingRepository.GetCatalogue(filter);
        }
    }
}
