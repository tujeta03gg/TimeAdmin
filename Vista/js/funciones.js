
var auxiliares;
var clientes;
var servicios;
var supervisores;
var usuarioActual;
var registrosAuxiliar;
var registrosSupervisor;


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


function login() {
    correo = document.getElementById("Usuario").value;
    contrasenia = document.getElementById("Password").value;

    var usuario = {
        correo: correo,
        contrasenia: contrasenia
    };

    var json = {json: JSON.stringify(usuario)};

    $.ajax({
        data: json,
        type: 'POST',
        url: "../Controlador/login.php",
        success: function (respuesta) {

            if (respuesta == 4) {
                alert("Usuario no encontrado");
            } else if (respuesta == 5) {
                alert("Contraseña incorrecta");
            } else {

                datos = JSON.parse(respuesta);

                tipo = datos[0].tipoUsuario;
                localStorage.setItem("tipo", tipo);

                switch (tipo) {
                    case '1'://administrador
                        //alert("ADMINISTRADOR");
                        localStorage.setItem("idUsuario", datos[0].idUsuario);
                        cargarPrincipal();
                        break;
                    case '2'://supervisor
                        //alert("SUPERVISOR");
                        localStorage.setItem("idUsuario", datos[0].idUsuario);
                        cargarPrincipalSupervisor();
                        break;
                    case '3'://auxiliar
                        //alert("AUXILIAR");
                        localStorage.setItem("idUsuario", datos[0].idUsuario);
                        cargarPrincipalAuxiliar();
                        break;
                    default://ocurrio un error en el servidor
                        alert("default" + JSON.stringify(datos));
                        break;
                }
            }

        }
    });

}

function logout() {
    localStorage.clear();
    window.location = "login.html";
}

function validarAuxiliar() {
    if (localStorage.getItem("tipo") != 3) {
        window.location = "login.html";
        alert("Esta cuenta es de un auxiliar");
    }
}

function validarSupervisor() {

    if (localStorage.getItem("tipo") != 2) {
        window.location = "login.html";
        alert("Esta cuenta es de un Supervisor");
    }
}

function validarAdministrador() {
    if (localStorage.getItem("tipo") != 1) {
        window.location = "login.html";
        alert("Esta cuenta es de un Administrador");
    }
}


function cargarPrincipal() {
    window.location = "principal.html";


}

function cargarPrincipalAuxiliar() {
    window.location = "principalAuxiliar.html";

}

function cargarPrincipalSupervisor() {
    window.location = "principalSupervisor.html";

}


function validarSuper(){
    superUsuario = document.getElementById("super").value;
    if(superUsuario=="123"){
        window.location="principalSuperUsuario.html";
    }else{
        
    }
}
//***********REGISTRO DE CLIENTE*********

function cargarListaClientes() {
    cargarVerClientes();
}

function cargarVerClientes() {

    $.ajax(
            {
                type: "GET",
                url: "Cliente/listaClientes.html",
                success: function (data) {
                    mostrarClientes();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function mostrarClientes() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaClientes.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    clientes = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idCliente' name='idCliente' style='display:none'>" + data[i].idCliente + "</td>";
                        tabla += "<td>" + data[i].nombreCliente + "</td>";
                        tabla += "<td>" + data[i].rfc + "</td>";
                        tabla += "<td>" + data[i].direccion + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarCliente(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarCliente(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbCliente').html(tabla);
                }
            }
    );
}

function mostrarClientesBaja() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaClientesBaja.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    clientes = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idCliente' name='idCliente' style='display:none'>" + data[i].idCliente + "</td>";
                        tabla += "<td>" + data[i].nombreCliente + "</td>";
                        tabla += "<td>" + data[i].rfc + "</td>";
                        tabla += "<td>" + data[i].direccion + "</td>";
                        tabla += "<td><button class='btn btn-danger' onclick='activarCliente(" + i + ")'>Activar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbCliente').html(tabla);
                }
            }
    );
}


function cargarGuardarCliente() {

    $.ajax(
            {
                type: "GET",
                url: "Cliente/insertar.html",
                async: true
            }
    ).done(function (data) {

        mostrarClientes();
        $("#secundario").html(data);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");
        $("#secundario").show();
        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");
    }
    );
}

