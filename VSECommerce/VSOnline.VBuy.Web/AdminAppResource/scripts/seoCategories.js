$(function () {
    $('#ddlCategoryId').select2();
    loadCategory();
    $('#editSEOCategory').modal('hide');
});
function loadSeoCategory() {

    var input = {};
    input.CategoryId = $('#ddlCategoryId').val().trim();
    if (input.CategoryId == "--Select--") {
        createGrid(null);
    }
    $.ajax({
        type: "POST",
        url: "seoCategories.svc/seoCategoriesList",
        data: JSON.stringify(input),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            createGrid(datas.d);
        }
    });
}


function loadCategory() {
    $('#ddlCategoryId').empty();
    $.ajax({
        type: "POST",
        url: "seoCategories.svc/loadCategory",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            var data = JSON.parse(datas.d);
            $("#ddlCategoryId").append("<option value='--Select--'>" +
'--Select--' + "</option>");
            for (var i = 0; i < data.length; i++) {
                $("#ddlCategoryId").append("<option value=" + data[i].CategoryId + ">" +
        data[i].Name + "</option>");
            }
            $('#ddlCategoryId').select2();
        }
    });

    $('#ddlCategoryId').on('change', function () {

        loadSeoCategory();
    });
}

function createGrid(category) {
    var data = {
        "rows": eval(category)
    };
    jQuery("#seoCategorygrid").jqGrid("GridUnload");
    var grid = jQuery("#seoCategorygrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['CategoryId', 'Name', 'MetaTitle', 'MetaDescription', 'MetaKeywords', 'Action'],
        colModel: [
                    { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                    { name: 'Name', index: 'Name', width: 50, align: "center", sortable: true },
                     { name: 'MetaTitle', index: 'MetaTitle', width: 30, align: "center", sortable: true },
                           { name: 'MetaDescription', index: 'MetaDescription', width: 30, align: "center", sortable: true },
                            { name: 'MetaKeywords', index: 'MetaKeywords', width: 30, align: "center", sortable: true },
                           { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center", sortable: false, formatter: editLink }

        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {


            if (event.target.className == 'edit') {
                var dataFromTheRow = jQuery('#seoCategorygrid').jqGrid('getRowData', rowid);
                var CategoryId = jQuery('#seoCategorygrid').jqGrid('getCell', rowid, 'CategoryId');
                var MetaTitle = jQuery('#seoCategorygrid').jqGrid('getCell', rowid, 'MetaTitle');
                var MetaDescription = jQuery('#seoCategorygrid').jqGrid('getCell', rowid, 'MetaDescription');
                var MetaKeywords = jQuery('#seoCategorygrid').jqGrid('getCell', rowid, 'MetaKeywords');
                
                editSEOCategory(CategoryId,MetaTitle,MetaDescription,MetaKeywords);
            }
        },

        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "SEO Categories",
        pager: '#seoCategoryPager',
        ignoreCase: true
    });

    $('#seoCategorygrid').jqGrid('navGrid', '#seoCategoryPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );

}
function editLink(cellValue, options, rowdata, action) {

    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';
           

}
function editSEOCategory(CategoryId,MetaTitle,MetaDescription,MetaKeywords)
{
    $('#editSEOCategory').modal('show');
    $('#txtEditid').val(CategoryId);
    $('#txtEditTitle').val(MetaTitle);
    $('#txtEditDescription').val(MetaDescription);
    $('#txtEditKeywords').val(MetaKeywords);
   
}
function ModifySEOCategory()
{
    var SEOCategory = {};
    SEOCategory.CategoryId = $('#txtEditid').val().trim();
    SEOCategory.MetaTitle = $('#txtEditTitle').val().trim();
    SEOCategory.MetaDescription = $('#txtEditDescription').val().trim();
    SEOCategory.MetaKeywords = $('#txtEditKeywords').val().trim();

    if (SEOCategory.MetaTitle == "") {
        SEOCategory.MetaTitle = null;
    }

    if (SEOCategory.MetaDescription == "") {
        SEOCategory.MetaDescription = null;
    }


    if (SEOCategory.MetaKeywords == "") {
        SEOCategory.MetaKeywords = null;
    } $.ajax({
        type: "POST",
        url: "seoCategories.svc/ModifySEOCategory",
        data: JSON.stringify(SEOCategory),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            loadSeoCategory();
            $('#editSEOCategory').modal('hide');
        }
    });
}