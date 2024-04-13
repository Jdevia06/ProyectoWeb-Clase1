using StyleDentalWEB.Models;
using StyleDentalWEB.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StyleDentalWEB.Controllers
{
    public class RegistrarPersonalController : Controller
    {
        ModelPersonal MP = new ModelPersonal();

        // GET: RegistrarPersonal
        public ActionResult RegistrarPersonal()
        {
            return View();
        }

        public ActionResult _PartialView()
        {
            return PartialView("~/Views/Parciales/ParcialPersonal.cshtml");
        }



        [HttpPost]
        public ActionResult RegistrarPersona(int id, string nombre1, string nombre2, string apellido1, string apellido2,
            int TipoDoc, string NumDoc, string Edad, string FechaNac, string Cel, int TipoSangre, int Genero, int Departamento,
            int Ciudad, string Direccion, int areatrabajo, int especialidad, string correo)
        {
            bool Registrado;

            if (id != 0)
            {
                Registrado = MP.ActualizarPersona(id, nombre1, nombre2, apellido1, apellido2, TipoDoc, NumDoc,
                   Edad, FechaNac, Cel, TipoSangre, Genero, Departamento, Ciudad, Direccion, areatrabajo, especialidad, correo);

            }
            else
            {
                Registrado = MP.RegistrarPersona( nombre1, nombre2, apellido1, apellido2, TipoDoc, NumDoc,
                   Edad, FechaNac, Cel, TipoSangre, Genero, Departamento, Ciudad, Direccion, areatrabajo, especialidad, correo);

            }

            if (Registrado == true)
            {
                return RedirectToAction("RegistrarPersonal", "RegistrarPersonal");
            }
            else
            {
                ViewData["Mensaje"] = "Usuario no valido";
                return null;
            }


        }


    }
}