function cerrarGuardarCliente() {

    $("#secundario").removeClass("col-4");
    $("#secundario").addClass("col-0");
    $("#secundario").hide();

    $("#divMainContainer").removeClass("col-8");
    $("#divMainContainer").addClass("col-12");
}

function guardarCliente() {

    var nombre = $('#txtNombre').val();

    var rfc = $('#txtRFC').val();

    var direccion = $('#txtDireccion').val();



    var Cliente = {
        nombre: nombre,
        direccion: direccion,
        rfc: rfc
    };

    var json = {json: JSON.stringify(Cliente)};

    $.ajax({
        type: "POST",
        url: "../Controlador/insesrtarCliente.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarCliente();
                cargarVerClientes();
            } else {
                alert("ocurrio un error" + data);
            }
        }

    }
    );
}


function eliminarCliente(posicion) {

    var idCliente = clientes[posicion].idCliente;

    var Cliente = {
        idCliente: idCliente
    };

    var json = {json: JSON.stringify(Cliente)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/eliminarCliente.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerClientes();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function activarCliente(posicion) {

    var idCliente = clientes[posicion].idCliente;

    var Cliente = {
        idCliente: idCliente
    };

    var json = {json: JSON.stringify(Cliente)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/activarCliente.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerClientes();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function cargarModificarCliente(posicion) {
    var ClienteActual = clientes[posicion];
    $.ajax(
            {
                type: "GET",
                async: true,
                url: "Cliente/modificarClientes.html"
            }
    ).done(function (data) {
        $("#secundario").html(data);
        $("#txtIdCliente").val(ClienteActual.idCliente);
        $("#txtNombre").val(ClienteActual.nombreCliente);
        $("#txtRFC").val(ClienteActual.rfc);
        $("#txtDireccion").val(ClienteActual.direccion);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");

        $("#secundario").show();

        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");

    });
}

function modificarCliente() {
    var idCliente = $('#txtIdCliente').val();

    var nombreCliente = $('#txtNombre').val();

    var rfc = $('#txtRFC').val();

    var direccion = $('#txtDireccion').val();

    var Cliente = {
        idCliente: idCliente,
        rfc: rfc,
        nombreCliente: nombreCliente,
        direccion: direccion
    };

    var json = {json: JSON.stringify(Cliente)};
    //alert(JSON.stringify(json));

    $.ajax({
        type: "POST",
        url: "../Controlador/modificarCliente.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarCliente();
                cargarVerClientes();
            } else {
                alert(data);
            }
        }
    }
    );
}

function busquedaCliente() {


    bus = $('#txtSearch').val();

    var Busqueda = {
        bus: bus
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/buscarCliente.php",
                data: json,
                success: function (outPut) {

                    datos = JSON.parse(outPut);
                    clientes = datos;

                    var tabla = "";

                    for (var i = 0; i < datos.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idCliente' name='idCliente' style='display:none'>" + datos[i].idCliente + "</td>";
                        tabla += "<td>" + datos[i].nombreCliente + "</td>";
                        tabla += "<td>" + datos[i].rfc + "</td>";
                        tabla += "<td>" + datos[i].direccion + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarCliente(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarCliente(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbCliente').html(tabla);
                }

            }
    );
}



//***********REGISTRO DE SERVICIO*********

function cargarListaServicio() {
    cargarVerServicios();
}

function cargarVerServicios() {

    $.ajax(
            {
                type: "GET",
                url: "Servicio/listaServicios.html",
                success: function (data) {
                    mostrarServicio();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function mostrarServicio() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaServicios.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    servicios = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idServicio' name='idServicio' style='display:none'>" + data[i].idServicio + "</td>";
                        tabla += "<td>" + data[i].nombreServicio + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarServicio(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarServicio(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbServicio').html(tabla);
                }
            }
    );
}

function mostrarServicioBaja() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaServiciosBaja.php",
                success: function (outPut) {

                    data = JSON.parse(outPut);
                    servicios = data;

                    var tabla = "";

                    for (var i = 0; i < data.length; i++) {

                        tabla += "<tr>";
                        tabla += "<td id='idServicio' name='idServicio' style='display:none'>" + data[i].idServicio + "</td>";
                        tabla += "<td>" + data[i].nombreServicio + "</td>";
                        tabla += "<td><button class='btn btn-danger' onclick='activarServicio(" + i + ")'>Activar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbServicio').html(tabla);
                }
            }
    );
}


function cargarGuardarServicio() {

    $.ajax(
            {
                type: "GET",
                url: "Servicio/insertar.html",
                async: true
            }
    ).done(function (data) {

        mostrarServicio;
        $("#secundario").html(data);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");
        $("#secundario").show();
        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");
    }
    );
}

function cerrarGuardarServicio() {

    $("#secundario").removeClass("col-4");
    $("#secundario").addClass("col-0");
    $("#secundario").hide();

    $("#divMainContainer").removeClass("col-8");
    $("#divMainContainer").addClass("col-12");
}

function guardarServicio() {

    var nombre = $('#txtNombre').val();

    var Servicio = {
        nombreServicio: nombre
    };

    var json = {json: JSON.stringify(Servicio)};

    $.ajax({
        type: "POST",
        url: "../Controlador/insesrtarServicio.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarServicio();
                cargarVerServicios();
            } else {
                alert("ocurrio un error" + data);
            }
        }

    }
    );
}


function eliminarServicio(posicion) {

    var idServicio = servicios[posicion].idServicio;

    var Servicio = {
        idServicio: idServicio
    };

    var json = {json: JSON.stringify(Servicio)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/eliminarServicio.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerServicios();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function activarServicio(posicion) {

    var idServicio = servicios[posicion].idServicio;

    var Servicio = {
        idServicio: idServicio
    };

    var json = {json: JSON.stringify(Servicio)};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/activarServicio.php",
                data: json,
                success: function (data) {
                    if (data > 0) {
                        cargarVerServicios();
                    } else {
                        alert(data);
                    }
                }
            }
    );
}

function cargarModificarServicio(posicion) {
    var ServicioActual = servicios[posicion];
    $.ajax(
            {
                type: "GET",
                async: true,
                url: "Servicio/modificarServicio.html"
            }
    ).done(function (data) {
        $("#secundario").html(data);
        $("#txtIdServicio").val(ServicioActual.idServicio);
        $("#txtNombre").val(ServicioActual.nombreServicio);

        $("#secundario").removeClass("col-0");
        $("#secundario").addClass("col-4");

        $("#secundario").show();

        $("#divMainContainer").removeClass("col-12");
        $("#divMainContainer").addClass("col-8");

    });
}

function modificarServicio() {
    var idServicio = $('#txtIdServicio').val();

    var nombreServicio = $('#txtNombre').val();

    var Servicio = {
        idServicio: idServicio,
        nombreServicio: nombreServicio
    };

    var json = {json: JSON.stringify(Servicio)};
    //alert(JSON.stringify(json));

    $.ajax({
        type: "POST",
        url: "../Controlador/modificarServicio.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                cerrarGuardarServicio();
                cargarVerServicios();
            } else {
                alert(data);
            }
        }
    }
    );
}


