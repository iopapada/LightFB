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
    <script src="/src/scripts/pollingAjax.js"></script>
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
        <div id="main_content">
            <div id="editContainer">
                <div id="editTitle">Edit your Profile</div>
                <div id="editContent">
                    <form name="editProfileForm" method="post" action="/index.php?action=submiteditprofile" enctype="multipart/form-data">
                        <label>Your Registered Firstname: <input name="Firstname" type="text"></label>
                        <label>Your Registered Lastname: <input name="Lastname" type="text"></label>

                        <label>Your Current Profile Picture:
                            <img id="imgProfile" src="null" alt="Profile Picturevyz@gmail.com">
                            <input type="file" id="profile-select" name="avatarfile">
                        </label>
                        <label>Your Current Cover Picture:
                            <img id="imgProfile" src="null" alt="Profile Picturevyz@gmail.com">
                            <input type="file" id="coverfile-select" name="coverfile"></label>
                        <input type="submit" value="Update Profile" name="update">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include_once('src/app/views/layouts/footer_master.html.php'); ?>
</body>
</html>