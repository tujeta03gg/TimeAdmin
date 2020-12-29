
var registrosAuxiliar;
var registrosSupervisor;
var registrosCliente;
var registrosAuxiliar;


function tableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
}
}

//var tableToExcel = (function () {
//    var uri = 'data:application/vnd.ms-excel;base64,'
//            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//            , base64 = function (s) {
//                return window.btoa(unescape(encodeURIComponent(s)))
//            }
//    , format = function (s, c) {
//        return s.replace(/{(\w+)}/g, function (m, p) {
//            return c[p];
//        })
//    }
//    return function (table, name) {
//        if (!table.nodeType)
//            table = document.getElementById(table)
//        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
//        window.location.href = uri + base64(format(template, ctx))
//    }
//})();



//**********AUXILIAR**********

function cargarListaAuxiliar() {

    cargarVerAuxiliares();

}

function cargarVerAuxiliares() {

    $.ajax(
            {
                type: "GET",
                url: "Auxiliar/listaAuxiliares.html",
                success: function (data) {
                    mostrarAuxiliares();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );
}


function mostrarAuxiliares() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaAuxiliares.php",
                success: function (outPut) {
                    data = JSON.parse(outPut);
                    auxiliares = data;
                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idAuxiliar' name='idAuxiliar' style='display:none'>" + data[i].idAuxiliar + "</td>";
                        tabla += "<td>" + data[i].nombre + " " + data[i].apellido + "</td>";
                        tabla += "<td>" + data[i].apellido + "</td>";
                        tabla += "<td>" + data[i].celular + "</td>";
                        tabla += "<td>" + data[i].correo + "</td>";
                        tabla += "<td>" + data[i].sueldo + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarAuxiliar(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarAuxiliar(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);
                }
            }
    );
}

function mostrarAuxiliaresBaja() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaAuxiliaresBaja.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    auxiliares = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idAuxiliar' name='idAuxiliar' style='display:none'>" + data[i].idAuxiliar + "</td>";
                        tabla += "<td>" + data[i].nombre + "</td>";
                        tabla += "<td>" + data[i].apellido + "</td>";
                        tabla += "<td>" + data[i].celular + "</td>";
                        tabla += "<td>" + data[i].correo + "</td>";
                        tabla += "<td><button class='btn btn-danger' onclick='activarAuxiliar(" + i + ")'>Activar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);
                }
            }
    );
}


function cargarGuardarAuxiliar() {

    $.ajax(
            {
                type: "GET",
                url: "Auxiliar/insertar.html",
                async: true
            }
    ).done(function (data) {

        mostrarAuxiliares();
        $("#secundario").html(data);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");
        $("#secundario").show();
        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");
        $("#");
    }
    );
}

function cerrarGuardarAuxiliar() {

    $("#secundario").removeClass("col-4");
    $("#secundario").addClass("col-0");
    $("#secundario").hide();

    $("#divMainContainer").removeClass("col-8");
    $("#divMainContainer").addClass("col-12");
}

function guardarAuxiliar() {

    var nombre = $('#txtNombre').val();

    var apellido = $('#txtApellido').val();

    var correo = $('#txtCorreo').val();

    var celular = $('#txtCelular').val();

    var contraseña = $('#txtContraseña').val();

    var sueldo = $('#txtSueldo').val();



    var Auxiliar = {
        nombre: nombre,
        sueldo: sueldo,
        apellido: apellido,
        correo: correo,
        celular: celular,
        contrasenia: contraseña
    };

    var json = {json: JSON.stringify(Auxiliar)};
    //alert(JSON.stringify(json));

    $.ajax({
        type: "POST",
        url: "../Controlador/insesrtarAuxiliar.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarAuxiliar();
                cargarVerAuxiliares();


            } else {
                alert("ocurrio un error" + data);
            }
        }

    }
    );
}


