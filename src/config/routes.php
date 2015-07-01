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
else if(isset($_GET['action']) && $_GET['action'] == 'editprofile') {
    Map::get('/', 'editmypage#editprofile');
}
else if(isset($_GET['action']) && $_GET['action'] == 'logout') {
    Map::get('/', 'welcome#logout');
}
else if(isset($_GET['action']) && $_GET['action'] == 'welcome'){

    session_start();
    if(array_key_exists('user_id',$_SESSION))
        include_once('src/app/views/layouts/app-signin.html.php');
    else
        include_once('src/app/views/layouts/index.html.php');
    session_write_close();
}
else if(isset($_GET['action']) && $_GET['action'] == 'myprofile'){

    session_start();
    if(array_key_exists('user_id',$_SESSION))
        include_once('src/app/views/layouts/mypage-profile.html.php');
    else
        include_once('src/app/views/layouts/index.html.php');
    session_write_close();
}
//----------------------------------POST------------------------------------
else if(isset($_POST['username']) && isset($_POST['pass'])){
    Map::post('/', 'app#signin');
}
else if(isset($_POST['FirstName']) && isset($_POST['LastName']) && isset($_POST['Email']) && isset($_POST['Password'])) {
    Map::post('/', 'app#signup');
}
else if(isset($_POST['update']) && $_POST['update'] == 'Update Profile') {
    Map::post('/', 'editmypage#submiteditprofile');
}
else if(isset($_POST['Sub']) && $_POST['Sub'] == 'Submit' && $_GET['action'] == 'uploadphoto') {
    Map::post('/', 'mypage#uploadPhotos');
}
//-----------------------------------AJAX GET----------------------------------
else if(isset($_GET['action']) && $_GET['action'] == 'otherprofile') {
    Map::ajax('/', 'mypage#otherprofile');
}
else if(isset($_GET['action']) && $_GET['action'] == 'search') {
    Map::ajax('/', 'welcome#search');
}
else if(isset($_GET['action']) && $_GET['action'] == 'sendFriendRequest') {
    Map::ajax('/', 'mypage#sendFriendRequest');
}
else if(isset($_GET['action']) && $_GET['action'] == 'getFriendRequests') {
    Map::ajax('/', 'mypage#getFriendRequests');
}
else if(isset($_GET['action']) && $_GET['action'] == 'confirmFriendRequests') {
    Map::ajax('/', 'mypage#confirmFriendRequests');
}
else if(isset($_GET['action']) && $_GET['action'] == 'addPost') {
    Map::ajax('/', 'welcome#addPost');
}
else if(isset($_GET['action']) && $_GET['action'] == 'loadMyPosts') {
    Map::ajax('/', 'welcome#loadMyPosts');
}
else if(isset($_GET['action']) && $_GET['action'] == 'loadFriendsPosts') {
    Map::ajax('/', 'welcome#loadFriendsPosts');
}
else if(isset($_GET['action']) && $_GET['action'] == 'loadAllMyAlbums') {
    Map::ajax('/', 'mypage#loadAllMyAlbums');
}
else if(isset($_GET['action']) && $_GET['action'] == 'createAlbum') {
    Map::ajax('/', 'mypage#createAlbum');
}
else if(isset($_GET['action']) && $_GET['action'] == 'loadAllMyPhotos') {
    Map::ajax('/', 'mypage#loadAllMyPhotos');
}
else if(isset($_GET['action']) && $_GET['action'] == 'loadFriends') {
    Map::ajax('/', 'mypage#loadFriends');
}
else if(isset($_GET['action']) && $_GET['action'] == 'addLike') {
    Map::ajax('/', 'welcome#addLike');
}
//-------------------------------------AJAX POST------------------------------------




