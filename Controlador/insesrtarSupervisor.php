<?php

include 'conexion.php';

$json = $_POST['json'];

$sup = json_decode($json, true);

$query = 'CALL registrarSupervisor("' . $sup['nombre'] . '","' . $sup['apellido'] . '","' . $sup['celular'] . '","' . $sup['correo'] . '",'.$sup['sueldo'].',"' . $sup['contrasenia'] . '",@out_value)';
$query2 = 'SELECT * FROM vst_Supervisores WHERE correo="' . $sup['correo'] . '"';

$result = mysqli_query($mysqli, $query);

$result2 = mysqli_query($mysqli, $query2);

$arreglo = mysqli_fetch_array($result2);

echo $arreglo[0];
