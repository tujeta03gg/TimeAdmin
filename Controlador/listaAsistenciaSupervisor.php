<?php

include 'conexion.php';

//include '../Modelo/Usuario.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query = 'SELECT * FROM vst_RegistroAsistenciaSupervisor WHERE fecha BETWEEN "' . $busqueda['fechaInicio'] . '" AND "' . $busqueda['fechaFin'] . '";';

$result = mysqli_query($mysqli, $query);

$asistencias;

while ($datos = mysqli_fetch_array($result)) {
    $asistencias[] = array(
        'fecha' => $datos['fecha'],
        'idAsistencia' => $datos['idAsistencia'],
        'horaEntrada' => $datos['horaEntrada'],
        'horaSalida' => $datos['horaSalida'],
        'idCliente' => $datos['idCliente'],
        'nombreCliente' => $datos['nombreCliente'],
        'idUsuario' => $datos['idUsuario'],
        'nombre' => $datos['nombre'],
        'apellido' => $datos['apellido']
    );
}
if ($asistencias != null) {
    echo json_encode($asistencias);
} else {
    echo 0;
}
?>
