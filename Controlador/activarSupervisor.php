<?php

include 'conexion.php';

include '../Modelo/Usuario.php';

$json = $_POST['json'];

$id = json_decode($json, true);

$query = 'UPDATE usuario SET estatusUsuario=1 WHERE idUsuario=' . $id['idUsuario'] . ';';

$result = mysqli_query($mysqli, $query);


if ($result) {
    echo $id['idUsuario'];
} else {
    echo 0;
}
?>