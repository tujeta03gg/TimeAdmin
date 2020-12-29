<?php

include 'conexion.php';

$json = $_POST['json'];

$usuario = json_decode($json, true);

$query = 'SELECT * FROM Usuario WHERE correo ="' . $usuario['correo'] . '";';

$result = mysqli_query($mysqli, $query);

if ($result) {
    $datos = mysqli_fetch_array($result);
    if ($usuario['contrasenia'] == $datos['contrasenia'] & $datos['estatusUsuario']==1) {
        $usuarioF[] = array(
            'idUsuario' => $datos['idUsuario'],
            'correo' => $datos['correo'],
            //'contrasenia' => $datos['contrasenia'],
            'tipoUsuario' => $datos['tipoUsuario']
        );
        echo json_encode($usuarioF);
    } else {
        echo 5;
    }
} else {
    echo 4;
}
?>

