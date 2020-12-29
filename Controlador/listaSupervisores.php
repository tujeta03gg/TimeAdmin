<?php
    include 'conexion.php';
    
    $query='SELECT * FROM vst_Supervisores WHERE estatusUsuario=1;';
    
    $result=mysqli_query($mysqli, $query);
    
    $supervisores;
    
    while($datos= mysqli_fetch_array($result)){
        $supervisores[]=array(
            'idSupervisor'=>$datos['idSupervisor'],
            'nombre'=>$datos['nombre'],
            'apellido'=>$datos['apellido'],
            'celular'=>$datos['celular'],
            'idUsuario'=>$datos['idUsuario'],
            'correo'=>$datos['correo'],
            'sueldo'=>$datos['sueldo'],
            'contrasenia'=>$datos['contrasenia'],
            'tipoUsuario'=>$datos['tipoUsuario'],
            'estatusUsuario'=>$datos['estatusUsuario']
        );
    }
    echo json_encode($supervisores);
?>