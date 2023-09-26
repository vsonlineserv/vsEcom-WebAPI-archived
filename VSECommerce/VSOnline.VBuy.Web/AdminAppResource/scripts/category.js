$(function ()
{
    $('#categoryGrid').hide();
    $('#editCategoryName').modal('hide');
});
function searchCategory()
{
    if (($('#txtCategoryId').val().length >= 3) || ($('#txtCategoryName').val().length >= 3))
    {
        var category = {};
        category.categoryId = $('#txtCategoryId').val();
        category.categoryName = $('#txtCategoryName').val();
        if (category.categoryName == "") {
            category.categoryName = null;
        }
        if (category.categoryId == "") {
            category.categoryId = 0;
        }
        $.ajax({
            type: "POST",
            url: "Category.svc/searchCategory",
            data: JSON.stringify(category),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#categoryGrid').show();
                createCategoryGrid(data.d);


            }
        });

    }
    else {
        alert("Please Enter minimum 3 characters to search");
    }
   
}

function  createCategoryGrid(data)
{
    
        var data = {
            "rows": eval(data)
        };
        jQuery("#categoryGrids").jqGrid("GridUnload");
        var grid = jQuery("#categoryGrids");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['CategoryId', 'Name', 'PictureName', 'PictureNameMobile', 'CategoryGroupTag', 'GroupDisplayOrder', 'DisplayOrder', 'Published', 'Action'],
            colModel: [
                        { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                        { name: 'Name', index: 'Name', width: 80, align: "center", sortable: true },
                         { name: 'PictureName', index: 'PictureName', width: 50, align: "center", sortable: true },
                          { name: 'PictureNameMobile', index: 'PictureNameMobile', width: 50, align: "center", sortable: true },
                           { name: 'CategoryGroupTag', index: 'CategoryGroupTag', width: 50, align: "center", sortable: true },
                            { name: 'GroupDisplayOrder', index: 'GroupDisplayOrder', width: 50, align: "center", sortable: true },
                             { name: 'DisplayOrder', index: 'DisplayOrder', width: 50, align: "center", sortable: true },
                              { name: 'Published', index: 'Published', width: 50, align: "center", sortable: true },
                        { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center", sortable: false, formatter: editLink }

            ],
            width: "1100",
            onCellSelect: function (rowid, index, contents, event) {
                

                if (event.target.className == 'edit') {
                    var dataFromTheRow = jQuery('#categoryGrids').jqGrid('getRowData', rowid);
                    var categoryID = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'CategoryId');
                    var Name = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'Name');
                    var PictureName = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'PictureName');
                    var PictureNameMobile = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'PictureNameMobile');
                    var CategoryGroupTag = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'CategoryGroupTag');
                    var GroupDisplayOrder = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'GroupDisplayOrder');
                    var DisplayOrder = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'DisplayOrder');
                    var Published = jQuery('#categoryGrids').jqGrid('getCell', rowid, 'Published');
                    

                    editCategory(categoryID, Name,PictureName,PictureNameMobile,CategoryGroupTag,GroupDisplayOrder,DisplayOrder,Published);
                }


               

            },



            height: 300,
            rowNum: 50,
            rowList: [50, 100, 150],
            caption: "Category Details",
            pager: '#Categorypager',
            ignoreCase: true
        });

        $('#categoryGrids').jqGrid('navGrid', '#Categorypager',
                       {
                           edit: false,
                           add: false,
                           del: false,
                           search: true,
                           searchtext: "Search"


                       }
                );

 
}
var pic1, pic2;
function editCategory(categoryID, Name, PictureName, PictureNameMobile, CategoryGroupTag, GroupDisplayOrder, DisplayOrder, Published)
{
 
    pic1 = PictureName.trim();
    pic2 = PictureNameMobile.trim();
    $('#editCategoryName').modal('show');
    $('#txtEditCategoryid').val(categoryID);
    $('#txtEditCategoryname').val(Name);
    $('#pictureUpload').val(PictureName);
    $('#pictureMobileImageUpload').val(PictureNameMobile);
    $('#txtGrptag').val(CategoryGroupTag);
    $('#txtGrpDisplay').val(GroupDisplayOrder);
    $('#txtDisplayOrder').val(DisplayOrder);
    if(Published=="true")
    {
        $('#chkPublished').prop('checked',true);
    }
    else {
        $('#chkPublished').prop('checked',false);
    }
  
}
function ModifyCategory()
{
   
    var category = {};
    category.id = $('#txtEditCategoryid').val().trim();
    category.categoryName = $('#txtEditCategoryname').val().trim();
    category.PictureName = $('#pictureUpload').val().trim();
    category.PictureName = category.PictureName.replace(/^.*[\\\/]/, '');
    if (category.categoryName == "")
    {
        $('#CategoryRequiredfield').text(" *Enter Category Name");
    }
    else
    {

        if (category.PictureName == "") {

            category.PictureName = null;
        }
       else{
            category.PictureName = "Category" + "\\" + category.PictureName;
        }

        category.PictureNameMobile = $('#pictureMobileImageUpload').val().trim();
        category.PictureNameMobile = category.PictureNameMobile.replace(/^.*[\\\/]/, '');
        if (category.PictureNameMobile == "" ) {
            category.PictureNameMobile = null;
        }
      else{
           category.PictureNameMobile = "PictureMobile" + "\\" + category.PictureNameMobile;
       }
        category.CategoryGroupTag = $('#txtGrptag').val().trim();
        category.GroupDisplayOrder = $('#txtGrpDisplay').val().trim();
        category.DisplayOrder = $('#txtDisplayOrder').val().trim();
        if (category.CategoryGroupTag == "") {
            category.CategoryGroupTag = null;
        }
        if (category.GroupDisplayOrder == "") {
            category.GroupDisplayOrder = 0;
        }
        if (category.DisplayOrder == "") {
            category.DisplayOrder = 0;
        }

        if ($('#chkPublished').prop('checked') == true) {
            category.Published = 1;
        }
        else {
            category.Published = 0;
        }

        $.ajax({
            type: "POST",
            url: "Category.svc/modifyCategory",
            data: JSON.stringify(category),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                searchCategory();
                var PictureName = $("#pictureUpload").get(0);
                var PictureNameMobile = $("#pictureMobileImageUpload").get(0);
                imgUpload(PictureName);
                MobileimgUpload(PictureNameMobile);
                $("span").html("");
                $('#editCategoryName').modal('hide');
            }
        });
    }
}
function editLink(cellValue, options, rowdata, action) {


    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

}
function checkCategoyId()
{
    if ($('#txtCategoryId').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtCategoryId').val('');
    }
}
function checkCategoryName()
{
    if ($('#txtCategoryName').val().length < 3) {
        $('#required').text(" * Please Enter 3 characters to search");
        $('#txtCategoryName').val('');
    }

}
function categoryrClear()
{
    $('#txtCategoryName').val('');
    $('#txtCategoryId').val('');
}
function imgUpload(PictureName)
{
    //var fileUpload = $("#pictureUpload").get(0);
    var files = PictureName.files;

    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append(files[i].name, files[i]);
    }
    $.ajax({
        url: "CategoryPicture.ashx",
        type:"POST",
        data:data,
        contentType : false,
        processData : false,
        success:function()
        {

        }
    });

  
 
    

}


