using StyleDentalWEB.Models.Entidades;
using StyleDentalWEB.Permisos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StyleDentalWEB.Controllers
{

    [Authorize]
    public class HistorialMedicoController : Controller
    {

        [ValidarSesion(Rol.Administrador)]
        // GET: HistorialMedico
        public ActionResult HistorialMedico()
        {
            return View();
        }
    }
}