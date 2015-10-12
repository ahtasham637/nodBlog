/**
 * Created by ahtasham on 05/01/15.
 */

function initialize () {
}

$("#frmCategory").on("keyup", function(e){
    var code = e.keyCode || e.which;
    if (code  == 13) {
        e.preventDefault();
        $( "#btnCreateCat" ).click();
        return false;
    }
});

$('#frmCreateCat').on("keyup keypress keydown", function(e) {
    var code = e.keyCode || e.which;
    if (code  == 13) {
        e.preventDefault();
        return false;
    }
});

$('#frmCreateCat').on("click", "#btnCreateCat", function(e) {
    e.preventDefault();
    var cat = $('#frmCategory').val();

    if(cat === '') {
        alert('Category name required');
    } else {
        var addCat = {
            'frmCategory': cat
        };
        $.ajax({
            type: 'post',
            url: '/category/create',
            dataType: 'json',
            data: addCat,
            success: function(data, textStatus,jQxhr) {
                if (data.msg === 'Category already exist') {
                    alert('The Category you enetred already exists');
                } else
                {
                    $('#frmCategory').val('');
                    displayCategory();
                }
            },
            error: function(jqXhr, textStatus, err) {
                if(err.message === 'Unexpected token <') {
                    alert('Please login to complete this request');
                    window.location = '/401';
                }
                console.log(err);
            }
        });
    }
});

//$( "#btnCreateCat" ).click(createCategory);
$("#catModalBtnDel").click(deleteCategory);

function createCategory(event) {
    //event.preventDefault();
}

function deleteCategory(event) {
    event.preventDefault();

    var catDelId = $("#catDelId").val();

    if(catDelId === '') {
        alert('Something went wrong. Please try again');
    } else {
        var rmCat = {
            'catDelId': catDelId
        };

        $.ajax({
            type: 'post',
            url: '/category/delete',
            dataType: 'json',
            data: rmCat,
            success: function(data, textStatus,jQxhr) {
                $('#frmCategory').val('');
                displayCategory();
                $('#catModal').modal('hide');
            },
            error: function(jqXhr, textStatus, err) {
                if(err.message === 'Unexpected token <') {
                    alert('Please login to complete this request');
                    window.location = '/401';
                }
                console.log(err); //
            }
        });
    }
}

function displayCategory() {
    var cats = '';
    var sideCat = '';
    var totalCats = 0;
    $.getJSON('/category/display', function(data) {
        var username = data.username;
        totalCats = data.categories.length;
        if(totalCats > 0){
            $.each(data.categories, function() {
                cats += '<span class="label label-success frm-category" style="margin-right: 6px">';
                cats += this.CatName;
                cats += '<span class="glyphicon glyphicon-remove custom-glyph" aria-hidden="true" onclick="rmCat(this)"';
                cats += 'id= "'+ this['@rid'] +'%'+ this.CatName +'"></span>';
                cats += '</span>';
            });

            //sidebar
            $.each(data.categories, function(){
                sideCat += '<li><a href="'+username+'/'+this.CatUrl+'">';
                sideCat += this.CatName +'</a></li>'
            });

            $('#sideCategories').html(sideCat);
            $('#displayCat').html(cats);
            $('#totalCats').html(totalCats);
        } else {
            $('#sideCategories').html('No Categories');
            $('#displayCat').html(cats);
            $('#totalCats').html(totalCats);
        }
    });
}


function rmCat(object) {
    var objId = object.id;
    objId = objId.split('%');

    //Modal
    $('#catModalTitle').html('Delete "'+ objId[1] +'" category');
    $('#catModalDetails').html('<strong>Warning:</strong> Deleting a category will also delete all the <strong>posts</strong> related to it.');
    $('#catDelId').val(objId[0]);

    //show Modal
    $('#catModal').modal('show');
}