function eliminarAuxiliar(posicion) {

    var idUsuario = auxiliares[posicion].idUsuario;

    var Auxiliar = {
        idUsuario: idUsuario
    };

    var json = {json: JSON.stringify(Auxiliar)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/eliminarAuxiliar.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerAuxiliares();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function activarAuxiliar(posicion) {

    var idUsuario = auxiliares[posicion].idUsuario;

    var Auxiliar = {
        idUsuario: idUsuario
    };

    var json = {json: JSON.stringify(Auxiliar)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/activarAuxiliar.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerAuxiliares();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function cargarModificarAuxiliar(posicion) {
    var AuxiliarActual = auxiliares[posicion];
    $.ajax(
            {
                type: "GET",
                async: true,
                url: "Auxiliar/modificarAuxiliares.html"
            }
    ).done(function (data) {
        $("#secundario").html(data);
        $("#txtIdUsuario").val(AuxiliarActual.idUsuario);
        $("#txtNombre").val(AuxiliarActual.nombre);
        $("#txtApellido").val(AuxiliarActual.apellido);
        $("#txtCorreo").val(AuxiliarActual.correo);
        $("#txtCelular").val(AuxiliarActual.celular);
        $("#txtContraseña").val(AuxiliarActual.contrasenia);
        $("#txtSueldo").val(AuxiliarActual.sueldo);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");

        $("#secundario").show();

        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");

    });
}

function modificarAuxiliar() {
    var idUsuario = $('#txtIdUsuario').val();

    var nombre = $('#txtNombre').val();

    var sueldo = $('#txtSueldo').val();

    var apellido = $('#txtApellido').val();

    var celular = $('#txtCelular').val();

    var correo = $('#txtCorreo').val();

    var contrasenia = $('#txtContraseña').val();

    var auxiliar = {
        idUsuario: idUsuario,
        sueldo: sueldo,
        nombre: nombre,
        apellido: apellido,
        celular: celular,
        correo: correo,
        contrasenia: contrasenia
    };

    var json = {json: JSON.stringify(auxiliar)};
    //alert(JSON.stringify(json));

    $.ajax({
        type: "POST",
        url: "../Controlador/modificarAuxiliar.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarAuxiliar();
                cargarVerAuxiliares();
            } else {
                alert("ocurrio un error");
            }
        }
    }
    );
}


function busquedaAuxiliar() {


    bus = $('#txtSearch').val();

    var Busqueda = {
        bus: bus
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/buscarAuxiliar.php",
                data: json,
                success: function (outPut) {
                    datos = JSON.parse(outPut);

                    auxiliares = datos;

                    var tabla = "";

                    for (var i = 0; i < datos.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idAuxiliar' name='idAuxiliar' style='display:none'>" + datos[i].idAuxiliar + "</td>";
                        tabla += "<td>" + datos[i].nombre + "</td>";
                        tabla += "<td>" + datos[i].apellido + "</td>";
                        tabla += "<td>" + datos[i].celular + "</td>";
                        tabla += "<td>" + datos[i].correo + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarAuxiliar(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarAuxiliar(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);

                }

            }
    );
}


//************* SUPERVISOR************

function cargarListaSupervisor() {

    cargarVerSupervisores();

}


function cargarVerSupervisores() {

    $.ajax(
            {
                type: "GET",
                url: "Supervisor/listaSupervisores.html",
                success: function (data) {
                    mostrarSupervisores();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );
}


function mostrarSupervisores() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaSupervisores.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    supervisores = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idSupervisor' name='idSupervisor' style='display:none'>" + data[i].idSupervisor + "</td>";
                        tabla += "<td>" + data[i].nombre + "</td>";
                        tabla += "<td>" + data[i].apellido + "</td>";
                        tabla += "<td>" + data[i].celular + "</td>";
                        tabla += "<td>" + data[i].correo + "</td>";
                        tabla += "<td>" + data[i].sueldo + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarSupervisor(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarSupervisor(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);
                }
            }
    );
}

function mostrarSupervisoresBaja() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaSupervisoresBaja.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    supervisores = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idAuxiliar' name='idSupervisor' style='display:none'>" + data[i].idSupervisor + "</td>";
                        tabla += "<td>" + data[i].nombre + "</td>";
                        tabla += "<td>" + data[i].apellido + "</td>";
                        tabla += "<td>" + data[i].celular + "</td>";
                        tabla += "<td>" + data[i].correo + "</td>";
                        tabla += "<td>" + data[i].sueldo + "</td>";
                        tabla += "<td><button class='btn btn-danger' onclick='activarSupervisor(" + i + ")'>Activar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);
                }
            }
    );
}


function cargarGuardarSupervisor() {

    $.ajax(
            {
                type: "GET",
                url: "Supervisor/insertar.html",
                async: true
            }
    ).done(function (data) {

        mostrarSupervisores();
        $("#secundario").html(data);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");
        $("#secundario").show();
        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");
    }
    );
}

function cerrarGuardarSupervisor() {

    $("#secundario").removeClass("col-4");
    $("#secundario").addClass("col-0");
    $("#secundario").hide();

    $("#divMainContainer").removeClass("col-8");
    $("#divMainContainer").addClass("col-12");
}

