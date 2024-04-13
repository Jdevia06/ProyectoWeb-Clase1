$(document).ready(function () {
    //evento de inicializacion
    modulo_Personal.init();
});

var modulo_Personal = (function () {

    var $btnNuevo, $txtNombre1, $txtNombre2, $txtApellido1, $txtApellido2, $ddlTipoDocumento, $txtNumeroDocumento, $txtEdad, $txtFechaNacimiento,
        $txtCelularModal, $ddlTipoSangre, $ddlTipoGenero, $ddlDepartamento, $ddlCiudad, $txtDireccion, $ddlAreaTrabajo, $ddlEspecialidad, $btnBuscar,
        $txtCorreoElectronicomodal, $TablaPersonal, $btnGuardar;

    var _IdPersonas=0; //faltaba definirla como global
    var _IdCiudad = 0;
    var _IdDepto = 0;
    var _IdArea = 0;

    var init = function init() {

        //Obtengo la referencia del control en la variable $btnNuevo
        $btnNuevo = $("#btnNuevo");
        $btnBuscar = $("#btnBuscar");
        $btnGuardar = $("#btnAgregarPersonal");

        //CARGUE DE DATOS
        CargarTipoSangre();
        debugger;
        CargarTipoDocumento();
        CargarGenero();
        CargarDepartamento();
        CargarAreaTrabajo();
        CargarEspecialidad();
        CargarCiudad();


        //Referencia a la caja de texto llamada txtNombre
        $txtNombre1 = $("#txtNombre1");
        $txtNombre2 = $("#txtNombre2");
        $txtApellido1 = $("#txtApellido1");
        $txtApellido2 = $("#txtApellido2");
        $ddlTipoDocumento = $("#ddlTipoDocumento");
        $txtNumeroDocumento = $("#txtNumeroDocumento");
        $txtEdad = $("#txtEdad");
        $txtFechaNacimiento = $("#txtFechaNacimiento");
        $txtCorreoElectronicomodal = $("#txtCorreoElectronicomodal");
        $txtCelularModal = $("#txtCelularModal");
        $ddlTipoSangre = $("#ddlTipoSangre");
        $ddlTipoGenero = $("#ddlTipoGenero");
        $ddlDepartamento = $("#ddlDepartamento");
        $ddlCiudad = $("#ddlCiudad");
        $txtDireccion = $("#txtDireccion");
        $ddlAreaTrabajo = $("#ddlAreaTrabajo");
        $ddlEspecialidad = $("#ddlEspecialidad");


        $btnNuevo.click(abrirModalNuevo);
        $btnBuscar.click(clicBuscar);
        $btnGuardar.click(GuardarInformacion);

        inicializaTabla();

        $('#Especialidad').hide();

       

        //alert('inicio de pagina');
    };

    function abrirModalNuevo() {
        debugger;
        _IdPersonas = 0;
        $('#myModal').modal("show");
        
        $txtNombre1.val('');
        $txtNombre2.val('');
        $txtApellido1.val('');
        $txtApellido2.val('');
        $ddlTipoDocumento.val('');
        $txtNumeroDocumento.val('');
        $txtEdad.val('');
        $txtFechaNacimiento.val('');
        $txtCelularModal.val('');
        $ddlTipoSangre.val('');
        $ddlTipoGenero.val('');
        $ddlDepartamento.val('');
        $ddlCiudad.val('');
        $txtDireccion.val('');
        $ddlAreaTrabajo.val('');
        $ddlEspecialidad.val('');
        $txtCorreoElectronicomodal.val('');
    }

    function GuardarInformacion() {
        debugger;
        //FUNCION QUE ENVIA LOS DATOS AL CONTROLADOR Persona AL METODO IngresarPersona
        EnviarAControlador($txtNombre1.val(), $txtNombre2.val(), $txtApellido1.val(), $txtApellido2.val(), $ddlTipoDocumento.val(), $txtNumeroDocumento.val(),
            $txtEdad.val(), $txtFechaNacimiento.val(), $txtCelularModal.val(), $ddlTipoSangre.val(), $ddlTipoGenero.val(), $ddlDepartamento.val(),
            $ddlCiudad.val(), $txtDireccion.val(), $ddlAreaTrabajo.val(), $ddlEspecialidad.val(), $txtCorreoElectronicomodal.val());

    };


    $('#ddlDepartamento').change(function () {
        debugger;
        _IdDepto = $('#ddlDepartamento').val();
        $('#ddlCiudad').empty().append('<option value="" selected="selected">Seleccione una Ciudad</option>');
        CargarCiudad();
        console.log('Se ha seleccionado una opción');
    });

    $('#ddlAreaTrabajo').change(function () {
        debugger;
        _IdArea = $('#ddlAreaTrabajo').val();
        if (_IdArea == 1) {
            $('#Especialidad').show();
        } else {
            $('#Especialidad').hide();
        }
    });


    /**CARGAR DATOS */

    function CargarCiudad() {
        debugger;
        var Tabla = "Ciudad";
        var URL = "/Home/ConsultarParameCiudad";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla,
                    IdDepto: _IdDepto

                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlCiudad").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                    if (_IdCiudad != 0) {
                        $("#ddlCiudad").val(_IdCiudad);
                    }
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS TIPO_SUJETO/ETNIA - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    function CargarDepartamento() {
        debugger;
        var Tabla = "Departamento";
        var URL = "/Home/ConsultarParametricas";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla
                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlDepartamento").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS TIPO_SUJETO/ETNIA - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    function CargarTipoDocumento() {
        debugger;
        var Tabla = "TipoDocumento";
        var URL = "/Home/ConsultarParametricas";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla
                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlTipoDocumento").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS TIPO_SUJETO/ETNIA - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    function CargarTipoSangre() {
        debugger;
        var Tabla = "TipoSangre";
        var URL = "/Home/ConsultarParametricas";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla
                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlTipoSangre").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS TIPO_SUJETO/ETNIA - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    function CargarGenero() {
        debugger;
        var Tabla = "Genero";
        var URL = "/Home/ConsultarParametricas";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla
                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlTipoGenero").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS TIPO_SUJETO/ETNIA - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    function CargarAreaTrabajo() {
        debugger;
        var Tabla = "AreaTrabajo";
        var URL = "/Home/ConsultarParametricas";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla
                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlAreaTrabajo").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS AREA TRABAJO - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    function CargarEspecialidad() {
        debugger;
        var Tabla = "Especialidad";
        var URL = "/Home/ConsultarParametricas";
        $.ajax(
            {
                type: 'post',
                data:
                {
                    Tabla: Tabla
                },
                dataType: 'json',
                url: URL,
                success: function (data) {
                    //
                    $.each(data, function (index, optionData) {

                        $("#ddlEspecialidad").append("<option value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("[EDICION DE REGISTROS] - CARGANDO LISTADOS ESPECIALIDAD - ERROR : " + error);
                    //
                    alert(error.responseText);
                }
            });
    };

    /**FIN CARGAR DATOS */

    /* VALIDAR CAMPOS*/
    $('#txtNombre1').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo letras
        if (!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo letras.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtNombre2').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo letras
        if (!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo letras.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtApellido1').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo letras
        if (!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo letras.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtApellido2').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo letras
        if (!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo letras.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtCelularModal').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo números
        if (!(inputValue >= 48 && inputValue <= 57)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo números.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtEdad').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo números
        if (!(inputValue >= 48 && inputValue <= 57)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo números.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtNumeroDocumento').on('keypress', function (event) {
        var inputValue = event.which;
        // Permitir solo números
        if (!(inputValue >= 48 && inputValue <= 57)) {
            event.preventDefault();
            $('#mensaje-error').html('Por favor, ingrese solo números.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    $('#txtCorreoElectronicomodal').on('blur', function () {
        var correoElectronico = $('#txtCorreoElectronicomodal').val();
        // Expresión regular para validar correo electrónico
        var expresionRegular = /\S+@\S+\.\S+/;
        if (!expresionRegular.test(correoElectronico)) {
            $('#mensaje-error').html('Por favor, ingrese un correo electrónico válido.');
        } else {
            $('#mensaje-error').html('');
        }
    });

    function ValidarCorreo() {
        var correoElectronico = $('#txtCorreoElectronicomodal').val();
        // Expresión regular para validar correo electrónico
        var expresionRegular = /\S+@\S+\.\S+/;
        if (!expresionRegular.test(correoElectronico)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo electronco no valido!'
            })
        }
    }
/*FIN DE VALIDAR CAMPOS*/


    function clicBuscar() {
        debugger;

        //FUNCION QUE ENVIA LOS DATOS AL CONTROLADOR Persona AL METODO IngresarPersona
        ConsultarControlador($txtNombre.val(), $txtTelefono.val());

    };


    function EnviarAControlador(PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, TipoDoc, NumeroDoc, Edad, FechaNac, Celular,
        TipoSangre, TipoGenero, Depto, Municipio, Direccion, AreaTrabajo, Especialidad, Correo) {
        debugger;
        $.ajax(
            {
                type: 'POST',
                dataType: 'json',
                data:
                {
                    id: _IdPersonas,
                    nombre1: PrimerNombre,
                    nombre2: SegundoNombre,
                    apellido1: PrimerApellido,
                    apellido2: SegundoApellido,
                    TipoDoc: TipoDoc,
                    NumDoc: NumeroDoc,
                    Edad: Edad,
                    FechaNac: FechaNac,
                    Cel: Celular,
                    TipoSangre: TipoSangre,
                    Genero: TipoGenero,
                    Departamento: Depto,
                    Ciudad: Municipio,
                    Direccion: Direccion,
                    areatrabajo: AreaTrabajo,
                    especialidad: Especialidad,
                    correo: Correo

                },
                url: '/RegistrarPersonal/RegistrarPersona',
                success:                    
                    function (jqXHR, textStatus, errorThrown) {
                        $('#myModal').modal("hide"); //cierra el modal

                        //imprime en la consola, la respuesta del controlador
                        console.log(jqXHR);
                        $TablaPersonal.ajax.reload(); //actualiza la tabla


                    }
            });
    }


    function ConsultarControlador(ElNombre, telefono, fechaNa) {

        $.ajax(
            {
                type: 'POST',
                dataType: 'json',
                data:
                {
                    nombre: ElNombre,
                    tele: telefono,
                    fechanac: fechaNa
                },
                url: '/Personas/ConsultarDatos',
                success:
                    function (jqXHR, textStatus, errorThrown) {
                        debugger;
                        //imprime en la consola, la respuesta del controlador
                        console.log(jqXHR);


                    }
            });
    }


    function FormateaFecha(value) {
        if (value === null) return "";
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        return formatDate2(dt);
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('-');
    }

    function formatDate2(date) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }




    function inicializaTabla() {
        debugger;
        $TablaPersonal = $('#tblPersonal').DataTable({

            "columnDefs": [ // Ocultar columna Necesaria
                {
                    "targets": [4],
                    "visible": true,
                },
            ],

            'responsive': true,
            'buttons': [
                'print',
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],

            'ajax': {
                'type': "POST",
                'datatype': "Json",
                'data': function (d) {
                    //string nombre, string telefono, string fecha
                    d.nombre = "",
                        d.telefono = "",
                        d.fecha = ""
                },
                'url': '/Personas/ConsultarDatos',
                "dataSrc": function (d) {
                    debugger;
                    return d;
                }
            },

            "columns": [
                {
                    //"className": 'dt-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },

                { "title": "Nombre Reporta", "data": "Nombres" },
                { "title": "Telefono", "data": "Telefono" },
                {
                    "title": "Fecha",
                    "data": "FechaRegistro",
                    "type": "date ",
                    "render": function (value) {
                        if (value === null) return "";
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(value);
                        var dt = new Date(parseFloat(results[1]));
                        return formatDate2(dt);
                    }
                },


                {
                    "title": "Editar",
                    "data": null,
                    "defaultContent": "",
                    "className": "dt-center",
                    "orderable": false,
                    "render": function (data, type, row) {
                        return '\
                        <span>\
                            \
                            <div>\
                                \
                                <button type="button" class="btn btn-primary float-center btn-xs editarPersonas">Editar</button>\
                                \
                            </div>\
                        </span> ';
                    }
                },
                {
                    "title": "Eliminar",
                    "data": null,
                    "defaultContent": "",
                    "className": "dt-center",
                    "orderable": false,
                    "render": function (data, type, row) {
                        return '\
                        <span>\
                            \
                            <div>\
                                <button type = "button" class= "dropdown-btn eliminarAbonados btn btn-danger float-center" " href="#"><i class="la la - save"></i>Eliminar</a>\
                                \
                                \
                            </div>\
                        </span> ';
                    }

                },
            ],
            "oLanguage": {
                "sSearch": "Búsqueda rápida:",
                "sLengthMenu": "Listar _MENU_  registros",
                "sInfo": "Listando _START_ a _END_ de _TOTAL_ Registros",
                "sEmptyTable": "No se encontraron datos con el criterio de consulta suministrado",
                "sInfoEmpty": "Sin registros para mostrar",
                "sInfoFiltered": " (filtrando de _MAX_ registros)",
                "sProcessing": "Realizando la consulta",
                "sZeroRecords": "No hay registros coincidentes con el filtro suministrado"
            },
            "order": [[1, 'asc']]
        });

        // Add event listener for opening and closing details
        $('#tblPersonas tbody').on('click', 'td.dt-control', function () {
            var tr = $(this).closest('tr');
            var row = TablaAbonados.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });

        $('#tblPersonas').on('click', '.editarPersonas', CargarModalEditarPersonas);

        function CargarModalEditarPersonas(e) {
            debugger;
            e.preventDefault();
            var datos = $TablaPersonal.row($(this).parents('tr')).data();

            _IdPersonas = datos.id;  //coloco el id que es a llave de la tabla

            $txtNombre.val(datos.Nombres);
            $txtTelefono.val(datos.Telefono);



            var f1 = FormateaFecha(datos.FechaRegistro);             //$txtFechaNacimiento.val(f1);


            $('#myModal').modal("show");
        }

    }


    return {
        init: init

    };




})();




//------





//$("#btnBuscar").click(cargarPersonas);

//$(function () {
//    // Manejar el evento submit del formulario
//    $('#AgregarPersonal').submit(function (e) {
//        e.preventDefault(); // Evitar el comportamiento predeterminado de envío del formulario

//        // Enviar los datos del formulario mediante AJAX
//        $.ajax({
//            url: $(this).attr('action'),
//            type: 'POST',
//            data: $(this).serialize(),
//            success: function (response) {
//                if (response.success) {
//                    // Si la respuesta es exitosa, puedes actualizar el contenido del modal o cerrarlo
//                    $('#myModal').modal('hide');
//                } else {
//                    // Si hay errores de validación, muestra los mensajes dentro del modal
//                    $.each(response.errors, function (fieldName, errorMessage) {
//                        var container = $('#' + fieldName).closest('.form-group');
//                        container.addClass('has-error');
//                        container.find('.error-message').text(errorMessage);
//                    });
//                }
//            }
//        });
//    });
//});






/**TABLA */
/*
function cargarPersonas() {
    $.ajax({
        url: '/Persona/ConsultarPersona',
        type: 'POST',
        dataType: 'json',
        data: function (Persona) {
            debugger;
            Persona.NombreCompleto = $("#NombreCompleto").val();
            Persona.NumeroDocumento = $("#NumeroDocumento").val();
        },
        success: function (data) {

            var tabla = $('#TablaPersona');
            tabla.empty();

            $.each(data, function (i, item) {
                var fila = '<tr><td>' + item.Id + '</td><td>' + item.PrimerNombre + '</td><td>' + item.PrimerApellido + '</td>';
                fila += '<td><button class="btn-editar" data-id="' + item.Id + '">Editar</button> <button class="btn-eliminar" data-id="' + item.Id + '">Eliminar</button></td></tr>';
                tabla.append(fila);
            });
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

$(document).on('click', '.btn-editar', function () {


    var id = $(this).data('id');
    var Persona = {
        Id: id
    };
    debugger;
    $("#myModal").modal("show");
    $.ajax({
        url: '/Persona/ConsultarPersona',
        type: 'POST',
        dataType: 'json',
        data: Persona,
        success: function (data) {


            $('#txtId').val(data[0].Id);
            $('#txtNombre1').val(data[0].PrimerNombre);
            $('#txtNombre2').val(data[0].SegundoNombre);
            $('#txtApellido1').val(data[0].PrimerApellido);
            $('#txtApellido2').val(data[0].SegundoApellido);
            $('#ddlTipoDocumento').val(data[0].IdTipoDocumento);
            $('#txtNumeroDocumento').val(data[0].NumeroDocumento);
            $('#txtFechaNacimiento').val(data[0].FechaNacimiento);
            $('#txtCelularModal').val(data[0].Celular);
            $('#txtCorreoElectronicomodal').val(data[0].Email);
            $('#ddlTipoGenero').val(data[0].IdGenero);
            $('#ddlTipoSangre').val(data[0].IdTipoSangre);
            $('#txtEdad').val(data[0].Edad);
            //_IdCiudad = data[0].IdCiudadNacimiento;
            $('#ddlDepartamento').val(data[0].departamento_id);
            $('#ddlDepartamento').trigger('change');
            $('#ddlCiudad').val(data[0].IdCiudadNacimiento);
            $('#txtDireccion').val(data[0].DireccionVivienda);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

});

$(document).on('click', '.btn-eliminar', function () {
    var id = $(this).data('id');

    if (confirm('¿Está seguro de que desea eliminar esta persona?')) {
        $.ajax({
            url: '@Url.Action("DeletePersona", "Home")',
            type: 'POST',
            data: { id: id },
            success: function () {
                cargarPersonas();
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
});
*/

