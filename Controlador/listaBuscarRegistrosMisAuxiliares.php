<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query2 ='SELECT * FROM Supervisor WHERE idUsuario='+$busqueda['supervisor']+';';

$query = 'SELECT * FROM vst_Registro where auxiliar="'.$busqueda['auxiliar'].'" AND fecha BETWEEN "'.$busqueda['fechaInicio'].'" AND "'.$busqueda['fechaFin'].'";';

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
        'apellidoSupervisor' => $datos['apellido supervisor'],
        'celularSupervisor' => $datos['celular supervisor'],
        'auxiliar' => $datos['auxiliar'],
        'apellidoAuxiliar' => $datos['apellido auxiliar'],
        'sueldoAuxiliar' => $datos['sueldoAuxiliar'],
        'celularAuxiliar' => $datos['celular auxiliar']
    );
}
if ($registros != null) {
    echo json_encode($registros);
} else {
    echo 0;
}