function MobileimgUpload(PictureNameMobile)
{
    //var fileUpload = $("#pictureUpload").get(0);
    var files = PictureNameMobile.files;

    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append(files[i].name, files[i]);
    }
    $.ajax({
        url: "Mobilepicture.ashx",
        type:"POST",
        data:data,
        contentType : false,
        processData : false,
        success:function()
        {

        }
    });

  
 
    

}
function CheckCategoryId(objEvt) {
    var charCode = (objEvt.which) ? objEvt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        document.getElementById("txtCategoryId").style.backgroundColor = "#FFB2B2";
        return false;
    }
    else {
        document.getElementById("txtCategoryId").style.backgroundColor = "#B2D8B2";
        return true;
    }
}
function CheckCatDisplay(objEvt) {
    var charCode = (objEvt.which) ? objEvt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        document.getElementById("txtDisplayOrder").style.backgroundColor = "#FFB2B2";
        return false;
    }
    else {
        document.getElementById("txtDisplayOrder").style.backgroundColor = "#B2D8B2";
        return true;
    }
}
function CheckGrpDisplay(objEvt) {
    var charCode = (objEvt.which) ? objEvt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        document.getElementById("txtGrpDisplay").style.backgroundColor = "#FFB2B2";
        return false;
    }
    else {
        document.getElementById("txtGrpDisplay").style.backgroundColor = "#B2D8B2";
        return true;
    }
}



