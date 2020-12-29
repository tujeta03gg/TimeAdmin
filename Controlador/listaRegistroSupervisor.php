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


$query2 = 'SELECT * FROM vst_Registro WHERE idSupervisor='.$idSupervisor.' AND fecha BETWEEN "'.$busqueda['fechaInicio'].'" AND "'.$busqueda['fechaFin'].'";';

$result2 = mysqli_query($mysqli, $query2);

$registros = null;

while ($datos = mysqli_fetch_array($result2)) {
    $registros[] = array(
        'tiempo' => $datos['tiempo'],
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
        'apellidoSupervisor' => $datos['apellido supervisor'],
        'celularSupervisor' => $datos['celular supervisor'],
        'auxiliar' => $datos['auxiliar'],
        'apellidoAuxiliar' => $datos['apellido auxiliar'],
        'celularAuxiliar' => $datos['celular auxiliar']
    );
}
if ($registros != null) {
    echo json_encode($registros);
} else {
    echo 0;
}
?>