$(function () {
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

});


function LoadCategory() {
    $("#ddlcateId").empty();
     $("#ddlSubId").empty();
         $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadCategory",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);
            $("#ddlcateId").append("<option value='0'>" + '--Select--' + "</option>");
            $("#ddlSubId").append("<option value='0'>" + '--Select--' + "</option>");
                  for (var i = 0; i < data.length; i++) {
                $("#ddlcateId").append("<option value=" + data[i].CategoryId + ">" +
        data[i].Name + "</option>");
                  }
                  $('#ddlcateId').select2();
        }
    });

         $('#ddlcateId').on('change', function () {

             LoadSubCategory();
         });

}



function LoadSubCategory() {

    $("#ddlSubId").empty();
    var input = {};
               input.CateId = $('#ddlcateId').val().trim();
                  $.ajax({
            type: "POST",
            url: "CatSubCategories.svc/LoadSubCategory",
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                var data = JSON.parse(data.d);
                $("#ddlSubId").empty();
              $("#ddlSubId").append("<option value='0'>" + '--Select--' + "</option>");
                for (var i = 0; i < data.length; i++) {
                    $("#ddlSubId").append("<option value=" + data[i].CategoryId + ">" +
            data[i].Name + "</option>");
                }
                $('#ddlSubId').select2();
            },
            error:function() {

            $("#ddlSubId").empty();
            $("#ddlSubId").append("<option value='0'>" + '--Select--' + "</option>");
            }
        });
                
    }


function SearchCategorySubcat()
{
    var input = {};
    input.CateId = $('#ddlcateId').val().trim();
    input.SubId = $('#ddlSubId').val().trim();
    if ($("#publishproduct").prop("checked") == true) {
        input.publishstatus = 1;
    }
    else {
        input.publishstatus = 0;

    }
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoaCategoryDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                $('#CateGridData').show();
                $('#ExcelData').show();
                createGrid(datas.d);
               
            }
            else {
                $('#CateGridData').hide();
                $('#ExcelData').hide();
                alert('No Data Found');
                return;

            }
            
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
        colNames: ['CategoryId', 'ParentCategoryId','SubCategory','GroupTag','Published','Action'],
        colModel: [
                    { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                    { name: 'ParentCategoryId', index: 'ParentCategoryId', width: 10, align: "center", sortable: true ,hidden:true},
                     { name: 'SubCategory', index: 'SubCategory', width: 90, align: "center" },
                          { name: 'CategoryGroupTag', index: 'CategoryGroupTag', width: 50, align: "center" },
                    { name: 'Published', index: 'Published', width: 20, align: "center", sortable: true },
                    { name: 'CategoryId', index: 'CategoryId', width: 50, align: "center", sortable: false, formatter: editLink}


        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {


            if (event.target.id == 'subCateList') {
                var dataFromTheRow = jQuery('#CateGrid').jqGrid('getRowData', rowid);
                var catId = jQuery('#CateGrid').jqGrid('getCell', rowid, 'CategoryId');
                var parId = jQuery('#CateGrid').jqGrid('getCell', rowid, 'ParentCategoryId');
                showSubCategory(catId, parId);

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


function showSubCategory(catId, parId) {
   
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
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadGridSubproductCategoryDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            createSubproductCategoryGrid(datas.d);

           

        }
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
                    { name: 'BrandName', index: 'BrandName', width:30, align: "center" },
                    { name: 'Category', index: 'Category', width: 50, align: "center", sortable: true },
                    { name: 'ProductId', index: 'ProductId', width: 20, align: "center", sortable: false, },
        { name: 'ProductName', index: 'ProductName', width: 80, align: "center", sortable: true },
         { name: 'ManufacturerPartNumber', index: 'ManufacturerPartNumber', width: 40, align: "center", sortable: true }
        ],
        width: "880",
        height:150,
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


function ShowColmnTochoose() {
    
    $('#ExcelOrderData').modal('show');

    $('#AppendValue').empty();
    $('#ColumnValue').empty();
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadColumnnameForExcel",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);


            for (var i = 0; i < data.length; i++) {
                $("#ColumnValue").append("<option value=" + data[i].ColumnName + ">" +
        data[i].ColumnName + "</option>");
            }
        }
    });
}

function SubCateShowColmnTochoose() {

    $('#ProductExcelOrderData').modal('show');

    $('#ProductColumnValue').empty();
    $('#ProductAppendValue').empty();
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadProductColumnnameForExcel",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);


            for (var i = 0; i < data.length; i++) {
                $("#ProductColumnValue").append("<option value=" + data[i].ColumnName + ">" +
        data[i].ColumnName + "</option>");
            }
        }
    });


}


function SelectProductColumnData(){

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

function SelectColumnData() {
    var Selcol = $('#ColumnValue option:selected').val();

    $("#ColumnValue option[value=" + Selcol + "]").remove();

    $("#AppendValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");


}

function AppendData() {
    var Selcol = $('#AppendValue option:selected').val();

    $("#AppendValue option[value=" + Selcol + "]").remove();

    $("#ColumnValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");


}


function ProductDetailsExcelData() {
    var input = {};
    input.Catid = $('#catid').val();
    input.Parid = $('#parid').val();
    if ($("#publishproduct").prop("checked") == true) {
        input.publishstatus = 1;
    }
    else {
        input.publishstatus = 0;

    }
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadSubproductCategoryDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "SubCategory Product Details List", true);


            }
            else {
                alert('No Data Found');
                return;

            }



        }
    });



}

function GenerateProductForSeleColumn() {
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
     $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadSubproductCategoryExcelDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "SubCategory Product Details List", true);


            }
            else {
                alert('No Data Found');
                return;

            }



        }
    });


}
function GenerateDataForSeleColumn() {


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
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadOrderDetailsColumnList",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "SubCategory Product Details List", true);


            }
            else {
                alert('No Data Found');
                return;

            }
        }
    });


}

function CateDetailsExcelData() {

    var input = {};
    input.CateId = $('#ddlcateId option:selected').val();
    input.SubId = $('#ddlSubId option:selected').val();
    if ($("#publishproduct").prop("checked") == true) {
        input.publishstatus = 1;
    }
    else {
        input.publishstatus = 0;

    }
    $.ajax({
        type: "POST",
        url: "CatSubCategories.svc/LoadAllCategoryDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "Category Details List", true);
         

            }
            else {
                 alert('No Data Found');
                return;

            }

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


