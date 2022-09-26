package sarandon.decotheco.ldlc.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import sarandon.assistance.model.Core;
import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.decotheco.ldlc.Config;
import sarandon.decotheco.ldlc.model.ItemLDLC;
import sarandon.decotheco.thecoradores.bean.ProjectsStates;

public class ItemController {
	private final static Logger log = Logger.getLogger(dataBBDD.class);
	Connection conn = null;
	String db_url = new String();
	String db_user = new String();
	String db_password = new String();
	
	public ItemController(){
		/*this.db_url = Config.db_URL;
		this.db_user = Config.db_user;
		this.db_password = Config.db_password;*/
	}
	
	
	/**
	 * Obtiene la lista de Items de un decorador
	 * @param decorador_id id del decorador
	 * @return Lista de ItemLDLC
	 */
	public List<ItemLDLC> getItems(int decorador_id){
		List<ItemLDLC> listaItems = new ArrayList<ItemLDLC>();
		
        try {
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			
			String query ="Select i.id, i.titulo, i.precio, i.URLpagina, i.pathimagen, i.activo "
					+ "FROM item i, item_lista t  WHERE (t.id_decorador="+decorador_id+" and i.id=t.id_itemlistacompra) and (i.activo=1 and i.tipo<0) order by id desc limit 100";
			//System.out.println(query);
			statement.executeQuery(query); 
			log.info(query);
			ResultSet rs = statement.getResultSet();

			while (rs.next()){
				ItemLDLC item = new ItemLDLC();
				item.itemLDC_id =rs.getInt("i.id");
				item.URLImage = rs.getString("i.URLpagina");
				item.ImageTitle =rs.getString("i.titulo");
				item.Price = rs.getString("i.precio");
				item.PathImage =rs.getString("i.pathimagen"); 
				listaItems.add(item);
			}
			
			
			//cargo las etiquetas para cada item de la lista
			for (ItemLDLC item: listaItems){
				
				List<String> lista_etiquetas = new ArrayList<String>();
				String query_etiquetas ="SELECT e.id, e.nombre FROM etiquetas e, item_etiqueta i "
						+ "WHERE (e.id=i.id_etiqueta and i.id_itemlistacompra="+item.itemLDC_id+")";
				statement.executeQuery(query_etiquetas); 
				ResultSet rs_etiqueta = statement.getResultSet();
				while (rs_etiqueta.next()){
					lista_etiquetas.add(rs_etiqueta.getString("e.nombre"));
				}
				
				
				item.ListaEtiquetas = lista_etiquetas;
	
				
			}
			

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		
		return listaItems;
	}
	
	public int getIdState(int id_proyecto) throws Exception {
		Core c = new CoreImpl();
		
		return c.getIdStateFromProjectbyIdProject(id_proyecto);
		

	}
	 
	
	
	/**
	 * Crea un nuevo ItemLDLC en base de datos a partir de un objeto ItemLDC
	 * @param item
	 * @param decorador_id id del decorador
	 * @return id del nuevo item
	 */
	public int create(ItemLDLC item, List<String>lista_etiquetas, int decorador_id, int originial){
		int salida = -1;
        try { 
        	Class.forName("com.mysql.jdbc.Driver");
			conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement(); 
			
			String query ="INSERT INTO item (titulo,precio,urlpagina,pathimagen, activo, tipo) "
						+ "VALUES ('"+item.ImageTitle+"','"+item.Price+"','"+item.URLImage+"','"+item.PathImage+"',1," + originial +")";
			log.info(query);		
			statement.executeUpdate(query, Statement.RETURN_GENERATED_KEYS); 
			ResultSet rs = statement.getGeneratedKeys();
			int lastid=-1;
			if (rs.next()){
				lastid=rs.getInt(1);
			}
			
			
			String query2 ="INSERT INTO item_lista (id_itemlistacompra,id_decorador) "
					+ "VALUES ('"+lastid+"','"+decorador_id+"')";
			//System.out.println("Ejecutando: "+query2);
			statement.executeUpdate(query2); 
			log.info(query2);
			
			
			
			//inserto etiquetas
			for (String etiqueta: lista_etiquetas) {
				String query3 ="INSERT INTO etiquetas (nombre) SELECT '"+etiqueta.trim().toLowerCase()+"' FROM dual WHERE NOT EXISTS (SELECT * FROM etiquetas WHERE nombre = '"+etiqueta.trim().toLowerCase()+"')";
				//System.out.println("Ejecutando: "+query3);
				statement.executeUpdate(query3); 
				log.info(query3);
				
				
				//recupero el id de la etiqueta (puede no haberse insertado)
				int id_nueva_etiqueta=1;
				String query5 ="SELECT id FROM etiquetas WHERE nombre = '"+etiqueta.trim()+"'";
				//System.out.println(query5);
				statement.executeQuery(query5); 
				log.info(query5);
				ResultSet rs2 = statement.getResultSet();
				if (rs2.next()){
					id_nueva_etiqueta = rs2.getInt("id");
				}
				
				//inserto en la tabla intermedia item-etiqueta
				String query4 ="INSERT INTO item_etiqueta (id_itemlistacompra,id_etiqueta) VALUES ('"+lastid+"',"+id_nueva_etiqueta+")";
				//System.out.println("Ejecutando: "+query4);
				statement.executeUpdate(query4); 
			}
			
			
			

			

            conn.close();			

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return salida;
	}

}
