function sendFriendRequest(){

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("friendButton").value="Friend Request Send!";
        }
    }
    xmlhttp.open("GET","/index.php?action=friendRequest",true);
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
                var itemAnchor = document.createElement("a");
                itemAnchor.setAttribute('class', "anchorSearch");
                itemAnchor.setAttribute('href',"/index.php?action=otherprofile?email=" +arr[i].email);
                itemAnchor.innerHTML = arr[i].firstname + " " + arr[i].lastname;
                searchItems.appendChild(itemAnchor);
                listSearch.appendChild(searchItems);

            }

            searchDiv.appendChild(listSearch);

            var aTags = document.getElementsByClassName("anchorSearch");

            for (var i=0; i<aTags.length; i++){

                var href=aTags[i].href.valueOf();
                aTags[i].addEventListener("click", function(e){e.stopPropagation();e.preventDefault();loadProfile(href);},false);
            }
        }


    }

    xmlhttp.open("GET","/index.php?action=search?searchExpr=" + searchExpr,true);
    xmlhttp.send();

}

function loadProfile(href){

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
            profileImg.setAttribute('src', arr[0].pictureURL);
            profileImg.setAttribute('alt',"Profile Picture" + arr[0].email);


            divProfilePic.appendChild(profileImg);
            divProfileHeader.appendChild(divProfilePic);

            var divProfileName = document.createElement("div");
            divProfileName.setAttribute('id', "profileName");
            divProfileName.innerHTML = arr[0].firstname + " " +arr[0].lastname;

            divProfilePic.appendChild(divProfileName);

            var divProfileButtons = document.createElement("div");
            divProfileButtons.setAttribute('id', "profileButtons");

            var addFriendBtn = document.createElement("button");
            addFriendBtn.setAttribute('type',"button");
            addFriendBtn.setAttribute('id', "friendButton");
            addFriendBtn.setAttribute('class',"button friendBtn");
            addFriendBtn.innerHTML = "Add Friend";

            divProfileButtons.appendChild(addFriendBtn);
            divProfilePic.appendChild(divProfileButtons);

            mainContentDiv.appendChild(divProfileHeader);

            var addFriendButton = document.getElementById("friendButton");

            addFriendButton.addEventListener("click", function(e){e.stopPropagation();e.preventDefault();addFriendReq();},false);

        }
    }
    xmlhttp.open("GET",href,true);
    xmlhttp.send();
}

function addFriendReq(){
    var addFriendButton = document.getElementById("friendButton");
    addFriendButton.innerHTML = "Request Sent!";
    addFriendButton.style.backgroundColor = "grey";
}

document.addEventListener('DOMContentLoaded', function() {

    var editProfileLink = document.getElementById('editProfile');
    editProfileLink.addEventListener('click',showEditProfile,false);

}, false);

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

                /*Create a form to populate with JSON*/
                var editProfileForm = document.createElement("form");
                editProfileForm.setAttribute('name', "editProfileForm");
                editProfileForm.setAttribute('method', "post");
                editProfileForm.setAttribute('action', "");

                /*Create a label for input */
                var labelFirstname = document.createElement("label");
                labelFirstname.innerHTML = "Your Registered Firstname: ";

                /*Create input*/
                var inputFirstname = document.createElement("input");
                inputFirstname.setAttribute('name', "Firstname");
                inputFirstname.setAttribute('type', "text");
                inputFirstname.setAttribute('required', "true");
                inputFirstname.value = arr[0].firstname;

                labelFirstname.appendChild(inputFirstname);

                /*Create a label for input */
                var labelLastname = document.createElement("label");
                labelLastname.innerHTML = "Your Registered Lastname: ";

                /*Create input*/
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

                labelProfilePic.appendChild(imgProfile);

                editProfileForm.appendChild(labelFirstname);
                editProfileForm.appendChild(labelLastname);
                editProfileForm.appendChild(labelEmail);
                editProfileForm.appendChild(labelProfilePic);
                divEditContent.appendChild(editProfileForm);

                editContainer.appendChild(divEditTitle);
                editContainer.appendChild(divEditContent);

                mainContentDiv.appendChild(editContainer);
            }

        }
    }

    xmlhttp.open("GET", "/index.php?action=otherprofile?email=" + name ,true);
    xmlhttp.send();

    evt.preventDefault();

}

