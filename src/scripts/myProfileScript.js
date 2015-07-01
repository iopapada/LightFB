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

            deleteOtherElements();

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

                var mainContentDiv = document.getElementById('main_content');
                mainContentDiv.appendChild(postStatusDiv);

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
            deleteOtherElements();
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
    var allalbums;


    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var arr = JSON.parse(xmlhttp.responseText);
            allalbums = arr;
            var lastrow=0;
            deleteOtherElements();
            var allphotos = document.createElement("div");
            allphotos.className = "allAlbums";
            allphotos.setAttribute('id','albumResults');

            var tbl = document.createElement("table");
            tbl.setAttribute("id",'displayAllAlbums');
            var tblBody = document.createElement("tbody");

            var row;
            arr.unshift('addalbum');
            for (var i = 0; i < arr.length; i++) {
                if((i+1)%4 === 1 || i==0) {
                    lastrow++;
                    console.log(lastrow);
                    row= document.createElement("tr");
                    row.setAttribute("id",lastrow);
                }
                var cell = document.createElement("td");
                var img = document.createElement('img');
                var imgname = document.createElement('p');
                if(i==0){
                    img.setAttribute("src", "src/content/images/plus.png");
                    img.setAttribute("id",'addalbum');
                    imgname.innerHTML = 'Add Album';

                }
                else{
                    img.setAttribute("src", "src/content/images/folder.png");
                    img.setAttribute("id",arr[i]['albname']);

                    imgname.innerHTML = arr[i]['albname'];
                }

                cell.appendChild(img);
                cell.appendChild(imgname);
                row.appendChild(cell);
                if((i+1)%4 === 0 || i+1===arr.length)
                {
                    tblBody.appendChild(row);
                }
            }

            tbl.appendChild(tblBody);
            allphotos.appendChild(tbl);

            mainContentDiv =  document.getElementById('main_content');
            mainContentDiv.appendChild(allphotos);

            for (var i = 1; i < arr.length; i++) {
                document.getElementById(arr[i]['albname']).addEventListener('click', function (e) {
                    if (document.getElementById("upform")!= null) {
                        var uploadf = document.getElementById("upform");
                        uploadf.parentNode.removeChild(uploadf);
                    }
                    var targetfolder = e.currentTarget.id;
                    //<form id="upload" style="padding-top: 66px" action="index.php" method="post" enctype="multipart/form-data" hidden="hidden" on>
                    //Select image to upload:
                    //    <input type="file" name="fileToUpload" id="fileToUpload">
                    //<input type="submit" value="UploadImage" name="submit">
                    //<input type="text" name="folderToUpload" id="folderToUpload" readonly="true" style="background-color: #3a5795; border: none; color: white">
                    //</form>

                    //loadOnMainContainer(e,arr[i]['albname']);

                    var allbuttons = document.getElementById('profileButtons');
                    var uploadform = document.createElement('form');
                    uploadform.setAttribute("id",'upform');
                    uploadform.innerHTML = "Select image to upload into album " + targetfolder + ": ";
                    uploadform.enctype = "multipart/form-data";
                    uploadform.method = "post";
                    uploadform.action = "/index.php?action=uploadphoto";

                    var inputfile = document.createElement('input');
                    inputfile.type = "file";
                    inputfile.name="photoToUpload";
                    inputfile.id="photoToUpload";
                    inputfile.required = "true";
                    uploadform.appendChild(inputfile);

                    var inputfolder = document.createElement('input');
                    inputfolder.name = "folder";
                    inputfolder.value = targetfolder;
                    inputfolder.setAttribute("hidden","hidden");
                    uploadform.appendChild(inputfolder);

                    var inputsub = document.createElement('input');
                    inputsub.type = "submit";
                    inputsub.name = "Sub";
                    uploadform.appendChild(inputsub);

                    allbuttons.appendChild(uploadform);
                });
            }

            document.getElementById('addalbum').addEventListener('click', function (e) {
                var foldername = window.prompt("Give Unique Folder Name");
                //|| allalbums['albname'].contains(foldername)
                if(foldername==="") {
                    window.alert("invalid name");
                    return;
                }
                if(foldername==null){
                    return;
                }

                var xmlhttp2;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp2 = new XMLHttpRequest();
                }

                xmlhttp2.onreadystatechange = function () {
                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {

                        var tbl = document.getElementById('displayAllAlbums');
                        var row = document.getElementById(lastrow);

                        console.log(allalbums.length);
                        if((allalbums.length)%4 === 0) {
                            lastrow++;
                            row= document.createElement("tr");
                            row.setAttribute("id",lastrow);
                        }
                        allalbums.push(foldername);
                        var cell = document.createElement("td");
                        var newalbum = document.createElement('img');
                        var albumname = document.createElement('p');

                        newalbum.setAttribute("src", "src/content/images/folder.png");
                        newalbum.setAttribute("id",foldername);
                        albumname.innerHTML = foldername;

                        cell.appendChild(newalbum);
                        cell.appendChild(albumname);

                        row.appendChild(cell);
                        tbl.appendChild(row);
                    }

                }



                xmlhttp2.open("GET", "/index.php?action=createAlbum&albname="+foldername, true);
                xmlhttp2.send();
            });
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
            deleteOtherElements();
            var allphotos = document.createElement("div");
            allphotos.className = "allPhotos";
            allphotos.setAttribute('id','photoResults');

            var tbl = document.createElement("table");
            tbl.setAttribute("id",'displayAllImages');
            var tblBody = document.createElement("tbody");

            var row;
            for (var i = 0; i < arr.length; i++) {
                if((i+1)%4 === 1 || i==0) {
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
            allphotos.appendChild(tbl);

            mainContentDiv =  document.getElementById('main_content');
            mainContentDiv.appendChild(allphotos);
        }
    }

    xmlhttp.open("GET", "/index.php?action=loadAllMyPhotos&email="+email, true);
    xmlhttp.send();
}

function deleteOtherElements(){
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
    if (document.getElementById("photoResults")!= null){
        var photoDiv = document.getElementById("photoResults");
        photoDiv.parentNode.removeChild(photoDiv);
    }
    if (document.getElementById("albumResults")!= null){
        var albumDivDiv = document.getElementById("albumResults");
        albumDivDiv.parentNode.removeChild(albumDivDiv);
    }
    if (document.getElementById("upform")!= null){
        var upform = document.getElementById("upform");
        upform.parentNode.removeChild(upform);
    }
}