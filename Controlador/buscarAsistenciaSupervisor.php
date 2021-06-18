<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query='SELECT * FROM vst_RegistroAsistenciaSupervisor WHERE nombre LIKE "%'.$busqueda['bus']
        . '%" OR apellido LIKE "%'.$busqueda['bus']
        . '%" OR nombreCliente LIKE "%'.$busqueda['bus'].'"'.' AND fecha BETWEEN "'.$busqueda['fechaInicio'].'" AND "'.$busqueda['fechaFin'].'";';
$result=mysqli_query($mysqli, $query);
    
    $asistencias;
    
    while($datos= mysqli_fetch_array($result)){
        $asistencias[]=array(
            'fecha'=>$datos['fecha'],
            'idAsistencia'=>$datos['idAsistencia'],
            'horaEntrada'=>$datos['horaEntrada'],
            'horaSalida'=>$datos['horaSalida'],
            'idCliente'=>$datos['idCliente'],
            'nombreCliente'=>$datos['nombreCliente'],
            'idUsuario'=>$datos['idUsuario'],
            'nombre'=>$datos['nombre'],
            'apellido'=>$datos['apellido']
        );
    }
    echo json_encode($asistencias);

?>
