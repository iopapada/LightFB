document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('loginAvatar')) {
        document.getElementById('loginAvatar').addEventListener('click', loadMyProfile, false);
    }

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
    //setInterval(function () {
    //    loadMyPosts();
    //}, 20000);

}, false);

function loadMyProfile(){

    window.location = "/index.php?action=myprofile";
}

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

            //in case there is no statusMyUpdates Div (when we are using other profile) create one
            if (postStatusDiv == null) {
                postStatusDiv = document.createElement('div');
                postStatusDiv.setAttribute('id','statusMyUpdates');
            }

            if (postStatusDiv != null) {

                var arr = JSON.parse(xmlhttp.responseText);
                var i;

                while (postStatusDiv.hasChildNodes()) {
                    postStatusDiv.removeChild(postStatusDiv.firstChild);
                }

                    for (i = 0; i < arr.length; i++) {

                        if (arr[i].message != null) {
                            //Get the time and create a Div to store it
                            var postTime = arr[i].timepost;

                            var postInfoDiv = document.createElement('div');
                            postInfoDiv.setAttribute('class', 'postInfo');
                            // If the user has not uploaded a profile pic don't append
                            if (arr[i].pictureURL) {

                                var itemProfilePic = document.createElement("img");
                                itemProfilePic.setAttribute('class', 'imgProfileSearch');
                                itemProfilePic.setAttribute('src', 'data:image/jpeg;base64,' + arr[i].pictureURL);
                                itemProfilePic.setAttribute('alt', 'profile');

                                postInfoDiv.appendChild(itemProfilePic);
                            }

                            postInfoDiv.innerHTML += "Posted by " + arr[i].firstname + " " + arr[i].lastname + " at:" + postTime;

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

                var mainContentDiv = document.getElementById('main_content');
                mainContentDiv.appendChild(postStatusDiv);

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

            var postStatus = document.getElementById('postStatus');
            while (postStatus.hasChildNodes()) {
                postStatus.removeChild(postStatus.firstChild);
            }

            var statusMyUpdates = document.getElementById('statusMyUpdates');
            while (statusMyUpdates.hasChildNodes()) {
                statusMyUpdates.removeChild(statusMyUpdates.firstChild);
            }

            statusMyUpdates.className = "allPhotos";

            var tbl = document.createElement("table");
            tbl.setAttribute("id",'displayAllImages');
            var tblBody = document.createElement("tbody");

            var row;
            for (var i = 0; i < arr.length; i++) {
                if((i+1)%4 === 1 || i==0)
                {
                    row= document.createElement("tr");
                }

                var imgname = document.createElement('img');
                imgname.setAttribute("src", "data:image/jpeg;base64," + arr[i]['img']);
                var cell = document.createElement("td");

                cell.appendChild(imgname);
                row.appendChild(cell);
                if((i+1)%4 === 0 || i+1===arr.length)
                {
                    tblBody.appendChild(row);
                }
            }

            tbl.appendChild(tblBody);
            statusMyUpdates.appendChild(tbl);
        }
    }

    xmlhttp.open("GET", "/index.php?action=loadAllMyPhotos&email="+email, true);
    xmlhttp.send();
}
