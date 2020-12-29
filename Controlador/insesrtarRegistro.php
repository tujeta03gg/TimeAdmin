<?php

include 'conexion.php';

date_default_timezone_set("America/Monterrey");

$json = $_POST['json'];

$servicio = json_decode($json, true);

$query = "SELECT * FROM vst_Auxiliares WHERE idUsuario=" . $servicio['idAuxiliar'];

$result = mysqli_query($mysqli, $query);

$idAuxiliar;

$fecha= date("Y-m-d");

$hora="".date("G:i");

while ($datos = mysqli_fetch_array($result)) {
    $idAuxiliar = $datos['idAuxiliar'];
}

$query2='INSERT INTO ServicioCliente(fecha,tiempo,idServicio,idCliente,idSupervisor,idAuxiliar,hora) VALUES("'.$fecha.'",'.$servicio['tiempo'].','.$servicio['idServicio'].','.$servicio['idCliente'].','.$servicio['idSupervisor'].','.$idAuxiliar.',"'.$hora.'");';                  

$result2 = mysqli_query($mysqli, $query2);
if($result2){
    echo 1;
}else{
    echo 0;
}
?>

