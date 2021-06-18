<?php

include 'conexion.php';

//$json = $_POST['json'];

date_default_timezone_set("America/Monterrey");

$fecha = date("Y-m-d");

$hora = "" . date("G:i");

//$asistencia = json_decode($json, true);

//$query = 'CALL pasarAsistencia("' . $asistencia['longitud'] . '","' . $asistencia['latitud'] . '",' . $asistencia['idUsuario'] . ',"' . $hora . '","' . $fecha . '",@out_value)';
$query='CALL pasarAsistencia("-101.6610900659","21.130377815629",4,"'.$hora.'","'.$fecha.'",@out_value)';

$result = mysqli_query($mysqli, $query);

if ($result) {
    echo 1;
} else {
    echo mysqli_error($mysqli);
}