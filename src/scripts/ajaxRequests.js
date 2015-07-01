function sendFriendRequest(){

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    var email = document.getElementById("emailHidden").value;

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var addFriendButton = document.getElementById("friendButton");
            addFriendButton.innerHTML = "Request Sent!";
            addFriendButton.style.backgroundColor = "grey";
        }
    }
    xmlhttp.open("GET","/index.php?action=sendFriendRequest&email="+ email,true);
    xmlhttp.send();
}

function mainSearch(){

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    var searchExpr = document.searchform.search.value;

    var searchDiv = document.getElementById("searchResults");
    if (searchDiv != null) {
        while (searchDiv.hasChildNodes()) {
            searchDiv.removeChild(searchDiv.firstChild);
        }
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {

            var arr = JSON.parse(xmlhttp.responseText);
            var i;

            var listSearch = document.createElement("ul");

            if (arr.length > 0) {
                for (i = 0; i < arr.length; i++) {

                    var searchItems = document.createElement("li");
                    var itemAnchor = document.createElement("div");
                    itemAnchor.setAttribute('class', 'anchorSearch');
                    itemAnchor.setAttribute('id', arr[i].email);

                    // If the user has not uploaded a profile pic don't append
                    if (arr[i].pictureURL) {

                        var itemProfilePic = document.createElement("img");
                        itemProfilePic.setAttribute('class', 'imgProfileSearch');
                        itemProfilePic.setAttribute('src', 'data:image/jpeg;base64,' + arr[i].pictureURL);
                        itemProfilePic.setAttribute('alt', 'profile');

                        itemAnchor.appendChild(itemProfilePic);
                    }

                    itemAnchor.innerHTML += arr[i].firstname + " " + arr[i].lastname;
                    searchItems.appendChild(itemAnchor);
                    listSearch.appendChild(searchItems);
                }
            }
            else{

                var searchItems = document.createElement("li");
                searchItems.innerHTML = "No Friends found!";
                listSearch.appendChild(searchItems);
            }

            if (searchDiv != null) {
                searchDiv.appendChild(listSearch);
            }
            else {
                searchDiv = document.createElement('div');
                searchDiv.setAttribute('class','inOutWindow');
                searchDiv.setAttribute('id','searchResults');
                searchDiv.appendChild(listSearch);

                profileHeaderDiv =  document.getElementById('main_content');
                profileHeaderDiv.insertBefore(searchDiv,profileHeaderDiv.firstChild);
            }

            var aTags = document.getElementsByClassName("anchorSearch");

            for (var i=0; i<aTags.length; i++){

                (function(i){
                    aTags[i].addEventListener('click', function(e) {

                        loadProfile(aTags[i].getAttribute('id'))
                    }, false);
                })(i);

            }
        }

    }
    xmlhttp.open("GET","/index.php?action=search&searchExpr=" + searchExpr,true);
    xmlhttp.send();
}

