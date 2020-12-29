<?php
    include 'conexion.php';
    
    $json=$_POST['json'];
    
    $aux= json_decode($json,true);
    
    $query='CALL registrarAuxiliar("'.$aux['nombre'].'","'.$aux['apellido'].'","'.$aux['celular'].'","'.$aux['correo'].'",'.$aux['sueldo'].',"'.$aux['contrasenia'].'",@out_value)';
    $query2 ='SELECT * FROM vst_Auxiliares WHERE correo="'.$aux['correo'].'"';
    
    $result=mysqli_query($mysqli, $query);
    
    $result2=mysqli_query($mysqli, $query2);
    
    $arreglo= mysqli_fetch_array($result2);
    
    echo $arreglo[0];
?>
