$(function () {
    $('#DiscountDetails').hide();
    $('#DiscountDetails').modal('hide');
    GetDiscountDetailsGrid();
 
});

function NewDiscountDetails()
{
    $('#DiscountDetails').modal('show');
    $('#txtDisId').val('');
    $('#txtDiName').val('');
    $('#txtDisTyId').val('');
    $('#txtUsePer').val('');
    $('#txtDisPer').val('');
    $('#txtDisAmt').val('');
    $('#txtStartDate').val('');
    $('#txtEndDate').val('');
    $('#txtResCoupCode').val('');
    $('#txtCoupCode').val('');
    $('#txtMinOderValue').val('');
    $('#txtMaxDisAmt').val('');

}

function ModifyDiscountDetails() {
   
    var id = $('#txtDisId').val().trim();
    if (id == "") {
        var maxdis = $('#txtMaxDisAmt').val().trim();
        var min = $('#txtMinOderValue').val().trim();
        var staDate = $('#txtStartDate').val().trim();
        var endate = $('#txtEndDate').val().trim();
        var Name = $('#txtDiName').val().trim();
        var DisTypeId = $("#txtDisTyId").val().trim();
        var DisPercentage = $('#txtDisPer').val().trim();
        var DisAmt = $('#txtDisAmt').val().trim();
        var CouCode = $('#txtCoupCode').val().trim();
        if (Name == "") {
            $('#DiscountRequiredfield').text(" *Enter Name");
        }
        else if (DisTypeId == "") {
            $('#DiscountRequiredfield').text(" *Enter Discount Type Id");
        }

        else if (DisPercentage == "") {
            $('#DiscountRequiredfield').text(" *Enter Discount Percentage");
        }

        else if (DisAmt == "") {
            $('#DiscountRequiredfield').text(" *Enter Discount Amount");
        }
        else if (CouCode == "") {
            $('#DiscountRequiredfield').text(" *Enter Coupon Code");
        }

        else {
            if (maxdis == "") {
                maxdis = 0.0;
            }
            if (min == "") {
                min = 0.0;
            }

            var input = {};
            input.Name = $('#txtDiName').val().trim();
            input.DiscountType = $("#txtDisTyId").val().trim();
            if ($("#txtUsePer").prop("checked") == true) {
                input.UsePercentage = 1;
            }
            else {
                input.UsePercentage = 0;

            }
            input.DiscountPercentage = $('#txtDisPer').val();
            input.DiscountAmount = $('#txtDisAmt').val().trim();
            input.StartDate = staDate;
            input.EndDate = endate;
            if ($("#txtResCoupCode").prop("checked") == true) {
                input.RequiresCouponCode = 1;
            }
            else {
                input.RequiresCouponCode = 0;

            }
            input.CouponCode = $('#txtCoupCode').val();
            input.MinOrderValue = min;
            input.MaxDiscountAmount = maxdis;
            $.ajax({
                type: "POST",
                url: "DiscountDetails.svc/SaveDiscountDetails",
                data: JSON.stringify(input),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (datas) {
                    $("span").html("");
                    $('#txtDisId').val('');
                    $('#txtDiName').val('');
                    $('#txtDisTyId').val('');
                    $('#txtUsePer').val('');
                    $('#txtDisPer').val('');
                    $('#txtDisAmt').val('');
                    $('#txtStartDate').val('');
                    $('#txtEndDate').val('');
                    $('#txtResCoupCode').val('');
                    $('#txtCoupCode').val('');
                    $('#txtMinOderValue').val('');
                    $('#txtMaxDisAmt').val('');
                    $('#DiscountDetails').modal('hide');
                    CreateDiscountDetailsGrid(datas.d);
                }
            });
        }
    }
    else {

        var maxdis = $('#txtMaxDisAmt').val().trim();
        var min = $('#txtMinOderValue').val().trim();
        var staDate = $('#txtStartDate').val().trim();
        var endate = $('#txtEndDate').val().trim();
        var Name = $('#txtDiName').val().trim();
        var DisTypeId = $("#txtDisTyId").val().trim();
        var DisPercentage = $('#txtDisPer').val().trim();
        var DisAmt = $('#txtDisAmt').val().trim();
        var CouCode = $('#txtCoupCode').val().trim();
        if (Name == "") {
            $('#DiscountRequiredfield').text(" *Enter Name");
        }
        else if (DisTypeId == "") {
            $('#DiscountRequiredfield').text(" *Enter Discount Type Id");
        }

        else if (DisPercentage == "") {
            $('#DiscountRequiredfield').text(" *Enter Discount Percentage");
        }

        else if (DisAmt == "") {
            $('#DiscountRequiredfield').text(" *Enter Discount Amount");
        }
        else if (CouCode == "") {
            $('#DiscountRequiredfield').text(" *Enter Coupon Code");
        }

        else
        {
            if (maxdis == "") {
                maxdis = 0.0;
            }
            if (min == "") {
                min = 0.0;
            }
           
            var input = {};
            input.Id = $('#txtDisId').val().trim();
            input.Name = $('#txtDiName').val().trim();
            input.DiscountType = $("#txtDisTyId").val().trim();
            if ($("#txtUsePer").prop("checked") == true) {
                input.UsePercentage = 1;
            }
            else {
                input.UsePercentage = 0;

            }
            input.DiscountPercentage = $('#txtDisPer').val();
            input.DiscountAmount = $('#txtDisAmt').val().trim();
            input.StartDate = staDate;
            input.EndDate = endate;
            if ($("#txtResCoupCode").prop("checked") == true) {
                input.RequiresCouponCode = 1;
            }
            else {
                input.RequiresCouponCode = 0;

            }
            input.CouponCode = $('#txtCoupCode').val();
            input.MinOrderValue = min;
            input.MaxDiscountAmount = maxdis;
            $.ajax({
                type: "POST",
                url: "DiscountDetails.svc/UpdateDiscountDetails",
                data: JSON.stringify(input),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (datas) {
                    $("span").html("");
                    $('#txtDisId').val('');
                    $('#txtDiName').val('');
                    $('#txtDisTyId').val('');
                    $('#txtUsePer').val('');
                    $('#txtDisPer').val('');
                    $('#txtDisAmt').val('');
                    $('#txtStartDate').val('');
                    $('#txtEndDate').val('');
                    $('#txtResCoupCode').val('');
                    $('#txtCoupCode').val('');
                    $('#txtMinOderValue').val('');
                    $('#txtMaxDisAmt').val('');
                    $('#DiscountDetails').modal('hide');
                    CreateDiscountDetailsGrid(datas.d);
                }
            });
        }
    }
}

