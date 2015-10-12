/**
 * Created by ahtasham on 07/02/15.
 */

(function(window,undefined){
    var State = History.getState();
    var hashVal = State.hash.split('&_suid').shift().split('=').pop();
    console.log(hashVal);
    if(hashVal !== '/') {
        searchPosts(hashVal);
    } else {
        window.location.reload();
    }
})(window);