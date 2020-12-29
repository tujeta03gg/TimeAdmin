<?php
    
    include 'conexion.php';
    
    include '../Modelo/Usuario.php';
    
    $query='SELECT * FROM vst_Supervisores WHERE estatusUsuario=1;';
    
    $conexion = $mysqli;
    
    //$result=mysqli_query($mysqli, $query);

    function obtenerSupervisores(){
        if($conexion){
            $result= mysqli_fetch_all($conexion,$query);
        }else{
            return "error";
        }
    }
?>

