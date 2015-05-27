<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 18/5/2015
 * Time: 11:45 μμ
 */

$config = parse_ini_file('/../../../dbconfig.ini');
$connection = mysqli_connect('localhost',$config['username'],$config['password'],$config['dbname']);

function db_connect() {

    static $connection;

    if(!isset($connection)) {
        $config = parse_ini_file('/../../../dbconfig.ini');
        $connection = mysqli_connect('localhost',$config['username'],$config['password'],$config['dbname']);
    }
    // If connection was not successful, handle the error
    if($connection === false) {
        return mysqli_connect_error();
    }
    return $connection;
}

function db_query($query) {

    $connection = db_connect();
    // Query the database
    $result = mysqli_query($connection,$query);
    return $result;
}

function db_query_select($query) {
    $rows = array();
    $result = db_query($query);
    // If query failed, return `false`
    if($result === false) {
        return false;
    }
    // If query was successful, retrieve all the rows into an array
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}