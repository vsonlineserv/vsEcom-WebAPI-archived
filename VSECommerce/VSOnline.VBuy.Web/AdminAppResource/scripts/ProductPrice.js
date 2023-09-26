
$(function () {
    $('#ProductPrice').modal('hide');
   
   

});

function ClearPriceDetails() {

    $('#txtBranchName').val('');
    $('#txtBranchId').val('');
}

function SearchProductPriceDetails() {
    var Branch = $('#txtBranchName').val().trim();
    var BranhId = $('#txtBranchId').val().trim();
    if (Branch == "" && BranhId=="") {
        alert('Enter BranchName or BranchId');
        return;
    }

   
else{
        var input = {};
        input.BranchName = $('#txtBranchName').val().trim();
        input.BranchId = $('#txtBranchId').val().trim();
      
        $.ajax({
            type: "POST",
            url: "ProductPrice.svc/LoadBranchProductDetails",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                var data = JSON.parse(datas.d);
              
                    CreateOrderDetailsGrid(datas.d);
               
                   
                }


                
            
        });
    }
    
}

function editLink(cellValue, options, rowdata, action) {


    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

}

function CreateOrderDetailsGrid(datas) {
    var data = {
        "rows": eval(datas)
    };
    jQuery("#ProductPriceGrid").jqGrid("GridUnload");
    var grid = jQuery("#ProductPriceGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['BranchName', 'PricingId', 'Product', 'Name', 'Price', 'OldPrice','ProductCost','SpecialPrice','SpecialPriceStartDate','SpecialPriceEndDate','Action'],
        colModel: [
                     { name: 'BranchName', index: 'BranchName', width: 50, align: "center" },
                    { name: 'PricingId', index: 'PricingId', width: 10, align: "center",hidden:true },
                    { name: 'Product', index: 'Product', width: 10, align: "center", sortable: false,hidden:true },
                    { name: 'Name', index: 'Name', width: 90, align: "center", sortable: false },
                    { name: 'Price', index: 'Price', width: 20, align: "center", sortable: false },
                    { name: 'OldPrice', index: 'OldPrice', width: 20, align: "center", sortable: false },
                    { name: 'ProductCost', index: 'ProductCost', width: 20, align: "center", sortable: false },
                    { name: 'SpecialPrice', index: 'SpecialPrice', width: 20, align: "center", sortable: false },
                    { name: 'SpecialPriceStartDateTimeUtc', index: 'SpecialPriceStartDateTimeUtc', width: 20, align: "center", sortable: false, formatter: 'date', formatoptions: { srcformat: 'Y/m/d', newformat: 'Y/m/d' } },
                    { name: 'SpecialPriceEndDateTimeUtc', index: 'SpecialPriceEndDateTimeUtc', width: 20, align: "center", sortable: false, formatter: 'date', formatoptions: { srcformat: 'Y/m/d', newformat: 'Y/m/d' } },
                    { name: 'BranchName', index: 'BranchName', width: 20, align: "center", sortable: false, formatter: editLink }

        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {

            if (event.target.className == 'edit') {
                var dataFromTheRow = jQuery('#ProductPriceGrid').jqGrid('getRowData', rowid);
                var BName = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'BranchName');
                var PricingId = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'PricingId');
                var ProductId = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'Product');
                var PName = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'Name');
                var Price = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'Price');
                var OldPrice = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'OldPrice');
                var PCost = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'ProductCost');
                var SpePrice = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'SpecialPrice');
                var SpStDate = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'SpecialPriceStartDateTimeUtc');
                var SpEnDate = jQuery('#ProductPriceGrid').jqGrid('getCell', rowid, 'SpecialPriceEndDateTimeUtc');
                editProductPrice(BName, PricingId, ProductId, PName, Price, OldPrice, PCost, SpePrice, SpStDate, SpEnDate);
            }
        },



        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Product Price",
        pager: '#ProductPricePager',
        ignoreCase: true
    });

    $('#ProductPriceGrid').jqGrid('navGrid', '#ProductPricePager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );
}


