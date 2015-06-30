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
    <script src="src/scripts/myProfileScript.js"></script>
</head>
<body>
<?php include_once('src/app/views/layouts/header_master.html.php'); ?>
<div id="main_area">

    <li>
        <a href="index.php?action=myprofile">My Profile</a>
    </li>
    <li>
        <a href="index.php?action=editprofile&name=<?php echo $_SESSION['user_id']?>"  >Edit My Profile</a>
    </li>

    <li>
        <a href="index.php?action=myprofile">My Profile</a>
    </li>
    <li>
        <a href="index.php?action=editprofile&name=<?php echo $_SESSION['user_id']?>"  >Edit My Profile</a>
    </li>




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
</body>
</html>