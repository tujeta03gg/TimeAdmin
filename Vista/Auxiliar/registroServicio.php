<?php
include '../../Controlador/conexion.php';

//$json=$_POST['json'];
//$usuario= json_decode($json,true);

$query = 'SELECT * FROM vst_Supervisores WHERE estatusUsuario=1;';
$query2 = 'SELECT * FROM Cliente WHERE estatusCliente=1;';
$query3 = 'SELECT * FROM Servicio WHERE estatusServicio=1;';

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
        <div><a>Horas</a>
            <input type="number" name="horas" id="horas" class="form-control" min="0" value="0">
            <a>Minutos</a>
            <input type="number" name="minutos" id="minutos" class="form-control" min="0" max="60" value="0">
        </div><br>
        <button onclick="hacerRegistro()" class="btn btn-success form-control" >Hacer registro</button>
    </div>
</div>

