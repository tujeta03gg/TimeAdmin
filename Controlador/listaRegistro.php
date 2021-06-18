<?php

include 'conexion.php';

$fecha = date("Y-m-d");

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query = 'SELECT * FROM vst_Auxiliares WHERE idUsuario='.$busqueda['idUsuario'].';';

$result = mysqli_query($mysqli, $query);

$idAuxiliar;

while ($dato = mysqli_fetch_array($result)) {
    $idAuxiliar = $dato['idAuxiliar'];
}

$query2 = 'SELECT * FROM vst_Registro WHERE idAuxiliar ='.$idAuxiliar.' AND fecha BETWEEN "'.$busqueda['fechaInicio'].'" AND "'.$busqueda['fechaFin'].'";';

$result2 = mysqli_query($mysqli, $query2);

$registros = null;

while ($datos = mysqli_fetch_array($result2)) {
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