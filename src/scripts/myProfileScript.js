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

    // Trigger loadMyPosts
    loadMyPosts();

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

            if (document.getElementById("friendsResults") != null){
                var friendsDiv = document.getElementById("friendsResults");
                friendsDiv.parentNode.removeChild(friendsDiv);
            }

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

    var friendsBtn =  document.getElementById('friendsBtn');
    var email = friendsBtn.getAttribute('email');

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var arr = JSON.parse(xmlhttp.responseText);
            if (document.getElementById("friendsResults") != null){
                var friendsDiv = document.getElementById("friendsResults");
                friendsDiv.parentNode.removeChild(friendsDiv);
            }

            if (document.getElementById("postStatus") != null){
                var postStatusDiv = document.getElementById("postStatus");
                postStatusDiv.parentNode.removeChild(postStatusDiv);
            }

            if (document.getElementById("statusUpdates")!= null){
                var StatusUpdatesDiv = document.getElementById("statusUpdates");
                StatusUpdatesDiv.parentNode.removeChild(StatusUpdatesDiv);
            }
            if (document.getElementById("statusMyUpdates")!= null){
                var StatusMyUpdatesDiv = document.getElementById("statusMyUpdates");
                StatusMyUpdatesDiv.parentNode.removeChild(StatusMyUpdatesDiv);
            }

            var listFriends = document.createElement("ul");

            for(i=0; i < arr.length; i++){

                var friendItem = document.createElement("li");
                var friendAnchor = document.createElement("div");
                friendAnchor.setAttribute('class','anchorFriends');
                friendAnchor.setAttribute('id',arr[i].email);

                // If the user has not uploaded a profile pic don't append
                if (arr[i].pictureURL) {

                    var itemProfilePic = document.createElement("img");
                    itemProfilePic.setAttribute('class', 'imgProfileSearch');
                    itemProfilePic.setAttribute('src', 'data:image/jpeg;base64,' + arr[i].pictureURL);
                    itemProfilePic.setAttribute('alt', 'profile');
                    friendAnchor.appendChild(itemProfilePic);
                }

                friendAnchor.innerHTML += arr[i].firstname + " " + arr[i].lastname;
                friendItem.appendChild(friendAnchor);
                listFriends.appendChild(friendItem);
            }

            var friendsDiv = document.createElement('div');
            friendsDiv.setAttribute('class','inOutWindow');
            friendsDiv.setAttribute('id','friendsResults');
            friendsDiv.appendChild(listFriends);

            mainContentDiv =  document.getElementById('main_content');
            mainContentDiv.appendChild(friendsDiv);

            var aTags = document.getElementsByClassName("anchorFriends");

            for (var i=0; i<aTags.length; i++){
                (function(i){
                    aTags[i].addEventListener('click', function(e) {

                        loadProfile(aTags[i].getAttribute('id'))
                    }, false);
                })(i);
            }

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


            if (document.getElementById('postStatus') != null){
                var postStatus = document.getElementById('postStatus');
                postStatus.parentNode.removeChild(postStatus);
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

                if(arr[i]['img']!=="")cell.appendChild(imgname);
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
