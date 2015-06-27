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
            <div id="friend-Requests">
                Friend Requests:
                <a href="#">
                    <span id="count"></span>
                </a>
            </div>
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
<div id="footer">
    <div id="footer-inner">
        <div id="copyright">
            LightFB © 2015
        </div>
    </div>
</div>
</body>
</html>