function editProductPrice(BName, PricingId, ProductId, PName, Price, OldPrice, PCost, SpePrice, SpStDate, SpEnDate) {

    $('#ProductPrice').modal('show');
    $('#txtEditid').val(PricingId);
    $('#txtProName').val(PName);
    $('#txtPrice').val(Price);
    $('#txtOldPrice').val(OldPrice);
    $('#txtProPrice').val(PCost);
    $('#txtSpprice').val(SpePrice);
    $('#txtSplStartDate').val(SpStDate);
    $('#txtSplEndDate').val(SpEnDate);
  

}


function ModifyProductPrice() {

    var price = $('#txtPrice').val().trim();
  
    var SplPrice = $('#txtSpprice').val().trim();

    if (price < SplPrice) {
        $('#ProductPriceRequiredfield').text(" *Special Price Should Not Be Greater Than Price");
       }
    else {
        var input = {};
        input.priceid = $('#txtEditid').val().trim();
        input.price = $('#txtPrice').val().trim();
        input.oldprice = $('#txtOldPrice').val().trim();
        input.productcost = $('#txtProPrice').val().trim();
        input.SpecialPrice = $('#txtSpprice').val().trim();
        input.SplStartDate = $('#txtSplStartDate').val().trim();
        input.SplEndDate = $('#txtSplEndDate').val().trim();
        if (input.price == "") {
            input.price = "0";
        }
        if (input.SpecialPrice == "") {
            input.SpecialPrice = "0";
        }
        $.ajax({
            type: "POST",
            url: "ProductPrice.svc/UpdatePriceDetails",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                $('#ProductPrice').modal('hide');
                SearchProductPriceDetails();
            }
        });
       
    }
}

function SelectColumnData() {

    var Selcol = $('#PricingColumnValue option:selected').val();

    $("#PricingColumnValue option[value='" + Selcol + "']").remove();

    $("#PricingColumnSelectedValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");

}

function AppendColumnData() {

    var Selcol = $('#PricingColumnSelectedValue option:selected').val();

    $("#PricingColumnSelectedValue option[value='" + Selcol + "']").remove();

    $("#PricingColumnValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");

}

function GenerateDataForSeleColumn() {

    var SelectedId = "";
    var input = {};
    $('#PricingColumnSelectedValue option').each(function () {

        SelectedId = SelectedId + $(this).val().trim() + ",";


    });

    SelectedId = SelectedId.replace(/,\s*$/, "");
    input.SelectedId = SelectedId;
    input.BranchName = $('#txtBranchName').val().trim();
    input.BranchId = $('#txtBranchId').val().trim();
     $.ajax({
        type: "POST",
        url: "ProductPrice.svc/LoadPricingExcelDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            var chk = Object.keys(data).length;
            if (chk != 0) {
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "Product Price Details", true);


            }
            else {
                alert('No Data Found');
                return;

            }



        }
    });
}
function PricingExcelData()
{
    var Branch = $('#txtBranchName').val().trim();
    var BranhId = $('#txtBranchId').val().trim();
    if (Branch == "" && BranhId == "") {
        alert('Enter BranchName or BranchId');
        return;
    }
 else{
        var input = {};
        input.BranchName = $('#txtBranchName').val().trim();
        input.BranchId = $('#txtBranchId').val().trim();
        $.ajax({
            type: "POST",
            url: "ProductPrice.svc/LoadBranchProductExcelDetails",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var data = JSON.parse(data.d);
                var chk = Object.keys(data).length;
                if (chk != 0) {
                    JSONToCSVConvertor(data, "Product Price Details", true);
                }

                else {
                    alert('No Data For Price Details To Export In Excel ');
                }

            }

        });
    }
  
}
function ProductPriceExcelData()
{
    var Branch = $('#txtBranchName').val().trim();
    var BranhId = $('#txtBranchId').val().trim();
    if (Branch == "" && BranhId == "") {
        alert('Enter BranchName or BranchId');
        return;
    }

   else{

        $('#ExcelPricingData').modal('show');

        $('#PricingColumnValue').empty();
        $('#PricingColumnSelectedValue').empty();
        $.ajax({
            type: "POST",
            url: "ProductPrice.svc/LoadPricingColumnnameForExcel",
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                var data = JSON.parse(data.d);


                for (var i = 0; i < data.length; i++) {
                    $("#PricingColumnValue").append("<option value=" + data[i].ColumnName + ">" +
            data[i].ColumnName + "</option>");
                }
            }
        });
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