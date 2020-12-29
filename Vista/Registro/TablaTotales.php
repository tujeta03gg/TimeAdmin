<?php
include '../../Controlador/conexion.php';

//$json=$_POST['json'];
//$usuario= json_decode($json,true);

$query = 'SELECT * FROM Cliente;';

$result = mysqli_query($mysqli, $query);
?>

<body onload="">   
    <div class="card">
        <div class="card-content">
            <div class="toolbar">
                <!--        Here you can write extra buttons/actions for the toolbar      
                -->
                <div class="togglebutton">
                    <a>Cliente</a><br>
                    <select name="Cliente" id="idCliente" class="form-control">
                        <?php
                        while ($datos = mysqli_fetch_array($result)) {
                            $nombre = $datos['nombreCliente'];
                            $id = $datos['idCliente'];
                            ?>
                            <option value="<?php echo $id; ?>"><?php echo $nombre; ?></option>
                            <?php
                        }
                        ?>
                    </select>
                    <div class="row">
                        <div class="col-6"><a>Fecha de inicio</a><br><input type="date" id="fechaInicio" value="2020-01-01"></div>
                        <div class="col-6"><a>Fecha fin</a><br><input type="date" id="fechaFin" value="2020-12-30"></div>
                    </div><br>
                    <button onclick="generarTotales()" class=" btn btn-success">Generar</button>
                </div>
            </div>
            <div class="material-datatables">
                <div class="table-responsive">
                    <!--<input class="form-control" id="txtSearch" onkeyup="busquedaAxiliar()" placeholder="Busqueda" type="text">-->
                    <table class="table">
                        <thead>
                            <tr> 
                                <th style='display:none'>Num</th>
                                <th></th>
                                <th>tiempo</th>
                                <th>Servicio</th>
                                <th>Sueldo</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="tbRegistro">                                                
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <!-- end content-->
    </div>
    <!--  end card  -->
