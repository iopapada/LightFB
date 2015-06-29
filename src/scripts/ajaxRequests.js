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

            searchDiv.appendChild(listSearch);

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

            if (document.getElementById("searchResults")){
                var searchResDiv = document.getElementById("searchResults");
                searchResDiv.parentNode.removeChild(searchResDiv);
            }

            if (document.getElementById("postStatus")){
                var postStatusDiv = document.getElementById("postStatus");
                postStatusDiv.parentNode.removeChild(postStatusDiv);
            }

            var mainContentDiv = document.getElementById("main_content");

            var divProfileHeader = document.createElement("div");
            divProfileHeader.setAttribute('id', "profileHeader");
            var divProfilePic = document.createElement("div");
            divProfilePic.setAttribute('id', "profilePic");
            var profileImg = document.createElement("img");
            profileImg.setAttribute('src', "data:image/jpeg;base64,"+arr['pictureURL']);
            profileImg.setAttribute('alt',"profile");

            divProfilePic.appendChild(profileImg);
            divProfileHeader.appendChild(divProfilePic);

            var divProfileName = document.createElement("div");
            divProfileName.setAttribute('id', "profileName");
            divProfileName.innerHTML = arr.firstname + " " +arr.lastname;

            divProfilePic.appendChild(divProfileName);

            var divProfileButtons = document.createElement("div");
            divProfileButtons.setAttribute('id', "profileButtons");

            var addFriendBtn = null;
            if (arr.isfriend == "0") {
                addFriendBtn = document.createElement("button");
                addFriendBtn.setAttribute('type', "button");
                addFriendBtn.setAttribute('id', "friendButton");
                addFriendBtn.setAttribute('class', "button friendBtn");
                addFriendBtn.innerHTML = "Add Friend";
            }
            else if(arr.isfriend == "1"){
                addFriendBtn = document.createElement("button");
                addFriendBtn.setAttribute('type', "button");
                addFriendBtn.setAttribute('id', "alreadyfriends");
                addFriendBtn.setAttribute('class', "button friendBtn");
                addFriendBtn.setAttribute('disabled','true');
                addFriendBtn.innerHTML = "Friends";
            }

            var timelineBtn = document.createElement('button');
            timelineBtn.setAttribute('type','button');
            timelineBtn.setAttribute('class','button');
            timelineBtn.setAttribute('id','timelineBtn');
            timelineBtn.setAttribute('email',arr.email);
            timelineBtn.innerHTML = "Timeline";

            var friendsBtn = document.createElement('button');
            friendsBtn.setAttribute('type','button');
            friendsBtn.setAttribute('class','button');
            friendsBtn.setAttribute('id','friendsBtn');
            friendsBtn.setAttribute('email',arr.email);
            friendsBtn.innerHTML = "Friends";

            var albumsBtn = document.createElement('button');
            albumsBtn.setAttribute('type','button');
            albumsBtn.setAttribute('class','button');
            albumsBtn.setAttribute('id','albumsBtn');
            albumsBtn.setAttribute('email',arr.email);
            albumsBtn.innerHTML = "Albums";

            var photosBtn = document.createElement('button');
            photosBtn.setAttribute('type','button');
            photosBtn.setAttribute('class','button');
            photosBtn.setAttribute('id','photosBtn');
            photosBtn.setAttribute('email',arr.email);
            photosBtn.innerHTML = "Photos";

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

            divProfilePic.appendChild(divProfileButtons);

            divProfileHeader.appendChild(emailHidden);
            mainContentDiv.appendChild(divProfileHeader);

            if (document.getElementById("friendButton")) {

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

        }
    }

    xmlhttp.open("GET","/index.php?action=otherprofile&email="+email,true);
    xmlhttp.send();
}


