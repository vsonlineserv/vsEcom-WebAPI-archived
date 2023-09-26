function  generatePassword()
{
    
    var userid = $('#txtUserid').val();
    var name = $('#txtEditUserName').val();
    var email= $('#txteditEmail').val();
    var user = {};
    user.userids = userid;
    user.email = email;
    user.username =name;
    
    var generatePasswords = confirm("Hi" +"     "+ name + "\n"+"Do you want to generate your Password ?");
    if (generatePasswords == true)
    {
        $.ajax({
            type: "POST",
            url: "addUser.svc/generatePassword",
            data: JSON.stringify(user),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (datas) {
                alert(datas.d);
            }
        });
    }
   
}