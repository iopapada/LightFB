<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 18/5/2015
 * Time: 2:03 μμ
 */

Map::get('/', 'index#index');
Map::resource('index');
//Map::post('/', 'app#signin');
//Map::resource('app');
Map::post('/', 'app#signup');
Map::resource('app');


//Map::get('/', 'welcome#logout');
//Map::resource('welcome');
