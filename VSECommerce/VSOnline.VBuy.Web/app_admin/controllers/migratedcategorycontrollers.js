////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_admin.controller('PublishCategoryController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
   function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

       var endPoint = 'http://localhost:49475/api/AdminMigratedCategory';
       $scope.publishIds = [];

       function InitializePublishCategory() {
           loadCategory();
           loadPublishedCategory();
       }
       InitializePublishCategory();

       function loadCategory() {

           var config = {
               headers: { "CommandType": "unPublishedCategory" }
           };

           $http.get(endPoint + '/unPublishedCategory', config)
            .then(function (response) {
                createGrid(response.data);
            });
       }

       function loadPublishedCategory() {

           var config = {
               headers: { "CommandType": "loadPublishedCategory" }
           };

           $http.get(endPoint + '/loadPublishedCategory', config)
            .then(function (response) {
                createPublishedCategoryGrid(response.data);
            });
       }
       function createPublishedCategoryGrid(category) {
           var data = {
               "rows": eval(category)
           };
           jQuery("#PublishCategorygrid").jqGrid("GridUnload");
           var grid = jQuery("#PublishCategorygrid");
           grid.jqGrid({
               datastr: data,
               datatype: "jsonstring",
               jsonReader: { repeatitems: false },
               colNames: ['CategoryId', 'Name', 'Published'],
               colModel: [
                           { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                           { name: 'Name', index: 'Name', width: 100, align: "center", sortable: true },
                            { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true },

               ],
               width: "1100",


               height: 300,
               rowNum: 50,
               rowList: [50, 100, 150],
               caption: "Recently Published Categories List (Last 2 days)",
               pager: '#PublishCategoryPager',
               multiselect: false,
               ignoreCase: true
           });

           $('#PublishCategorygrid').jqGrid('navGrid', '#PublishCategoryPager',
                          {
                              edit: false,
                              add: false,
                              del: false,
                              search: true,
                              searchtext: "Search"


                          }
                   );

       }

       function createGrid(category) {
           var data = {
               "rows": eval(category)
           };
           jQuery("#unPublishCatgrid").jqGrid("GridUnload");
           var grid = jQuery("#unPublishCatgrid");
           grid.jqGrid({
               datastr: data,
               datatype: "jsonstring",
               jsonReader: { repeatitems: false },
               colNames: ['CategoryId', 'Name', 'Published', 'IsDeleted'],
               colModel: [
                           { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                           { name: 'Name', index: 'Name', width: 100, align: "center", sortable: true },
                            { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true },
                                  { name: 'IsDeleted', index: 'IsDeleted', width: 30, align: "center", sortable: true }

               ],
               width: "1100",


               height: 300,
               rowNum: 50,
               rowList: [50, 100, 150],
               caption: "UnPublished Categories",
               pager: '#unPublishCatPager',
               multiselect: true,
               ignoreCase: true
           });

           $('#unPublishCatgrid').jqGrid('navGrid', '#unPublishCatPager',
                          {
                              edit: false,
                              add: false,
                              del: false,
                              search: true,
                              searchtext: "Search"


                          }
                   );

       }
       $scope.publishCategory = function () {

           var myrow = ids = "";
           var id = jQuery("#unPublishCatgrid").jqGrid('getGridParam', 'selarrrow');
           if (id.length) {
               for (var i = 0; i < id.length; i++) {
                   myrow = jQuery("#unPublishCatgrid").jqGrid('getCell', id[i], 'CategoryId');
                   $scope.publishIds.push(myrow);
               }
           }
           if ($scope.publishIds.length > 0) {

               var config = {
                   headers: { "CommandType": "UpdatePublishedCategories" }
               };

               $http.post(endPoint + '/UpdatePublishedCategories', $scope.publishIds, config)
                .then(function (response) {
                    if (response.data.length > 0) {
                        alert("Selected " + response.data + " Category(s) Published Successfully");
                        $scope.publishIds = [];
                        loadCategory();
                        loadPublishedCategory();
                    }
                });


           }
           else {
               alert("Please select any item to Publish");
           }


       }
   }]);

