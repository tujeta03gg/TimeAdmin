<?php

include 'conexion.php';

$json = $_POST['json'];

$auxiliar = json_decode($json, true);

$query = 'UPDATE usuario SET correo="' . $auxiliar['correo'] . '", contrasenia="'.$auxiliar['contrasenia'].'" WHERE idUsuario=' . $auxiliar['idUsuario'] . ';';
$query2 = 'UPDATE auxiliar SET nombre="' . $auxiliar['nombre'] . '",apellido="' . $auxiliar['apellido'] . '",celular="' . $auxiliar['celular'] . '", sueldo='.$auxiliar['sueldo'].' WHERE idUsuario=' . $auxiliar['idUsuario'] . ';';

$result = mysqli_query($mysqli, $query);
$result2 = mysqli_query($mysqli, $query2);


if ($result & $result2) {
    echo $auxiliar['idUsuario'];
} else {
    //echo mysqli_errno($mysqli);
    echo $query2;
}
?>