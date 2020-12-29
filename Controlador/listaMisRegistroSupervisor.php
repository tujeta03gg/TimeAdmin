<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query = "SELECT * FROM vst_Supervisores WHERE idUsuario=" . $busqueda['idUsuario'];

$result = mysqli_query($mysqli, $query);

$idSupervisor;

while ($dato = mysqli_fetch_array($result)) {
    $idSupervisor = $dato['idSupervisor'];
}


$query2 = 'SELECT * FROM vst_RegistroSupervisor WHERE idSupervisor='.$idSupervisor.' AND fecha BETWEEN "'.$busqueda['fechaInicio'].'" AND "'.$busqueda['fechaFin'].'";';

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
        'celularSupervisor' => $datos['celular supervisor']
    );
}
if ($registros != null) {
    echo json_encode($registros);
} else {
    echo 0;
}
?>