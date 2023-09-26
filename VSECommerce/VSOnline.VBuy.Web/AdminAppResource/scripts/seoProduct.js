$(function () {
    loadSeoProduct();
    $('#ddlCategoryId').select2();
    loadSeoCategory();
    $('#editSEOProduct').modal('hide');
});
function loadSeoProduct() {
  
}
function loadSeoCategory()
{
    $('#ddlCategoryId').empty();
    $("#ddlSubCategoryId").append("<option value='--Select--'>" +
'--Select--' + "</option>");
    $.ajax({
        type: "POST",
        url: "seoProduct.svc/loadSeoCategory",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            $("#ddlCategoryId").append("<option value='--Select--'>" +
'--Select--' + "</option>");
            for (var i = 0; i < data.length; i++) {
                $("#ddlCategoryId").append("<option value=" + data[i].CategoryId + ">" +
        data[i].Name + "</option>");
            }
            $('#ddlCategoryId').select2();

        }
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
    else
    {
        $.ajax({
            type: "POST",
            url: "seoProduct.svc/loadSubCategory",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (datas) {

                var data = JSON.parse(datas.d);
                $("#ddlSubCategoryId").append("<option value='--Select--'>" +
     '--Select--' + "</option>");
                for (var i = 0; i < data.length; i++) {
                    $("#ddlSubCategoryId").append("<option value=" + data[i].CategoryId + ">" +
            data[i].Name + "</option>");
                }
                $('#ddlSubCategoryId').select2();

            }
        });
    }


}



function SearchSEOProduct() {
    var input = {};
    input.CategoryId = $('#ddlCategoryId').val().trim();
    input.SubCategoryId = $('#ddlSubCategoryId').val().trim();
    if (input.CategoryId == "--Select--") {
        alert('Choose Category');
    }
    else {
        if (input.SubCategoryId == "--Select--")
        {
            input.SubCategoryId = "0";
        }

               $.ajax({
            type: "POST",
            url: "seoProduct.svc/seoProductList",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {

                createGrid(datas.d);
            }
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
                           { name: 'ProductId', index: 'ProductId', width: 20, align: "center", sortable: false, formatter: editLink }

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
function ModifySEOProduct() {
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
    $.ajax({
        type: "POST",
        url: "seoProduct.svc/ModifySEOProduct",
        data: JSON.stringify(SEOProduct),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
             SearchSEOProduct();
            $('#editSEOProduct').modal('hide');
        }
    });
}