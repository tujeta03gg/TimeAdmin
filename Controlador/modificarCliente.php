<?php

include 'conexion.php';

$json = $_POST['json'];

$cliente = json_decode($json, true);

$query = 'UPDATE Cliente SET rfc="' . $cliente['rfc'] . '",direccion="' . $cliente['direccion'] . '",nombreCliente="' . $cliente['nombreCliente'] . '" WHERE idCliente=' . $cliente['idCliente'] . ';';

$result = mysqli_query($mysqli, $query);


if ($result) {
    echo $cliente['idCliente'];
} else {
    echo 'error al insertar los datos';
}
?>