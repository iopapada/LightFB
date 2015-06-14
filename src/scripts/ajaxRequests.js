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
    while (searchDiv.hasChildNodes()) {
        searchDiv.removeChild(searchDiv.firstChild);
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

        }
    }
    xmlhttp.open("GET",href,true);
    xmlhttp.send();

}

