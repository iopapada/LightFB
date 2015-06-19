document.addEventListener('DOMContentLoaded', function() {

    function checkFriendRequests(){

        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                alert('ok working!');

            }
        }

        xmlhttp.open("GET", "" + name ,true);
        xmlhttp.send();

        setTimeout(checkFriendRequests, 1000);
    }

    checkFriendRequests();

}, false);


