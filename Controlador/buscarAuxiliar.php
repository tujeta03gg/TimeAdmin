<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query='SELECT * FROM vst_Auxiliares WHERE nombre LIKE "%'.$busqueda['bus']
        . '%" OR apellido LIKE "%'.$busqueda['bus']
        . '%" OR sueldo LIKE "%'.$busqueda['bus']
        . '%" OR celular LIKE "%'.$busqueda['bus']
        . '%" OR correo LIKE "%'.$busqueda['bus']
        . '%" AND estatusUsuario=1;';
$result=mysqli_query($mysqli, $query);
    
    $auxiliares;
    
    while($datos= mysqli_fetch_array($result)){
        $auxiliares[]=array(
            'idAuxiliar'=>$datos['idAuxiliar'],
            'nombre'=>$datos['nombre'],
            'sueldo'=>$datos['sueldo'],
            'apellido'=>$datos['apellido'],
            'celular'=>$datos['celular'],
            'idUsuario'=>$datos['idUsuario'],
            'correo'=>$datos['correo'],
            'contrasenia'=>$datos['contrasenia'],
            'tipoUsuario'=>$datos['tipoUsuario'],
            'estatusUsuario'=>$datos['estatusUsuario']
        );
    }
    echo json_encode($auxiliares);

?>