document.addEventListener('DOMContentLoaded', function() {

    //Check if postBtn appears in DOM and then addEventListener
    //Add Event Listener to post button
    if (document.getElementById('postBtn')) {
        document.getElementById('postBtn').addEventListener('click', postStatus, false);
    }

    var aTag = document.getElementById("friendRequestAnchor");
    aTag.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        loadFriendRequests();
    }, false);

    //Add Event Listener to load Friends Posts in My Profile Page
    loadFriendsPosts();

    function loadFriendsPosts() {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                //Get the statusUpdates Div Element
                var postStatusDiv = document.getElementById('statusUpdates');

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

                        //Create a Div that will host the likes
                        var newPostLike = document.createElement('div');
                        newPostLike.setAttribute('class', 'post');
                        newPostLike.setAttribute('id','like');

                        var newPostLikeSpan = document.createElement('span');
                        newPostLikeSpan.innerHTML = "Likes: "+ arr[i].likecnt;
                        newPostLikeSpan.setAttribute('id','span'+arr[i].id);


                        //Create an image to pass in the anchor
                        var imgLike = document.createElement("img");
                        imgLike.setAttribute('class', 'imgLike');
                        imgLike.setAttribute('src', 'src/content/images/like.png');
                        imgLike.setAttribute('alt', 'like');

                        //Create an anchor
                        var anchorLike = document.createElement("a");
                        anchorLike.setAttribute('class', 'anchorlike');
                        anchorLike.setAttribute('href',"#");
                        anchorLike.setAttribute('id',arr[i].id);
                        anchorLike.setAttribute('cnt',arr[i].likecnt);

                        //append all needed for like
                        anchorLike.appendChild(imgLike);
                        newPostLike.appendChild(newPostLikeSpan);
                        newPostLike.appendChild(anchorLike);


                        //Append the elements and final in statusUpdates Div
                        newPost.appendChild(postInfoDiv);
                        newPost.appendChild(newPostText);
                        newPost.appendChild(newPostLike);

                        //New posts should be on top!
                        postStatusDiv.insertBefore(newPost, postStatusDiv.firstChild);
                    }
                }

                var likes= document.getElementsByClassName('anchorlike');
                for (var x = 0; x < likes.length; x++) {
                    (function(x) {
                        likes[x].addEventListener("click", function (e) {

                            addLike(likes[x].getAttribute('id'));
                        }, false);
                    })(x);
                }

            }

        }

                xmlhttp.open("GET", "/index.php?action=loadFriendsPosts", true);
                xmlhttp.send();
        };

        // Trigger getFriendRequests for first time to get number of friend Requests when login
        getFriendRequests();

        // Trigger every 20 seconds to get new updates
        setInterval(function () {
            getFriendRequests();
            loadFriendsPosts();
        }, 20000);

}, false);


function addLike(id){

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            //Create an image to pass in the anchor
            var imgLike = document.createElement("img");
            imgLike.setAttribute('class', 'imgLike');
            imgLike.setAttribute('src', 'src/content/images/like.png');
            imgLike.setAttribute('alt', 'like');

            var postAnchor = document.getElementById(id);
            var postAnchorCnt = parseInt(postAnchor.getAttribute('cnt'));
            var postAnchorSpan = document.getElementById('span'+id);
            var newCount = postAnchorCnt + 1;

            postAnchorSpan.innerHTML = "Likes: " + newCount.toString();


        }
    }

    xmlhttp.open("GET", "/index.php?action=addLike&id="+ id, true);
    xmlhttp.send();

};

function getFriendRequests() {

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var arr = JSON.parse(xmlhttp.responseText);
            var spanFriendsNum = document.getElementById("friendRequestsCount");
            spanFriendsNum.innerHTML = arr.length;

        }
    }

    xmlhttp.open("GET", "/index.php?action=getFriendRequests", true);
    xmlhttp.send();
};

