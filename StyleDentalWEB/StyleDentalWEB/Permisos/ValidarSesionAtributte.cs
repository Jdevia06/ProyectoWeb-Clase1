using StyleDentalWEB.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StyleDentalWEB.Permisos
{
    public class ValidarSesionAttribute : ActionFilterAttribute
    {

        //public override void OnActionExecuting(ActionExecutingContext filterContext)

        //{
        //    //LOGICA PARA PASAR A LA VISTA INDEX SOLO SI SE LOGUEA
        //    if (HttpContext.Current.Session["usuario"] == null)
        //    {
        //        filterContext.Result = new RedirectResult("~/Login/Login");
        //    }
        //    base.OnActionExecuting(filterContext);
        //}
        private Rol IdRol;


        public ValidarSesionAttribute(Rol _IdRol)
        {

            IdRol = _IdRol;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (HttpContext.Current.Session["usuario"] != null)
            {

                EntityUsuario oUsuario = HttpContext.Current.Session["usuario"] as EntityUsuario;

                if(oUsuario.IdRol != this.IdRol)
                {
                    filterContext.Result = new RedirectResult("~/Home/SinPermiso");
                }
                
            }
            //filterContext.Result = new RedirectResult("~/Login/Login");

            base.OnActionExecuting(filterContext);
        }


    }
}