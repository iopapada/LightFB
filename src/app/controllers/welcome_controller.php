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

    public static function search()
    {
        $searchExpr = explode('=', $_GET['action']);
        $rows = db_query_select("SELECT email,firstname,lastname,pictureURL FROM userprofile WHERE firstname LIKE '$searchExpr[1]%' or lastname LIKE '$searchExpr[1]%' ");
        return json_encode($rows);
    }

    public static function loadFriendsPosts()
    {

    }

    public static function addPost()
    {

    }

}