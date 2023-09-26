$(document).ready(function () {

    $("#txtDisplay").keypress(function (event) {

        return isNumber(event, this)

    });
    //$("#txtLiStore").keypress(function (event) {

    //    return isNumber(event, this)

    //});

});

$(document).ready(function () {
    $("drpManuId").show();
});
    function isNumber(evt, element) {

        var charCode = (evt.which) ? evt.which : evt.keyCode

        if (
            (charCode != 45 || $(element).val().indexOf('-') != -1) &&      
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      
            (charCode < 48 || charCode > 57))
            return false;

        return true;
    }

    $(function () {
        $("drpManuId").show();
     $('#ManufacturerDetails').modal('hide');
    getManufacturerDeatils();
    getManuId();
    $("drpManuId").select2();
   

});

function getManuId() {

    $.ajax({
        type: "POST",
        url: "Manufacturer.svc/LoadManuId",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            var data = JSON.parse(datas.d);
            for (var i = 0; i < data.length; i++) {
                $("#drpManuId").append("<option value=" + data[i].ManufacturerId + ">" +
        data[i].Name + "</option>");
            }
     
            $('#drpManuId').select2();

        }
    });

}


function SearchManufacturerProductDetails() {
    var input = {};
    input.Manuid = $('#drpManuId').val().trim();
      $.ajax({
        type: "POST",
        url: "Manufacturer.svc/LoadManuProductIdDetails",
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            createManufacturerGrid(datas.d);
            $('#drpManuId').select2();
            $("drpManuId").show();

        }
    });

}
function NewManufacturerDetails() {

    $('#ManufacturerDetails').modal('show');
    //$("#txtLiStore").prop("checked", false);
    $('#txtManId').val('');
    $('#txtMaName').val('');
    $('#txtDes').val('');
    $('#txtMetKey').val('');
    $('#txtMaDes').val('');
    $('#txtMeTi').val('');
    //$('#txtLiStore').val('');
    $('#txtDisplay').val('');
    $("span").html("");
   
}



function SaveManuDetails() {


    var Id = $('#txtManId').val().trim();
    var Name = $('#txtMaName').val().trim();
   
  
    if (Name == "") {
        $('#ManuRequiredfield').text(" * Enter Name");
     }

    if ((Id == "") && (Name!="")) {
        var input = {}
        input.Name = $('#txtMaName').val().trim();
        input.Desc = $('#txtDes').val().trim();
        input.MeKey = $('#txtMetKey').val().trim();
        input.MeDesc = $('#txtMaDes').val().trim();
        input.MeTi = $('#txtMeTi').val().trim();
        //if ($("#txtLiStore").prop("checked") == true) {
        //    input.LiSt = 1;
        //}
        //else {
        //    input.LiSt = 0;

        //}
        input.Dis = $('#txtDisplay').val().trim();
        $.ajax({
            type: "POST",
            url: "Manufacturer.svc/SaveManufacturertDetails",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {

                $("span").html("");
                $('#txtManId').val('');
                $('#txtMaName').val('');
                $('#txtDes').val('');
                $('#txtMetKey').val('');
                $('#txtMaDes').val('');
                $('#txtMeTi').val('');
                $('#txtLiStore').val('');
                $('#txtDisplay').val('');
                //$("#txtLiStore").prop("checked", false);
                $('#ManufacturerDetails').modal('hide');
                getManufacturerDeatils();
                getManuId();
                $("drpManuId").show();

            }
        });
    }


    if ((Id != "") && (Name != "")) {
        var input = {}
        input.Id = $('#txtManId').val();
        input.Name = $('#txtMaName').val().trim();
        input.Desc = $('#txtDes').val().trim();
        input.MeKey = $('#txtMetKey').val().trim();
        input.MeDesc = $('#txtMaDes').val().trim();
        input.MeTi = $('#txtMeTi').val().trim();
        //if ($("#txtLiStore").prop("checked") == true) {
        //    input.LiSt = 1;
        //}
        //else {
        //    input.LiSt = 0;

        //}
        input.Dis = $('#txtDisplay').val().trim();
        $.ajax({
            type: "POST",
            url: "Manufacturer.svc/UpdateManufacturertDetails",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                $("span").html("");
                $('#txtManId').val('');
                $('#txtMaName').val('');
                $('#txtDes').val('');
                $('#txtMetKey').val('');
                $('#txtMaDes').val('');
                $('#txtMeTi').val('');
                //$('#txtLiStore').val('');
                $('#txtDisplay').val('');
                //$("#txtLiStore").prop("checked", false);
                $('#ManufacturerDetails').modal('hide');
                getManufacturerDeatils();
                getManuId();
                $("drpManuId").show();
              
            }
        });
    }




}


