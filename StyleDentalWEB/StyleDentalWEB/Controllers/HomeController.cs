using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

using StyleDentalWEB.Permisos;
using StyleDentalWEB.Models.Entidades;
using StyleDentalWEB.Models;

namespace StyleDentalWEB.Controllers
{

    [Authorize]
    public class HomeController : Controller
    {
        AccesoBD BD = new AccesoBD();



        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }


        [ValidarSesion(Rol.Administrador)]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult SinPermiso()
        {
            ViewBag.Message = "Usted no cuenta con permisos para ver esta pagina";

            return View();
        }

        public ActionResult CerrarSesion()
        {
            FormsAuthentication.SignOut();

            Session["usuario"] = null;
            return RedirectToAction("Login", "Login");
        }


        [HttpPost]
        public ActionResult ConsultarParametricas(string Tabla = "")
        {
            IList<SelectListItem> Parametrica = new List<SelectListItem>();
            Parametrica = BD.ConsultarParametrica(Tabla);
            return Json(Parametrica);


        }

        [HttpPost]
        public ActionResult ConsultarParameCiudad(string Tabla = "", string IdDepto = "")
        {
            IList<SelectListItem> Parametrica = new List<SelectListItem>();
            Parametrica = BD.ConsultarParametricaCiudad(Tabla, IdDepto);
            return Json(Parametrica);


        }


        


    }
}