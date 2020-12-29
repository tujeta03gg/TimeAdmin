<?php
    include 'conexion.php';
    
    include '../Modelo/Usuario.php';
    
    $query='SELECT * FROM Cliente WHERE estatusCliente=2;';
    
    $result=mysqli_query($mysqli, $query);
    
    $clientes;
    $test;
    while($datos= mysqli_fetch_array($result)){
        $clientes[]=array(
            'idCliente'=>$datos['idCliente'],
            'nombreCliente'=>$datos['nombreCliente'],
            'rfc'=>$datos['rfc'],
            'direccion'=>$datos['direccion']
        );
        $test=$datos['nombreCliente'];
    }
    
    echo json_encode($clientes);
?>
