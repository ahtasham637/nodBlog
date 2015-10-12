/**
 * Created by ahtasham on 25/01/15.
 */
function initialize() {
    GetPosts();
}

function GetPosts() {
    var username = window.location.pathname.split('/');
    var posts = '';
    var totalPosts = 0;
    username = username[1];

    //customFormat('#MMMM# #DD#, #YYYY#')
    $.getJSON('/'+ username +'/allposts', function(data){
        totalPosts = data.length;
        if(totalPosts > 0) {
            $.each(data, function(){
                posts += '<div class="col-xs-8-custom" onclick="location.href=\'/'+ username + '/' + this.Category.CatUrl + '/' + this.Url +'\';">';
                posts += '<div><ul class="media-list"><li class="media">';
                posts += '<div class="media-body blogtitle"><h4 class="media-heading">';
                posts += this.Title + '</h4>';
                posts += '<div class="post-details"><div class="col-xs-4 zero-padding-left">';
                posts += '<span><a href="/'+ username + '/' + this.Category.CatUrl +'">'+ this.Category.CatName +'</a></span></div>';
                posts += '<div class="pull-right"><i class="glyphicon glyphicon-time" aria-hidden="true"></i> ';
                posts +=  new Date(this.Time).customFormat('#MMMM# #DD#, #YYYY#') +'</a></div></div></div></li></ul></div>';
                posts += '<hr class="hr" /><div class="description"><p>';
                posts += this.Details + '</p><div>';
                posts += (this.Photo) ? '<img src="/photo/pub/nb/'+ this.Photo +'?dim=950x534" alt="" class="img-thumbnail">': '';
                posts += '</div></div></div></div>';
            });
        } else {
                posts += '<div class="col-xs-8-custom"><div><ul class="media-list">';
                posts += '<li class="media"><div class="media-body blogtitle">There are no posts yet.';
                posts += '</div></li></ul></div></div></div>';
        }
        $('#posts-list').html(posts);
    });
}