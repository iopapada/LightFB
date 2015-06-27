document.addEventListener('DOMContentLoaded', function() {

    function getFriendRequests(){

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var arr = JSON.parse(xmlhttp.responseText);

                alert('ok working!');

            }
        }

        xmlhttp.open("GET", "/index.php?action=getFriendRequests", true);
        xmlhttp.send();
    };

    setInterval(getFriendRequests, 5000);

    var editProfileLink = document.getElementById('editProfile');
    editProfileLink.addEventListener('click',showEditProfile,false);

}, false);
