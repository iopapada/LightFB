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

            for(i=0; i < arr.length; i++){

                var searchItems = document.createElement("li");
                var itemAnchor = document.createElement("div");
                itemAnchor.setAttribute('class','anchorSearch');
                itemAnchor.setAttribute('id',arr[i].email);

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
                addFriendBtn.innerHTML = "Friends";
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
            var friendsBtn = createButton('button', 'button', 'friendsBtn',arr.email,'Friends');
            var albumsBtn = createButton('button', 'button', 'albumsBtn',arr.email,'Albums');
            var photosBtn = createButton('button', 'button', 'photosBtn',arr.email,'Photos');

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
            divProfileButtons.appendChild(albumsBtn);
            divProfileButtons.appendChild(photosBtn);

            divProfileHeader.appendChild(divProfileButtons);

            divProfileHeader.appendChild(emailHidden);
            mainContentDiv.appendChild(divProfileHeader);

            if (document.getElementById("friendButton") !=null ) {

                var addFriendButton = document.getElementById("friendButton");
                addFriendButton.addEventListener("click", sendFriendRequest, false);
            }

            loadMyPosts();
        }
    }

    xmlhttp.open("GET","/index.php?action=otherprofile&email="+email,true);
    xmlhttp.send();
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

                    postInfoDiv.innerHTML += "Posted by " + arr[i].firstname + " " + arr[i].lastname +" at:" + postTime;

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

                    var mainContentDiv = document.getElementById('main_content');
                    mainContentDiv.appendChild(postStatusDiv);

            }

        }
    }

    xmlhttp.open("GET", "/index.php?action=loadMyPosts&email="+email, true);
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
