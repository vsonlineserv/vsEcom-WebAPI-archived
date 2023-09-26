////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_admin.controller('AdminUserMasterController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigrated';

    $(function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();
        $("#txtFrUserrDetails").datepicker(

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

        $("#txtToUserDetails").datepicker(
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



    $scope.searchUserDetails = function () {
        var FromRegisDate = $('#txtFrUserrDetails').val().trim();
        var ToRegisDate = $('#txtToUserDetails').val().trim();

        if (($('#txtUserName').val().length >= 3) || $('#ddlRegisterDetails').val().trim() != 0 || ($('#txtEmail').val().length >= 3) || ($('#txtFrUserrDetails').val().trim() != "") || ($('#txtToUserDetails').val().trim() != "")) {
            $("span").html("");
            if (FromRegisDate == "" && ToRegisDate != "") {
                alert('Choose From Date');
            }
            if (ToRegisDate == "" && FromRegisDate != "") {
                alert('Choose To Date');
            }
            else {
                var user = {};
                user.userName = $('#txtUserName').val().trim();
                user.email = $('#txtEmail').val().trim();
                user.RegisDetails = $('#ddlRegisterDetails').val().trim();
                if (user.RegisDetails == 0 || user.RegisDetails == 1) {
                    user.RegisDetails = "ALL";
                }
                if (user.RegisDetails == 2) {
                    user.RegisDetails = "false";
                }
                if (user.RegisDetails == 3) {
                    user.RegisDetails = "true";
                }

                user.RegisUserFromDate = $('#txtFrUserrDetails').val().trim();
                user.RegisUserToDate = $('#txtToUserDetails').val().trim();


                var config = {
                    params: user,
                    headers: { "CommandType": "searchUser" }
                };

                $http.get(endPoint + '/searchUser', config)
                   .then(function (response) {
                       $('#userGrid').show();
                       createUserGrid(response.data);
                   });
            }
        }
        else {
            $('#Required').text("Please Enter 3 characters to search");

        }

    }
    function createUserGrid(user) {
        var data = {
            "rows": eval(user)
        };
        jQuery("#userlistGrid").jqGrid("GridUnload");
        var grid = jQuery("#userlistGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['UserId', 'Username', 'FirstName', 'LastName', 'Email', 'PhoneNumber1', 'PhoneNumber2', 'IsMerchant', 'Active', 'Deleted', 'Action'],
            colModel: [
                        { name: 'UserId', index: 'UserId', width: 20, align: "center" },
                        { name: 'Username', index: 'Username', width: 50, align: "center", sortable: false },
                        { name: 'FirstName', index: 'FirstName', width: 50, align: "center", sortable: false },
                           { name: 'LastName', index: 'LastName', width: 50, align: "center", sortable: false },
                            { name: 'Email', index: 'Email', width: 50, align: "center", sortable: false },
                        { name: 'PhoneNumber1', index: 'PhoneNumber1', width: 30, align: "center", sortable: false },
                        { name: 'PhoneNumber2', index: 'PhoneNumber2', width: 30, align: "center", sortable: false },
                            { name: 'IsMerchant', index: 'IsMerchant', width: 20, align: "center", sortable: false, hidden: true },
                       { name: 'Active', index: 'Active', width: 20, align: "center", sortable: false, hidden: true },
                            { name: 'Deleted', index: 'Deleted', width: 20, align: "center", sortable: false, hidden: true },
                        { name: 'UserId', index: 'UserId', width: 30, align: "center", sortable: false, formatter: editLink }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#userlistGrid').jqGrid('getRowData', rowid);
                    var UserId = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'UserId');
                    var Username = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'Username');
                    var FirstName = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'FirstName');
                    var LastName = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'LastName');
                    var Email = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'Email');
                    var PhoneNumber1 = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'PhoneNumber1');
                    var PhoneNumber2 = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'PhoneNumber2');
                    //var Active = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'Active');
                    //var IsMerchant = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'IsMerchant');
                    editUserDetails(UserId, Username, FirstName, LastName, Email, PhoneNumber1, PhoneNumber2);
                }
                else if (event.target.className == 'delete') {
                    var deleteUser = confirm("Do you want to Delete ?");
                    if (deleteUser == true) {
                        var dataFromTheRow = jQuery('#userlistGrid').jqGrid('getRowData', rowid);
                        var UserId = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'UserId');
                        var Deleted = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'Deleted');
                        if (Deleted == "false") {
                            Deleted = 1;
                            userIsDeleted(Deleted, UserId);
                        }
                        else {
                            Deleted = 0;
                            userIsDeleted(Deleted, UserId);
                        }

                    }
                }




            },



            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "User Details",
            pager: '#userPager',
            ignoreCase: true
        });

        $('#userlistGrid').jqGrid('navGrid', '#userPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }
    function userIsDeleted(Deleted, UserId) {

        var deleted = {};
        deleted.isDeleted = Deleted;
        deleted.userid = UserId;


        var config = {
            params: deleted,
            headers: { "CommandType": "ModifyUserIsDeleted" }
        };

        $http.get(endPoint + '/ModifyUserIsDeleted', config)
           .then(function (response) {
               $scope.searchUserDetails();
           });
    }
    function editUserDetails(UserId, Username, FirstName, LastName, Email, PhoneNumber1, PhoneNumber2, Active, IsMerchant) {
        $('#editUSer').modal('show');
        $('#txtUserid').val(UserId);
        $('#txtEditUserName').val(Username);
        $('#txtEditFirstName').val(FirstName);
        $('#txtEditLastName').val(LastName);
        $('#txteditEmail').val(Email);
        $('#txtEditPhone1').val(PhoneNumber1);
        $('#txtEditPhone2').val(PhoneNumber2);

    }
    function ModifyUserDetails() {
        var modifyUser = {};
        modifyUser.UserId = $('#txtUserid').val();
        modifyUser.userName = $('#txtEditUserName').val();
        modifyUser.FirstName = $('#txtEditFirstName').val();
        modifyUser.LastName = $('#txtEditLastName').val();
        modifyUser.Email = $('#txteditEmail').val();
        modifyUser.PhoneNumber1 = $('#txtEditPhone1').val();
        modifyUser.PhoneNumber2 = $('#txtEditPhone2').val();

        var config = {
            params: modifyUser,
            headers: { "CommandType": "ModifyUserName" }
        };

        $http.get(endPoint + '/ModifyUserName', config)
           .then(function (response) {
               $('#editUSer').modal('hide');
               $scope.searchUserDetails();
           });

    }
    function editLink(cellValue, options, rowdata, action) {
        return '<img src="images/delete.png" class="delete" width="25px" height="25px" style="margin-top:5px" title="Delete" border=0  />';

    }

    function userClear() {
        $('#txtUserName').val('');
        $('#txtEmail').val('');
        $('#ddlRegisterDetails').val(0);
        $('#txtFrUserrDetails').val('');
        $('#txtToUserDetails').val('');

    }
    function checkUserName() {
        var username = $('#txtUserName').val().length;



        if ((username < 3)) {
            $('#Required').text("Please Enter 3 characters to search");
            $('#txtUserName').val('');

        }
    }
    function checkFirstName() {
        var frstName = $('#txtFirstName').val().length;
        if ((frstName < 3)) {
            $('#Required').text("Please Enter 3 characters to search");
            $('#txtFirstName').val('');
        }
    }
    function checkLastName() {
        var lstname = $('#txtLastName').val().length;
        if ((lstname < 3)) {
            $('#Required').text("Please Enter 3 characters to search");
            $('#txtLastName').val('');

        }
    }
    function checkEmail() {
        var email = $('#txtEmail').val().length;
        if ((email < 3)) {
            $('#Required').text("* Please Enter 3 characters to search");
            $('#txtEmail').val('');
        }

    }
    $(function () {
        $('input:text').keypress(function () {
            $('#Required').text('');
        });
    });

    function InitializeUserDetails() {
        $('#userGrid').hide();
        $('#editUSer').modal('hide');
        $scope.searchUserDetails();
    }

    InitializeUserDetails();


}]);

