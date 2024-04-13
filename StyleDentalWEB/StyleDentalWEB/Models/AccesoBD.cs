using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StyleDentalWEB.Models
{
    public class AccesoBD
    {

        public List<SelectListItem> ConsultarParametrica(string Tabla = "")
        {
            DataSet ds = new DataSet();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConectBD"].ConnectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = "SELECT Id,Descripcion FROM " + Tabla + " WHERE Estado = 1";
            cmd.Connection = conn;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);
            conn.Close();
            IList<SelectListItem> Lista = new List<SelectListItem>();
            IDataReader dataReader = null;
            dataReader = ds.Tables[0].CreateDataReader();
            while (dataReader.Read())
            {
                Lista.Add(new System.Web.Mvc.SelectListItem { Value = dataReader["Id"].ToString().ToUpper(), Text = dataReader["Descripcion"].ToString() });
            }
            return Lista.ToList();
        }


        public List<SelectListItem> ConsultarParametricaCiudad(string Tabla = "", string IdDepto = "")
        {
            DataSet ds = new DataSet();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConectBD"].ConnectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = "SELECT Id,Descripcion FROM " + Tabla + " WHERE departamento_id = " + IdDepto;
            cmd.Connection = conn;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);
            conn.Close();
            IList<SelectListItem> Lista = new List<SelectListItem>();
            IDataReader dataReader = null;
            dataReader = ds.Tables[0].CreateDataReader();
            while (dataReader.Read())
            {
                Lista.Add(new System.Web.Mvc.SelectListItem { Value = dataReader["Id"].ToString().ToUpper(), Text = dataReader["Descripcion"].ToString() });
            }
            return Lista.ToList();
        }


    }
}