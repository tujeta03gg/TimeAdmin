<?php

include 'conexion.php';

$json = $_POST['json'];

$supervisor = json_decode($json, true);

$query = 'UPDATE usuario SET correo="' . $supervisor['correo'] . '", contrasenia="'.$supervisor['contrasenia'].'" WHERE idUsuario=' . $supervisor['idUsuario'] . ';';
$query2 = 'UPDATE supervisor SET nombre="' . $supervisor['nombre'] . '",apellido="' . $supervisor['apellido'] . '",celular="' . $supervisor['celular'] . '", sueldo='.$supervisor['sueldo'].' WHERE idUsuario=' . $supervisor['idUsuario'] . ';';

$result = mysqli_query($mysqli, $query);
$result2 = mysqli_query($mysqli, $query2);


if ($result & $result2) {
    echo $supervisor['idUsuario'];
} else {
    //echo mysqli_errno($mysqli);
    echo $query2;
}
?>