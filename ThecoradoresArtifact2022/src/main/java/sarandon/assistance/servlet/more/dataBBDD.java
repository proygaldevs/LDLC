package sarandon.assistance.servlet.more;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;


import sarandon.assistance.model.Core;
import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.vo.Afiliado;
import sarandon.assistance.vo.Cita;
import sarandon.assistance.vo.ClientAffiliates;
import sarandon.assistance.vo.ColorForModBoadr;
import sarandon.assistance.vo.ElementoPerfil;
import sarandon.assistance.vo.Imagen;
import sarandon.assistance.vo.Informacion;
import sarandon.assistance.vo.OfertasAfiliado;
import sarandon.assistance.vo.PagoVO;
import sarandon.assistance.vo.Perfil;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Propuesta;
import sarandon.assistance.vo.Proyecto;
import sarandon.assistance.vo.RegaloVO;
import sarandon.assistance.vo.TituloValorParaFicherosTexto;
import sarandon.assistance.vo.User;
import sarandon.assistance.vo.portfolio.ImagenVO;
import sarandon.assistance.vo.portfolio.PortfolioItem;
import sarandon.assistance.vo.portfolio.SeccionesVO;
import sarandon.decotheco.ldlc.controller.ListaCompraController;
import sarandon.decotheco.thecoradores.bean.Decoradores;
import sarandon.decotheco.thecoradores.bean.Etiquetas;
import sarandon.decotheco.thecoradores.bean.ProjectsStates;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sarandon.decotheco.thecoradores.bean.Sensaciones;
import sarandon.decotheco.thecoradores.bean.Trabajos;
import sarandon.decotheco.thecoradores.bean.Users;



import com.amazonaws.services.rekognition.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.sun.xml.internal.ws.api.pipe.NextAction;

public class dataBBDD {
	private final static Logger log = Logger.getLogger(dataBBDD.class);

	/**
	 * Conecta con la base de datos 'cliente' de un servidor MySQL local.
	 */
	public Connection conectar() throws Exception {
		/*
		 * try { Class.forName("com.mysql.jdbc.Driver").newInstance();
		 * Properties p= new Properties(); this.conn =
		 * DriverManager.getConnection(
		 * "jdbc:mysql://localhost:3306/decotheco", "root",
		 * "D265y2BO"); // this.conn = DriverManager.getConnection(
		 * //"jdbc:mysql://localhost:3307/decotheco", "root",
		 * "root"); this.stmt = conn.createStatement(); } catch (Exception e) {
		 * log.error("ERRor en conectar a BBDD: " + e.getMessage()); }
		 */

		String DATASOURCE_CONTEXT = "java:/comp/env/jdbc/TestDB";

		Connection result = null;
		try {
			Context initialContext = new InitialContext();
			if (initialContext == null) {
				log.error("ERROR JNDI problem. Cannot get InitialContext.");
			}
			log.info("dataBBDD Context initialContext = new InitialContext();");
			DataSource datasource = (DataSource) initialContext
					.lookup(DATASOURCE_CONTEXT);
			log.info("dataBBDD DataSource datasource = (DataSource) initialContext.lookup(DATASOURCE_CONTEXT); ");
			
			if (datasource != null) {
				result = datasource.getConnection();
			} else {
				log.error("ERROR Failed to lookup datasource.");
			}
		} catch (NamingException ex) {
			log.error("ERRORCannot get connection: " , ex);
		} catch (SQLException ex) {
			log.error("ERROR Cannot get connection: " + ex.getMessage());
		}
		return result;

	}

	/**
	 * @throws Exception
	 *             DOCUMENT ME!
	 */
	public void desconectar() throws Exception {
		/*
		 * if (this.stmt != null) { try { this.stmt.close(); } catch
		 * (SQLException SQLE) { ; } } if (this.conn != null) { try {
		 * this.conn.close(); } catch (SQLException SQLE) { ; } }
		 */
	}

	// ArrayList<Evento> listaEventos = new ArrayList<Evento>(0);
	// ArrayList<sponsor> listaSponsors = new ArrayList<sponsor>(0);
	// ArrayList<Video> listaVideo = new ArrayList<Video>(0);
	// ArrayList<Seguimiento> listaSeguimiento = new ArrayList<Seguimiento>(0);

	private int createUser(String mail, String pass, String userName)
			throws Exception {
		log.info("dataBBDD createUser");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "SELECT * FROM users where mail="
						+ "'" + mail + "'";
				log.info(sql);
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					return 1; // El mail ya existe
				}
				if (userName == null) {
					userName = mail;
				}
				if (userName.length() == 0) {
					userName = mail;
				}

				String query = " insert into users (mail, pass, username)"
						+ " values (?, ?, ?)";

				log.info(query);
				PreparedStatement preparedStmt = conn.prepareStatement(query);
				preparedStmt.setString(1, mail);
				preparedStmt.setString(2, pass);
				preparedStmt.setString(3, userName);

				preparedStmt.execute();

				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				// createProyecto(mail);

			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 2;// alguna excepciï¿½n no controlada
		}
		return 0;// todo correcto
	}

	private User getLogin(String mail, String pass, int detail_level, int id_proyecto, String path)
			throws Exception {
		log.info("dataBBDD getLogin");
		long startTime = System.currentTimeMillis();
		
		User user = new User();
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "SELECT id, mail, username, pass FROM users where mail="
						+ "'" + mail + "' AND pass='" + pass + "'";
				log.info(sql);
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);

				if (rs.next()) {
					user.id = rs.getInt("id");
					user.mail = rs.getString("mail");
					user.userName = rs.getString("username");
					long endTime1 = System.currentTimeMillis();
					/*System.out.println("------------------------------------------------------------------------------------------------Antes de proyectos fueron: " + (endTime1-startTime));*/
					user.proyectos = getPoyectosList(user.id, detail_level,id_proyecto, path);
					long endTime2 = System.currentTimeMillis();
					/*System.out.println("--------------------------------------------------------------------------------------------------Despues de proyectos fueron: " + (endTime2-startTime));*/
					
				}

			}
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return user;// todo correcto
	}

	
	private ArrayList<Imagen> getImagenesList(String habitacion,
			String estilos, String minimalismo, String colores, String tiendas)
			throws Exception {
		log.info("dataBBDD getImagenesList");
		ArrayList<Imagen> imagenes = new ArrayList<Imagen>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {
			log.info("dataBBDD El filtro de imagenes pide habitación: " + habitacion);

			String sql = "";
			if (conn != null) {
				
					sql = "SELECT id, nombre FROM imagenes where (habitacion like '"
							+ habitacion
							+ "' AND ((estilo like '"
							+ estilos
							+ "' AND color like '"
							+ colores
							+ "') OR (estilo like '"
							+ estilos
							+ "' AND minimalismo like '"
							+ minimalismo
							+ "') OR (color like '"
							+ colores
							+ "' AND minimalismo like '"
							+ minimalismo
							+ "'))) ORDER BY RAND() LIMIT 30";

				
				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);
				while (rs.next()) {
					Imagen imagen = new Imagen();
					imagen.id = rs.getInt("id");
					imagen.nombre = rs.getString("nombre");

					imagenes.add(imagen);
				}
				ResultSet rs1=null;
				if(imagenes.size()<12){
					sql = "SELECT id, nombre FROM imagenes where habitacion like '"
							+ habitacion + "' ORDER BY RAND() LIMIT 40";
					rs1 = stmt.executeQuery(sql);
					imagenes = new ArrayList<Imagen>(0);
					while (rs1.next()) {
						Imagen imagen = new Imagen();
						imagen.id = rs1.getInt("id");
						imagen.nombre = rs1.getString("nombre");

						imagenes.add(imagen);
					}
				
				
				if(imagenes.size()<=30){
					int numberForAdd= 40-imagenes.size();
					sql = "SELECT id, nombre FROM imagenes where (habitacion like 'salon"
							+ "' AND ((estilo like '"
							+ estilos
							+ "' AND color like '"
							+ colores
							+ "') OR (estilo like '"
							+ estilos
							+ "' AND minimalismo like '"
							+ minimalismo
							+ "') OR (color like '"
							+ colores
							+ "' AND minimalismo like '"
							+ minimalismo
							+ "'))) ORDER BY RAND() LIMIT "+numberForAdd;
					rs = stmt.executeQuery(sql);
					while (rs.next()) {
						Imagen imagen = new Imagen();
						imagen.id = rs.getInt("id");
						imagen.nombre = rs.getString("nombre");

						imagenes.add(imagen);
					}
				}
				}
				rs.close();
				if(rs1!=null)
					rs1.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return null;
		}
		return imagenes;
	}
	
	
	private ArrayList<Imagen> getFrasesList() throws Exception {
		log.info("dataBBDD getFrasesList");
		ArrayList<Imagen> imagenes = new ArrayList<Imagen>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "";

				sql = "SELECT id, nombre, tipo FROM sensaciones where  tipo like 'frase'  ORDER BY RAND() ";

				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);
				while (rs.next()) {
					Imagen imagen = new Imagen();
					imagen.id = rs.getInt("id");
					imagen.nombre = rs.getString("nombre");

					imagenes.add(imagen);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return null;
		}
		return imagenes;
	}

	private ArrayList<Imagen> getSensacionesList(String tipo, String color)
			throws Exception {
		log.info("dataBBDD getSensacionesList");
		ArrayList<Imagen> imagenes = new ArrayList<Imagen>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "";
				if (tipo.contains("lifestyle")) {
					sql = "SELECT id, nombre, tipo FROM sensaciones where ((tipo like 'lifestyle' and color like '"
							+ color + "'))  ORDER BY RAND() ";
				} else {
					sql = "SELECT id, nombre, tipo FROM sensaciones where (tipo like 'dormitorio-infantil' )  ORDER BY RAND() ";
				}

				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);
				while (rs.next()) {
					Imagen imagen = new Imagen();
					imagen.id = rs.getInt("id");
					imagen.nombre = rs.getString("nombre");

					imagenes.add(imagen);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return null;
		}
		return imagenes;
	}
	
