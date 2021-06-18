<?php
    $mysqli= new mysqli('localhost','root','root','TimeAdmin');
    if($mysqli->connect_errno):
        echo'Error al conectarse a la base de datos'.$mysqli->error;
        exit();
    endif;
?>
