<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query = 'SELECT * FROM Servicio WHERE nombreServicio LIKE "%' . $busqueda['bus']
        . '%" AND estatusServicio=1 ORDER BY idServicio DESC;';

$result = mysqli_query($mysqli, $query);

$servicios;

while ($datos = mysqli_fetch_array($result)) {
    $servicios[] = array(
        'idServicio' => $datos['idServicio'],
        'nombreServicio' => $datos['nombreServicio']
    );
}

echo json_encode($servicios);