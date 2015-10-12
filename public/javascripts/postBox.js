/**
 * Created by ahtasham on 23/01/15.
 */


$("#postTitle").on("keyup", function(e){
    var code = e.keyCode || e.which;
    if (code  == 13) {
        e.preventDefault();
        return false;
    }
});

//postBox submit button click
$('#submitPost').click(createPost);

function createPost(e) {
    e.preventDefault();
    var title = $('#postTitle').val();
    var details = $('#postDetails').val();
    var category = $('#postCategory').val();

    if(!title) {
        alert('Title of the post is missing');
    } else if(!details)
    {
        alert('Please write more details about the post.');
    } else if(!category) {
        alert('Something went wrong. Please try again later');
        window.location.reload();
    } else {
        $('#submitPost').attr('disabled', true);
        var jForm = new FormData();
        jForm.append('Title', title);
        jForm.append('Details', details);
        jForm.append('Category', category);
        jForm.append('Photo', $('#postPhoto').get(0).files[0]);

        $.ajax({
            url: "/createPost",
            type: "POST",
            data: jForm,
            mimeType: "multipart/form-data",
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXhr) {
                console.log(data);
                if(data.msg === 'Something went wrong') {
                    alert('Something went wrong. Please try again later');
                    //window.location.reload();
                } else {
                    refresh();
                }
            },
            error: function(jqXhr, textStatus, err) {
                alert('NodBlog is under maintanance. Please come back after few minutes');
            }
        });
    }
}

function refresh() {
    $('#submitPost').attr('disabled', false);
    $('#postDetails').attr('style','overflow: hidden; word-wrap: break-word; height: 52px;');
    $('#dissmissImage').click();
    $('#postTitle').val('');
    $('#postDetails').val('');
    GetPosts();

}

//Image modal on index
function showImageModal(){
    $('#imageModal').modal('show');
}






