/**
 * Created by ahtasham on 26/01/15.
 */
// Follow button Profile & single post page

$('body').on('click', '.followBtn' , function(e){

    var url = window.location.pathname.split('/');
    var user ='';
    var btnText = '';

    if(!url[1]) {
        //you're on home page
        user = $(this).attr("id");
        $("#"+user + " > span > i").attr("class", "glyphicon glyphicon-minus");
        btnText = $("#"+user + " > strong").text();
    } else {
        //You're on a profile page
        user = url[1];
        btnText = $("#followTx").text();
        $('#follow-icon').attr('class', 'glyphicon glyphicon-minus');
    }

    if( $('#loginModal').length) {
        setTimeout(function(){
            $('#loginModal').modal('show');
        }, 500);
    } else {
        if(!url[1]) {
            $("#"+user + " > span > i").attr('class', (btnText === 'Follow') ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-star-empty');
            $("#"+user + " > strong").text((btnText === 'Follow') ? 'Following' : 'Follow');
        } else {
            $('#follow-icon').attr('class', (btnText === 'Follow') ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-star-empty');
            $("#followTx").text((btnText === 'Follow') ? 'Following' : 'Follow');
        }

        $.ajax({
            url: "/" + user + "/follow",
            type: "PUT",
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXhr) {
            },
            error: function(jqXhr, textStatus, err) {
                console.log(err);
            }
        });
    }
});

