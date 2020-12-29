<?php
    
    include 'conexion.php';

    $json=$_POST['json'];
    
    $id= json_decode($json,true);
    
    $query='UPDATE Servicio SET estatusServicio=1 WHERE idServicio='.$id['idServicio'].';';
    
    $result=mysqli_query($mysqli, $query);
    
    
    if($result){
        echo $id['idServicio'];
    }else{
        echo 0;
    }
    
?>