<div class="header signed">
    <div id="header_elements_container">
        <div class="fblight_logo" id="fblogo">
            <a href="#">LightFB</a>
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
            <a href="#" id="friendRequestAnchor">
                <div id="friend-Requests">
                    Friend Requests:
                    <span id="friendRequestsCount"></span>
                </div>
            </a>
        </div>
        <div class="login_container">
            <div id="loginAvatar">
            <?php
                include_once APP_PATH . 'models/DAO.php';
                if(!isset($_SESSION))session_start();
                $rows = db_query_select_one("SELECT pictureURL FROM userprofile WHERE id = $_SESSION[id]");
                $tempimg = base64_encode( $rows['pictureURL'] );
                echo "<img id='smallAvatar' src='data:image/jpeg;base64,$tempimg'>";
                session_write_close();
            ?>
            </div>
            <div id="loginUser">
                <?php  echo $_SESSION['fullname']; session_write_close();?>
            </div>
            <div id="logout">
                <a href="/index.php?action=logout">Logout</a>
            </div>
        </div>
    </div>
</div>