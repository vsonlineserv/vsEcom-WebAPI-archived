$(function () {
   
    LoadCategory();
    LoadAssCategory();
    $('#SellerCategory').modal('hide');
    $('#SellerCategoryid').hide();
    $('#txtEditid').hide();
    $('#ListId').hide();
   
   
});

function ClearCategory() {
    $('#txtBranchId').val('');
    $('#txtBranchName').val('')
}

function getCategory() {
    var input = {};
    input.BranchId = $('#txtBranchId').val().trim();
    input.BranchName = $('#txtBranchName').val().trim();
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadSellerCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            createGrid(data.d);

        }
    });
}
function transfer(transfer) {
    $('#ddlselectCategory').append(transfer);
}
function LoadCategory() {
    $("#ParentCat").empty();
    $('#AsmyselectCate').empty();
    $('#Asmy-select').empty();
    $('#selected').empty();
    $('#myselect').empty();
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadCategory",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);
    
    
    for (var i = 0; i < data.length; i++) {
        $("#ParentCat").append("<option value=" + data[i].CategoryId + ">" +
data[i].Name + "</option>");
  }
               }
    });

   
  
}

function LoadAssCategory() {
    $("#ReParentCat").empty();
    $('#myselect').empty();
    $('#ReAppendSelect').empty();
   
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadCategory",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);


            for (var i = 0; i < data.length; i++) {
                $("#ReParentCat").append("<option value=" + data[i].CategoryId + ">" +
                data[i].Name + "</option>");
            }
        }
    });
  
}

function AppendSelect() {
 
   
    var input = {};
    input.selected = $('#myselect option:selected').val();
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadSelectedCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            $("#myselect option[value=" + input.selected + "]").remove();
            var data = JSON.parse(data.d);

            for (var i = 0; i < data.length; i++) {
                $("#selected").append("<option value=" + data[i].CategoryId + ">" +
                data[i].Name + "</option>");
            }

        }
    });

  

}

function deleteAssCategory() {

 
    var input = {};
    input.selected = $('#Asmy-select option:selected').val();
       $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadSelectedCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            $("#Asmy-select option[value=" + input.selected + "]").remove();
            var data = JSON.parse(data.d);

            for (var i = 0; i < data.length; i++) {
                $("#AsmyselectCate").append("<option value=" + data[i].CategoryId + ">" +
                data[i].Name + "</option>");
            }

        }
    });
   
}

function subcat() {
    $("#myselect").empty();
    $('#selected').empty();
  
    var input = {};
    input.CateId = $('#ParentCat option:selected').val();
    input.seller = $('#txtEditSeller').val();
       $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadSubCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);

            for (var i = 0; i < data.length; i++) {
            
                    $("#myselect").append("<option value=" + data[i].CategoryId + ">" +
                    data[i].Name + "</option>");
                }
           
        }
    });
   
}

function subAssigncat() {
    $("#Asmy-select").empty();
    $("#AsmyselectCate").empty();
    var input = {};
    input.CateId = $('#ReParentCat option:selected').val();
    input.seller = $('#txtAsEditSeller').val();
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadsubAssigncat",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var data = JSON.parse(data.d);

            for (var i = 0; i < data.length; i++) {
                $("#Asmy-select").append("<option value=" + data[i].Id + ">" +
                data[i].Name + "</option>");
            }



        }
    });
   

}






function ReAppendSelect() {
   
  
    var input = {};
    input.selected = $('#selected option:selected').val();
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadAppSelectedCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            $("#selected option[value=" + input.selected + "]").remove();
                   var data = JSON.parse(data.d);

            for (var i = 0; i < data.length; i++) {


                $("#myselect").append("<option value=" + data[i].CategoryId + ">" +
                data[i].Name + "</option>");
            }
            

        }
    });

   
}

function restorCate() {

  
    var input = {};
    input.selected = $('#AsmyselectCate option:selected').val();
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadAppSelectedCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            $("#AsmyselectCate option[value=" + input.selected + "]").remove();
            //  $("#selected option:selected").remove();
            var data = JSON.parse(data.d);

            for (var i = 0; i < data.length; i++) {


                $("#Asmy-select").append("<option value=" + data[i].CategoryId + ">" +
                data[i].Name + "</option>");
            }
           

        }
    });
   
}
function ModifySellerCategories() {

  
    var input = {};
    var SelectedId = "";
    input.seller = $('#txtEditSeller').val();

   
    $('#selected option').each(function (
    )
    {
     
        SelectedId = SelectedId + $(this).val() + ",";
      
    
    });
   
          

    input.category = SelectedId;
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/AssignCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#SellerCategory').modal('hide');

        }
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
    LoadAssCategory();
    $('#SellerAssignCategory').modal('show');
    $('#Asmy-select').empty();
    $('#AsmyselectCate').empty();
    $('#txtAsEditSeller').val(Id);
    $('#txtAsBranch').val(BranchName);
    var input = {};
    input.Id = Id;
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/LoadAssignSellerCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            createAssignGrid(data.d);

        }
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








function ModifySellerAssignCategories()
{

     $("#AsmyselectCate option[value=" + '--Select--' + "]").remove();
    var input = {};
    var SelectedId = "";
    input.seller = $('#txtAsEditSeller').val();


    $('#AsmyselectCate option').each(function (
    ) {

        SelectedId = SelectedId + $(this).val() + ",";


    });



    input.Branch = SelectedId;
    $.ajax({
        type: "POST",
        url: "sellerCategory.svc/UpdateAssignCategory",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#SellerAssignCategory').modal('hide');

        }
    });
      
    $('#AsmyselectCate').empty();
}



