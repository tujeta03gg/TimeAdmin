<?php

include 'conexion.php';

$fecha = date("Y-m-d");

$query = 'SELECT * FROM vst_Registro;';

$result = mysqli_query($mysqli, $query);

$registros = null;

while ($datos = mysqli_fetch_array($result)) {
    $registros[] = array(
        'tiempo' => $datos['tiempo'],
        'hora' => $datos['hora'],
        'fecha' => $datos['fecha'],
        'idAuxiliar' => $datos['idAuxiliar'],
        'idServicio' => $datos['idServicio'],
        'idServicioCliente' => $datos['idServicioCliente'],
        'idSupervisor' => $datos['idSupervisor'],
        'idCliente' => $datos['idCliente'],
        'nombreCliente' => $datos['nombreCliente'],
        'nombreServicio' => $datos['nombreServicio'],
        'rfc' => $datos['rfc'],
        'supervisor' => $datos['supervisor'],
        'apellido supervisor' => $datos['apellido supervisor'],
        'celular supervisor' => $datos['celular supervisor'],
        'auxiliar' => $datos['auxiliar'],
        'apellido auxiliar' => $datos['apellido auxiliar'],
        'celular auxiliar' => $datos['celular auxiliar']
    );
}
if ($registros != null) {
    echo json_encode($registros);
} else {
    echo 0;
}
?>