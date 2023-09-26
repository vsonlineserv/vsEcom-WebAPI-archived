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
    StatusRegis
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


function CheckReNameLength() {
  
        if ($('#txtName').val().trim().length < 3) {
            $('#required').text(" * Name must be at least 4 characters long");
          
    }

        if ($('#txtName').val().trim().length > 3) {
            $("span").html("");

         }
}


function CheckBussName() {

    if ($('#txtBussName').val().trim().length ==0) {
        $('#required').text(" *Enter Business Name");
       // $('#txtRePhnNum').val('');
    }
    if ($('#txtBussName').val().trim().length > 0) {
        $("span").html("");
      
    }

}


function ChkAddress() {
    if ($('#txtRegAdd1').val().trim().length == 0) {
        $('#required').text(" *Enter Address Name");
        // $('#txtRePhnNum').val('');
    }
    if ($('#txtRegAdd1').val().trim().length > 0) {
        $("span").html("");

    }

}


function ChkCity() {

    if ($('#txtCity').val().trim().length == 0) {
        $('#required').text(" *Enter City");
        // $('#txtRePhnNum').val('');
    }
    if ($('#txtCity').val().trim().length > 0) {
        $("span").html("");

    }
}


function ChkPincode() {
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
function ValidatePhNum() {
    

    if ($('#txtRePhnNum').val().trim().length < 10) {
        $('#required').text(" *Enter Valid Phone Number");
        // $('#txtRePhnNum').val('');
    }
    if ($('#txtRePhnNum').val().trim().length > 10) {
        $("span").html("");

    }

}

function RetailerClear() {
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



function RetailerRegister() {
   
     var Requ = $('#required').text().trim();

    var email=$('#txtReEmail').val();
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
        
        $.ajax({
            type: "POST",
            url: "RegisterRetailer.svc/RegisRetailer",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var data = JSON.parse(data.d);
                var chklength = data.length;
                 if (data == 1)
                {
                    $('#StatusRegis').modal('hide');
                    $('#required').text(" * Registeration Is  Sucess");
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
                //else if (chklength == 0) {
                //    $('#required').text(" * MailId Already Exists Registeration Is Not Sucess");
                //}
                else {
                    $('#StatusRegis').modal('hide');
                    $('#required').text(" *check MailId,Registeration Is Not Sucess");
                }
                
            }
        });

    }

}

function ValidateEmail() {
    var booking_email = $('#txtReEmail').val().trim();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(booking_email))
    {
        $("span").html("");
    } 
    else{
            $('#required').text(" * Plz Enter Valid EmailId");
          
        }
   
}



$('.txtCity').bind('keyup blur', function () {
    var node = $(this);
    node.val(node.val().replace(/[^a-z\s]/gi, ''));
}
);