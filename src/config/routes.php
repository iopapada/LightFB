<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 18/5/2015
 * Time: 2:03 μμ
 */

Map::get('/', 'app#index');
Map::resource('app');
if(isset($_POST['Username']) && isset($_POST['Password'])){
    Map::post('/', 'app#signin');
    Map::resource('app');
}
else {
    Map::post('/', 'app#signup');
    Map::resource('app');
}

//Map::get('/', 'welcome#logout');
//Map::resource('welcome');
