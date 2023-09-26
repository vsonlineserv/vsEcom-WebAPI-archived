$(document).ready(function ()
{
    $('#editStore').modal('hide');
    
    $('#editStoreName').modal('hide');
    $('#sellerGrid').hide();
   
});

function creategrid(product) {
    var data = {
        "rows": eval(product)
    };
    jQuery("#storegrid").jqGrid("GridUnload");
    var grid = jQuery("#storegrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['StoreId', 'StoreName', 'Action', 'BranchId', 'BranchName', 'Address1', 'Address2', 'PostalCode', 'PhoneNumber', 'latitude', 'longitude', 'All Location', 'Buy Option', 'Action'],
        colModel: [
                    { name: 'StoreId', index: 'StoreId', width: 10, align: "center" },
                    { name: 'StoreName', index: 'StoreName', width: 50, align: "center", sortable: false },
                    { name: 'StoreId', index: 'StoreId', width: 10, align: "center", sortable: false, formatter: editLink1 },
                    { name: 'BranchId', index: 'BranchId', width: 30, align: "center", sortable: false },
                       { name: 'BranchName', index: 'BranchName', width: 80, align: "center", sortable: false },
                        { name: 'Address1', index: 'Address1', width: 50, align: "center", sortable: false },
                    { name: 'Address2', index: 'Address2', width: 50, align: "center", sortable: false },
                       { name: 'PostalCode', index: 'PostalCode', width: 50, align: "center", sortable: false },
                       { name: 'PhoneNumber', index: 'PhoneNumber', width: 50, align: "center", sortable: false },
                    { name: 'Latitude', index: 'Latitude', width: 20, align: "center", sortable: false },
                        { name: 'Longitude', index: 'Longitude', width: 20, align: "center", sortable: false },
                        { name: 'FlagPartner', index: 'FlagPartner', width: 20, align: "center", sortable: false },
                         { name: 'EnableBuy', index: 'EnableBuy', width: 20, align: "center", sortable: false },
                    { name: 'BranchId', index: 'BranchId', width: 10, align: "center", sortable: false, formatter: editLink }

        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {
            

            if (event.target.className == 'edit') {
                var dataFromTheRow = jQuery('#storegrid').jqGrid('getRowData', rowid);
                var branchid = jQuery('#storegrid').jqGrid('getCell', rowid, 'BranchId');
                var branchname = jQuery('#storegrid').jqGrid('getCell', rowid, 'BranchName');
                var Storeid = jQuery('#storegrid').jqGrid('getCell', rowid, 'StoreId');
                var storename = jQuery('#storegrid').jqGrid('getCell', rowid, 'StoreName');
                var address1 = jQuery('#storegrid').jqGrid('getCell', rowid, 'Address1');
                var address2 = jQuery('#storegrid').jqGrid('getCell', rowid, 'Address2');
                var phoneNumber = jQuery('#storegrid').jqGrid('getCell', rowid, 'PhoneNumber');
                var pinCode = jQuery('#storegrid').jqGrid('getCell', rowid, 'PostalCode');
                var latitude = jQuery('#storegrid').jqGrid('getCell', rowid, 'Latitude');
                var longitude = jQuery('#storegrid').jqGrid('getCell', rowid, 'Longitude');
                var EnableBuy = jQuery('#storegrid').jqGrid('getCell', rowid, 'EnableBuy');
                var FlagPartner = jQuery('#storegrid').jqGrid('getCell', rowid, 'FlagPartner');
                editStore(branchid, branchname, address1, address2, pinCode, phoneNumber, Storeid, storename , latitude, longitude, EnableBuy, FlagPartner);
            }
            if (event.target.className == 'editAddress') {
                var dataFromTheRow = jQuery('#storegrid').jqGrid('getRowData', rowid);
                var Storeid = jQuery('#storegrid').jqGrid('getCell', rowid, 'StoreId');
                var storename = jQuery('#storegrid').jqGrid('getCell', rowid, 'StoreName');
                editStoreName(Storeid, storename);
            }


            //  editcalldelete1(BlockId, Block, Active2)

        },



        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Seller List",
        pager: '#storePager',
        ignoreCase: true
    });

    $('#storegrid').jqGrid('navGrid', '#storePager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );

}
function editStoreName(Storeid, storename)
{
    
    $('#editStoreName').modal('show');
    $('#txtEditstoreid').val(Storeid);
    $('#txtEditstorename').val(storename);
}
function ModifyStoreName()
{
    var editStoreName = {};
    editStoreName.EditStoreid = $('#txtEditstoreid').val().trim();
    editStoreName.EditStoreName = $('#txtEditstorename').val().trim();

    if (editStoreName.EditStoreName == "") {
        $('#SellerRequiredfield').text(" *Enter Store Name");
    }
    else {
        $.ajax({
            type: "POST",
            url: "Product.svc/ModifyStoreName",
            data: JSON.stringify(editStoreName),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function () {
                $('#editStoreName').modal('hide');
                $("span").html("");
                searchStore();


            }
        });
    }

}
function editStore(branchid, branchname, address1, address2, pinCode, phoneNumber, Storeid, storename, latitude, longitude, EnableBuy, FlagPartner)
{
    
    $('#editStore').modal('show');
    $('#txtBranchid').val(branchid);
    $('#txtBrnchName').val(branchname);
    $('#txtAddress1').val(address1);
    $('#txtAddress2').val(address2);
    $('#txtPincode').val(pinCode);
    $('#txtPhoneNumber').val(phoneNumber);
    $('#txtstoreId').val(Storeid);
    $('#txtstoreName').val(storename);
    $('#txtLatitude').val(latitude);
    $('#txtLongitude').val(longitude);
    if (EnableBuy == "true") {
        $("#txtBuyEnable").prop("checked", true);

    }
    else {
        $("#txtBuyEnable").prop("checked", false);
    }

    if (FlagPartner == "true") {
        $("#chkNoLocation").prop("checked", true);

    }
    else {
        $("#chkNoLocation").prop("checked", false);
    }
}
function editLink(cellValue, options, rowdata, action) {


    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

}
function editLink1(cellValue, options, rowdata, action) {


    return '<img src="images/edit.png" class="editAddress" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

}


function searchStore()
{
    if (($('#txtStoreId').val().length >= 3) || ($('#txtStoreName').val().length >= 3) || ($('#txtBranchId').val().length >= 3) || ($('#txtBranchName').val().length >= 3))
    {
        $('#sellerGrid').show();
        var Store = {};
        Store.storeId = $('#txtStoreId').val();
        Store.storeName = $('#txtStoreName').val();
        Store.branchID = $('#txtBranchId').val();
        Store.branchName = $('#txtBranchName').val();
        if (Store.branchName == "") {
            Store.branchName = null;
        }
        if (Store.branchID == "") {
            Store.branchID = 0;
        }
        if (Store.storeName == "") {
            Store.storeName = null;
        }
        if (Store.storeId == "") {
            Store.storeId = 0;
        }
        $.ajax({
            type: "POST",
            url: "Product.svc/LoadStore",
            data: JSON.stringify(Store),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                creategrid(datas.d);
            }
        });

    }
    else {
        alert("Please Enter minimum 3 characters to search");
    }
   
}
function ModifyStore()
{
    var editBranch = {};
    editBranch.branchid = $('#txtBranchid').val().trim();
    editBranch.branchname = $('#txtBrnchName').val().trim();
    editBranch.address1 = $('#txtAddress1').val().trim();
    editBranch.address2 = $('#txtAddress2').val().trim();
    editBranch.pinCode = $('#txtPincode').val().trim();
    editBranch.phoneNumber = $('#txtPhoneNumber').val().trim();
    editBranch.latitude = $('#txtLatitude').val().trim();
    editBranch.longitude = $('#txtLongitude').val().trim();

    if ($("#chkNoLocation").prop("checked") == true) {
        editBranch.FlagPartner = 1;
    }
    else {
        editBranch.FlagPartner = 0;

    }

    if (editBranch.branchname == "") {
        $('#SellerBranchRequiredfield').text(" * Enter Branch Name");
    }

    else
    {
        if ($("#txtBuyEnable").prop("checked") == true) {
            editBranch.EnableBuy = 1;
        }
        else {
            editBranch.EnableBuy = 0;

        }
        if (editBranch.address1 == "") {
            editBranch.address1 = null;
        }


        if (editBranch.address2 == "") {
            editBranch.address2 = null;
        }
        if (editBranch.latitude == "") {
            editBranch.latitude = "0";
        }
        else {
            editBranch.latitude = parseFloat($('#txtLatitude').val().trim());
        }

        if (editBranch.longitude == "") {
            editBranch.longitude = "0";
        }

        else {
            editBranch.longitude = parseFloat($('#txtLongitude').val().trim());

        }

        $.ajax({
            type: "POST",
            url: "Product.svc/ModifyBranch",
            data: JSON.stringify(editBranch),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function () {
                $('#editStore').modal('hide');
                $("span").html("");
                searchStore();

            }
        });

    }
    
 
}
function StoreClear()
{

    $('#txtStoreId').val('');
    $('#txtBranchId').val('');
    $('#txtStoreName').val('');
    $('#txtBranchName').val('');
  


}
function checkStoreId()
{
    if($('#txtStoreId').val().length<3)
    {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtStoreId').val('');
    }
}
function checkBranchId()
{
    if ($('#txtBranchId').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtBranchId').val('');
    }
}
function checkStoreName()
{
    if ($('#txtStoreName').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtStoreName').val('');
    }
}
function checkBranchName()
{

    if ($('#txtBranchName').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtBranchName').val('');
    }
}
$(function () {
    $('input:text').keypress(function () {
        $('#required').text('');
    });
});
function CheckStoreId(objEvt) {
    var charCode = (objEvt.which) ? objEvt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        document.getElementById("txtStoreId").style.backgroundColor = "#FFB2B2";
        return false;
    }
    else {
        document.getElementById("txtStoreId").style.backgroundColor = "#B2D8B2";
        return true;
    }
}
function CheckBranchId(objEvt) {
    var charCode = (objEvt.which) ? objEvt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        document.getElementById("txtBranchId").style.backgroundColor = "#FFB2B2";
        return false;
    }
    else {
        document.getElementById("txtBranchId").style.backgroundColor = "#B2D8B2";
        return true;
    }
}

