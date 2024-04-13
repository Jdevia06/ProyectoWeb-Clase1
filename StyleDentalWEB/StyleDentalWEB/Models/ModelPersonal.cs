using StyleDentalWEB.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace StyleDentalWEB.Models
{
    public class ModelPersonal
    {

        public bool RegistrarPersona(string nombre1, string nombre2, string apellido1, string apellido2,
            int TipoDoc, string NumDoc, string Edad, string FechaNac, string Cel, int TipoSangre, int Genero, int Departamento,
            int Ciudad, string Direccion, int areatrabajo, int especialidad, string correo)
        {
            string NombreCompleto;
            if (nombre2 == "" || nombre2 == null && apellido2 != "" || apellido2 != null)
            {
                NombreCompleto = nombre1 + " " + apellido1 + " " + apellido2;
            }
            if (apellido2 == "" || apellido2 == null && nombre2 != "" || nombre2 != null)
            {
                NombreCompleto = nombre1 + " " + nombre2 + apellido1;

            }
            if (nombre2 == "" || nombre2 == null && apellido2 == "" || apellido2 == null)
            {
                NombreCompleto = nombre1 + " " + apellido1;

            }
            else
            {
                NombreCompleto = nombre1 + " " + nombre2 + " " + apellido1 + " " + apellido2;

            }
            bool registrado = false;
            string mensaje;
            using (SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConectBD"].ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_RegistrarPersona", cn);
                cmd.Parameters.AddWithValue("NombreCompleto", NombreCompleto);
                cmd.Parameters.AddWithValue("PrimerNombre", nombre1);
                cmd.Parameters.AddWithValue("SegundoNombre", nombre2);
                cmd.Parameters.AddWithValue("PrimerApellido", apellido1);
                cmd.Parameters.AddWithValue("SegundoApellido", apellido2);
                cmd.Parameters.AddWithValue("IdTipoDocumento", TipoDoc);
                cmd.Parameters.AddWithValue("NumeroDocumento", NumDoc);
                cmd.Parameters.AddWithValue("FechaNacimiento", FechaNac);
                cmd.Parameters.AddWithValue("Celular", Cel);
                cmd.Parameters.AddWithValue("Email", correo);
                cmd.Parameters.AddWithValue("IdGenero", Genero);
                cmd.Parameters.AddWithValue("IdTipoSangre", TipoSangre);
                cmd.Parameters.AddWithValue("Edad", Edad);
                cmd.Parameters.AddWithValue("DireccionVivienda", Direccion);
                cmd.Parameters.AddWithValue("IdCiudadNacimiento", Ciudad);
                cmd.Parameters.AddWithValue("IdAreaTrabajo", areatrabajo);
                cmd.Parameters.AddWithValue("IdEspecialidad", especialidad);
                cmd.Parameters.Add("Registrado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("Mensaje", SqlDbType.VarChar, 100).Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                cmd.ExecuteNonQuery();
                registrado = Convert.ToBoolean(cmd.Parameters["Registrado"].Value);
                mensaje = cmd.Parameters["Mensaje"].Value.ToString();
                cn.Close();
            }
            return registrado;

        }


        public bool ActualizarPersona(int id, string nombre1, string nombre2, string apellido1, string apellido2,
            int TipoDoc, string NumDoc, string Edad, string FechaNac, string Cel, int TipoSangre, int Genero, int Departamento,
            int Ciudad, string Direccion, int areatrabajo, int especialidad, string correo)
        {
            string NombreCompleto;
            if (nombre2 == "" || nombre2 == null && apellido2 != "" || apellido2 != null)
            {
                NombreCompleto = nombre1 + " " + apellido1 + " " + apellido2;
            }
            if (apellido2 == "" || apellido2 == null && nombre2 != "" || nombre2 != null)
            {
                NombreCompleto = nombre1 + " " + nombre2 + apellido1;

            }
            if (nombre2 == "" || nombre2 == null && apellido2 == "" || apellido2 == null)
            {
                NombreCompleto = nombre1 + " " + apellido1;

            }
            else
            {
                NombreCompleto = nombre1 + " " + nombre2 + " " + apellido1 + " " + apellido2;

            }
            bool registrado = false;
            string mensaje;
            using (SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConectBD"].ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("spActualizarPersona", cn);
                cmd.Parameters.AddWithValue("Id", id);
                cmd.Parameters.AddWithValue("NombreCompleto", NombreCompleto);
                cmd.Parameters.AddWithValue("PrimerNombre", nombre1);
                cmd.Parameters.AddWithValue("SegundoNombre", nombre2);
                cmd.Parameters.AddWithValue("PrimerApellido", apellido1);
                cmd.Parameters.AddWithValue("SegundoApellido", apellido2);
                cmd.Parameters.AddWithValue("IdTipoDocumento", TipoDoc);
                cmd.Parameters.AddWithValue("NumeroDocumento", NumDoc);
                cmd.Parameters.AddWithValue("FechaNacimiento", FechaNac);
                cmd.Parameters.AddWithValue("Celular", Cel);
                cmd.Parameters.AddWithValue("Email", correo);
                cmd.Parameters.AddWithValue("IdGenero", Genero);
                cmd.Parameters.AddWithValue("IdTipoSangre", TipoSangre);
                cmd.Parameters.AddWithValue("Edad", Edad);
                cmd.Parameters.AddWithValue("DireccionVivienda", Direccion);
                cmd.Parameters.AddWithValue("IdCiudadNacimiento", Ciudad);
                cmd.Parameters.Add("Registrado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("Mensaje", SqlDbType.VarChar, 100).Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                cmd.ExecuteNonQuery();
                registrado = Convert.ToBoolean(cmd.Parameters["Registrado"].Value);
                mensaje = cmd.Parameters["Mensaje"].Value.ToString();
                cn.Close();
            }
            return registrado;

        }


    }
}