//***********REGISTRO DE SERVICIO*********

function cargarHacerRegistro() {

    $.ajax(
            {
                type: "POST",
                url: "Auxiliar/registroServicio.php",
                success: function (data) {
                    mostrarAuxiliares();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                    document.getElementById("idAuxiliar").value = localStorage.getItem("idUsuario");

                }
            }
    );

    var json = {json: JSON.stringify(localStorage.getItem("idUsuario"))};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/obtenerAuxiliar.php",
                data: json,
                success: function (data) {
                    auxiliar = JSON.parse(data);
                    document.getElementById("auxiliar").value = auxiliar[0].nombre;
                }
            }
    );

}

function hacerRegistro() {

    var tiempo = $('#tiempo').val();

    var idAuxiliar = $('#idAuxiliar').val();

    var idServicio = $('#idServicio').val();

    var idCliente = $('#idCliente').val();

    var idSupervisor = $('#idSupervisor').val();



    var servicio = {
        tiempo: tiempo,
        idAuxiliar: idAuxiliar,
        idServicio: idServicio,
        idCliente: idCliente,
        idSupervisor: idSupervisor
    };

    var json = {json: JSON.stringify(servicio)};

    $.ajax({
        type: "POST",
        url: "../Controlador/insesrtarRegistro.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                alert("Se ha guardado el registro");

            } else {
                alert("ocurrio un error");
            }
        }

    }
    );

}

