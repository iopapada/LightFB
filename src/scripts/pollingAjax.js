document.addEventListener('DOMContentLoaded', function() {

    //Add Event Listener to post button
    document.getElementById('postBtn').addEventListener('click', postStatus, false);

    // Trigger getFriendRequests for first time to get number of friend Requests when login
    getFriendRequests();

    function getFriendRequests(){

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                var arr = JSON.parse(xmlhttp.responseText);
                var spanFriendsNum = document.getElementById("friendRequestsCount");
                spanFriendsNum.innerHTML = arr.length;

                var aTag = document.getElementById("friendRequestAnchor");
                aTag.addEventListener("click", function(e){e.stopPropagation();e.preventDefault();loadFriendRequests(arr);},false);

            }
        }

        xmlhttp.open("GET", "/index.php?action=getFriendRequests", true);
        xmlhttp.send();
    };

    // Trigger every 5 seconds to get new updates
    setInterval(getFriendRequests, 20000);

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
            //Do something...
            //Load the new post with Ajax

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

