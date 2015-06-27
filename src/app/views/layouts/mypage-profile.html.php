<!DOCTYPE html>
<?php
$auth = $_COOKIE['authorization'];
header ("Cache-Control:no-cache");
if(!$auth == "ok") {
    exit();
}
?>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>LightFB</title>
    <link rel="stylesheet" type="text/css" href="src/content/SiteIndex.css">
    <script src="src/scripts/ajaxRequests.js"></script>
    <script src="src/scripts/pollingAjax.js"></script>
</head>
<body>
<div class="header signed">
    <div id="header_elements_container">
        <div class="fblight_logo">
            <a href="index.php">LightFB</a>
        </div>
        <div class="searchFB">
            <form name="searchform" action="/index.php" id="global-search">
                <input name="search" id="search-query" type="text" placeholder="Search in LightFB" >
                <span class="search icon">
                    <button type="button" onclick="mainSearch()" class="search-icon" tabindex="-1">
                        Search
                    </button>
                </span>
            </form>
        </div>
        <div class="fb-updates">
            <a href="#" id="friendRequestAnchor" >
            <div id="friend-Requests">
                Friend Requests:
                    <span id="friendRequestsCount"></span>
            </div>
            </a>
        </div>
        <div class="login_container">
            <div id="loginUser">
                Logged in as: <?php session_start(); echo $_SESSION['fullname']; session_write_close(); ?>
            </div>
            <div id="logout">
                <a href="/index.php?action=logout">Logout</a>
            </div>
        </div>
    </div>
</div>
<div id="main_area">
    <div id="leftbar">
        <ul>
            <h2>My Personal Information</h2>
            <li>
                <a href="index.php?action=myprofile">My Profile</a>
            </li>
            <li>
                <a href="index.php?action=editprofile&name=<?php echo $_SESSION['user_id']?>"  >Edit My Profile</a>
            </li>
            <h2>Groups</h2>
            <li>
                <a href="">My Groups</a>
            </li>
        </ul>
    </div>
    <div id="main_content">
        <div id="profileHeader">
            <div id="profilePic">

            </div>
            <div id="profileName">

            </div>
            <div id="profileButtons">
                <button type="button" onclick="sendFriendRequest()" id="friendButton" class="button friendBtn">Add Friend</button>
            </div>
        </div>
        <div id="postStatus">
            <div id="inputform">
                <textarea id="statusText" name="postTextarea" placeholder="Post your Status to LightFB"></textarea>
            </div>
            <div id="statusButtons">
                <button type="button" class="button postbtn" >Post</button>
            </div>
        </div>
        <div id="statusUpdates">

        </div>
    </div>
</div>
<div id="footer">
    <div id="footer-inner">
        <div id="copyright">
            LightFB © 2015
        </div>
    </div>
</div>
</body>
</html>