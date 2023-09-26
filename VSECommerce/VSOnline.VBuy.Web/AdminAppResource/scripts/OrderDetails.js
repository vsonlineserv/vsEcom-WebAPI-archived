
function validateQty(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode == 8 || event.keyCode == 46
     || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else if (key < 48 || key > 57) {
        return false;
    }
    else return true;
};

$(function () {
    loadDeliveryOption();
    loadOrderStatus();
    loadPaymentOption();
    loadGridOrderStatus();
    loadGridDeliveryOption();
    loadGridPaymentOption();
    $('#OrderDetailsId').hide();
      $('#OderChoosenId').hide();
      $('#ExcelOrderData').modal('hide');
    

});




function ModifyOrderDetailsStatus() {
    var FrDate = $('#txtFrOderDate').val();
    var TDate = $('#txtToOderDate').val();
 
    var input = {};
    input.OrderStatus = $('#OrderStatus').val().trim();
    input.OrderId = $('#txtOrderId').val().trim();
    input.OrderProductStatus = $('#OrderStatus option:selected').text().trim();
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/ModifyOrderDetailsStatus",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            $('#orderDetailsedit').modal('hide');
        
            SearchOderDetails();
                   
        }
        
    });
}



function loadOrderStatus()
{

    $('#OrderStatus').empty();
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadOrderStatus",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

            var data = JSON.parse(datas.d);

            for (var i = 0; i < data.length; i++)
            {

                var id = data[i].id;
                           
                if (id > WholeOrderProductStatus || id == WholeOrderProductStatus)
                {
                     $("#OrderStatus").append("<option value=" + data[i].id + ">" +data[i].name + "</option>");
                  
                }


            }

            
           
          
        }
    });
}

function loadDeliveryOption() {
    $('#DeliveryOption').empty();
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadDeliveryOption",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

                        var data = JSON.parse(datas.d);
       
              for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                if (id > DeliveryOption || id == DeliveryOption) {
                    $("#DeliveryOption").append("<option value=" + data[i].id + ">" +
            data[i].name + "</option>");
                }

            }
           
                     
         

        }
    });
}

function loadPaymentOption() {
    $('#PaymentOption').empty();
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadPaymentOption",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

            var data = JSON.parse(datas.d);

            for (var i = 0; i < data.length; i++)
            {
                var id = data[i].id;
                if (id > PaymentDetails || id == PaymentDetails)
                {
                    $("#PaymentOption").append("<option value=" + data[i].id + ">" +
            data[i].name + "</option>");
                }
            }

           
          
        }
    });
}


function SearchOderClear() {
    $('#txtFrOderDate').val('');
    $('#txtToOderDate').val('');
    $('#txtOrderNum').val('')
    $('#ddlorder').val(0);
   
}

function ClearFromTodate() {
    $('#txtFrOderDate').val('');
    $('#txtToOderDate').val('');
}
function ClearLastWeekStatus() {
    $('#ddlorder').val(0);
}

function ClearOtherDetails() {
    $('#txtFrOderDate').val('');
    $('#txtToOderDate').val('');
    $('#ddlorder').val(0);

}
function SearchOderDetails()
{
  
    var FrDate = $('#txtFrOderDate').val().trim();
    var TDate = $('#txtToOderDate').val().trim();
    var ChkOrderId = $('#txtOrderNum').val().trim();


    if ((FrDate != "" && TDate == "") || (FrDate == "" && TDate != "")) {
        alert('Choose From & To Date');
        return;
    }
   
    else
    {
        CreateOrderDetailsGrid(null);
        loadGridOrderStatus();
        loadGridDeliveryOption();
        loadGridPaymentOption();
        var order = {};
        var day = parseInt($('#ddlorder option:selected').val().trim());
        order.OrderId = $('#txtOrderNum').val().trim();
        if (day == 1) {
            order.day = -1;
        }
        if (day == 2) {
            order.day = -4;
        }
        if (day == 3) {
            order.day = -6;
        }
        if (day == 4) {
            order.day = -8;
        }
       
        order.FromDate = $('#txtFrOderDate').val().trim();
        order.ToDate = $('#txtToOderDate').val().trim();
        $.ajax({
            type: "POST",
            url: "OrderDetails.svc/LoadOrderDetails",
            data: JSON.stringify(order),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas)
            {
                
                var data = JSON.parse(datas.d);
                

                for (var i = 0; i < data.length; i++)
                {
                    for (var j = 0; j < GridOrderStatus.length; j++) {
                        if (data[i].OrderStatus == GridOrderStatus[j].id) {
                            data[i].OrderStatus = GridOrderStatus[j].name;
                        }
                    }
                    for (var k = 0; k < DeliveryOption.length; k++) {
                        if (data[i].DeliveryOption == DeliveryOption[k].id) {
                            data[i].DeliveryOption = DeliveryOption[k].name;
                        }
                    }
                    for (var m = 0; m < PayMentOption.length; m++) {
                        if (data[i].PaymentType == PayMentOption[m].id) {
                            data[i].PaymentType = PayMentOption[m].name;
                        }
                    }
                }
                CreateOrderDetailsGrid(data);
            }
        });
    }
}

   


