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
            <div id="editContainer">
                <div id="editTitle">Edit your Profile</div>
                <div id="editContent">
                    <?php
                        session_start();
                        $rows = db_query_select_one("SELECT firstname,lastname,birth,gender,pictureURL,pictureCoverURL FROM userprofile WHERE id = $_COOKIE[id]");
                        $tempFirst = $rows['firstname'];
                        $tempLast = $rows['lastname'];
                        $tempBirth = $rows['birth'];
                        $tempGender = $rows['gender'];
                        $tempAvatar = base64_encode( $rows['pictureURL']);
                        $tempCover = base64_encode( $rows['pictureCoverURL']);
                        session_write_close();
                    ?>
                    <form name="editProfileForm" method="post" action="/index.php?action=submiteditprofile" enctype="multipart/form-data">
                        <label>Your Registered Firstname: <input name="Firstname" type="text" value="<?php echo $tempFirst; ?>"></label><br>
                        <label>Your Registered Lastname: <input name="Lastname" type="text" value="<?php echo $tempLast; ?>"></label><br>
                        <label>Your Registered Birth: </label><br>

                        <label>Your Registered Gender: </label><br>

                        <label>Your Current Profile Picture:
                            <img id="imgProfile" src="data:image/jpeg;base64,<?php echo $tempAvatar; ?>" alt="profile">
                            <input type="file" id="profile-select" name="avatarfile" value="<?php echo $tempAvatar; ?>"><br>
                        </label>
                        <label>Your Current Cover Picture:
                            <img id="imgProfile" src="data:image/jpeg;base64,<?php echo $tempCover; ?>" alt="cover">
                            <input type="file" id="coverfile-select" name="coverfile" value="<?php echo $tempCover; ?>"></label><br>
                        <input type="submit" value="Update Profile" name="update">
                    </form>
                </div>
        </div>
    </div>
</div>
<?php include_once('src/app/views/layouts/footer_master.html.php'); ?>
</body>
</html>