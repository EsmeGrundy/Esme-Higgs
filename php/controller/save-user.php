<?php 
require_once(__DIR__ . "/../model/config.php");


$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);

$query = $_SESSION["connection"]->query("UPDATE users SET "
        . "exp = $exp WHERE username = \"" . $_SESSION["name"] . "\"");

if($query){
    echo "true";
}
else{
    echo $_SESSION["name"];
     echo "<p>" . $_SESSION["connection"]->error . "</p>"; //echoes error
}