/*	public ArrayList<Imagen> getImagenesList(String habitacion,
			String estilos, String minimalismo, String colores, String tiendas)
			throws Exception {
		ArrayList<Imagen> imagenes = new ArrayList<Imagen>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {
			log.info("dataBBDD El filtro de imagenes pide habitaciï¿½n: " + habitacion);

			String sql = "";
			if (conn != null) {
				if (habitacion.contains("recibidor")) {
					sql = "SELECT id, nombre FROM imagenes where habitacion like '"
							+ habitacion + "'";

				} else {
					sql = "SELECT id, nombre FROM imagenes where (habitacion like '"
							+ habitacion
							+ "' AND ((estilo like '"
							+ estilos
							+ "' AND color like '"
							+ colores
							+ "') OR (estilo like '"
							+ estilos
							+ "' AND minimalismo like '"
							+ minimalismo
							+ "') OR (color like '"
							+ colores
							+ "' AND minimalismo like '"
							+ minimalismo
							+ "'))) LIMIT 30";

				}
				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				while (rs.next()) {
					Imagen imagen = new Imagen();
					imagen.id = rs.getInt("id");
					imagen.nombre = rs.getString("nombre");

					imagenes.add(imagen);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return imagenes;
	}

	public List<Sensaciones> getFrasesList() throws Exception {
		List<Sensaciones> imagenes = new ArrayList<Sensaciones>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "";

				sql = "SELECT id, nombre, tipo FROM sensaciones where  tipo like 'frase'";

				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				while (rs.next()) {
					Sensaciones imagen = new Sensaciones();
					imagen.setId(rs.getInt("id"));
					imagen.setNombre(rs.getString("nombre"));

					imagenes.add(imagen);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return imagenes;
	}

	private ArrayList<Imagen> getSensacionesList(String tipo, String color)
			throws Exception {
		ArrayList<Imagen> imagenes = new ArrayList<Imagen>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "";
				if (tipo.contains("lifestyle")) {
					sql = "SELECT id, nombre, tipo FROM sensaciones where ((tipo like 'lifestyle' and color like '"
							+ color + "'))";
				} else {
					sql = "SELECT id, nombre, tipo FROM sensaciones where (tipo like 'dormitorio-infantil' )";
				}

				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				while (rs.next()) {
					Imagen imagen = new Imagen();
					imagen.id = rs.getInt("id");
					imagen.nombre = rs.getString("nombre");

					imagenes.add(imagen);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return imagenes;
	}*/

	private ArrayList<ColorForModBoadr> getColoresModBoardList(String colores)
			throws Exception {
		log.info("dataBBDD getColoresModBoardList");
		ArrayList<ColorForModBoadr> coloresMB = new ArrayList<ColorForModBoadr>(
				0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "SELECT id, nombreimagen, color1, color2, color3, color4, color5, color6 FROM colores where estilo_colores like '"
						+ colores + "'";
				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				while (rs.next()) {
					ColorForModBoadr colorMB = new ColorForModBoadr(
							rs.getInt("id"), rs.getString("nombreimagen"),
							rs.getString("color1"), rs.getString("color2"),
							rs.getString("color3"), rs.getString("color4"),
							rs.getString("color5"), rs.getString("color6"));

					coloresMB.add(colorMB);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			
		}
		return coloresMB;
	}

	private ArrayList<Proyecto> getPoyectosList(int id_usuario,int detailLevel, int id_proyecto, String path)
			throws Exception {
		log.info("dataBBDD getPoyectosList");
		ArrayList<Proyecto> proyectos = new ArrayList<Proyecto>(0);
		
		ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		boolean haveNullProject=false;
		try {
			if(detailLevel==4||detailLevel==1||detailLevel==10){ 
				clientAffiliates=new CoreImpl().getClientsAffiliates(clientAffiliates);
			}
			if (conn != null) {
				String userMail=getUserFromId(id_usuario).mail;
				
				String sql = "SELECT id, nombre_proyecto, titulo_proyecto, nombre_proyecto_decorador, finalizado, pagado, fechafin, id_decorador, estado, fechaestado, paso3_propuestas, paso3_3d, paso4_plano, paso4_ldlc FROM projects where id_usuario='"
						+ id_usuario + "' and finalizado not in (-1) order by fechaestado desc";
				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				int old_detailLevel=new Integer(detailLevel);
				while (rs.next()) {
					int id_aux=rs.getInt("id");
					if(id_proyecto>0)
						if(id_proyecto==id_aux){
							detailLevel=old_detailLevel;
						}else{
							detailLevel=0;
						}
					
					Proyecto proyecto = new Proyecto(id_aux,
							rs.getString("nombre_proyecto"),
							rs.getString("titulo_proyecto"),
							rs.getString("nombre_proyecto_decorador"),
							rs.getInt("finalizado"), rs.getInt("pagado"),
							rs.getDate("fechafin"),rs.getString("paso3_propuestas"),rs.getString("paso3_3d"),rs.getString("paso4_plano"),rs.getString("paso4_ldlc"));
					if(detailLevel==0){
						if(proyecto.nombreProyecto==null) haveNullProject=true; 
						proyecto.promocion=getPromocion(id_usuario);
						proyecto.idDecorador=rs.getInt("id_decorador");
						proyectos.add(proyecto);
						continue;
					}
					int idDecorador_aux=-1;
					idDecorador_aux= rs.getInt("id_decorador");
					if(rs.wasNull()){
						idDecorador_aux=-1;
					}else{
						Core th= new CoreImpl();
						Decoradores decorador=th.getDecoradorById(idDecorador_aux,-1,-1,path);
						proyecto.nombreDecorador=decorador.getNombre();
						proyecto.uniqueDecorador=decorador.getIdentificadorUnico();
						decorador.setCara("");
						if(decorador.filesCara.size()>0)
						proyecto.caraDecorador=decorador.filesCara.get(0);
					}
					proyecto.idDecorador=idDecorador_aux;
					proyecto.projectsTypes=new CoreImpl().getProjectType(proyecto.pagado);
					int estado_aux=-1;
					estado_aux=  rs.getInt("estado");
					if(rs.wasNull()){
						estado_aux=-1;
					}else{
						proyecto.estado=estado_aux;
						proyecto.fechaestado=rs.getDate("fechaestado");
						proyecto.projectsStates=new CoreImpl().getProjectStatebyId(estado_aux);
					}
					
					proyecto.preferencias = getPreferencia(proyecto.id);
					
					if(detailLevel==2||detailLevel==10){
					proyecto.cita = new CoreImpl().getCita(proyecto.id);
					}
					
					if(detailLevel==1||detailLevel==10){

						proyecto.listAfiliados=clientAffiliates;
						proyecto.informacion = getInformacion(proyecto.id, proyecto.nombreProyecto,userMail, path);	
					}
					if(detailLevel==3||detailLevel==10){
					proyecto.propuestas = getPropuestas(
							userMail,
							proyecto.nombreProyecto, "propuestas", path);
					proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 3);
					}
					if(detailLevel==4||detailLevel==10){ 
 
					proyecto.listAfiliados=clientAffiliates;
					proyecto.planos = getPropuestas(
							userMail,
							proyecto.nombreProyecto, "planos", path);
					proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 4);
					}
					if(proyecto.nombreProyecto==null) haveNullProject=true;
					proyectos.add(proyecto);
				}
				if(haveNullProject==false){
					log.info("dataBBDD Entro en haveNullProject==false"); 
					Proyecto proyecto = new Proyecto(createProyecto(userMail), null, 0, 0, null);
					proyectos.add(proyecto);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e);
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return proyectos;
	}
	
	public Proyecto getPoyectoById(int id_proyecto, int detailLevel, String path)
			throws Exception {
		log.info("dataBBDD getPoyectoById");
		Proyecto proyecto = new Proyecto();
		Connection conn2 = conectar();
		Statement stmt2 = conn2.createStatement();

		try {

			if (conn2 != null) {
				
				
				String sql = "SELECT id, nombre_proyecto, titulo_proyecto, nombre_proyecto_decorador, id_usuario, finalizado, pagado, fechafin, id_decorador, estado, fechaestado, paso3_propuestas, paso3_3d, paso4_plano, paso4_ldlc FROM projects where id='"
						+ id_proyecto + "' order by id desc;";

				ResultSet rs4 = stmt2.executeQuery(sql);
				log.info("dataBBDD: "+sql);
				if (rs4.next()) { 
					 proyecto = new Proyecto(rs4.getInt("id"),
							 rs4.getString("nombre_proyecto"),
							 rs4.getString("titulo_proyecto"),
							 rs4.getString("nombre_proyecto_decorador"),
							 rs4.getInt("finalizado"), rs4.getInt("pagado"),
							rs4.getDate("fechafin"),rs4.getString("paso3_propuestas"),rs4.getString("paso3_3d"),rs4.getString("paso4_plano"),rs4.getString("paso4_ldlc"));
					
					 
					if(detailLevel==0){
						rs4.close();
						conn2.close();
						stmt2.close();
						conn2 = null;
						stmt2 = null;
						return proyecto;
					}
					String userMail=getUserFromId(rs4.getInt("id_usuario")).mail;
					String userName=getUserFromId(rs4.getInt("id_usuario")).userName;
					proyecto.user_sin= new Users();
					proyecto.user_sin.setMail(userMail);
					proyecto.user_sin.setUsername(userName);
					proyecto.id_user=rs4.getInt("id_usuario");
					
					int idDecorador_aux=-1;
					idDecorador_aux= rs4.getInt("id_decorador");
					if(rs4.wasNull()){
						idDecorador_aux=-1;
					}else{
						proyecto.idDecorador=idDecorador_aux;
						Core th= new CoreImpl();
						Decoradores decorador=th.getDecoradorById(idDecorador_aux,0,0,path);
						proyecto.nombreDecorador=decorador.getNombre();
						proyecto.uniqueDecorador=decorador.getIdentificadorUnico();
					}
					proyecto.projectsTypes=new CoreImpl().getProjectType(proyecto.pagado);
					int estado_aux=-1;
					estado_aux=  rs4.getInt("estado");
					if(rs4.wasNull()){
						estado_aux=-1;
					}else{
						proyecto.estado=estado_aux;
						proyecto.fechaestado=rs4.getDate("fechaestado");
						proyecto.projectsStates=new CoreImpl().getProjectStatebyId(estado_aux);
					}
					
					proyecto.preferencias = getPreferencia(proyecto.id);
					
					if(detailLevel==2||detailLevel==10){
					proyecto.cita = new CoreImpl().getCita(proyecto.id);
					}
					
					if(detailLevel==1||detailLevel==10){
						proyecto.informacion = getInformacion(proyecto.id, proyecto.nombreProyecto,userMail, path);	
					}
					if(detailLevel==3||detailLevel==10){
					proyecto.propuestas = getPropuestas(
							userMail,
							proyecto.nombreProyecto, "propuestas", path);
					proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 3);
					}
					if(detailLevel==4||detailLevel==10){
					proyecto.planos = getPropuestas(
							userMail,
							proyecto.nombreProyecto, "planos", path);
					proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 4);
					
					}
					
					
				}
				
				rs4.close();
				conn2.close();
				stmt2.close();
				conn2 = null;
				stmt2 = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e);
			conn2.close();
			stmt2.close();
			conn2 = null;
			stmt2 = null;
		}
		return proyecto;
	}
	
	
	public ArrayList<Proyecto> getPoyectosListByIdDedorador(Decoradores d,int detailLevel, String path)
			throws Exception {
		log.info("dataBBDD getPoyectosListByIdDedorador");
		ArrayList<Proyecto> proyectos = new ArrayList<Proyecto>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		boolean haveNullProject=false;
		try {

			if (conn != null) {
				String userMail="";
				
				String sql = "SELECT id, id_usuario, nombre_proyecto, titulo_proyecto, nombre_proyecto_decorador, finalizado, pagado, fechafin, id_decorador, estado, fechaestado, paso3_propuestas, paso3_3d, paso4_plano, paso4_ldlc FROM projects where (id_decorador='"
						+ d.getId() + "' and pagado > 0) order by fechaestado desc";
				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				while (rs.next()) {
					Proyecto proyecto = new Proyecto(rs.getInt("id"),
							rs.getString("nombre_proyecto"),
							rs.getString("nombre_proyecto_decorador"),
							rs.getString("titulo_proyecto"),
							rs.getInt("finalizado"), rs.getInt("pagado"),
							rs.getDate("fechafin"),rs.getString("paso3_propuestas"),rs.getString("paso3_3d"),rs.getString("paso4_plano"),rs.getString("paso4_ldlc"));
					if(detailLevel==0){
						if(proyecto.nombreProyecto==null) haveNullProject=true;
						proyectos.add(proyecto);
						continue;
					}
					User u=getUserFromId(rs.getInt("id_usuario"));
					userMail=u.mail;
					proyecto.user_sin=new Users();
					proyecto.user_sin.setMail(userMail);
					proyecto.user_sin.setUsername(u.userName);
					int idDecorador_aux=-1;
					idDecorador_aux=d.getId();
					if(rs.wasNull()){
						idDecorador_aux=-1;
					}else{
						proyecto.idDecorador=idDecorador_aux;
						
						Core th= new CoreImpl();
						if(d.getNombre()!=""){
							proyecto.nombreDecorador=d.getNombre();
							proyecto.uniqueDecorador=d.getIdentificadorUnico();
						}else{
							Decoradores decorador=th.getDecoradorById(d.getId(),0,0,path);
							proyecto.nombreDecorador=decorador.getNombre();
							proyecto.uniqueDecorador=decorador.getIdentificadorUnico();
						}
						
					}
					proyecto.projectsTypes=new CoreImpl().getProjectType(proyecto.pagado);
					int estado_aux=-1;
					estado_aux=  rs.getInt("estado");
					if(rs.wasNull()){
						estado_aux=-1;
					}else{
						proyecto.estado=estado_aux;
						proyecto.fechaestado=rs.getDate("fechaestado");
						proyecto.projectsStates=new CoreImpl().getProjectStatebyId(estado_aux);
					}
					
					proyecto.preferencias = getPreferencia(proyecto.id);
					
					if(detailLevel==2||detailLevel==10){
					proyecto.cita = new CoreImpl().getCita(proyecto.id);
					}
					
					if(detailLevel==1||detailLevel==10){
						proyecto.informacion = getInformacion(proyecto.id, proyecto.nombreProyecto,userMail, path);	
					}
					if(detailLevel==3||detailLevel==10){
					proyecto.propuestas = getPropuestas(
							userMail,
							proyecto.nombreProyecto, "propuestas", path);
							proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 3);
					}
					if(detailLevel==4||detailLevel==10){
					proyecto.planos = getPropuestas(
							userMail,
							proyecto.nombreProyecto, "planos", path);
							proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 4);
							
					}
					
					proyectos.add(proyecto);
				}

				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e);
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return proyectos;
	}
	

	

	public  Date getAddDaysDate(Date d, int extraDays){
		Calendar c = Calendar.getInstance();
		c.setTime(d); // Now use today date.
		c.add(Calendar.DATE, extraDays); // Adding extraDays
		return c.getTime();
	}

	public Date getFechaFromStrings (String fecha, String hora){
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm"); 
		Date startDate=new Date();
		try {
		    startDate = df.parse(fecha +" " + hora);
		    String newDateString = df.format(startDate); 
		} catch (ParseException e) {
		    e.printStackTrace();
		}
		return startDate;
	}


	
	private Informacion getInformacion(int id_proyecto, String nombe_proyecto, String nombre_usuario, String path)
			throws Exception {
		log.info("dataBBDD getInformacion");
		Informacion info = null;
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "Select id_proyecto, habitacion, en_mente, "
						+ "prioridad_1, prioridad_2, prioridad_3, prioridad_4,prioridad_5,prioridad_6,"
						+ "inspiracion_1, inspiracion_2, inspiracion_3,"
						+ "usos_1, usos_2, usos_3, usos_4,usos_5,usos_6,"
						+ "asientos_1, asientos_2, asientos_3, asientos_4,asientos_5,asientos_6,"
						+ "auxiliares_1, auxiliares_2, auxiliares_3, auxiliares_4,auxiliares_5,"
						+ "almacenaje_1, almacenaje_2, almacenaje_3, almacenaje_4, almacenaje_5,"
						+ "deco_1, deco_2, deco_3, deco_4, deco_5,"
						+ "elementos_extra,"
						+ "imprescindibles_url_1, imprescindibles_url_2, imprescindibles_url_3,"
						+ "otra_necesidad,"
						+ "diy_1, diy_2, diy_3,"
						+ "suelo, pintura, no_quiero,"
						+ "medidas_ancho, medidas_alto, presupuesto,extra_otras_cosas, ventanas_1,ventanas_2,ventanas_3 "
						+ " FROM information "
						+ " where (id_proyecto=" + id_proyecto
						+ " AND valida= 1)";

				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					if (info == null)
						info = new Informacion();

					info.id_proyecto = rs.getInt("id_proyecto");
					info.habitacion = rs.getString("habitacion");
					info.en_mente = rs.getString("en_mente");
					info.prioridad_1 = rs.getInt("prioridad_1");
					info.prioridad_2 = rs.getInt("prioridad_2");
					info.prioridad_3 = rs.getInt("prioridad_3");
					info.prioridad_4 = rs.getInt("prioridad_4");
					info.prioridad_5 = rs.getInt("prioridad_5");
					info.prioridad_6 = rs.getInt("prioridad_6");
					info.inspiracion_1 = rs.getString("inspiracion_1");
					info.inspiracion_2 = rs.getString("inspiracion_2");
					info.inspiracion_3 = rs.getString("inspiracion_3");
					info.usos_1 = rs.getInt("usos_1");
					info.usos_2 = rs.getInt("usos_2");
					info.usos_3 = rs.getInt("usos_3");
					info.usos_4 = rs.getInt("usos_4");
					info.usos_5 = rs.getInt("usos_5");
					info.usos_6 = rs.getInt("usos_6");
					info.asientos_1 = rs.getInt("asientos_1");
					info.asientos_2 = rs.getInt("asientos_2");
					info.asientos_3 = rs.getInt("asientos_3");
					info.asientos_4 = rs.getInt("asientos_4");
					info.asientos_5 = rs.getInt("asientos_5");
					info.asientos_6 = rs.getInt("asientos_6");
					info.auxiliares_1 = rs.getInt("auxiliares_1");
					info.auxiliares_2 = rs.getInt("auxiliares_2");
					info.auxiliares_3 = rs.getInt("auxiliares_3");
					info.auxiliares_4 = rs.getInt("auxiliares_4");
					info.auxiliares_5 = rs.getInt("auxiliares_5");
					info.almacenaje_1 = rs.getInt("almacenaje_1");
					info.almacenaje_2 = rs.getInt("almacenaje_2");
					info.almacenaje_3 = rs.getInt("almacenaje_3");
					info.almacenaje_4 = rs.getInt("almacenaje_4");
					info.almacenaje_5 = rs.getInt("almacenaje_5");
					info.deco_1 = rs.getInt("deco_1");
					info.deco_2 = rs.getInt("deco_2");
					info.deco_3 = rs.getInt("deco_3");
					info.deco_4 = rs.getInt("deco_4");
					info.deco_5 = rs.getInt("deco_5");
					info.elementos_extra = rs.getString("elementos_extra");
					info.imprescindibles_url_1 = rs
							.getString("imprescindibles_url_1");
					info.imprescindibles_url_2 = rs
							.getString("imprescindibles_url_2");
					info.imprescindibles_url_3 = rs
							.getString("imprescindibles_url_3");
					info.otra_necesidad = rs.getString("otra_necesidad");
					info.diy_1 = rs.getString("diy_1");
					info.diy_2 = rs.getString("diy_2");
					info.diy_3 = rs.getString("diy_3");
					info.suelo = rs.getInt("suelo");
					info.pintura = rs.getInt("pintura");
					info.no_quiero = rs.getString("no_quiero");
					info.medidas_ancho = rs.getString("medidas_ancho");
					info.medidas_alto = rs.getString("medidas_alto");
					info.presupuesto = rs.getString("presupuesto");
					info.extra_otras_cosas = rs.getString("extra_otras_cosas");
					info.ventanas_1 = rs.getInt("ventanas_1");
					info.ventanas_2 = rs.getInt("ventanas_2");
					info.ventanas_3 = rs.getInt("ventanas_3");

				//	String nombe_proyecto=getProjectNameFromProjectId(info.id_proyecto);
				//	String nombre_usuario=getUsernameFromIdProject(info.id_proyecto);
					
					info.filesInspiraciones = getFiles(
							nombre_usuario,
							nombe_proyecto,
							"inspiraciones", path);
					info.filesEsapcio = getFiles(
							nombre_usuario,
							nombe_proyecto,
							"espacios", path);
					info.filesPlanos = getFiles(
							nombre_usuario,
							nombe_proyecto,
							"plano", path);
					info.filesMuebles = getFiles(
							nombre_usuario,
							nombe_proyecto,
							"muebles", path);

				} else {

					ArrayList<String> nombreArrayList = new ArrayList<String>(); 
					ArrayList<String> nombreArrayList2 = new ArrayList<String>(); 
					ArrayList<String> nombreArrayList3 = new ArrayList<String>(); 
					ArrayList<String> nombreArrayList4 = new ArrayList<String>();  
					if (info == null)
						info = new Informacion();
					
					info.id_proyecto = 0;
					info.habitacion = "";
					info.en_mente = "";
					info.prioridad_1 = 0;
					info.prioridad_2 = 0;
					info.prioridad_3 = 0;
					info.prioridad_4 = 0;
					info.prioridad_5 = 0;
					info.prioridad_6 = 0;
					info.inspiracion_1 = "";
					info.inspiracion_2 = "";
					info.inspiracion_3 = "";
					info.usos_1 = 0;
					info.usos_2 = 0;
					info.usos_3 = 0;
					info.usos_4 = 0;
					info.usos_5 = 0;
					info.usos_6 = 0;
					info.asientos_1 = 0;
					info.asientos_2 = 0;
					info.asientos_3 = 0;
					info.asientos_4 = 0;
					info.asientos_5 = 0;
					info.asientos_6 = 0;
					info.auxiliares_1 = 0;
					info.auxiliares_2 = 0;
					info.auxiliares_3 = 0;
					info.auxiliares_4 = 0;
					info.auxiliares_5 = 0;
					info.almacenaje_1 = 0;
					info.almacenaje_2 = 0;
					info.almacenaje_3 = 0;
					info.almacenaje_4 = 0;
					info.almacenaje_5 = 0;
					info.deco_1 = 0;
					info.deco_2 = 0;
					info.deco_3 = 0;
					info.deco_4 = 0;
					info.deco_5 = 0;
					info.elementos_extra = "";
					info.imprescindibles_url_1 = "";
					info.imprescindibles_url_2 = "";
					info.imprescindibles_url_3 = "";
					info.otra_necesidad = "";
					info.diy_1 = "";
					info.diy_2 = "";
					info.diy_3 = "";
					info.suelo = 0;
					info.pintura = 0;
					info.no_quiero = "";
					info.medidas_ancho = "";
					info.medidas_alto = "";
					info.presupuesto = "";
					info.extra_otras_cosas = "";
					info.ventanas_1 = 0;
					info.ventanas_2 = 0;
					info.ventanas_3 = 0;
					
						nombreArrayList=getFiles(
								nombre_usuario,
								nombe_proyecto,
								"inspiraciones", path);
						info.filesInspiraciones =nombreArrayList;
						nombreArrayList2=getFiles(
								nombre_usuario,
								nombe_proyecto,
								"espacios", path);
						info.filesEsapcio = nombreArrayList;
						nombreArrayList3=getFiles(
								nombre_usuario,
								nombe_proyecto,
								"plano", path);
						info.filesPlanos = nombreArrayList;
						nombreArrayList3=getFiles(
								nombre_usuario,
								nombe_proyecto,
								"muebles", path);
						info.filesMuebles = nombreArrayList;
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return info;
	}

	public ArrayList<Preferencia> getPreferencia(int proyecto) throws Exception {
		log.info("dataBBDD getPreferencia");
		ArrayList<Preferencia> preferencias = new ArrayList<>(0);
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "SELECT id, habitacion, estilo, minimalismo, color, tiendas, id_moodboard, fechaingreso FROM preferences where id_proyecto='"
						+ proyecto + "';";
				log.info(sql);

				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				while (rs.next()) {
					Preferencia preferencia = null;
					preferencia = new Preferencia(rs.getInt("id"),
							rs.getString("habitacion"), rs.getString("estilo"),
							rs.getString("minimalismo"), rs.getString("color"),
							rs.getString("tiendas"),
							rs.getString("id_moodboard"), proyecto);
					/*
					 * sql =
					 * "SELECT id, nombre, url FROM imagenes where id_preferences='"
					 * +preferencia.id+"';"; log.info(sql); rs =
					 * stmt.executeQuery(sql);log.info("dataBBDD: "+sql); ArrayList<Imagen> imagenes = new
					 * ArrayList<Imagen>(0); while(rs.next()){ Imagen imagen =
					 * new Imagen(rs.getInt("id"), rs.getString("nombre"));
					 * imagenes.add(imagen); } sql =
					 * "SELECT id, nombre, url FROM tiendas where id_preferences='"
					 * +preferencia.id+"';"; log.info(sql); rs =
					 * stmt.executeQuery(sql);log.info("dataBBDD: "+sql); ArrayList<Tienda> tiendas = new
					 * ArrayList<Tienda>(0); while(rs.next()){ Tienda tienda =
					 * new Tienda(rs.getInt("id"), rs.getString("nombre"),
					 * rs.getString("url")); tiendas.add(tienda); }
					 * preferencia.tiendas=tiendas;
					 * preferencia.imagenes=imagenes;
					 */
					preferencias.add(preferencia);
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return preferencias;
	}

	private int createProyecto(String mail) throws Exception {
		log.info("dataBBDD createProyecto");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "insert into projects (id_usuario) values ( (SELECT id FROM users where mail="
						+ "'" + mail + "'))";
				log.info(sql);
				int result = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return 0;// todo correcto
	}

	private User getUserFromId(int id_user) throws Exception {
		log.info("dataBBDD getUserFromId");
		User user = new User();
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "SELECT mail, username FROM users where id="
						+ id_user;
				log.info(sql);
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);

				if (rs.next()) {
					user.mail = rs.getString("mail");
					user.userName = rs.getString("username");
					rs.close();
					conn.close();
					stmt.close();
					conn = null;
					stmt = null;
					return user;
				}

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		return user;// todo correcto
	}
	
	private OfertasAfiliado getPromocion(int id_user) throws Exception {
		log.info("dataBBDD getPromocion");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		Afiliado ps= null;
		OfertasAfiliado ps2= null;
		try {

			if (conn != null) {
				
				String sql = "SELECT * FROM decotheco.affiliates_users_veces where id_user= "
						+ id_user + ";";
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				 
				int id_offer=0;
				int veces=0;
				if (rs.next()) {
					 
					id_offer=rs.getInt("id_offer"); 
					veces=rs.getInt("veces"); 
				}
				
				String sql2 = "SELECT * FROM decotheco.affiliates_offer where id= "
						+ id_offer + ";";
				ResultSet rs2 = stmt.executeQuery(sql2);
				if (rs2.next()) {
					ps2=new OfertasAfiliado(); 
					ps2.descuento_unitario=rs2.getFloat("descuento_unitario");
					ps2.descuento_porcentual=rs2.getFloat("descuento_porcentual");
					int vecesLimit=rs2.getInt("veces");
					if(vecesLimit>veces) {
						veces=1;
					} else { veces=0; }
					ps2.veces=veces;
				} else { 
					ps2=new OfertasAfiliado(); 
					ps2.descuento_unitario=0f;
					ps2.descuento_porcentual=0f;
					ps2.veces=0;
				}
				
				
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			
		}
		 
		return ps2;
			 
		
	} 
	
	private int getUseridFromIdProject(int id_project) throws Exception {
		log.info("dataBBDD getUseridFromIdProject");
		int user_id = -1;
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "SELECT id_usuario FROM projects where id="
						+ id_project;
				log.info(sql);
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);

				if (rs.next()) {
					user_id = rs.getInt("id_usuario");

					rs.close();
					conn.close();
					stmt.close();
					conn = null;
					stmt = null;
					return user_id;
				}

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		return user_id;// todo correcto
	}

	public String getUsernameFromIdProject(int id_project) throws Exception {
		log.info("dataBBDD getUsernameFromIdProject");
		String mail = "";
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			int id_user = getUseridFromIdProject(id_project);
			if (conn != null) {
				String sql = "SELECT mail FROM users where id="
						+ id_user;
				log.info(sql);
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);

				if (rs.next()) {
					mail = rs.getString("mail");

					rs.close();
					conn.close();
					stmt.close();
					conn = null;
					stmt = null;
					return mail;
				}

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		return mail;// todo correcto
	}

	public String getProjectNameFromProjectId(int id_project) throws Exception {
		log.info("dataBBDD getProjectNameFromProjectId");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		String nombre_proyecto = "";
		try {

			if (conn != null) {
				String sql = "SELECT nombre_proyecto FROM projects where id="
						+ id_project;
				log.info(sql);
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);

				if (rs.next()) {
					nombre_proyecto = rs.getString("nombre_proyecto");

					rs.close();
					conn.close();
					stmt.close();
					conn = null;
					stmt = null;
					return nombre_proyecto;
				}

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			// conn.close();stmt.close();conn=null;stmt=null;
			throw e;
		}
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		return nombre_proyecto;// todo correcto
	}

	private int setProyecto(Preferencia pref, int id_decorador_seleccionado) throws Exception {
		log.info("dataBBDD setProyecto");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		int id_piso=0;
		try {

			if (conn != null) {
				String sql = "Select nombre_proyecto from projects where id = "
						+ pref.id_proyecto;
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					String nombreProyecto = rs.getString("nombre_proyecto");
					if (nombreProyecto == null) {
						if(pref.habitacion=="") pref.habitacion="proyecto";
						String nombreParaProyecto = pref.habitacion + "-"
								+ pref.id_proyecto;
						sql = "UPDATE projects SET nombre_proyecto='"
								+ nombreParaProyecto
								+ "', titulo_proyecto='"
								+ nombreParaProyecto
								+ "', nombre_proyecto_decorador='"
								+ nombreParaProyecto
								+ "' where id="
								+ pref.id_proyecto;
						if(stmt.executeUpdate(sql)!=0) {
							Core tc=new CoreImpl();
							tc.setNextEstado(pref.id_proyecto,0);
						}
						
						if(id_decorador_seleccionado!=-1 && id_decorador_seleccionado!=0){
							Core tc=new CoreImpl();
							id_piso=tc.setDecoradorToProject(id_decorador_seleccionado, pref.id_proyecto);
						}
						
						createProyecto(getUserFromId(getUseridFromIdProject(pref.id_proyecto)).mail);
					}
				}
				setPreferencias(pref);
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}

		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}

		return id_piso;// todo correcto

	}

	private int eliminaProyecto(int id_proyecto) throws Exception {
		log.info("dataBBDD eliminaProyecto");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {

				String sql = "UPDATE projects SET finalizado=-1 where id="
						+ id_proyecto;
				stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
			}
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;// alguna excepciï¿½n no controlada
		}
		return 0;// todo correcto

	}

	private int setPreferencias(Preferencia pref) throws Exception {
		log.info("dataBBDD setPreferencias");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				/*String sql = "Select * from preferences where id_proyecto = "
						+ pref.id_proyecto;
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					sql = "DELETE FROM preferences where id_proyecto = "
							+ pref.id_proyecto;
					stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
					rs.close();
					conn.close();
					stmt.close();
					conn = null;
					stmt = null;
				}*/

				String sql = "insert into preferences (id_proyecto, habitacion, estilo, minimalismo, color, tiendas, id_moodboard) values ('"
						+ pref.id_proyecto
						+ "','"
						+ pref.habitacion
						+ "','"
						+ pref.estilo
						+ "','"
						+ pref.minimalismo
						+ "','"
						+ pref.color
						+ "','"
						+ pref.tiendas
						+ "','"
						+ pref.id_moodboard + "')";
				log.info(sql);
				int result = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			throw e;
		}
		return 0;// todo correcto
	}

	private int setInformacion(Informacion info, int cambio_estado) throws Exception {
		log.info("dataBBDD setPreferencias");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "DELETE from information where id_proyecto="
						+ info.id_proyecto;

				int resultado = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);

				sql = "insert into information ("
						+ "id_proyecto, habitacion, en_mente, "
						+ "prioridad_1, prioridad_2, prioridad_3, prioridad_4,prioridad_5,prioridad_6,"
						+ "inspiracion_1, inspiracion_2, inspiracion_3,"
						+ "usos_1, usos_2, usos_3, usos_4,usos_5,usos_6,"
						+ "asientos_1, asientos_2, asientos_3, asientos_4,asientos_5,asientos_6,"
						+ "auxiliares_1, auxiliares_2, auxiliares_3, auxiliares_4,auxiliares_5,"
						+ "almacenaje_1, almacenaje_2, almacenaje_3, almacenaje_4, almacenaje_5,"
						+ "deco_1, deco_2, deco_3, deco_4, deco_5,"
						+ "elementos_extra,"
						+ "imprescindibles_url_1, imprescindibles_url_2, imprescindibles_url_3,"
						+ "otra_necesidad,"
						+ "diy_1, diy_2, diy_3,"
						+ "suelo, pintura, no_quiero,"
						+ "medidas_ancho, medidas_alto, presupuesto, extra_otras_cosas, ventanas_1, ventanas_2, ventanas_3"
						+ ") values (" + "'"
						+ info.id_proyecto
						+ "','"
						+ info.habitacion
						+ "','"
						+ info.en_mente
						+ "','"
						+ info.prioridad_1
						+ "','"
						+ info.prioridad_2
						+ "','"
						+ info.prioridad_3
						+ "','"
						+ info.prioridad_4
						+ "','"
						+ info.prioridad_5
						+ "','"
						+ info.prioridad_6
						+ "','"
						+ info.inspiracion_1
						+ "','"
						+ info.inspiracion_2
						+ "','"
						+ info.inspiracion_3
						+ "','"
						+ info.usos_1
						+ "','"
						+ info.usos_2
						+ "','"
						+ info.usos_3
						+ "','"
						+ info.usos_4
						+ "','"
						+ info.usos_5
						+ "','"
						+ info.usos_6
						+ "','"
						+ info.asientos_1
						+ "','"
						+ info.asientos_2
						+ "','"
						+ info.asientos_3
						+ "','"
						+ info.asientos_4
						+ "','"
						+ info.asientos_5
						+ "','"
						+ info.asientos_6
						+ "','"
						+ info.auxiliares_1
						+ "','"
						+ info.auxiliares_2
						+ "','"
						+ info.auxiliares_3
						+ "','"
						+ info.auxiliares_4
						+ "','"
						+ info.auxiliares_5
						+ "','"
						+ info.almacenaje_1
						+ "','"
						+ info.almacenaje_2
						+ "','"
						+ info.almacenaje_3
						+ "','"
						+ info.almacenaje_4
						+ "','"
						+ info.almacenaje_5
						+ "','"
						+ info.deco_1
						+ "','"
						+ info.deco_2
						+ "','"
						+ info.deco_3
						+ "','"
						+ info.deco_4
						+ "','"
						+ info.deco_5
						+ "','"
						+ info.elementos_extra
						+ "','"
						+ info.imprescindibles_url_1
						+ "','"
						+ info.imprescindibles_url_2
						+ "','"
						+ info.imprescindibles_url_3
						+ "','"
						+ info.otra_necesidad
						+ "','"
						+ info.diy_1
						+ "','"
						+ info.diy_2
						+ "','"
						+ info.diy_3
						+ "','"
						+ info.suelo
						+ "','"
						+ info.pintura
						+ "','"
						+ info.no_quiero
						+ "','"
						+ info.medidas_ancho
						+ "','"
						+ info.medidas_alto
						+ "','"
						+ info.presupuesto
						+ "','"
						+ info.extra_otras_cosas
						+ "','"
						+ info.ventanas_1
						+ "','"
						+ info.ventanas_2
						+ "','"
						+ info.ventanas_3
						+ "')";

				log.info(sql);
				int resultadoInsert=stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				
				
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				
				if(resultadoInsert!=0 && cambio_estado==1) {
					Core tc=new CoreImpl();
					tc.setNextEstado(info.id_proyecto,11);
				}
			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;// alguna excepciï¿½n no controlada
		}
		return 0;// todo correcto
	}

	public String insertUser(String mail, String pass, String userName)
			throws Exception {

		log.info("dataBBDD insertUser");
		int item = createUser(mail, pass, userName);
		if (item == 0) {
			item = item + createProyecto(mail);
			String content[]= {"bienvenida-usuario"};
			Mail hht = new Mail();
			try{
				hht.sendMail( mail, "info@decotheco.com", "Bienvenido a Decotheco", content);
				hht.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Bienvenido a Decotheco", content);
				hht.sendMail( "info@decotheco.com", "info@decotheco.com", "Bienvenido a Decotheco", content);
			}catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage()); 
			}
		}
		// conn.close();stmt.close();conn=null;stmt=null;

		Gson gson = new Gson();
		return gson.toJson(item);
	}

	public ArrayList<String> getFiles(String user, String proyecto,
			String seccion, String path) {
		ArrayList<String> listaFicheros = new ArrayList<String>(0);
		try {
			String absoluteDiskPath = "";
			absoluteDiskPath = "usuarios/" + user + "/" + proyecto
					+ "/" + seccion + "/";
			S3Sample s3 = new S3Sample();
			ArrayList<String> lista=s3.listFilesInFolder( absoluteDiskPath);
			
			for (String s3ObjectSummary : lista) {
				listaFicheros.add(s3ObjectSummary.replace(absoluteDiskPath, "") );
			}
			

		} catch (Exception e) { 
			log.error("ERROR en try catch:" + e.getMessage());
			return listaFicheros;
		}
		/*try {
			String absoluteDiskPath = "";
			absoluteDiskPath = path + "usuarios\\" + user + "\\" + proyecto
					+ "\\" + seccion + "\\";
			File folder = new File(absoluteDiskPath);
			File[] listOfFiles = folder.listFiles();
			for (int i = 0; i < listOfFiles.length; i++) {
				if (listOfFiles[i].isFile()) {
					log.info("dataBBDD File " + listOfFiles[i].getName());
					listaFicheros.add(listOfFiles[i].getName());
				} else if (listOfFiles[i].isDirectory()) {
					log.info("dataBBDD Directory " + listOfFiles[i].getName());
				}
			}

		} catch (Exception e) {
			return listaFicheros;
		}*/

		return listaFicheros;
	}
	
	public ArrayList<String> getFiles(String ruta,  String path) {
		ArrayList<String> listaFicheros = new ArrayList<String>(0);
		log.info("dataBBDD getFiles");
		try {
			String absoluteDiskPath = "";
			absoluteDiskPath = ruta;
			S3Sample s3 = new S3Sample();
			ArrayList<String> lista=s3.listFilesInFolder( absoluteDiskPath);
			
			for (String s3ObjectSummary : lista) {
				listaFicheros.add(s3ObjectSummary.replace(absoluteDiskPath, "") );
			}
			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			return listaFicheros;
		}
		/*try {
			String absoluteDiskPath = "";
			absoluteDiskPath = path + "usuarios\\" + user + "\\" + proyecto
					+ "\\" + seccion + "\\";
			File folder = new File(absoluteDiskPath);
			File[] listOfFiles = folder.listFiles();
			for (int i = 0; i < listOfFiles.length; i++) {
				if (listOfFiles[i].isFile()) {
					log.info("dataBBDD File " + listOfFiles[i].getName());
					listaFicheros.add(listOfFiles[i].getName());
				} else if (listOfFiles[i].isDirectory()) {
					log.info("dataBBDD Directory " + listOfFiles[i].getName());
				}
			}

		} catch (Exception e) {
			return listaFicheros;
		}*/

		return listaFicheros;
	}

	private Perfil getFoldersAndFiles(String carpeta, String subcarpeta,
			String path) {

		log.info("dataBBDD getFoldersAndFiles");
		Perfil p = new Perfil();

		try {
			String absoluteDiskPath = "";
			absoluteDiskPath = path + carpeta + "\\" + subcarpeta + "\\";
			File folder = new File(absoluteDiskPath);
			File[] listOfFiles = folder.listFiles();
			for (int i = 0; i < listOfFiles.length; i++) {
				if (listOfFiles[i].isDirectory()) {
					log.info("dataBBDD File " + listOfFiles[i].getName());
					File[] listOfSubFiles = listOfFiles[i].listFiles();
					ElementoPerfil e = new ElementoPerfil();
					for (int j = 0; j < listOfSubFiles.length; j++) {
						if (listOfSubFiles[j].isFile()) {
							String ext = FilenameUtils
									.getExtension(listOfSubFiles[j].getName());
							if (ext.contains("jpg")) {
								e.fileJpg = listOfSubFiles[j].getName();
							}
							if (ext.contains("png")) {
								e.filePng = listOfSubFiles[j].getName();
							}
						}
					}
					e.perfil = subcarpeta;
					e.subcarpeta = listOfFiles[i].getName();
					// e.path=listOfFiles[i].getAbsolutePath();
					e.path = "";
					p.perfil.add(e);
				}
			}

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			return p;
		}

		return p;
	}

	/**
	 * Funciï¿½n que elimina acentos y caracteres especiales de una cadena de
	 * texto.
	 * 
	 * @param input
	 * @return cadena de texto limpia de acentos y caracteres especiales.
	 */
	public static String remove1(String input) {
		// Cadena de caracteres original a sustituir.
		String original = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ°ªñÑ";
		// Cadena de caracteres ASCII que reemplazarï¿½n los originales.
		String ascii = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC  nN";
		String output = input;
		for (int i = 0; i < original.length(); i++) {
			// Reemplazamos los caracteres especiales.
			output = output.replace(original.charAt(i), ascii.charAt(i));
		}// for i
		return output;
	}// remove1

	private ArrayList<TituloValorParaFicherosTexto> getFrases(File x) {
		ArrayList<TituloValorParaFicherosTexto> contenido = new ArrayList<TituloValorParaFicherosTexto>(
				0);

		try {
			
				BufferedReader in = new BufferedReader(new InputStreamReader(
						new FileInputStream(x.getAbsolutePath()), "UTF-8"));
				in.mark(1);
				if (in.read() != 0xFEFF)
					in.reset();

				String str;
				String comienzoValor = "nameTitle:";
				TituloValorParaFicherosTexto t = null;
				boolean vezprimera = true;
				while ((str = in.readLine()) != null) {

					if (str.startsWith(comienzoValor)) {
						if (vezprimera == true) {
							vezprimera = false;

						} else {
							contenido.add(t);
						}
						String cadena = remove1(str.replaceAll(comienzoValor,
								""));
						t = new TituloValorParaFicherosTexto();
						t.titulo = cadena;
					} else {
						if (t.valor.length() != 0)
							t.valor = t.valor + "SALTOLINEA" + str;
						else
							t.valor = t.valor  + str;
					}
 
				}
				if (vezprimera != true) {
					contenido.add(t);
				}
				
				in.close();
			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage()); 
		}

		return contenido;
	}

	private TituloValorParaFicherosTexto getATituloValorTexto(
			ArrayList<TituloValorParaFicherosTexto> lista, String clave) {
		TituloValorParaFicherosTexto t = null;

		for (int i = 0; i < lista.size(); i++) {
			if (remove1(lista.get(i).titulo).contains(clave)) {
				return lista.get(i);
			}
		}

		return t;

	}

	private PortfolioItem getPortfolioItem(File root, String path) {
		PortfolioItem p = new PortfolioItem();

		log.info("dataBBDD getPortfolioItem");
		File[] list = root.listFiles();
		try {

			if (list == null)
				return p;

			for (File f : list) {
				if (f.isDirectory()) {
					SeccionesVO s = new SeccionesVO();
					if (f.getName().contains("_")) {
						String[] split = f.getName().split("_");
						try{
							s.orden = Integer.parseInt(split[0]);
							s.tipoSeccion = split[1];
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage());
							s.orden = 0;
							s.tipoSeccion = f.getName();
						}
						
						
					} else {
						s.orden = 0;
						s.tipoSeccion = f.getName();
					}

					File[] listaSecciones = f.listFiles();
					for (File fichero : listaSecciones) { 
						if (fichero.getName().contains(".txt")) {
							// Es el fichero Principal
							
							s.listaTextos = getFrases(fichero);

						} else if (fichero.getName().contains(".jpg")
								|| fichero.getName().contains(".png")
								|| fichero.getName().contains(".jpeg")
								|| fichero.getName().contains(".JPEG")
								|| fichero.getName().contains(".PNG")
								|| fichero.getName().contains(".JPG")) {
							// Es el fichero Principal
							
							// String fileNameWithOutExt =
							// FilenameUtils.removeExtension(f.getName());
							ImagenVO img = new ImagenVO();

							if (fichero.getName().contains("_")) {
								String[] splitImg = fichero.getName()
										.split("_");
								
								try{
									img.orden = Integer.parseInt(splitImg[0]);
								}catch(Exception e){
									img.orden =0;
								}
								
							} else {
								img.orden = 0;
							}
							String rutaImagen="portfolio\\" + fichero.getAbsolutePath().replace(path, "");
							img.imagen= rutaImagen.replace("\\\\", "/");
							img.imagen= rutaImagen.replace("\\", "/");
							//img.imagen = rutaImagen;
							s.listaImagenes.add(img);

						}

					}
					p.listaSecciones.add(s);

				} else {
					if (f.getName().contains(".txt")) {
						// Es el fichero Principal
						
						ArrayList<TituloValorParaFicherosTexto> fuera = getFrases(f);
						p.titulo = getATituloValorTexto(fuera, "TITULO").valor;
						p.tipo = getATituloValorTexto(fuera, "TIPO").valor;
						p.descripcionCorta = getATituloValorTexto(fuera,
								"DESCRIPCION CORTA").valor;
					} else if (f.getName().contains(".jpg")
							|| f.getName().contains(".png")
							|| f.getName().contains(".jpeg")
							|| f.getName().contains(".JPEG")
							|| f.getName().contains(".PNG")
							|| f.getName().contains(".JPG")) {
						// Es el fichero Principal
						System.out
								.println("voy a leer: " + f.getAbsolutePath());
						// String fileNameWithOutExt =
						// FilenameUtils.removeExtension(f.getName());
						String rutaImagen="portfolio\\" + f.getAbsolutePath().replace(path, "");
						//p.imagenPrincipal = rutaImagen;
						p.imagenPrincipal = rutaImagen.replace("\\\\", "/");
						p.imagenPrincipal = rutaImagen.replace("\\", "/");
						System.out
						.println("imagen: " + p.imagenPrincipal);

					}
				}
			}
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
		}
		return p;
	}

	private boolean rememberPass(String mail, String usuario) throws Exception {
		log.info("dataBBDD rememberPass");
		User user = new User();
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql="";
				if(usuario.equals("decorador")) {
				    sql = "SELECT id, mail, nombre, pass FROM decotheco.decoradores where mail="
						+ "'" + mail + "'";
				} else { 
					sql = "SELECT id, mail, username, pass FROM decotheco.users where mail="
							+ "'" + mail + "'";
				}
				log.info(sql);
				
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);

				if (rs.next()) {
					user.id = rs.getInt("id");
					user.mail = rs.getString("mail");
					if(usuario.equals("decorador")) {
						user.userName = rs.getString("nombre");
					} else { 
						user.userName = rs.getString("username");
					}
					String clave=rs.getString("pass");
					Mail hht = new Mail();
					// EMAIL PARA RECORDAR CONTRASEÑA
					String[] contenidodelmail={"recordatorio", clave}; 
					hht.sendMail(user.mail, "info@decotheco.com", "Recordatorio de clave - decotheco.com", contenidodelmail);
					hht.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Recordatorio de clave - decotheco.com", contenidodelmail);
					hht.sendMail( "info@decotheco.com", "info@decotheco.com", "Recordatorio de clave - decotheco.com", contenidodelmail);
				}else{
					return false;
				}

			}
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return false;
		}
		return true;
	}
	
	private ArrayList<PortfolioItem> getListaTiposPortfolio(String path) {

		ArrayList<PortfolioItem> a = new ArrayList<PortfolioItem>(0);

		File root = new File(path);
		File[] list = root.listFiles();

		if (list == null)
			return a;

		for (File f : list) {
			if (f.isDirectory()) {
				// estamos en la carpeta de tipos, la recorremos entrando en
				// cada una para conseguir los proyectos 
				File[] listatipos = f.listFiles();
				if (listatipos != null) {
					for (File proyectosNumerados : listatipos) {
						// estamos en la carpeta de un tipo viendo los
						// proyectos, los recorremos para ir recogiendo cada uno
						// de ellos
						a.add(getPortfolioItem(proyectosNumerados,path));
					}

				} else {
					log.error("esta ruta esta vacia:"
							+ f.getAbsolutePath());  
				}

			}
		}
		for(int i=0;i<a.size();i++){
			a.get(i).ordenarSecciones(i);
		}
		
		Collections.shuffle(a);
		return a;
	}
	
