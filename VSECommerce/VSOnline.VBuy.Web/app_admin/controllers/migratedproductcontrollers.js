////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_admin.controller('AdminProductListController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedProduct';

    function ConfirmDialog(message) {

        if (confirm(message) == true) {
            var BrandId = $('#drpBrandId').val().trim();
            $('#drpBrandId').val(BrandId);
            $("drpBrandId").select2();
        } else {
            //BrandName get from GridEditcall
            $('#drpBrandId').val(BrandName);
            $("drpBrandId").select2();

        }
    }

    function InitializeProductList() {
        $('#editProduct').modal('hide');
        $('#productKey').hide();
        $('#editProductKey').modal('hide');
        $('#ProductGrid').hide();
        $('#txtExcelOrderId').hide();
        $('#txtExcelPName').hide();
        $('#txtPuId').hide();
        $('#txtPuId').hide();
        $('#ProductExcel').hide();
        $('#ProductFeExcel').hide();
        // getBrandId();
        //$("#drpBrandId").select2("val", "");
        $("drpBrandId").select2();

        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        $('#drpBrandId').on('change', function () {

            ConfirmDialog('Are you sure To Change BrandName');
        });

    }

    InitializeProductList();

    //function getProducts() {

    //    //var config = {
    //    //    params:product,
    //    //    headers: { "CommandType": "LoadProduct" }
    //    //};

    //    //$http.get(endPoint + '/LoadProduct', config)
    //    //  .then(function (response) {
    //    //      createGrid(data.d);
    //    //  });
    //}
    $scope.searchProduct = function () {
        if (($('#txtSrchProductId').val().length >= 3) || ($('#txtSrchProductName').val().length >= 3)) {
            $('#ProductGrid').show();
            var product = {};
            product.searchProId = $('#txtSrchProductId').val();
            product.searchProName = $('#txtSrchProductName').val();
            if (product.searchProId == "") {
                product.searchProId = 0;
            }
            if (product.searchProName == "") {
                product.searchProName = null;
            }
            if ($("#publishproduct").prop("checked") == true) {
                product.publishstatus = 1;
            }
            else {
                product.publishstatus = 0;

            }

            var config = {
                params: product,
                headers: { "CommandType": "SearchProduct" }
            };

            $http.get(endPoint + '/SearchProduct', config)
      .then(function (response) {

          var data = JSON.parse(response.data);
          var chk = Object.keys(data).length;


          if (chk != 0) {
              createGrid(data);
              $('#ProductExcel').show();
              if ((product.searchProId != 0) && (product.searchProName != "")) {
                  var productKeyID = $('#txtSrchProductId').val();
                  ProductKey(productKeyID);
              }
              else {

                  $('#productKey').hide();


              }

          }
          else {
              createGrid(data);
              $('#ProductExcel').hide();
              $('#ProductFeExcel').hide();
              $('#productKey').hide();
              $('#ProductGrid').show();

          }
      });

        }
        else {
            alert("Please Enter minimum 3 characters to search");
        }

    }

    $scope.ProductExcelData = function () {
        var product = {};
        product.searchProId = $('#txtSrchProductId').val();
        product.searchProName = $('#txtSrchProductName').val();
        if (product.searchProId == "") {
            product.searchProId = 0;
        }
        if (product.searchProName == "") {
            product.searchProName = null;
        }
        if ($("#publishproduct").prop("checked") == true) {
            product.publishstatus = 1;
        }
        else {
            product.publishstatus = 0;

        }
        $('#txtExcelOrderId').val(product.searchProId);
        $('#txtExcelPName').val(product.searchProName);
        $('#txtPuId').val(product.publishstatus);
        var config = {
            params: product,
            headers: { "CommandType": "SearchProduct" }
        };

        $http.get(endPoint + '/SearchProduct', config)
  .then(function (response) {
      var data = JSON.parse(response.data);
      var chk = Object.keys(data).length;
      if (chk != 0) {
          JSONToCSVConvertor(data, "Product Details", true);
      }

      else {
          alert('No Data For Product Details To Export In Excel ');
      }
  });

    }


    $scope.ProductKeyExcelData = function () {
        var product = {};
        product.searchProId = $('#txtSrchProductId').val();
        product.searchProName = $('#txtSrchProductName').val();
        if (product.searchProId == "") {
            product.searchProId = 0;
        }
        if (product.searchProName == "") {
            product.searchProName = null;
        }

        if ((product.searchProId != 0) && (product.searchProName != "")) {
            var productKeyID = $('#txtSrchProductId').val();
            var productKey = {};
            productKey.Productkey = productKeyID;

            var config = {
                params: productKey,
                headers: { "CommandType": "SearchProductKey" }
            };

            $http.get(endPoint + '/SearchProductKey', config)
      .then(function (response) {
          var data = JSON.parse(response.data);
          var chk = Object.keys(data).length;
          if (chk != 0) {
              JSONToCSVConvertor(data, "Product Key Features", true);
          }
          else {
              alert('No Data For Product Key Features To Export In Excel ');
          }
      });
        }
        else {
            alert('No Data For Product Key Features To Export In Excel ');
        }
    }
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';


        CSV += ReportTitle + '\r\n\n';


        if (ShowLabel) {
            var row = "";


            for (var index in arrData[0]) {


                row += index + ',';
            }

            row = row.slice(0, -1);


            CSV += row + '\r\n';
        }


        for (var i = 0; i < arrData.length; i++) {
            var row = "";


            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);


            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }


        var fileName = "MyReport_";

        fileName += ReportTitle.replace(/ /g, "_");


        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);


        var link = document.createElement("a");
        link.href = uri;


        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function ProductKey(productKeyID) {

        $('#productKey').show();
        var productKey = {};
        productKey.Productkey = productKeyID;

        var config = {
            params: productKey,
            headers: { "CommandType": "SearchProductKey" }
        };

        $http.get(endPoint + '/SearchProduct', config)
  .then(function (response) {
      var data = JSON.parse(response.data);
      var chk = Object.keys(data).length;
      if (chk != 0) {
          createProductKeyGrid(data);
          $('#ProductFeExcel').show();
      }
      else {
          $('#ProductExcel').hide();

      }
  });

    }
    function createProductKeyGrid(data) {
        var data = {
            "rows": eval(data)
        };
        jQuery("#productKeyGrid").jqGrid("GridUnload");
        var grid = jQuery("#productKeyGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['Id', 'ProductId', 'Parameter', 'KeyFeature', 'DisplayOrder', 'Action'],
            colModel: [
                         { name: 'Id', index: 'Id', width: 10, align: "center" },
                        { name: 'ProductId', index: 'ProductId', width: 10, align: "center" },
                        { name: 'Parameter', index: 'Parameter', width: 50, align: "center", sortable: false },
                        { name: 'KeyFeature', index: 'KeyFeature', width: 50, align: "center", sortable: false },
                        { name: 'DisplayOrder', index: 'DisplayOrder', width: 50, align: "center", sortable: false },
                        { name: 'Id', index: 'Id', width: 10, align: "center", sortable: false, formatter: editLink3 }

            ],

            width: "1100",

            onCellSelect: function (rowid, index, contents, event) {

                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#productKeyGrid').jqGrid('getRowData', rowid);
                    var KeyId = jQuery('#productKeyGrid').jqGrid('getCell', rowid, 'Id');
                    var Parameter = jQuery('#productKeyGrid').jqGrid('getCell', rowid, 'Parameter');
                    var KeyFeature = jQuery('#productKeyGrid').jqGrid('getCell', rowid, 'KeyFeature');
                    var DisplayOrder = jQuery('#productKeyGrid').jqGrid('getCell', rowid, 'DisplayOrder');

                    editProductkey(KeyId, Parameter, KeyFeature, DisplayOrder);
                }
            },



            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Product Key Features",
            pager: '#productKeyPager',
            ignoreCase: true
        });

        $('#productKeyGrid').jqGrid('navGrid', '#productKeyPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );
    }
    function editProductkey(KeyId, Parameter, KeyFeature, DisplayOrder) {
        $('#editProductKey').modal('show');
        $("span").html("");
        $('#txtEditKeyid').val(KeyId);
        $('#txtEditDisplay').val(DisplayOrder);
        $('#txtEditParameter').val(Parameter);
        $('#txtEditKeyFeature').val(KeyFeature);

    }
    $scope.ModifyProductKey = function () {
        var productKey = {};
        productKey.keyID = $('#txtEditKeyid').val().trim();
        productKey.display = $('#txtEditDisplay').val().trim();
        productKey.param = $('#txtEditParameter').val().trim();
        productKey.keyFeatures = $('#txtEditKeyFeature').val().trim();
        if (productKey.param == "") {
            $('#KeyFeatuesRequiredfield').text(" * Enter Parameter");
        }


        else
            if (productKey.keyFeatures == "") {
                $('#KeyFeatuesRequiredfield').text(" * Enter Key Features");
            }


            else {

                $("span").html("");
                if (productKey.param == "") {
                    productKey.param = null;
                }
                if (productKey.display == "") {
                    productKey.display = "0";
                }

                var config = {
                    params: productKey,
                    headers: { "CommandType": "ModifyProductKey" }
                };

                $http.get(endPoint + '/ModifyProductKey', config)
          .then(function (response) {
              $('#editProductKey').modal('hide');
              searchProduct();
          });

            }
    }
    function createGrid(datas) {
        var data = {
            "rows": eval(datas)
        };
        jQuery("#productgrid").jqGrid("GridUnload");
        var grid = jQuery("#productgrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['ProductId', 'Name', 'BrandName', 'ManufacturerId', 'Model No', 'ShortDescription', 'FullDescription', 'PictureName', 'PictureName1', 'PictureName2', 'ProductDescription', 'ShowOnHomePage', 'Action'],
            colModel: [
                        { name: 'ProductId', index: 'ProductId', width: 30, align: "center" },
                        { name: 'Name', index: 'Name', width: 150, align: "center", sortable: true },
                         { name: 'BrandName', index: 'BrandName', width: 50, align: "center", sortable: true },
                           { name: 'ManufacturerId', index: 'ManufacturerId', width: 10, align: "center", sortable: true, hidden: true },
                         { name: 'ManufacturerPartNumber', index: 'ManufacturerPartNumber', width: 80, align: "center", sortable: true },
                        { name: 'ShortDescription', index: 'ShortDescription', width: 10, align: "center", sortable: true, hidden: true },
                        { name: 'FullDescription', index: 'FullDescription', width: 10, align: "center", sortable: true, hidden: true },
                         { name: 'PictureName', index: 'Name', width: 10, align: "center", sortable: true, hidden: true },
                        { name: 'PictureName1', index: 'ShortDescription', width: 10, align: "center", sortable: true, hidden: true },
                        { name: 'PictureName2', index: 'FullDescription', width: 10, align: "center", sortable: true, hidden: true },
                         { name: 'ProductDescriptionHtml', index: 'ProductDescriptionHtml', width: 10, align: "center", sortable: true, hidden: true },
                          { name: 'ShowOnHomePage', index: 'ShowOnHomePage', width: 10, align: "center", sortable: true, hidden: true },
                         { name: 'ProductId', index: 'ProductId', width: 30, align: "center", sortable: false, formatter: editLink }

            ],
            onSelectRow: function () {
                $("drpBrandId").select2();
            },

            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {
                //alert(rowid);

                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#productgrid').jqGrid('getRowData', rowid);
                    var ProductId = jQuery('#productgrid').jqGrid('getCell', rowid, 'ProductId');
                    var Name = jQuery('#productgrid').jqGrid('getCell', rowid, 'Name');
                    var BrandId = jQuery('#productgrid').jqGrid('getCell', rowid, 'ManufacturerId');
                    var ManuPartNumber = jQuery('#productgrid').jqGrid('getCell', rowid, 'ManufacturerPartNumber');
                    var ShortDescription = jQuery('#productgrid').jqGrid('getCell', rowid, 'ShortDescription');
                    var FullDescription = jQuery('#productgrid').jqGrid('getCell', rowid, 'FullDescription');
                    var PictureName = jQuery('#productgrid').jqGrid('getCell', rowid, 'PictureName');
                    var PictureName1 = jQuery('#productgrid').jqGrid('getCell', rowid, 'PictureName1');
                    var PictureName2 = jQuery('#productgrid').jqGrid('getCell', rowid, 'PictureName2');
                    var ProductDescriptionHtml = jQuery('#productgrid').jqGrid('getCell', rowid, 'ProductDescriptionHtml');
                    var ShowOnHomePage = jQuery('#productgrid').jqGrid('getCell', rowid, 'ShowOnHomePage');
                    editProducts(ProductId, Name, BrandId, ManuPartNumber, ShortDescription, FullDescription, PictureName, PictureName1, PictureName2, ProductDescriptionHtml, ShowOnHomePage);
                }


                //  editcalldelete1(BlockId, Block, Active2)

            },



            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Product Details",
            pager: '#productPager',
            ignoreCase: true
        });

        $('#productgrid').jqGrid('navGrid', '#productPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }
    function editLink(cellValue, options, rowdata, action) {


        return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

    }
    function editLink3(cellValue, options, rowdata, action) {


        return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

    }

    function getBrandId() {
        $('#drpBrandId').empty();
        var input = {};
        input.Productid = $('#txtProductId').val().trim();

        var config = {
            params: input,
            headers: { "CommandType": "getBrandId" }
        };

        $http.get(endPoint + '/getBrandId', config)
              .then(function (response) {
                  var data = JSON.parse(response.data);

                  for (var i = 0; i < data.length; i++) {
                      $("#drpBrandId").append("<option value=" + data[i].Manufacturer + ">" +
              data[i].Name + "</option>");
                  }
                  $('#drpBrandId').val(0);
                  $('#drpBrandId').val(BrandName);
                  $('#drpBrandId').select2();

              });
    }

    var pic, pic1, pic2, html, BrandName;
    function editProducts(ProductId, Name, BrandId, ManuPartNumber, ShortDescription, FullDescription, PictureName, PictureName1, PictureName2, ProductDescriptionHtml, ShowOnHomePage) {
        $('#editProduct').modal('show');
        $("span").html("");
        $('#txtProductId').val(ProductId);
        getBrandId();
        BrandName = BrandId;
        pic = PictureName;
        pic1 = PictureName1;
        pic2 = PictureName2;
        html = ProductDescriptionHtml;
        $('#txtProductName').val(Name);
        $('#txtManuPartNumber').val(ManuPartNumber);
        $('#txtShortDesc').val(ShortDescription);
        $('#txtFullDesc').val(FullDescription);
        $('#txtAlterPictureName').val(PictureName);
        $('#txtAlterPictureName1').val(PictureName1);
        $('#txtAlterPictureName2').val(PictureName2);
        // $('#txtAlterProductDescription').val(ProductDescriptionHtml);

        if (ShowOnHomePage == "true") {
            $('#chkFeaturedProduct').prop('checked', true);
        }
        else {
            $('#chkFeaturedProduct').prop('checked', false);
        }
        //   $('#drpBrandId').val(BrandName);

        $('#pictureUpload').val(PictureName);

        $('#picture1Upload').val(PictureName1);

        $('#picture2Upload').val(PictureName2);

        //  $('#ProductDescription').val(ProductDescriptionHtml);



    }

    $scope.ModifyProduct = function () {

        //Picture Name edit alone. No upload. 
        var product = {};
        var AlternativePictureName = $('#txtAlterPictureName').val().trim();
        var AlternativePictureName1 = $('#txtAlterPictureName1').val().trim();
        var AlternativePictureName2 = $('#txtAlterPictureName2').val().trim();
        //   var AlterProductDescription = $('#txtAlterProductDescription').val().trim();
        product.productid = $('#txtProductId').val();
        product.MnuPartNumber = $('#txtManuPartNumber').val().trim();

        product.BrandName = $('#drpBrandId').val().trim();
        product.proName = $('#txtProductName').val().trim();
        product.proShortDesc = $('#txtShortDesc').val().trim();

        product.proFullDesc = $('#txtFullDesc').val().trim();

        if ($("#chkFeaturedProduct").prop("checked") == true) {
            product.showonHomePage = "true";
        }
        else {
            product.showonHomePage = "false";
        }




        if (product.proName == "") {
            $('#requiredfield').text(" * Enter Product Name");

        }

        if (product.proFullDesc == "") {
            $('#requiredfield').text(" * Enter Full Description ");
        }
        else if (product.proFullDesc != "") {

            //product.PictureName = $('#pictureUpload').val().trim();
            //product.PictureName = product.PictureName.replace(/^.*[\\\/]/, '');
            //product.PictureName1 = $('#picture1Upload').val().trim();
            //product.PictureName1 = product.PictureName1.replace(/^.*[\\\/]/, '');
            //product.PictureName2 = $('#picture2Upload').val().trim();
            //product.PictureName2 = product.PictureName2.replace(/^.*[\\\/]/, '');
            if (product.MnuPartNumber == "") {



            }

            //if (product.PictureName != "" && AlternativePictureName == "") {

            //     product.PictureName = "Product" + "\\" + product.PictureName;
            // }
            // else if (product.PictureName != "" && AlternativePictureName != "") {

            //     product.PictureName = "Product" + "\\" + product.PictureName;
            // }
            // else if (product.PictureName == "" && AlternativePictureName != "") {
            product.PictureName = AlternativePictureName;
            // }


            //if (product.PictureName1 != "" && AlternativePictureName1 == "") {
            //    product.PictureName1 = "Product" + "\\" + product.PictureName1;
            //}
            //else if (product.PictureName1 != "" && AlternativePictureName1 != "") {
            //    product.PictureName1 = "Product" + "\\" + product.PictureName1;
            //}
            //else if (product.PictureName1 == "" && AlternativePictureName1 != "") {
            product.PictureName1 = AlternativePictureName1;
            //}



            //if (product.PictureName2 != "" && AlternativePictureName2 == "") {
            //    product.PictureName2 = "Product" + "\\" + product.PictureName2;
            //} else if (product.PictureName2 != "" && AlternativePictureName2 != "") {
            //    product.PictureName2 = "Product" + "\\" + product.PictureName2;
            //}
            //else if (product.PictureName2 == "" && AlternativePictureName2 != "") {
            product.PictureName2 = AlternativePictureName2;
            //}


            if (product.proShortDesc != null) {
                product.proShortDesc = product.proShortDesc.replace(/'/g, "''");
            }
            product.proFullDesc = product.proFullDesc.replace(/'/g, "''");

            var config = {
                params: product,
                headers: { "CommandType": "ModifyProducts" }
            };

            $http.get(endPoint + '/ModifyProducts', config)
      .then(function (response) {
          //var picture = $("#pictureUpload").get(0);
          //var picture1 = $("#picture1Upload").get(0);
          //var picture2 = $("#picture2Upload").get(0);
          //var html = $("#ProductDescription").get(0);
          //mobileImgUpload(picture);
          //mobileImgUpload(picture1);
          //mobileImgUpload(picture2);
          //mobileImgUpload(html);
          $scope.savedSuccessfully = true;
          $scope.message = response.data;
          $('#editProduct').modal('hide');
          $('#pictureUpload').val('');
          $('#picture1Upload').val('');
          $('#picture2Upload').val('');
          $('#ProductDescription').val('');

      });
        }

    }
    $scope.ProductClear = function () {
        $('#txtSrchProductId').val('');
        $('#txtSrchProductName').val('');
        $('#publishproduct').attr('checked', false);

    }
    $scope.checkID = function () {
        if ($('#txtSrchProductId').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtSrchProductId').val('');
        }
    }
    $scope.checkName = function () {

        if ($('#txtSrchProductName').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtSrchProductName').val('');
        }
    }

    $scope.CheckIsNumeric = function (objEvt) {
        var charCode = (objEvt.which) ? objEvt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            document.getElementById("txtSrchProductId").style.backgroundColor = "#FFB2B2";
            return false;
        }
        else {
            document.getElementById("txtSrchProductId").style.backgroundColor = "#B2D8B2";
            return true;
        }
    }

    $scope.CheckInDisplay = function (objEvt) {
        var charCode = (objEvt.which) ? objEvt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            document.getElementById("txtEditDisplay").style.backgroundColor = "#FFB2B2";
            return false;
        }
        else {
            document.getElementById("txtEditDisplay").style.backgroundColor = "#B2D8B2";
            return true;
        }
    }

}]);

