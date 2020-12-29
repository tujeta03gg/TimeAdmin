<?php
    include 'conexion.php';
    
    $query='SELECT * FROM Servicio WHERE estatusServicio=2;';
    
    $result=mysqli_query($mysqli, $query);
    
    $servicios;
    while($datos= mysqli_fetch_array($result)){
        $servicios[]=array(
            'idServicio'=>$datos['idServicio'],
            'nombreServicio'=>$datos['nombreServicio']
        );
    }
    
    echo json_encode($servicios);
?>