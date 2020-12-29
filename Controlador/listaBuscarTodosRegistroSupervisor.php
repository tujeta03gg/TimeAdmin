<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query2 = 'SELECT * FROM vst_RegistroSupervisor WHERE supervisor="'.$busqueda['supervisor'].'" AND fecha BETWEEN "'.$busqueda['fechaInicio'].'" AND "'.$busqueda['fechaFin'].'";';

$result2 = mysqli_query($mysqli, $query2);

$registros = null;

while ($datos = mysqli_fetch_array($result2)) {
    $registros[] = array(
        'tiempo' => $datos['tiempo'],
        'fecha' => $datos['fecha'],
        'idServicio' => $datos['idServicio'],
        'idServicioCliente' => $datos['idServicioCliente'],
        'idSupervisor' => $datos['idSupervisor'],
        'idCliente' => $datos['idCliente'],
        'nombreCliente' => $datos['nombreCliente'],
        'nombreServicio' => $datos['nombreServicio'],
        'rfc' => $datos['rfc'],
        'hora' => $datos['hora'],
        'supervisor' => $datos['supervisor'],
        'apellidoSupervisor' => $datos['apellido supervisor'],
        'sueldoSupervisor' => $datos['sueldoSupervisor'],
        'celularSupervisor' => $datos['celular supervisor']
    );
}
if ($registros != null) {
    echo json_encode($registros);
} else {
    echo 0;
}
?>