app_admin.controller('AdminBrandController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedManufacturer';

    $(document).ready(function () {

        $("#txtDisplay").keypress(function (event) {

            return isNumber(event, this)

        });
        $("drpManuId").show();
    });

    function isNumber(evt, element) {

        var charCode = (evt.which) ? evt.which : evt.keyCode

        if (
            (charCode != 45 || $(element).val().indexOf('-') != -1) &&
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&
            (charCode < 48 || charCode > 57))
            return false;

        return true;
    }

    function getManufacturerDetails() {

        $("drpManuId").show();

        var config = {
            headers: { "CommandType": "LoadManufacturerDetails" }
        };

        $http.get(endPoint + '/LoadManufacturerDetails', config)
           .then(function (response) {
               createManufacturerGrid(response.data);
           });
    }


    function getManuId() {

        var config = {
            headers: { "CommandType": "LoadManuId" }
        };

        $http.get(endPoint + '/LoadManuId', config)
              .then(function (response) {
                  var data = JSON.parse(response.data);
                  for (var i = 0; i < data.length; i++) {
                      $("#drpManuId").append("<option value=" + data[i].ManufacturerId + ">" +
              data[i].Name + "</option>");
                  }

                  $('#drpManuId').select2();
              });
    }

    function InitializeManufacturer() {
        $("drpManuId").show();
        $('#ManufacturerDetails').modal('hide');
        getManufacturerDetails();
        getManuId();
        $("drpManuId").select2();
    }
    InitializeManufacturer();




    $scope.SearchManufacturerProductDetails = function () {
        var input = {};
        input.Manuid = $('#drpManuId').val().trim();

        var config = {
            params: input,
            headers: { "CommandType": "LoadManuProductIdDetails" }
        };

        $http.get(endPoint + '/LoadManuProductIdDetails', config)
           .then(function (response) {
               createManufacturerGrid(datas.d);
               $('#drpManuId').select2();
               $("drpManuId").show();
           });
    }
    $scope.NewManufacturerDetails = function () {

        $('#ManufacturerDetails').modal('show');

        $('#txtManId').val('');
        $('#txtMaName').val('');
        $('#txtDes').val('');
        $('#txtMetKey').val('');
        $('#txtMaDes').val('');
        $('#txtMeTi').val('');

        $('#txtDisplay').val('');
        $("span").html("");

    }



    $scope.SaveManuDetails = function () {


        var Id = $('#txtManId').val().trim();
        var Name = $('#txtMaName').val().trim();


        if (Name == "") {
            $('#ManuRequiredfield').text(" * Enter Name");
        }

        if ((Id == "") && (Name != "")) {
            var input = {}
            input.Name = $('#txtMaName').val().trim();
            input.Desc = $('#txtDes').val().trim();
            input.MeKey = $('#txtMetKey').val().trim();
            input.MeDesc = $('#txtMaDes').val().trim();
            input.MeTi = $('#txtMeTi').val().trim();

            input.Dis = $('#txtDisplay').val().trim();

            var config = {
                params: input,
                headers: { "CommandType": "SaveManufacturertDetails" }
            };

            $http.get(endPoint + '/SaveManufacturertDetails', config)
               .then(function (response) {

                   $("span").html("");
                   $('#txtManId').val('');
                   $('#txtMaName').val('');
                   $('#txtDes').val('');
                   $('#txtMetKey').val('');
                   $('#txtMaDes').val('');
                   $('#txtMeTi').val('');
                   $('#txtLiStore').val('');
                   $('#txtDisplay').val('');
                   //$("#txtLiStore").prop("checked", false);
                   $('#ManufacturerDetails').modal('hide');
                   getManufacturerDetails();
                   getManuId();
                   $("drpManuId").show();
               });


        }


        if ((Id != "") && (Name != "")) {
            var input = {}
            input.Id = $('#txtManId').val();
            input.Name = $('#txtMaName').val().trim();
            input.Desc = $('#txtDes').val().trim();
            input.MeKey = $('#txtMetKey').val().trim();
            input.MeDesc = $('#txtMaDes').val().trim();
            input.MeTi = $('#txtMeTi').val().trim();
            input.Dis = $('#txtDisplay').val().trim();

            var config = {
                params: input,
                headers: { "CommandType": "UpdateManufacturertDetails" }
            };

            $http.get(endPoint + '/UpdateManufacturertDetails', config)
               .then(function (response) {
                   $("span").html("");
                   $('#txtManId').val('');
                   $('#txtMaName').val('');
                   $('#txtDes').val('');
                   $('#txtMetKey').val('');
                   $('#txtMaDes').val('');
                   $('#txtMeTi').val('');
                   //$('#txtLiStore').val('');
                   $('#txtDisplay').val('');
                   //$("#txtLiStore").prop("checked", false);
                   $('#ManufacturerDetails').modal('hide');
                   getManufacturerDetails();
                   getManuId();
                   $("drpManuId").show();

               });
        }
    }


    function CloseDetails() {
        $("drpManuId").show();
    }


    function editLink(cellValue, options, rowdata, action) {


        return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

    }
    function createManufacturerGrid(datas) {
        var data = {
            "rows": eval(datas)
        };
        jQuery("#ManufacturerGrid").jqGrid("GridUnload");
        var grid = jQuery("#ManufacturerGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['ManufacturerId', 'Name', 'Description', 'MetaKeywords', 'MetaDescription', 'MetaTitle', 'DisplayOrder', 'Action'],
            colModel: [
                         { name: 'ManufacturerId', index: 'ManufacturerId', width: 30, align: "center", hidden: true },
                        { name: 'Name', index: 'Name', width: 50, align: "center", sortable: true, search: true },
                        { name: 'Description', index: 'Description', width: 50, align: "center", sortable: true },
                        { name: 'MetaKeywords', index: 'MetaKeywords', width: 30, align: "center", sortable: true },
                        { name: 'MetaDescription', index: 'MetaDescription', width: 50, align: "center", sortable: true },
                          { name: 'MetaTitle', index: 'MetaTitle', width: 50, align: "center", sortable: true },
                               { name: 'DisplayOrder', index: 'DisplayOrder', width: 30, align: "center", sortable: true, search: false },
                        { name: 'ManufacturerId', index: 'ManufacturerId', width: 30, align: "center", sortable: false, formatter: editLink, search: false }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {

                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#ManufacturerGrid').jqGrid('getRowData', rowid);
                    var ManId = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'ManufacturerId');
                    var Name = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'Name');
                    var Desc = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'Description');
                    var Metakey = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'MetaKeywords');
                    var Metadesc = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'MetaDescription');
                    var Metatit = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'MetaTitle');
                    var Display = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'DisplayOrder');
                    editManuDetails(ManId, Name, Desc, Metakey, Metadesc, Metatit, Display);
                }
            },



            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Manufacturer List",
            pager: '#ManufacturerPager',
            ignoreCase: true
        });

        $('#ManufacturerGrid').jqGrid('navGrid', '#ManufacturerPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );
    }

    function editManuDetails(ManId, Name, Desc, Metakey, Metadesc, Metatit, Display) {

        $("drpManuId").show();
        $('#ManufacturerDetails').modal('show');
        $("txtManId").hide();
        $("span").html("");
        $('#txtManId').val(ManId);
        $('#txtMaName').val(Name);
        $('#txtDes').val(Desc);
        $('#txtMetKey').val(Metakey);
        $('#txtMaDes').val(Metadesc);
        $('#txtMeTi').val(Metatit);
        $('#txtDisplay').val(Display);

    }

}]);