function GetDiscountDetailsGrid() {
    $.ajax({
        type: "POST",
        url: "DiscountDetails.svc/LoadDiscountDetails",
        data: JSON.stringify(),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
             CreateDiscountDetailsGrid(datas.d);
        }
    });

}



    function editLink(cellValue, options, rowdata, action) {


        return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

    }

function CreateDiscountDetailsGrid(data) {

    var data = {
        "rows": eval(data)
    };
    jQuery("#DiscountGrid").jqGrid("GridUnload");
    var grid = jQuery("#DiscountGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['Id', 'Name', 'DiscountType', 'Use %', 'Discount%', 'DiscountAmt', 'StartDate', 'EndDate', 'RequiresCouponCode', 'CouponCode', 'MinOrderValue', 'MaxDiscountAmount', 'Action'],
        colModel: [
                  { name: 'Id', index: 'Id', width: 30, align: "center",hidden:true },
                  { name: 'Name', index: 'Name', width: 80, align: "center", sortable: true },
                  { name: 'DiscountTypeId', index: 'DiscountTypeId', width: 50, align: "center", sortable: true },
                  { name: 'UsePercentage', index: 'UsePercentage', width: 50, align: "center", sortable: true },
                  { name: 'DiscountPercentage', index: 'DiscountPercentage', width: 50, align: "center", sortable: true },
                  { name: 'DiscountAmount', index: 'DiscountAmount', width: 50, align: "center", sortable: true },
                  { name: 'StartDateUtc', index: 'StartDateUtc', width: 50, align: "center", sortable: true, formatter: 'date', formatoptions: { srcformat: 'Y/m/d', newformat: 'Y/m/d' } },
                  { name: 'EndDateUtc', index: 'EndDateUtc', width: 50, align: "center", sortable: true, formatter: 'date', formatoptions: { srcformat: 'Y/m/d', newformat: 'Y/m/d' } },
                  { name: 'RequiresCouponCode', index: 'RequiresCouponCode', width: 50, align: "center", sortable: true },
                  { name: 'CouponCode', index: 'CouponCode', width: 50, align: "center", sortable: true },
                  { name: 'MinOrderValue', index: 'MinOrderValue', width: 50, align: "center", sortable: true },
                  { name: 'MaxDiscountAmount', index: 'MaxDiscountAmount', width: 50, align: "center", sortable: true },
                  { name: 'Id', index: 'Id', width: 30, align: "center", sortable: false, formatter: editLink }

        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {


            if (event.target.className == 'edit') {
                var dataFromTheRow = jQuery('#DiscountGrid').jqGrid('getRowData', rowid);
                var ID = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'Id');
                var Name = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'Name');
                var DiscountTypeId = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'DiscountTypeId');
                var UsePercentage = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'UsePercentage');
                var DiscountPercentage = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'DiscountPercentage');
                var DiscountAmount = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'DiscountAmount');
                var StartDate = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'StartDateUtc');
                var EndDate = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'EndDateUtc');
                var RequiresCouponCode = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'RequiresCouponCode');
                var CouponCode = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'CouponCode');
                var MinOrderValue = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'MinOrderValue');
                var MaxDiscountAmount = jQuery('#DiscountGrid').jqGrid('getCell', rowid, 'MaxDiscountAmount');
               
                editDiscountDetails(ID, Name, DiscountTypeId, UsePercentage, DiscountPercentage, DiscountAmount, StartDate, EndDate, RequiresCouponCode, CouponCode, MinOrderValue, MaxDiscountAmount);
            }




        },



        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Discount Details",
        pager: '#DiscountPager',
        ignoreCase: true
    });

    $('#DiscountGrid').jqGrid('navGrid', '#DiscountPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );


}

