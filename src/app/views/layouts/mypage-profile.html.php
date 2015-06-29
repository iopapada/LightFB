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
                <?php
                session_start();
                $rows = db_query_select_one("SELECT pictureURL, pictureCoverURL FROM userprofile WHERE id = $_COOKIE[id]");
                $tempavatar = base64_encode( $rows['pictureURL'] );
                $tempacover = base64_encode( $rows['pictureCoverURL'] );
                echo "<img id='mediumAvatar' src='data:image/jpeg;base64,$tempavatar'>";
                echo "<img id='Cover' src='data:image/jpeg;base64,$tempacover'>";
                session_write_close();
                ?>
            </div>
            <div id="profileName">

            </div>
            <div id="profileButtons">
                <button type="button" class="button" id="timelineBtn" email=<?php echo $_SESSION['user_id']?>>Timeline</button>
                <button type="button" class="button" id="friendsBtn" email=<?php echo $_SESSION['user_id']?>>Friends</button>
                <button type="button" class="button" id="albumsBtn" email=<?php echo $_SESSION['user_id']?>>Albums</button>
                <button type="button" class="button" id="photosBtn" email=<?php echo $_SESSION['user_id']?>>Photos</button>
            </div>
        </div>
        <div id="postStatus">
            <div id="inputform">
                <textarea class="postText" id="statusText" name="postTextarea" placeholder="Post your Status to LightFB"></textarea>
            </div>
            <div id="statusButtons">
                <button type="button" class="button postbtn" id="postBtn">Post</button>
            </div>
        </div>
        <div id="statusUpdates">

        </div>
    </div>
</div>
    <?php include_once('src/app/views/layouts/footer_master.html.php'); ?>
</body>
</html>