function editLink(cellValue, options, rowdata, action) {
    return '<button type="button" class="btn btn-primary " id="view" >View</button>&nbsp;&nbsp;' +
      '<button type="button" class="btn btn-primary " id="Edit" >Edit</button>&nbsp;&nbsp;';

   

}

function CreateOrderDetailsGrid(datas) {

    var data = {
        "rows": eval(datas)
    };
    jQuery("#OrderGrid").jqGrid("GridUnload");
    var grid = jQuery("#OrderGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['OrderId', 'OrderStatus', 'OrderStatus', 'DeliveryOption', 'DeliveryMethod', 'PaymentOption','PaymentType', 'CustomerId', 'FirstName', 'Address', 'PhoneNumber', 'Action'],
        colModel: [
                    { name: 'Id', index: 'Id', width: 15, align: "center" },
                    { name: 'OrderStatusId', index: 'OrderStatusId', width: 10, align: "center", sortable: true, hidden: true },
                     { name: 'OrderStatus', index: 'OrderStatus', width: 10, align: "center", sortable: true},
                    { name: 'DeliveryMethod', index: 'DeliveryMethod', width: 10, align: "center", sortable: true, hidden: true },
                      { name: 'DeliveryOption', index: 'DeliveryOption', width: 10, align: "center", sortable: true },
                      { name: 'PaymentMethod', index: 'PaymentMethod', width: 10, align: "center", sortable: true,hidden:true},
                        { name: 'PaymentType', index: 'PaymentType', width: 10, align: "center", sortable: true },
                    { name: 'CustomerId', index: 'CustomerId', width: 10, align: "center", sortable: true, hidden: true },
                    { name: 'FirstName', index: 'FirstName', width: 20, align: "center", sortable: true },
                    { name: 'Address', index: 'Address', width: 50, align: "center", sortable: true },
                    { name: 'PhoneNumber', index: 'PhoneNumber', width: 20, align: "center", sortable: true },
                    { name: 'Id', index: 'Id', width: 28, align: "center", sortable: false, formatter: editLink }

        ],
        width: "1100",
    
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.id == 'view') {
                    var dataFromTheRow = jQuery('#OrderGrid').jqGrid('getRowData', rowid);
                    var Id = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'Id');
                    var OrderGuid = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'OrderGuid');
                    var CustomerId = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'CustomerId');
                    viewOderDetails(Id, OrderGuid, CustomerId);

                }

                if (event.target.id == 'Edit') {
                    var dataFromTheRow = jQuery('#OrderGrid').jqGrid('getRowData', rowid);
                    var Id = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'Id');
                    var OrderStatusId = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'OrderStatusId');
                    var DeliveryMethod = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'DeliveryMethod');
                    var PaymentOption = jQuery('#OrderGrid').jqGrid('getCell', rowid, 'PaymentMethod');
                    editOderDetails(Id, OrderStatusId, DeliveryMethod, PaymentOption);

                }

            },
       height: 200,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Order Details",
        pager: '#OrderPager',
        ignoreCase: true
    });

    $('#OrderGrid').jqGrid('navGrid', '#OrderPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );


}