// function to load otherprofile
function loadProfile(email){

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var arr = JSON.parse(xmlhttp.responseText);
            var i;

            if (document.getElementById("searchResults") != null){
                var searchResDiv = document.getElementById("searchResults");
                searchResDiv.parentNode.removeChild(searchResDiv);
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

            if (document.getElementById("profileHeader")!= null){
                var profileHeaderDiv = document.getElementById("profileHeader");
                profileHeaderDiv.parentNode.removeChild(profileHeaderDiv);
            }

            if (document.getElementById("editContainer")!= null){
                var editContainerDiv = document.getElementById("editContainer");
                editContainerDiv.parentNode.removeChild(editContainerDiv);
            }

            if (document.getElementById("profileButtons")!= null){
                var profileButtonsDiv = document.getElementById("profileButtons");
                profileButtonsDiv.parentNode.removeChild(profileButtonsDiv);
            }

            if (document.getElementById("friendsResults") != null){
                var friendsDiv = document.getElementById("friendsResults");
                friendsDiv.parentNode.removeChild(friendsDiv);
            }

            if (document.getElementById("photoResults") != null){
                var photoDiv = document.getElementById("photoResults");
                photoDiv.parentNode.removeChild(photoDiv);
            }

            if (document.getElementById("albumResults") != null){
                var albumDiv = document.getElementById("albumResults");
                albumDiv.parentNode.removeChild(albumDiv);
            }

            var mainContentDiv = document.getElementById("main_content");

            var divProfileHeader = document.createElement("div");
            divProfileHeader.setAttribute('id', "profileHeader");
            var profileImg = document.createElement("img");
            profileImg.setAttribute('src', "data:image/jpeg;base64,"+arr['pictureURL']);
            profileImg.setAttribute('id','mediumAvatar');
            profileImg.setAttribute('alt','avatar');
            var coverImg = document.createElement("img");
            coverImg.setAttribute('src', "data:image/jpeg;base64,"+arr['pictureCoverURL']);
            coverImg.setAttribute('id','Cover');
            coverImg.setAttribute('alt','cover');

            divProfileHeader.appendChild(profileImg);
            divProfileHeader.appendChild(coverImg);

            var divProfileName = document.createElement("div");
            divProfileName.setAttribute('id', "profileName");
            divProfileName.innerHTML = arr.firstname+ " " + arr.lastname;

            divProfileHeader.appendChild(divProfileName);

            var divProfileButtons = document.createElement("div");
            divProfileButtons.setAttribute('id', "profileButtons");

            var addFriendBtn = document.createElement("button");
            addFriendBtn.setAttribute('type', "button");
            addFriendBtn.setAttribute('id', "friendButton");
            if (arr.isfriend == "0") {
                addFriendBtn.setAttribute('class', "button friendBtn notFriend");
                addFriendBtn.innerHTML = "Add Friend";
            }
            else if(arr.isfriend == "1"){
                addFriendBtn.setAttribute('class', "button friendBtn alreadyFriends");
                addFriendBtn.setAttribute('disabled','true');
                addFriendBtn.innerHTML = "Connected";
            }
            else if(arr.isfriend == "2"){
                addFriendBtn.setAttribute('class', "button friendBtn myself");
                addFriendBtn.setAttribute('disabled','true');
                addFriendBtn.setAttribute('hidden','true');
                addFriendBtn.innerHTML = "Myself";
            }
            else if(arr.isfriend == "3"){
                addFriendBtn.setAttribute('class', "button friendBtn pending");
                addFriendBtn.setAttribute('disabled','true');
                addFriendBtn.innerHTML = "Friend Request Pending";
            }

            var timelineBtn = createButton('button', 'button', 'timelineBtn',arr.email,'Timeline');
            var friendsBtn = createButton('button', 'button', 'friendsBtn',arr.email,'Friends ('+arr.cnt + ")");
            var photosBtn = createButton('button', 'button', 'photosBtn',arr.email,'Photos');

            //if the profile loaded is not a friend make this button not clickable
            if (arr.isfriend!="1"){
                timelineBtn.setAttribute('disabled','true');
                friendsBtn.setAttribute('disabled','true');
                albumsBtn.setAttribute('disabled','true');
                photosBtn.setAttribute('disabled','true');
            }

            var emailHidden = document.createElement("input");
            emailHidden.setAttribute('id', "emailHidden");
            emailHidden.setAttribute('hidden',"true");
            emailHidden.setAttribute('value', arr.email);

            if (arr.isfriend != "0" || arr.isfriend != "1") {
                divProfileButtons.appendChild(addFriendBtn);
            }

            //append all buttons
            divProfileButtons.appendChild(timelineBtn);
            divProfileButtons.appendChild(friendsBtn);
            divProfileButtons.appendChild(photosBtn);

            divProfileHeader.appendChild(divProfileButtons);

            divProfileHeader.appendChild(emailHidden);
            mainContentDiv.appendChild(divProfileHeader);

            if (document.getElementById("friendButton") !=null ) {

                var addFriendButton = document.getElementById("friendButton");
                addFriendButton.addEventListener("click", sendFriendRequest, false);
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


            loadMyPosts();
        }
    }

    xmlhttp.open("GET","/index.php?action=otherprofile&email="+email,true);
    xmlhttp.send();
}

function createButton(type, classBtn, id, email, inner ){

    var btn = document.createElement('button');
    btn.setAttribute('type',type);
    btn.setAttribute('class',classBtn);
    btn.setAttribute('id',id);
    btn.setAttribute('email',email);
    btn.innerHTML = inner;

    return btn;
}
