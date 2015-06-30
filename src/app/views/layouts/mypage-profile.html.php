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
    <link rel="icon" href="src/content/images/fav.png" type="image/x-icon"/>
    <script src="src/scripts/ajaxRequests.js"></script>
    <script src="src/scripts/pollingAjax.js"></script>
    <script src="src/scripts/myProfileScript.js"></script>
</head>
<body>
<?php include_once('src/app/views/layouts/header_master.html.php'); ?>
<div id="main_area">
    <?php include_once('src/app/views/layouts/left_master.html.php'); ?>
    <div id="main_content">
        <div id="profileHeader">
                <?php
                include_once APP_PATH . 'models/DAO.php';
                session_start();
                $rows = db_query_select_one("SELECT pictureURL, pictureCoverURL FROM userprofile WHERE id = $_COOKIE[id]");
                $tempavatar = base64_encode( $rows['pictureURL'] );
                $tempacover = base64_encode( $rows['pictureCoverURL'] );
                echo "<img id='mediumAvatar' alt='avatar' src='data:image/jpeg;base64,$tempavatar'>";
                echo "<img id='Cover' alt='cover' src='data:image/jpeg;base64,$tempacover'>";
                session_write_close();
                ?>
            <div id="profileName">

            </div>
        </div>
        <div id="profileButtons">
            <button type="button" class="button" id="timelineBtn" email=<?php echo $_SESSION['user_id']?>>Timeline</button>
            <button type="button" class="button" id="friendsBtn" email=<?php echo $_SESSION['user_id']?>>Friends</button>
            <button type="button" class="button" id="albumsBtn" email=<?php echo $_SESSION['user_id']?>>Albums</button>
            <button type="button" class="button" id="photosBtn" email=<?php echo $_SESSION['user_id']?>>Photos</button>
        </div>
        <div id="postStatus">
            <div id="inputform">
                <textarea class="postText" id="statusText" name="postTextarea" placeholder="Post your Status to LightFB"></textarea>
            </div>
            <div id="statusButtons">
                <button type="button" class="button postbtn" id="postBtn">Post</button>
            </div>
        </div>
        <div id="statusMyUpdates">

        </div>
    </div>
</div>

</body>
</html>