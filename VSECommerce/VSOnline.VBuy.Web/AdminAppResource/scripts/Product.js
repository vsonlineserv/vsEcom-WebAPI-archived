
function ConfirmDialog(message) {
    
    if (confirm(message) == true) {
        var BrandId = $('#drpBrandId').val().trim();
        $('#drpBrandId').val(BrandId);
        $("drpBrandId").select2();
    } else
    {
        //BrandName get from GridEditcall
        $('#drpBrandId').val(BrandName);
        $("drpBrandId").select2();
             
    }
}

$(document).ready(function () {
  
    //Select2 Dropdown searchBox Enable
    $.fn.modal.Constructor.prototype.enforceFocus = function () { };
    $('#drpBrandId').on('change', function () {
      
        ConfirmDialog('Are you sure To Change BrandName');
          });
});


$(function () {
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
 
});
function getProducts()
{
    $.ajax({
        type: "POST",
        url: "Product.svc/LoadProduct",

        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            createGrid(data.d);

        }
    });
}
function searchProduct()
{
    if (($('#txtSrchProductId').val().length >= 3) || ($('#txtSrchProductName').val().length >= 3))
    {
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
   
        $.ajax({
            type: "POST",
            url: "Product.svc/SearchProduct",
            data: JSON.stringify(product),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (datas) {
            
                var data = JSON.parse(datas.d);            
                var chk = Object.keys(data).length;
      
            
                if (chk != 0) {
                    createGrid(datas.d);
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
                    createGrid(datas.d);
                    $('#ProductExcel').hide();
                    $('#ProductFeExcel').hide();
                    $('#productKey').hide();
                    $('#ProductGrid').show();
                  
                }
            }
            
        });
       

    }
    else {
       alert("Please Enter minimum 3 characters to search");
    }
   
}

