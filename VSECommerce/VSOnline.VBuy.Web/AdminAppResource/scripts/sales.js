
$(function ()
{
    $('#editReply').modal('hide');
});

function SearchSales()
{
   
 
    var sales = {};
    var day = parseInt( $('#ddlday option:selected').val());
    if (day == 1)
    {
        sales.day = -1;
    }
    if (day == 2) {
        sales.day = -2;
    }
    if (day == 3) {
        sales.day = -4;
    }
    if (day == 4) {
        sales.day = -6;
    }
    if (day == 5) {
        sales.day = -11;
    }
    if ($("#chkReply").prop("checked") == true)
    {
        sales.reply = "true";
    }
    else {
        sales.reply = "false";
        
    }

    $.ajax({
        type: "POST",
        url: "Sales.svc/LoadSales",
        data: JSON.stringify(sales),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            
            CreateSalesGrid(datas.d);
        }
    });
}


function SalesDetailsClear() {

    $('#txtFrSalesDetails').val('');
    $('#txtToSalesDetails').val('');
    $('#chkDateWiseReply').attr('checked', false);
    $('#ddlday').val(0);

}
function ClearFromToDate() {
    $('#txtFrSalesDetails').val('');
    $('#txtToSalesDetails').val('');
}
function ClearSalesDropValue() {

    $('#ddlday').val(0);
}

var list;
function SearchFromToDateSalesDetails() {

    CreateSalesGrid(null);
    list = $('#ddlday option:selected').text() + "  Sales Inbox";
    var SalesFromDate = $('#txtFrSalesDetails').val().trim();
    var SalesToDate = $('#txtToSalesDetails').val().trim();
    var day = parseInt($('#ddlday option:selected').val().trim());

   
   
    if ((SalesFromDate != "" && SalesToDate == "") || (SalesFromDate == "" && SalesToDate != "")) {
        alert('Choose From & To Date');
        return;
    }
    else {

        var input = {};
        input.SalesFrDate = $('#txtFrSalesDetails').val().trim();
        input.SalesTDate = $('#txtToSalesDetails').val().trim();
        if ($("#chkDateWiseReply").prop("checked") == true) {
            input.reply = "true";
        }
        else {
            input.reply = "false";

        }

        if (day == 1) {
            input.day = -1;
        }
        if (day == 2) {
            input.day = -2;
        }
        if (day == 3) {
            input.day = -4;
        }
        if (day == 4) {
            input.day = -6;
        }
        if (day == 5) {
            input.day = -11;
        }

        $.ajax({
            type: "POST",
            url: "Sales.svc/LoadSalesFromToDate",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {

                CreateSalesGrid(datas.d);
            }
        });
    }
}
function CreateSalesGrid(datas)
{
           
    var data = {
        "rows": eval(datas)
    };
    jQuery("#salesGrid").jqGrid("GridUnload");
    var grid = jQuery("#salesGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['ContactId', 'ContactName', 'ProductId','ProductName', 'StoreId', 'Subject', 'Reply','Action'],
        colModel: [
                    { name: 'Id', index: 'Id', width: 10, align: "center" },
                    { name: 'ContactName', index: 'ContactNam', width: 25, align: "center", sortable: true },
                    { name: 'ProductId', index: 'ProductId', width: 10, align: "center", sortable: true },
                    { name: 'Name', index: 'Name', width: 80, align: "center", sortable: true },
                    { name: 'StoreId', index: 'StoreId', width: 10, align: "center", sortable: true },
                    { name: 'Subject', index: 'Subject', width: 40, align: "center", sortable: true },
                     { name: 'Reply', index: 'Reply', width: 30, align: "center", sortable: true },
                    { name: 'Id', index: 'Id', width: 12, align: "center", sortable: true, formatter: editLink }

        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {


            if (event.target.id== 'edit') {
                var dataFromTheRow = jQuery('#salesGrid').jqGrid('getRowData', rowid);
                var id = jQuery('#salesGrid').jqGrid('getCell', rowid, 'Id');
                var reply = jQuery('#salesGrid').jqGrid('getCell', rowid, 'Reply');
                
                editSales(id,reply);
            }
           

            //  editcalldelete1(BlockId, Block, Active2)

        },



        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Sales Enquiry",
        pager: '#salesPager',
        ignoreCase: true
    });

    $('#salesGrid').jqGrid('navGrid', '#salesPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );


}
function  editSales(id,reply)
{
    $('#editReply').modal('show');
    $('#txtId').val(id);
    $('#txtReply').val(reply);
}
function ModifyReply()
{
    var reply = {};
             reply.id= $('#txtId').val();
             reply.replies = $('#txtReply').val();
             $.ajax({
                 type: "POST",
                 url: "Sales.svc/modifySales",
                 data: JSON.stringify(reply),
                 dataType: "json",
                 contentType: 'application/json; charset=utf-8',
                 success: function (datas) {
                     SearchSales();
                     $('#editReply').modal('hide');
                 }
             });
}
function editLink(cellValue, options, rowdata, action) {


    return '<button type="button" class="btn btn-primary " id="edit" >Reply</button>&nbsp;&nbsp;';

}