app_admin.controller('AdminSellerController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {
    var endPoint = 'http://localhost:49475/api/AdminMigratedProduct';

    $(document).ready(function () {
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
                    editStore(branchid, branchname, address1, address2, pinCode, phoneNumber, Storeid, storename, latitude, longitude, EnableBuy, FlagPartner);
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
    function editStoreName(Storeid, storename) {

        $('#editStoreName').modal('show');
        $('#txtEditstoreid').val(Storeid);
        $('#txtEditstorename').val(storename);
    }
    $scope.ModifyStoreName = function () {
        var editStoreName = {};
        editStoreName.EditStoreid = $('#txtEditstoreid').val().trim();
        editStoreName.EditStoreName = $('#txtEditstorename').val().trim();

        if (editStoreName.EditStoreName == "") {
            $('#SellerRequiredfield').text(" *Enter Store Name");
        }
        else {
            var config = {
                params: editStoreName,
                headers: { "CommandType": "ModifyStoreName" }
            };

            $http.get(endPoint + '/ModifyStoreName', config)
               .then(function (response) {
                   $('#editStoreName').modal('hide');
                   $("span").html("");
                   $scope.searchStore();
               });
        }

    }
    function editStore(branchid, branchname, address1, address2, pinCode, phoneNumber, Storeid, storename, latitude, longitude, EnableBuy, FlagPartner) {

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


    $scope.searchStore = function () {
        if (($('#txtStoreId').val().length >= 3) || ($('#txtStoreName').val().length >= 3) || ($('#txtBranchId').val().length >= 3) || ($('#txtBranchName').val().length >= 3)) {
            $('#sellerGrid').show();
            var Store = {};
            Store.storeId = $('#txtStoreId').val();
            Store.storeName = $('#txtStoreName').val();
            Store.branchID = $('#txtBranchId').val();
            Store.branchName = $('#txtBranchName').val();
            if (Store.branchID == "") {
                Store.branchID = 0;
            }
            if (Store.storeId == "") {
                Store.storeId = 0;
            }

            var config = {
                params: Store,
                headers: { "CommandType": "LoadStore" }
            };

            $http.get(endPoint + '/LoadStore', config)
               .then(function (response) {
                   creategrid(response.data);
               });

        }
        else {
            alert("Please Enter minimum 3 characters to search");
        }

    }
    $scope.ModifyStore = function () {
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
            editBranch.FlagPartner = true;
        }
        else {
            editBranch.FlagPartner = false;

        }

        if (editBranch.branchname == "") {
            $('#SellerBranchRequiredfield').text(" * Enter Branch Name");
        }

        else {
            if ($("#txtBuyEnable").prop("checked") == true) {
                editBranch.EnableBuy = true;
            }
            else {
                editBranch.EnableBuy = false;

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
            var config = {
                params: editBranch,
                headers: { "CommandType": "ModifyBranch" }
            };

            $http.get(endPoint + '/ModifyBranch', config)
               .then(function (response) {
                   $('#editStore').modal('hide');
                   $("span").html("");
                   $scope.searchStore();
               });
        }
    }
    $scope.StoreClear = function () {

        $('#txtStoreId').val('');
        $('#txtBranchId').val('');
        $('#txtStoreName').val('');
        $('#txtBranchName').val('');



    }
    $scope.checkStoreId = function () {
        if ($('#txtStoreId').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtStoreId').val('');
        }
    }
    $scope.checkBranchId = function () {
        if ($('#txtBranchId').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtBranchId').val('');
        }
    }
    $scope.checkStoreName = function () {
        if ($('#txtStoreName').val().length < 3) {
            $('#required').text(" * Please Enter 3 characters to search");
            $('#txtStoreName').val('');
        }
    }
    $scope.checkBranchName = function () {

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
    $scope.CheckStoreId = function (objEvt) {
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
    $scope.CheckBranchId = function (objEvt) {
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


}]);

app_admin.controller('AdminSellerCategoryController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {
    var endPoint = 'http://localhost:49475/api/AdminMigrated';
    $scope.ParentCat = {}
    $scope.ParentCatSelected = {};

    $scope.ClearCategory = function () {
        $('#txtBranchId').val('');
        $('#txtBranchName').val('')
    }

    $scope.getCategory = function () {
        var input = {};
        input.BranchId = $('#txtBranchId').val().trim();
        input.BranchName = $('#txtBranchName').val().trim();
        var config = {
            params: input,
            headers: { "CommandType": "LoadSellerCategory" }
        };

        $http.get(endPoint + '/LoadSellerCategory', config)
           .then(function (response) {
               createGrid(response.data);
           });
    }
    function transfer(transfer) {
        $('#ddlselectCategory').append(transfer);
    }

    $scope.LoadCategory = function () {
        $("#ParentCat").empty();
        $('#AsmyselectCate').empty();
        $('#Asmy-select').empty();
        $('#selected').empty();
        $('#myselect').empty();

        var config = {
            headers: { "CommandType": "LoadCategory" }
        };

        $http.get(endPoint + '/LoadCategory', config)
           .then(function (response) {
               var data = JSON.parse(response.data);

               $scope.ParentCat = response.data;
               for (var i = 0; i < data.length; i++) {
                   $("#ParentCat").append("<option value=" + data[i].CategoryId + ">" +
           data[i].Name + "</option>");
               }
           });
    }

    $scope.LoadAssCategory = function () {
        $("#ReParentCat").empty();
        $('#myselect').empty();
        $('#ReAppendSelect').empty();


        var config = {
            headers: { "CommandType": "LoadCategory" }
        };

        $http.get(endPoint + '/LoadCategory', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {
                   $("#ReParentCat").append("<option value=" + data[i].CategoryId + ">" +
                   data[i].Name + "</option>");
               }
           });
    }

    $scope.AppendSelect = function () {


        var input = {};
        input.selected = $('#myselect option:selected').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadSelectedCategory" }
        };

        $http.get(endPoint + '/LoadSelectedCategory', config)
           .then(function (response) {
               $("#myselect option[value=" + input.selected + "]").remove();
               var data = JSON.parse(response.data);

               for (var i = 0; i < data.length; i++) {
                   $("#selected").append("<option value=" + data[i].CategoryId + ">" +
                   data[i].Name + "</option>");
               }
           });
    }


    $scope.deleteAssCategory = function () {


        var input = {};
        input.selected = $('#Asmy-select option:selected').val();
        var config = {
            params: input,
            headers: { "CommandType": "LoadSelectedCategory" }
        };

        $http.get(endPoint + '/LoadSelectedCategory', config)
           .then(function (response) {
               $("#Asmy-select option[value=" + input.selected + "]").remove();
               var data = JSON.parse(response.data);

               for (var i = 0; i < data.length; i++) {
                   $("#AsmyselectCate").append("<option value=" + data[i].CategoryId + ">" +
                   data[i].Name + "</option>");
               }
           });
    }

    $scope.subcat = function () {
        $("#myselect").empty();
        $('#selected').empty();

        var input = {};
        input.CateId = $('#ParentCat option:selected').val();
        input.seller = $('#txtEditSeller').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadSubCategory" }
        };

        $http.get(endPoint + '/LoadSubCategory', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {

                   $("#myselect").append("<option value=" + data[i].CategoryId + ">" +
                   data[i].Name + "</option>");
               }
           });
    }

    $scope.subAssigncat = function () {
        $("#Asmy-select").empty();
        $("#AsmyselectCate").empty();
        var input = {};
        input.CateId = $('#ReParentCat option:selected').val();
        input.seller = $('#txtAsEditSeller').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadsubAssigncat" }
        };

        $http.get(endPoint + '/LoadsubAssigncat', config)
           .then(function (response) {
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {
                   $("#Asmy-select").append("<option value=" + data[i].Id + ">" +
                   data[i].Name + "</option>");
               }
           });
    }

    $scope.ReAppendSelect = function () {


        var input = {};
        input.selected = $('#selected option:selected').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadAppSelectedCategory" }
        };

        $http.get(endPoint + '/LoadAppSelectedCategory', config)
           .then(function (response) {
               $("#selected option[value=" + input.selected + "]").remove();
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {


                   $("#myselect").append("<option value=" + data[i].CategoryId + ">" +
                   data[i].Name + "</option>");
               }
           });
    }

    $scope.restorCate = function () {


        var input = {};
        input.selected = $('#AsmyselectCate option:selected').val();

        var config = {
            params: input,
            headers: { "CommandType": "LoadAppSelectedCategory" }
        };

        $http.get(endPoint + '/LoadAppSelectedCategory', config)
           .then(function (response) {
               $("#selected option[value=" + input.selected + "]").remove();
               var data = JSON.parse(response.data);
               for (var i = 0; i < data.length; i++) {


                   $("#myselect").append("<option value=" + data[i].CategoryId + ">" +
                   data[i].Name + "</option>");
               }
           });

    }
    $scope.ModifySellerCategories = function () {


        var input = {};
        var SelectedId = "";
        input.seller = $('#txtEditSeller').val();


        $('#selected option').each(function (
        ) {

            SelectedId = SelectedId + $(this).val() + ",";


        });



        input.category = SelectedId;
        var config = {
            params: input,
            headers: { "CommandType": "AssignCategory" }
        };

        $http.get(endPoint + '/AssignCategory', config)
           .then(function (response) {
               $("#selected option[value=" + input.selected + "]").remove();
               $('#SellerCategory').modal('hide');
           });

        $('#ddlselectCategory').empty();

    }

    function createGrid(sellerCategory) {
        var data = {
            "rows": eval(sellerCategory)
        };
        jQuery("#sellerCategorygrid").jqGrid("GridUnload");
        var grid = jQuery("#sellerCategorygrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['BranchId', 'BranchName', 'Action'],
            colModel: [
                        { name: 'BranchId', index: 'BranchId', width: 10, align: "center" },
                        { name: 'BranchName', index: 'BranchName', width: 50, align: "center", sortable: true },
                        { name: 'BranchId', index: 'BranchId', width: 10, align: "center", sortable: false, formatter: editLink }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {


                if (event.target.id == 'assign') {
                    var dataFromTheRow = jQuery('#productgrid').jqGrid('getRowData', rowid);
                    var Id = jQuery('#sellerCategorygrid').jqGrid('getCell', rowid, 'BranchId');
                    var BranchName = jQuery('#sellerCategorygrid').jqGrid('getCell', rowid, 'BranchName');
                    assignSellerCategory(Id, BranchName);

                }

                if (event.target.id == 'edit') {
                    var dataFromTheRow = jQuery('#productgrid').jqGrid('getRowData', rowid);
                    var Id = jQuery('#sellerCategorygrid').jqGrid('getCell', rowid, 'BranchId');
                    var BranchName = jQuery('#sellerCategorygrid').jqGrid('getCell', rowid, 'BranchName');
                    editSellerCategory(Id, BranchName);

                }

            },



            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Seller Category List",
            pager: '#sellerCategoryPager',
            ignoreCase: true
        });

        $('#sellerCategorygrid').jqGrid('navGrid', '#sellerCategoryPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }
    function editSellerCategory(Id, BranchName) {

        $('#SellerCategory').modal('show');
        $('#myselect').empty();
        $('#selected').empty();
        $('#txtEditSeller').val(Id);
        $('#txtBranch').val(BranchName);

    }
    function moveCategory() {

        $("#ddlselectCategory").append($('<option>', { value: $('#ddlCategory option:selected').val(), text: $('#ddlCategory option:selected').text() }));


    }
    function editLink(cellValue, options, rowdata, action) {

        return '<button type="button" class="btn btn-primary " id="edit" >Assign</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-primary " id="assign" >Update</button>&nbsp;&nbsp;';

    }

    function assignSellerCategory(Id, BranchName) {
        $scope.LoadAssCategory();
        $('#SellerAssignCategory').modal('show');
        $('#Asmy-select').empty();
        $('#AsmyselectCate').empty();
        $('#txtAsEditSeller').val(Id);
        $('#txtAsBranch').val(BranchName);
        var input = {};
        input.Id = Id;

        var config = {
            params: input,
            headers: { "CommandType": "LoadAssignSellerCategory" }
        };

        $http.get(endPoint + '/LoadAssignSellerCategory', config)
           .then(function (response) {
               createAssignGrid(response.data);
           });
    }
    function createAssignGrid(sellerCategory) {
        var data = {
            "rows": eval(sellerCategory)
        };
        jQuery("#subCategorygrid").jqGrid("GridUnload");
        var grid = jQuery("#subCategorygrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['seller', 'Name'],
            colModel: [
                        { name: 'seller', index: 'seller', width: 10, align: "center" },
                        { name: 'Name', index: 'Name', width: 50, align: "center", sortable: true },


            ],
            width: "500",
            height: 100,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Seller Assigned Category List",
            pager: '#subCategoryPager',
            ignoreCase: true
        });

        $('#subCategorygrid').jqGrid('navGrid', '#subCategoryPager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

    }

    $scope.ModifySellerAssignCategories = function () {

        $("#AsmyselectCate option[value=" + '--Select--' + "]").remove();
        var input = {};
        var SelectedId = "";
        input.seller = $('#txtAsEditSeller').val();


        $('#AsmyselectCate option').each(function (
        ) {

            SelectedId = SelectedId + $(this).val() + ",";


        });
        input.Branch = SelectedId;
        var config = {
            params: input,
            headers: { "CommandType": "UpdateAssignCategory" }
        };

        $http.get(endPoint + '/UpdateAssignCategory', config)
           .then(function (response) {
               $('#SellerAssignCategory').modal('hide');
           });

        $('#AsmyselectCate').empty();
    }


    function InitializeSellerCategory() {

        $scope.LoadCategory();
        $scope.LoadAssCategory();
        $('#SellerCategory').modal('hide');
        $('#SellerCategoryid').hide();
        $('#txtEditid').hide();
        $('#ListId').hide();


    }

    InitializeSellerCategory();


}]);

