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
        session_start();
        $email = $_SESSION['user_id'];
        $results= db_query_select("SELECT * FROM actions
                                       INNER JOIN accounts ON actions.userid = userprofile.id
                                       INNER JOIN friends ON friends.userid = userprofile.id OR friends.friendid = userprofile.id
                                       WHERE userprofile.email = '$email' && friends.approved ='1'");
        return json_encode($results);
        session_write_close();
    }

    public static function addPost()
    {
        session_start();
        $id = $_SESSION['user_id'];
        $messageVal = $_GET['message'];
        $results= db_query_select("INSERT INTO actions (message,title,messagetype,userid) VALUES ('$messageVal','','text','$id')");
        return json_encode($results);
        session_write_close();
    }

    public static function logout()
    {
        session_start();
        $_SESSION=array();
        setcookie(session_name(), '', time() - 2592000, '/');
        session_destroy();
        return true;
    }

}