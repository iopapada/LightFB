document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('timelineBtn')) {
        document.getElementById('timelineBtn').addEventListener('click', loadMyPosts, false);
    }

    if (document.getElementById('friendsBtn')) {
        document.getElementById('friendsBtn').addEventListener('click', loadFriends, false);
    }

    if (document.getElementById('albumsBtn')) {
        document.getElementById('albumsBtn').addEventListener('click', loadAllMyAlbums, false);
    }

    if (document.getElementById('photosBtn')) {
        document.getElementById('photosBtn').addEventListener('click', loadAllMyPhotos, false);
    }

    // Trigger loadMyPosts for 1st time!
    loadMyPosts();

    // Trigger every 20 seconds to get new updates
    setInterval(function () {
        loadMyPosts();
    }, 20000);

}, false);


function loadMyPosts(){

    var email = document.getElementById('friendsBtn').getAttribute('email');

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            //Get the statusUpdates Div Element
            var postStatusDiv = document.getElementById('statusMyUpdates');

            if (postStatusDiv != null) {

                var arr = JSON.parse(xmlhttp.responseText);
                var i;

                while (postStatusDiv.hasChildNodes()) {
                    postStatusDiv.removeChild(postStatusDiv.firstChild);
                }

                for (i = 0; i < arr.length; i++) {

                    //Get the time and create a Div to store it
                    var postTime = arr[i].timepost;

                    var postInfoDiv = document.createElement('div');
                    postInfoDiv.setAttribute('class', 'postInfo');
                    postInfoDiv.innerHTML = "Posted by " + arr[i].firstname + " at:" + postTime;

                    //Create a Div that will host the post Textbox
                    var newPost = document.createElement('div');
                    newPost.setAttribute('class', 'post');

                    //Create a Div that will host the Textbox of Post
                    var newPostText = document.createElement('textarea');
                    newPostText.setAttribute('readonly', 'true');
                    newPostText.setAttribute('class', 'postText');

                    newPostText.innerHTML = arr[i].message;

                    //Append the elements and final in statusUpdates Div
                    newPost.appendChild(postInfoDiv);
                    newPost.appendChild(newPostText);
                    //New posts should be on top!
                    postStatusDiv.insertBefore(newPost, postStatusDiv.firstChild);
                }
            }

        }
    }

    xmlhttp.open("GET", "/index.php?action=loadMyPosts&email="+email, true);
    xmlhttp.send();
}


function loadFriends(){

    var email = document.getElementById('friendsBtn').getAttribute('email');

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            alert('load');
            var arr = JSON.parse(xmlhttp.responseText);

        }
    }

    xmlhttp.open("GET", "/index.php?action=loadFriends&email="+email, true);
    xmlhttp.send();
}

function loadAllMyAlbums(){

    var email = document.getElementById('friendsBtn').getAttribute('email');

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var arr = JSON.parse(xmlhttp.responseText);

        }
    }

    xmlhttp.open("GET", "/index.php?action=loadAllMyAlbums&email="+email, true);
    xmlhttp.send();
}

function loadAllMyPhotos(){

    var email = document.getElementById('friendsBtn').getAttribute('email');

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var arr = JSON.parse(xmlhttp.responseText);

        }
    }

    xmlhttp.open("GET", "/index.php?action=loadAllMyPhotos&email="+email, true);
    xmlhttp.send();
}