function cargarHacerRegistroSupervisor() {

    $.ajax(
            {
                type: "POST",
                url: "Supervisor/registroServicio.php",
                success: function (data) {
                    mostrarAuxiliares();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                    document.getElementById("idSupervisor").value = localStorage.getItem("idUsuario");

                }
            }
    );

    var json = {json: JSON.stringify(localStorage.getItem("idUsuario"))};

    $.ajax(
            {
                type: "POST",
                url: "../Controlador/obtenerSupervisor.php",
                data: json,
                success: function (data) {
                    //alert(JSON.stringify(data));
                    auxiliar = JSON.parse(data);
                    document.getElementById("supervisor").value = auxiliar[0].nombre;
                }
            }
    );

}

function hacerRegistroSupervisor() {

    var tiempo = $('#tiempo').val();

    var idServicio = $('#idServicio').val();

    var idCliente = $('#idCliente').val();

    var idSupervisor = $('#idSupervisor').val();



    var servicio = {
        tiempo: tiempo,
        idServicio: idServicio,
        idCliente: idCliente,
        idSupervisor: idSupervisor
    };

    var json = {json: JSON.stringify(servicio)};

    $.ajax({
        type: "POST",
        url: "../Controlador/insesrtarRegistroSupervisor.php",
        data: json,
        success: function (data) {
            if (data > 0) {
                alert("Se ha guardado el registro");

            } else {
                alert("Ocurrio un error"+JSON.stringify(data));
            }
        }

    }
    );

}


//***********LISTA AUXILIAR***********


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
                        tabla += "<td>" + data[i].nombre + "</td>";
                        tabla += "<td>" + data[i].apellido + "</td>";
                        tabla += "<td>" + data[i].celular + "</td>";
                        tabla += "<td>" + data[i].correo + "</td>";
                        tabla += "<td>" + "..." + "</td>";
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
                        tabla += "<td>" + "..." + "</td>";
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
        document.getElementById("txtSueldo").type="hidden";
        document.getElementById("txtSueldo").value=0;
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
        
        document.getElementById("txtSueldo").type="hidden";

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
        sueldo:sueldo,
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

//***********LISTA REGISTRO***********





function cargarListaRegistro() {
    cargarVerRegistros();
}