var OrderStatus, DeliveryOption, PaymentDetails, OrderId, WholeOrderProductStatus;
function editOderDetails(Id, OrderStatusId, DeliveryMethod, PaymentOption) {
   
    $('#txtOrderAmt').val('');
    CreateOrderDetailsProductList(null);
    $('#OrderStatus').empty();
    $('#DeliveryOption').empty();
    $('#PaymentOption').empty();

     OrderId = Id;
     OrderStatus = OrderStatusId;
    DeliveryOption = DeliveryMethod;
    PaymentDetails = PaymentOption;
    $('#txtOrderId').val(Id);
    $('#orderDetailsedit').modal('show');
 
  

       
     var input = {};
     input.Id = Id;

     $.ajax({
         type: "POST",
         url: "OrderDetails.svc/LoadOrderDetailsList",
         data: JSON.stringify(input),
         dataType: "json",
         contentType: 'application/json; charset=utf-8',
         success: function (datas)
         {
             var data = JSON.parse(datas.d);
             $('#txtOrderAmt').val(data[0].TotalRupees);
                
             //MinimunOrderProductStatus
             WholeOrderProductStatus = data[0].WholeOrderProductStatus;
             loadGridOrderStatus();

             for (var i = 0; i < data.length; i++) {
                 for (var j = 0; j < GridOrderStatus.length; j++)
                 {
                     if (data[i].ItemStatus == GridOrderStatus[j].id) {
                         data[i].ItemStatus = GridOrderStatus[j].name;
                     }
                 }
                

             }        
             loadDeliveryOption();
             loadOrderStatus();
             loadPaymentOption();
             CreateOrderDetailsProductList(data);
         }
     });
}


function editLink2(cellValue, options, rowdata, action) {
    return '<button type="button" class="btn btn-primary " id="Edit" >Edit</button>&nbsp;&nbsp;' ;

}

function CreateOrderDetailsProductList(datas) {

    var data = {
        "rows": eval(datas)
    };
    jQuery("#OrderDetailsProductList").jqGrid("GridUnload");
    var grid = jQuery("#OrderDetailsProductList");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['ProductId', 'SubproductId', 'OrderItemStatus', 'ItemStatus', 'Name', 'BranchId', 'BranchName', 'Quantity','PriceInclTax', 'Action'],
        colModel: [

                   { name: 'ProductId', index: 'ProductId', width: 25, align: "center", sortable: true },
                     { name: 'SubproductId', index: 'SubproductId', width: 5, align: "center", sortable: true,hidden:true },
                      { name: 'OrderItemStatus', index: 'OrderItemStatus', width: 5, align: "center", sortable: true,hidden:true },
                      { name: 'ItemStatus', index: 'ItemStatus', width: 35, align: "center", sortable: true },
                     { name: 'Name', index: 'Name', width: 250, align: "center", sortable: true },
                    { name: 'BranchId', index: 'BranchId', width: 30, align: "center", sortable: true },
                    { name: 'BranchName', index: 'BranchName', width: 90, align: "center", sortable: true },
                    { name: 'Quantity', index: 'Quantity', width: 25, align: "center", sortable: true },
                    { name: 'PriceInclTax', index: 'PriceInclTax', width: 25, align: "center", sortable: true },
                   { name: 'ProductId', index: 'ProductId', width: 40, align: "center", sortable: false, formatter: editLink2 }
        ],
        width: "850",
        onCellSelect: function (rowid, index, contents, event) {


            if (event.target.id == 'Edit') {
                var dataFromTheRow = jQuery('#OrderDetailsProductList').jqGrid('getRowData', rowid);
                var ProductId = jQuery('#OrderDetailsProductList').jqGrid('getCell', rowid, 'ProductId');
                var SubproductId = jQuery('#OrderDetailsProductList').jqGrid('getCell', rowid, 'SubproductId');
                var OrderItemStatus = jQuery('#OrderDetailsProductList').jqGrid('getCell', rowid, 'OrderItemStatus');
           
                viewProductOderDetails(ProductId, SubproductId, OrderItemStatus);

            }
        },
        height: 200,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Order Details Product List",
        pager: '#OrderDetailsProductPagerList',
        ignoreCase: true
    });

    $('#OrderDetailsProductList').jqGrid('navGrid', '#OrderDetailsProductPagerList',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );


}