function showEditProfile(evt){

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    var searchDiv = document.getElementById("searchResults");
    if (searchDiv != null) {
        while (searchDiv.hasChildNodes()) {
            searchDiv.removeChild(searchDiv.firstChild);
        }
    }

    var editProfileLink = document.getElementById('editProfile');
    var name= editProfileLink.name;

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {

            /*Check if there is already a editContainer Div. If yes don't do anything */
            if (!document.getElementById("editContainer")) {
                var arr = JSON.parse(xmlhttp.responseText);

                if (document.getElementById("searchResults")) {
                    var searchResDiv = document.getElementById("searchResults");
                    searchResDiv.parentNode.removeChild(searchResDiv);
                }

                if (document.getElementById("postStatus")) {
                    var postStatusDiv = document.getElementById("postStatus");
                    postStatusDiv.parentNode.removeChild(postStatusDiv);
                }

                var mainContentDiv = document.getElementById("main_content");

                /*Create a div for the Container of Edit Profile Page */
                var editContainer = document.createElement("div");
                editContainer.setAttribute('id', "editContainer");

                /*Create a div for the Title of Edit Profile Page */
                var divEditTitle = document.createElement("div");
                divEditTitle.setAttribute('id', "editTitle");
                divEditTitle.innerHTML = "Edit your Profile";

                /*Create a div for the content of Edit Profile Page */
                var divEditContent = document.createElement("div");
                divEditContent.setAttribute('id', "editContent");

                /*Create a form to populate with JSON and submit to update the Profile*/
                var editProfileForm = document.createElement("form");
                editProfileForm.setAttribute('name', "editProfileForm");
                editProfileForm.setAttribute('method', "post");
                editProfileForm.setAttribute('action', "");

                /*Create a label for Firstname input */
                var labelFirstname = document.createElement("label");
                labelFirstname.innerHTML = "Your Registered Firstname: ";

                /*Create Firstname input*/
                var inputFirstname = document.createElement("input");
                inputFirstname.setAttribute('name', "Firstname");
                inputFirstname.setAttribute('type', "text");
                inputFirstname.setAttribute('required', "true");
                inputFirstname.value = arr[0].firstname;

                /*append Firstname input to label*/
                labelFirstname.appendChild(inputFirstname);

                /*Create a label for Lastname input */
                var labelLastname = document.createElement("label");
                labelLastname.innerHTML = "Your Registered Lastname: ";

                /*Create Lastname input*/
                var inputLastname = document.createElement("input");
                inputLastname.setAttribute('name', "Lastname");
                inputLastname.setAttribute('type', "text");
                inputLastname.setAttribute('required', "true");
                inputLastname.value = arr[0].lastname;

                labelLastname.appendChild(inputLastname);


                /*Create a label for input */
                var labelEmail = document.createElement("label");
                labelEmail.innerHTML = "Your Registered E-mail: ";

                /*Create input*/
                var inputEmail = document.createElement("input");
                inputEmail.setAttribute('name', "Email");
                inputEmail.setAttribute('type', "text");
                inputEmail.setAttribute('required', "true");
                inputEmail.setAttribute('pattern',"\b[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}\b");
                inputEmail.value = arr[0].email;

                labelEmail.appendChild(inputEmail);

                /*Create a label for input */
                var labelProfilePic = document.createElement("label");
                labelProfilePic.innerHTML = "Your Current Profile Picture: ";

                var imgProfile = document.createElement("img");
                imgProfile.setAttribute('id','imgProfile');
                imgProfile.setAttribute('src',arr[0].pictureURL);
                imgProfile.setAttribute('alt',"Profile Picture" + arr[0].email);

                var imgUpload = document.createElement("input");
                imgUpload.setAttribute('type',"file");
                imgUpload.setAttribute('id',"profile-select");
                imgUpload.setAttribute('name',"file");

                var submitButton = document.createElement("input");
                submitButton.setAttribute('type','submit');
                submitButton.setAttribute('value','Update Profile');
                submitButton.setAttribute('name','update');

                labelProfilePic.appendChild(imgProfile);
                labelProfilePic.appendChild(imgUpload);

                editProfileForm.appendChild(labelFirstname);
                editProfileForm.appendChild(labelLastname);
                editProfileForm.appendChild(labelEmail);
                editProfileForm.appendChild(labelProfilePic);
                editProfileForm.appendChild(submitButton);

                divEditContent.appendChild(editProfileForm);

                editContainer.appendChild(divEditTitle);
                editContainer.appendChild(divEditContent);

                mainContentDiv.appendChild(editContainer);
            }

        }
    }

    xmlhttp.open("GET", "/index.php?action=otherprofile&email=" + name ,true);
    xmlhttp.send();

    evt.preventDefault();

}


document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('loginAvatar')) {
        document.getElementById('loginAvatar').addEventListener('click', loadMyProfile, false);
    }


}, false);

function loadMyProfile(){

    window.location = "/index.php?action=myprofile";
}

