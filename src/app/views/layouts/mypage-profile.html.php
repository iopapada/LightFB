<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>LightFB</title>
    <link rel="stylesheet" type="text/css" href="src/content/SiteIndex.css">
    <script src="src/scripts/ajaxRequests.js"></script>
</head>
<body>
<div class="header signed">
    <div id="header_elements_container">
        <div class="fblight_logo">
            <a href="index.php">LightFB</a>
        </div>
        <div class="searchFB">
            <form action="/index.php" id="global-search">
                <input name="search" id="search-query" type="text" placeholder="Search in LightFB" >
                <span class="search icon">
                    <button type="button" onclick="mainSearch()" class="search-icon" tabindex="-1">
                        Search
                    </button>
                </span>
            </form>
        </div>
        <div class="login_container">
            Logged in as
        </div>
    </div>
</div>
<div id="main_area">
    <div id="leftbar">
        <ul>
            <h2>My Personal Information</h2>
            <li>
                <a href="">My Profile</a>
            </li>
            <li>
                <a href="">Edit My Profile</a>
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
<div id="footer_bar">
    <div id="copyright">
        <p>LightFB © 2015</p>
    </div>
</div>
</body>
</html>