$(document).ready(function ()
{
    regCustomers();
    regRetailers();
});
 

function regCustomers()
{
    $.ajax({
        type: "POST",
        url: "statistics.svc/LoadCustomer",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {        
           // var json_obj = JSON.parse(datas.d);        
           // var customer = [{ "days": "7 days", "users": json_obj[0]["users"] }, { "days": "15 days", "users": json_obj[0]["users1"] }, { "days": "30 days", "users": json_obj[0]["users2"] }];
            createCustomerGrid(datas.d);
        }
    });
}
function regRetailers()
{
    

    $.ajax({
        type: "POST",
        url: "statistics.svc/LoadRetailer",
        data: "",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (datas) {
          
           // var json_obj = JSON.parse(datas.d);
          //  var customer = [{ "days": "Today", "retailer": json_obj[0]["retailer"] }, { "days": "7 days", "retailer": json_obj[0]["retailer1"] }, { "days": "15 days", "retailer": json_obj[0]["retailer2"] }, { "days": "30 days", "retailer": json_obj[0]["retailer3"] }];
            createRetailerGrid(datas.d);
        }
    });
}
function createCustomerGrid(datas)
{
    
    var data = {
        "rows": eval(datas)
    };
    jQuery("#regCustomersGrid").jqGrid("GridUnload");
    var grid = jQuery("#regCustomersGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['days', 'Customers'],
        colModel: [
                    
                    { name: 'days', index: 'days', width: 30, align: "center", sortable: true },
                    { name: 'users', index: 'users', width: 30, align: "center", sortable: true },
                  

        ],
        width: "400",
        caption:"Number of Registered customers",
        height: 200,
        ignoreCase: true
    });

    

}
function createRetailerGrid(datas)
{
    var data = {
        "rows": eval(datas)
    };
    jQuery("#regRetailerGrid").jqGrid("GridUnload");
    var grid = jQuery("#regRetailerGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['days', 'Retailers'],
        colModel: [

                    { name: 'days', index: 'days', width: 30, align: "center", sortable: true },
                    { name: 'retailer', index: 'retailer', width: 30, align: "center", sortable: true },


        ],
        width: "400",
        caption: "Number of Registered Retailers",
        height: 200,
        ignoreCase: true
    });

}