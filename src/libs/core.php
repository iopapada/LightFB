<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 26/5/2015
 * Time: 10:21 μμ
 */

if( !empty($_POST['_method']) && in_array($_POST['_method'], array('put', 'delete')) ) {
    $_SERVER['REQUEST_METHOD'] = strtoupper($_POST['_method']);
}

include 'controller.php';
include 'reception.php';
include 'router.php';

include BASE_PATH . 'src/config/routes.php';