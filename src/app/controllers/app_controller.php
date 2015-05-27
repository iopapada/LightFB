<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 16/5/2015
 * Time: 10:03 μμ
 */

include APP_PATH . 'models/DAO.php';
class AppController extends Controller{
    public $site_title = 'LikeFB';

    public static function signin()
    {
        $user = $_POST['Username'];
        $pass = $_POST['Password'];

        if(self::validateSignInInfos($user, $pass)){

            if(self::authenticate($user,$pass)){
                self::redirect_to('welcome#welcome');
            }
            else{
                self::redirect_to('Error#index');
            }
        }
        else{
            self::redirect_to('error#NoValidInfos');
        }
    }

    private static function validateSignInInfos($user, $pass){
        if($user != null && $pass != null) return true;
        else return false;
    }

    public static function authenticate($user_email, $user_pass, $remember = false)
    {
        $user_pass = sha1($user_pass);
        $rows = db_query_select("SELECT password FROM users WHERE email = '$user_email'");

        if(count($rows)==1) {
            if($rows[0]['password'] == $user_pass) {
                session_start();
                $_SESSION['user_id'] = $user_email;
                if($remember == true) {
                    setcookie('lggd_sess', hash('sha512', uniqid()), 84600);
                    return true;
                }
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function signup()
    {
        $first = $_POST['FirstName'];
        $last = $_POST['LastName'];
        $emailOrPhone = $_POST['EmailOrPhone'];

        if ($this->validateSignUpInfos($first,$last,$emailOrPhone)) {
            $pass = sha1($this->generatePassword());
            //$this->sendmail($emailOrPhone, $pass);
            db_query("INSERT INTO users (firstname,lastname,email,password) VALUES ('$first','$last','$emailOrPhone','$pass')");
            return true;
        } else {
            echo 'no valid infos';
            return false;
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
        $rows = db_query_select("SELECT password FROM users WHERE email = '$emailOrPhone'");
        if($first !=null && $last != null && count($rows)==1) return true;
        else return false;
    }


}