function postStatus(){

    //variable to store post message
    var postStatus = null;


    //Get the value of the textbox
    var postTextbox = document.getElementById('statusText');
    postStatus = postTextbox.value;

    //Check if user has hit post but text is empty
    if (postStatus != "" || postStatus.length !== 0) {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                //Load the new post with Ajax

                //Get the statusUpdates Div Element
                var postStatusDiv = document.getElementById('statusUpdates');
                var postMyStatusDiv = document.getElementById('statusMyUpdates');

                //Get the time and create a Div to store it
                var postTime = getDate();

                var postInfoDiv = document.createElement('div');
                postInfoDiv.setAttribute('class', 'postInfo');
                postInfoDiv.innerHTML = "Posted by me at: " + postTime;

                //Create a Div that will host the post Textbox
                var newPost = document.createElement('div');
                newPost.setAttribute('class', 'post');

                //Create a Div that will host the Textbox of Post
                var newPostText = document.createElement('textarea');
                newPostText.setAttribute('class', 'postText');

                newPostText.innerHTML = postStatus;

                //Create a Div that will host the likes
                var newPostLike = document.createElement('div');
                newPostLike.setAttribute('class', 'post');
                newPostLike.setAttribute('id','like');

                //Create an image to pass in the anchor
                var imgLike = document.createElement("img");
                imgLike.setAttribute('class', 'imgLike');
                imgLike.setAttribute('src', 'src/content/images/like.png');
                imgLike.setAttribute('alt', 'like');

                //Create an anchor
                var anchorLike = document.createElement("a");
                anchorLike.setAttribute('class', 'anchorlike');
                anchorLike.setAttribute('href',"#");

                //append all needed for like

                anchorLike.appendChild(imgLike);
                newPostLike.appendChild(anchorLike);

                //Append the elements and final in statusUpdates Div
                newPost.appendChild(postInfoDiv);
                newPost.appendChild(newPostText);
                newPost.appendChild(newPostLike);
                //New posts should be on top!
                if (postStatusDiv !=null) {
                    postStatusDiv.insertBefore(newPost, postStatusDiv.firstChild);
                }
                else if (postMyStatusDiv != null){
                    postMyStatusDiv.insertBefore(newPost, postMyStatusDiv.firstChild);
                }

                //Put again the placeholder on the textbox.
                postTextbox.value = "";
                postTextbox.placeholder = "Post your Status to LightFB";


            }
        }

        xmlhttp.open("GET", "/index.php?action=addPost&message=" + postStatus, true);
        xmlhttp.send();
    }
}


function loadFriendRequests(){

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var arr = JSON.parse(xmlhttp.responseText);

            if (arr.length > 0) {
                var searchDiv = document.getElementById("searchResults");
                if (searchDiv != null) {
                    while (searchDiv.hasChildNodes()) {
                        searchDiv.removeChild(searchDiv.firstChild);
                    }
                }
                else{

                    searchDiv = document.createElement('div');
                    searchDiv.setAttribute('class', 'inOutWindow');
                    searchDiv.setAttribute('id', 'searchResults');
                }

                var i;
                var listSearch = document.createElement("ul");


                for (i = 0; i < arr.length; i++) {

                    var searchItems = document.createElement("li");
                    var friendInfo = document.createElement("div");
                    friendInfo.setAttribute('class', 'friendRqInfo');
                    friendInfo.innerHTML = arr[i].firstname + " " + arr[i].lastname + " ";
                    var requestBtns = document.createElement("div");
                    requestBtns.setAttribute('class', 'rqBtns');
                    var friendBtn = document.createElement("button");
                    friendBtn.setAttribute('type', 'button');
                    friendBtn.setAttribute('class', 'acceptBtn');
                    friendBtn.setAttribute('id', arr[i].email);
                    friendBtn.innerHTML = "Accept Friend Request";
                    requestBtns.appendChild(friendBtn);
                    searchItems.appendChild(friendInfo);
                    searchItems.appendChild(requestBtns);
                    listSearch.appendChild(searchItems);
                }
                searchDiv.appendChild(listSearch);

                var acceptsButtons = document.getElementsByClassName("acceptBtn");
                for (var x = 0; x < acceptsButtons.length; x++) {

                    acceptsButtons[x].addEventListener("click", function (e) {
                        var target = e.target;

                        acceptFriendRequest(target);
                    }, false);

                }
            }
        }
    }

    xmlhttp.open("GET", "/index.php?action=getFriendRequests", true);
    xmlhttp.send();

}

function acceptFriendRequest(target){

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            target.innerHTML ="Accepted";
            target.setAttribute('disabled', 'true');
            var spanFriendsNum = document.getElementById("friendRequestsCount");


            if (target.classList.contains("toggled")) {
                //do nothing the button is already pushed!
            }
            else{

                target.classList.add("toggled");
                spanFriendsNum.innerHTML = spanFriendsNum.innerHTML - 1;
            }
        }
    }

    xmlhttp.open("GET", "/index.php?action=confirmFriendRequests&id="+ target.id, true);
    xmlhttp.send();

}

function getDate() {

    var d = new Date();

    var year    = d.getFullYear();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";


    var monthFull = month[d.getMonth()];
    var day     = d.getDate();
    var hour    = d.getHours();
    var minute  = d.getMinutes();

    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }

    var dateTime =  day+" " +monthFull + " " + year+ ' at '+hour+':'+minute;

    return dateTime;

}