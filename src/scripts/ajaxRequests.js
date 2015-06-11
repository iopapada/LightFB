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
            xmlDoc=xmlhttp.responseXML;
            txt="";
            x=xmlDoc.getElementsByTagName("USER");
            for (i=0;i<x.length;i++)
            {
                txt=txt + x[i].childNodes[0].nodeValue + "<br>";
            }
            document.getElementById("searchResults").innerHTML=txt;
        }
    }
    xmlhttp.open("GET","/index.php?action=search?searchExpr=" + searchExpr,true);
    xmlhttp.send();
}