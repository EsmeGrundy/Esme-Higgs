<?php
    require_once(__DIR__ . "/../model/config.php");
    
    $query = $_SESSION["connection"] -> query("CREATE TABLE users (" //creates users table
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "username varchar(30) NOT NULL,"
            . "password char(128) NOT NULL, "
            . "salt char(128) NOT NULL,"
            . "exp int(4),"
            . "PRIMARY KEY (id))");
    
            if ($query) {
                echo "Successfully created table";
            }
         else {
            echo "<p class='queries'>" . $_SESSION["connection"]->error . "</p>";;
        }