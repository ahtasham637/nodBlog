/**
 * Created by ahtasham on 05/02/15.
 */
function initialize() {
    GetPosts();
    GetSuggestions();
}

function GetPosts() {
    var post = '';
    var totalPosts = 0;

    $.getJSON('/homeposts', function(data){
        totalPosts = data.length;
        if(totalPosts > 0) {
            $.each(data, function(){
                var profilePic = this.ProfilePhoto[0] ? this.ProfilePhoto[0] : '5fce02648a742badb5905601b22098c9.png';
                post += '<div class="col-xs-8-custom" ';
                post += 'onclick="location.href=\'/'+ this.Username[0] + '/' + this.CatUrl + '/' + this.Url +'\';">';
                post += '<div><ul class="media-list"><li class="media"><a class="media-left" href="#">';
                post += '<img src="/photo/pub/nb/'+ profilePic +'?dim=60" alt="pencil" class="img-circle">';
                post += '</a><div class="media-body m-body">';
                post += '<h4 class="media-heading">'+ this.Title +'</h4>';
                post += '<div class="post-details"><div class="col-xs-4 zero-padding-left">';
                post += '<span>By <a href="/'+ this.Username[0] +'">'+ this.Name[0] +'</a></span></div>';
                post += '<div class="pull-right">';
                post += '<i class="glyphicon glyphicon-time" aria-hidden="true"></i> ';
                post += new Date(this.Time).customFormat('#MMMM# #DD#, #YYYY#') + '</div></div></div>';
                post += '</li></ul></div><hr class="hr" />';
                post += '<div class="description"><p>'+ this.Details +'</p><div>';
                post += (this.Photo) ? '<img src="/photo/pub/nb/'+ this.Photo +'?dim=950x534" alt="" class="img-thumbnail">': '';
                post += '</div></div></div>';
            })
        } else {
            post += '<div class="col-xs-8-custom"><div><ul class="media-list">';
            post += '<li class="media"><div class="media-body blogtitle">There are no posts yet.';
            post += '</div></li></ul></div></div>';
        }
        $('#posts-list').html(post);
    });
}

function GetSuggestions() {
    var people ='';
    $.getJSON('/getsuggestions', function(data){
        if(data.length > 0) {
            $.each(data, function(){
                var profilePic = (this.Photo) ? this.Photo : '5fce02648a742badb5905601b22098c9.png';
                people += '<div><ul class="media-list"><li class="media"><a class="media-left" href="#">';
                people += '<img src="/photo/pub/nb/' + profilePic + '?dim=60" alt="pencil" class="img-circle">';
                people += '</a><div class="media-body"><h5 class="media-heading inherit-font black">';
                people += '<a href="/'+ this.Username +'">'+ this.Name +'</a></h5>';
                people += '<div class="user-profession">Followed By '+ this.byy +'</div>';
                people += '<div class="sidebar-button-padding-top">';
                people += '<button type="button" class="btn btn-labeled btn-danger btn-xs followBtn" id="'+ this.Username +'">';
                people += '<span class="btn-label"><i class="glyphicon glyphicon-star-empty" aria-hidden="true"></i>';
                people += '</span><strong>Follow</strong></button></div></div></li></ul></div><hr />';
            });
        } else {
            people += '<div><strong style="font-size: 11px;">No Suggestions</strong></div>';
        }

        $('#suggested-people').html(people);
    });
}









