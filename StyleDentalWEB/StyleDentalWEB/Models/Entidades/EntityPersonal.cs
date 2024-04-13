using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StyleDentalWEB.Models.Entidades
{
    public class EntityPersonal
    {

        public string Id { get; set; }
        public string NombreCompleto { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string IdTipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string FechaNacimiento { get; set; }
        public string Celular { get; set; }
        public string Email { get; set; }
        public string IdGenero { get; set; }
        public string IdTipoSangre { get; set; }
        public string Edad { get; set; }
        public string DireccionVivienda { get; set; }
        public string IdCiudadNacimiento { get; set; }
        public string IdAreaTrabajo { get; set; }
        public string IdEspecialidad { get; set; }
        public string FechaRegistro { get; set; }
        public string FechaModificacion { get; set; }
        public string IpRegistro { get; set; }
        public string Estado { get; set; }
        public string departamento_id { get; set; }




        public string IdDepartamento { get; set; }

    }
}