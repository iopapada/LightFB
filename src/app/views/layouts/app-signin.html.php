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
                Logged in as: <?php  echo $_SESSION['fullname']; session_write_close();?>
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
        <div id="searchResults" class="inOutWindow">

        </div>
        <div id="postStatus" class="inOutWindow">
            <div id="inputform">
                <textarea  class="postText" id="statusText" name="postTextarea" required placeholder="Post your Status to LightFB"></textarea>
            </div>
            <div id="statusButtons">
                <button type="button" class="button postbtn" id="postBtn">Post</button>
            </div>
        </div>
        <div id="statusUpdates" class="inOutWindow">

        </div>
    </div>
</div>
<?php include_once('src/app/views/layouts/footer_master.html.php'); ?>
</body>
</html>