function cargarVerRegistros() {
    $.ajax(
            {
                type: "GET",
                url: "Registro/listaRegistro.html",
                success: function (data) {
                    mostrarRegistros();
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function mostrarRegistros() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "../Controlador/listaRegistro.php",
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros el dia de hoy");
                    } else {
                        data = JSON.parse(outPut);
                        var tabla = "";

                        for (var i = 0; i < data.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + data[i].idServicioCliente + "</td>";
                            tabla += "<td>" + data[i].fecha + "</td>";
                            tabla += "<td>" + data[i].hora + "</td>";
                            tabla += "<td>" + data[i].tiempo + "</td>";
                            tabla += "<td>" + data[i].nombreServicio + "</td>";
                            tabla += "<td>" + data[i].nombreCliente + "</td>";
                            tabla += "<td>" + data[i].supervisor + "</td>";
                            tabla += "<td>" + data[i].auxiliar + "</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}


function cargarListaRegistroSupervisor() {
    cargarVerRegistrosSupervisor();
}

function cargarVerTodosRegistrosSupervisor() {

    $.ajax(
            {
                type: "GET",
                url: "Registro/listaRegistroSupervisor.html",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function mostrarRegistrosSupervisorAux() {
    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();
    aux = $('#txtSearch').val();

    var Busqueda = {
        idUsuario: localStorage.getItem("idUsuario"),
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        auxiliar: aux
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaRegistroSupervisorAux.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + "</td>";
                            tabla += "<td>" + datos[i].auxiliar + "</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

function mostrarRegistrosSupervisor() {

    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();

    var Busqueda = {
        idUsuario: localStorage.getItem("idUsuario"),
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaRegistroSupervisor.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor + "</td>";
                            tabla += "<td>" + datos[i].auxiliar + "</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

//******** MODULO SUPERVISOR
//******** LISTA DE SUS REGISTROS

function cargarVerMisRegistrosSupervisor() {

    $.ajax(
            {
                type: "GET",
                url: "Registro/listaMisRegistroSupervisor.html",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                }
            }
    );

}

function mostrarMisRegistrosSupervisorEmpresa() {
    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();
    empresa = $('#txtSearch').val();

    var Busqueda = {
        idUsuario: localStorage.getItem("idUsuario"),
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        empresa: empresa
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaRegistroSupervisorEmpresa.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
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
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

function mostrarMisRegistrosSupervisor() {

    fechaInicio = $('#fechaInicio').val();
    fechaFin = $('#fechaFin').val();

    var Busqueda = {
        idUsuario: localStorage.getItem("idUsuario"),
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
    };

    var json = {json: JSON.stringify(Busqueda)};

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "../Controlador/listaMisRegistroSupervisor.php",
                data: json,
                success: function (outPut) {
                    if (outPut == 0) {
                        alert("no hay registros");
                    } else {
                        datos = JSON.parse(outPut);
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
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}

//********* MODULO ADMNISTRADOR
//********* APARTADO DE REGISTROS DE LOS SUPERVISORES

function cargarVerTodosRegistrosSupervisor() {
    
    $.ajax(
            {
                type: "GET",
                url: "Registro/listaTodosRegistroSupervisor.html",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                    document.getElementById("btnMonto").disabled=true;
                    //document.getElementById("btnExcel").disabled=true;
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
                            tabla += "<td>...</td>";
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
                            tabla += "<td>...</td>";
                            tabla += "</tr>";
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}
//********* MODULO ADMNISTRADOR
//********* APARTADO DE REGISTROS DE LOS AUXILIARES

function cargarVerTodosRegistrosAuxiliar() {
    
    $.ajax(
            {
                type: "GET",
                url: "Registro/listaTodosRegistroAuxiliar.html",

                success: function (data) {
                    $('#divMainContainer').html(data);
                    $("#divMainContainer").addClass("col-12");
                    document.getElementById("btnMonto").disabled=true;
                    //document.getElementById("btnExcel").disabled=true;
                }
            }
    );

}

function buscarTodosRegistrosAuxiliar(){
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
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].hora + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor+" "+datos[i].apellidoSupervisor+ "</td>";
                            tabla += "<td>" + datos[i].auxiliar+" "+datos[i].apellidoAuxiliar+ "</td>";
                            tabla += "<td>...</td>";
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
                        var tabla = "";

                        for (var i = 0; i < datos.length; i++) {

                            tabla += "<tr>";
                            tabla += "<td id='idRegistro' name='idRegistro' style='display:none'>" + datos[i].idServicioCliente + "</td>";
                            tabla += "<td>" + datos[i].fecha + "</td>";
                            tabla += "<td>" + datos[i].hora + "</td>";
                            tabla += "<td>" + datos[i].tiempo + "</td>";
                            tabla += "<td>" + datos[i].nombreServicio + "</td>";
                            tabla += "<td>" + datos[i].nombreCliente + "</td>";
                            tabla += "<td>" + datos[i].supervisor+" "+datos[i].apellidoSupervisor+ "</td>";
                            tabla += "<td>" + datos[i].auxiliar+" "+datos[i].apellidoAuxiliar+ "</td>";
                            tabla += "<td>...</td>";
                            tabla += "</tr>";
                            
                        }

                        $('#tbRegistro').html(tabla);
                    }

                }
            }
    );
}


function buscar() {
    var tableReg = document.getElementById('tbRegistro');
    var searchText = document.getElementById('txtSearch').value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}

//***********LISTA SUPERVISORES***********

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
                        tabla += "<td>" + "..." + "</td>";
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
                        tabla += "<td>" + "..." + "</td>";
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
        
        document.getElementById("txtSueldo").type="hidden";
        document.getElementById("txtSueldo").value=0;
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

        document.getElementById("txtSueldo").type="hidden";
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
                        tabla += "<td>" + "..." + "</td>";
                        tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarSupervisor(" + i + ")'>Modificar</button></td>";
                        tabla += "<td><button class='btn btn-danger' onclick='eliminarSupervisor(" + i + ")'>Eliminar</button></td>";
                        tabla += "</tr>";
                    }

                    $('#tbAuxiliar').html(tabla);

                }

            }
    );
}
