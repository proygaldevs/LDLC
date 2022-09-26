package sarandon.decotheco.ldlc.controller;


import java.io.File;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;

import com.amazonaws.services.s3.model.S3ObjectSummary;

import sarandon.assistance.model.Core;
import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.S3Sample;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.ClientAffiliates;
import sarandon.decotheco.ldlc.Config;
import sarandon.decotheco.ldlc.model.ItemLDLCForParse;
import sarandon.decotheco.ldlc.model.ListaCompra;
import sarandon.decotheco.thecoradores.bean.Etiquetas;


/**
 * Métodos crud de ListaCompra
 * @author carlos
 *
 */
public class ListaCompraController {

	private final static Logger log = Logger.getLogger(dataBBDD.class);
	Connection conn = null;
	String db_url = new String();
	String db_user = new String();
	String db_password = new String();
	
	public ListaCompraController(){
		/*this.db_url = Config.db_URL;
		this.db_user = Config.db_user;
		this.db_password = Config.db_password;*/
	}
	

	
	/**
	 * Crea en base de datos un objeto ListaCompra
	 * @param lc objeto ListaCompra a crear
	 */
	public void crearListaCompra(ListaCompra lc){
        try {
        	
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			
			
			String query ="INSERT INTO listacompra (id,id_proyecto,canvas,estado) VALUES (1, "+lc.Proyecto_id+", '"+lc.Canvas+"', 1)";
			//System.out.println("Ejecutando: "+query);
			statement.executeUpdate(query); 


            conn.close();			
			
			
		} catch ( Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		
	}
	
	/**
	 * Crea en una lista de la compra en base de datos
	 * @param proyecto_id es el id del proyecto
	 * @param decorador_id es el id del decorador
	 * @return id de la lista creada
	 */
	public int createEquals(int proyecto_id, int decorador_id, int ldlc_id){
		int lastid = -1;
        try {
        	if(proyecto_id==-3){
        		proyecto_id=1;
        	}
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			
			 
			
			String query3 ="SELECT * FROM listacompra WHERE id_decorador="+decorador_id+" and canvas is null limit 1;";
			ResultSet rs3 = statement.executeQuery(query3);  
			 
			if (rs3.next()){
				lastid=rs3.getInt("id");
			}
			if(lastid>1) {
				 
				 
			} else {
				String query2 ="INSERT INTO listacompra (id_proyecto,id_decorador,estado) VALUES ("+proyecto_id+","+decorador_id+",1);";
				statement.executeUpdate(query2, Statement.RETURN_GENERATED_KEYS); 
				ResultSet rs2 = statement.getGeneratedKeys();
				if (rs2.next()){
					lastid=rs2.getInt(1);
				}
			}

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
        return lastid;
	}
	public int create(int proyecto_id, int decorador_id){
		int lastid = -1;
        try {
        	if(proyecto_id==-3){
        		proyecto_id=1;
        	}
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			
			String query3 ="SELECT * FROM listacompra WHERE id_decorador="+decorador_id+" and canvas is null limit 1;";
			ResultSet rs3 = statement.executeQuery(query3);  
			int ldlc=0;
			if (rs3.next()){
				ldlc=rs3.getInt("id");
			}
			if(ldlc>1) { 
				lastid=ldlc;
			} else {
				String query2 ="INSERT INTO listacompra (id_proyecto,id_decorador,estado) VALUES ("+proyecto_id+","+decorador_id+",1);";
				statement.executeUpdate(query2, Statement.RETURN_GENERATED_KEYS); 
				ResultSet rs2 = statement.getGeneratedKeys();
				if (rs2.next()){
					lastid=rs2.getInt(1);
				}
			}  

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
        return lastid;
	} 
	 
	
	public List<ListaCompra> getListdlc(String tipo){

		List<ListaCompra> salida= new ArrayList<ListaCompra>();
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			Statement statement2 = conn.createStatement(); 
			String query="";
			if(tipo.equals("todo")) {
				query ="Select * FROM listacompra  WHERE estado>=2 order by RAND()";
			} else {
				query ="Select * FROM listacompra  WHERE galeria_ldlc>=1 order by RAND()";
			}
			//System.out.println(query);
			log.info(query);
			statement.executeQuery(query); 
			ResultSet rs = statement.getResultSet();

			while (rs.next()){
				ListaCompra lc = new ListaCompra();
				Set<Etiquetas> returnVar = new HashSet<>();
				lc.ListaCompra_id = rs.getInt("id");
				lc.Proyecto_id = rs.getInt("id_proyecto");
				lc.Decorador_id = rs.getInt("id_decorador");
				lc.Canvas = rs.getString("canvas");
				lc.URLCanvas = rs.getString("urlcanvas");
				lc.Estado = rs.getInt("estado")+"";
				lc.Habitacion = rs.getString("habitacion");
				lc.nombreLdlc = rs.getString("nombre_ldlc");
				lc.imagen = rs.getString("imagen");
				
				  
						String sql2 = "SELECT id_etiqueta FROM decotheco.aux_ldlc_etiquetas where  id_ldlc=" + lc.ListaCompra_id;
						ResultSet rs2 = statement2.executeQuery(sql2);
						log.info(sql2);
						
						while (rs2.next()) {
							Etiquetas e= new Etiquetas(); 
							e.id=rs2.getInt("id_etiqueta");
							returnVar.add(e); 
						} 
						
						
				lc.etiquetas=returnVar;


				salida.add(lc);
			}

			conn.close();		
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		
		return salida;
		
	}
	 
	public List<ListaCompra> getListdlc2(){

		List<ListaCompra> salida= new ArrayList<ListaCompra>();
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			Statement statement2 = conn.createStatement(); 
			
			String query ="Select * FROM listacompra  WHERE id_proyecto>1 && estado=4 && estado=4 && habitacion IS NOT NULL || id_proyecto>1 && estado=5 && habitacion IS NOT NULL order by RAND()";
			//System.out.println(query);
			log.info(query);
			statement.executeQuery(query); 
			ResultSet rs = statement.getResultSet();

			while (rs.next()){
				ListaCompra lc = new ListaCompra();
				Set<Etiquetas> returnVar = new HashSet<>();
				lc.ListaCompra_id = rs.getInt("id");
				lc.Proyecto_id = rs.getInt("id_proyecto");
				lc.Decorador_id = rs.getInt("id_decorador");
				lc.Canvas = rs.getString("canvas");
				lc.URLCanvas = rs.getString("urlcanvas");
				lc.Estado = rs.getInt("estado")+"";
				lc.Habitacion = rs.getString("habitacion");
				lc.nombreLdlc = rs.getString("nombre_ldlc");
				lc.imagen = rs.getString("imagen");
				
				  
						String sql2 = "SELECT id_etiqueta FROM decotheco.aux_ldlc_etiquetas where  id_ldlc=" + lc.ListaCompra_id;
						ResultSet rs2 = statement2.executeQuery(sql2);
						log.info(sql2);
						
						while (rs2.next()) {
							Etiquetas e= new Etiquetas(); 
							e.id=rs2.getInt("id_etiqueta");
							returnVar.add(e); 
						} 
						
						
				lc.etiquetas=returnVar;


				salida.add(lc);
			}

			conn.close();		
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		
		return salida;
		
	}
	
	/**
	 * Lee objeto ListaCompra
	 * @param id identificador
	 * @return Objeto ListaCompra con identificador id
	 */
	public ListaCompra getListaCompra(int id){
		ListaCompra lc = new ListaCompra();
		lc.Canvas="{}";
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			Statement statement2 = conn.createStatement(); 
			Set<Etiquetas> returnVar = new HashSet<>();
			
			String query ="Select id,id_proyecto,id_decorador,canvas,urlcanvas,estado,nombre_ldlc,habitacion,imagen,galeria_ldlc FROM listacompra  WHERE (id="+id+")";
			//System.out.println(query);
			log.info(query);
			statement.executeQuery(query); 
			ResultSet rs = statement.getResultSet();

			if (rs.next()){
				lc.ListaCompra_id = rs.getInt("id");
				lc.Proyecto_id = rs.getInt("id_proyecto");
				lc.Decorador_id = rs.getInt("id_decorador");
				lc.Canvas = rs.getString("canvas");
				lc.URLCanvas = rs.getString("urlcanvas");
				lc.Estado = rs.getInt("estado")+"";
				lc.Habitacion = rs.getString("habitacion");
				lc.nombreLdlc = rs.getString("nombre_ldlc")+"";
				lc.imagen = rs.getString("imagen");
				lc.galeria_ldlc = rs.getInt("galeria_ldlc");
				
				String sql2 = "SELECT id_etiqueta FROM decotheco.aux_ldlc_etiquetas where  id_ldlc=" + lc.ListaCompra_id;
				ResultSet rs2 = statement2.executeQuery(sql2);
				log.info(sql2);
				
				while (rs2.next()) {
					Etiquetas e= new Etiquetas(); 
					e.id=rs2.getInt("id_etiqueta");
					returnVar.add(e); 
				} 
				
				
				lc.etiquetas=returnVar;
		
			}
			

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
        
		return lc;
	}
	 
	/**
	 * Lee objeto ListaCompra
	 * @param id identificador
	 * @return Objeto ListaCompra con identificador id
	 */
	public ArrayList<ListaCompra> getListaCompraByProyectAndPaso(int idProyecto, int paso){
		ArrayList<ListaCompra> listaForReturn= new ArrayList<>(0); 
		ListaCompra lc = new ListaCompra();
		lc.Canvas="{}";
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			Connection conn4 = new dataBBDD().conectar();
			Statement statement4 = conn4.createStatement(); 

			 
			String query ="Select id,id_proyecto,id_decorador,canvas,urlcanvas,estado, habitacion,nombre_ldlc,galeria_ldlc, imagen FROM listacompra  WHERE (id_proyecto="+idProyecto;
			
			if(paso==3){
				query+= " and (estado>=2));";
			}else if(paso==4){
				query+= " and (estado= 4 or estado = 5));";
			}else
				query+= " );";
			log.info(query);
			statement4.executeQuery(query); 
			ResultSet rs5 = statement4.getResultSet();
			
			while (rs5.next()){
				lc= new ListaCompra();
				lc.ListaCompra_id = rs5.getInt("id");
				lc.Proyecto_id = rs5.getInt("id_proyecto");
				lc.Decorador_id = rs5.getInt("id_decorador");
				lc.Canvas = rs5.getString("canvas");
				lc.nombreLdlc = rs5.getString("nombre_ldlc");
				lc.imagen = rs5.getString("imagen");
				lc.Habitacion = rs5.getString("habitacion");
				lc.galeria_ldlc = rs5.getInt("galeria_ldlc");
				
				  
				lc.URLCanvas = rs5.getString("urlcanvas");
				lc.Estado = rs5.getInt("estado")+"";
				Core th= new CoreImpl();
				lc.setEtiquetas(th.getEtiquetasByIdLdlc(lc.ListaCompra_id));
				lc.setItems(); 
				listaForReturn.add(lc);
			}
			
			rs5.close();
            conn4.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace(); 
		}
        
		return listaForReturn;
	}
	
	/**
	 * Devuelve una lista con los nombres de los iconos del directorio mobiliario definido en Config
	 * @return
	 */
/*	public List<String> getListMobiliario(String path){
		List<String> salida = new ArrayList<String>();
		
		File[] files = new File(path+Config.directory_mobiliario).listFiles();

		for (File file : files) {
		    if (file.isFile()) {
		    	salida.add(file.getName());
		    }
		}
		
		return salida;
	}*/
	public List<String> getListMobiliario(String path) {
		List<String> listaFicheros = new ArrayList<String>(0);
		try {
			String absoluteDiskPath = "";
			absoluteDiskPath = "ldlc/icons/mobiliario/";
			S3Sample s3 = new S3Sample();
			ArrayList<String> lista=s3.listFilesInFolder( absoluteDiskPath);
			
			for (String s3ObjectSummary : lista) {
				listaFicheros.add(s3ObjectSummary.replace(absoluteDiskPath, "") );
			}
			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			return listaFicheros;
		}
		return listaFicheros;
	}
	/**
	 * Devuelve una lista con los nombres de los iconos del directorio complementos definido en Config
	 * @return
	 */
/*	public List<String> getListComplementos(String path){
		List<String> salida = new ArrayList<String>();
		
		File[] files = new File(path+Config.directory_complementos).listFiles();

		for (File file : files) {
		    if (file.isFile()) {
		    	salida.add(file.getName());
		    }
		}
		
		return salida;
	}
*/
	
	public List<String> getListComplementos(String path) {
		List<String> listaFicheros = new ArrayList<String>(0);
		try {
			String absoluteDiskPath = "";
			absoluteDiskPath = "ldlc/icons/complementos/";
			S3Sample s3 = new S3Sample();
			ArrayList<String> lista=s3.listFilesInFolder( absoluteDiskPath);
			
			for (String s3ObjectSummary : lista) {
				listaFicheros.add(s3ObjectSummary.replace(absoluteDiskPath, "") );
			}
			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			return listaFicheros;
		}
		return listaFicheros;
	}
	/**
	 * Devuelve una lista con los nombres de los iconos del directorio extras definido en Config
	 * @return
	 */
	/*public List<String> getListExtras(String path){
		List<String> salida = new ArrayList<String>();
		
		File[] files = new File(path+Config.directory_extras).listFiles();

		for (File file : files) {
		    if (file.isFile()) {
		    	salida.add(file.getName());
		    }
		}
		
		return salida;
	}*/
	
	public List<String> getListExtras(String path) {
		List<String> listaFicheros = new ArrayList<String>(0);
		try {
			String absoluteDiskPath = "";
			absoluteDiskPath = "ldlc/icons/extras/";
			S3Sample s3 = new S3Sample();
			ArrayList<String> lista=s3.listFilesInFolder( absoluteDiskPath);
			
			for (String s3ObjectSummary : lista) {
				listaFicheros.add(s3ObjectSummary.replace(absoluteDiskPath, "") );
			}
			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			return listaFicheros;
		}
		return listaFicheros;
	}
	
	/**
	 * Actualiza objeto ListaCompra
	 * @param lc objeto ListaCompra a actualizar
	 */
	public void saveLdlc(ListaCompra lc){
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			String query ="UPDATE listacompra SET estado='1' WHERE id_proyecto="+lc.Proyecto_id + " and estado ="+lc.Estado;
			
			String estadoAux = "";
			if(Integer.parseInt(lc.Estado)==4 || Integer.parseInt(lc.Estado)==5) query ="UPDATE listacompra SET estado='1' WHERE id_proyecto="+lc.Proyecto_id + " and (estado = 5 or estado = 4)";
			
			
			
			if(Integer.parseInt(lc.Estado)>1)
			statement.executeUpdate(query); 

            conn.close();			
            
            
            
            Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			statement = conn.createStatement(); 
			query ="UPDATE listacompra SET canvas = '"+lc.Canvas+"', estado='"+lc.Estado+"', id_proyecto='"+lc.Proyecto_id +"', imagen='"+lc.imagen+"' WHERE id="+lc.ListaCompra_id;
			statement.executeUpdate(query); 

            conn.close();			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * Setea un estado a una ldlc
	 * @param lc objeto ListaCompra a actualizar
	 * @param int del nuevo estado
	 */
	public void setStateLdlcByProjectIdAndState(ListaCompra lc, int estadoNuevo){
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			String query ="UPDATE listacompra SET estado='"+estadoNuevo + "' WHERE id_proyecto="+lc.Proyecto_id + " and estado ="+lc.Estado;
			statement.executeUpdate(query); 

            conn.close();			
            
		

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Borra objeto ListaCompra
	 * @param id identificador
	 */
	public void deleteListaCompra(int id){

	}
	
	/**
	 * Almacena el path de una imagen subida mediante ajax para un id de listacompra
	 * @param id_lista_compra
	 */
	/*
	public void saveRasterizedImage(String path, int lista_compra_id){
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(this.db_url, this.db_user, this.db_password);
			Statement statement = conn.createStatement(); 
			
			String query ="UPDATE listacompra SET urlcanvas = '"+path+"' WHERE id="+lista_compra_id;
			statement.executeUpdate(query); 

            conn.close();			

		} catch (SQLException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	*/
	
}