app_admin.controller('AdminCategoryListController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedCategory';
    function InitializeCategoryList() {
        $('#categoryGrid').hide();
        $('#editCategoryName').modal('hide');
    }

    InitializeCategoryList();
    $scope.searchCategory = function () {
        if (($('#txtCategoryId').val().length >= 3) || ($('#txtCategoryName').val().length >= 3)) {
            var category = {};
            category.categoryId = $('#txtCategoryId').val();
            category.categoryName = $('#txtCategoryName').val();
            if (category.categoryName == "") {
                category.categoryName = null;
            }
            if (category.categoryId == "") {
                category.categoryId = 0;
            }

            var config = {
                params: category,
                headers: { "CommandType": "searchCategory" }
            };

            $http.get(endPoint + '/searchCategory', config)
             .then(function (response) {
                 createCategoryGrid(response.data);
                 $('#categoryGrid').show();
             });
        }
        else {
            alert("Please Enter minimum 3 characters to search");
        }

    }

    function createCategoryGrid(data) {

        var data = {
            "rows": eval(data)
        };
        jQuery("#categoryGrids").jqGrid("GridUnload");
        var grid = jQuery("#categoryGrids");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['CategoryId', 'Name', 'PictureName', 'PictureNameMobile', 'CategoryGroupTag', 'GroupDisplayOrder', 'DisplayOrder', 'Published', 'Action'],
            colModel: [
                        { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                        { name: 'Name', index: 'Name', width: 80, align: "center", sortable: true },
                         { name: 'PictureName', index: 'PictureName', width: 50, align: "center", sortable: true },
                          { name: 'PictureNameMobile', index: 'PictureNameMobile', width: 50, align: "center", sortable: true },
                           { name: 'CategoryGroupTag', index: 'CategoryGroupTag', width: 50, align: "center", sortable: true },
                            { name: 'GroupDisplayOrder', index: 'GroupDisplayOrder', width: 50, align: "center", sortable: true },
                             { name: 'DisplayOrder', index: 'DisplayOrder', width: 50, align: "center", sortable: true },
                              { name: 'Published', index: 'Published', width: 50, align: "center", sortable: true },
                        { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center", sortable: false, formatter: editLink }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#categoryGrids').jqGrid('getRowData', rowid);
                    var categoryID = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'CategoryId');
                    var Name = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'Name');
                    var CategoryGroupTag = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'CategoryGroupTag');
                    var GroupDisplayOrder = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'GroupDisplayOrder');
                    var DisplayOrder = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'DisplayOrder');
                    var Published = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'Published');


                    editCategory(categoryID, Name, CategoryGroupTag, GroupDisplayOrder, DisplayOrder, Published);
                }
            },

            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Category Details",
            pager: '#Categorypager',
            ignoreCase: true
        });

        $('#categoryGrids').jqGrid('navGrid', '#Categorypager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );


    }
    var pic1, pic2;
    function editCategory(categoryID, Name, CategoryGroupTag, GroupDisplayOrder, DisplayOrder, Published) {


        $('#editCategoryName').modal('show');
        $('#txtEditCategoryid').val(categoryID);
        $('#txtEditCategoryname').val(Name);
        $('#txtGrptag').val(CategoryGroupTag);
        $('#txtGrpDisplay').val(GroupDisplayOrder);
        $('#txtDisplayOrder').val(DisplayOrder);
        if (Published == "true") {
            $('#chkPublished').prop('checked', true);
        }
        else {
            $('#chkPublished').prop('checked', false);
        }

    }
    $scope.ModifyCategory = function () {

        var category = {};
        category.id = $('#txtEditCategoryid').val().trim();
        category.categoryName = $('#txtEditCategoryname').val().trim();
        if (category.categoryName == "") {
            $('#CategoryRequiredfield').text(" *Enter Category Name");
        }
        else {
            category.CategoryGroupTag = $('#txtGrptag').val().trim();
            category.GroupDisplayOrder = $('#txtGrpDisplay').val().trim();
            category.DisplayOrder = $('#txtDisplayOrder').val().trim();

            if (category.GroupDisplayOrder == "") {
                category.GroupDisplayOrder = 0;
            }
            if (category.DisplayOrder == "") {
                category.DisplayOrder = 0;
            }

            if ($('#chkPublished').prop('checked') == true) {
                category.Published = 1;
            }
            else {
                category.Published = 0;
            }

            if ($('#chkTopCategory').prop('checked') == true) {
                category.flagTopCategory = 1;
            }
            else {
                category.flagTopCategory = 0;
            }

            var config = {
                params: category,
                headers: { "CommandType": "modifyCategory" }
            };

            $http.get(endPoint + '/modifyCategory', config)
             .then(function (response) {
                 $scope.searchCategory();
                 $('#categoryGrid').show();
                 $("span").html("");
                 $('#editCategoryName').modal('hide');
             });
        }
    }
    function editLink(cellValue, options, rowdata, action) {


        return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

    }
    $scope.checkCategoyId = function () {
        if ($('#txtCategoryId').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtCategoryId').val('');
        }
    }
    $scope.checkCategoryName = function () {
        if ($('#txtCategoryName').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtCategoryName').val('');
        }

    }
    $scope.categoryrClear = function () {
        $('#txtCategoryName').val('');
        $('#txtCategoryId').val('');
    }

    $scope.CheckCategoryId = function (objEvt) {
        var charCode = (objEvt.which) ? objEvt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            document.getElementById("txtCategoryId").style.backgroundColor = "#FFB2B2";
            return false;
        }
        else {
            document.getElementById("txtCategoryId").style.backgroundColor = "#B2D8B2";
            return true;
        }
    }
    $scope.CheckCatDisplay = function (objEvt) {
        var charCode = (objEvt.which) ? objEvt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            document.getElementById("txtDisplayOrder").style.backgroundColor = "#FFB2B2";
            return false;
        }
        else {
            document.getElementById("txtDisplayOrder").style.backgroundColor = "#B2D8B2";
            return true;
        }
    }
    $scope.CheckGrpDisplay = function (objEvt) {
        var charCode = (objEvt.which) ? objEvt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            document.getElementById("txtGrpDisplay").style.backgroundColor = "#FFB2B2";
            return false;
        }
        else {
            document.getElementById("txtGrpDisplay").style.backgroundColor = "#B2D8B2";
            return true;
        }
    }

}]);

