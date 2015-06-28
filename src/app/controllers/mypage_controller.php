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
        session_start();
        $cursess = $_SESSION['user_id'];
        $path = explode('?', $_GET['action']);
        $mail = explode('=',$path[1]);
        $rows = db_query_select_one("SELECT firstname,lastname,email,pictureURL,pictureCoverURL,birth,gender, homelocation, currentlocation
                                     FROM userprofile WHERE email = '$mail[1]' ");

        $isfriends = db_query_select_one("SELECT * FROM friends
                                          WHERE ((friends.userid = '$mail[1]' && friends.friendid = '$cursess') || (friends.userid = '$cursess' && friends.friendid = '$mail[1]')) && friends.approved = '1'");

        if($mail[1] == $cursess)
            $rows += array("isfriend" => "2");
        else if(count($isfriends) > 0)
            $rows += array("isfriend" => "1");
        else
            $rows += array("isfriend" => "0");

        $rows['pictureURL'] = base64_encode($rows['pictureURL']);
        $rows['pictureCoverURL'] = base64_encode($rows['pictureCoverURL']);

        header("Content-type: image/jpeg; charset=UTF-8");
        session_write_close();

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

    public static function getFriendRequests()
    {
        session_start();
        $userid = $_SESSION['user_id'];
        $results= db_query_select("SELECT firstname,lastname,email,pictureURL FROM userprofile
                                       INNER JOIN friends ON userprofile.email = friends.userid
                                       WHERE friends.friendid = '$userid' && friends.approved = 0");

        session_write_close();
        return json_encode($results);
    }

    public static function confirmFriendRequests()
    {
        $temp = $_GET['id'];
        session_start();
        $userid = $_SESSION['user_id'];
        db_query("UPDATE friends SET approved = 1 WHERE friendid = '$userid' && userid = '$temp' ");
        session_write_close();
    }

    public static function loadFriends()
    {
        session_start();
        $userid = $_SESSION['user_id'];
        $results= db_query_select("SELECT firstname,lastname,email,pictureURL FROM userprofile
                                       INNER JOIN friends ON userprofile.email = friends.userid
                                       WHERE friends.friendid = '$userid' && friends.approved = 1");

        session_write_close();
        return json_encode($results);
    }

    public static function loadAllMyPhotos()
    {
        session_start();
        $userid = $_SESSION['user_id'];
        $results= db_query_select("SELECT img,imagename FROM images
                                       INNER JOIN albums ON albums.id = images.albumid
                                       INNER JOIN userprofile ON userprofile.email = '$userid'");

        for($x = 0; $x<count($results); $x++){
            $results[$x]['img'] = base64_encode($results[$x]['img']);
        }
        session_write_close();
        return json_encode($results);
    }

    public static function uploadPhotos()
    {

    }

    public static function loadAllMyAlbums()
    {
        session_start();
        $userid = $_SESSION['user_id'];
        $results= db_query_select("SELECT albname FROM albums
                                       WHERE userid = '$userid'");

        session_write_close();
        return json_encode($results);
    }

    public static function createAlbum()
    {

    }

    public static function loadPhotosOfAlbum()
    {
        session_start();
        $userid = $_SESSION['user_id'];
        $albname = $_GET['albname'];
        $results= db_query_select("SELECT img,imagename FROM images
                                       INNER JOIN albums ON albums.id = images.albumid
                                       INNER JOIN userprofile ON userprofile.email = '$userid'
                                       WHERE albums.albname = '$albname' ");

        for($x = 0; $x<count($results); $x++){
            $results[$x]['img'] = base64_encode($results[$x]['img']);
        }
        session_write_close();
        return json_encode($results);
    }
}