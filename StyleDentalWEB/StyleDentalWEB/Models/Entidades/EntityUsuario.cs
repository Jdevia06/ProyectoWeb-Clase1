using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StyleDentalWEB.Models.Entidades
{
    public class EntityUsuario
    {

        public string Id { get; set; }
        public string Correo { get; set; }
        public string Clave { get; set; }
        public Rol IdRol { get; set; }
        public string FechaRegistro { get; set; }
        public string Estado { get; set; }


        public string ConfirmarClave { get; set; }


    }
}