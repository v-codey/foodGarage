var filePath = '';

var registerRestaurentDetails = () => {
    var restaurentData = {};
    restaurentData.name = $("#name").val();
    restaurentData.themeLine = $("#themeLine").val();
    restaurentData.rating = $("#rating").val();
    restaurentData.code = $("#code").val();
    restaurentData.restaurentThemeImage = filePath;

    console.log(restaurentData)
    $.ajax({
        url: '/add/newRestaurent',
        method: 'GET',
        dataType: 'JSON',
        data: restaurentData,
        success: (response) => {
            console.log(response);
        }
    })
}


var uploadRestaurentImage = () => {
    console.log($('input[name=restaurentPic]'));
    var uploadingFile = $('input[name=restaurentPic]')[0].files[0];
    var formData = new FormData(); 
    formData.append("restaurentPic", uploadingFile);


    $.ajax({
        url: '/upload/image',
        method: 'POST',
        data: formData,
        encytype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: 'JSON',
        success: (response) => {
            console.log(response);
            console.log("file uploaded successfly");
            filePath = response.filepath;
        }
    });
}