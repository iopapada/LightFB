<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 7/6/2015
 * Time: 12:59 μμ
 */

include APP_PATH . 'models/DAO.php';
class MypageController {

    public static function profile()
    {
        return true;
    }

    public static function otherprofile()
    {
        $path = explode('?', $_GET['action']);
        $mail = explode('=',$path[1]);
        $rows = db_query_select("SELECT firstname,lastname,email,pictureURL,birth,gender, homelocation, currentlocation FROM userprofile WHERE email = '$mail[1]' ");
        return json_encode($rows);
    }

    public static function sendFriendRequest()
    {
        session_start();
        $userid = $_SESSION['user_id'];
        $path = explode('?', $_GET['action']);
        $friendid = explode('=',$path[1]);
        $res = db_query("INSERT INTO friends (friendid,userid) VALUES ('$friendid[1]','$userid')");
        session_write_close();
    }

    public static function updateInfo()
    {

    }

    public static function loadFriends()
    {

    }

    public static function loadMyPhotos()
    {

    }
}