function editDiscountDetails(ID, Name, DiscountTypeId, UsePercentage, DiscountPercentage, DiscountAmount, StartDate, EndDate, RequiresCouponCode, CouponCode, MinOrderValue, MaxDiscountAmount)
{
    $('#DiscountDetails').modal('show');
    $('#txtDisId').val(ID);
    $('#txtDiName').val(Name);
    $('#txtDisTyId').val(DiscountTypeId);

    if (UsePercentage == "true") {
        $("#txtUsePer").prop("checked", true);
         }
else {
        $("#txtUsePer").prop("checked", false);

}
     $('#txtDisPer').val(DiscountPercentage);
    $('#txtDisAmt').val(DiscountAmount);
    $('#txtStartDate').val(StartDate);
    $('#txtEndDate').val(EndDate);
    if (RequiresCouponCode == "true") {
        $("#txtResCoupCode").prop("checked", true);
    }
    else {
        $("#txtResCoupCode").prop("checked", false);

    }
    $('#txtCoupCode').val(CouponCode);
    $('#txtMinOderValue').val(MinOrderValue);
    $('#txtMaxDisAmt').val(MaxDiscountAmount);
}


function DiscountClear() {
     $('#txtName').val('');
    $('#txtCouponCode').val('');
    $('#txtStatus').val('');
}

function searchDiscount() {

    var Name = $('#txtName').val();
    var copcode = $('#txtCouponCode').val();
    var input = {};
    if (copcode == "") {
        if (Name != "" || copcode == "") {
            input.Name = $('#txtName').val();
            $.ajax({
                type: "POST",
                url: "DiscountDetails.svc/LoadNameBasedDiscountDetails",
                data: JSON.stringify(input),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (datas) {
                    CreateDiscountDetailsGrid(datas.d);
                }
            });
        }
    }
    if (Name == "") {
        if (Name == "" || copcode != "") {
            input.CoCode = $('#txtCouponCode').val();
            $.ajax({
                type: "POST",
                url: "DiscountDetails.svc/LoadCodeBasedDiscountDetails",
                data: JSON.stringify(input),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (datas) {
                    CreateDiscountDetailsGrid(datas.d);
                }
            });
        }
    }
    if (Name != "")
    {
        if (copcode != "") {
            if (Name != "" || copcode != "") {
                input.Name = $('#txtName').val();
                input.CoCode = $('#txtCouponCode').val();
                $.ajax({
                    type: "POST",
                    url: "DiscountDetails.svc/LoadNameCodeBasedDiscountDetails",
                    data: JSON.stringify(input),
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    success: function (datas) {
                        CreateDiscountDetailsGrid(datas.d);
                    }
                });
            }
        }
    }
}