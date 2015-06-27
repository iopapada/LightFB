document.addEventListener('DOMContentLoaded', function() {

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

    setInterval(getFriendRequests, 5000);

}, false);

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
        var friendSpan = document.createElement("span");
        friendSpan.innerHTML = arr[i].firstname + " " + arr[i].lastname + " ";
        friendSpan.innerHTML += "<button type='button' class='acceptBtn'>Accept Friend Request</button>";
        searchItems.appendChild(friendSpan);
        listSearch.appendChild(searchItems);
    }
    searchDiv.appendChild(listSearch);

    var acceptsButtons = document.getElementsByClassName("acceptBtn");
    for (var x=0; x < acceptsButtons.length; x++) {

        (function() {
            var email = arr[x].email;
            acceptsButtons[x].addEventListener("click", function (e) {
                var target = e.target;
                acceptFriendRequest(target, email);
            }, false);
        }())


    }

    for (var i=0; i<aTags.length; i++){

        var href=aTags[i].href.valueOf();
        aTags[i].addEventListener("click", function(e){e.stopPropagation();e.preventDefault();loadProfile(href);},false);
    }
}

function acceptFriendRequest(target){

    target.innerHTML ="Working ";
}