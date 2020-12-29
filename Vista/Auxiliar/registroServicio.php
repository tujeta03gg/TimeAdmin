<?php
include '../../Controlador/conexion.php';

//$json=$_POST['json'];
//$usuario= json_decode($json,true);

$query = 'SELECT * FROM vst_Supervisores WHERE estatusUsuario=1;';
$query2 = 'SELECT * FROM Cliente;';
$query3 = 'SELECT * FROM Servicio;';

$result = mysqli_query($mysqli, $query);
$result2 = mysqli_query($mysqli, $query2);
$result3 = mysqli_query($mysqli, $query3);
?>

<div class="card">
    <div class="card-content">
        <input name="idAuxiliar" id="idAuxiliar" type="hidden" class="form-control" disabled=""><br>
        <input id="auxiliar" type="text" class="form-control" disabled=""><br>
        <a>Supervisor</a><br>
        <select name="Supervisor" id="idSupervisor" class="form-control">
            <?php
            while ($datos = mysqli_fetch_array($result)) {
                $nombre = $datos['nombre'];
                $id = $datos['idSupervisor'];
                ?>
                <option value="<?php echo $id; ?>"><?php echo $nombre; ?></option>
                <?php
            }
            ?>
        </select><br>
        <a>Cliente</a><br>
        <select name="Cliente" id="idCliente" class="form-control">
            <?php
            while ($datos = mysqli_fetch_array($result2)) {
                $nombre = $datos['nombreCliente'];
                $id = $datos['idCliente'];
                ?>
                <option value="<?php echo $id; ?>"><?php echo $nombre; ?></option>
                <?php
            }
            ?>
        </select><br>
        <a>Servicio</a><br>
        <select name="Servicio" id="idServicio" class="form-control">
            <?php
            while ($datos = mysqli_fetch_array($result3)) {
                $nombre = $datos['nombreServicio'];
                $id = $datos['idServicio'];
                ?>
                <option value="<?php echo $id; ?>"><?php echo $nombre; ?></option>
                <?php
            }
            ?>
        </select><br>
        <a>Tiempo</a><br>
        <input type="text" name="tiempo" id="tiempo" class="form-control"><br>
        <button onclick="hacerRegistro()" class="btn btn-success form-control" >Hacer registro</button>
    </div>
</div>

