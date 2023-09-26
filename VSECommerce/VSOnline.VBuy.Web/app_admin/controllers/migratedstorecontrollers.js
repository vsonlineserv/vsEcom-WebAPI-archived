////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_admin.controller('AdminOrdersController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedSeller';

    $(function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();
        $("#txtFrOderDate").datepicker(

	                 {
	                     dateFormat: ' yy-mm-dd',
	                     showAnim: 'slide',
	                     changeMonth: true,
	                     changeYear: true,
	                     yearRange: '1990:2020',
	                     maxDate: new Date(currentYear, currentMonth, currentDate)

	                 }
	                );

    });

    $(function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();

        $("#txtToOderDate").datepicker(
	                 {
	                     dateFormat: 'yy-mm-dd',
	                     showAnim: 'slide',
	                     changeMonth: true,
	                     changeYear: true,
	                     yearRange: '1990:2020',
	                     maxDate: new Date(currentYear, currentMonth, currentDate)

	                 }
	                );
    });


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


    $scope.ModifyOrderDetailsStatus = function () {
        var FrDate = $('#txtFrOderDate').val();
        var TDate = $('#txtToOderDate').val();

        var input = {};
        input.OrderStatus = $('#OrderStatus').val().trim();
        input.OrderId = $('#txtOrderId').val().trim();
        input.OrderProductStatus = $('#OrderStatus option:selected').text().trim();

        var config = {
            params: input,
            headers: { "CommandType": "ModifyOrderDetailsStatus" }
        };

        $http.get(endPoint + '/ModifyOrderDetailsStatus', config)
           .then(function (response) {
               $('#orderDetailsedit').modal('hide');
               $scope.SearchOderDetails();
           });
    }

    function loadOrderStatus() {

        $('#OrderStatus').empty();

        var config = {
            headers: { "CommandType": "loadOrderStatus" }
        };

        $http.get(endPoint + '/loadOrderStatus', config)
           .then(function (response) {
               var data = JSON.parse(response.data);

               for (var i = 0; i < data.length; i++) {
                   var id = data[i].id;
                   if (id > WholeOrderProductStatus || id == WholeOrderProductStatus) {
                       $("#OrderStatus").append("<option value=" + data[i].id + ">" + data[i].name + "</option>");
                   }
               }
           });
    }

    function loadDeliveryOption() {
        $('#DeliveryOption').empty();
        var config = {
            headers: { "CommandType": "loadDeliveryOption" }
        };

        $http.get(endPoint + '/loadDeliveryOption', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {
                   var id = data[i].id;
                   if (id > DeliveryOption || id == DeliveryOption) {
                       $("#DeliveryOption").append("<option value=" + data[i].id + ">" +
               data[i].name + "</option>");
                   }

               }
           });
    }

    function loadPaymentOption() {
        $('#PaymentOption').empty();

        var config = {
            headers: { "CommandType": "loadPaymentOption" }
        };

        $http.get(endPoint + '/loadPaymentOption', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {
                   var id = data[i].id;
                   if (id > PaymentDetails || id == PaymentDetails) {
                       $("#PaymentOption").append("<option value=" + data[i].id + ">" +
               data[i].name + "</option>");
                   }
               }

           });
    }

    $scope.SearchOderClear = function () {
        $('#txtFrOderDate').val('');
        $('#txtToOderDate').val('');
        $('#txtOrderNum').val('')
        $('#ddlorder').val(0);

    }

    $scope.SearchOderDetails = function () {

        var FrDate = $('#txtFrOderDate').val().trim();
        var TDate = $('#txtToOderDate').val().trim();
        var ChkOrderId = $('#txtOrderNum').val().trim();


        if ((FrDate != "" && TDate == "") || (FrDate == "" && TDate != "")) {
            alert('Choose From & To Date');
            return;
        }

        else {
            CreateOrderDetailsGrid(null);
            loadGridOrderStatus();
            loadGridDeliveryOption();
            loadGridPaymentOption();
            var order = {};
            var day = parseInt($('#ddlorder option:selected').val().trim());
            order.OrderId = $('#txtOrderNum').val().trim();
            order.day = 0;
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
            var config = {
                params: order,
                headers: { "CommandType": "LoadOrderDetails" }
            };

            $http.get(endPoint + '/LoadOrderDetails', config)
               .then(function (response) {
                   var data = JSON.parse(response.data);


                   for (var i = 0; i < data.length; i++) {
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
            colNames: ['OrderId', 'OrderStatus', 'OrderStatus', 'DeliveryOption', 'DeliveryMethod', 'PaymentOption', 'PaymentType', 'CustomerId', 'FirstName', 'Address', 'PhoneNumber', 'Action'],
            colModel: [
                        { name: 'Id', index: 'Id', width: 15, align: "center" },
                        { name: 'OrderStatusId', index: 'OrderStatusId', width: 10, align: "center", sortable: true, hidden: true },
                         { name: 'OrderStatus', index: 'OrderStatus', width: 10, align: "center", sortable: true },
                        { name: 'DeliveryMethod', index: 'DeliveryMethod', width: 10, align: "center", sortable: true, hidden: true },
                          { name: 'DeliveryOption', index: 'DeliveryOption', width: 10, align: "center", sortable: true },
                          { name: 'PaymentMethod', index: 'PaymentMethod', width: 10, align: "center", sortable: true, hidden: true },
                            { name: 'PaymentType', index: 'PaymentType', width: 10, align: "center", sortable: true },
                        { name: 'CustomerId', index: 'CustomerId', width: 10, align: "center", sortable: true, hidden: true },
                        { name: 'FirstName', index: 'FirstName', width: 20, align: "center", sortable: true },
                        { name: 'Address', index: 'Address', width: 50, align: "center", sortable: true },
                        { name: 'PhoneNumber', index: 'PhoneNumber', width: 20, align: "center", sortable: true },
                        { name: 'Id', index: 'Id', width: 28, align: "center", sortable: false, formatter: editLink, search: false }

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


    function InitializeAdminOrderDetails() {
        $scope.SearchOderDetails();
    }

    InitializeAdminOrderDetails();

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

        var config = {
            params: input,
            headers: { "CommandType": "LoadOrderDetailsList" }
        };

        $http.get(endPoint + '/LoadOrderDetailsList', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               $('#txtOrderAmt').val(data[0].TotalRupees);

               //MinimunOrderProductStatus
               WholeOrderProductStatus = data[0].WholeOrderProductStatus;
               loadGridOrderStatus();

               for (var i = 0; i < data.length; i++) {
                   for (var j = 0; j < GridOrderStatus.length; j++) {
                       if (data[i].ItemStatus == GridOrderStatus[j].id) {
                           data[i].ItemStatus = GridOrderStatus[j].name;
                       }
                   }


               }
               loadDeliveryOption();
               loadOrderStatus();
               loadPaymentOption();
               CreateOrderDetailsProductList(data);

           });
    }


    function editLink2(cellValue, options, rowdata, action) {
        return '<button type="button" class="btn btn-primary " id="Edit" >Edit</button>&nbsp;&nbsp;';

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
            colNames: ['ProductId', 'SubproductId', 'OrderItemStatus', 'ItemStatus', 'Name', 'BranchId', 'BranchName', 'Quantity', 'PriceInclTax', 'Action'],
            colModel: [

                       { name: 'ProductId', index: 'ProductId', width: 25, align: "center", sortable: true },
                         { name: 'SubproductId', index: 'SubproductId', width: 5, align: "center", sortable: true, hidden: true },
                          { name: 'OrderItemStatus', index: 'OrderItemStatus', width: 5, align: "center", sortable: true, hidden: true },
                          { name: 'ItemStatus', index: 'ItemStatus', width: 35, align: "center", sortable: true },
                         { name: 'Name', index: 'Name', width: 250, align: "center", sortable: true },
                        { name: 'BranchId', index: 'BranchId', width: 30, align: "center", sortable: true },
                        { name: 'BranchName', index: 'BranchName', width: 90, align: "center", sortable: true },
                        { name: 'Quantity', index: 'Quantity', width: 25, align: "center", sortable: true },
                        { name: 'PriceInclTax', index: 'PriceInclTax', width: 25, align: "center", sortable: true },
                       { name: 'ProductId', index: 'ProductId', width: 40, align: "center", sortable: false, formatter: editLink2, search: false }
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

        var config = {
            headers: { "CommandType": "loadOrderStatus" }
        };

        $http.get(endPoint + '/loadOrderStatus', config)
           .then(function (response) {
               $('#ProductOrderStatus').empty();

               var data = JSON.parse(response.data);

               for (var i = 0; i < data.length; i++) {

                   var id = data[i].id;
                   if (id > OrderItemStatus || id == OrderItemStatus) {

                       $("#ProductOrderStatus").append("<option value=" + data[i].id + ">" +
               data[i].name + "</option>");
                   }
                   $('#ProductOrderStatus').val(OrderItemStatus);
               }
           });


    }

    var UpdateCancelledStatus = "Cancelled", CheckCancelStatus, ChecknoCancelStatus, CheckCancelStatusId;
    function UpdateData() {


        var input = {};
        input.Id = OrderId;
        var config = {
            params: input,
            headers: { "CommandType": "LoadOrderDetailsList" }
        };

        $http.get(endPoint + '/LoadOrderDetailsList', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
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
                   for (var j = 0; j < GridOrderStatus.length; j++) {
                       if (data[i].ItemStatus == GridOrderStatus[j].id) {
                           data[i].ItemStatus = GridOrderStatus[j].name;
                           if (data[i].ItemStatus == UpdateCancelledStatus) {
                               CheckCancelStatus = data[i].ItemStatus;
                               CheckCancelStatusId = GridOrderStatus[j].id;
                           }
                           if (data[i].ItemStatus != UpdateCancelledStatus) {
                               ChecknoCancelStatus = data[i].ItemStatus;
                           }
                       }
                   }


               }

               CreateOrderDetailsProductList(data);
               if (ChecknoCancelStatus == "") {
                   ChecknoCancelStatus = "";
                   UpdateOrderProductStaus();
               }

           });
    }

    function UpdateOrderProductStaus() {
        loadOrderStatus();
        var input = {};
        input.OrderId = $('#txtOrderId').val().trim();
        input.OrderProductStatus = CheckCancelStatusId;

        var config = {
            params: input,
            headers: { "CommandType": "ModifyOrderDetailsStatusBasedOrderItem" }
        };

        $http.get(endPoint + '/ModifyOrderDetailsStatusBasedOrderItem', config)
           .then(function (response) {
               $scope.SearchOderDetails();
           });
    }

    $scope.ModifyProductOrderDetailsStatus = function () {

        var FrDate = $('#txtFrOderDate').val();
        var TDate = $('#txtToOderDate').val();
        var input = {};
        input.OrderitemStatus = $('#ProductOrderStatus').val().trim();
        input.OrderitemId = $('#subOrderDetailsId').val().trim();

        var config = {
            params: input,
            headers: { "CommandType": "ModifyOrderitemDetailsStatus" }
        };

        $http.get(endPoint + '/ModifyOrderitemDetailsStatus', config)
           .then(function (response) {
               $('#suborderDetailsedit').modal('hide');
               UpdateData();
           });
    }


    function viewOderDetails(Id, OrderGuid, CustomerId) {
        $('#txtTotalAmt').val('');
        CreateOrderDetailsListGrid(null);
        $('#OderChoosenId').val(Id);
        $('#OrderDetailsList').modal('show');
        var input = {};
        input.Id = Id;

        var config = {
            params: input,
            headers: { "CommandType": "LoadOrderDetailsList" }
        };

        $http.get(endPoint + '/LoadOrderDetailsList', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               $('#txtTotalAmt').val(data[0].TotalRupees);
               CreateOrderDetailsListGrid(response.data);
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
            colNames: ['OrderId', 'ProductId', 'Name', 'BranchId', 'BranchName', 'Quantity', 'UnitPriceInclTax', 'PriceInclTax'],
            colModel: [
                        { name: 'OrderId', index: 'OrderId', width: 20, align: "center" },
                       { name: 'ProductId', index: 'ProductId', width: 25, align: "center", sortable: true },
                         { name: 'Name', index: 'Name', width: 250, align: "center", sortable: true },
                        { name: 'BranchId', index: 'BranchId', width: 50, align: "center", sortable: true },
                        { name: 'BranchName', index: 'BranchName', width: 90, align: "center", sortable: true },
                        { name: 'Quantity', index: 'Quantity', width: 25, align: "center", sortable: true },
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

        var config = {
            headers: { "CommandType": "loadDeliveryOption" }
        };

        $http.get(endPoint + '/loadDeliveryOption', config)
           .then(function (response) {
               DeliveryOption = JSON.parse(response.data);


           });
    }
    var PayMentOption;
    function loadGridPaymentOption() {

        var config = {
            headers: { "CommandType": "loadPaymentOption" }
        };

        $http.get(endPoint + '/loadPaymentOption', config)
           .then(function (response) {
               PayMentOption = JSON.parse(response.data);


           });
    }



    var GridOrderStatus;
    function loadGridOrderStatus() {
        var config = {
            headers: { "CommandType": "loadOrderStatus" }
        };

        $http.get(endPoint + '/loadOrderStatus', config)
           .then(function (response) {
               GridOrderStatus = JSON.parse(response.data);


           });

    }

    $scope.OrderDetailsExcelData = function () {

        var input = {};
        input.Id = $('#OderChoosenId').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadOrderDetailsList" }
        };

        $http.get(endPoint + '/LoadOrderDetailsList', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               JSONToCSVConvertor(data, "Order Details", true);

           });
    }


    $scope.ShowColmnTochoose = function () {

        $('#ExcelOrderData').modal('show');

        $('#OrderDetailsList').modal('hide');
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

    $scope.GenerateDataForSeleColumn = function () {


        var input = {};
        var SelectedId = "";
        $('#AppendValue option').each(function () {

            SelectedId = SelectedId + $(this).val().trim() + ",";


        });

        SelectedId = SelectedId.replace(/,\s*$/, "");

        input.selected = SelectedId;
        input.Id = $('#OderChoosenId').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadOrderDetailsColumnList" }
        };

        $http.get(endPoint + '/LoadOrderDetailsColumnList', config)
           .then(function (response) {
               var data = JSON.parse(response.data);

               $('#ExcelOrderData').modal('hide');

               JSONToCSVConvertor(data, "Order Details", true);


           });

    }

}]);

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