function ProductExcelData()
{
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
    $.ajax({
        type: "POST",
        url: "Product.svc/SearchProduct",
        data: JSON.stringify(product),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var data = JSON.parse(data.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                JSONToCSVConvertor(data, "Product Details", true);
            }

            else {
                alert('No Data For Product Details To Export In Excel ');
            }
        }
    });

}
function ProductKeyExcelData()
{
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
        $.ajax({
            type: "POST",
            url: "Product.svc/SearchProductKey",
            data: JSON.stringify(productKey),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var data = JSON.parse(data.d);
                var chk = Object.keys(data).length;
                if (chk != 0) {
                    JSONToCSVConvertor(data, "Product Key Features", true);
                }
                else {
                    alert('No Data For Product Key Features To Export In Excel ');
                }



            }
            
        });
    }
    else{
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

function ProductKey(productKeyID)
    {
    
    $('#productKey').show();
    var productKey = {};
    productKey.Productkey = productKeyID;
    $.ajax({
        type: "POST",
        url: "Product.svc/SearchProductKey",
        data: JSON.stringify(productKey),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (datas)
        {
            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                createProductKeyGrid(datas.d);
                $('#ProductFeExcel').show();
              }
            else {
                $('#ProductExcel').hide();
             
            }
        }
      
    });
}
function createProductKeyGrid(data)
{
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

                editProductkey(KeyId,Parameter,KeyFeature,DisplayOrder);
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
function editProductkey(KeyId,Parameter,KeyFeature,DisplayOrder)
{
    $('#editProductKey').modal('show');
    $("span").html("");
    $('#txtEditKeyid').val(KeyId);
    $('#txtEditDisplay').val(DisplayOrder);
    $('#txtEditParameter').val(Parameter);
    $('#txtEditKeyFeature').val(KeyFeature);
         
}
function ModifyProductKey()
{
    var productKey = {};
    productKey.keyID=$('#txtEditKeyid').val().trim();
    productKey.display=$('#txtEditDisplay').val().trim();
    productKey.param=$('#txtEditParameter').val().trim();
    productKey.keyFeatures = $('#txtEditKeyFeature').val().trim();
    if (productKey.param == "") 
    {
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

        $.ajax({
            type: "POST",
            url: "Product.svc/ModifyProductKey",
            data: JSON.stringify(productKey),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {

                $('#editProductKey').modal('hide');
                searchProduct();
            }
        });
    }
}
function createGrid(datas)
{
    var data = {
        "rows": eval(datas)
    };
    jQuery("#productgrid").jqGrid("GridUnload");
    var grid = jQuery("#productgrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['ProductId', 'Name', 'BrandName','ManufacturerId', 'Model No', 'ShortDescription', 'FullDescription', 'PictureName', 'PictureName1', 'PictureName2', 'ProductDescription', 'ShowOnHomePage', 'Action'],
        colModel: [
                    { name: 'ProductId', index: 'ProductId', width: 30, align: "center" },
                    { name: 'Name', index: 'Name', width: 150, align: "center", sortable: true },
                     { name: 'BrandName', index: 'BrandName', width: 50, align: "center", sortable: true },
                       { name: 'ManufacturerId', index: 'ManufacturerId', width: 10, align: "center", sortable: true,hidden:true},
                     { name: 'ManufacturerPartNumber', index: 'ManufacturerPartNumber', width: 80, align: "center", sortable: true },
                    { name: 'ShortDescription', index: 'ShortDescription', width: 10, align: "center", sortable: true ,hidden:true},
                    { name: 'FullDescription', index: 'FullDescription', width: 10, align: "center", sortable: true, hidden: true },
                     { name: 'PictureName', index: 'Name', width: 10, align: "center", sortable: true, hidden: true },
                    { name: 'PictureName1', index: 'ShortDescription', width: 10, align: "center", sortable: true, hidden: true },
                    { name: 'PictureName2', index: 'FullDescription', width: 10, align: "center", sortable: true, hidden: true },
                     { name: 'ProductDescriptionHtml', index: 'ProductDescriptionHtml', width: 10, align: "center", sortable: true, hidden: true },
                      { name: 'ShowOnHomePage', index: 'ShowOnHomePage', width: 10, align: "center", sortable: true, hidden: true },
                     { name: 'ProductId', index: 'ProductId', width:30, align: "center", sortable: false, formatter: editLink }

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
   

    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;' ;

}
function editLink3(cellValue, options, rowdata, action) {


    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

}

function getBrandId() {
    $('#drpBrandId').empty();
    var input = {};
    input.Productid = $('#txtProductId').val().trim();

    $.ajax({
        type: "POST",
        url: "Product.svc/getBrandId",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);

            for (var i = 0; i < data.length; i++) {
                $("#drpBrandId").append("<option value=" + data[i].Manufacturer + ">" +
        data[i].Name + "</option>");
            }
            $('#drpBrandId').val(0);
            $('#drpBrandId').val(BrandName);
           $('#drpBrandId').select2();
           
            }
    });

}




var pic, pic1, pic2, html, BrandName;
function editProducts(ProductId, Name, BrandId,ManuPartNumber, ShortDescription, FullDescription, PictureName, PictureName1, PictureName2, ProductDescriptionHtml, ShowOnHomePage)
{
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

      //  $('#pictureUpload').val(PictureName);
    
   //  $('#picture1Upload').val(PictureName1);
   
  //  $('#picture2Upload').val(PictureName2);
    
//  $('#ProductDescription').val(ProductDescriptionHtml);
  
  

}

function ModifyProduct()
{

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
  //  product.proDescription = $('#ProductDescription').val().trim();
  //  product.proDescription = product.proDescription.replace(/^.*[\\\/]/, '');
    product.proFullDesc = $('#txtFullDesc').val().trim();

    if ($("#chkFeaturedProduct").prop("checked") == true)
    {
        product.showonHomePage = "true";
    }
    else {
        product.showonHomePage = "false";        
    }

    
    

    if (product.proName=="") {
        $('#requiredfield').text(" * Enter Product Name");

    }
  
   else if (product.proFullDesc == "") {
       $('#requiredfield').text(" * Enter Full Description ");
   }
   else if (product.proFullDesc != "")
   {

       $("span").html("");
       product.PictureName = $('#pictureUpload').val().trim();
       product.PictureName = product.PictureName.replace(/^.*[\\\/]/, '');
       product.PictureName1 = $('#picture1Upload').val().trim();
       product.PictureName1 = product.PictureName1.replace(/^.*[\\\/]/, '');
       product.PictureName2 = $('#picture2Upload').val().trim();
       product.PictureName2 = product.PictureName2.replace(/^.*[\\\/]/, '');
       if (product.MnuPartNumber == "") {

           product.MnuPartNumber = null;

       }

       if (product.proShortDesc == "") {
           product.proShortDesc = null;
       }
       if (product.PictureName == "" && AlternativePictureName == "") {
           product.PictureName = null;
       }

       else if (product.PictureName != "" && AlternativePictureName == "") {

           product.PictureName = "Product" + "\\" + product.PictureName;
       }
       else if (product.PictureName != "" && AlternativePictureName != "") {
          
           product.PictureName = "Product" +"\\"+product.PictureName;
            }
       else if (product.PictureName == "" && AlternativePictureName != "") {
           product.PictureName = AlternativePictureName;
       }
           
       if (product.PictureName1 == "" && AlternativePictureName1 == "") {
           product.PictureName1 = null;
       }
       else if (product.PictureName1 != "" && AlternativePictureName1 == "") {
           product.PictureName1 = "Product" + "\\" + product.PictureName1;
       }
       else if (product.PictureName1 != "" && AlternativePictureName1 != "") {
           product.PictureName1 = "Product" + "\\" + product.PictureName1 ;
       }
       else if (product.PictureName1 == "" && AlternativePictureName1 != "") {
           product.PictureName1 = AlternativePictureName1;
       }
         
       if (product.PictureName2 == "" && AlternativePictureName2 == "") {
           product.PictureName2 = null;
       }

       else if (product.PictureName2 != "" && AlternativePictureName2 == "") {
           product.PictureName2 = "Product" + "\\" + product.PictureName2 ;
       } else if (product.PictureName2 != "" && AlternativePictureName2 != "") {
           product.PictureName2 = "Product" + "\\" + product.PictureName2 ;
       }
       else if (product.PictureName2 == "" && AlternativePictureName2 != "") {
           product.PictureName2 = AlternativePictureName2;
       }
     
      
       if (product.proDescription == "" && AlterProductDescription == "") {
           product.proDescription = null;
       }
       //else if (product.proDescription != "" && AlterProductDescription == "") {
       //    product.proDescription = "Product" + "\\" + product.proDescription ;
       //}
       //else if (product.proDescription != "" && AlterProductDescription != "") {
       //    product.proDescription = "Product" + "\\" + product.proDescription ;
       //}
       //else if (product.proDescription == "" && AlterProductDescription != "") {
       //    product.proDescription = AlterProductDescription;
       //}
     
          if (product.proShortDesc != null) {
           product.proShortDesc = product.proShortDesc.replace(/'/g, "''");
       }
       product.proFullDesc = product.proFullDesc.replace(/'/g, "''");
       $.ajax({
           type: "POST",
           url: "Product.svc/ModifyProducts",
           data: JSON.stringify(product),
           dataType: "json",
           contentType: 'application/json; charset=utf-8',
           success: function (data) {
               searchProduct();
               var picture = $("#pictureUpload").get(0);
               var picture1 = $("#picture1Upload").get(0);
               var picture2 = $("#picture2Upload").get(0);
               var html = $("#ProductDescription").get(0);
               mobileImgUpload(picture);
               mobileImgUpload(picture1);
               mobileImgUpload(picture2);
               mobileImgUpload(html);
               $('#editProduct').modal('hide');
               $('#pictureUpload').val('');
               $('#picture1Upload').val('');
               $('#picture2Upload').val('');
               $('#ProductDescription').val('');
           }
       });
   }

}
function ProductClear()
{
    $('#txtSrchProductId').val('');
    $('#txtSrchProductName').val('');
    $('#publishproduct').attr('checked', false);
      
}
function checkID()
{
    if ($('#txtSrchProductId').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtSrchProductId').val('');
    }
}
function checkName()
{

    if ($('#txtSrchProductName').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtSrchProductName').val('');
    }
}

function mobileImgUpload(picture) {
   
    //var files = picture.files;

    //var data = new FormData();
    //for (var i = 0; i < files.length; i++) {
    //    data.append(files[i].name, files[i]);
    //}

    //$.ajax({
    //    url: "picture1.ashx",
    //    type: "POST",
    //    data: data,
    //    contentType: false,
    //    processData: false,
    //    success: function () {

    //    }

    //});

}


function CheckIsNumeric(objEvt) {
    var charCode = (objEvt.which) ? objEvt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) )
    {
        document.getElementById("txtSrchProductId").style.backgroundColor = "#FFB2B2";
        return false;
    }
    else {
        document.getElementById("txtSrchProductId").style.backgroundColor = "#B2D8B2";
        return true;
    }
}


function CheckInDisplay(objEvt) {
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
