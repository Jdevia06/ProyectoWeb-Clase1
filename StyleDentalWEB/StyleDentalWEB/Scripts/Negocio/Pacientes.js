var btnNuevo = document.getElementById("btnNuevo");
var _IdPersonas = 0;
var TablaPersonas;
var _IdCiudad = 0;
var _IdDepto = 0;

$(document).ready(function () {

    CargarTipoSangre();
    debugger;
    CargarTipoDocumento();
    CargarGenero();
    cargarPersonas();
    CargarDepartamento();
    CargarCiudad();

    $(function () {
        $("#txtFechaNacimiento").datepicker();
    });



});

$("#btnBuscar").click(cargarPersonas);



$('#ddlDepartamento').change(function () {
    debugger;
    _IdDepto = $('#ddlDepartamento').val();
    $('#ddlCiudad').empty().append('<option value="" selected="selected">Seleccione una Ciudad</option>');
    CargarCiudad();
    console.log('Se ha seleccionado una opción');
});
/**TABLA */

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
/**FIN CARGAR DATOS */

btnNuevo.onclick = function () {

    $("#myModal").modal("show");
}

$("#btnAgregarPersona").click(AgregarPersona);

function AgregarPersona() {
    debugger;
    ValidarCorreo();


}



///*LIMPIAR FORMULARIO*/
$('#btnNuevo').on('click', limpiarModal);

function limpiarModal() {


    $('#txtNombre1').val("");
    $('#txtNombre2').val("");
    $('#txtApellido1').val("");
    $('#txtApellido2').val("");
    $('#ddlTipoDocumento').val("");
    $('#txtNumeroDocumento').val("");
    $('#txtFechaNacimiento').val("");
    $('#txtCelularModal').val("");
    $('#txtCorreoElectronicomodal').val("");
    $('#ddlTipoGenero').val("");
    $('#ddlTipoSangre').val("");
    $('#ddlDepartamento').val("");
    $('#ddlCiudad').val("");
    $('#txtEdad').val("");
    $('#txtDireccion').val("");

    $('#myModal').modal("show");
}



