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

            var arr = JSON.parse(response);
            var i;
            var out = "<table>";

            for(i = 0; i < arr.length; i++) {
                out += "<tr><td>" +
                arr[i].firstname +
                "</td><td>" +
                arr[i].lastname +
                "</td><td>" +
                arr[i].pictureURL +
                "</td></tr>";
            }
            out += "</table>"

            document.getElementById("searchResults").innerHTML=out;
        }
    }
    xmlhttp.open("GET","/index.php?action=search?searchExpr=" + searchExpr,true);
    xmlhttp.send();
}