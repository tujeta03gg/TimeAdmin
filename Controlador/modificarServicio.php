<?php

include 'conexion.php';

$json = $_POST['json'];

$ser = json_decode($json, true);

$query = 'UPDATE Servicio SET nombreServicio="' . $ser['nombreServicio'] . '" WHERE idServicio=' . $ser['idServicio'] . ';';

$result = mysqli_query($mysqli, $query);


if ($result) {
    echo $ser['idServicio'];
} else {
    echo 'error al insertar los datos';
}
?>