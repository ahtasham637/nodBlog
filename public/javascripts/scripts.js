/**
 * Created by ahtasham on 28/12/14.
 */

$(document).ready(function(){
    //common
    $('textarea').autosize();
});

// Edit Profile if logged In
$('#editProfileBtn').click(function () {
    window.location = '/update';
});

//enter pressed
$("#txtSQuery").on("keyup", function(e){
    var code = e.keyCode || e.which;
    if (code  == 13) {
        e.preventDefault();
        $("#searchbtn").click();
        return false;
    }
});

// Prevent form
$('#search-form').on("keyup keypress keydown", function(e) {
    var code = e.keyCode || e.which;
    if (code  == 13) {
        e.preventDefault();
        return false;
    }
});

// search button clicked
$("#search-form").on("click", "#searchbtn", function(e){
    var qSearch = $("#txtSQuery").val().trim();
    if(qSearch) {
        History.pushState({
            State: 1
        }, document.title, "/search?s=" + qSearch);
    }
});

function searchPosts (que) {
    $.getJSON("/search/"+ que + "/getposts", function(data){
        var posts = '';
        if(data.length > 0) {
            $.each(data, function(){
                var profilePic = this.ProfilePhoto ? this.ProfilePhoto : '5fce02648a742badb5905601b22098c9.png';
                posts += '<div><div class="col-xs-8-custom" ';
                posts += 'onclick="location.href=\'/'+ this.Username + '/' + this.CatUrl + '/' + this.Url +'\';">';
                posts += '<div><ul class="media-list"><li class="media"><a class="media-left" href="#">';
                posts += '<img src="/photo/pub/nb/'+ profilePic +'?dim=60" alt="pencil" class="img-circle">';
                posts += '</a><div class="media-body m-body"><h4 class="media-heading">';
                posts += this.Title + '</h4>';
                posts += '<div class="post-details"><div class="col-xs-4 zero-padding-left"><span>Written By ';
                posts += '<a href="/'+ this.Username +'">'+ this.Name +'</a></span>';
                posts += '</div><div class="pull-right"><i class="glyphicon glyphicon-time" aria-hidden="true">';
                posts += '</i> '+ new Date(this.Time).customFormat('#MMMM# #DD#, #YYYY#') +'';
                posts += '</div></div></div></li></ul></div>';
                posts += '<hr class="hr" /><div class="description"><p>';
                posts += this.Details + ' <a href="/'+ this.Username + '/' + this.CatUrl + '/' + this.Url +'">Read more</a></p>';
                posts += '</div></div></div>';
            });

        } else {
            posts += '<div class="col-xs-8-custom"><div><ul class="media-list">';
            posts += '<li class="media"><div class="media-body blogtitle">There are no posts yet.';
            posts += '</div></li></ul></div></div>';
        }
        $('#container').html(posts);
    });
}


Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = this;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};





History.Adapter.bind(window,'statechange',function(){

    var State = History.getState();
    var hashVal = State.hash.split('&_suid').shift().split('=').pop();
    console.log(hashVal);

    if(hashVal !== '/' && hashVal.search('/') == -1) {
        searchPosts(hashVal);
    } else {
        window.location.reload();
    }
});





