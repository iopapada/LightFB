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
            var arr = JSON.parse(xmlhttp.responseText);

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