function guardarSupervisor() {

    var nombre = $('#txtNombre').val();

    var apellido = $('#txtApellido').val();

    var correo = $('#txtCorreo').val();

    var sueldo = $('#txtSueldo').val();

    var celular = $('#txtCelular').val();

    var contraseña = $('#txtContraseña').val();



    var Sueprvisor = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        sueldo: sueldo,
        celular: celular,
        contrasenia: contraseña
    };

    var json = {json: JSON.stringify(Sueprvisor)};
    //alert(JSON.stringify(json));

    $.ajax({
        type: "POST",
        url: "../Controlador/insesrtarSupervisor.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarSupervisor();
                cargarVerSupervisores();


            } else {
                alert("ocurrio un error" + data);
            }
        }

    }
    );
}


function eliminarSupervisor(posicion) {

    var idUsuario = supervisores[posicion].idUsuario;

    var Supervisor = {
        idUsuario: idUsuario
    };

    var json = {json: JSON.stringify(Supervisor)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/eliminarSupervisor.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerSupervisores();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function activarSupervisor(posicion) {

    var idUsuario = supervisores[posicion].idUsuario;

    var Auxiliar = {
        idUsuario: idUsuario
    };

    var json = {json: JSON.stringify(Auxiliar)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/activarSupervisor.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerSupervisores();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function cargarModificarSupervisor(posicion) {
    var SupervisorActual = supervisores[posicion];
    $.ajax(
            {
                type: "GET",
                async: true,
                url: "Supervisor/moodificarSupervisores.html"
            }
    ).done(function (data) {
        $("#secundario").html(data);
        $("#txtIdUsuario").val(SupervisorActual.idUsuario);
        $("#txtNombre").val(SupervisorActual.nombre);
        $("#txtApellido").val(SupervisorActual.apellido);
        $("#txtCorreo").val(SupervisorActual.correo);
        $("#txtCelular").val(SupervisorActual.celular);
        $("#txtContraseña").val(SupervisorActual.contrasenia);
        $("#txtSueldo").val(SupervisorActual.sueldo);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");

        $("#secundario").show();

        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");

    });
}

function modificarSupervisor() {
    var idUsuario = $('#txtIdUsuario').val();

    var nombre = $('#txtNombre').val();

    var apellido = $('#txtApellido').val();

    var celular = $('#txtCelular').val();

    var correo = $('#txtCorreo').val();

    var sueldo = $('#txtSueldo').val();

    var contrasenia = $('#txtContraseña').val();

    var supervisor = {
        idUsuario: idUsuario,
        nombre: nombre,
        sueldo: sueldo,
        apellido: apellido,
        celular: celular,
        correo: correo,
        contrasenia: contrasenia
    };

    var json = {json: JSON.stringify(supervisor)};
    //alert(JSON.stringify(json));

    $.ajax({
        type: "POST",
        url: "../Controlador/modificarSupervisor.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarSupervisor();
                cargarVerSupervisores();
            } else {
            }
        }
    }
    );
}

function busquedaSupervisor() {
    bus = $('#txtSearch').val();

    var Busqueda = {
        bus: bus
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/buscarSupervisor.php",
                data: json,
                success: function (outPut) {
                    datos = JSON.parse(outPut);

                    auxiliares = datos;

                    var tabla = "";

                    for (var i = 0; i < datos.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idSupervisor' name='idSupervisor' style='display:none'>" + datos[i].idSupervisor + "</td>";
                        tabla += "<td>" + datos[i].nombre + "</td>";
                        tabla += "<td>" + datos[i].apellido + "</td>";
                        tabla += "<td>" + datos[i].celular + "</td>";
                        tabla += "<td>" + datos[i].correo + "</td>";
                        tabla += "<td>" + datos[i].sueldo + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarSupervisor(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarSupervisor(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);

                }

            }
    );
}


//********** REGISTTROS DE AUXILIARES
function cargarVerTodosRegistrosAuxiliar() {

    $.ajax(
            {
                type: "GET",
                url: "Registro/listaTodosRegistroAuxiliar.html",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function buscarTodosRegistrosAuxiliar() {
    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();
    auxiliar = $('#txtSearch').val();

    var Busqueda = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        auxiliar: auxiliar
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaBuscarTodosRegistroAuxiliar.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
                        registrosAuxiliar = datos;
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].hora + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + " " + datos[i].apellidoSupervisor + "</td>";
                            tabla += "<td>" + datos[i].auxiliar + " " + datos[i].apellidoAuxiliar + "</td>";
                            tabla += "<td>" + datos[i].sueldoAuxiliar + "</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

function mostrarTodosRegistrosAuxiliar() {

    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();

    var Busqueda = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaTodosRegistroAuxiliar.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
                        registrosAuxiliar = datos;
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].hora + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + " " + datos[i].apellidoSupervisor + "</td>";
                            tabla += "<td>" + datos[i].auxiliar + " " + datos[i].apellidoAuxiliar + "</td>";
                            tabla += "<td>" + datos[i].sueldoAuxiliar + "</td>";
                            tabla += "</tr>";

                        }
                        $('#tbRegistro').html(tabla);
                    }
                }
            }
    );
}

