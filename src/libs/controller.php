<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 18/5/2015
 * Time: 1:57 μμ
 */

class Controller {

    private static $routes;

    public function redirect_to($path)
    {
        if(isset(self::$routes[$path]))
            header('Location: ' . self::$routes[$path]);
        else
            header('Location: ' . $path);
    }
}