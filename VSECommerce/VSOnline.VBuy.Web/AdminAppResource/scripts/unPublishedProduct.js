$(function ()
{
    loadProduct();
    loadPublishedProduct();
});
function loadProduct()
{
    $.ajax({
        type: "POST",
        url: "unPublished.svc/unPublishedProduct",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            createGrid(datas.d);
        }
    });
}


function loadPublishedProduct() {
    $.ajax({
        type: "POST",
        url: "unPublished.svc/PublishedProduct",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
            createPublishedGrid(datas.d);
        }
    });
}

    
function createGrid(product) {
    var data = {
        "rows": eval(product)
    };
    jQuery("#unPublishgrid").jqGrid("GridUnload");
    var grid = jQuery("#unPublishgrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['ProductId', 'Name', 'ShortDescription', 'FullDescription', 'Published', 'IsDeleted'],
        colModel: [
                    { name: 'ProductId', index: 'ProductId', width: 50, align: "center" },
                    { name: 'Name', index: 'Name', width: 50, align: "center", sortable:true },
                    { name: 'ShortDescription', index: 'ShortDescription', width: 50, align: "center", sortable: true },
                    { name: 'FullDescription', index: 'FullDescription', width: 150, align: "center", sortable: true },
                     { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true },
                           { name: 'IsDeleted', index: 'IsDeleted', width: 30, align: "center", sortable: true }

        ],
        width: "1100",
      

        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "UnPublished Product",
        pager: '#unPublishPager',
        multiselect: true,
        ignoreCase: true
    });

    $('#unPublishgrid').jqGrid('navGrid', '#unPublishPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,          
                       searchtext: "Search"


                   }
            );

}


function createPublishedGrid(product) {
    var data = {
        "rows": eval(product)
    };
    jQuery("#PublishCatgrid").jqGrid("GridUnload");
    var grid = jQuery("#PublishCatgrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['ProductId', 'Name', 'Published'],
        colModel: [
                    { name: 'ProductId', index: 'ProductId', width: 50, align: "center" },
                    { name: 'Name', index: 'Name', width: 250, align: "center", sortable: true },
                     { name: 'Published', index: 'Published', width: 30, align: "center", sortable: true }
        ],
        width: "1100",


        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Today Published Product List",
        pager: '#PublishCatPager',
        ignoreCase: true
    });

    $('#PublishCatgrid').jqGrid('navGrid', '#PublishCatPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );

}

function publishProduct()
{
    
    var myrow= ids="";
    var id = jQuery("#unPublishgrid").jqGrid('getGridParam', 'selarrrow');
    if (id.length) {
        for (var i = 0; i < id.length; i++)  
        {
            myrow = jQuery("#unPublishgrid").jqGrid('getCell', id[i], 'ProductId');
            ids = ids + myrow+",";
        }
    }
    if (ids != "")
    {
        var Publish = {};
        Publish.ids = ids;
        $.ajax({
            type: "POST",
            url: "unPublished.svc/UpdatePublishedProduct",
            data: JSON.stringify(Publish),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                alert("Selected Product Is Published Successfully");
                loadProduct();
                loadPublishedProduct();
            }
        });

    }
    else {
        alert("Please select any item to Publish");
    }
  

}