<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 27/5/2015
 * Time: 3:14 πμ
 */

include APP_PATH . 'models/DAO.php';
class WelcomeController extends Controller{

    public static function sendMessage()
    {

    }

    public static function search($searchExpr)
    {
        $rows = db_query_select("SELECT firstname,lastname FROM userprofile WHERE firstname = '$searchExpr.%' or lastname = '$searchExpr.%' LIMIT 10");
    }

    public static function loadFriendsPosts()
    {

    }

    public static function addPost()
    {

    }

}