<?php

include 'conexion.php';

date_default_timezone_set("America/Monterrey");

$json = $_POST['json'];

$servicio = json_decode($json, true);

$query = "SELECT * FROM vst_Supervisores WHERE idUsuario=" . $servicio['idSupervisor'];

$result = mysqli_query($mysqli, $query);

$idSupervisor;

$fecha= date("Y-m-d");

$hora="".date("G:i");

while ($datos = mysqli_fetch_array($result)) {
    $idSupervisor = $datos['idSupervisor'];
}

$query2='INSERT INTO ServicioClienteSupervisor(fecha,tiempo,idServicio,idCliente,idSupervisor,hora) VALUES("'.$fecha.'",'.$servicio['tiempo'].','.$servicio['idServicio'].','.$servicio['idCliente'].','.$idSupervisor.',"'.$hora.'");';                  

$result2 = mysqli_query($mysqli, $query2);
if($result2){
    echo 1;
}else{
    echo 0;
}
?>