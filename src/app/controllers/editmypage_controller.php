<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 27/6/2015
 * Time: 3:28 μμ
 */

include APP_PATH . 'models/DAO.php';
class EditmypageController {

    public static function editprofile()
    {
        return true;
    }
    public static function submiteditprofile()
    {
        session_start();
        $userid = $_SESSION['user_id'];

        $profile = $_FILES['avatarfile']['tmp_name'];
        $blobprofile = "";
        if(!empty($profile)) $blobprofile = mysql_real_escape_string(file_get_contents($profile));

        $cover = $_FILES['coverfile']['tmp_name'];
        $blobcover = "";
        if(!empty($cover)) $blobcover = mysql_real_escape_string(file_get_contents($cover));

        $first = $_POST['Firstname'];
        $last = $_POST['Lastname'];

        db_query("UPDATE userprofile SET firstname = '$first', lastname = '$last', pictureURL = '$blobprofile', pictureCoverURL = '$blobcover'  WHERE email = '$userid'");
//        include ('src/app/views/layouts/app-signin.html.php');
//        return false;

        session_write_close();
    }

}