var OrdereItemStatus;
function viewProductOderDetails(ProductId, SubproductId, OrderItemStatus) {
    OrdereItemStatus = OrderItemStatus;
  $('#subOrderDetailsId').hide();
    $('#subOrderDetailsId').val(SubproductId);
    $('#txtsubOrderId').val(ProductId);
    $('#suborderDetailsedit').modal('show');

    $('#ProductOrderStatus').empty();
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadOrderStatus",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            $('#ProductOrderStatus').empty();
            var data = JSON.parse(datas.d);

            for (var i = 0; i < data.length; i++) {

                var id = data[i].id;
                if (id > OrderItemStatus || id == OrderItemStatus) {

                    $("#ProductOrderStatus").append("<option value=" + data[i].id + ">" +
            data[i].name + "</option>");
                }


            }

            $('#ProductOrderStatus').val(OrderItemStatus);


        }
    });

}



var UpdateCancelledStatus = "Cancelled", CheckCancelStatus,ChecknoCancelStatus, CheckCancelStatusId;
function UpdateData() {

  
    var input = {};
    input.Id = OrderId;

    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/LoadOrderDetailsList",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            var data = JSON.parse(datas.d);
            $('#txtOrderAmt').val(data[0].TotalRupees);
            //MinimunOrderProductStatus
            WholeOrderProductStatus = data[0].WholeOrderProductStatus;
            loadGridOrderStatus();
            loadDeliveryOption();
            loadOrderStatus();
            loadPaymentOption();
            CheckCancelStatusId = "";
            ChecknoCancelStatus = "";
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < GridOrderStatus.length; j++)
                {
                    if (data[i].ItemStatus == GridOrderStatus[j].id)
                    {
                        data[i].ItemStatus = GridOrderStatus[j].name;
                        if (data[i].ItemStatus == UpdateCancelledStatus) {
                            CheckCancelStatus = data[i].ItemStatus;
                            CheckCancelStatusId = GridOrderStatus[j].id;
                        }
                        if (data[i].ItemStatus != UpdateCancelledStatus)
                        {
                            ChecknoCancelStatus = data[i].ItemStatus;
                        }
                    }
                }


            }
         
            CreateOrderDetailsProductList(data);
            if (ChecknoCancelStatus =="") {
                ChecknoCancelStatus = "";
                UpdateOrderProductStaus();
            }
           }
    });
}

function UpdateOrderProductStaus()
{
    loadOrderStatus();
    var input = {};
    input.OrderId = $('#txtOrderId').val().trim();
    input.OrderProductStatus = CheckCancelStatusId;
  
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/ModifyOrderDetailsStatusBasedOrderItem",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
              SearchOderDetails();

        }

    });
}

function ModifyProductOrderDetailsStatus() {
  

    var FrDate = $('#txtFrOderDate').val();
    var TDate = $('#txtToOderDate').val();
    var input = {};
    input.OrderitemStatus = $('#ProductOrderStatus').val().trim();
    input.OrderitemId = $('#subOrderDetailsId').val().trim();
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/ModifyOrderitemDetailsStatus",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
           $('#suborderDetailsedit').modal('hide');
            UpdateData();

        }

    });

}


function viewOderDetails(Id, OrderGuid, CustomerId)