/*	private ArrayList<PortfolioItem> getListaTiposPortfolioHibernate(String path) {

		ArrayList<PortfolioItem> a = new ArrayList<PortfolioItem>(0);
		
		
		DecoradoresHome decoHome= new DecoradoresHome();
		Decoradores decoForSearch= new Decoradores();
		try {
		ArrayList<Decoradores> listaDecoradores= (ArrayList<Decoradores>) decoHome.findByExample(decoForSearch);
		
		for (Decoradores d : listaDecoradores) {
			if(d!=null){
				PortfolioItem p= new PortfolioItem();
				p.id=d.getId();
				p.tipo=null;
				p.tipo=d.getNombre();
				List<Etiquetas> etiquetas=new ArrayList<>();
				etiquetas.addAll(d.getEtiquetas());
				p.titulo=null;
				for (int i=0;i<etiquetas.size();i++){
					if(i==0) p.titulo = etiquetas.get(i).getNombre();
					else
					p.titulo = p.titulo + " " + etiquetas.get(i).getNombre();
				}
				p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ d.getMail()+"/perfiles/composicion/composicion.jpg";
				p.imagenCara=new Config().decoradores_url+"decoradores/"+ d.getMail()+"/perfiles/cara/cara.jpg";
				p.descripcionCorta=null;
				p.rrss=d.getUrlRss();
				p.blog=d.getUrlBlog();
				p.descripcionCorta=d.getTexto_decorador();
				
				
				
				
				if(p.tipo==null) continue;
				if(p.titulo==null) continue;
				if(p.descripcionCorta==null) continue;
				if(d.getActivo()==null)continue;
				if(d.getActivo()!=1)continue;
				
				d.setImagesToTrabajos(path);
				//p.decorador=d;
				
				
				a.add(p);
			}
			
			
		}
		
		
	} catch (Exception e) {
		
		//Gson gson = new Gson();
		//return null;
	}
		
		for(int i=0;i<a.size();i++){
			if(a.get(i).decorador!=null){
				//a.get(i).decorador.setPass(null);
			}
				
			a.get(i).ordenarSecciones(i);
		}
		
		Collections.shuffle(a);
		return a;
	}
*/
	public String getPortfolioJson(String path) throws Exception {

		Gson gson = new Gson();
		return gson.toJson(new CoreImpl().getPortfolioItemsDecoradores(path));
	}
	public String getPortfolioJsonAll(String path) throws Exception {
	
		Gson gson = new Gson();
		return gson.toJson(new CoreImpl().getPortfolioItemsDecoradoresAll(path));
	}
	/*public String getPortfolioHibernateJson(String path,  int entero) throws Exception {

		
		ObjectMapper mapper= new ObjectMapper();
		String jsonInString = mapper.writeValueAsString(getListaTiposPortfolioHibernate(path));
		return jsonInString;
		
		
		Gson gson = new Gson();
		return gson.toJson(getListaTiposPortfolioHibernate(path));
	}*/
	
	public String getPerfiles(String carpeta, String subcarpeta, String path)
			throws Exception {

		Gson gson = new Gson();
		return gson.toJson(getFoldersAndFiles(carpeta, subcarpeta, path));

	}

	public ArrayList<Propuesta> getPropuestas(String user, String proyecto,
			String seccion, String path) {
		ArrayList<Propuesta> list = new ArrayList<Propuesta>(0);
		ArrayList<String> listaOfFiles = getFiles(user, proyecto, seccion, path);
		for (int i = 1; i <= 2; i++) {// hasta 5 propuestas
			String cabecera = "p" + i + "-";
			Propuesta p_aux = new Propuesta();
			if(seccion=="propuestas") {
				for (int j = 0; j < listaOfFiles.size(); j++) {
					if (listaOfFiles.get(j).contains(cabecera)
							&& (listaOfFiles.get(j).contains(".jpg")||listaOfFiles.get(j).contains(".png")||listaOfFiles.get(j).contains(".gif")||listaOfFiles.get(j).contains(".svg")||listaOfFiles.get(j).contains(".csv")||listaOfFiles.get(j).contains(".doc")||listaOfFiles.get(j).contains(".txt")||listaOfFiles.get(j).contains(".rtf")||listaOfFiles.get(j).contains(".zip")||listaOfFiles.get(j).contains(".rar")||listaOfFiles.get(j).contains(".xls")||listaOfFiles.get(j).contains(".mdb")||listaOfFiles.get(j).contains(".jpeg"))) {
						p_aux.imagenes.add(listaOfFiles.get(j));
					}
					if (listaOfFiles.get(j).contains(cabecera)
							&& listaOfFiles.get(j).contains(".pdf")) {
						p_aux.pdf = listaOfFiles.get(j);
					}
				}
			} else {
				for (int j = 0; j < listaOfFiles.size(); j++) {
					if (listaOfFiles.get(j).contains(cabecera)
							&& (listaOfFiles.get(j).contains(".jpg")||listaOfFiles.get(j).contains(".png")||listaOfFiles.get(j).contains(".gif")||listaOfFiles.get(j).contains(".svg")||listaOfFiles.get(j).contains(".jpeg"))) {
						p_aux.imagenes.add(listaOfFiles.get(j));
					}
					if (listaOfFiles.get(j).contains(cabecera)
							&& listaOfFiles.get(j).contains(".pdf")) {
						p_aux.pdf = listaOfFiles.get(j);
					}
				}
			}
			list.add(p_aux);
			

		}
		return list;

	}
	
	public ArrayList<Propuesta> get360(String user, String proyecto,
			String seccion, String path) {
		ArrayList<Propuesta> list = new ArrayList<Propuesta>(0);
		ArrayList<String> listaOfFiles = getFiles(user, proyecto, seccion, path);
		for (int i = 1; i <= 2; i++) {// hasta 5 propuestas
			String cabecera = "p" + i + "-";
			Propuesta p_aux = new Propuesta();
			if(seccion=="360") {
				for (int j = 0; j < listaOfFiles.size(); j++) {
					if ((listaOfFiles.get(j).contains(".jpg")||listaOfFiles.get(j).contains(".png")||listaOfFiles.get(j).contains(".gif")||listaOfFiles.get(j).contains(".svg")||listaOfFiles.get(j).contains(".csv")||listaOfFiles.get(j).contains(".doc")||listaOfFiles.get(j).contains(".txt")||listaOfFiles.get(j).contains(".rtf")||listaOfFiles.get(j).contains(".zip")||listaOfFiles.get(j).contains(".rar")||listaOfFiles.get(j).contains(".xls")||listaOfFiles.get(j).contains(".mdb")||listaOfFiles.get(j).contains(".jpeg"))) {
						p_aux.imagenes.add(listaOfFiles.get(j));
					} 
				}
			} else {
				for (int j = 0; j < listaOfFiles.size(); j++) {
					if (listaOfFiles.get(j).contains(cabecera)
							&& (listaOfFiles.get(j).contains(".jpg")||listaOfFiles.get(j).contains(".png")||listaOfFiles.get(j).contains(".gif")||listaOfFiles.get(j).contains(".svg")||listaOfFiles.get(j).contains(".jpeg"))) {
						p_aux.imagenes.add(listaOfFiles.get(j));
					}
					if (listaOfFiles.get(j).contains(cabecera)
							&& listaOfFiles.get(j).contains(".pdf")) {
						p_aux.pdf = listaOfFiles.get(j);
					}
				}
			}
			list.add(p_aux);
			

		}
		return list;

	}

	public int setProjectJson(Preferencia pref, int id_decorador_seleccionado) throws Exception {
		return setProyecto(pref,id_decorador_seleccionado);
	}

	public int eliminaProject(int id_proyecto) throws Exception {
		return eliminaProyecto(id_proyecto);
	}

	public int setInfo(Informacion info, int cambio_estado) throws Exception {
		return setInformacion(info, cambio_estado);
	}

	public String getImagenesJson(String habitacion, String estilos,
			String minimalismo, String colores, String tiendas)
			throws Exception {

		Gson gson = new Gson();
		return gson.toJson(getImagenesList(habitacion, estilos, minimalismo,
				colores, tiendas));
	}

	public String getSensacionesJson(String tipo, String color)
			throws Exception {

		Gson gson = new Gson();
		return gson.toJson(getSensacionesList(tipo, color));
	}

	public String getFrasesJson() throws Exception {

		Gson gson = new Gson();
		return gson.toJson(getFrasesList());
	}

	public String getColoresModBoardJson(String colores) throws Exception {

		Gson gson = new Gson();
		return gson.toJson(getColoresModBoardList(colores));
	}

	public String getLoginJson(String mail, String pass, int detail_level, int id_proyecto, String path)
			throws Exception {

		User item = getLogin(mail, pass, detail_level,id_proyecto, path);
		// conn.close();stmt.close();conn=null;stmt=null;
		Gson gson = new Gson();
		return gson.toJson(item);
	}

	public String createProjectJson(String mail) throws Exception {

		int item = createProyecto(mail);
		// conn.close();stmt.close();conn=null;stmt=null;
		Gson gson = new Gson();
		return gson.toJson(item);
	}

	public static void main(String[] args) {
		log.info("dataBBDD main");
		try {
			dataBBDD hht = new dataBBDD();
			// log.info(hht.getLoginJson("paul@gmail.com", "PotatoFrito"));
			hht.getFrases(new File("c:/file.txt"));
		} catch (Exception e) {
			// TODO: handle exception
			log.info("dataBBDD FAllo en escribir Fichero: " + e.getMessage());
		}
	}

	public String getRememberPass(String mail, String user)
			throws Exception {

		Boolean item = rememberPass(mail, user);
		// conn.close();stmt.close();conn=null;stmt=null;
		Gson gson = new Gson();
		return gson.toJson(item);
	}

	private int setCita_(Cita info) throws Exception {
		log.info("dataBBDD setCita_");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "UPDATE decotheco.citas SET valida = 0 where id_proyecto="
						+ info.id_proyecto;

				int resultado = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				sql = "insert into decotheco.citas ("
						+ "id_proyecto, fecha, hora, "
						+ "skype, contenido"
						+ ") values (" + "'"
						+ info.id_proyecto
						+ "','"
						+ info.fecha
						+ "','"
						+ info.hora
						+ "','"
						+ info.skype
						+ "','"
						+ info.contenido
						+ "')";

				log.info(sql);
				if(stmt.executeUpdate(sql)!=0) {
					Core tc=new CoreImpl();

					tc.setNextEstado(info.id_proyecto,21);
				}
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;
		}
		return 0;// todo correcto
	}
	
	public int setCita(Cita info) throws Exception {
		return setCita_(info);
	}
 
	public int setPago(PagoVO pref) throws Exception {
		log.info("dataBBDD setPago");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql =  "insert into decotheco.pagos (total, concepto, codigo, project_id,tipo_pago, regalo_id ) values ('"
						+ pref.total
						+ "','"
						+ pref.concepto
						+ "','"
						+ pref.codigo
						+ "',";
				if(pref.concepto.equals("Completo") || pref.concepto.equals("DecoRegaloE-Tarjeta") || pref.concepto.equals("DecoRegaloDeco-Box")) {
					sql+=  "null,";
				} else if(pref.concepto.equals("9")) {
					sql+=  "null,";
				} else if(pref.concepto.equals("Paypal - Piso comprado por usuario") || pref.concepto.equals("Redsis - Piso comprado por usuario")) {
					sql+=  "null,";
				} else {
					if(pref.concepto.equals("3") || pref.concepto.equals("4")){
						sql+=  "null,";
					}else{
						sql+= "'"+pref.project_id
								+ "',";
					}
				}
				if(pref.concepto.equals("DecoRegaloE-Tarjeta")) {
					sql+=  "'DecoRegaloE-Tarjeta',";
				} else if(pref.concepto.equals("DecoRegaloDeco-Box")) { 
					sql+=  "'DecoRegaloDeco-Box',";
				}
				else {
					sql+= "'"+pref.tipo_pago 
							+ "',";
				}
				if(pref.concepto.equals("DecoRegaloE-Tarjeta")) {
					sql+="null)";
				} else if(pref.concepto.equals("DecoRegaloDeco-Box")) { 
					sql+="null)";
				} else {
				if(pref.regalo_id!=null){
					if(pref.regalo_id.length()==0){
						sql+="null)";
					}else
						sql+= "'"+pref.regalo_id + "')";
				}
				else
					sql+="null)";
				}
						
				
				log.info(sql);
				int result = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;

			} 
			
			
			
			
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;
		}
		
		
		
		return 0;// todo correcto
	}
	
	public int setProyectoPagado(int id_proyecto, int tipo) throws Exception {
		log.info("dataBBDD setProyectoPagado");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {
			int respuesta=0;
			if (conn != null) {
				
						String sql = "UPDATE decotheco.projects SET pagado= "+tipo
								+ " where id="
								+ id_proyecto;
						respuesta=stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
					}
				if(respuesta!=0) {
					Core tc=new CoreImpl();

					if(tc.setNextEstado(id_proyecto,1)==-1){
						conn.close();
						stmt.close();
						conn = null;
						stmt = null;
						return 1;
					};
					if(tc.getProyectoBasicById(id_proyecto).nombreProyecto == null){
						Preferencia p= new Preferencia();
						p.id_proyecto=id_proyecto;
						setProjectJson(p,-1);
					}
							
				}
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			

		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;
		}

		return 0;// todo correcto

	}
	
	public int setProyectoPisoPagado(String proyectos, String id_usuario) throws Exception {
		log.info("dataBBDD setProyectoPagado");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		int respuesta=0;
		String estancia="";
		int lastid=-1;
		
		
		try { 
			
			String[] array = proyectos.split("-");
			
			if(array.length>1) {
				String sql4 = "insert into pisos (nombre, descripcion, promotora, url) values ('Piso "+array.length+" - Decotheco', 'Piso "+array.length+" - Decotheco', '', '')"; 
				stmt.executeUpdate(sql4, Statement.RETURN_GENERATED_KEYS);
				ResultSet rs5 = stmt.getGeneratedKeys();
				if (rs5.next()){
					lastid=rs5.getInt(1);
				}
				log.info("dataBBDD: "+sql4);
			}
			
			
			for (int i=0; i<array.length; i++) {
				respuesta=0; 
				if(array[i].equals("1")) {
					estancia= "comedor";
				} else if(array[i].equals("2")) {
					estancia= "despacho";
				} else if(array[i].equals("3")) {
					estancia= "dormitorio";
				} else if(array[i].equals("4")) {
					estancia= "entrada";
				} else if(array[i].equals("5")) {
					estancia= "infantil";
				} else if(array[i].equals("6")) {
					estancia= "salon";
				} else if(array[i].equals("7")) {
					estancia= "vestidor";
				} else if(array[i].equals("8")) {
					estancia= "baño";
				} else if(array[i].equals("9")) {
					estancia= "cocina";
				} else if(array[i].equals("10")) {
					estancia= "otros";
				} 
	            String sql = "SELECT id FROM projects WHERE id_usuario="+id_usuario+" and nombre_proyecto IS NULL";
	            ResultSet rs = stmt.executeQuery(sql);	
	            int id_proyecto=0;
				if(rs.next()) {
					id_proyecto = rs.getInt("id"); 
					String sql2 = "UPDATE decotheco.projects SET pagado= 1, nombre_proyecto='"+estancia+"-"+id_proyecto+"',  titulo_proyecto='"+estancia+"-"+id_proyecto+"', nombre_proyecto_decorador='"+estancia+"-"+id_proyecto+"'"
							+ " where id="
							+ id_proyecto;
					respuesta=stmt.executeUpdate(sql2); 
					if(respuesta!=0) {
						Core tc=new CoreImpl();

						if(tc.setNextEstado(id_proyecto,1)==-1){
							conn.close();
							stmt.close();
							conn = null;
							stmt = null;
							return 1;
						}; 
						
						String sql3 = "insert into preferences (id_proyecto, habitacion, estilo, minimalismo, color, tiendas, id_moodboard) values ('"
								+ id_proyecto
								+ "','"
								+ estancia
								+ "','','','','','')"; 
						int result = stmt.executeUpdate(sql3);
						log.info("dataBBDD: "+sql3);
						createProyecto(getUserFromId(getUseridFromIdProject(id_proyecto)).mail);
								
					}
					

					if(array.length>1) { 
						String sql6 = "insert into pisos_projects (id_piso, id_project, descripcion, nombre, coordenadas) values ('"
								+ lastid
								+ "','"
								+ id_proyecto
								+ "','"
								+ estancia
								+ "','"
								+ estancia
								+ "','')"; 
						 stmt.executeUpdate(sql6); 
					}
					
							
				}
				
	        }
			
			
			
			
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			

		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;
		}

		return 0;// todo correcto

	}
	
	public int setRegaloUsado(String codigo, int id_proyecto) throws Exception {
		log.info("dataBBDD setRegaloUsado");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		int id_regalo=-1;
		try {
			
			if (conn != null) {
				int respuesta=0;
				String sql = "Select id from decotheco.regalos where codigo = '"
						+ codigo + "' and usado = 0";
				
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					id_regalo = rs.getInt("id");
					if (id_regalo >0 ) {

				java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
						 sql = "UPDATE decotheco.regalos SET id_proyecto = "+ id_proyecto +", usado = 1, fecha_usado='"+date
								+ "' where codigo='"
								+ codigo+"';";
						respuesta=stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
					}
				if(respuesta==0) return -1;
				}else{
					return -1;
				}
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}

		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return -1;
		}

		return id_regalo;// todo correcto

	}
	public boolean enviarMail(String codigo, int tipo) throws Exception {
		log.info("dataBBDD enviarMail");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {
			
			if (conn != null) {
				int respuesta=0;
				String sql = "Select * from decotheco.regalos where codigo = '"
						+ codigo + "' and usado = 0";
				
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					String usuarioBuyer=rs.getString("nombre_buyer");
					String mailBuyer=rs.getString("mail_buyer");
					String nombre=rs.getString("nombre");
					String mail=rs.getString("mail");
					 
					String telefono=rs.getString("telefono_buyer");
					String direccion=rs.getString("direccion");
					String poblacion=rs.getString("poblacion");
					String mensaje_personalizar=rs.getString("mensaje_personalizar");
					String comentarios=rs.getString("comentarios");
					String cp=rs.getString("cp");
					int total=rs.getInt("total");
					String total2= Integer.toString(total);
					log.info(tipo);
					// SI ES UN REGALO DE TIPO CAJA PAGADO CON TPV
					if(tipo==4){
						// MENSAJE PARA EL COMPRADOR Y NOSOTROS
						log.info("dataBBDD entró en mensaje para comprador y nosotros");
						String content[]= {"regaloCajaComprador","","", usuarioBuyer, mailBuyer, telefono, nombre, direccion, cp, poblacion};
						String content2[]= {"regaloCajaApl","","", usuarioBuyer, mailBuyer, telefono, nombre, direccion, cp, poblacion, comentarios, mensaje_personalizar};
						
						Mail hhtMail = new Mail();
						Mail hhtMail2 = new Mail();
						try{
							hhtMail.sendMail( mailBuyer, "info@decotheco.com", "Compra de caja Deco", content);  

							hhtMail2.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Alquien compró una caja Deco", content2);
							hhtMail2.sendMail( "info@decotheco.com", "info@decotheco.com", "Alquien compró una caja Deco", content2);
							
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage()); 
						} 
						
						 
						
					// SI ES UNA REGALO TIPO EMAIL	
					} else if(tipo==3) {
						// REGALO EMAIL PARA COMPRADOR
						log.info("dataBBDD entró en mensaje para comprador y destinatario");
						String content3[]= {"regaloEmailComprador","","",mail};
						String content4[]= {"regaloEmailDestinatario",mensaje_personalizar,codigo};
						Mail hhtMail3 = new Mail();
						Mail hht4 = new Mail();
						try{
							  hhtMail3.sendMail(mailBuyer, "info@decotheco.com", "E-Tarjeta pedido efectuado", content3);

							  hhtMail3.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "E-Tarjeta pedido efectuado", content3);
							  hhtMail3.sendMail( "info@decotheco.com", "info@decotheco.com", "E-Tarjeta pedido efectuado", content3);
							  hht4.sendMail(mail, "info@decotheco.com", "Regalo de un amigo", content4);

							 
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage()); 
						}
						 
 
					// SI ES UN PAGO NORMAL CON TPV DESDE PAGAR
					} 
						
						 
					} else {
						 
							
							String sql3 = "Select * from decotheco.projects where id = '"
									+ codigo + "'";
							ResultSet rs3 = stmt.executeQuery(sql3); 
							if (rs3.next()) { 
								String id_usuario=rs3.getString("id_usuario");
								String sql4 = "Select * from decotheco.users where id = '"
										+ id_usuario + "'";
								ResultSet rs4 = stmt.executeQuery(sql4); 
								if (rs4.next()) { 
									String mail=rs4.getString("mail");
									
									if(tipo==1) {
										String content5[]= {"compraNormal","","","179"};
										Mail hhtMail4 = new Mail();
										try{
											 hhtMail4.sendMail(mail, "info@decotheco.com", "Compra de un pack Deco", content5);
											 try{ 
												 hhtMail4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Compra de un pack Deco", content5);
												 hhtMail4.sendMail( "info@decotheco.com", "info@decotheco.com", "Compra de un pack Deco", content5);
											}catch(Exception e){
												log.error("ERROR en try catch:" + e.getMessage()); 
											}
										}catch(Exception e){
											log.error("ERROR en try catch:" + e.getMessage()); 
										}
									}else {
										String content5[]= {"compraNormal","","","79"}; 
										Mail hhtMail4 = new Mail();
										try{
											 hhtMail4.sendMail(mail, "info@decotheco.com", "Compra de un pack Deco", content5);
											 try{ 
												 hhtMail4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Compra de un pack Deco", content5);
												 hhtMail4.sendMail( "info@decotheco.com", "info@decotheco.com", "Compra de un pack Deco", content5);
											}catch(Exception e){
												log.error("ERROR en try catch:" + e.getMessage()); 
											}
										}catch(Exception e){
											log.error("ERROR en try catch:" + e.getMessage()); 
										}
									}
									
								
								
								
								}
									
							}	 
					}
				
				
				
				
				
			if(respuesta==0) return false;
			}else{
				return false;
			}
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			

		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return false;
		}

		return true;
	}
	public int setRegaloValido(String codigo) throws Exception {
		log.info("dataBBDD setRegaloValido");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		int id_regalo=-1;
		try {
			
			if (conn != null) {
				int respuesta=0;
				String sql = "Select id from decotheco.regalos where codigo = '"
						+ codigo + "' and usado = 1";
				
				ResultSet rs = stmt.executeQuery(sql);log.info("dataBBDD: "+sql);
				if (rs.next()) {
					id_regalo = rs.getInt("id");
					if (id_regalo >0 ) {

				java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
						 sql = "UPDATE decotheco.regalos SET  usado = 0 where codigo='"
								+ codigo +"';";
						respuesta=stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
					}
				if(respuesta==0) return -1;
				}else{
					return -1;
				}
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}

		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return -1;
		}

		return id_regalo;// todo correcto

	}
	public int setRegalo(RegaloVO pref) throws Exception {
		log.info("dataBBDD setRegalo");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql =  "insert into decotheco.regalos (total, codigo, nombre, direccion, cp, telefono_buyer, poblacion, comentarios, nombre_buyer, mail_buyer, mensaje_personalizar, mail) values ('"
						+ pref.total
						+ "','"
						+ pref.codigo
						+ "','"
						+ pref.nombre
						+ "','"
						+ pref.direccion
						+ "','"
						+ pref.cp
						+ "','"
						+ pref.telefono_buyer
						+ "','"
						+ pref.poblacion
						+ "','"
						+ pref.comentarios
						+ "','"
						+ pref.nombre_buyer
						+ "','"
						+ pref.mail_buyer
						+ "','"
						+ pref.mensaje_personalizar
						+ "','"
						+ pref.mail + "')";
				
				log.info("dataBBDD: "+sql);
				log.info(sql);
				int result = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 0;
		}
		return 1;// todo correcto
	}
	public int setRegaloUsado(RegaloVO pref) throws Exception {
		log.info("dataBBDD setRegaloUsado");
		Connection conn = conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql =  "insert into decotheco.regalos (total, codigo, nombre, direccion, cp, telefono_buyer, poblacion, comentarios, nombre_buyer, mail_buyer, mensaje_personalizar, mail, usado) values ('"
						+ pref.total
						+ "','"
						+ pref.codigo
						+ "','"
						+ pref.nombre
						+ "','"
						+ pref.direccion
						+ "','"
						+ pref.cp
						+ "','"
						+ pref.telefono_buyer
						+ "','"
						+ pref.poblacion
						+ "','"
						+ pref.comentarios
						+ "','"
						+ pref.nombre_buyer
						+ "','"
						+ pref.mail_buyer
						+ "','"
						+ pref.mensaje_personalizar
						+ "','"
						+ pref.mail + "', 1)";
				
				log.info("dataBBDD: "+sql);
				log.info(sql);
				int result = stmt.executeUpdate(sql);log.info("dataBBDD: "+sql);
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;

			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;
		}
		return 0;// todo correcto
	}
}
