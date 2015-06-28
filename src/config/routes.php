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
else if($_GET['action'] == 'myprofile') {
    Map::get('/', 'mypage#profile');
}
else if($_GET['action'] == 'editprofile') {
    Map::get('/', 'editmypage#editprofile');
}
else if($_GET['action'] == 'logout') {
    Map::get('/', 'welcome#logout');
}
//----------------------------------POST------------------------------------
else if(isset($_POST['username']) && isset($_POST['pass'])){
    Map::post('/', 'app#signin');
}
else if(isset($_POST['FirstName']) && isset($_POST['LastName']) && isset($_POST['Email']) && isset($_POST['Password'])) {
    Map::post('/', 'app#signup');
}
else if($_POST['update'] == 'Update Profile') {
    Map::post('/', 'editmypage#submiteditprofile');
}
//-----------------------------------AJAX GET----------------------------------
else if($_GET['action'] == 'otherprofile') {
    Map::ajax('/', 'mypage#otherprofile');
}
else if($_GET['action'] == 'search') {
    Map::ajax('/', 'welcome#search');
}
else if($_GET['action'] == 'sendFriendRequest') {
    Map::ajax('/', 'mypage#sendFriendRequest');
}
else if($_GET['action'] == 'getFriendRequests') {
    Map::ajax('/', 'mypage#getFriendRequests');
}
else if($_GET['action'] == 'confirmFriendRequests') {
    Map::ajax('/', 'mypage#confirmFriendRequests');
}
else if($_GET['action'] == 'addPost') {
    Map::ajax('/', 'welcome#addPost');
}
else if($_GET['action'] == 'loadMyPosts') {
    Map::ajax('/', 'welcome#loadMyPosts');
}
else if($_GET['action'] == 'loadFriendsPosts') {
    Map::ajax('/', 'welcome#loadFriendsPosts');
}
//-------------------------------------AJAX POST------------------------------------