{
    $('#txtTotalAmt').val('');
    CreateOrderDetailsListGrid(null);
    $('#OderChoosenId').val(Id);
$('#OrderDetailsList').modal('show');
    var input = {};
    input.Id = Id;

    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/LoadOrderDetailsList",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas)
        {
         
           var data = JSON.parse(datas.d);        
            $('#txtTotalAmt').val(data[0].TotalRupees);
             CreateOrderDetailsListGrid(datas.d);
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



function CreateOrderDetailsListGrid(datas) {

    var data = {
        "rows": eval(datas)
    };
    jQuery("#OrderGridList").jqGrid("GridUnload");
    var grid = jQuery("#OrderGridList");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['OrderId', 'ProductId','Name','BranchId','BranchName', 'Quantity', 'UnitPriceInclTax', 'PriceInclTax'],
        colModel: [
                    { name: 'OrderId', index: 'OrderId', width: 20, align: "center" },
                   { name: 'ProductId', index: 'ProductId', width: 25, align: "center", sortable: true },
                     { name: 'Name', index: 'Name', width: 250, align: "center", sortable: true },
                    { name: 'BranchId', index: 'BranchId', width: 50, align: "center", sortable: true },
                    { name: 'BranchName', index: 'BranchName', width: 90, align: "center", sortable: true },
                    { name: 'Quantity', index: 'Quantity', width:25, align: "center", sortable: true },
                    { name: 'UnitPriceInclTax', index: 'UnitPriceInclTax', width: 30, align: "center", sortable: true },
                    { name: 'PriceInclTax', index: 'PriceInclTax', width: 30, align: "center", sortable: true }
                                     
        ],
        width: "850",
        height: 200,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Order Details List",
        pager: '#OrderPagerList',
        ignoreCase: true
    });

    $('#OrderGridList').jqGrid('navGrid', '#OrderPagerList',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );


}





var DeliveryOption;
function loadGridDeliveryOption() {
  
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadDeliveryOption",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

            DeliveryOption = JSON.parse(datas.d);
              }
    });
}
var PayMentOption;
function loadGridPaymentOption() {
       $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadPaymentOption",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

            PayMentOption = JSON.parse(datas.d);
                    }
    });
}



var GridOrderStatus;
function loadGridOrderStatus() {
   
    $.ajax({
        type: "POST",
        url: "OrderDetails.svc/loadOrderStatus",
        data: '',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {

            GridOrderStatus = JSON.parse(datas.d);
                }
    });
}

    function OrderDetailsExcelData()
{
      
        var input = {};
        input.Id = $('#OderChoosenId').val();

        $.ajax({
            type: "POST",
            url: "OrderDetails.svc/LoadOrderDetailsList",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "Order Details", true);

                }
        });
        //var tab_text = "<table border='210px'><tr bgcolor='#87AFC6'>";
        //var textRange; var j = 0;
        //tab = document.getElementById('OrderGridList');
        // for (j = 0 ; j < tab.rows.length ; j++) {
        //    tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
           
        //}

        //tab_text = tab_text + "</table>";
        //tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");
        //tab_text = tab_text.replace(/<img[^>]*>/gi, ""); 
        //tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");

        //var ua = window.navigator.userAgent;
        //var msie = ua.indexOf("MSIE ");

        //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))     
        //{
        //    txtArea1.document.open("txt/html", "replace");
        //    txtArea1.document.write(tab_text);
        //    txtArea1.document.close();
        //    txtArea1.focus();
        //    sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
        //}
        //else                
        //    sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

        //return (sa);

    }


    function ShowColmnTochoose() {

        $('#ExcelOrderData').modal('show');

        $('#OrderDetailsList').modal('hide');
        $('#AppendValue').empty();
        $('#ColumnValue').empty();
        $.ajax({
            type: "POST",
            url: "OrderDetails.svc/LoadColumnnameForExcel",
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



    function GenerateDataForSeleColumn() {


        var input = {};
        var SelectedId = "";
        $('#AppendValue option').each(function ()
        {

            SelectedId = SelectedId + $(this).val().trim() + ",";


        });

        SelectedId = SelectedId.replace(/,\s*$/, "");

        input.selected = SelectedId;
        input.Id = $('#OderChoosenId').val();
        $.ajax({
            type: "POST",
            url: "OrderDetails.svc/LoadOrderDetailsColumnList",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {

                $('#ExcelOrderData').modal('hide');
                var data = JSON.parse(datas.d);
                JSONToCSVConvertor(data, "Order Details", true);

            }
        });

    }