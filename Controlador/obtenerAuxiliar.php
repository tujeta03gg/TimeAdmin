<?php

include 'conexion.php';

$json = $_POST['json'];

$usuario = json_decode($json, true);

$query = 'SELECT * FROM vst_Auxiliares WHERE idUsuario='.$usuario;

$result = mysqli_query($mysqli, $query);

if ($result) {
    $datos = mysqli_fetch_array($result);

    $auxF[] = array(
        'nombre' => $datos['nombre'],
    );

    echo json_encode($auxF);
}
?>

