document.addEventListener('DOMContentLoaded', function() {

    //Check if postBtn appears in DOM and then addEventListener
    //Add Event Listener to post button
    if (document.getElementById('postBtn')) {
        document.getElementById('postBtn').addEventListener('click', postStatus, false);
    }

    //Add Event Listener to load Friends Posts in My Profile Page
    loadFriendsPosts();

    function loadFriendsPosts() {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var arr = JSON.parse(xmlhttp.responseText);
                var i;

                //Get the statusUpdates Div Element
                var postStatusDiv = document.getElementById('statusUpdates');

                if (postStatusDiv != null) {
                    while (postStatusDiv.hasChildNodes()) {
                        postStatusDiv.removeChild(postStatusDiv.firstChild);
                    }
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

                xmlhttp.open("GET", "/index.php?action=loadFriendsPosts", true);
                xmlhttp.send();
        };

        // Trigger getFriendRequests for first time to get number of friend Requests when login
        getFriendRequests();

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

                    var aTag = document.getElementById("friendRequestAnchor");
                    aTag.addEventListener("click", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        loadFriendRequests(arr);
                    }, false);
                }
            }

            xmlhttp.open("GET", "/index.php?action=getFriendRequests", true);
            xmlhttp.send();
        };

        // Trigger every 20 seconds to get new updates
        setInterval(function () {
            getFriendRequests();
            loadFriendsPosts();
        }, 20000);

}, false);


function postStatus(){

    //variable to store post message
    var postStatus = null;

    //Get the value of the textbox
    var postTextbox = document.getElementById('statusText');
    postStatus = postTextbox.value;

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            //Check if user has hit post but text is empty
            if (postStatus || 0 !== postStatus.length) {
                //Load the new post with Ajax

                //Get the statusUpdates Div Element
                var postStatusDiv = document.getElementById('statusUpdates');

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

                //Append the elements and final in statusUpdates Div
                newPost.appendChild(postInfoDiv);
                newPost.appendChild(newPostText);
                //New posts should be on top!
                postStatusDiv.insertBefore(newPost, postStatusDiv.firstChild);

                //Put again the placeholder on the textbox.
                postTextbox.value = "";
                postTextbox.placeholder = "Post your Status to LightFB";
            }

        }
    }

    xmlhttp.open("GET", "/index.php?action=addPost&message=" + postStatus, true);
    xmlhttp.send();
}


function loadFriendRequests(arr){

    var searchDiv = document.getElementById("searchResults");
    if (searchDiv != null) {
        while (searchDiv.hasChildNodes()) {
            searchDiv.removeChild(searchDiv.firstChild);
        }
    }

    var i;
    var listSearch = document.createElement("ul");


    for(i=0; i < arr.length; i++){

        var searchItems = document.createElement("li");
        var friendInfo = document.createElement("div");
        friendInfo.setAttribute('class','friendRqInfo');
        friendInfo.innerHTML = arr[i].firstname + " " + arr[i].lastname + " ";
        var requestBtns = document.createElement("div");
        requestBtns.setAttribute('class','rqBtns');
        var friendBtn = document.createElement("button");
        friendBtn.setAttribute('type','button');
        friendBtn.setAttribute('class','acceptBtn');
        friendBtn.setAttribute('id',arr[i].email);
        friendBtn.innerHTML= "Friend Request";
        requestBtns.appendChild(friendBtn);
        searchItems.appendChild(friendInfo);
        searchItems.appendChild(requestBtns);
        listSearch.appendChild(searchItems);
    }
    searchDiv.appendChild(listSearch);

    var acceptsButtons = document.getElementsByClassName("acceptBtn");
    for (var x=0; x < acceptsButtons.length; x++) {

            acceptsButtons[x].addEventListener("click", function (e) {
                var target = e.target;

                acceptFriendRequest(target);
            }, false);

    }
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