function CloseDetails() {
    $("drpManuId").show();
}


function getManufacturerDeatils() {

    $("drpManuId").show();
    $.ajax({
        type: "POST",
        url: "Manufacturer.svc/LoadManufacturerDetails",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (datas) {

            createManufacturerGrid(datas.d);

      }
    });

}


function editLink(cellValue, options, rowdata, action) {


    return '<img src="images/edit.png" class="edit" width="25px" height="25px" style="margin-top:5px" title="Edit" border=0  /> &nbsp;&nbsp;';

}
function createManufacturerGrid(datas) {
    var data = {
        "rows": eval(datas)
    };
    jQuery("#ManufacturerGrid").jqGrid("GridUnload");
    var grid = jQuery("#ManufacturerGrid");
    grid.jqGrid({
        datastr: data,
        datatype: "jsonstring",
        jsonReader: { repeatitems: false },
        colNames: ['ManufacturerId', 'Name', 'Description', 'MetaKeywords', 'MetaDescription','MetaTitle','LimitedToStores','DisplayOrder', 'Action'],
        colModel: [
                     { name: 'ManufacturerId', index: 'ManufacturerId', width: 30, align: "center",hidden:true },
                    { name: 'Name', index: 'ProductId', width: 50, align: "center" },
                    { name: 'Description', index: 'Description', width: 50, align: "center", sortable: false },
                    { name: 'MetaKeywords', index: 'MetaKeywords', width: 30, align: "center", sortable: false },
                    { name: 'MetaDescription', index: 'MetaDescription', width: 50, align: "center", sortable: false },
                      { name: 'MetaTitle', index: 'MetaTitle', width: 50, align: "center", sortable: false },
                        { name: 'LimitedToStores', index: 'LimitedToStores', width: 30, align: "center", sortable: false },
                           { name: 'DisplayOrder', index: 'DisplayOrder', width: 30, align: "center", sortable: false },
                    { name: 'ManufacturerId', index: 'ManufacturerId', width: 30, align: "center", sortable: false, formatter: editLink }

        ],
        width: "1100",
        onCellSelect: function (rowid, index, contents, event) {

            if (event.target.className == 'edit') {
                var dataFromTheRow = jQuery('#ManufacturerGrid').jqGrid('getRowData', rowid);
                var ManId = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'ManufacturerId');
                var Name = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'Name');
                var Desc = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'Description');
                var Metakey = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'MetaKeywords');
                var Metadesc = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'MetaDescription');
                var Metatit = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'MetaTitle');
                var LimStore = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'LimitedToStores');
                var Display = jQuery('#ManufacturerGrid').jqGrid('getCell', rowid, 'DisplayOrder');
                editManuDetails(ManId, Name, Desc, Metakey, Metadesc, Metatit, LimStore, Display);
            }
        },



        height: 300,
        rowNum: 50,
        rowList: [50, 100, 150],
        caption: "Manufacturer List",
        pager: '#ManufacturerPager',
        ignoreCase: true
    });

    $('#ManufacturerGrid').jqGrid('navGrid', '#ManufacturerPager',
                   {
                       edit: false,
                       add: false,
                       del: false,
                       search: true,
                       searchtext: "Search"


                   }
            );
}



function editManuDetails(ManId, Name, Desc, Metakey, Metadesc, Metatit, LimStore,Display) {


 //   $("#drpManuId").removeClass("select2-hidden-accessible");
    $("drpManuId").show();
    $('#ManufacturerDetails').modal('show');
    $("txtManId").hide();
    $("span").html("");
    $('#txtManId').val(ManId);
    $('#txtMaName').val(Name);
    $('#txtDes').val(Desc);
    $('#txtMetKey').val(Metakey);
    $('#txtMaDes').val(Metadesc);
    $('#txtMeTi').val(Metatit);
    var ChkPer = LimStore;
    //if (ChkPer == 'true') {
    //    $("#txtLiStore").prop("checked", true);
    
     
    //}
    //else if (ChkPer == 'false') {
    //    $("#txtLiStore").prop("checked", false);
          
    //}
    $('#txtDisplay').val(Display);
    
  }