using StyleDentalWEB.Models;
using StyleDentalWEB.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace StyleDentalWEB.Controllers
{
    public class LoginController : Controller
    {

        ModelLogin MLogin = new ModelLogin();


        // GET: Login
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Registrar()
        {
            return View();
        }



        //REGISTRAR USUARIO

        [HttpPost]
        public ActionResult Registrar(EntityUsuario oUsuario)
        {
            bool registrado;
            string mensaje;

            if (oUsuario.Clave == oUsuario.ConfirmarClave)
            {
                oUsuario.Clave = ConvertirSha256(oUsuario.Clave);
            }
            else
            {
                ViewData["Mensaje"] = "Las contraseñas no coinciden";
                return View();
            }

            registrado = MLogin.RegistrarUsuario(oUsuario);
            if (registrado == false)
            {
                ViewData["Mensaje"] = "Error al crear el usuario";
                return View();
            }
            return RedirectToAction("Login", "Login");


        }

        //FIN REGISTRAR USUARIO

        // LOGIN
        [HttpPost]
        public ActionResult Login(EntityUsuario oUsuario)
        {

            EntityUsuario objeto = new EntityUsuario();

            oUsuario.Clave = ConvertirSha256(oUsuario.Clave);

            using (SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConectBD"].ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ValidarUsuario", cn);
                cmd.Parameters.AddWithValue("Correo", oUsuario.Correo);
                cmd.Parameters.AddWithValue("Clave", oUsuario.Clave);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        objeto = new EntityUsuario()
                        {
                            Id = dr[0].ToString(),
                            Correo = dr[1].ToString(),
                            Clave = dr[2].ToString(),
                            IdRol = (Rol)dr[3],
                        };
                       
                    }

                }
            }

            if (objeto.Id != "0")

            {

                FormsAuthentication.SetAuthCookie(objeto.Correo, false);

                Session["usuario"] = objeto;
                Session["Rol"] = objeto.IdRol.ToString();
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewData["Mensaje"] = "Usuario no encontrado";
                return View();
            }


        }

        //FIN LOGIN

        //CIFRADO DE CONTRASEÑA
        public static string ConvertirSha256(string texto)
        {
            //using System.Text;
            //USAR LA REFERENCIA DE "System.Security.Cryptography"
            string Contra = "";
            StringBuilder Sb = new StringBuilder();
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(texto);
                byte[] hash = sha256.ComputeHash(bytes);

                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    sb.Append(hash[i].ToString("x2"));
                }
                Contra = sb.ToString();
            }                

            return Contra;

        }


    }
}