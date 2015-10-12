/**
 * Created by ahtasham on 03/02/15.
 */
function initialize() {

}

//Edit clicked
$('#edit').click(function(){
    var titleHead = $('#title-head').text();
    var detailsHead = $('#details-head').text();
    var mbody = '<form class="form-horizontal">';
    mbody += '<div class="form-group">';
    mbody += '<div class="col-sm-12">';
    mbody += '<textarea id="editArea" class="form-control" placeholder="Details Here"></textarea>';
    mbody += '</div></div></form>';
    var footer = '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">';
    footer += '<strong>Cancel</strong></button>';
    footer += '<button type="button" class="btn btn-primary btn-sm" id="saveEdit"><strong>Save changes</strong></button>';

    $('#modalTitle').text(titleHead);
    $('#modalBody').html(mbody);
    $('#modalFooter').html(footer);
    $('#editArea').val(detailsHead.trim());
    $('#ActionModal').modal('show');
    $('#ActionModal').on('shown.bs.modal', function () {
        $('#editArea').autosize().show().trigger('autosize.resize');
    })
});

//save changes button clicked
$("#modalFooter").on('click', '#saveEdit', function(){
    var path = window.location.pathname.split('/');
    var data = {
        details: $("#editArea").val()
    };
    $.ajax({
        url: "/" + path[1] + "/" + path[2] + "/" + path[3] + "/update",
        type: "PUT",
        dataType: "json",
        data: data,
        success: function(data, textStatus, jqXhr){
            if(data.msg == 'There was an error') {
                alert('Something went wrong');
                window.location.reload();
            }
        },
        error: function(jqXhr, textStatus, err) {
            if(textStatus) {
                alert('Please login to complete this request');
                window.location.reload();
            }
        }
    });
    $('#details-head').text(data.details.trim());
    $('#ActionModal').modal('hide');
});



$('#delete').click(function(){
    $('#modalTitle').text('Delete Post');
    $('#modalBody').html('<p>Are you sure you want to delete this?</p>');
    var footer = '<button type="button" class="btn btn-success btn-sm" data-dismiss="modal">';
    footer += '<strong>No</strong></button>';
    footer += '<button type="button" class="btn btn-danger btn-sm" id="deletePost">';
    footer += '<strong>Delete post</strong></button>';
    $('#modalFooter').html(footer);

    $('#ActionModal').modal('show');
});

//delete Post button clicked
$("#modalFooter").on('click', '#deletePost', function () {
    var path = window.location.pathname.split('/');
    $.ajax({
        url: "/" + path[1] + "/" + path[2] + "/" + path[3] + "/delete",
        type: "Delete",
        dataType: "json",
        success: function(data, textStatus, jqXhr){
            if(data.msg == 'There was an error') {
                alert('Something went wrong');
                window.location.reload();
            } else {
                window.location = '/';
            }
        },
        error: function(jqXhr, textStatus, err) {
            if(textStatus) {
                alert('Please login to complete this request');
                window.location.reload();
            }
        }
    });
});






