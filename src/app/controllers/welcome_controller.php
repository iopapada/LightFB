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
        $searchExpr = $_GET['searchExpr'];
        $rows = db_query_select("SELECT email,firstname,lastname,pictureURL FROM userprofile WHERE firstname LIKE '$searchExpr%' or lastname LIKE '$searchExpr%' ");

        for($x = 0; $x<count($rows); $x++){
            $rows[$x]['pictureURL'] = base64_encode($rows[$x]['pictureURL']);
        }
        return json_encode($rows);
    }

    public static function loadFriendsPosts()
    {
        session_start();
        $em = $_SESSION['user_id'];
        $results= db_query_select("SELECT results.* FROM (SELECT DISTINCT actions.*, userprofile.firstname, userprofile.lastname, userprofile.pictureURL
                                   FROM(SELECT userid AS us,friendid AS fr
                                        FROM friends
                                        WHERE (friends.userid = '$em' OR friends.friendid = '$em' ) AND friends.approved ='1') AS temp
                                   INNER JOIN actions on actions.userid = temp.us OR actions.userid = temp.fr
                                   INNER JOIN userprofile on userprofile.email = actions.userid
                                   UNION
                                   SELECT actions.*, userprofile.firstname, userprofile.lastname, userprofile.pictureURL FROM actions
                                   INNER JOIN userprofile on userprofile.email = actions.userid
                                   WHERE actions.userid = '$em') as results
                                   ORDER BY results.timepost ASC ");

        for($x = 0; $x<count($results); $x++){
            $results[$x]['pictureURL'] = base64_encode($results[$x]['pictureURL']);
        }
        return json_encode($results);
        session_write_close();
    }

    public static function loadMyPosts()
    {
        session_start();
        $id = $_GET['email'];
        $results= db_query_select("SELECT actions.*, userprofile.firstname, userprofile.lastname, userprofile.pictureURL FROM actions
                                   INNER JOIN userprofile on userprofile.email = actions.userid
                                   WHERE actions.userid = '$id'");

        for($x = 0; $x<count($results); $x++){
            $results[$x]['pictureURL'] = base64_encode($results[$x]['pictureURL']);
        }
        return json_encode($results);
        session_write_close();
    }

    public static function addPost()
    {
        session_start();
        $mail = $_SESSION['user_id'];
        $messageVal = $_GET['message'];
        db_query_select("INSERT INTO actions (message,title,messagetype,userid) VALUES ('$messageVal','','text','$mail')");
        session_write_close();
    }

    public static function logout()
    {
        session_start();
        $_SESSION=array();
        session_destroy();
        return true;
    }

}