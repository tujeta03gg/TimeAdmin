<?php
    include 'conexion.php';
    
    $json=$_POST['json'];
    
    $ser= json_decode($json,true);
    
    $query='INSERT INTO Servicio(nombreServicio) VALUES("'.$ser['nombreServicio'].'")';
    
    $result=mysqli_query($mysqli, $query);
    if($result){
        echo 1;
    }else{
        echo $query;
    }
?>