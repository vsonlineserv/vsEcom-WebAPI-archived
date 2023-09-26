$(document).ready(function ()
{
    $('#userGrid').hide();
    $('#editUSer').modal('hide');
});




function searchUserDetails()
{
       var FromRegisDate = $('#txtFrUserrDetails').val().trim();
    var ToRegisDate = $('#txtToUserDetails').val().trim();
  
    if (($('#txtUserName').val().length >= 3) || $('#ddlRegisterDetails').val().trim() !=0 || ($('#txtEmail').val().length >= 3) || ($('#txtFrUserrDetails').val().trim() != "") || ($('#txtToUserDetails').val().trim() != ""))
    {
        $("span").html("");
        if (FromRegisDate == "" && ToRegisDate != "") {
            alert('Choose From Date');
        }
        if (ToRegisDate == "" && FromRegisDate != "") {
            alert('Choose To Date');
        }
        else
        {
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
            if (user.userName == "") {
                user.userName = null;
            }
            if (user.email == "") {
                user.email = null;
            }
            user.RegisUserFromDate = $('#txtFrUserrDetails').val().trim();
            user.RegisUserToDate = $('#txtToUserDetails').val().trim();
            if (user.RegisUserFromDate == "") {
                user.RegisUserFromDate = null;
            }
            if (user.RegisUserToDate == "") {
                user.RegisUserToDate = null;
            }
            $.ajax({
                type: "POST",
                url: "users.svc/searchUser",
                data: JSON.stringify(user),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $('#userGrid').show();
                    createUserGrid(data.d);
                }
            });
        }
    }
    else {
        $('#Required').text("Please Enter 3 characters to search");
      
    }
    
}
function createUserGrid(user)
{
    var data = {
        "rows": eval(user)
    };
    jQuery("#userlistGrid").jqGrid("GridUnload");
    var grid = jQuery("#userlistGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['UserId', 'Username', 'FirstName', 'LastName', 'Email', 'PhoneNumber1', 'PhoneNumber2', 'IsMerchant', 'Active','Deleted', 'Action'],
        colModel: [
                    { name: 'UserId', index: 'UserId', width: 20, align: "center" },
                    { name: 'Username', index: 'Username', width: 50, align: "center", sortable: false },
                    { name: 'FirstName', index: 'FirstName', width: 50, align: "center", sortable: false },
                       { name: 'LastName', index: 'LastName', width: 50, align: "center", sortable: false },
                        { name: 'Email', index: 'Email', width: 50, align: "center", sortable: false },
                    { name: 'PhoneNumber1', index: 'PhoneNumber1', width: 30, align: "center", sortable: false },
                    { name: 'PhoneNumber2', index: 'PhoneNumber2', width: 30, align: "center", sortable: false },
                        { name: 'IsMerchant', index: 'IsMerchant', width: 20, align: "center", sortable: false ,hidden:true},
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
                editUserDetails(UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2);
            }
            else if(event.target.className == 'delete')
            {
                var deleteUser = confirm("Do you want to Delete ?");
                if (deleteUser == true) {
                    var dataFromTheRow = jQuery('#userlistGrid').jqGrid('getRowData', rowid);
                    var UserId = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'UserId');
                    var Deleted = jQuery('#userlistGrid').jqGrid('getCell', rowid, 'Deleted');
                                     if (Deleted == "false")
                    {
                        Deleted = 1;
                        userIsDeleted(Deleted,UserId);
                    }
                    else {
                        Deleted = 0;
                        userIsDeleted(Deleted,UserId);
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
function userIsDeleted(Deleted, UserId)
{
  
    var deleted = {};
    deleted.isDeleted = Deleted;
    deleted.userid = UserId;
    $.ajax({
        type: "POST",
        url: "users.svc/ModifyUserIsDeleted",
        data: JSON.stringify(deleted),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function () {
            
            searchUserDetails();

        }
    });
}
function editUserDetails(UserId, Username, FirstName, LastName, Email, PhoneNumber1, PhoneNumber2, Active, IsMerchant)
{
    $('#editUSer').modal('show');
    $('#txtUserid').val(UserId);
    $('#txtEditUserName').val(Username);
    $('#txtEditFirstName').val(FirstName);
    $('#txtEditLastName').val(LastName);
    $('#txteditEmail').val(Email);
    $('#txtEditPhone1').val(PhoneNumber1);
    $('#txtEditPhone2').val(PhoneNumber2);
    //if(Active=="true")
    //{
    //    $("#chkActive").prop("checked", true);

    //}
    //else {
    //    $("#chkActive").prop("checked", false);
    //}
    //if(IsMerchant=="true")
    //{
    //    $("#chkMerchant").prop("checked", true);
    //}
    //else {
    //    $("#chkMerchant").prop("checked", false);
    //}
}
function ModifyUserDetails()
{
    var modifyUser = {};
    modifyUser.UserId=$('#txtUserid').val();
    modifyUser.userName= $('#txtEditUserName').val();
    modifyUser.FirstName=$('#txtEditFirstName').val();
    modifyUser.LastName=$('#txtEditLastName').val();
    modifyUser.Email= $('#txteditEmail').val();
    modifyUser.PhoneNumber1=$('#txtEditPhone1').val();
    modifyUser.PhoneNumber2 = $('#txtEditPhone2').val();
    //if( $("#chkMerchant").prop("checked")==true)
    //{
    //    modifyUser.IsMerchant = "true";
    //}
    //else {
    //    modifyUser.IsMerchant = "false";
    //}
    //if ($("#chkActive").prop("checked") == true)
    //{
    //    modifyUser.Active = "true";
    //}
    //else {
    //    modifyUser.Active = "false";
    //}


    $.ajax({
        type: "POST",
        url: "users.svc/ModifyUserName",
        data: JSON.stringify(modifyUser),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function () {
            $('#editUSer').modal('hide');
            searchUserDetails();

        }
    });
}
function editLink(cellValue, options, rowdata, action) {
  
  //  return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;' +
    return  '<img src="images/delete.png" class="delete" width="25px" height="25px" style="margin-top:5px" title="Delete" border=0  />';

}

function userClear()
{
    $('#txtUserName').val('');
    $('#txtEmail').val('');
    $('#ddlRegisterDetails').val(0);
    $('#txtFrUserrDetails').val('');
    $('#txtToUserDetails').val('');

}
function checkUserName()
{
    var username = $('#txtUserName').val().length;
   
   
   
    if((username<3))
    {
        $('#Required').text("Please Enter 3 characters to search");
        $('#txtUserName').val('');
        
    }
}
function checkFirstName()
{
    var frstName = $('#txtFirstName').val().length;
    if ((frstName < 3)) {
        $('#Required').text("Please Enter 3 characters to search");
        $('#txtFirstName').val('');
    }
}
function checkLastName()
{
    var lstname = $('#txtLastName').val().length;
    if ((lstname < 3)) {
        $('#Required').text("Please Enter 3 characters to search");
        $('#txtLastName').val('');

    }
}
function checkEmail()
{
    var email = $('#txtEmail').val().length;
    if ((email < 3)) {
        $('#Required').text("* Please Enter 3 characters to search");
        $('#txtEmail').val('');
    }
    
}
$(function ()
{
    $('input:text').keypress(function ()
    {
        $('#Required').text('');
    });
});