//******* REGISTROS DE SUPERVISORES
function cargarVerTodosRegistrosSupervisor() {

    $.ajax(
            {
                type: "GET",
                url: "Registro/listaTodosRegistroSupervisor.html",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function mostrarTodosRegistrosSupervisorSupervisor() {
    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();
    supervisor = $('#txtSearch').val();

    var Busqueda = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        supervisor: supervisor
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaBuscarTodosRegistroSupervisor.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
                        registrosSupervisor = datos;
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].hora + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + "</td>";
                            tabla += "<td>" + datos[i].sueldoSupervisor + "</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

function mostrarTodosRegistrosSupervisor() {

    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();

    var Busqueda = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaTodosRegistroSupervisor.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
                        registrosSupervisor = datos;
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].hora + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + "</td>";
                            tabla += "<td>" + datos[i].sueldoSupervisor + "</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

function calcularMontoSupervisor() {
    var totalHoras = 0;
    var monto;
    for (var i = 0; i < registrosSupervisor.length; i++) {
        totalHoras += parseFloat(registrosSupervisor[i].tiempo);
    }
    monto = totalHoras * parseFloat(registrosSupervisor[0].sueldoSupervisor);
    alert(monto);
}

function calcularMontoAuxiliar() {
    var totalHoras = 0;
    var monto;
    for (var i = 0; i < registrosAuxiliar.length; i++) {
        totalHoras += parseFloat(registrosAuxiliar[i].tiempo);
    }
    monto = totalHoras * parseFloat(registrosAuxiliar[0].sueldoAuxiliar)
    alert(monto);
}

//******** TOTALES

function cargarTotales() {
    $.ajax(
            {
                type: "GET",
                url: "Registro/TablaTotales.php",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );
}

function generarTotales() {
    var total=0;
    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();
    cliente = $('#idCliente').val();

    var Busqueda = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        cliente: cliente
    };

    //alert(JSON.stringify(Busqueda));

    var json = {json: JSON.stringify(Busqueda)};

    var tabla = "<tr>";
    tabla += "<td><b> Auxiliares </b></td>";
    tabla += "</tr>";
    //PETICION A LOS REGISTROS DE LOS AUXILIARES
    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/GenerarTotalesAuxiliar.php",
                data: json,
                success: function (outPut) {
                    //alert(JSON.stringify(outPut));
                    if (outPut == 0) {
                        
                    } else {
                        datos = JSON.parse(outPut);
                        registrosAuxiliar = datos;

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].auxiliar + " " + datos[i].apellidoAuxiliar + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].sueldo + "</td>";
                            tabla += "</tr>";
                            total+=parseFloat(datos[i].sueldo)*parseFloat(datos[i].tiempo);
                        }

                        tabla += "<tr>";
                        tabla += "<td><b> Supervisores </b></td>";
                        tabla += "</tr>";
                    }

                }
            }
    );
    //PETICION A LOS REGISTROS DE LOS SUPERVISORES


    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/GenerarTotalesSupervisor.php",
                data: json,
                success: function (outPut) {
                    //alert(JSON.stringify(outPut));
                    if (outPut == 0) {
                        $('#tbRegistro').html(tabla);
                    } else {
                        datos = JSON.parse(outPut);
                        registrosSupervisores = datos;

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + " " + datos[i].apellidoSupervisor + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].sueldoSupervisor + "</td>";
                            tabla += "</tr>";
                            total+=parseFloat(datos[i].sueldoSupervisor)*parseFloat(datos[i].tiempo);
                        }
                        
                        tabla += "<tr>";
                        tabla += "<td></td><td></td><td></td><td></td> <td><b>"+total+"</b></td>";
                        tabla += "</tr>";
                        
                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}
