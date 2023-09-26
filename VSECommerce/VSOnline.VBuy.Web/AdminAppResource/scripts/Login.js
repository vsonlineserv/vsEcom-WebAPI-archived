$("#login-button").click(function (event) {
    event.preventDefault();
    var input = {};
    var ChkUser = "";
    var ChPswd = "";
    var User = $('#txtUserName').val();
    var Pswd = $('#txtPswd').val();
    var Code = $('#txtCode').val();
    if (User == "") {
     
        alert('Enter UserName');
        return;
    }
    else if (Pswd == "") {
        alert('Enter Password');
        return;
    }
    else if (Code == "") {
        alert("Enter Code");
        return;
    }
   
    else {



        input.UserName = $('#txtUserName').val().trim();
        input.Pswd = $('#txtPswd').val().trim();
        input.Code = $('#txtCode').val().trim();
        $.ajax({
            type: "POST",
            url: "Login.svc/ChkCode",
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas)
            {
                var data = JSON.parse(datas.d);
              
                var chklength = data.length;
            
                if (chklength) {
                   $('form').fadeOut(500);
                  $('.wrapper').addClass('form-success');
                  window.location.replace("product.aspx");
                }
                else {
                 alert('Check UserName Or Password or SecurityCode');
                 $('#txtUserName').val('');
                 $('#txtPswd').val('');
                 $('#txtCode').val('');
                }
        
            }
           

            
        });

    }

   
    

});


