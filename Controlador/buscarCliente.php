<?php

include 'conexion.php';

$json = $_POST['json'];

$busqueda = json_decode($json, true);

$query = 'SELECT * FROM Cliente WHERE nombreCliente LIKE "%' . $busqueda['bus']
        . '%" OR direccion LIKE "%' . $busqueda['bus']
        . '%" OR rfc LIKE "%' . $busqueda['bus']
        . '%" AND estatusCliente=1;';

$result = mysqli_query($mysqli, $query);

$clientes;

while ($datos = mysqli_fetch_array($result)) {
    $clientes[] = array(
        'idCliente' => $datos['idCliente'],
        'nombreCliente' => $datos['nombreCliente'],
        'rfc' => $datos['rfc'],
        'direccion' => $datos['direccion']
    );
}

echo json_encode($clientes);