app_admin.controller('AdminNewStoreController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigrated';
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

    $(document).ready(function () {
        $('#StatusRegis').modal('hide');
    });
    $(document).ready(function () {

        $("#txtRePhnNum").keypress(function (e) {

            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

                return false;
            }
        });

        $("#txtPincode").keypress(function (e) {

            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

                return false;
            }
        });
    });


    $scope.CheckReNameLength = function () {

        if ($('#txtName').val().trim().length < 3) {
            $('#required').text(" * Name must be at least 4 characters long");

        }

        if ($('#txtName').val().trim().length > 3) {
            $("span").html("");

        }
    }


    $scope.CheckBussName = function () {

        if ($('#txtBussName').val().trim().length == 0) {
            $('#required').text(" *Enter Business Name");
            // $('#txtRePhnNum').val('');
        }
        if ($('#txtBussName').val().trim().length > 0) {
            $("span").html("");

        }

    }


    $scope.ChkAddress = function () {
        if ($('#txtRegAdd1').val().trim().length == 0) {
            $('#required').text(" *Enter Address Name");
            // $('#txtRePhnNum').val('');
        }
        if ($('#txtRegAdd1').val().trim().length > 0) {
            $("span").html("");

        }

    }


    $scope.ChkCity = function () {

        if ($('#txtCity').val().trim().length == 0) {
            $('#required').text(" *Enter City");
            // $('#txtRePhnNum').val('');
        }
        if ($('#txtCity').val().trim().length > 0) {
            $("span").html("");

        }
    }


    $scope.ChkPincode = function () {
        if ($('#txtPincode').val().trim().length == 0) {
            $('#required').text(" *Enter Pincode");
            // $('#txtRePhnNum').val('');
        }
        if ($('#txtPincode').val().trim().length < 6) {
            $('#required').text(" *Enter Correct Pincode");

        }
        if ($('#txtPincode').val().trim().length == 6) {

            $("span").html("");

        }

    }
    $scope.ValidatePhNum = function () {


        if ($('#txtRePhnNum').val().trim().length < 10) {
            $('#required').text(" *Enter Valid Phone Number");
            // $('#txtRePhnNum').val('');
        }
        if ($('#txtRePhnNum').val().trim().length > 10) {
            $("span").html("");

        }

    }

    $scope.RetailerClear = function () {
        $('#txtName').val('');
        $('#txtRePhnNum').val('');
        $('#txtReEmail').val('');
        $('#txtLaName').val('');
        $('#txtBussName').val('');
        $('#txtRegAdd1').val('');
        $('#txtRegAdd2').val('');
        $('#txtCity').val('');
        $('#txtPincode').val('');
        $('#txtLati').val('');
        $('#txtlong').val('');
        $("span").html("");
    }



    $scope.RetailerRegister = function () {

        var Requ = $('#required').text().trim();

        var email = $('#txtReEmail').val();
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if ($('#txtName').val().trim().length < 3) {
            $('#required').text(" * Name must be at least 4 characters long");

        }

        else if (!filter.test(email)) {
            $('#required').text(" * Plz Enter Valid EmailId");

        }
        else if ($('#txtBussName').val().trim().length == 0) {
            $('#required').text(" *Enter Business Name");

        }
        else if ($('#txtRePhnNum').val().trim().length < 10) {
            $('#required').text(" *Enter Valid Phone Number");

        }

        else if ($('#txtRegAdd1').val().trim().length == 0) {
            $('#required').text(" *Enter Address");

        }
        else if ($('#txtCity').val().trim().length == 0) {
            $('#required').text(" *Enter City");

        }
        else if ($('#txtPincode').val().trim().length < 6) {
            $('#required').text(" *Enter Correct Pincode");


        }
        else if ($('#txtPincode').val().trim().length == 6) {
            $('#StatusRegis').modal('show');
            var input = {};
            var Latitude = $('#txtLati').val().trim();
            var Longtitude = $('#txtlong').val().trim();
            if (Latitude == "") {
                Latitude = "0";
            }
            if (Longtitude == "") {
                Longtitude = "0";
            }
            input.Name = $('#txtName').val().trim();
            input.Mailid = $('#txtReEmail').val().trim();
            input.PhnNum = $('#txtRePhnNum').val().trim();
            input.lastName = $('#txtLaName').val().trim();
            input.BuName = $('#txtBussName').val().trim();
            input.Add1 = $('#txtRegAdd1').val().trim();
            input.Add2 = $('#txtRegAdd2').val().trim();
            input.City = $('#txtCity').val().trim();
            input.pincode = $('#txtPincode').val().trim();
            input.State = $('#ddlstate option:selected').val().trim();
            input.Country = $('#ddlcountry option:selected').val().trim();
            input.Lati = Latitude;
            input.Long = Longtitude;



            var config = {
                params: input,
                headers: {
                    "CommandType": "RegisRetailer"
                }
            };

            $http.get(endPoint + '/RegisRetailer', config)
               .then(function (response) {
                   var data = JSON.parse(response.data);
                   var chklength = data.length;
                   if (data == 1) {
                       $('#StatusRegis').modal('hide');
                       $scope.message = " Registeration Successful";
                       $scope.savedSuccessfully = true;
                       $('#txtName').val('');
                       $('#txtRePhnNum').val('');
                       $('#txtReEmail').val('');
                       $('#txtLaName').val('');
                       $('#txtBussName').val('');
                       $('#txtRegAdd1').val('');
                       $('#txtRegAdd2').val('');
                       $('#txtCity').val('');
                       $('#txtPincode').val('');
                       $('#txtLati').val('');
                       $('#txtlong').val('');
                   }
                   else {
                       $('#StatusRegis').modal('hide');
                       $('#required').text(" *check MailId,Registeration Is Not Sucess");
                   }
               });
        }

    }

    $scope.GetLocationLatLong = function () {
        var input = {};
        input.Add1 = $('#txtRegAdd1').val().trim();
        input.Add2 = $('#txtRegAdd2').val().trim();
        input.City = $('#txtCity').val().trim();
        input.pincode = $('#txtPincode').val().trim();
        input.State = $('#ddlstate option:selected').val().trim();
        input.Country = $('#ddlcountry option:selected').val().trim();

        var glocation;

        glocation = input.Add1 + "," + input.Add2;
        glocation = glocation + "," + input.City;
        glocation = glocation + "," + input.State;
        glocation = glocation + "," + input.pincode;
        var mapGeoCoder = new google.maps.Geocoder();
        var geoCodeResult = "";
        mapGeoCoder.geocode({ 'address': glocation }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var geoCodeResult = results;
                if (displayLatLong(geoCodeResult)) {
                    $('#txtLati').val($scope.Latitude);
                    $('#txtlong').val($scope.Longitude);
                }
            }
            else {
                geoCodeResult = "We couldn't find that location. Try again."
                $scope.savedSuccessfully = false;
                $scope.message = geoCodeResult;
            }

        });
    }

    function displayLatLong(geoCodeResult) {

        if (typeof geoCodeResult == "string") {
            $scope.message == geoCodeResult;
            return false;
        }
        var bothCords = geoCodeResult[0].geometry.location;
        bothCords = bothCords.toString();
        bothCords = bothCords.replace("\(", " ");
        bothCords = bothCords.replace("\)", " ");
        bothCords = bothCords.split(",");
        var strLat = bothCords[0];
        var strLng = bothCords[1];
        $scope.Latitude = strLat;
        $scope.Longitude = strLng;
        return true;
    }

    function ValidateEmail() {
        var booking_email = $('#txtReEmail').val().trim();
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (testEmail.test(booking_email)) {
            $("span").html("");
        }
        else {
            $('#required').text(" * Plz Enter Valid EmailId");

        }

    }



    $('.txtCity').bind('keyup blur', function () {
        var node = $(this);
        node.val(node.val().replace(/[^a-z\s]/gi, ''));
    }
    );

}]);