function SelectColumnDataOrders() {
    var Selcol = $('#ColumnValue option:selected').val();

    $("#ColumnValue option[value=" + Selcol + "]").remove();

    $("#AppendValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");


}

function AppendDataOrders() {
    var Selcol = $('#AppendValue option:selected').val();

    $("#AppendValue option[value=" + Selcol + "]").remove();

    $("#ColumnValue").append("<option value=" + Selcol + ">" +
      Selcol + "</option>");


}



app_admin.controller('AdminEnquiryController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedSeller';

    $(function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();
        $("#txtFrSalesDetails").datepicker(

              {
                  dateFormat: ' yy-mm-dd',
                  showAnim: 'slide',
                  changeMonth: true,
                  changeYear: true,
                  yearRange: '1990:2020',
                  maxDate: new Date(currentYear, currentMonth, currentDate)

              }
             );

    });

    $(function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();

        $("#txtToSalesDetails").datepicker(
              {
                  dateFormat: 'yy-mm-dd',
                  showAnim: 'slide',
                  changeMonth: true,
                  changeYear: true,
                  yearRange: '1990:2020',
                  maxDate: new Date(currentYear, currentMonth, currentDate)

              }
             );
    });



    var list;
    $scope.SearchFromToDateSalesDetails = function () {

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

            var config = {
                params: input,
                headers: { "CommandType": "LoadSalesFromToDate" }
            };
            $http.get(endPoint + '/LoadSalesFromToDate', config)
                  .then(function (response) {
                      CreateSalesGrid(response.data);
                  });
        }
    }

    function InitializeSalesEnquiry() {
        $scope.SearchFromToDateSalesDetails();
    }
    InitializeSalesEnquiry();


    function CreateSalesGrid(datas) {

        var data = {
            "rows": eval(datas)
        };
        jQuery("#salesGrid").jqGrid("GridUnload");
        var grid = jQuery("#salesGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['ContactId', 'ContactName', 'ProductId', 'ProductName', 'StoreId', 'Subject', 'Reply', 'Action'],
            colModel: [
                        { name: 'Id', index: 'Id', width: 10, align: "center" },
                        { name: 'ContactName', index: 'ContactNam', width: 25, align: "center", sortable: true },
                        { name: 'ProductId', index: 'ProductId', width: 10, align: "center", sortable: true },
                        { name: 'Name', index: 'Name', width: 80, align: "center", sortable: true },
                        { name: 'StoreId', index: 'StoreId', width: 10, align: "center", sortable: true },
                        { name: 'Subject', index: 'Subject', width: 40, align: "center", sortable: true },
                         { name: 'Reply', index: 'Reply', width: 30, align: "center", sortable: true },
                        { name: 'Id', index: 'Id', width: 12, align: "center", sortable: true, formatter: editLink, search: false }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.id == 'edit') {
                    var dataFromTheRow = jQuery('#salesGrid').jqGrid('getRowData', rowid);
                    var id = jQuery('#salesGrid').jqGrid('getCell', rowid, 'Id');
                    var reply = jQuery('#salesGrid').jqGrid('getCell', rowid, 'Reply');

                    editSales(id, reply);
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
    function editSales(id, reply) {
        $('#editReply').modal('show');
        $('#txtId').val(id);
        $('#txtReply').val(reply);
    }

    $scope.ModifyReply = function () {
        var reply = {};
        reply.id = $('#txtId').val();
        reply.replies = $('#txtReply').val();

        var config = {
            params: reply,
            headers: { "CommandType": "modifySales" }
        };
        $http.get(endPoint + '/modifySales', config)
              .then(function (response) {
                  $scope.SearchSales();
                  $('#editReply').modal('hide');
              });


    }
    function editLink(cellValue, options, rowdata, action) {


        return '<button type="button" class="btn btn-primary " id="edit" >Reply</button>&nbsp;&nbsp;';

    }

    $(function () {
        $('#editReply').modal('hide');
    });

    $scope.SearchSales = function () {


        var sales = {};
        var day = parseInt($('#ddlday option:selected').val());
        if (day == 1) {
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
        if ($("#chkReply").prop("checked") == true) {
            sales.reply = "true";
        }
        else {
            sales.reply = "false";

        }

        var config = {
            params: sales,
            headers: { "CommandType": "LoadSales" }
        };

        $http.get(endPoint + '/LoadSales', config)
           .then(function (response) {
               CreateSalesGrid(response.data);
           });
    }
    $scope.SalesDetailsClear = function () {

        $('#txtFrSalesDetails').val('');
        $('#txtToSalesDetails').val('');
        $('#chkDateWiseReply').attr('checked', false);
        $('#ddlday').val(0);

    }
}]);

function ClearFromToDate() {
    $('#txtFrSalesDetails').val('');
    $('#txtToSalesDetails').val('');
}
function ClearSalesDropValue() {

    $('#ddlday').val(0);
}

app_admin.controller('AdminPricingController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedProduct';
    $(function () {
        $("#txtSplStartDate").datepicker({
            dateFormat: 'yy-mm-dd',
            showAnim: 'slide',
            changeMonth: true,
            changeYear: true,
            yearRange: '1990:2020',
            onSelect: function (selected) {
                var dt = new Date(selected);
                dt.setDate(dt.getDate() + 1);
                $("#txtSplEndDate").datepicker("option", "minDate", dt);
            }
        });
        $("#txtSplEndDate").datepicker({
            dateFormat: 'yy-mm-dd',
            showAnim: 'slide',
            changeMonth: true,
            changeYear: true,
            yearRange: '1990:2020',
            onSelect: function (selected) {
                var dt = new Date(selected);
                dt.setDate(dt.getDate() - 1);
                $("#txtSplStartDate").datepicker("option", "maxDate", dt);
            }
        });
    });



    $(function () {
        $('#ProductPrice').modal('hide');



    });

    $scope.ClearPriceDetails = function () {

        $('#txtBranchName').val('');
        $('#txtBranchId').val('');
    }

    $scope.SearchProductPriceDetails = function () {
        var Branch = $('#txtBranchName').val().trim();
        var BranhId = $('#txtBranchId').val().trim();
        if (Branch == "" && BranhId == "") {
            alert('Enter BranchName or BranchId');
            return;
        }


        else {
            var input = {};
            input.BranchName = $('#txtBranchName').val().trim();
            input.BranchId = $('#txtBranchId').val().trim();

            var config = {
                params: input,
                headers: { "CommandType": "LoadBranchProductDetails" }
            };

            $http.get(endPoint + '/LoadBranchProductDetails', config)
               .then(function (response) {
                   var data = JSON.parse(response.data);
                   if (data.length > 0) {
                       CreateOrderDetailsGrid(data);
                   }
                   else {
                       $scope.savedSuccessfully = false;
                       $scope.message = "No products in Selected Store. Check the Branch Name or id. Get it from Seller List"
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
            colNames: ['BranchName', 'PricingId', 'Product', 'Name', 'Price', 'OldPrice', 'ProductCost', 'SpecialPrice', 'SpecialPriceStartDate', 'SpecialPriceEndDate', 'Action'],
            colModel: [
                         { name: 'BranchName', index: 'BranchName', width: 50, align: "center" },
                        { name: 'PricingId', index: 'PricingId', width: 10, align: "center", hidden: true },
                        { name: 'Product', index: 'Product', width: 10, align: "center", sortable: false, hidden: true },
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


    $scope.ModifyProductPrice = function () {

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


            var config = {
                params: input,
                headers: { "CommandType": "UpdatePriceDetails" }
            };

            $http.get(endPoint + '/UpdatePriceDetails', config)
               .then(function (response) {
                   $('#ProductPrice').modal('hide');
                   $scope.SearchProductPriceDetails();
               });
        }
    }


    $scope.GenerateDataForSeleColumn = function () {

        var SelectedId = "";
        var input = {};
        $('#PricingColumnSelectedValue option').each(function () {

            SelectedId = SelectedId + $(this).val().trim() + ",";


        });

        SelectedId = SelectedId.replace(/,\s*$/, "");
        input.SelectedId = SelectedId;
        input.BranchName = $('#txtBranchName').val().trim();
        input.BranchId = $('#txtBranchId').val().trim();

        var config = {
            params: input,
            headers: { "CommandType": "LoadPricingExcelDetails" }
        };

        $http.get(endPoint + '/LoadPricingExcelDetails', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               var chk = Object.keys(data).length;
               if (chk != 0) {
                   JSONToCSVConvertor(data, "Product Price Details", true);


               }
               else {
                   alert('No Data Found');
                   return;

               }
           });
    }
    $scope.PricingExcelData = function () {
        var Branch = $('#txtBranchName').val().trim();
        var BranhId = $('#txtBranchId').val().trim();
        if (Branch == "" && BranhId == "") {
            alert('Enter BranchName or BranchId');
            return;
        }
        else {
            var input = {};
            input.BranchName = $('#txtBranchName').val().trim();
            input.BranchId = $('#txtBranchId').val().trim();

            var config = {
                params: input,
                headers: { "CommandType": "LoadBranchProductExcelDetails" }
            };

            $http.get(endPoint + '/LoadBranchProductExcelDetails', config)
               .then(function (response) {
                   var data = JSON.parse(response.data);
                   var chk = Object.keys(data).length;
                   if (chk != 0) {
                       JSONToCSVConvertor(data, "Product Price Details", true);
                   }

                   else {
                       alert('No Data For Price Details To Export In Excel ');
                   }


               });
        }

    }
    $scope.ProductPriceExcelData = function () {
        var Branch = $('#txtBranchName').val().trim();
        var BranhId = $('#txtBranchId').val().trim();
        if (Branch == "" && BranhId == "") {
            alert('Enter BranchName or BranchId');
            return;
        }

        else {

            $('#ExcelPricingData').modal('show');

            $('#PricingColumnValue').empty();
            $('#PricingColumnSelectedValue').empty();

            var config = {
                headers: { "CommandType": "LoadPricingColumnnameForExcel" }
            };

            $http.get(endPoint + '/LoadPricingColumnnameForExcel', config)
               .then(function (response) {
                   var data = JSON.parse(response.data);
                   for (var i = 0; i < data.length; i++) {
                       $("#PricingColumnValue").append("<option value=" + data[i].ColumnName + ">" +
               data[i].ColumnName + "</option>");
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

}]);

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
