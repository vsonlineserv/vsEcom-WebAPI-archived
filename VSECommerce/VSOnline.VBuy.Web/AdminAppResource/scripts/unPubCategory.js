$(function () {
    loadCategory();
    loadPublishedCategory();
});
function loadCategory() {
    $.ajax({
        type: "POST",
        url: "unPublishedCategories.svc/unPublishedCategory",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            createGrid(datas.d);
        }
    });
}

function loadPublishedCategory() {
    $.ajax({
        type: "POST",
        url: "unPublishedCategories.svc/loadPublishedCategory",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            createPublishedCategoryGrid(datas.d);
        }
    });
}
function createPublishedCategoryGrid(category) {
    var data = {
        "rows": eval(category)
    };
    jQuery("#PublishCategorygrid").jqGrid("GridUnload");
    var grid = jQuery("#PublishCategorygrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['CategoryId', 'Name', 'Published'],
        colModel: [
                    { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                    { name: 'Name', index: 'Name', width: 100, align: "center", sortable: true },
                     { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true },
                        
        ],
        width: "1100",


        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Today Published Categories List",
        pager: '#PublishCategoryPager',
        multiselect: true,
        ignoreCase: true
    });

    $('#PublishCategorygrid').jqGrid('navGrid', '#PublishCategoryPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );

}



function createGrid(category) {
    var data = {
        "rows": eval(category)
    };
    jQuery("#unPublishCatgrid").jqGrid("GridUnload");
    var grid = jQuery("#unPublishCatgrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['CategoryId', 'Name', 'Published', 'IsDeleted'],
        colModel: [
                    { name: 'CategoryId', index: 'CategoryId', width: 30, align: "center" },
                    { name: 'Name', index: 'Name', width: 100, align: "center", sortable: true },
                     { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true },
                           { name: 'IsDeleted', index: 'IsDeleted', width: 30, align: "center", sortable: true }

        ],
        width: "1100",


        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "UnPublished Categories",
        pager: '#unPublishCatPager',
        multiselect: true,
        ignoreCase: true
    });

    $('#unPublishCatgrid').jqGrid('navGrid', '#unPublishCatPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );

}
function publishCategory() {

    var myrow = ids = "";
    var id = jQuery("#unPublishCatgrid").jqGrid('getGridParam', 'selarrrow');
    if (id.length) {
        for (var i = 0; i < id.length; i++) {
            myrow = jQuery("#unPublishCatgrid").jqGrid('getCell', id[i], 'CategoryId');
            ids = ids + myrow + ",";
        }
    }
    if (ids != "") {
        var Publish = {};
        Publish.ids = ids;
        $.ajax({
            type: "POST",
            url: "unPublishedCategories.svc/UpdatePublishedCategories",
            data: JSON.stringify(Publish),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                alert("Selected Category Is Published Successfully");
                loadCategory();
                loadPublishedCategory();
            }
        });

    }
    else {
        alert("Please select any item to Publish");
    }


}