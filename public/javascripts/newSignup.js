var newUserSingup = () => {
    var data = {};
    data.userAccountId = $("#userAccountId").val();
    data.accountPwd = $("#userPassword").val();
    data.mailId = $("#userEmail").val();

    console.log(data);
    $.ajax({
        url: '/new/user/registration',
        method: 'POST',
        dataType: 'JSON',
        data: data,
        success: (response) => {
            console.log(response);
            if (response.status == 'Success') {
                $("#successBlock").html("User got successfly registerd");
            }
        },
        error: (err) => {
            console.log(err);
        }

    })

}