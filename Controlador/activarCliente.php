<?php

include 'conexion.php';

$json = $_POST['json'];

$id = json_decode($json, true);

$query = 'UPDATE Cliente SET estatusCliente=1 WHERE idCliente=' . $id['idCliente'] . ';';

$result = mysqli_query($mysqli, $query);


if ($result) {
    echo $id['idCliente'];
} else {
    echo 0;
}
?>