<?php

include 'conexion.php';
$json = $_POST['json'];

$id = json_decode($json, true);

$query = 'UPDATE usuario SET estatusUsuario=2 WHERE idUsuario=' . $id['idUsuario'] . ';';

$result = mysqli_query($mysqli, $query);


if ($result) {
    echo $id['idUsuario'];
} else {
    echo 0;
}
?>