app_admin.controller('AdminPublishProductController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedProduct';

    function InitializeProductPublish() {
        loadProduct();
        loadPublishedProduct();
    }

    InitializeProductPublish();

    function loadProduct() {
        var config = {
            headers: { "CommandType": "unPublishedProduct" }
        };

        $http.get(endPoint + '/unPublishedProduct', config)
           .then(function (response) {
               createGrid(response.data);
           });
    }


    function loadPublishedProduct() {

        var config = {
            headers: { "CommandType": "PublishedProduct" }
        };

        $http.get(endPoint + '/PublishedProduct', config)
           .then(function (response) {
               createPublishedGrid(response.data);
           });
    }


    function createGrid(product) {
        var data = {
            "rows": eval(product)
        };
        jQuery("#unPublishgrid").jqGrid("GridUnload");
        var grid = jQuery("#unPublishgrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['ProductId', 'Name', 'ShortDescription', 'FullDescription', 'Published', 'IsDeleted'],
            colModel: [
                        { name: 'ProductId', index: 'ProductId', width: 50, align: "center" },
                        { name: 'Name', index: 'Name', width: 50, align: "center", sortable: true },
                        { name: 'ShortDescription', index: 'ShortDescription', width: 50, align: "center", sortable: true },
                        { name: 'FullDescription', index: 'FullDescription', width: 150, align: "center", sortable: true },
                         { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true },
                               { name: 'IsDeleted', index: 'IsDeleted', width: 30, align: "center", sortable: true }

            ],
            width: "1100",


            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "UnPublished Product",
            pager: '#unPublishPager',
            multiselect: true,
            ignoreCase: true
        });

        $('#unPublishgrid').jqGrid('navGrid', '#unPublishPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }


    function createPublishedGrid(product) {
        var data = {
            "rows": eval(product)
        };
        jQuery("#PublishCatgrid").jqGrid("GridUnload");
        var grid = jQuery("#PublishCatgrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['ProductId', 'Name', 'Published'],
            colModel: [
                        { name: 'ProductId', index: 'ProductId', width: 50, align: "center" },
                        { name: 'Name', index: 'Name', width: 250, align: "center", sortable: true },
                         { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true }
            ],
            width: "1100",


            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Recently Published Product List (Last 2 days)",
            pager: '#PublishCatPager',
            ignoreCase: true
        });

        $('#PublishCatgrid').jqGrid('navGrid', '#PublishCatPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"
                       }
                );

    }

    $scope.publishIds = [];

    $scope.publishProduct = function () {

        var myrow = ids = "";
        var id = jQuery("#unPublishgrid").jqGrid('getGridParam', 'selarrrow');
        if (id.length) {
            for (var i = 0; i < id.length; i++) {
                myrow = jQuery("#unPublishgrid").jqGrid('getCell', id[i], 'ProductId');
                $scope.publishIds.push(myrow);
            }
        }
        if ($scope.publishIds.length > 0) {


            var config = {
                headers: { "CommandType": "UpdatePublishedProduct" }
            };

            $http.post(endPoint + '/UpdatePublishedProduct', $scope.publishIds, config)
               .then(function (response) {
                   if (response.data.length > 0) {
                       alert("Selected Product Is Published Successfully");
                       $scope.publishIds = [];
                       loadProduct();
                       loadPublishedProduct();
                   }
                   else {
                       alert("Unsucessful. Error contact administrator")
                   }
               });
        }
        else {
            alert("Please select any item to Publish");
        }


    }
}]);