app_admin.controller('AdminCategoryExportController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedCategory';

    function InitializeProductExport() {
        LoadCategory();
        $('#CateGridData').hide();
        $('#ExcelData').hide();
        $('#ExcelOrderData').hide();
        $('#SuCateProductList').modal('hide');
        $('#ProductExcelOrderData').modal('hide');
        $('#catid').hide();
        $('#parid').hide();
        $("ddlcateId").select2();
        $("ddlSubId").select2();

    }

    InitializeProductExport();


    function LoadCategory() {
        $("#ddlcateId").empty();
        $("#ddlSubId").empty();

        var config = {
            headers: { "CommandType": "LoadCategory" }
        };

        $http.get(endPoint + '/LoadCategory', config)
         .then(function (response) {
             var data = JSON.parse(response.data);
             $("#ddlcateId").append("<option value='0'>" + '--Select--' + "</option>");
             $("#ddlSubId").append("<option value='0'>" + '--Select--' + "</option>");
             for (var i = 0; i < data.length; i++) {
                 $("#ddlcateId").append("<option value=" + data[i].CategoryId + ">" +
         data[i].Name + "</option>");
             }
             $('#ddlcateId').select2();
         });

        $('#ddlcateId').on('change', function () {
            LoadSubCategory();
        });

    }



    function LoadSubCategory() {

        $("#ddlSubId").empty();
        var input = {};
        input.CateId = $('#ddlcateId').val().trim();

        var config = {
            params: input,
            headers: { "CommandType": "LoadCategory" }
        };

        $http.get(endPoint + '/LoadSubCategory', config)
         .then(function (response) {
             var data = JSON.parse(response.data);
             $("#ddlSubId").empty();
             $("#ddlSubId").append("<option value='0'>" + '--Select--' + "</option>");
             for (var i = 0; i < data.length; i++) {
                 $("#ddlSubId").append("<option value=" + data[i].CategoryId + ">" +
         data[i].Name + "</option>");
             }
             $('#ddlSubId').select2();
         });
    }


    $scope.SearchCategorySubcat = function () {
        var input = {};
        input.CateId = $('#ddlcateId').val().trim();
        input.SubId = $('#ddlSubId').val().trim();
        if ($("#publishproduct").prop("checked") == true) {
            input.publishstatus = 1;
        }
        else {
            input.publishstatus = 0;

        }
        var config = {
            params: input,
            headers: { "CommandType": "LoadCategory" }
        };
        $http.get(endPoint + '/LoaCategoryDetails', config)
       .then(function (response) {
           var data = JSON.parse(response.data);
           var chk = Object.keys(data).length;
           if (chk != 0) {
               $('#CateGridData').show();
               $('#ExcelData').show();
               createGrid(data);
           }
           else {
               $('#CateGridData').hide();
               $('#ExcelData').hide();
               alert('No Data Found');
               return;

           }
       });


    }


    function editLink(cellValue, options, rowdata, action) {

        return '<button type="button" class="btn btn-primary " id="subCateList" >ProductList</button>&nbsp;&nbsp;';


    }

    function createGrid(datas) {
        var data = {
            "rows": eval(datas)
        };
        jQuery("#CateGrid").jqGrid("GridUnload");
        var grid = jQuery("#CateGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['CategoryId', 'ParentCategoryId', 'SubCategory', 'GroupTag', 'Published', 'Action'],
            colModel: [
                        { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                        { name: 'ParentCategoryId', index: 'ParentCategoryId', width: 10, align: "center", sortable: true, hidden: true },
                         { name: 'SubCategory', index: 'SubCategory', width: 90, align: "center" },
                              { name: 'CategoryGroupTag', index: 'CategoryGroupTag', width: 50, align: "center" },
                        { name: 'Published', index: 'Published', width: 20, align: "center", sortable: true },
                        { name: 'CategoryId', index: 'CategoryId', width: 50, align: "center", sortable: false, formatter: editLink }


            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.id == 'subCateList') {
                    var dataFromTheRow = jQuery('#CateGrid').jqGrid('getRowData', rowid);
                    var catId = jQuery('#CateGrid').jqGrid('getCell', rowid, 'CategoryId');
                    var parId = jQuery('#CateGrid').jqGrid('getCell', rowid, 'ParentCategoryId');
                    $scope.showSubCategory(catId, parId);

                }
            },
            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Category List",
            pager: '#CatePager',
            ignoreCase: true
        });

        $('#CateGrid').jqGrid('navGrid', '#CatePager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }


    $scope.showSubCategory = function (catId, parId) {

        $('#SuCateProductList').modal('show');
        var input = {};
        input.Catid = catId;
        input.Parid = parId;
        if ($("#publishproduct").prop("checked") == true) {
            input.publishstatus = 1;
        }
        else {
            input.publishstatus = 0;

        }
        $('#catid').val(catId);
        $('#parid').val(parId);

        var config = {
            params: input,
            headers: { "CommandType": "LoadGridSubproductCategoryDetails" }
        };
        $http.get(endPoint + '/LoadGridSubproductCategoryDetails', config)
       .then(function (response) {
           createSubproductCategoryGrid(response.data);
       });


    }

    function createSubproductCategoryGrid(datas) {
        var data = {
            "rows": eval(datas)
        };
        jQuery("#SubCategoryProductList").jqGrid("GridUnload");
        var grid = jQuery("#SubCategoryProductList");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['BrandName', 'Category', 'Pro_Id', 'ProductName', 'ModelNumber'],
            colModel: [
                        { name: 'BrandName', index: 'BrandName', width: 30, align: "center" },
                        { name: 'Category', index: 'Category', width: 50, align: "center", sortable: true },
                        { name: 'ProductId', index: 'ProductId', width: 20, align: "center", sortable: false, },
            { name: 'ProductName', index: 'ProductName', width: 80, align: "center", sortable: true },
             { name: 'ManufacturerPartNumber', index: 'ManufacturerPartNumber', width: 40, align: "center", sortable: true }
            ],
            width: "880",
            height: 150,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Sub Category Product List",
            pager: '#SubCategoryProductPager',
            ignoreCase: true
        });

        $('#SubCategoryProductList').jqGrid('navGrid', '#SubCategoryProductPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }


    $scope.ShowColmnTochoose = function () {

        $('#ExcelOrderData').modal('show');

        $('#AppendValue').empty();
        $('#ColumnValue').empty();


        var config = {
            headers: { "CommandType": "LoadColumnnameForExcel" }
        };
        $http.get(endPoint + '/LoadColumnnameForExcel', config)
       .then(function (response) {
           var data = JSON.parse(response.data);


           for (var i = 0; i < data.length; i++) {
               $("#ColumnValue").append("<option value=" + data[i].ColumnName + ">" +
       data[i].ColumnName + "</option>");
           }
       });
    }

    $scope.SubCateShowColmnTochoose = function () {

        $('#ProductExcelOrderData').modal('show');

        $('#ProductColumnValue').empty();
        $('#ProductAppendValue').empty();

        var config = {
            headers: { "CommandType": "LoadProductColumnnameForExcel" }
        };
        $http.get(endPoint + '/LoadProductColumnnameForExcel', config)
       .then(function (response) {
           var data = JSON.parse(response.data);


           for (var i = 0; i < data.length; i++) {
               $("#ProductColumnValue").append("<option value=" + data[i].ColumnName + ">" +
       data[i].ColumnName + "</option>");
           }
       });

    }

    $scope.ProductDetailsExcelData = function () {
        var input = {};
        input.Catid = $('#catid').val();
        input.Parid = $('#parid').val();
        if ($("#publishproduct").prop("checked") == true) {
            input.publishstatus = 1;
        }
        else {
            input.publishstatus = 0;

        }
        var config = {
            params: input,
            headers: { "CommandType": "LoadSubproductCategoryDetails" }
        };
        $http.get(endPoint + '/LoadSubproductCategoryDetails', config)
       .then(function (response) {
           var data = JSON.parse(response.data);
           var chk = Object.keys(data).length;
           if (chk != 0) {
               JSONToCSVConvertor(data, "SubCategory Product Details List", true);
           }
           else {
               alert('No Data Found');
               return;
           }
       });
    }

    $scope.GenerateProductForSeleColumn = function () {
        var input = {};
        input.Catid = $('#catid').val();
        input.Parid = $('#parid').val();
        if ($("#publishproduct").prop("checked") == true) {
            input.publishstatus = 1;
        }
        else {
            input.publishstatus = 0;

        }
        var SelectedId = "";
        $('#ProductAppendValue option').each(function () {

            SelectedId = SelectedId + $(this).val().trim() + ",";


        });

        SelectedId = SelectedId.replace(/,\s*$/, "");
        input.SelectedId = SelectedId;


        input.selected = SelectedId;

        var config = {
            params: input,
            headers: { "CommandType": "LoadSubproductCategoryExcelDetails" }
        };
        $http.get(endPoint + '/LoadSubproductCategoryExcelDetails', config)
       .then(function (response) {
           var data = JSON.parse(response.data);
           var chk = Object.keys(data).length;
           if (chk != 0) {
               JSONToCSVConvertor(data, "SubCategory Product Details List", true);


           }
           else {
               alert('No Data Found');
               return;

           }
       });
    }
    $scope.GenerateDataForSeleColumn = function () {


        var input = {};
        var SelectedId = "";
        $('#AppendValue option').each(function () {

            SelectedId = SelectedId + $(this).val().trim() + ",";


        });

        SelectedId = SelectedId.replace(/,\s*$/, "");
        input.SelectedId = SelectedId;

        input.selected = SelectedId;
        input.CateId = $('#ddlcateId option:selected').val();
        input.SubId = $('#ddlSubId option:selected').val();
        if ($("#publishproduct").prop("checked") == true) {
            input.publishstatus = 1;
        }
        else {
            input.publishstatus = 0;

        }

        var config = {
            params: input,
            headers: { "CommandType": "LoadOrderDetailsColumnList" }
        };
        $http.get(endPoint + '/LoadOrderDetailsColumnList', config)
       .then(function (response) {
           var data = JSON.parse(response.data);
           var chk = Object.keys(data).length;
           if (chk != 0) {

               JSONToCSVConvertor(data, "SubCategory Product Details List", true);


           }
           else {
               alert('No Data Found');
               return;
           }

       });


    }

    $scope.CateDetailsExcelData = function () {

        var input = {};
        input.CateId = $('#ddlcateId option:selected').val();
        input.SubId = $('#ddlSubId option:selected').val();
        if ($("#publishproduct").prop("checked") == true) {
            input.publishstatus = 1;
        }
        else {
            input.publishstatus = 0;

        }

        var config = {
            params: input,
            headers: { "CommandType": "LoadAllCategoryDetails" }
        };
        $http.get(endPoint + '/LoadAllCategoryDetails', config)
       .then(function (response) {
           var data = JSON.parse(response.data);
           var chk = Object.keys(data).length;
           if (chk != 0) {
               JSONToCSVConvertor(data, "Category Details List", true);
           }
           else {
               alert('No Data Found');
               return;

           }
       });
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

}]);

var SelectColumnData = function () {
    var Selcol = $('#ColumnValue option:selected').val();

    $("#ColumnValue option[value=" + Selcol + "]").remove();

    $("#AppendValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");


}

var AppendData = function () {
    var Selcol = $('#AppendValue option:selected').val();

    $("#AppendValue option[value=" + Selcol + "]").remove();

    $("#ColumnValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");
}

function SelectProductColumnData() {

    var Selcol = $('#ProductColumnValue option:selected').val();
    $("#ProductColumnValue option[value='" + Selcol + "']").remove();

    $("#ProductAppendValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");

}



function AppendProductData() {
    var Selcol = $('#ProductAppendValue option:selected').val();

    $("#ProductAppendValue option[value='" + Selcol + "']").remove();

    $("#ProductColumnValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");


}