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

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {

            var arr = JSON.parse(xmlhttp.responseText);
            var i;

            var searchDiv = document.getElementById("searchResults");
            var listSearch = document.createElement("ul");

            for(i=0; i < arr.length; i++){
                var searchItems = document.createElement("li");
                var itemAnchor = document.createElement("a");
                itemAnchor.setAttribute('href',"/index.php?action=otherprofile?email=" +arr[i].email);
                itemAnchor.innerHTML = arr[i].firstname + " " + arr[i].lastname;
                searchItems.appendChild(itemAnchor);
                listSearch.appendChild(searchItems);
            }

            searchDiv.appendChild(listSearch);
        }
    }

    xmlhttp.open("GET","/index.php?action=search?searchExpr=" + searchExpr,true);
    xmlhttp.send();
}