app_admin.controller('AdminProductSeoController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {
    var endPoint = 'http://localhost:49475/api/AdminMigratedProduct';

    function InitializeSeoProduct() {
        $('#ddlCategoryId').select2();
        loadSeoCategory();
        $('#editSEOProduct').modal('hide');
    }

    InitializeSeoProduct();

    function loadSeoCategory() {
        $('#ddlCategoryId').empty();
        $("#ddlSubCategoryId").append("<option value='--Select--'>" +
    '--Select--' + "</option>");

        var config = {
            headers: { "CommandType": "loadSeoCategory" }
        };

        $http.get(endPoint + '/loadSeoCategory', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               $("#ddlCategoryId").append("<option value='--Select--'>" +
   '--Select--' + "</option>");
               for (var i = 0; i < data.length; i++) {
                   $("#ddlCategoryId").append("<option value=" + data[i].CategoryId + ">" +
           data[i].Name + "</option>");
               }
               $('#ddlCategoryId').select2();
           });

        $('#ddlCategoryId').on('change', function () {

            loadSubCategory();
        });
    }


    function loadSubCategory() {
        var input = {};
        input.CategoryId = $('#ddlCategoryId').val();
        $('#ddlSubCategoryId').empty();
        if (input.CategoryId == "--Select--") {
            $("#ddlSubCategoryId").append("<option value='--Select--'>" +
  '--Select--' + "</option>");
        }
        else {


            var config = {
                params: input,
                headers: { "CommandType": "loadSubCategory" }
            };

            $http.get(endPoint + '/loadSubCategory', config)
               .then(function (response) {
                   var data = JSON.parse(response.data);
                   $("#ddlSubCategoryId").append("<option value='--Select--'>" +
        '--Select--' + "</option>");
                   for (var i = 0; i < data.length; i++) {
                       $("#ddlSubCategoryId").append("<option value=" + data[i].CategoryId + ">" +
               data[i].Name + "</option>");
                   }
                   $('#ddlSubCategoryId').select2();
               });
        }


    }

    $scope.SearchSEOProduct = function () {
        var input = {};
        input.CategoryId = $('#ddlCategoryId').val().trim();
        input.SubCategoryId = $('#ddlSubCategoryId').val().trim();
        if (input.CategoryId == "--Select--") {
            alert('Choose Category');
        }
        else {
            if (input.SubCategoryId == "--Select--") {
                input.SubCategoryId = "0";
            }


            var config = {
                params: input,
                headers: { "CommandType": "seoProductList" }
            };

            $http.get(endPoint + '/seoProductList', config)
               .then(function (response) {
                   createGrid(response.data);
               });
        }


    }
    function createGrid(datas) {

        var data = {
            "rows": eval(datas)
        };
        jQuery("#seoProductgrid").jqGrid("GridUnload");
        var grid = jQuery("#seoProductgrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['ProductId', 'Name', 'MetaTitle', 'MetaDescription', 'MetaKeywords', 'Action'],
            colModel: [
                        { name: 'ProductId', index: 'ProductId', width: 20, align: "center" },
                        { name: 'Name', index: 'Name', width: 70, align: "center", sortable: true },
                         { name: 'MetaTitle', index: 'MetaTitle', width: 30, align: "center", sortable: true },
                               { name: 'MetaDescription', index: 'MetaDescription', width: 30, align: "center", sortable: true },
                                { name: 'MetaKeywords', index: 'MetaKeywords', width: 30, align: "center", sortable: true },
                               { name: 'ProductId', index: 'ProductId', width: 20, align: "center", sortable: false, formatter: editLink, search: false }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#seoProductgrid').jqGrid('getRowData', rowid);
                    var ProductId = jQuery('#seoProductgrid').jqGrid('getCell', rowid, 'ProductId');
                    var MetaTitle = jQuery('#seoProductgrid').jqGrid('getCell', rowid, 'MetaTitle');
                    var MetaDescription = jQuery('#seoProductgrid').jqGrid('getCell', rowid, 'MetaDescription');
                    var MetaKeywords = jQuery('#seoProductgrid').jqGrid('getCell', rowid, 'MetaKeywords');

                    editSEOProduct(ProductId, MetaTitle, MetaDescription, MetaKeywords);
                }
            },

            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "SEO Product",
            pager: '#seoProductPager',
            ignoreCase: true
        });

        $('#seoProductgrid').jqGrid('navGrid', '#seoProductPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }
    function editLink(cellValue, options, rowdata, action) {

        return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';


    }
    function editSEOProduct(ProductId, MetaTitle, MetaDescription, MetaKeywords) {
        $('#editSEOProduct').modal('show');
        $('#txtEditid').val(ProductId);
        $('#txtEditTitle').val(MetaTitle);
        $('#txtEditDescription').val(MetaDescription);
        $('#txtEditKeywords').val(MetaKeywords);

    }


    $scope.ModifySEOProduct = function () {
        var SEOProduct = {};
        SEOProduct.ProductId = $('#txtEditid').val().trim();
        SEOProduct.MetaTitle = $('#txtEditTitle').val().trim();
        SEOProduct.MetaDescription = $('#txtEditDescription').val().trim();
        SEOProduct.MetaKeywords = $('#txtEditKeywords').val().trim();

        if (SEOProduct.MetaTitle == "") {
            SEOProduct.MetaTitle = null;
        }
        if (SEOProduct.MetaDescription == "") {
            SEOProduct.MetaDescription = null;
        }

        if (SEOProduct.MetaKeywords == "") {
            SEOProduct.MetaKeywords = null;
        }


        var config = {
            params: SEOProduct,
            headers: { "CommandType": "ModifySEOProduct" }
        };

        $http.get(endPoint + '/ModifySEOProduct', config)
           .then(function (response) {
               $scope.SearchSEOProduct();
               $('#editSEOProduct').modal('hide');
           });
    }
}]);