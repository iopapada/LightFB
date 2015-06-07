<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 16/5/2015
 * Time: 10:03 μμ
 */

include APP_PATH . 'models/DAO.php';
class AppController extends Controller{
    //public $site_title = 'LikeFB';

    public function index() {
        //echo file_get_contents(APP_PATH ."/views/home/index.html");
    }

    public static function signin()
    {
        $user = $_POST['username'];
        $pass = $_POST['pass'];
        $res = self::validateSignInInfos($user, $pass);
        if($res === true){
            $res = self::authenticate($user,$pass);
            if($res === true){
                return true;
            }
            else{
                return $res;
            }
        }
        else{
            return $res;
        }
    }

    private static function validateSignInInfos($user, $pass){
        if($user != null && $pass != null) return true;
        else return 'signinerror1';
    }

    public static function authenticate($user_email, $user_pass, $remember = false)
    {
        $user_pass = sha1($user_pass);
        $rows = db_query_select("SELECT password FROM userprofile WHERE email = '$user_email'");

        if(count($rows)==1) {
            if($rows[0]['password'] == $user_pass) {
                session_start();
                $_SESSION['user_id'] = $user_email;
                if($remember == true) {
                    setcookie('lggd_sess', hash('sha512', uniqid()), 84600);
                    echo'cookie set';
                }
                return true;
            } else {
                return 'signinerror1';
                //echo'wrong password';
            }
        } else if(count($rows)==0){
            return 'signinerror1';
            //echo'this mail does not exist';
        }
    }

    public function signup()
    {
        $first = $_POST['FirstName'];
        $last = $_POST['LastName'];
        $emailOrPhone = $_POST['Email'];

        $gender = $_POST['gender'];
        $password = $_POST['Password'];

        $birthday = $_POST['daybirth']."/".$_POST['monthbirth']."/".$_POST['year'];

        $isValid = $this->validateSignUpInfos($first,$last,$emailOrPhone);
        if ($isValid === true) {
            $pass = sha1($password);
//            $this->generatePassword()
//            $this->sendmail($emailOrPhone, $pass);
//            if($this->sendmail($emailOrPhone, $pass)){
//                return 'signuperror3';
//            }
           $res = db_query("INSERT INTO userprofile (firstname,lastname,email,password,birth,gender) VALUES ('$first','$last','$emailOrPhone','$pass','$birthday','$gender')");
        }
        else{
            return $isValid;
        }
    }

    private function generatePassword()
    {
        return '123';
    }

    private function sendmail($emailOrPhone, $pass)
    {
        $to      = $emailOrPhone;
        $subject = 'Welcome to LikeFB';
        $message = $pass;
        $headers = 'From: Support@LikeFB.com' . "\r\n" .
            'Reply-To: Support@LikeFB.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        $mail = mail($to, $subject, $message, $headers);
        if($mail) {
            echo 'ok';
        }
        else {
            echo 'not ok';
        }
    }

    private function validateSignUpInfos($first,$last,$emailOrPhone)
    {
        $rows = db_query_select("SELECT password FROM userprofile WHERE email = '$emailOrPhone'");
        if($first == null || $last == null) {
            return 'signuperror2';
            //echo 'No valid infos';
        }
        else if(count($rows)!=0) {
            return 'signuperror1';
            //echo 'This mail is already registered';
        }
        else return true;
    }


}