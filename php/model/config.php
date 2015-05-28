<?php

require_once (__DIR__ . "/Database.php");
session_start();
session_regenerate_id(true);

$path = "/Esme-Higgs/php";

$host = "localhost";
$username = "root";
$password = "root";
$database = "higgs_db";

if(!isset($_SESSION["connection"])) { //if the variable is not set, then...
    $_SESSION["name"] = '';
    $connection = new Database($host, $username, $password, $database); //create a new database
    $_SESSION["connection"] = $connection; //connection to database
}
