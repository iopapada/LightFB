<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>LightFB</title>
    <link rel="stylesheet" type="text/css" href="src/content/SiteIndex.css">
    <script src="src/scripts/Validations.js"></script>
</head>
<body>
<div id="header_bar">
    <div id="header_elements_container">
        <div class="fblight_logo">
            <h1><a href="index.html.php">LightFB</a></h1>
        </div>
        <div class="searchFB">
            <form action="/index.php" id="global-search">
                <input name="search" id="search-query" type="text" placeholder="Search in LightFB" >
                <span class="search icon">
                    <button type="submit" class="search-icon" tabindex="-1">
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
        /*Profile
        Edit Profile
        Groups*/
    </div>
    <div id="main_content">
        <div id="postStatus">
            <div id="inputform">
                <form name="statusForm" method="post" action="index.php">
                    <input name="addPost" type="text" placeholder="Post your status to LightFB" required="true" aria-required="true">
                </form>
            </div>
            <div id="statusButtons">
                <button type="submit" id="submit_btn">Post</button>
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