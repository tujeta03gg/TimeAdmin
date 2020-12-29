<?php
    include 'conexion.php';
     
    $json=$_POST['json'];
    
    $cli= json_decode($json,true);
    
    $query='INSERT INTO Cliente(nombreCliente,rfc,direccion) VALUES("'.$cli['nombre'].'","'.$cli['rfc'].'","'.$cli['direccion'].'");';
    $query2 ='SELECT * FROM Cliente WHERE rfc="'.$cli['rfc'].'"';
    
    $result=mysqli_query($mysqli, $query);
    
    $result2=mysqli_query($mysqli, $query2);
    
    $arreglo= mysqli_fetch_array($result2);
    
    echo $arreglo[0];
?>
