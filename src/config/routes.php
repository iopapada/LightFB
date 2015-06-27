<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 18/5/2015
 * Time: 2:03 μμ
 */
//----------------------------------GET------------------------------------
if(!isset($_GET['action']) && empty($_POST)) {
    Map::get('/', 'app#index');
}
else if(isset($_GET['action']) && $_GET['action'] == 'myprofile') {
    Map::get('/', 'mypage#profile');
}
else if(isset($_GET['action']) && $_GET['action'] == 'logout') {
    Map::get('/', 'welcome#logout');
}
//----------------------------------POST------------------------------------
else if(isset($_POST['username']) && isset($_POST['pass'])){
    Map::post('/', 'app#signin');
}
else if(isset($_POST['FirstName']) && isset($_POST['LastName']) && isset($_POST['Email']) && isset($_POST['Password'])) {
    Map::post('/', 'app#signup');
}
//-----------------------------------AJAX----------------------------------
else if(isset($_GET['action']) && substr($_GET['action'],0,12) == 'otherprofile') {
    Map::ajax('/', 'mypage#otherprofile');
}
else if(isset($_GET['action']) && substr($_GET['action'],0,6) == 'search') {
    Map::ajax('/', 'welcome#search');
}
else if(isset($_GET['action']) && substr($_GET['action'],0,17) == 'sendFriendRequest') {
    Map::ajax('/', 'mypage#sendFriendRequest');
}
else if(isset($_GET['action']) && substr($_GET['action'],0,17) == 'getFriendRequests') {
    Map::ajax('/', 'mypage#getFriendRequests');
}
else if(isset($_POST['addPost'])) {
    Map::ajax('/', 'welcome#addPost');
}
//---------------------------------------------------------------------------



