<?php
    include 'conexion.php';
    
    include '../Modelo/Usuario.php';
    
    $query='SELECT * FROM vst_Auxiliares WHERE estatusUsuario=2;';
    
    $result=mysqli_query($mysqli, $query);
    
    $auxiliares;
    
    while($datos= mysqli_fetch_array($result)){
        $auxiliares[]=array(
            'idAuxiliar'=>$datos['idAuxiliar'],
            'nombre'=>$datos['nombre'],
            'apellido'=>$datos['apellido'],
            'celular'=>$datos['celular'],
            'idUsuario'=>$datos['idUsuario'],
            'correo'=>$datos['correo'],
            'tipoUsuario'=>$datos['tipoUsuario'],
            'estatusUsuario'=>$datos['estatusUsuario']
        );
    }
    echo json_encode($auxiliares);
?>
