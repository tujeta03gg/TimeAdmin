<?php
    include 'conexion.php';
    
    $query='SELECT * FROM Cliente WHERE estatusCliente=1;';
    
    $result=mysqli_query($mysqli, $query);
    
    $clientes;
    
    while($datos= mysqli_fetch_array($result)){
        $clientes[]=array(
            'idCliente'=>$datos['idCliente'],
            'nombreCliente'=>$datos['nombreCliente'],
            'rfc'=>$datos['rfc'],
            'direccion'=>$datos['direccion']
        );
    }
    
    echo json_encode($clientes);
?>