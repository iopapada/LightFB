<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 18/5/2015
 * Time: 2:03 μμ
 */

if(!isset($_GET['action']) && empty($_POST)) {
    Map::get('/', 'app#index');
    Map::resource('app');
}
else if(isset($_GET['action']) && $_GET['action'] == 'myprofile') {
    Map::get('/', 'mypage#profile');
    Map::resource('mypage');
}
else if(isset($_GET['action']) && $_GET['action'] == 'search') {
    Map::post('/', 'welcome#search');
    Map::resource('welcome');
}

//----------------------------------------------------------------------

else if(isset($_POST['username']) && isset($_POST['pass'])){
    Map::post('/', 'app#signin');
    Map::resource('app');
}
else if(isset($_POST['FirstName']) && isset($_POST['LastName']) && isset($_POST['Email']) && isset($_POST['Password'])) {
    Map::post('/', 'app#signup');
    Map::resource('app');
}
else if(isset($_POST['addPost'])) {
    Map::post('/', 'welcome#addPost');
    Map::resource('welcome');
}
//Map::get('/', 'welcome#logout');
//Map::resource('welcome');
