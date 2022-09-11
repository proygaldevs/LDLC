package sarandon.assistance.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import com.currencyfair.onesignal.OneSignal;
import com.currencyfair.onesignal.model.notification.Field;
import com.currencyfair.onesignal.model.notification.Filter;
import com.currencyfair.onesignal.model.notification.NotificationRequest;
import com.currencyfair.onesignal.model.notification.NotificationRequestBuilder;
import com.currencyfair.onesignal.model.notification.Operator;
import com.currencyfair.onesignal.model.notification.Relation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonElement;

import sarandon.assistance.servlet.more.Config;
import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.Afiliado;
import sarandon.assistance.vo.Alerts;
import sarandon.assistance.vo.Cita;
import sarandon.assistance.vo.ClientAffiliates;
import sarandon.assistance.vo.ColorForModBoadr;
import sarandon.assistance.vo.Facturacion;
import sarandon.assistance.vo.GetAfiliadoInfo;
import sarandon.assistance.vo.MailObject;
import sarandon.assistance.vo.OfertasAfiliado;
import sarandon.assistance.vo.PagoInfo;
import sarandon.assistance.vo.PagosAfiliado;
import sarandon.assistance.vo.Piso;
import sarandon.assistance.vo.PisosProjects;
import sarandon.assistance.vo.PisosPromocion;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Promocion;
import sarandon.assistance.vo.Promotora;
import sarandon.assistance.vo.Proyecto;
import sarandon.assistance.vo.User;
import sarandon.assistance.vo.portfolio.PortfolioItem;
import sarandon.decotheco.ldlc.controller.ListaCompraController;
import sarandon.decotheco.ldlc.model.ItemLDLC;
import sarandon.decotheco.ldlc.model.ItemLDLCForParse;
import sarandon.decotheco.ldlc.model.ListaCompra;
import sarandon.decotheco.thecoradores.bean.AuxTypesStates;
import sarandon.decotheco.thecoradores.bean.AuxTypesStatesId;
import sarandon.decotheco.thecoradores.bean.Citas;
import sarandon.decotheco.thecoradores.bean.Decoradores;
import sarandon.decotheco.thecoradores.bean.Etiquetas;
import sarandon.decotheco.thecoradores.bean.Projects;
import sarandon.decotheco.thecoradores.bean.ProjectsStates;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sarandon.decotheco.thecoradores.bean.Trabajos;


public class CoreImpl implements Core {

	private final static Logger log = Logger.getLogger(CoreImpl.class);
	
	public CoreImpl() {
		// TODO Auto-generated constructor stub
	}

	/*@Override
	public Decoradores getDecoradorById(int id_decorador) throws Exception {
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		Decoradores decorador= new Decoradores();
		
		try {

			if (conn != null) {
				String sql = "SELECT * FROM decotheco.decoradores where id= "
						+ id_decorador;
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					decorador.setId(rs.getInt("id"));
					decorador.setNombre(rs.getString("nombre"));
					decorador.setMail(rs.getString("mail"));
					decorador.setUrlBlog(rs.getString("url_blog"));
					decorador.setUrlRss(rs.getString("url_rss"));
					decorador.setActivo(rs.getInt("activo"));
					decorador.setIdentificadorUnico(rs.getString("identificador_unico"));
					decorador.setTexto_decorador(rs.getString("texto_decorador"));

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
		return decorador;

	}
	*/
	@Override
	public String getFacturacion(Map<String, String[]> parametros, String path) throws Exception {
		log.info("CoreImpl getFacturacion");
		// TODO Auto-generated method stub
		String pass="";
		if (parametros.get("pass") != null){
			pass=parametros.get("pass")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - FALTA PASSWORD");
		}
		
		
		String mail="";
		if (parametros.get("mail") != null){
			mail=parametros.get("mail")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - FALTA MAIL");
		}
		
		int id_decorador=-1;
		if (parametros.get("id_decorador") != null){
			id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
		}	
		
		if(instantComp(mail, pass)==1){
			
		}else{
				Gson gson = new Gson();
				return gson.toJson("ERROR - DATOS INCORRECTOS");
		}
		
		ArrayList<Facturacion> flist=new ArrayList<>(0);

		try{
			
			if(id_decorador==-1){
				id_decorador=getDecoradorByMail(mail, 0,0,"").getId();
			}
			flist= getFacturacionByIdDecorador(id_decorador, path, mail);
			for(int i=0 ; i<flist.size(); i++){
				
				Facturacion f= flist.get(i);
				if(f.id_proyecto!= -1){
					Proyecto p = new dataBBDD().getPoyectoById(f.id_proyecto, -1, "");
					f.preferencias= p.preferencias;
					f.nombreProyecto=p.nombreProyectDecorador;
				}
				
			}
		}catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
		}
		
		ObjectMapper mapper= new ObjectMapper();
		String jsonInString = mapper.writeValueAsString(flist);
		return jsonInString;
		/*Gson gson = new Gson();
		return gson.toJson(flist);*/
	}

	/**
	 * Obtiene una lista con los objetos ListaCompra de un decorador en estado borrador
	 * @param id_decorador id del decorador
	 * @return Lista de ListaCompra
	 */
	@Override
	public String getBorradores(Map<String, String[]> parametros, String path) throws Exception{ 
		int decorador_id=-1;
		if (parametros.get("decorador_id") != null){
			decorador_id=Integer.parseInt(parametros.get("decorador_id")[0]);
		}	
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		ArrayList<ListaCompra> lista = new ArrayList<>(0);
		 
		// REALIZAMOS CONSULTA A TABLA DE LISTACOMPRA PARA OBTENER DATOS DE LA LISTA DE LA COMPRA BORRADORES (ESTADO 1)
        try { 
			
			String query ="Select id,id_proyecto,id_decorador,urlcanvas,estado,imagen FROM listacompra  WHERE (id_decorador="+decorador_id+" and estado=1  and imagen!='') order by id desc";
			//System.out.println(query);
			log.info(query);
			stmt.executeQuery(query); 
			ResultSet rs = stmt.getResultSet();
			
			// RECORREMOS OBJETO QUE VAMOS A DEVOLVER
			while (rs.next()){
				ListaCompra lc = new ListaCompra();
				lc.ListaCompra_id = rs.getInt("id");
				lc.Proyecto_id = rs.getInt("id_proyecto");
				lc.Decorador_id = decorador_id;
				lc.URLCanvas = rs.getString("urlcanvas");
				lc.Estado = rs.getInt("estado")+"";
				lc.imagen = rs.getString("imagen");
				if(lc.imagen==null) {
					lc.imagen ="";
				}
				
				lista.add(lc);
			}
			

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		
        

    	Gson gson = new Gson();
    	return gson.toJson(lista);
    	 
		
	}
	

	/**
	 * Obtiene una lista con los objetos ListaCompra de un decorador en estado publicado
	 * @param id_decorador id del decorador
	 * @return Lista de ListaCompra
	 */
	@Override
	public String getPublicados(Map<String, String[]> parametros, String path) throws Exception{ 
		int decorador_id=-1;
		if (parametros.get("decorador_id") != null){
			decorador_id=Integer.parseInt(parametros.get("decorador_id")[0]);
		}	
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		ArrayList<ListaCompra> lista = new ArrayList<>(0);
		 
		// REALIZAMOS CONSULTA A TABLA DE LISTACOMPRA PARA OBTENER DATOS DE LA LISTA DE LA COMPRA PUBLICADOS (ESTADO > 1)
        try { 
			
        	String query ="Select id,id_proyecto,id_decorador,urlcanvas,estado,imagen FROM listacompra  WHERE (id_decorador="+decorador_id+" and (estado>1) and imagen!='' ) order by id desc";
			//System.out.println(query);
			log.info(query);
			stmt.executeQuery(query); 
			ResultSet rs = stmt.getResultSet();

			while (rs.next()){
				ListaCompra lc = new ListaCompra();
				lc.ListaCompra_id = rs.getInt("id");
				lc.Proyecto_id = rs.getInt("id_proyecto");
				lc.Decorador_id = decorador_id;
				lc.URLCanvas = rs.getString("urlcanvas");
				lc.Estado = rs.getInt("estado")+"";
				lc.imagen = rs.getString("imagen");
				if(lc.imagen==null) {
					lc.imagen ="";
				}
				
				lista.add(lc);
			}
			

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		
        

    	Gson gson = new Gson();
    	return gson.toJson(lista);
    	 
		
	}
	
	
	/**
	 * Obtiene una lista de items de un decorador o de todos en función del parametro idDecorador
	 * @param id_decorador id del decorador
	 * @return lista de items
	 */
	@Override
	public String getItemsPaginado(Map<String, String[]> parametros, String path) throws Exception{ 
		int decorador_id=0;
		if (parametros.get("id_decorador") != null){
			decorador_id=Integer.parseInt(parametros.get("id_decorador")[0]);
		}
		int items=0;
		if (parametros.get("items") != null){
			items=Integer.parseInt(parametros.get("items")[0]);
		}
		int pages=0;
		if (parametros.get("pages") != null){
			pages=Integer.parseInt(parametros.get("pages")[0]);
		}
		int page=-1;
		if (parametros.get("page") != null){
			page=Integer.parseInt(parametros.get("page")[0]);
		}	 
		
		int start=items*page;
		int limit=items*pages; 
		
		Connection conn = new dataBBDD().conectar();
		Statement statement = conn.createStatement();
		List<ItemLDLC> listaItems = new ArrayList<ItemLDLC>();
		 
		// REALIZAMOS CONSULTA A TABLA DE LISTACOMPRA PARA OBTENER DATOS DE LA LISTA DE LA COMPRA PUBLICADOS (ESTADO > 1)
        try { 
        	String query ="";
        		query ="Select (Select count(i.id) FROM item i, item_lista t  WHERE (t.id_decorador="+decorador_id+" and i.id=t.id_itemlistacompra) and (i.activo=1 and i.tipo<0)) as cantidad, i.id, i.titulo, i.precio, i.URLpagina, i.pathimagen, i.activo, i.tipo "
					+ "FROM item i, item_lista t  WHERE (t.id_decorador="+decorador_id+" and i.id=t.id_itemlistacompra) and (i.activo=1 and i.tipo<0) order by id desc limit ";
        	
        	query +=items+" OFFSET "+start; 
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
				item.Tipo=rs.getInt("tipo");
 
        		item.numeroItems=rs.getInt("cantidad"); 
	        	List<String> lista_etiquetas = new ArrayList<String>();
	        	lista_etiquetas.add("");
	        	item.ListaEtiquetas=lista_etiquetas;
				
				listaItems.add(item);
			}
			
			
			/*//cargo las etiquetas para cada item de la lista
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
	
				
			}*/

            conn.close();			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		
        

    	Gson gson = new Gson();
    	return gson.toJson(listaItems);
    	 
		
	}

	@Override
	public ArrayList<Facturacion> getFacturacionByIdDecorador(int id, String path, String mail) throws Exception{
		log.info("CoreImpl getFacturacionByIdDecorador");
		ArrayList<Facturacion> lista = new ArrayList<>(0);
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		
		try {
			if (conn != null) {
				String sql = "SELECT * FROM decotheco.pagos_decoradores where id_decorador= "
						+ id + " order by id_proyecto, id;";
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				while (rs.next()) {
					Facturacion ps= new Facturacion();
					ps.id=(rs.getInt("id"));
					ps.id_proyecto=(rs.getInt("id_proyecto"));
					ps.id_decorador=(rs.getInt("id_decorador"));
					ps.cantidad=(rs.getFloat("id_decorador"));
					ps.fecha_pago=rs.getDate("fecha_pago");
					ps.fecha_entrada=rs.getDate("fecha_entrada");
					ps.concepto=rs.getString("concepto");
					
					ps.otros=rs.getString("otros");
					ps.token=rs.getString("token");
					
					if(path.length()>1 && ps.id_proyecto!=-1){
						ps.setFiles(path, mail);
					}
					lista.add(ps);
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
		return lista;
	}
	
	@Override
	public Promocion getPromocionByIdDecorador(int id) throws Exception{

		log.info("CoreImpl getPromocionByIdDecorador");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		Promocion ps= null;
		try {

			if (conn != null) {
				String sql = "SELECT * FROM decotheco.Promocion where id_decorador= "
						+ id + " and valida = 1 ;";
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				
				if (rs.next()) {
					ps=new Promocion();
					ps.id=(rs.getInt("id"));
					ps.id_decorador=id;
					ps.descripcion=rs.getString("descripcion");
					ps.numero_proyectos=rs.getInt("numero_proyectos");
					ps.tanto_por_ciento_promocionado=rs.getInt("tanto_por_ciento_promocionado");


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
		return ps;
	}
	
	@Override
	public String checkLdlc(Map<String, String[]> parametros, String path) throws  Exception {
		

		log.info("CoreImpl checkLdlc");
		
		String pass="";
		if (parametros.get("pass") != null){
			pass=parametros.get("pass")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING PASS DATA");
		}
		
		int id_decorador=-1;
		if (parametros.get("id_decorador") != null){
			id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING ID_DECORADOR DATA");
		}	
		
		int id_proyecto=-1;
		if (parametros.get("id_proyecto") != null){
			id_proyecto=Integer.parseInt(parametros.get("id_proyecto")[0]);
		}	
		
		int id_ldlc=-1;
		if (parametros.get("id_ldlc") != null){
			id_ldlc=Integer.parseInt(parametros.get("id_ldlc")[0]);
		}	
		String mail="";
		if (parametros.get("mail") != null){
			mail=parametros.get("mail")[0];
		}
		
		if(instantComp(id_decorador, pass)==1){
			
		}else{
			if(id_decorador==-3 && id_ldlc==-1 && id_proyecto==-3) {}
			else {
				Gson gson = new Gson();
				return gson.toJson("ERROR - INCORRECT DATA");
			}
		}
		if(mail.length()>1){
			if(instantComp(mail, pass)==1){
				
			}else{
				if(id_ldlc==-1 && id_proyecto==-3) {}
				else {
					Gson gson = new Gson();
					return gson.toJson("ERROR - INCORRECT DATA - MAIL");
				}
			}
		}
		if(id_ldlc>0){
			if(instantCompLdlcDecorador(id_decorador, id_ldlc)==1){
				
			}else{
				if(id_ldlc==-1 && id_proyecto==-3) {}
				else {
					Gson gson = new Gson();
					return gson.toJson("ERROR - NO ES TUYA - LDLC");
				}
			}
		}
		if(id_proyecto>0){
			if(instantCompProyectoDecorador(id_decorador, id_proyecto)==1){
				
			}else{
				if(id_ldlc==-1 && id_proyecto==-3) {}
				else {
					Gson gson = new Gson();
					return gson.toJson("ERROR - NO ES TUYO - PROEYCTO");
				}
			}
		}
			
			
		Gson gson = new Gson();
		return gson.toJson("OK");
	}
	
	@Override
	public String checkDiscount(Map<String, String[]> parametros, String path) throws  Exception {

		log.info("CoreImpl checkDiscount");
		String id_offer="";
		if (parametros.get("id_offer") != null){
			id_offer=parametros.get("id_offer")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING PASS DATA");
		}

		String affiliates="";
		if (parametros.get("affiliates") != null){
			affiliates=parametros.get("affiliates")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING MAIL DATA");
		}
		 
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		Afiliado ps= null;
		OfertasAfiliado ps2= null; 
		try {

			if (conn != null) {
				String sql = "SELECT * FROM decotheco.affiliates where id= "
						+ affiliates + ";";
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				
				if (rs.next()) {
					 
					ps=new Afiliado();
					ps.id=rs.getInt("id");
					ps.name=rs.getString("name");;
					ps.surname=rs.getString("surname");
					ps.url=rs.getString("url");
					ps.img=rs.getString("img");
					
					
				} else {
					Gson gson = new Gson();
					return gson.toJson("ERROR - id_offer not exist");
				}
				
				String sql2 = "SELECT * FROM decotheco.affiliates_offer where id= "
						+ id_offer + ";";
				ResultSet rs2 = stmt.executeQuery(sql2);
				if (rs2.next()) {
					ps2=new OfertasAfiliado(); 
					ps2.descuento_unitario=rs2.getFloat("descuento_unitario");
					ps2.descuento_porcentual=rs2.getFloat("descuento_porcentual");
				} else {
					Gson gson = new Gson();
					return gson.toJson("ERROR - id_offer not exist");
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
		
		Gson gson = new Gson();
		String Affiliates= gson.toJson(ps); 
		String Id_offer= gson.toJson(ps2);
		String todo="["+Affiliates+","+Id_offer+"]";
		return todo;
			 
		
	}
	
	
	@Override
	public String addDiscount(Map<String, String[]> parametros, String path) throws  Exception {
		
		log.info("CoreImpl addDiscount");
		int id_user=0;
		String rg_mail="";
		if (parametros.get("rg_mail") != null){
			rg_mail=parametros.get("rg_mail")[0];
		}else {
			return "";
		}
		
		int id_affiliate=0;
		if (parametros.get("id_affiliate") != null){
			id_affiliate=Integer.parseInt(parametros.get("id_affiliate")[0]);
		}else {
			return "";
		} 

		int id_offer=0;
		if (parametros.get("id_offer") != null){
			id_offer=Integer.parseInt(parametros.get("id_offer")[0]);
		}else {
			return "";
		}
		String resultvar="0";
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement(); 
		try {
			
			String sql = "SELECT id FROM decotheco.users where mail='"
					+ rg_mail+"';";
			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				id_user=rs.getInt("id");
			}
			rs.close(); 
			
			if (conn != null) {
				String sql2 = "insert into affiliates_users_veces (id_user,id_affiliate, id_offer) values ("+ id_user +","+ id_affiliate+","+ id_offer+")";
				log.info("CoreImpl: "+sql2);

				int resultado = stmt.executeUpdate(sql2);
				resultvar=String.valueOf(resultado);
			}
			
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			
		}
		 
		return resultvar;
	}
	
	@Override
	public int subtractDiscountDirect(int id_user, float valor) throws  Exception {
		
		log.info("CoreImpl subtractDiscountDirect"); 
		
		float money=0f;
		money = valor;
		 
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		Afiliado ps= null;
		OfertasAfiliado ps2= null; 
		try {
			
			String sql = "SELECT * FROM decotheco.affiliates_users_veces where id_user= "
					+ id_user + ";";
			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			 
			int id_offer=0;
			int veces=0;
			float recompensa_porcentual=0f;
			float recompensa_unitaria=0f;
			float totalPagar=0f;
			float moneyAcumulado=0f;
			if (rs.next()) {
				moneyAcumulado=rs.getFloat("money"); 
				id_offer=rs.getInt("id_offer"); 
				veces=rs.getInt("veces");
			}
			
			String sql2 = "SELECT * FROM decotheco.affiliates_offer where id= "
					+ id_offer + ";";
			ResultSet rs2 = stmt.executeQuery(sql2);
			if (rs2.next()) { 
				recompensa_unitaria=rs2.getFloat("recompensa_unitaria");
				recompensa_porcentual=rs2.getFloat("recompensa_porcentual");
				recompensa_porcentual=((recompensa_porcentual*money)/100);
				totalPagar=recompensa_unitaria+recompensa_porcentual;
				int vecesLimit=rs2.getInt("veces");
				if(vecesLimit>veces) {
					String sql3 = "UPDATE affiliates_users_veces SET veces="
							+ (veces+1)
							+ ", money="
							+ (moneyAcumulado+totalPagar)
							+ "where id_user="
							+ id_user;
					stmt.executeUpdate(sql3);
				}
			} 

			rs.close();
			rs2.close();
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
			
		}
		 
		return 1;
	}
	
	@Override
	public int subtractDiscount(Map<String, String[]> parametros, String path) throws  Exception {
		
		log.info("CoreImpl subtractDiscount");
		int id_user=0;  
		if (parametros.get("id_user") != null){
			id_user=Integer.parseInt(parametros.get("id_user")[0]);
		}else {
			return 0;
		} 

		int tipoPago=0;
		if (parametros.get("tipoPago") != null){
			tipoPago=Integer.parseInt(parametros.get("tipoPago")[0]);
		}else {
			return 0;
		}
		
		float money=0f;
		money=new CoreImpl().getProjectType(tipoPago).getPrecio();
		 
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		try {
			
			String sql = "SELECT * FROM decotheco.affiliates_users_veces where id_user= "
					+ id_user + ";";
			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			 
			int id_offer=0;
			int veces=0;
			float recompensa_porcentual=0f;
			float recompensa_unitaria=0f;
			float totalPagar=0f;
			float moneyAcumulado=0f;
			if (rs.next()) {
				moneyAcumulado=rs.getFloat("money"); 
				id_offer=rs.getInt("id_offer"); 
				veces=rs.getInt("veces");
			}
			
			String sql2 = "SELECT * FROM decotheco.affiliates_offer where id= "
					+ id_offer + ";";
			ResultSet rs2 = stmt.executeQuery(sql2);
			if (rs2.next()) { 
				recompensa_unitaria=rs2.getFloat("recompensa_unitaria"); 
				recompensa_porcentual=rs2.getFloat("recompensa_porcentual");
				recompensa_porcentual=((recompensa_porcentual*money)/100);
				totalPagar=recompensa_unitaria+recompensa_porcentual;
				int vecesLimit=rs2.getInt("veces");
				if(vecesLimit>veces) {
					String sql3 = "UPDATE affiliates_users_veces SET veces="
							+ (veces+1)
							+ ", money="
							+ (moneyAcumulado+totalPagar)
							+ "where id_user="
							+ id_user;
					stmt.executeUpdate(sql3);
				}
			} 

			rs.close();
			rs2.close();
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
			
		}
		 
		return 1;
	}
	@Override
	public String checkLdlcExtension(Map<String, String[]> parametros, String path) throws  Exception {

		log.info("CoreImpl checkLdlcExtension");
		String pass="";
		if (parametros.get("pass") != null){
			pass=parametros.get("pass")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING PASS DATA");
		}

		String mail="";
		if (parametros.get("mail") != null){
			mail=parametros.get("mail")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING MAIL DATA");
		}
		
		
		
		if(instantComp(mail, pass)==1){
			
		}else{
				Gson gson = new Gson();
				return gson.toJson("ERROR - INCORRECT DATA");
		}
		
		
		int d=getIdDecoradorByMailPass(mail, pass);
			if(d>0){
				Gson gson = new Gson();
				return gson.toJson(d);
				
			}else{
					Gson gson = new Gson();
					return gson.toJson("ERROR ");
			}
		
			
			
		
	}
	
	@Override
	public ProjectsStates getProjectStatebyId(int id_state) throws Exception {
		log.info("CoreImpl getProjectStatebyId");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		ProjectsStates ps= new ProjectsStates();
		
		try {

			if (conn != null) {
				String sql = "SELECT * FROM decotheco.projects_states where id= "
						+ id_state;
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					ps.setId(id_state);
					ps.setNombre(rs.getString("nombre"));
					ps.setDias(rs.getInt("dias"));
					ps.setTurnoDe(rs.getString("turno_de"));
					ps.setTexto_usuarios(rs.getString("texto_usuarios"));
					ps.setTexto_decoradores(rs.getString("texto_decoradores"));
					ps.setComponente(rs.getInt("componente"));
					ps.setPage(rs.getString("page"));

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
		return ps;

	}
	
	@Override
	public int getIdTypeFromProyectbyId(int id_proyecto) throws Exception {
		log.info("CoreImpl getIdTypeFromProyectbyId");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		ProjectsStates ps= new ProjectsStates();
		int i=-1;
		try {

			if (conn != null) {
				String sql = "SELECT pagado FROM decotheco.projects where id= "
						+ id_proyecto;
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					
					i=rs.getInt("pagado");
					

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
			return i;
		}
		return i;
	}

	
	@Override
	public int getIdStateFromProjectbyIdProject(int id_proyecto) throws Exception {
		log.info("CoreImpl getIdStateFromProjectbyIdProject");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		ProjectsStates ps= new ProjectsStates();
		int i=-1;
		try {

			if (conn != null) {
				String sql = "SELECT estado FROM decotheco.projects where id= "
						+ id_proyecto;
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					
					i=rs.getInt("estado");
					

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
			return i;
		}
		return i;

	}
	
	
	@Override
	public ProjectsTypes getProjectType(int idType)
			throws Exception {
		log.info("CoreImpl getProjectType");
		
		ProjectsTypes projectsTypes = new ProjectsTypes();
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "Select id, nombre_proyecto, precio, fee, base_imponible"
						+ " FROM decotheco.projects_types "
						+ " where (id=" + idType+ ")";

				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					

					projectsTypes.setId(rs.getInt("id"));
					projectsTypes.setNombreProyecto(rs.getString("nombre_proyecto"));
					projectsTypes.setPrecio(rs.getFloat("precio")); 
					projectsTypes.setFee(rs.getInt("fee")); 
					projectsTypes.setBase(rs.getFloat("base_imponible")); 
					
					

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
		return projectsTypes;
	}
	
	
	@Override
	public int setDecoradorToProject(int id_decorador, int project) throws Exception{
		log.info("CoreImpl setDecoradorToProject");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		Statement stmt2 = conn.createStatement();
		
		String query3 ="Select id_piso FROM pisos_projects WHERE id_project="+project; 
		log.info(query3);
		stmt.executeQuery(query3);
		ResultSet rs3 = stmt.getResultSet(); 
		
		int id_piso=0;
		int pasa=0;
		if (rs3.next()){
			pasa=1;
			id_piso=rs3.getInt("id_piso");
		}
		rs3.close();
		if(pasa==1) {

			String query4 ="Select id_project FROM pisos_projects WHERE id_piso="+id_piso; 
			log.info(query4);
			stmt.executeQuery(query4);
			ResultSet rs7 = stmt.getResultSet();
			int id_project=0;
			while (rs7.next()) { 
				id_project=rs7.getInt("id_project");
				try {
					String sql = "UPDATE projects SET id_decorador="
							+ id_decorador
							+ " where id="
							+ id_project;
					stmt2.executeUpdate(sql);
				} catch (Exception e) {
					log.error("ERROR en try catch:" + e.getMessage());
					conn.close();
					stmt.close();
					stmt2.close();
					conn = null;
					stmt2 = null;
					stmt = null;
					return 1;
				}
			}
			return id_piso;  
			
		} else {
			try {
				String sql = "UPDATE projects SET id_decorador="
						+ id_decorador
						+ " where id="
						+ project;
				stmt.executeUpdate(sql);
				log.info("CoreImpl: "+sql);
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				return 0;
			} catch (Exception e) {
				log.error("ERROR en try catch:" + e.getMessage());
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				return 1;
			}
		} 

	}
	
	@Override
	public int setEstadoToProject(int estado, int id_project) throws Exception{
		log.info("CoreImpl setEstadoToProject");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		
		try {
			String sql = "UPDATE projects SET estado="
					+ estado
					+ " where id="
					+ id_project;
			stmt.executeUpdate(sql);
			log.info("CoreImpl: "+sql);
			
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
			return 1;
		}
		return 0;
	}
	
	@Override
	public int getNextStateFromAuxTypesStates(int id_type, int id_state) throws Exception{ 
		log.info("CoreImpl getNextStateFromAuxTypesStates");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		
		int i=-1;
		try {

			if (conn != null) {
				String sql = "SELECT next_state FROM decotheco.aux_types_states where id_type= "
						+ id_type +" and id_state= "+ id_state;
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					
					i=rs.getInt("next_state");
					

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
			return i;
		}
		return i;
		
	}
	
	@Override
	public Proyecto getProyectoBasicById(int id_proyecto) throws Exception{
		log.info("CoreImpl getProyectoBasicById");
		
		Proyecto proyecto=null;
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		boolean haveNullProject=false;
		try {

			if (conn != null) {
				String sql = "SELECT id, id_usuario, nombre_proyecto_decorador, titulo_proyecto, nombre_proyecto, finalizado, pagado, fechafin, id_decorador, estado, fechaestado FROM projects where id="
						+ id_proyecto+" order by id desc";
				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					 proyecto = new Proyecto(rs.getInt("id"),
							rs.getString("nombre_proyecto"),
							rs.getInt("finalizado"), rs.getInt("pagado"),
							rs.getDate("fechafin"));
					int idDecorador_aux=-1;
					idDecorador_aux= rs.getInt("id_decorador");
					int id_usuario= rs.getInt("id_usuario");
					proyecto.id_user = id_usuario;
					proyecto.nombreProyectDecorador = rs.getString("nombre_proyecto_decorador");
					proyecto.tituloProyecto = rs.getString("titulo_proyecto");
					if(rs.wasNull()){
						idDecorador_aux=-1;
					}else{
						proyecto.idDecorador=idDecorador_aux;
						Core th= new CoreImpl();
						if(th.getDecoradorById(idDecorador_aux,-1,-1,"")==null) {
						} else { proyecto.nombreDecorador=th.getDecoradorById(idDecorador_aux,-1,-1,"").getNombre();  }
					}
					proyecto.projectsTypes=new CoreImpl().getProjectType(proyecto.pagado);
					int estado_aux=-1;
					estado_aux=  rs.getInt("estado");
					if(rs.wasNull()){
						estado_aux=-1;
					}else{
						proyecto.estado=estado_aux;
						proyecto.fechaestado=rs.getDate("fechaestado");
						proyecto.projectsStates=getProjectStatebyId(estado_aux);
					}
				}
				rs.close();
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
			}
		} catch (Exception e) {

			System.out.println("ERROR en try catch del getProyectoBasicById:" + e.getMessage()); 
			log.error("ERROR en try catch del getProyectoBasicById:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			
		}
		return proyecto;
	}
	
	@Override
	public int setStateDateToProject(Date dateForInsert, int id_proyecto) throws Exception{
		log.info("CoreImpl setStateDateToProject");
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		try {
			java.sql.Timestamp date = new java.sql.Timestamp(dateForInsert.getTime());
			 String sql = "UPDATE decotheco.projects SET  fechaestado='"+date
					+ "' where id="
					+ id_proyecto;
			stmt.executeUpdate(sql);
			log.info("CoreImpl: "+sql);
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
			return 1;
		}
		return 0;
	}
	
	@Override
	public int setNextEstado(int id_proyecto, int fromEstadoActual) throws Exception{ 
		log.info("CoreImpl setNextEstado");

		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		
		try {
						
			Proyecto proyecto =getProyectoBasicById(id_proyecto);
			
			int estado=proyecto.estado;
			if(estado!=-1){
			
				if(estado>fromEstadoActual){
					 return 2;
				}
				int estadoSiguiente= getNextStateFromAuxTypesStates(proyecto.pagado, estado);
				if(estado==0 && estadoSiguiente==-1){
					if(proyecto.pagado>=1){
						estadoSiguiente=11;
					}else estadoSiguiente=1;
					
				}
				if(estado<estadoSiguiente){
					setEstadoToProject(estadoSiguiente, id_proyecto);
					ProjectsStates pnext= getProjectStatebyId(estadoSiguiente);
					if(estadoSiguiente == 40){ 
						
						Cita cita=getCita(id_proyecto);
						setStateDateToProject(new dataBBDD().getAddDaysDate(new dataBBDD().getFechaFromStrings(cita.fecha, cita.hora),pnext.getDias()), id_proyecto);
						
					}else{
						setStateDateToProject(new dataBBDD().getAddDaysDate(new Date(),pnext.getDias()), id_proyecto);
					}
					
					
					
				}
			}else{
				
				setEstadoToProject(1, id_proyecto);
				
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
			return -1;
		}
		return 0;
	}
	
	
	@Override
	public Cita getCita(int id_proyecto)
			throws Exception {
		log.info("CoreImpl getCita");
		Cita info = null;
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "Select id, id_proyecto, fecha, hora, "
						+ "skype, contenido"
						+ " FROM decotheco.citas "
						+ " where (id_proyecto=" + id_proyecto
						+ " AND valida= 1)";

				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					if (info == null)
						info = new Cita();
					info.id=rs.getInt("id");
					info.id_proyecto = rs.getInt("id_proyecto");
					info.fecha = rs.getString("fecha");
					info.hora = rs.getString("hora");
					info.skype = rs.getInt("skype");
					info.contenido = rs.getString("contenido");

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
	
	//DECORADORES
	
@Override
	
	public int validateDecoradorByMail(String mail, String pass) throws Exception { 
		log.info("CoreImpl validateDecoradorByMail");
		int returnVar = -1;
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "Select id "
						+ " FROM decotheco.decoradores "
						+ " where (mail='" + mail
						+ "' and pass='"+pass  +"')";

				log.info("CoreImpl: "+sql);

				ResultSet rs = stmt.executeQuery(sql);
				
				
				if (rs.next()) {
					returnVar= 1;

				}else returnVar =0;
				rs.close();
			}
			// rs.close();
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

		return returnVar;

	}

@Override

public int validateDecoradorByIdentificadorUnico(String identificadorUnico, String pass) throws Exception { 
	log.info("CoreImpl validateDecoradorByIdentificadorUnico");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.decoradores "
					+ " where (identificador_unico='" + identificadorUnico
					+ "' and pass='"+pass  +"')";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= 1;

			}else returnVar =0;
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}


@Override
public Set<Etiquetas> getEtiquetasByIdTrabajo(int id_trabajo) throws Exception {
	log.info("CoreImpl getEtiquetasByIdTrabajo");
	Set<Etiquetas> returnVar = new HashSet<>();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "SELECT a.id, a.nombre, a.grupo  FROM decotheco.etiquetas as a, aux_trabajos_etiquetas as te where  (te.id_trabajo=" + id_trabajo
					+" and a.id=te.id_etiqueta) order by id desc";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				Etiquetas e= new Etiquetas(rs.getInt("id"), rs.getString("nombre"),rs.getString("grupo"));
				returnVar.add(e);
				//rellenar los proyectos, los trabajos, 
			}
			 rs.close();
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

	return returnVar;

}

@Override
public Set<Etiquetas> getEtiquetasByIdLdlc(int id_ldlc) throws Exception {
	log.info("CoreImpl getEtiquetasByIdLdlc");
	Set<Etiquetas> returnVar = new HashSet<>();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "SELECT id_etiqueta FROM decotheco.aux_ldlc_etiquetas where  id_ldlc=" + id_ldlc;

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				Etiquetas e= new Etiquetas();

				e.id=rs.getInt("id_etiqueta");
				returnVar.add(e);
				//rellenar los proyectos, los trabajos, 
			}
			 rs.close();
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

	return returnVar;

}

@Override
public Set<Etiquetas>  getEtiquetasByIdDecorador(int id_decorador) throws Exception {
	log.info("CoreImpl getEtiquetasByIdDecorador");
	Set<Etiquetas>  returnVar =  new HashSet<Etiquetas>();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "SELECT a.id, a.nombre, a.grupo  FROM decotheco.etiquetas as a, aux_decoradores_etiquetas as te where  (te.id_decoradores=" + id_decorador
					+" and a.id=te.id_etiqueta)";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				Etiquetas e= new Etiquetas();
				e= new Etiquetas(rs.getInt("id"), rs.getString("nombre"),rs.getString("grupo"));
				//rellenar los proyectos, los trabajos, 
				returnVar.add(e);
			}
			 rs.close();
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

	return returnVar;

}

@Override
public Set<Trabajos> getTrabajosByIdDecorador(int id_decorador, String path, String mail_decorador, int detail_level) throws Exception {
	log.info("CoreImpl getTrabajosByIdDecorador");
	 Set<Trabajos> returnVar = new LinkedHashSet<>();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id, id_decorador, img_principal, titulo, texto , activo, fechaingreso "
					+ " FROM decotheco.trabajos "
					+ " where (id_decorador=" + id_decorador
					+") order by id desc";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				Trabajos t= new Trabajos();
				t= new Trabajos(rs.getInt("id"), rs.getString("img_principal"), rs.getString("titulo"),rs.getString("texto"), rs.getInt("activo"),rs.getDate("fechaingreso"));
				//rellenar los proyectos, los trabajos, 
				t.id_decorador=id_decorador;
			    String idProyecto=rs.getString("img_principal");
				t.setEtiquetas(getEtiquetasByIdTrabajo(t.getId()));
				if(detail_level!=8) {
					if(idProyecto==null) {
						if(path!=""){
							t.setFiles(path, mail_decorador);
						} 
					} else {
						Proyecto p  = projectGetInfoWithId(idProyecto,path);
						t.Proyectos=p;
					}
				}
				returnVar.add(t);
			}
			 rs.close();
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

	return returnVar;

}



@Override
public Decoradores getDecoradorByMail(String mail, int detail_level,int detail_level_projects, String path) throws Exception {
	log.info("CoreImpl getDecoradorByMail");
	Decoradores returnVar = null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id, fechaingreso, fechaalta, nombre, mail, pass, url_blog, url_rss, activo, identificador_unico, texto_decorador, disponibilidad "
					+ " FROM decotheco.decoradores "
					+ " where (mail='" + mail
					+"')";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= new Decoradores(rs.getInt("id"),rs.getDate("fechaingreso"), rs.getDate("fechaalta"), rs.getString("nombre"), rs.getString("mail"), rs.getString("pass"), rs.getString("url_blog"), rs.getString("url_rss"), rs.getInt("activo"), rs.getString("identificador_unico"), rs.getString("texto_decorador"), rs.getString("disponibilidad"));
				//rellenar los proyectos, los trabajos, 
				if(detail_level==1||detail_level>=6){
					returnVar.setTrabajoses(getTrabajosByIdDecorador(returnVar.getId(),path, returnVar.getMail(), detail_level));
				}
				if(detail_level==2||detail_level>=7){
					if(path!=""){
						returnVar.setFiles(path);
					}
				}
				if(detail_level==3||detail_level>=8){
					returnVar.setEtiquetas(getEtiquetasByIdDecorador(returnVar.getId()));
				}
				if(detail_level==4||detail_level>=9){
					returnVar.proyectos=new dataBBDD().getPoyectosListByIdDedorador(returnVar, detail_level_projects, path);
				}
				
			}else returnVar = null;
			 rs.close();
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

	return returnVar;

}


@Override
public ArrayList<PortfolioItem> getPortfolioItemsDecoradoresAll ( String path) throws Exception {
	log.info("CoreImpl getPortfolioItemsDecoradores");

	// DEVUELVE UNA LISTA DE DECORADORES
	 
	ArrayList<PortfolioItem> c = new ArrayList<PortfolioItem>(0);
	
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	boolean bandera=true;
	try {

		if (conn != null) {
			String sql = "Select id, nombre, mail,  texto_decorador, url_rss, url_blog, activo, btb"
					+ " FROM decotheco.decoradores "
					+ " where (activo>=1) ORDER BY Rand()";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
					int id=rs.getInt("id");
					PortfolioItem p= new PortfolioItem();
					p.id=id;
					p.tipo=rs.getString("nombre");
					if(p.tipo==null) continue;
					if(p.tipo.length()<=0 ) continue;
					
					p.descripcionCorta=rs.getString("texto_decorador");
					if(p.descripcionCorta==null) continue;
					if(p.descripcionCorta.length()<=0 ) continue;
	
					p.activo=rs.getInt("activo");
					p.rrss=rs.getString("url_rss");
					p.blog=rs.getString("url_blog");
					p.btb=rs.getInt("btb");
					
					List<Etiquetas> etiquetas=new ArrayList<>();
					etiquetas.addAll(getEtiquetasByIdDecorador(p.id));
					p.titulo=null;
					for (int i=0;i<etiquetas.size();i++){
						if(i==0) p.titulo = etiquetas.get(i).getNombre();
						else
						p.titulo = p.titulo + " " + etiquetas.get(i).getNombre();
					}
					String mail=rs.getString("mail");
					/*p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/trabajo/trabajo.jpg";
					p.imagenCara=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/cara/cara.jpg";*/
					
					Decoradores decorador= new Decoradores(mail, path);
					
					if(decorador.filesCara.size()==0 || decorador.filesTrabajo.size()==0 ) continue;
					p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/trabajo/"+decorador.filesTrabajo.get(0);
					p.imagenCara=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/cara/"+decorador.filesCara.get(0);
 
					c.add(p); 
					bandera=false;
				
			} 
			 rs.close();
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
	Collections.shuffle(c);
	return c;

}
@Override
public ArrayList<PortfolioItem> getPortfolioItemsDecoradores ( String path) throws Exception {
	log.info("CoreImpl getPortfolioItemsDecoradores");

	// OBTENEMOS 5 DECORADORES PARA HOME.HTML (1 DE ELLOS DE NUESTRO PLATAFORMA)
	

	ArrayList<PortfolioItem> a = new ArrayList<PortfolioItem>(0);
	ArrayList<PortfolioItem> b = new ArrayList<PortfolioItem>(0);
	ArrayList<PortfolioItem> c = new ArrayList<PortfolioItem>(0);
	
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	boolean bandera=true;
	try {
		// OBTENEMOS DECORADORES ACTIVOS RANDOM
		if (conn != null) {
			String sql = "Select id, nombre, mail,  texto_decorador, url_rss, url_blog, activo, btb"
					+ " FROM decotheco.decoradores "
					+ " where activo=1 ORDER BY Rand()";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				int id=rs.getInt("id");
				// PRIMERO RECOGEMOS UN DECORADOR DE NUESTRA PLATAFORMA
				if(id==87 && bandera || id==89 && bandera) {
					PortfolioItem p= new PortfolioItem();
					p.id=id;
					p.tipo=rs.getString("nombre");
					if(p.tipo==null) continue;
					if(p.tipo.length()<=0 ) continue;
					
					p.descripcionCorta=rs.getString("texto_decorador");
					if(p.descripcionCorta==null) continue;
					if(p.descripcionCorta.length()<=0 ) continue;
	
					p.activo=rs.getInt("activo");
					p.rrss=rs.getString("url_rss");
					p.blog=rs.getString("url_blog");
					p.btb=rs.getInt("btb");
					
					List<Etiquetas> etiquetas=new ArrayList<>();
					etiquetas.addAll(getEtiquetasByIdDecorador(p.id));
					p.titulo=null;
					for (int i=0;i<etiquetas.size();i++){
						if(i==0) p.titulo = etiquetas.get(i).getNombre();
						else
						p.titulo = p.titulo + " " + etiquetas.get(i).getNombre();
					}
					String mail=rs.getString("mail");
					/*p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/trabajo/trabajo.jpg";
					p.imagenCara=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/cara/cara.jpg";*/
					
					Decoradores decorador= new Decoradores(mail, path);
					
					if(decorador.filesCara.size()==0 || decorador.filesTrabajo.size()==0 ) continue;
					p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/trabajo/"+decorador.filesTrabajo.get(0);
					p.imagenCara=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/cara/"+decorador.filesCara.get(0);

					b.add(p);
					bandera=false;
				} else {
					// RECOGEMOS RESTO DE DECORADORES
					PortfolioItem p= new PortfolioItem();
	
					p.id=id;
					p.tipo=rs.getString("nombre");
					if(p.tipo==null) continue;
					if(p.tipo.length()<=0 ) continue;
					
					p.descripcionCorta=rs.getString("texto_decorador");
					if(p.descripcionCorta==null) continue;
					if(p.descripcionCorta.length()<=0 ) continue;
	
					p.activo=rs.getInt("activo");
					p.rrss=rs.getString("url_rss");
					p.blog=rs.getString("url_blog");
					p.btb=rs.getInt("btb");
					
					
					List<Etiquetas> etiquetas=new ArrayList<>();
					etiquetas.addAll(getEtiquetasByIdDecorador(p.id));
					p.titulo=null;
					for (int i=0;i<etiquetas.size();i++){
						if(i==0) p.titulo = etiquetas.get(i).getNombre();
						else
						p.titulo = p.titulo + " " + etiquetas.get(i).getNombre();
					}
					String mail=rs.getString("mail");
					/*p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/trabajo/trabajo.jpg";
					p.imagenCara=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/cara/cara.jpg";*/
					
					Decoradores decorador= new Decoradores(mail, path);
					
					if(decorador.filesCara.size()==0 || decorador.filesTrabajo.size()==0 ) continue;
					p.imagenPrincipal=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/trabajo/"+decorador.filesTrabajo.get(0);
					p.imagenCara=new Config().decoradores_url+"decoradores/"+ mail +"/perfiles/cara/"+decorador.filesCara.get(0);
					
					a.add(p);
				}
			}
			// DEVOLVEMOS MÁXIMO 5 DECORADORES
			int longitud=a.size();
			if(longitud>4) {
				longitud=4;
			}
			// RECOGEMOS 4 NORMALES A DEVOLVER
			for (int x=0;x<longitud;x++) {
				
				PortfolioItem p=a.get(x);
				c.add(p); 
				 
			}
			// RECOGEMOS 1 DECORADOR DE NUESTRA PLATAFORMA A DEVOLVER
			for (int x=0;x<b.size();x++) {
				
				PortfolioItem p=b.get(x);
				c.add(p); 
				 
			}
			// TENEMOS QUE DEVOLVER COMO MÁXIMO 5 PORQUE LOS DEVUELVE DESORDENADOS Y TENDRÍAMOS QUE EN LOCAL EXTRAER DE NUEVO EL DECORADOR DE NUESTRA PLATAFORMA PARA ASEGURARNOS DE QUE SALGA
			 rs.close();
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
	Collections.shuffle(c);
	return c;

}
@Override
public Decoradores getDecoradorById(int id, int detail_level,int detail_level_projects, String path) throws Exception {
	log.info("CoreImpl getDecoradorById");
	Decoradores returnVar = null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null && id!=0) {
			String sql = "Select id, fechaingreso, fechaalta, nombre, mail, pass, url_blog, url_rss, activo, identificador_unico, texto_decorador, disponibilidad "
					+ " FROM decotheco.decoradores "
					+ " where (id=" + id
					+")";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= new Decoradores(rs.getInt("id"),rs.getDate("fechaingreso"), rs.getDate("fechaalta"), rs.getString("nombre"), rs.getString("mail"), rs.getString("pass"), rs.getString("url_blog"), rs.getString("url_rss"), rs.getInt("activo"), rs.getString("identificador_unico"), rs.getString("texto_decorador"), rs.getString("disponibilidad"));
				//rellenar los proyectos, los trabajos, 
				if(detail_level==1||detail_level>=6){
					returnVar.setTrabajoses(getTrabajosByIdDecorador(returnVar.getId(),path, returnVar.getMail(), detail_level));
				}
				if(detail_level==2||detail_level>=7){
					if(path!=""){
						returnVar.setFiles(path);
					}
				}
				if(detail_level==3||detail_level>=8){
					returnVar.setEtiquetas(getEtiquetasByIdDecorador(returnVar.getId()));
				}
				if(detail_level==4||detail_level>=9){
					returnVar.proyectos=new dataBBDD().getPoyectosListByIdDedorador(returnVar, detail_level_projects, path);
				}
				
				
			}else returnVar = null;
			 rs.close();
		} else {
		    returnVar = null;
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

	return returnVar;

}
	
public int xxxx(String identificadorUnico, String pass) throws Exception {
	log.info("CoreImpl xxxx");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {

			
			
			//rs.close();
		}
		// rs.close();
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

	return returnVar;

}
@Override
public int instantComp(int id_decorador, String pass, int id_project) throws Exception{
	log.info("CoreImpl instantComp(int id_decorador, String pass, int id_project)");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.decoradores ";
			
			sql+= " where (id='" + id_decorador;
			sql+= "' and pass='"+pass  +"')";	
					

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				 sql = "Select id "
						+ " FROM decotheco.projects "
						+ " where (id=" + id_project +" and id_decorador= " + id_decorador
						+")";

				log.info("CoreImpl: "+sql);

				rs = stmt.executeQuery(sql);
				
				
				if (rs.next()) {
					returnVar= 1;
				}else returnVar =0;
			}else returnVar =0;
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}

@Override
public int instantComp(int id_decorador, String pass) throws Exception{
	log.info("CoreImpl instantComp(int id_decorador, String pass)");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.decoradores ";
			
			sql+= " where (id='" + id_decorador;
			sql+= "' and pass='"+pass  +"')";	
					

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= 1;
			}else returnVar =0;
			
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}
@Override
public int instantComp(String mail, String pass) throws Exception{
	log.info("CoreImpl instantComp(String mail, String pass)");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.decoradores ";
			
			sql+= " where (mail='" + mail;
			sql+= "' and pass='"+pass  +"')";	
					

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= 1;
			}else returnVar =0;
			
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}
@Override
public int getIdDecoradorByMailPass(String mail, String pass) throws Exception{
	log.info("CoreImpl getIdDecoradorByMailPass");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.decoradores ";
			
			sql+= " where (mail='" + mail;
			sql+= "' and pass='"+pass  +"')";	
					

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= rs.getInt("id");
			}else returnVar =0;
			
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}

@Override
public int instantCompProyectoDecorador(int id_decorador, int id_proyecto) throws Exception{
	log.info("CoreImpl instantCompProyectoDecorador");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.projects ";
			
			sql+= " where (id='" + id_proyecto;
			sql+= "' and id_decorador='"+id_decorador  +"')";	
					

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= 1;
			}else returnVar =0;
			
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}

@Override
public int instantCompLdlcDecorador(int id_decorador, int ldlc) throws Exception{
	log.info("CoreImpl instantCompLdlcDecorador");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.listacompra ";
			
			sql+= " where (id='" + ldlc;
			sql+= "' and id_decorador='"+id_decorador  +"')";	
					

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				returnVar= 1;
			}else returnVar =0;
			
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}
@Override
public int instantCompUser(String mail, String pass, int id_project) throws Exception{
	log.info("CoreImpl instantCompUser");
	int returnVar = -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "Select id "
					+ " FROM decotheco.users ";
			
			sql+= " where (mail='" + mail;
			sql+= "' and pass='"+pass  +"')";	
					

			log.info("CoreImpl: "+sql);

			
			ResultSet rs = stmt.executeQuery(sql);
			
			
			
			if (rs.next()) {
				 sql = "Select id "
						+ " FROM decotheco.projects "
						+ " where (id=" + id_project +" and  id_usuario= " + rs.getInt("id")
						+")";

				log.info("CoreImpl: "+sql);

				rs = stmt.executeQuery(sql);
				
				
				if (rs.next()) {
					returnVar= 1;
				}else returnVar =0;
			}else returnVar =0;
			rs.close();
		}
		// rs.close();
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

	return returnVar;

}
@Override
public User getUserById(int id_user) throws Exception{
	log.info("CoreImpl getUserById");
	User returnVar = new User();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "SELECT id, mail, username, pass FROM users where id="+ id_user;
			log.info("CoreImpl: "+sql);
			ResultSet rs = stmt.executeQuery(sql);
			

			if (rs.next()) {
				returnVar.id = rs.getInt("id");
				returnVar.mail = rs.getString("mail");
				returnVar.userName = rs.getString("username");
			}
		}
		// rs.close();
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

	return returnVar;

}

@Override
public String decoradorLogin(Map<String, String[]> parametros, String path) throws  Exception {
	log.info("CoreImpl decoradorLogin");
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	int detail_level=10;
	if (parametros.get("detail_level") != null){
		detail_level=Integer.parseInt(parametros.get("detail_level")[0]);
	}				
	int project_level=-1;
	if (parametros.get("project_level") != null){
		project_level=Integer.parseInt(parametros.get("project_level")[0]);
	}				
					
					Decoradores decorador = null;

					if (parametros.get("id") != null)
						decorador = getDecoradorById(Integer.parseInt(parametros.get("id")[0]),detail_level,project_level,path);
					else if (parametros.get("user") != null) {
						decorador = getDecoradorByMail(parametros.get("user")[0], detail_level, project_level, path);
					}else  {
						Gson gson = new Gson();
						return gson.toJson("ERROR - MISSING REQUIERED DATA FOR SEARCH - ID,MAIL or UID");
					}

					if (decorador == null) {
						Gson gson = new Gson();
						return gson.toJson("ERROR - NO ANY DECORADOR");

					}else{
						if(decorador.getPass().equals(pass)){
							
						}else{
							Gson gson = new Gson();
							return gson.toJson("ERROR - INCORRECT DATA");
						}
					}

					
					try{
						
						//List<Projects>  p = new ArrayList<Projects>(decorador.getProjectses());
						//decorador.setFiles(path);
						//decorador.setImagesToTrabajos(path);
						ObjectMapper mapper= new ObjectMapper();
						String jsonInString = mapper.writeValueAsString(decorador);
						 //Gson gson = new Gson();
						 //String result= gson.toJson(decorador);
						
					
						
						return jsonInString;
						
					}catch (Exception e) { 
						log.error("ERROR en try catch:" + e.getMessage());
						Gson gson = new Gson();
						return gson.toJson("ERROR - " + e.getMessage());
					}	
}
/*
 * El método recoge las tiendas afiliadas y sus características, y las ADD a un arraylist que recibe por parámetro.
 * @ params clientAffiliates un arraylist para rellenar de tiendas
 * @return el arraylist que recibe relleno con las tiendas
 * 
 */
public  ArrayList<ClientAffiliates> getClientsAffiliates (ArrayList<ClientAffiliates> clientAffiliates) throws Exception {
	
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	String query2 ="Select url_base,url_add,custom_param, tipo_afiliacion FROM client_affiliates where activo = 1"; 
	log.info(query2);
	stmt.executeQuery(query2); 
	ResultSet rs2 = stmt.getResultSet();
	while (rs2.next()){
		ClientAffiliates afiliado = new ClientAffiliates();
		afiliado.url_base = rs2.getString("url_base");
		afiliado.url_add = rs2.getString("url_add");
		afiliado.custom_param = rs2.getString("custom_param"); 
		afiliado.tipo_afiliacion=rs2.getInt("tipo_afiliacion");
		clientAffiliates.add(afiliado);
	}
	rs2.close();
	return clientAffiliates;
}

@Override
public String decoradorGetProject(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl decoradorGetProject");
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	int detail_level=10;
	if (parametros.get("detail_level") != null){
		detail_level=Integer.parseInt(parametros.get("detail_level")[0]);
	}				
			
	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null){
		id_proyecto=Integer.parseInt(parametros.get("id_proyecto")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PROJECT DATA");
	}
					
					Decoradores decorador = null;

					if (parametros.get("id") != null)
						decorador = getDecoradorById(Integer.parseInt(parametros.get("id")[0]),0,0,path);
					
					else if (parametros.get("user") != null) {
						decorador = getDecoradorByMail(parametros.get("user")[0], 0, 0, path);
					}else  {
						Gson gson = new Gson();
						return gson.toJson("ERROR - MISSING REQUIERED DATA FOR SEARCH - ID,MAIL or UID");
					}

					if (decorador == null) {
						Gson gson = new Gson();
						return gson.toJson("ERROR - NO ANY DECORADOR");

					}else if(instantComp(decorador.getId(), pass, id_proyecto)==1){
						
					}else{
							Gson gson = new Gson();
							return gson.toJson("ERROR - INCORRECT DATA");
					}
					
					
					ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0);
					 
						if(detail_level==4){ 
							clientAffiliates=getClientsAffiliates(clientAffiliates);
						}
					
					try{
						Proyecto p= new dataBBDD().getPoyectoById(id_proyecto, detail_level, path);
						p.listAfiliados=clientAffiliates;
						ObjectMapper mapper= new ObjectMapper();
						String jsonInString = mapper.writeValueAsString(p);
						 //Gson gson = new Gson();
						 //String result= gson.toJson(decorador);
						return jsonInString;
						
					}catch (Exception e) {
						log.error("ERROR en try catch:" + e.getMessage());
						Gson gson = new Gson();
						return gson.toJson("ERROR - " + e.getMessage());
					}
					
					

}

@Override
public String decoradorGetDecoradorwithNoCredentials(Map<String, String[]> parametros, String path) throws Exception{
	log.info("CoreImpl decoradorGetDecoradorwithNoCredentials");
	
	int detail_level=10;
	if (parametros.get("detail_level") != null){
		detail_level=Integer.parseInt(parametros.get("detail_level")[0]);
	}
	
	int project_level=0;
	if (parametros.get("project_level") != null){
		project_level=Integer.parseInt(parametros.get("project_level")[0]);
	}		
	
	Decoradores decorador = null;


	if (parametros.get("id") != null){
		decorador = getDecoradorById(Integer.parseInt(parametros.get("id")[0]),detail_level,project_level,path);
		decorador.setPass(null);
	}	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING REQUIERED DATA FOR SEARCH - ID,MAIL or UID");
	}

	if (decorador == null) {
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO ANY DECORADOR");

	}

	
	try{
		

		decorador.setPass(null);
		ObjectMapper mapper= new ObjectMapper();
		String jsonInString = mapper.writeValueAsString(decorador);
		
		return jsonInString;
		
	}catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	
}


@Override
public String ldlcEtiquetas(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl ldlcEtiquetas");
	
	
	int id_ldlc=-1;
	 
	
	int etiquetas[];
	try {
		// recuperamos el decorador por alguno de sus atributos únicos

		if (parametros.get("id") != null){
			id_ldlc=Integer.parseInt(parametros.get("id")[0]); 
		}
		 
		
		if (parametros.get("etiquetasJSON") != null){
			Gson gson= new Gson();
			etiquetas = gson.fromJson(parametros.get("etiquetasJSON")[0], int[].class);
			
			
			ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(get9Etiquetas());
			Set<Etiquetas> etiquetasDecorador = new HashSet<Etiquetas>();
			
			for(int i =0; i<etiquetas.length; i++){
				for(int j =0; j<listaEtiquetas.size(); j++){
					if(etiquetas[i] == listaEtiquetas.get(j).getId()){
						etiquetasDecorador.add(listaEtiquetas.get(j));
						break;
					}
				}
			}
			setEtiquetasCanvas(etiquetasDecorador, 	id_ldlc);
		}
			
		
 

	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close(); 
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
 
	return "1";
	

}
@Override
public String getLdlcEtiquetas(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getLdlcEtiquetas");
	
	
	int id_ldlc=-1;
	if (parametros.get("id") != null){
		id_ldlc=Integer.parseInt(parametros.get("id")[0]); 
	}
	ListaCompra lc= new ListaCompra(); 
	try {


		
		//rellenar los proyectos, los trabajos,
		lc.setEtiquetas(getEtiquetasByIdLdlc(id_ldlc));
		


	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close(); 
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	Gson gson = new Gson();
	return gson.toJson(lc);
	

}
@Override
public String ldlcHabitacion(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl ldlcHabitacion");
	
	
	int id_ldlc=-1;
	String espacio="";
	String nombre="";
	

		if (parametros.get("id") != null){
			id_ldlc=Integer.parseInt(parametros.get("id")[0]); 
		} 
		if (parametros.get("espacio") != null){
			espacio=parametros.get("espacio")[0];
		} 
		if (parametros.get("nombre") != null){
			nombre=parametros.get("nombre")[0];
		} 

		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		
		if(espacio!="") {
			String sql = "UPDATE decotheco.listacompra SET habitacion='" + espacio + "' ";
			sql+= " where id=" + id_ldlc;
			int resultadoquery = stmt.executeUpdate(sql);
			log.info("CoreImpl: "+sql);
			
		}
		if(nombre!="") {
			String sql2 = "UPDATE decotheco.listacompra SET nombre_ldlc='" + nombre.toUpperCase() + "' ";
			sql2+= " where id=" + id_ldlc;
			int resultadoquery2 = stmt.executeUpdate(sql2);
			log.info("CoreImpl: "+sql2);
		}
		

 
	return "1";
	

}
@Override
public String nombreEspacio(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl nombreEspacio");
	
	
	int id_ldlc=-1; 
	String nombre="";
	

		if (parametros.get("id") != null){
			id_ldlc=Integer.parseInt(parametros.get("id")[0]); 
		}  
		if (parametros.get("nombre") != null){
			nombre=parametros.get("nombre")[0];
		} 

		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		 
		if(nombre!="" && id_ldlc>1) {
			String sql2 = "UPDATE decotheco.projects SET titulo_proyecto='" + nombre.toUpperCase() + "' ";
			sql2+= " where id=" + id_ldlc;
			int resultadoquery2 = stmt.executeUpdate(sql2);
			log.info("CoreImpl nombreEspacio: "+sql2);
		}
		

 
	return "1";
	

}

@Override
public String nombreEspacioDecorador(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl nombreEspacioDecorador");
	
	
	int id_ldlc=-1; 
	String nombre="";
	

		if (parametros.get("id") != null){
			id_ldlc=Integer.parseInt(parametros.get("id")[0]); 
		}  
		if (parametros.get("nombre") != null){
			nombre=parametros.get("nombre")[0];
		} 

		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		 
		if(nombre!="" && id_ldlc>1) {
			String sql2 = "UPDATE decotheco.projects SET nombre_proyecto_decorador='" + nombre.toUpperCase() + "' ";
			sql2+= " where id=" + id_ldlc;
			int resultadoquery2 = stmt.executeUpdate(sql2);
			log.info("CoreImpl nombreEspacio: "+sql2);
		}
		

 
	return "1";
	

}
@Override
public String decoradorModificar(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl decoradorModificar");
	
	
	int id_decorador=-1;
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	// create object
	Decoradores decorador = null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement(); 
	Statement stmt2 = conn.createStatement();
	
	int etiquetas[];
	try {
		// recuperamos el decorador por alguno de sus atributos únicos

		if (parametros.get("id") != null){
			id_decorador=Integer.parseInt(parametros.get("id")[0]);
			
			decorador = getDecoradorById(id_decorador, -1, -1, path);
			if (decorador == null) {
				Gson gson = new Gson();
				return gson.toJson("ERROR - NO ANY OBJECT TO UPDATE WITH THIS ID, MAIL or UID");

			}
			if(validateDecoradorByMail(decorador.getMail(), pass)!=1){
				Gson gson = new Gson();
				return gson.toJson("ERROR - CAN NOT MODIFY OTHER DECORATORS");
			}
		}
			
		 else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING REQUIERED DATA FOR SEARCH");
		}
		 String sql = "UPDATE decotheco.decoradores SET  ";


		 if (parametros.get("nombre") != null)		
		 	sql+= "nombre='" + parametros.get("nombre")[0] + "' ";
		if (parametros.get("fechaingreso") != null)
			sql+= ", fechaingreso='"+new Date(parametros.get("fechaingreso")[0])+ "' ";
		if (parametros.get("fechaalta") != null)
			sql+= ", fechaalta='"+new Date(parametros.get("fechaalta")[0])+ "' ";
		if (parametros.get("mail") != null)
			sql+= ", mail='" + parametros.get("mail")[0] + "' ";	
		if (parametros.get("texto_decorador") != null)
			sql+= ", texto_decorador='" + parametros.get("texto_decorador")[0] + "' ";		
		if (parametros.get("pass") != null)
			sql+= ", pass='" + parametros.get("pass")[0] + "' ";	
		if (parametros.get("urlBlog") != null)
			sql+= ", url_blog='" + parametros.get("urlBlog")[0] + "' ";	
		if (parametros.get("urlRss") != null)
			sql+= ", url_rss='" + parametros.get("urlRss")[0] + "' ";
		if (parametros.get("activo") != null)
			sql+= ", activo='" + Integer.parseInt(parametros.get("activo")[0]) + "' ";
		if (parametros.get("identificadorUnico") != null)
			sql+= ", identificador_unico='" + parametros.get("identificadorUnico")[0] + "' ";
		if (parametros.get("disponibilidad") != null)
			sql+= ", disponibilidad='" + parametros.get("disponibilidad")[0] + "' ";
			
		sql+= " where id=" + id_decorador;
		
		int resultadoquery = stmt.executeUpdate(sql);
		log.info("CoreImpl: "+sql);
		
		if (parametros.get("etiquetasJSON") != null){
			Gson gson= new Gson();
			etiquetas = gson.fromJson(parametros.get("etiquetasJSON")[0], int[].class);
			
			
			ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(get9Etiquetas());
			Set<Etiquetas> etiquetasDecorador = new HashSet<Etiquetas>();
			
			for(int i =0; i<etiquetas.length; i++){
				for(int j =0; j<listaEtiquetas.size(); j++){
					if(etiquetas[i] == listaEtiquetas.get(j).getId()){
						etiquetasDecorador.add(listaEtiquetas.get(j));
						break;
					}
				}
			}
			setEtiquetasDecorador(etiquetasDecorador, 	id_decorador);
		}
		
				

		
		
		// comprobar si decorador tiene introducidos todos los datos necesarios para darse de la alta y de ser asi enviar un email informando de ello
		
		
		String sql_select1 = "select * from decotheco.decoradores where id="+id_decorador;
		stmt2.executeQuery(sql_select1);
		ResultSet resultado1 = stmt2.getResultSet();
		
		boolean faltan_datos = false;

		String comp1 = "";
		String comp2 = "";
		int activo = 0;
		String email_deco = ""; 
		if(resultado1.next()) {
			 comp1 = resultado1.getString("nombre");
			 activo = resultado1.getInt("activo");
			 comp2 = resultado1.getString("texto_decorador");
			 email_deco = resultado1.getString("mail"); 		
		}
		resultado1.close();
		if(activo==0) {
			String sql_select2 = "select * from decotheco.aux_decoradores_etiquetas where id_decoradores="+id_decorador;
			stmt2.executeQuery(sql_select2);
			ResultSet resultado2 = stmt2.getResultSet();
			
			if(comp1 == null || comp2 == null || !resultado2.next()) {
				faltan_datos = true;
				resultado2.close();
			}
			else {
				resultado2.close();
				
				String sql_select3 = "select * from decotheco.trabajos where id_decorador="+id_decorador;
				stmt2.executeQuery(sql_select3);
				ResultSet resultado3 = stmt2.getResultSet();
				
				int cont = 0;
				while(resultado3.next()) {
					cont++;
				}		
				if(cont < 3) {
					faltan_datos = true;
					resultado3.close();
				}
				else {
					resultado3.close();
					String sql_select4 = "select route from decotheco.routes";
					stmt2.executeQuery(sql_select4);
					ResultSet resultado4 = stmt2.getResultSet();
					
					boolean tiene_ima_perfil = false;
					boolean tiene_ima_cabecera = false;
					boolean tiene_ima_trabajo = false;
					while(resultado4.next()) {
						String comp_ruta = resultado4.getString("route");
						String [] comp_rauta_array = comp_ruta.split("/");
						if(comp_rauta_array.length > 2 && comp_rauta_array[2].equals(email_deco)) {
							if(comp_rauta_array[4].equals("cara")) {
								tiene_ima_perfil = true;
							}
							else if(comp_rauta_array[4].equals("cabecera")) {
								tiene_ima_cabecera = true;
							}
							else if(comp_rauta_array[4].equals("trabajo")) {
								tiene_ima_trabajo = true;
							}
						}
					}
					
					if(!tiene_ima_perfil || !tiene_ima_cabecera || !tiene_ima_trabajo) {
						faltan_datos = true;
					}
	
					resultado4.close();
				}
				
			}
			
			if(!faltan_datos) {
				Mail a= new Mail();
				String content[]= {"info", "Decorador registrado y con el perfil completo con email: "+email_deco, ""}; 
				a.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Info", content);
				a.sendMail( "info@decotheco.com", "info@decotheco.com", "Info", content);
			}
		}
	
				
		//rs.close();
		conn.close();
		stmt.close();
		 stmt2.close();
		conn = null;
		stmt = null;
		 stmt2 = null;

	} catch (Exception e) {
		//rs.close();
		conn.close();
		stmt.close();
		stmt2.close();
		conn = null;
		stmt = null;
		stmt2 = null;
		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson(decorador.getId());
	

}

@Override
public String setAceptarCita(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setAceptarCita");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	int id_proyecto=-1;
	String idProyecto="";
	if (parametros.get("id_proyecto") != null) {
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	 
	    idProyecto = parametros.get("id_proyecto")[0]; 
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	
	int aceptada=-1;
	if (parametros.get("aceptada") != null)
		aceptada = Integer.parseInt(parametros.get("aceptada")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	
	
	if(instantComp(id_decorador, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object

	
	
	try {
		if(aceptada==1){
			if(setNextEstado(id_proyecto, 30)==0){ 
				Proyecto p = getProyectoBasicById(id_proyecto);
				Cita cita = getCita(id_proyecto);
				String mail = getUserById(p.id_user).mail;
				String content[]= {"usuarioAceptarCita",p.tituloProyecto};
				// MAIL AL USUARIO AVISANDO DE QUE EL DECORADOR ACEPTO LA CITA
				Mail hhtMail = new Mail();
				try{
					hhtMail.sendMail( mail, "info@decotheco.com", "Cita aceptada - DecoTheco", content);
					hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Cita aceptada - DecoTheco", content);
					hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Cita aceptada - DecoTheco", content);
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
				} 
			};
		}else{ 
			Proyecto p = getProyectoBasicById(id_proyecto);
			Cita cita = getCita(id_proyecto);
			String mail = getUserById(p.id_user).mail;
			String content[]= {"usuarioRechazarCita",p.tituloProyecto};
			// MAIL AL USUARIO DE RECHAZO CITA EL DECORADOR
			Mail hhtMail = new Mail();
			try{
				hhtMail.sendMail( mail, "info@decotheco.com", "Cita rechazada - DecoTheco", content);
				hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Cita rechazada - DecoTheco", content);
				hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Cita rechazada - DecoTheco", content);
				 
			}catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage());
			} 
		}
		
		

	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}


@Override
public String setEnviarPaso3_3D(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setEnviarPaso3_3D");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null)
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	
	if(instantComp(id_decorador, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object
	String mailUser = parametros.get("mailUser")[0];
	
	try {
		setNextEstado(id_proyecto, 60);
		String content[]= {"usuarioPropuestas3D"};
		// MAIL AL USUARIO AVISANDO DE QUE EL DECORADOR ENVIO LAS PROPUESTAS 3D
		Mail hhtMail = new Mail();
		try{
			hhtMail.sendMail( mailUser, "info@decotheco.com", "Propuestas 3D listas", content);

			hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Propuestas 3D listas", content);
			hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Propuestas 3D listas", content);
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}

@Override
public String setEnviarPaso4(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setEnviarPaso4");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null)
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	
	if(instantComp(id_decorador, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object

	String mailUser = parametros.get("mailUser")[0];
	
	try {
		setNextEstado(id_proyecto, 80);
		// ENVIAR MAIL A USUARIO DE QUE EL DECORADOR ENVIO PLANO Y  LISTA  DE LA COMPRA
		String content[]= {"usuarioListaCompra"};
		
		Mail hhtMail = new Mail();
		try{
			hhtMail.sendMail( mailUser, "info@decotheco.com", "Planos y lista de la compra listos", content);
			hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Planos y lista de la compra listos", content);
			hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Planos y lista de la compra listos", content);
			 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}

	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}

@Override
public String setEnviarPaso3_2D(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setEnviarPaso3_2D");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	int id_proyecto=-1;
	String idProyecto="";
	if (parametros.get("id_proyecto") != null) {
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
		idProyecto = parametros.get("id_proyecto")[0];	
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	String mailUser = parametros.get("mailUser")[0];
	if(instantComp(id_decorador, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object
	
	
	try {
		setNextEstado(id_proyecto, 40);
		String content[]= {"usuarioPropuestas2D"};
		
		Mail hhtMail = new Mail();
		try{
			hhtMail.sendMail( mailUser, "info@decotheco.com", "Propuestas 2D listas", content);
			hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Propuestas 2D listas", content);
			hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Propuestas 2D listas", content);
			 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}

	} catch (Exception e) {
		//rs.close();
		log.error("ERROR en try catch:" + e.getMessage());
		
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}

@Override
public String setAceptarPaso3_2D(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setAceptarPaso3_2D");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	String mail="";
	if (parametros.get("mail") != null){
		mail=parametros.get("mail")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	int id_proyecto=-1;
	String idProyecto="";
	if (parametros.get("id_proyecto") != null) {
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
		idProyecto=parametros.get("id_proyecto")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	int numero_propuesta=-1;
	if (parametros.get("numero_propuesta") != null)
		numero_propuesta = Integer.parseInt(parametros.get("numero_propuesta")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING numero_propuesta DATA");
	}
	
	if(instantCompUser(mail	, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	String mailDecorador = parametros.get("mailDecorador")[0];
	try {
		
		String sql = "UPDATE projects SET paso3_propuestas="
						+ numero_propuesta
						+ " where id="
						+ id_proyecto; 
 
		
		
				stmt.executeUpdate(sql);log.info("CoreImpl: "+sql);
				ListaCompra lc= new ListaCompra();
				lc.Estado=""+numero_propuesta;
				lc.Proyecto_id=id_proyecto;
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				
				

				Proyecto p = getProyectoBasicById(id_proyecto);
				new ListaCompraController().setStateLdlcByProjectIdAndState(lc,numero_propuesta+2);
			
				
		setNextEstado(id_proyecto, 51);
		String content[]= {"decoradorPropuestas2D",p.nombreProyectDecorador};
		Mail hhtMail = new Mail();
		try{
			 hhtMail.sendMail(mailDecorador, "info@decotheco.com", "Propuesta 2D aceptada - Decotheco", content);
				hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Propuesta 2D aceptada - Decotheco", content);
				hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Propuesta 2D aceptada - Decotheco", content);
			 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}

	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}
@Override
public String setAceptarPaso3_3D(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setAceptarPaso3_3D");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	String mail="";
	if (parametros.get("mail") != null){
		mail=parametros.get("mail")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	int id_proyecto=-1;
	String idProyecto="";
	if (parametros.get("id_proyecto") != null) {
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
		idProyecto = parametros.get("id_proyecto")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	String mailDecorador = parametros.get("mailDecorador")[0];
	Proyecto p = getProyectoBasicById(id_proyecto); 
	if(instantCompUser(mail	, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	
	try {
		
		
		setNextEstado(id_proyecto, 71);
		String content[]= {"decoradorPropuestas3D",p.nombreProyectDecorador};
		Mail hhtMail = new Mail();
		try{
			 hhtMail.sendMail(mailDecorador, "info@decotheco.com", "Propuesta 3D aceptada - Decotheco", content);
			hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Propuesta 3D aceptada - Decotheco", content);
			hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Propuesta 3D aceptada - Decotheco", content);
			 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}

	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}

@Override
public String projectGet360(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl projectGet360");
	int id_proyecto=0;
	if (parametros.get("id_proyecto") != null){
		id_proyecto=Integer.parseInt(parametros.get("id_proyecto")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	
	Proyecto p = getProyecto360(id_proyecto, path);

	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	String userMail="";
	
	try {

		if (conn != null) {
			String sql = "Select mail "
					+ " FROM decotheco.users ";
			
			sql+= " where id='" + p.id_user+"'";	
					 

			
			ResultSet rs = stmt.executeQuery(sql);
			log.info("CoreImpl: "+sql);
			
			
			if (rs.next()) {
				userMail= rs.getString("mail");
			} 
			rs.close();
		}
		// rs.close();
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
	p.userMail=userMail;
	p.propuestas = new dataBBDD().getPropuestas(userMail, p.nombreProyecto, "propuestas", path);
	p.render360 = new dataBBDD().get360(userMail, p.nombreProyecto, "360", path);
	p.planos = new dataBBDD().getPropuestas(userMail,p.nombreProyecto, "planos", path);
	
	Gson gson = new Gson();
	return gson.toJson(p);
}


@Override
public String projectGetInfo(Map<String, String[]> parametros, String path) throws Exception {

	log.info("String projectGetInfo(Map<String, String[]> parametros, String path) || id_proyecto="+parametros.get("id_proyecto")[0]+", tipo="+parametros.get("tipo")[0]);
	int id_proyecto=0;
	if (parametros.get("id_proyecto") != null){
		id_proyecto=Integer.parseInt(parametros.get("id_proyecto")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	int tipo=0;
	if (parametros.get("tipo") != null){
		tipo=Integer.parseInt(parametros.get("tipo")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	
	Proyecto p = getProyectoById(id_proyecto, path);
	
	ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0); 
	PisosProjects piso = new PisosProjects();
	ArrayList<PisosProjects> pisos= new ArrayList<>(0); 

	
	Connection conn = new dataBBDD().conectar();
	Connection conn2 = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	Statement stmt2 = conn2.createStatement();
	String userMail="";
	
	try {
		
		
		
			
		clientAffiliates=getClientsAffiliates(clientAffiliates);
			
			
			String sql = "Select mail "
					+ " FROM decotheco.users ";
			
			sql+= " where id='" + p.id_user+"'";	
					 

			
			ResultSet rs = stmt.executeQuery(sql);
			log.info("CoreImpl: "+sql);
			
			
			if (rs.next()) {
				userMail= rs.getString("mail");
			} 
			rs.close();
		
		// rs.close();
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
	p.userMail=userMail;
	p.propuestas = new dataBBDD().getPropuestas(userMail, p.nombreProyecto, "propuestas", path);
	p.render360 = new dataBBDD().get360(userMail, p.nombreProyecto, "360", path); 
	p.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(id_proyecto, 3);
	p.planos = new dataBBDD().getPropuestas(userMail,p.nombreProyecto, "planos", path);
	if(tipo==4) {
		String query3 ="Select id_piso FROM pisos_projects WHERE id_project="+id_proyecto; 
		log.info(query3);
		stmt2.executeQuery(query3);
		ResultSet rs3 = stmt2.getResultSet();
		

		
		
		if (rs3.next()){ 
			int pisoId = rs3.getInt("id_piso"); 
			
			String query5 ="Select id_pisos_promocion FROM pisos WHERE id="+pisoId; 
			log.info(query5);
			stmt2.executeQuery(query5);
			ResultSet rs5 = stmt2.getResultSet();
			Integer id_pisos_promocion=0;
			String url="";
			String promotora="";
			if(rs5.next()) {
				id_pisos_promocion=rs5.getInt("id_pisos_promocion");
				
				
				String query6 ="Select url, nombre FROM promotora WHERE id="+id_pisos_promocion; 
				log.info(query6);
				stmt2.executeQuery(query6);
				ResultSet rs6 = stmt2.getResultSet();
				if(rs6.next()) {
					promotora=rs6.getString("nombre");
					url=rs6.getString("url");
				}
			}
			
			String query4 ="Select * FROM pisos_projects WHERE id_piso="+pisoId; 
			log.info(query4);
			stmt2.executeQuery(query4);
			ResultSet rs4 = stmt2.getResultSet();
			while (rs4.next()){
				piso = new PisosProjects();
				piso.id = rs4.getInt("id");
				piso.idPiso=pisoId;
				piso.idProject = rs4.getInt("id_project");
				piso.descripcion = rs4.getString("descripcion"); 
				piso.nombre = rs4.getString("nombre"); 
				piso.coordenadas = rs4.getString("coordenadas"); 
				piso.url = url; 
				piso.promotora = promotora; 

				pisos.add(piso);
			}
			p.piso=pisos;
		}

		conn2.close();
		stmt2.close();
		conn2 = null;
		stmt2 = null;
	}
	p.listAfiliados=clientAffiliates;
	
	Gson gson = new Gson();
	return gson.toJson(p);
}

@Override
public String projectGetInfoPisos(Map<String, String[]> parametros, String path) throws Exception {

	log.info("String projectGetInfoPisos(Map<String, String[]> parametros, String path) || id_proyecto="+parametros.get("id_proyecto")[0]+", tipo="+parametros.get("tipo")[0]);
	int id_proyecto=0;
	if (parametros.get("id_proyecto") != null){
		id_proyecto=Integer.parseInt(parametros.get("id_proyecto")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	int tipo=0;
	if (parametros.get("tipo") != null){
		tipo=Integer.parseInt(parametros.get("tipo")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	int idPiso=0;
	if (parametros.get("id_piso") != null){
		idPiso=Integer.parseInt(parametros.get("id_piso")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	

	PisosProjects piso = new PisosProjects();
	ArrayList<PisosProjects> pisos= new ArrayList<>(0);
	Connection conn = new dataBBDD().conectar();
	Connection conn2 = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	Statement stmt2 = conn2.createStatement();
	Integer id_pisos_promocion=0;
	String nombrePiso="";
	
	if(tipo==4) {  
			
			String query5 ="Select id_pisos_promocion,nombre FROM pisos WHERE id="+idPiso; 
			log.info(query5);
			stmt2.executeQuery(query5);
			ResultSet rs5 = stmt2.getResultSet();
			String url="";
			String promotora="";
			if(rs5.next()) {
				nombrePiso=rs5.getString("nombre");
				id_pisos_promocion=rs5.getInt("id_pisos_promocion");
				String query6 ="Select url, nombre FROM promotora WHERE id="+id_pisos_promocion; 
				log.info(query6);
				stmt2.executeQuery(query6);
				ResultSet rs6 = stmt2.getResultSet();
				if(rs6.next()) {
					promotora=rs6.getString("nombre");
					url=rs6.getString("url");
				}
			}
			
			String query4 ="Select * FROM pisos_projects WHERE id_piso="+idPiso; 
			log.info(query4);
			stmt2.executeQuery(query4);
			ResultSet rs4 = stmt2.getResultSet();
			while (rs4.next()){
				piso = new PisosProjects();
				piso.id = rs4.getInt("id");
				piso.idPiso=idPiso;
				piso.idProject = rs4.getInt("id_project");
				if(id_proyecto==0) {
					id_proyecto=rs4.getInt("id_project");
				}
				piso.descripcion = rs4.getString("descripcion"); 
				piso.nombre = rs4.getString("nombre"); 
				piso.coordenadas = rs4.getString("coordenadas"); 
				piso.url = url; 
				piso.promotora = promotora; 

				pisos.add(piso);
			}

		conn2.close();
		stmt2.close();
		conn2 = null;
		stmt2 = null;
	}
	
	Proyecto p = getProyectoById(id_proyecto, path);
	ClientAffiliates afiliado = new ClientAffiliates();
	ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0); 
	PisosPromocion pisos_promocion = new PisosPromocion();
	ArrayList<PisosPromocion> pisosPromocion= new ArrayList<>(0); 
	String userMail="";
	
	try {
		if (conn != null) {
			
		String query3 ="Select id_promotora, data, video, info, logo, nombre FROM pisos_promocion WHERE id="+id_pisos_promocion; 
		log.info(query3);
		stmt.executeQuery(query3); 
		ResultSet rs3 = stmt.getResultSet();
		if (rs3.next()){
			pisos_promocion = new PisosPromocion();
			pisos_promocion.idPromotora = rs3.getInt("id_promotora");
			pisos_promocion.data = rs3.getString("data");
			pisos_promocion.video = rs3.getString("video");
			pisos_promocion.info = rs3.getString("info");
			pisos_promocion.logo = rs3.getString("logo");
			pisos_promocion.nombre = rs3.getString("nombre");
		} 
		
			
		clientAffiliates=getClientsAffiliates(clientAffiliates);
			
			String sql = "Select mail "
					+ " FROM decotheco.users ";
			
			sql+= " where id='" + p.id_user+"'";	
					 

			
			ResultSet rs = stmt.executeQuery(sql);
			log.info("CoreImpl: "+sql);
			
			
			if (rs.next()) {
				userMail= rs.getString("mail");
			} 
			rs.close();
		}
		// rs.close();
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
	p.userMail=userMail;
	p.propuestas = new dataBBDD().getPropuestas(userMail, p.nombreProyecto, "propuestas", path);
	p.render360 = new dataBBDD().get360(userMail, p.nombreProyecto, "360", path); 
	p.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(id_proyecto, 3);
	p.planos = new dataBBDD().getPropuestas(userMail,p.nombreProyecto, "planos", path);
	p.piso=pisos; 
	p.pisosPromocion=pisos_promocion;
	p.listAfiliados=clientAffiliates;
	p.nombrePiso=nombrePiso;
	
	Gson gson = new Gson();
	return gson.toJson(p);
}


@Override
public String projectGetInfoPromocion(Map<String, String[]> parametros, String path) throws Exception {
	log.info("String projectGetInfoPromocion(Map<String, String[]> parametros, String path) || id_proyecto="+parametros.get("id_promocion")[0]);
	int id_promocion=0;
	if (parametros.get("id_promocion") != null){
		id_promocion=Integer.parseInt(parametros.get("id_promocion")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
 
	PisosPromocion pisos_promocion = new PisosPromocion();
	Promotora promotor = new Promotora();
	PisosProjects piso = new PisosProjects();
	ArrayList<PisosProjects> pisos= new ArrayList<>(0);
	ArrayList<String> listaFiles = new ArrayList<>(0);
	

	Connection conn = new dataBBDD().conectar(); 
	Statement stmt = conn.createStatement();
	Statement stmt2 = conn.createStatement(); 
	Statement stmt3 = conn.createStatement(); 
	
	try {
		
		
		if (conn != null) {
			
			String query2 ="Select id_promotora, data, video, info, logo, nombre FROM pisos_promocion WHERE id="+id_promocion; 
			log.info(query2);
			stmt.executeQuery(query2); 
			ResultSet rs2 = stmt.getResultSet();
			while (rs2.next()){
				pisos_promocion = new PisosPromocion();
				pisos_promocion.idPromotora = rs2.getInt("id_promotora");
				pisos_promocion.data = rs2.getString("data");
				pisos_promocion.video = rs2.getString("video");
				pisos_promocion.info = rs2.getString("info");
				pisos_promocion.logo = rs2.getString("logo");
				pisos_promocion.nombre = rs2.getString("nombre");
			}
			rs2.close(); 
			String url=new Config().bucket_name+"."+new Config().bucket_region+"/promocion-pisos/"+pisos_promocion.idPromotora+"/";
			String sql2 = "SELECT filename,extension FROM routes_pisos_promotora where route = "
					+ "'" +url+ "';";
			log.info(sql2);
			
			ResultSet rs5 = stmt.executeQuery(sql2);
			while (rs5.next()) {
				listaFiles.add(rs5.getString("filename")+"."+rs5.getString("extension"));
			}
			rs5.close();
			pisos_promocion.files=listaFiles; 
			
			
			
			String sql ="Select nombre, url, descripcion FROM promotora WHERE id="+pisos_promocion.idPromotora;
			stmt.executeQuery(sql); 
			ResultSet rs = stmt.getResultSet();
			log.info("CoreImpl: "+sql);
			
			if (rs.next()) {
				promotor = new Promotora();
				promotor.nombre = rs.getString("nombre");
				promotor.url = rs.getString("url");
				promotor.descripcion = rs.getString("descripcion");
			} 
			rs.close();
			

			pisos_promocion.promotor=promotor;
		} 
		
	 	String query3 ="Select id, nombre FROM pisos WHERE id_pisos_promocion="+id_promocion; 
		log.info(query3);
		stmt2.executeQuery(query3);
		ResultSet rs3 = stmt2.getResultSet();
		

		
		
		while (rs3.next()){
			int pisoId = rs3.getInt("id");   
			  
			String query4 ="Select * FROM pisos_projects WHERE id_piso="+pisoId+" GROUP BY id_piso"; 
			log.info(query4);
			stmt.executeQuery(query4);
			ResultSet rs4 = stmt.getResultSet();
			while (rs4.next()){
				piso = new PisosProjects();
				piso.id = rs4.getInt("id");
				piso.idPiso=pisoId;
				piso.idProject = rs4.getInt("id_project");
				piso.descripcion = rs4.getString("descripcion"); 
				piso.nombre = rs3.getString("nombre"); 
				piso.coordenadas = rs4.getString("coordenadas"); 
				piso.url = promotor.url; 
				piso.promotora = promotor.descripcion; 
				 
				pisos.add(piso);
			} 
			rs4.close();
		}
		rs3.close();
		pisos_promocion.pisos=pisos;

		
		conn.close();
		stmt2.close();
		stmt.close();
		conn = null;
		stmt2 = null;
		stmt = null; 

		List<Proyecto> p=new ArrayList<Proyecto>();
		p = new ArrayList<Proyecto>(); 
		p = getProyects(4, 1, 200,path); 
		
		pisos_promocion.proyecto=p;
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		throw e;
	}
	
	Gson gson = new Gson();
	return gson.toJson(pisos_promocion);
}


@Override

public Proyecto projectGetInfoWithId(String idProyecto, String path) throws Exception {
	log.info("CoreImpl projectGetInfoWithId");
	int id_proyecto=Integer.parseInt(idProyecto); 
	
	Proyecto p = getProyectoById(id_proyecto, path);

	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	String userMail="";
	
	try {

		if (conn != null) {
			String sql = "Select mail "
					+ " FROM decotheco.users ";
			
			sql+= " where id='" + p.id_user+"'";	
					 

			
			ResultSet rs = stmt.executeQuery(sql);
			log.info("CoreImpl: "+sql);
			
			
			if (rs.next()) {
				userMail= rs.getString("mail");
			} 
			rs.close();
		}
		// rs.close();
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
	p.userMail=userMail;
	p.propuestas = new dataBBDD().getPropuestas(userMail, p.nombreProyecto, "propuestas", path);
	p.render360 = new dataBBDD().get360(userMail, p.nombreProyecto, "360", path);
	p.planos = new dataBBDD().getPropuestas(userMail,p.nombreProyecto, "planos", path);
	 
	
	Gson gson = new Gson();
	return p;
}


@Override
public int getProjectNullByIdUser(int id_user) throws Exception{
	log.info("CoreImpl getProyecto360"); 

	// Método que devuelve proyecto null pasando id usuario
	try {
		int idProject=0;
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		String sql = "SELECT id FROM decotheco.projects where id_usuario= "+id_user+" and nombre_proyecto is null"; 
		log.info("CoreImpl: "+sql);
	
		ResultSet rs = stmt.executeQuery(sql);
		if (rs.next()) {
			idProject= rs.getInt("id");
		}
		return idProject;
	} catch (Exception e) {
		log.error("ERROR en try catch del getProjectNullByIdUser:" + e.getMessage()); 	
		// Si entra en el catch devuelvo 0 para controlarlo donde se llama el método
		return 0; 	
	}
}
@Override
public Boolean isPagado(int id_proyecto) throws Exception{
	log.info("CoreImpl getProyecto360");
	try {
		Proyecto proyecto=null;
		proyecto=getProyectoBasicById(id_proyecto);
		// Vamos a verificar si el idProyecto que trae desde cliente es un proyecto pagado o no
		if(proyecto.pagado>0) {
			return true;
		} else { 
			return false; 
		}
	} catch (Exception e) {
		log.error("ERROR en try catch del isPagado:" + e.getMessage()); 	
		// Si falla devuelvo false para que tome el id null del usuario
		return true; 	
	}
}

@Override
public Proyecto getProyecto360(int id_proyecto, String path) throws Exception{
	log.info("CoreImpl getProyecto360");
	
	Proyecto proyecto=null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	boolean haveNullProject=false;
	try {

		if (conn != null) {
			String sql = "SELECT id_usuario,data360, nombre_proyecto FROM projects where id="
					+ id_proyecto+" limit 1";
			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				proyecto = new Proyecto();
				proyecto.nombreProyecto = rs.getString("nombre_proyecto");
				proyecto.data360 = rs.getString("data360"); 
				int id_usuario= rs.getInt("id_usuario");
				proyecto.id_user = id_usuario;
			}
			rs.close();
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
		}
	} catch (Exception e) {
		log.error("ERROR en try catch del getProyecto360:" + e.getMessage());
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		
	}
	return proyecto;
}

@Override
public Proyecto getProyectoById(int id_proyecto, String path) throws Exception{
	log.info("CoreImpl getProyectoById");
	
	Proyecto proyecto=null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	boolean haveNullProject=false;
	try {

		if (conn != null) {
			String sql = "SELECT * FROM projects where id="
					+ id_proyecto+" limit 1";
			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				 proyecto = new Proyecto(rs.getInt("id"),
				rs.getString("nombre_proyecto"),
				rs.getInt("finalizado"), rs.getInt("pagado"),
				rs.getDate("fechafin")); 
						proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(proyecto.id, 3);
				int idDecorador_aux=-1;
				idDecorador_aux= rs.getInt("id_decorador");
				int id_usuario= rs.getInt("id_usuario");
				proyecto.data360 = rs.getString("data360");
				proyecto.preferencias = new dataBBDD().getPreferencia(id_proyecto);
				proyecto.id_user = id_usuario;
					proyecto.idDecorador=idDecorador_aux; 
					proyecto.nombreDecorador=getDecoradorById(idDecorador_aux,-1,-1,"").getNombre();
					proyecto.decoradorActivo=getDecoradorById(idDecorador_aux,-1,-1,"").getActivo();
					proyecto.decoradorDisponibilidad=getDecoradorById(idDecorador_aux,-1,-1,"").getDisponibilidad();

					Decoradores decorador=getDecoradorById(idDecorador_aux,-1,-1,path);
					proyecto.uniqueDecorador=decorador.getIdentificadorUnico();
					decorador.setCara("");
					if(decorador.filesCara.size()>0)
					proyecto.caraDecorador=decorador.filesCara.get(0);
				
				proyecto.projectsTypes=new CoreImpl().getProjectType(proyecto.pagado);
				int estado_aux=-1;
				estado_aux=  rs.getInt("estado");
				 
					proyecto.estado=estado_aux;
					proyecto.fechaestado=rs.getDate("fechaestado");
					proyecto.projectsStates=getProjectStatebyId(estado_aux); 
			}
			rs.close();
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
		}
	} catch (Exception e) {
		log.error("ERROR en try catch del getProyectoById:" + e.getMessage());
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		
	}
	return proyecto;
}


@Override
public String setAceptarPaso4(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl setAceptarPaso4");
	
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	String mail="";
	if (parametros.get("mail") != null){
		mail=parametros.get("mail")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING mail DATA");
	}
	int id_proyecto=-1;
	String idProyecto="";
	if (parametros.get("id_proyecto") != null) {
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
		idProyecto = parametros.get("id_proyecto")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	String mailDecorador = parametros.get("mailDecorador")[0];
	
	if(instantCompUser(mail	, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	
	try {
		Proyecto p = getProyectoBasicById(id_proyecto);
		
		setNextEstado(id_proyecto, 91);
		String content[]= {"usuarioFinalizar"};
		Mail hhtMail = new Mail();
		try{
			 hhtMail.sendMail(mail, "info@decotheco.com", "Proyecto finalizado - Decotheco", content);
			 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}
		String content2[]= {"decoradorProyectoAceptado",p.nombreProyectDecorador};
		Mail hhtMail2 = new Mail();
		try{
			hhtMail2.sendMail(mailDecorador, "info@decotheco.com", "Proyecto finalizado, subir factura - Decotheco", content2);
			hhtMail2.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Proyecto finalizado, subir factura - Decotheco", content2);
			hhtMail2.sendMail( "info@decotheco.com", "info@decotheco.com", "Proyecto finalizado, subir factura - Decotheco", content2);
			 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson("1");
	

}


@Override
public String getStatebyIdProject(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getStatebyIdProject");
	
	
	String jsonInString="ERROR - getState";
	
	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null)
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	
	
	
	try {
		
		
		ProjectsStates p = getProjectStatebyId(getIdStateFromProjectbyIdProject(id_proyecto));
		ObjectMapper mapper= new ObjectMapper();
		jsonInString = mapper.writeValueAsString(p);
		 //Gson gson = new Gson();
		 //String result= gson.toJson(decorador);
		
	
		
		

	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		//rs.close();
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	
	return jsonInString;
	

}

@Override
public int  setEtiquetasDecorador (Set<Etiquetas> etiquetasDecorador, int id_decorador) throws Exception {
	log.info("CoreImpl setEtiquetasDecorador");
	int resultvar=0;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "delete from aux_decoradores_etiquetas where id_decoradores ="+ id_decorador;
			log.info("CoreImpl: "+sql);
			
			
			int resultadoQuery = stmt.executeUpdate(sql);
			
			
			ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(etiquetasDecorador);
			for(int j =0; j<listaEtiquetas.size(); j++){
				log.info("CoreImpl: "+sql);
				
				sql = "INSERT INTO aux_decoradores_etiquetas (id_decoradores, id_etiqueta) VALUES ("+ id_decorador+"," + listaEtiquetas.get(j).getId()+")";
				int resultado = stmt.executeUpdate(sql);
				
			}

			// rs.close();
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

	return resultvar;

}



@Override
public String decoradorAddTrabajo(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl decoradorAddTrabajo");
	
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	
	
	
	
	
	if(instantComp(id_decorador, pass)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object
	
	
	Trabajos trabajo= new Trabajos();
	try {
		
		if (parametros.get("trabajo") != null){
			
		
			Gson gson = new Gson();
			String tauxstring[]=parametros.get("trabajo");
			String auxstring=tauxstring[0];
			//String myCustom_JSONResponse="{\"master\":"+tauxstring.toString()+"}";
			trabajo= gson.fromJson(auxstring, Trabajos.class);
			
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING REQUIERED DATA  - TRABAJO");
		}
		
		
		

		

		
	} catch (Exception e) {

		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	
	int resultvar=0;
	Connection conn = new dataBBDD().conectar();
	Statement statement = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "INSERT INTO trabajos (id_decorador, titulo, texto ) VALUES ("+ id_decorador+",'"+ trabajo.getTitulo()+"','" + trabajo.getTexto()+"')";
			log.info("CoreImpl: "+sql);

			statement.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
			ResultSet rs2 = statement.getGeneratedKeys();
			
			// DEVOLVEMOS EL ID PARA UTILIZAR EN MODIFICAR PROYECTO
			if (rs2.next()){
				resultvar=rs2.getInt(1);
			}
		}	
		
		} catch (Exception e) {

			log.error("ERROR en try catch:" + e.getMessage());
			Gson gson = new Gson();
			return gson.toJson("ERROR - " + e.getMessage());
		}
		
	Gson gson = new Gson();
	return gson.toJson(resultvar);

}
@Override
public String decoradorTrabajo(Map<String, String[]> parametros, String path) throws Exception {

	log.info("CoreImpl decoradorTrabajo");
	
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	
	
	
	
	
	if(instantComp(id_decorador, pass)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object
	
	
	Trabajos trabajo= new Trabajos();
	try {
		
		if (parametros.get("trabajo") != null){
			
		
			Gson gson = new Gson();
			String tauxstring[]=parametros.get("trabajo");
			String auxstring=tauxstring[0];
			//String myCustom_JSONResponse="{\"master\":"+tauxstring.toString()+"}";
			trabajo= gson.fromJson(auxstring, Trabajos.class);
			
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING REQUIERED DATA  - TRABAJO");
		}
		
		
		

		

		
	} catch (Exception e) {

		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	




int resultvar=0;
Connection conn = new dataBBDD().conectar();
Statement stmt = conn.createStatement();
try {

if (conn != null) {
	String sql = "update trabajos set titulo= '"+ trabajo.getTitulo() + "', texto= '"+trabajo.getTexto()+"', activo = "+ trabajo.getActivo()+" where id= "+trabajo.getId();
	log.info("CoreImpl: "+sql);
	
	stmt.executeUpdate(sql);
	
	setEtiquetasTrabajo(trabajo.getEtiquetas(), trabajo.getId());
}	

} catch (Exception e) {

	log.error("ERROR en try catch:" + e.getMessage());
	Gson gson = new Gson();
	return gson.toJson("ERROR - " + e.getMessage());
}

Gson gson = new Gson();
return gson.toJson(id_decorador);


}


@Override
public String getPagoInfo(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getPagoInfo");
		
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	
	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null)
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	PagoInfo pi= new PagoInfo();
	Promocion p=null; 

	try {
		// obtener ldlc cual es la de estado 4 o 5, necesito idproyecto (tengo), comprobar si existen etiquetas para esa lista ()

		p = getPromocionByIdDecorador(id_decorador);
		Proyecto proyecto= getProyectoBasicById(id_proyecto);
		proyecto.ldlcs=new ListaCompraController().getListaCompraByProyectAndPaso(id_proyecto, 4);
		ListaCompra lc = new ListaCompra(); 
		proyecto.etiquetas=getEtiquetasByIdLdlc(proyecto.ldlcs.get(0).ListaCompra_id);
		float cantidad=0;
		if(p!=null){
			cantidad= proyecto.projectsTypes.getPrecio()-(proyecto.projectsTypes.getPrecio()*(proyecto.projectsTypes.getFee()/100)*(1-(p.tanto_por_ciento_promocionado/100)));
		}else{
			cantidad= proyecto.projectsTypes.getPrecio()-(proyecto.projectsTypes.getPrecio()*(proyecto.projectsTypes.getFee()/100)*(1));	
		}
		pi.precioCalculado=cantidad;
		pi.promocion=p;
		pi.proyecto=proyecto;
	}catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - GET PAGO INFO");
	}
	Gson gson = new Gson();
	return gson.toJson(pi);
	
}
	

@Override
public String decoradorSetFacturacion(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl decoradorSetFacturacion");
	
	
	int ldlcId=0;
	if (parametros.get("ldlcId") != null){
		ldlcId=Integer.parseInt(parametros.get("ldlcId")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	String pass="";
	if (parametros.get("pass") != null){
		pass=parametros.get("pass")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	}
	String habitacion="";
	if (parametros.get("habitacion") != null){
		habitacion=parametros.get("habitacion")[0];
	}else {
		habitacion="questionmark";
	}
	String nombreProyecto="";
	if (parametros.get("nombreLdlc") != null){
		nombreProyecto=parametros.get("nombreLdlc")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING NOMBRELDLC DATA");
	}
	String mail="";
	if (parametros.get("mail") != null){
		mail=parametros.get("mail")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING MAIL DATA");
	}
	
	int id_decorador=-1;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	
	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null)
		id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
	else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING id_proyecto DATA");
	}
	
	
	
	if(instantComp(id_decorador, pass, id_proyecto)!=1){
		Gson gson = new Gson();
		return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
	}
	// create object
	
	Promocion p=null;
	int resultvar=0;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	Statement stmt2 = conn.createStatement();
	try {

		
		p = getPromocionByIdDecorador(id_decorador);
		Proyecto proyecto= getProyectoBasicById(id_proyecto);
		float cantidad=0;
		if(p!=null){
			cantidad= proyecto.projectsTypes.getPrecio()-(proyecto.projectsTypes.getPrecio()*(proyecto.projectsTypes.getFee()/100)*(1-(p.tanto_por_ciento_promocionado/100)));
		}else{
			cantidad= proyecto.projectsTypes.getPrecio()-(proyecto.projectsTypes.getPrecio()*(proyecto.projectsTypes.getFee()/100)*(1));	
		}
		
		if (conn != null) {
			String sql = "insert into pagos_decoradores (cantidad,id_decorador, id_proyecto, concepto) values ("+ cantidad +","+ id_decorador+","+ id_proyecto+",'" + proyecto.projectsTypes.getNombreProyecto()+"')";
			log.info("CoreImpl: "+sql);
			
			stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
			ResultSet rs = stmt.getGeneratedKeys();
	        if (rs.next()){
	        	resultvar=rs.getInt(1);
				String content[]= {"mensajeFacturaPlataforma", mail, String.valueOf(id_proyecto)};
				Mail hht = new Mail(); 
				try{
					hht.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Envío de factura", content);
					hht.sendMail( "info@decotheco.com", "info@decotheco.com", "Envío de factura", content);
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
				}
				String content2[]= {"mensajeDecoradorFactura"}; 
				try{
					hht.sendMail( mail, "info@decotheco.com", "Factura enviada", content2);
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
				}
	        }
	        rs.close();
		}
		
		} catch (Exception e) {

			log.error("ERROR en try catch:" + e.getMessage());
			Gson gson = new Gson();
			return gson.toJson("ERROR - " + e.getMessage());
		}
	
	try {

	if (conn != null) {
		if(p!=null){
			String sql = "update Promocion set numero_proyectos= "+ (p.numero_proyectos-1) +" where id="+ p.id+";";
			log.info("CoreImpl: "+sql);
			
			stmt.executeUpdate(sql);
		}
		

	}	

	} catch (Exception e) {

		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	
	
	
	
	Trabajos trabajo= new Trabajos();
	try {
		
		if (parametros.get("trabajo") != null){
			
		
			Gson gson = new Gson();
			String tauxstring[]=parametros.get("trabajo");
			String auxstring=tauxstring[0];
			//String myCustom_JSONResponse="{\"master\":"+tauxstring.toString()+"}";
			trabajo= gson.fromJson(auxstring, Trabajos.class);
			
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING REQUIERED DATA  - TRABAJO");
		}
		

	} catch (Exception e) {

		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	
	try { 
		if (ldlcId==0) {}
		else {
			// SE AÑADE A LA GALERÍA DE LDLC
			
			if (nombreProyecto.equals("false")) { 
				String sql2 = "UPDATE listacompra set habitacion='"+habitacion+"', galeria_ldlc=3 where id="+ldlcId;
				stmt2.executeUpdate(sql2, Statement.RETURN_GENERATED_KEYS); 
				
				int etiquetas[];

				if (parametros.get("etiquetas") != null){
					Gson gson= new Gson();
					etiquetas = gson.fromJson(parametros.get("etiquetas")[0], int[].class);
					
					if(etiquetas==null) { } else {
					ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(get9Etiquetas());
					Set<Etiquetas> etiquetasDecorador = new HashSet<Etiquetas>();
					
					for(int i =0; i<etiquetas.length; i++){
						for(int j =0; j<listaEtiquetas.size(); j++){
							if(etiquetas[i] == listaEtiquetas.get(j).getId()){
								etiquetasDecorador.add(listaEtiquetas.get(j));
								break;
							}
						}
					}
					setEtiquetasCanvas(etiquetasDecorador, 	ldlcId);
					}
				}
			}
			else {
				String sql2 = "UPDATE listacompra set habitacion='"+habitacion+"', nombre_ldlc='"+nombreProyecto+"', galeria_ldlc=3 where id="+ldlcId;
				stmt2.executeUpdate(sql2, Statement.RETURN_GENERATED_KEYS); 
				
				int etiquetas[];

				if (parametros.get("etiquetas") != null){
					Gson gson= new Gson();
					etiquetas = gson.fromJson(parametros.get("etiquetas")[0], int[].class);
					
					if(etiquetas==null) { } else {
						ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(get9Etiquetas());
						Set<Etiquetas> etiquetasDecorador = new HashSet<Etiquetas>();
						
						for(int i =0; i<etiquetas.length; i++){
							for(int j =0; j<listaEtiquetas.size(); j++){
								if(etiquetas[i] == listaEtiquetas.get(j).getId()){
									etiquetasDecorador.add(listaEtiquetas.get(j));
									break;
								}
							}
						}
						setEtiquetasCanvas(etiquetasDecorador, 	ldlcId);
					}
				}
						
				
			}				
		}
	} catch (Exception e) {

		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}
	
	try {

		if (conn != null) {
			String sql = "INSERT INTO trabajos (id_decorador, titulo, texto, img_principal ) VALUES ("+ id_decorador+",'"+ trabajo.getTitulo()+"','" + trabajo.getTexto()+"', '"+id_proyecto+"')";
			log.info("CoreImpl: "+sql);
			String sql2 = "UPDATE projects set nombre_proyecto_decorador='"+trabajo.getTitulo()+"' where id="+id_proyecto;

			stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
			stmt2.executeUpdate(sql2, Statement.RETURN_GENERATED_KEYS);
			ResultSet rs3 = stmt.getGeneratedKeys(); 
			if (rs3.next()){
	        	resultvar=rs3.getInt(1);
	        	trabajo.setId(resultvar);
	        	setNextEstado(id_proyecto, 100); 
			}
	        rs3.close(); 
		}	
		
		} catch (Exception e) {

			log.error("ERROR en try catch:" + e.getMessage());
			Gson gson = new Gson();
			return gson.toJson("ERROR - " + e.getMessage());
		}
	
	
		
	Gson gson = new Gson();
	return gson.toJson(decoradorTrabajo(trabajo, path));

}


@Override
public String decoradorTrabajo(Trabajos trabajo , String path) throws Exception {
	log.info("CoreImpl decoradorTrabajo");
	// ACTUALIZAMOS LA INFORMACIÓN DEL TRABAJO INTRODUCIDA DESDE MODIFICAR TRABAJO

int resultvar=0;
Connection conn = new dataBBDD().conectar();
Statement stmt = conn.createStatement();
try {

if (conn != null) {
	String sql = "update trabajos set titulo= '"+ trabajo.getTitulo() + "', texto= '"+trabajo.getTexto()+"', activo = "+ trabajo.getActivo()+" where id= "+trabajo.getId();
	log.info("CoreImpl: "+sql);
	
	stmt.executeUpdate(sql);
	
	setEtiquetasTrabajo(trabajo.getEtiquetas(), trabajo.getId());
}	

} catch (Exception e) {

	log.error("ERROR en try catch:" + e.getMessage());
	Gson gson = new Gson();
	return gson.toJson("ERROR - " + e.getMessage());
}

Gson gson = new Gson();
return gson.toJson("OK");


}


@Override
public int  setEtiquetasTrabajo (Set<Etiquetas> etiquetasTrabajos, int id_trabajo) throws Exception {
	log.info("CoreImpl setEtiquetasTrabajo");
	int resultvar=0;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	// CON LAS ETIQUETAS INTRODUCIDAS EN MODIFICAR PROYECTO, AQUÍ ELIMINAMOS LAS ANTIGUAS Y REINTRODUCIMOS TODAS LAS ETIQUETAS (CON LAS NUEVAS SI LAS HAY)
	try {

		if (conn != null) {
			
			
			String sql = "delete from aux_trabajos_etiquetas where id_trabajo ="+ id_trabajo;

			log.info("CoreImpl: "+sql);

			int resultado = stmt.executeUpdate(sql);
			
			
			ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(etiquetasTrabajos);
			for(int j =0; j<listaEtiquetas.size(); j++){
				Etiquetas eti= listaEtiquetas.get(j);
				
				if(eti.getId()==null){
					eti.setId(insertNuevaEtiqueta(eti));
				}
				int idEtiqueta=listaEtiquetas.get(j).getId();
				String sql2 = "SELECT id_trabajo  FROM aux_trabajos_etiquetas where id_trabajo='"+id_trabajo+"' and id_etiqueta='"+idEtiqueta+"';";

				log.info("CoreImpl setEtiquetasCanvas: "+sql2); 
				ResultSet rs = stmt.executeQuery(sql2);

				if (rs.next()) { } else {
					sql = "INSERT INTO aux_trabajos_etiquetas (id_trabajo, id_etiqueta) VALUES ("+ id_trabajo+"," + listaEtiquetas.get(j).getId()+")";
					log.info("CoreImpl: "+sql);
					
					resultado = stmt.executeUpdate(sql);
				}
				
			}

			// rs.close();
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

	return resultvar;

}


@Override
public int  setEtiquetasCanvas (Set<Etiquetas> etiquetas, int id_ldlc) throws Exception {
	log.info("CoreImpl setEtiquetasCanvas");
	int resultvar=0;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "delete from aux_ldlc_etiquetas where id_ldlc ="+ id_ldlc;

			log.info("CoreImpl: "+sql);

			int resultado = stmt.executeUpdate(sql);
			
			
			ArrayList<Etiquetas> listaEtiquetas= new ArrayList<>(etiquetas);
			for(int j =0; j<listaEtiquetas.size(); j++){
				Etiquetas eti= listaEtiquetas.get(j);
				
				if(eti.getId()==null){
					eti.setId(insertNuevaEtiqueta(eti));
				}
				
				sql = "INSERT INTO aux_ldlc_etiquetas (id_ldlc, id_etiqueta) VALUES ("+ id_ldlc+"," + listaEtiquetas.get(j).getId()+")";
				log.info("CoreImpl: "+sql);
				
				resultado = stmt.executeUpdate(sql);
				
			}

			// rs.close();
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

	return resultvar;

}
@Override
public int insertNuevaEtiqueta(Etiquetas et) throws Exception{
	log.info("CoreImpl insertNuevaEtiqueta");
	int resultado= -1;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	String nombreEtiqueta= et.getNombre().toLowerCase();
	try {

		if (conn != null) {
			String sql = "SELECT id  FROM decotheco.etiquetas where nombre like  '"+nombreEtiqueta+"';";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			if (rs.next()) {
				int result=  rs.getInt("id");
				
				  rs.close();
				  return result;
			} else {
			
				 sql = "INSERT INTO etiquetas (nombre ) VALUES ('"+ et.getNombre().toLowerCase() +"')";
				log.info("CoreImpl: "+sql);
				
				stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
				ResultSet rs2 = stmt.getGeneratedKeys();
				if (rs2.next()){
					resultado=rs2.getInt(1);
				}
			
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

	return resultado;
}

@Override
public Set<Etiquetas>  get9Etiquetas() throws Exception {
	log.info("CoreImpl get9Etiquetas");
	Set<Etiquetas>  returnVar =  new HashSet<Etiquetas>();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "SELECT id, nombre, grupo  FROM decotheco.etiquetas where id >= 0 and id < 10 ";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				Etiquetas e= new Etiquetas();
				e= new Etiquetas(rs.getInt("id"), rs.getString("nombre"),rs.getString("grupo"));
				//rellenar los proyectos, los trabajos, 
				returnVar.add(e);
			}
			 rs.close();
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

	return returnVar;

}


@Override
public String getItemsEtiquetas(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getItemsEtiquetas");
	ArrayList<ItemLDLCForParse> lista = new ArrayList<>(0);
	ItemLDLCForParse itemFinal=null;
	MailObject itemsmo= null;
		
	if (parametros.get("etiquetas") != null){ 
		Gson gson = new Gson();
		String tauxstring[]=parametros.get("etiquetas");
		String auxstring=tauxstring[0]; 
		itemsmo= gson.fromJson(auxstring, MailObject.class);
		
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING REQUIERED DATA  - TRABAJO");
	}
	 
	int items=0;
	if (parametros.get("items") != null){
		items=Integer.parseInt(parametros.get("items")[0]);
	}
	int pages=0;
	if (parametros.get("pages") != null){
		pages=Integer.parseInt(parametros.get("pages")[0]);
	}
	int page=-1;
	if (parametros.get("page") != null){
		page=Integer.parseInt(parametros.get("page")[0]);
	}	 
	
	int start=items*page;
	int limit=items*pages; 
	
	String idDecorador="";
	if (parametros.get("id_decorador") != null){
		idDecorador=parametros.get("id_decorador")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	} 
	int decorador_id=Integer.parseInt(idDecorador);
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {
		String sql="";
		String sqlCountRows="";
		int countRows=0;
		if (conn != null) {
			if(decorador_id==0) {
				
				
				
				sql ="SELECT SQL_CALC_FOUND_ROWS id, precio, URLpagina, pathimagen, titulo, tipo ";
				sql+= "  FROM  (SELECT  id, precio, URLpagina, pathimagen, titulo, tipo ";
				sql+= " 	 FROM  ( ( ";
				sql+= " SELECT  i.id, i.precio, i.URLpagina, i.pathimagen, i.titulo, i.tipo FROM  item i INNER JOIN item_etiqueta b ON b.id_itemlistacompra = i.id";
				sql+= " INNER JOIN etiquetas j ON b.id_etiqueta = j.id WHERE i.tipo < 0 AND i.activo = 1 AND j.nombre LIKE ";
				

				for(int i=0; i<itemsmo.tipos.length;i++) { 
					if(itemsmo.tipos[i].equals("")) { continue;}
					countRows++;
					if(i==0) {
						sql+= "'%"+itemsmo.tipos[i]+"%'"; 
					} else {
					
						sql+= " AND i.id in ( ";

						sql+= "        SELECT  ";
						sql+= "            i.id  FROM item i ";
						sql+= "            INNER JOIN item_etiqueta b ON b.id_itemlistacompra = i.id ";
						sql+= "            INNER JOIN etiquetas j ON b.id_etiqueta = j.id ";
						sql+= "            WHERE i.tipo < 0  AND i.activo = 1  AND j.nombre LIKE '%"+itemsmo.tipos[i]+"%' ";
				                    
				          
					}
					
					if(i==itemsmo.tipos.length-1) { 
						for(int j=0; j<countRows-1;j++) { 
							sql+= "   )";
						}
						
					}
				} 

				
				
				
				sql+= "   )";

				sql+= " 		UNION ALL  (SELECT  i.id, i.precio, i.URLpagina, i.pathimagen, i.titulo, i.tipo ";
				sql+= " 			FROM item i INNER JOIN item_lista t ON i.id = t.id_itemlistacompra  ";
				sql+= " 					WHERE i.tipo < 0 AND i.activo = 1  AND (i.titulo LIKE  ";
				for(int i=0; i<itemsmo.tipos.length;i++) {
					if(itemsmo.tipos[i].equals("")) { continue;}
					
					sql+= "'%"+itemsmo.tipos[i]+"%'"; 
					if(i!=itemsmo.tipos.length-1) {
						sql+= " AND i.titulo LIKE ";
					}
				}  
				sql+= "                     )  group by i.id ORDER BY i.id DESC)  )t  GROUP BY id UNION ALL  ";
				sql+= " 		SELECT  id, precio, URLpagina, pathimagen, titulo, tipo ";
					
				sql+= " 	FROM  ( ( ";

				sql+= " SELECT  i.id, i.precio, i.URLpagina, i.pathimagen, i.titulo, i.tipo FROM  item_afiliado i INNER JOIN item_afiliado_etiqueta b ON b.id_itemAfiliado = i.id";
				sql+= " INNER JOIN etiquetas j ON b.id_etiqueta = j.id WHERE i.tipo < 0 AND i.activo = 1 AND j.nombre LIKE ";
				

				for(int i=0; i<itemsmo.tipos.length;i++) { 
					if(itemsmo.tipos[i].equals("")) { continue;} 
					if(i==0) {
						sql+= "'%"+itemsmo.tipos[i]+"%'"; 
					} else {
					
						sql+= " AND i.id in ( ";

						sql+= "        SELECT  ";
						sql+= "            i.id  FROM item_afiliado i ";
						sql+= "            INNER JOIN item_afiliado_etiqueta b ON b.id_itemAfiliado = i.id ";
						sql+= "            INNER JOIN etiquetas j ON b.id_etiqueta = j.id ";
						sql+= "            WHERE i.tipo < 0  AND i.activo = 1  AND j.nombre LIKE '%"+itemsmo.tipos[i]+"%' ";
				                    
				          
					}
					
					if(i==itemsmo.tipos.length-1) { 
						for(int j=0; j<countRows-1;j++) { 
							sql+= "   )";
						}
						
					}
				} 

				
				
				
				sql+= "   )";

				sql+= " 		UNION ALL  (SELECT  i.id, i.precio, i.URLpagina, i.pathimagen, i.titulo, i.tipo FROM item_afiliado i  ";
				sql+= " 					INNER JOIN item_afiliado_etiqueta b ON b.id_itemAfiliado = i.id ";
				sql+= " 					INNER JOIN etiquetas j ON b.id_etiqueta = j.id ";
				sql+= " 					WHERE i.tipo < 0 AND i.activo = 1  AND (i.titulo LIKE  ";
				for(int i=0; i<itemsmo.tipos.length;i++) {
					if(itemsmo.tipos[i].equals("")) { continue;}
					
					sql+= "'%"+itemsmo.tipos[i]+"%'"; 
					if(i!=itemsmo.tipos.length-1) {
						sql+= " AND i.titulo LIKE ";
					}
				}  
				sql+= "                         )  group by i.id ORDER BY i.id DESC)  ";
				sql+= " 	)t  GROUP BY id ";
				sql+= " )t  GROUP BY id order by id desc  limit "+items+" OFFSET "+start;
				
				sqlCountRows = "SELECT FOUND_ROWS() as cantidad";
				 
			} else {
				
				sql = "SELECT   ";
				sql += "	SQL_CALC_FOUND_ROWS id, precio, URLpagina, pathimagen, titulo, tipo ";
				    
				sql += "    FROM  ((SELECT  i.id, i.precio, i.URLpagina, i.pathimagen, i.titulo, i.tipo ";
				sql += "	FROM item i INNER JOIN item_lista t ON i.id = t.id_itemlistacompra ";
				sql += "			INNER JOIN item_etiqueta b ON b.id_itemlistacompra = t.id_itemlistacompra ";
				sql += "			INNER JOIN etiquetas j ON b.id_etiqueta = j.id ";
				sql += "	WHERE i.tipo < 0 AND i.activo = 1 AND t.id_decorador = "+decorador_id+" AND j.nombre LIKE ";
				for(int i=0; i<itemsmo.tipos.length;i++) {
					if(itemsmo.tipos[i].equals("")) { continue;}
					countRows++;
					sql+= "'%"+itemsmo.tipos[i]+"%'"; 
					if(i!=itemsmo.tipos.length-1) {
						sql+= " or j.nombre like ";
					}
				} 
				sql += "            group by i.id ";
				sql += "	HAVING COUNT(DISTINCT b.id_etiqueta) = "+countRows+"  ORDER BY i.id DESC) ";
	
				sql += "UNION ALL  ";
	
				sql += "(SELECT  i.id, i.precio, i.URLpagina, i.pathimagen, i.titulo, i.tipo ";
				sql += "    FROM item i INNER JOIN item_lista t ON i.id = t.id_itemlistacompra  ";
				sql += "            WHERE i.tipo < 0 AND i.activo = 1 AND t.id_decorador = "+decorador_id+" AND ( i.titulo LIKE ";
				for(int i=0; i<itemsmo.tipos.length;i++) {
					if(itemsmo.tipos[i].equals("")) { continue;}
					
					sql+= "'%"+itemsmo.tipos[i]+"%'"; 
					if(i!=itemsmo.tipos.length-1) {
						sql+= " AND i.titulo LIKE ";
					}
				}  
				sql += "             )  group by i.id ";
				sql += " ORDER BY i.id DESC) )t  GROUP BY id order by id desc  limit "+items+" OFFSET "+start;
					 
				sqlCountRows = "SELECT FOUND_ROWS() as cantidad";
				
				
				
				 
			} 

			log.info("CoreImpl: "+sql);
			System.out.println(sql);
			ResultSet rs = stmt.executeQuery(sql);

			int count=0; 
			int anteriorid=0; 
			String etiquetas="";
			int id=0;
			int cantidad=0;
			Float precio=0F;
			String src="";
			String url="";
			String titulo="";
			String tipo="";
			boolean bandera=true;
			while (rs.next()) { 
				if(bandera==false && rs.getInt("id")!=anteriorid) { 
					itemFinal= new ItemLDLCForParse(id, precio, url, src, titulo, etiquetas, tipo, cantidad); 
					lista.add(itemFinal);
					bandera=true; 
				}
				if(rs.getInt("id")==anteriorid) { 
					/* et iquetas+=", "+rs.getString("etiquetas");*/
				} else {
					bandera=false;
					anteriorid=rs.getInt("id");
					id=rs.getInt("id");
					cantidad=0;
					precio=rs.getFloat("precio");
					src=rs.getString("pathimagen");
					url=rs.getString("URLpagina");
					titulo=rs.getString("titulo");
					etiquetas="";
					tipo=rs.getString("tipo");
					count++;

				}
			}
			int cantidadRows=0;
			if(count>0) {
				ResultSet rs2 = stmt.executeQuery(sqlCountRows);
				if (rs2.next()) {
					cantidad=rs2.getInt("cantidad");
					itemFinal= new ItemLDLCForParse(id, precio, url, src, titulo, etiquetas, tipo, cantidad); 
					lista.add(itemFinal);
				}
			} 
			
			
			 rs.close();
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
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson(lista);

}

@Override
public String getItems(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getItems");
	ArrayList<ItemLDLCForParse> lista = new ArrayList<>(0);
	ItemLDLCForParse itemFinal=null;
	String idDecorador="";
	if (parametros.get("idDecorador") != null){
		idDecorador=parametros.get("idDecorador")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	} 
	int decorador_id=Integer.parseInt(idDecorador);
 
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {
		String sql="";
		if (conn != null) { 
			sql ="Select i.id, i.titulo, i.precio, i.URLpagina, i.pathimagen, i.activo, j.nombre as etiquetas, t.id_decorador, i.tipo "
					+ "FROM item i INNER JOIN item_etiqueta k ON i.id = k.id_itemlistacompra INNER JOIN etiquetas j ON k.id_etiqueta = j.id INNER JOIN item_lista t ON i.id = t.id_itemlistacompra WHERE (t.id_decorador="+decorador_id+" and i.id=t.id_itemlistacompra) and (i.activo=1 and i.tipo<0) order by id desc limit 100";
			 

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			int anteriorid=0; 
			String etiquetas="";
			int id=0;
			String tipo="";
			Float precio=0F;
			String src="";
			String titulo="";
			String url="";
			boolean bandera=true;
			int count=0;
			while (rs.next()) { 
				if(bandera==false && rs.getInt("id")!=anteriorid) { 
					itemFinal= new ItemLDLCForParse(id, precio, url, src, titulo, etiquetas, tipo);
					lista.add(itemFinal);
					bandera=true; 
				}
				if(rs.getInt("id")==anteriorid) { 
					etiquetas+=", "+rs.getString("etiquetas");
				} else {
					bandera=false;
					anteriorid=rs.getInt("id");
					id=rs.getInt("id");
					precio=rs.getFloat("precio");
					src=rs.getString("pathimagen");
					url=rs.getString("URLpagina");
					titulo=rs.getString("titulo");
					tipo=rs.getString("tipo");
					etiquetas=rs.getString("etiquetas");
					count++;

				}
			}
			if(count>0) {
				itemFinal= new ItemLDLCForParse(id, precio, url, src, titulo, etiquetas);
				lista.add(itemFinal);
			}
			
			
			 rs.close();
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
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson(lista);

}

@Override
public String getItemsSinFondo(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getItemsSinFondo");
	ArrayList<ItemLDLCForParse> lista = new ArrayList<>(0);
	ItemLDLCForParse itemFinal=null;
	String idDecorador="";
	String idSinFondo="";
	  
	if (parametros.get("id") != null){
		idSinFondo=parametros.get("id")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING PASS DATA");
	} 
	int idSF=Integer.parseInt(idSinFondo);
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {
		String sql="";
		if (conn != null) { 
			sql ="Select i.id, i.titulo, i.precio, i.URLpagina, i.pathimagen, i.activo, j.nombre as etiquetas, t.id_decorador, i.tipo "
					+ "FROM item i INNER JOIN item_etiqueta k ON i.id = k.id_itemlistacompra INNER JOIN etiquetas j ON k.id_etiqueta = j.id INNER JOIN item_lista t ON i.id = t.id_itemlistacompra WHERE i.tipo="+idSF+" group by id order by id desc limit 5";
			 

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			int anteriorid=0; 
			String etiquetas="";
			int id=0;
			Float precio=0F;
			String src="";
			String titulo="";
			String url="";
			boolean bandera=true;
			int count=0;
			while (rs.next()) { 
				if(bandera==false && rs.getInt("id")!=anteriorid) { 
					itemFinal= new ItemLDLCForParse(id, precio, url, src, titulo, etiquetas);
					lista.add(itemFinal);
					bandera=true; 
				}
				if(rs.getInt("id")==anteriorid) { 
					etiquetas+=", "+rs.getString("etiquetas");
				} else {
					bandera=false;
					anteriorid=rs.getInt("id");
					id=rs.getInt("id");
					precio=rs.getFloat("precio");
					src=rs.getString("pathimagen");
					url=rs.getString("URLpagina");
					titulo=rs.getString("titulo");
					etiquetas=rs.getString("etiquetas");
					count++;

				}
			}
			if(count>0) {
				itemFinal= new ItemLDLCForParse(id, precio, url, src, titulo, etiquetas);
				lista.add(itemFinal);
			}
			
			
			 rs.close();
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
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson(lista);

}

@Override
public String getEtiquetas() throws Exception {
	log.info("CoreImpl getEtiquetas");
	Set<Etiquetas>  returnVar =  new HashSet<Etiquetas>();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		if (conn != null) {
			String sql = "SELECT id, nombre, grupo  FROM decotheco.etiquetas ";

			log.info("CoreImpl: "+sql);

			ResultSet rs = stmt.executeQuery(sql);
			
			
			while (rs.next()) {
				Etiquetas e= new Etiquetas();
				e= new Etiquetas(rs.getInt("id"), rs.getString("nombre"),rs.getString("grupo"));
				//rellenar los proyectos, los trabajos, 
				returnVar.add(e);
			}
			
			 rs.close();
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
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson(returnVar);

}

@Override
public String decoradorAsignarProyecto(String id_decorador, String id_proyecto) throws Exception{
	log.info("CoreImpl decoradorAsignarProyecto");
	int id_decoradorint=-1;
	try {
		 id_decoradorint=Integer.parseInt(id_decorador);
		int id_proyectoint=Integer.parseInt(id_proyecto);
		
		setDecoradorToProject( id_decoradorint,id_proyectoint);
		

	} catch (Exception e) {
		//rs.close();
		log.error("ERROR en try catch:" + e.getMessage());
		Gson gson = new Gson();
		return gson.toJson("ERROR - " + e.getMessage());
	}

	Gson gson = new Gson();
	return gson.toJson(getDecoradorById(id_decoradorint, 0, 0, "").getNombre());
	
}



@Override
public String decoradorAsignarProyecto(Map<String, String[]> parametros, String path) throws Exception{
	log.info("CoreImpl decoradorAsignarProyecto");
	
	 
		int piso=0;
		String pass="";
		if (parametros.get("pass") != null){
			pass=parametros.get("pass")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING PASS DATA");
		}
		
		String mail="";
		if (parametros.get("mail") != null){
			mail=parametros.get("mail")[0];
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING mail DATA");
		}
		
		int id_decorador=-1;
		if (parametros.get("id_decorador") != null){
			id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING DECORADOR DATA");
		}
		
		
		
		
		int id_proyecto=-1;
		if (parametros.get("id_proyecto") != null)
			id_proyecto = Integer.parseInt(parametros.get("id_proyecto")[0]);	
		else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING id_proyecto DATA");
		}
		
		
		if(instantCompUser(mail	, pass, id_proyecto)!=1){
			Gson gson = new Gson();
			return gson.toJson("ERROR - NO TIENE PERMISOS PARA EDITAR ESE PROYECTO");
		}
		
		try {
			
			
			piso=setDecoradorToProject( id_decorador,id_proyecto);
			

		} catch (Exception e) {
			//rs.close();
			log.error("ERROR en try catch:" + e.getMessage());
			Gson gson = new Gson();
			return gson.toJson("ERROR - " + e.getMessage());
		}

		Gson gson = new Gson();
		if(piso==0) {
			// SI ES UN PROYECTO NORMAL
			return gson.toJson(getDecoradorById(id_decorador, 0, 0, path).getNombre());
		} else {
			// SI ES PISO DEVUELVE ID DEL PISO Y NOMBRE DEL DECORADOR
			return gson.toJson(piso+"$$"+getDecoradorById(id_decorador, 0, 0, path).getNombre());
		}
		

}


@Override
public String asignarPromocion(int id_decorador, int numero_proyectos, int tanto_por_ciento_promocionado, String descripcion) throws Exception {
	log.info("CoreImpl asignarPromocion"); 
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	try {
		if (conn != null) {
			String sql = "insert into Promocion (id_decorador, numero_proyectos, tanto_por_ciento_promocionado, descripcion, valida) VALUES ("+id_decorador+","+numero_proyectos+","+tanto_por_ciento_promocionado+",'"+descripcion+"',1)";
			log.info("CoreImpl: "+sql); 

			int rs = stmt.executeUpdate(sql); 
			 

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
		return "0";
	}
	
	return "1";
	
}


@Override
public String decoradorCrear(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl decoradorCrear");
	// get session
	
	// create object
	Decoradores decorador = new Decoradores();
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	try {

		String sql="INSERT INTO decoradores (";
		String sqlEnd =") VALUES (";
		if (parametros.get("fechaingreso") != null){
			decorador.setFechaingreso(new Date(parametros.get("fechaingreso")[0]));
			sql+= "fechaingreso";
			sqlEnd+="'" +new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(decorador.getFechaingreso())+"'";
		}
			
		else{
			decorador.setFechaingreso(new Date());
			sql+= "fechaingreso";
			sqlEnd+="'" +new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(decorador.getFechaingreso())+"'";
		}
			

		if (parametros.get("fechaalta") != null){
			decorador.setFechaalta(new Date(parametros.get("fechaalta")[0]));
			sql+=", fechaalta";
			sqlEnd+=",'" +new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(decorador.getFechaalta())+"'";
		}
		else{
			decorador.setFechaalta(new Date());
			sql+=", fechaalta";
			sqlEnd+=",'" +new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(decorador.getFechaalta())+"'";
		}
			
		
		if (parametros.get("nombre") != null){
			decorador.setNombre(parametros.get("nombre")[0]);
			sql+=", nombre";
			sqlEnd+=",'" +decorador.getNombre()+"'";
		}
			
		if (parametros.get("mail") != null){
			decorador.setMail(parametros.get("mail")[0]);
			sql+=", mail";
		sqlEnd+=",'" +decorador.getMail()+"'";
	}
		if (parametros.get("pass") != null){
			decorador.setPass(parametros.get("pass")[0]);
			sql+=", pass";
		sqlEnd+=",'" +decorador.getPass()+"'";
	}
		if (parametros.get("urlBlog") != null){
			decorador.setUrlBlog(parametros.get("urlBlog")[0]);
			sql+=", urlBlog";
		sqlEnd+=",'" +decorador.getUrlBlog()+"'";
	}
		if (parametros.get("urlRss") != null){
			decorador.setUrlRss(parametros.get("urlRss")[0]);
			sql+=", urlRss";
		sqlEnd+=",'" +decorador.getUrlRss()+"'";
	}
		if (parametros.get("activo") != null){
			decorador.setActivo(Integer.parseInt(parametros.get("activo")[0]));
			sql+=", activo";
		sqlEnd+="," +decorador.getActivo()+"";
	}
		
	if (parametros.get("identificadorUnico") != null){
			decorador.setIdentificadorUnico(parametros.get("identificadorUnico")[0]);
			sql+=", identificador_unico";
		sqlEnd+=",'" +decorador.getIdentificadorUnico()+"'";
	}else{
		if(decorador.getMail()!=null){
			sql+=", identificador_unico";
			sqlEnd+=",'" +decorador.getMail()+"'";
		}
	}
		// Instance DAO
		if (decorador.getMail() != null && decorador.getIdentificadorUnico() != null) {
			sql+=sqlEnd+")";
			
			
			log.info("CoreImpl: "+sql);
			stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
			ResultSet rs = stmt.getGeneratedKeys();
	        if (rs.next()){ 
	            int id_decorador=rs.getInt(1);
				String content[]= {"mensajeBienvenidaDecorador"};
				Mail hht = new Mail(); 
				try{
					hht.sendMail( decorador.getMail() , "info@decotheco.com", "Bienvenido Decorador", content);
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
				}
				String content2[]= {"mensajeDecoradorPlataforma", decorador.getMail()}; 
				try{
					hht.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Registro de un decorador", content2);
					hht.sendMail( "info@decotheco.com", "info@decotheco.com", "Registro de un decorador", content2);
					hht.sendMail( "sandra@decotheco.com" , "info@decotheco.com", "Registro de un decorador", content2);
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
				}
				 
			    

				String asignarPromo= asignarPromocion( id_decorador,  3,  100,  "Promoción de bienvenida");
				if(asignarPromo.equals("0")) {
					log.error("ERROR no insertó la promoción");
					Gson gson = new Gson();
					return gson.toJson("ERROR - MISSING REQUIERED DATA");
				} 
			// decoradoresDao.(decorador);

	        }
			conn.close();
			stmt.close();
			conn = null;
			stmt = null; 
		
			
		} else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING REQUIERED DATA");
		}
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close();
		stmt.close();
		conn = null;
		stmt = null;
		throw e;
		
	}

	Gson gson = new Gson();
	return gson.toJson(1);

}

@Override
public String getPisos(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getPisos");
	ClientAffiliates afiliado = new ClientAffiliates();
	ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0);
	Connection conn = new dataBBDD().conectar();
	Statement stmt2 = conn.createStatement();
	

	int id_proyecto=-1;
	if (parametros.get("id_proyecto") != null){
		id_proyecto=Integer.parseInt(parametros.get("id_proyecto")[0]);
	}	
	
	String query3 ="Select id_piso FROM pisos_projects WHERE id_project="+id_proyecto; 
	log.info(query3);
	stmt2.executeQuery(query3);
	ResultSet rs3 = stmt2.getResultSet();
	

	
	
	if (rs3.next()){ 
		 return "1";
	} else {
		 return "0";
	}  

}

@Override
public String getProyectosPisos(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getProyectosPisos");

	Proyecto p = null;
	List<Proyecto> salida= new ArrayList<Proyecto>();
	ClientAffiliates afiliado = new ClientAffiliates();
	ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0);
	Connection conn = new dataBBDD().conectar();
	Statement stmt2 = conn.createStatement();
	

	int id_piso=-1;
	if (parametros.get("id_piso") != null){
		id_piso=Integer.parseInt(parametros.get("id_piso")[0]);
	}	
	
	String query3 ="Select id_project FROM pisos_projects WHERE id_piso="+id_piso; 
	log.info(query3);
	stmt2.executeQuery(query3);
	ResultSet rs3 = stmt2.getResultSet();
	
	while(rs3.next()) {
		p = new Proyecto(); 
		p.id=rs3.getInt("id_project");
		salida.add(p);
	}

	Gson gson = new Gson();
	return gson.toJson(salida);

}


@Override
public String getLdlc(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getLdlc");
	ClientAffiliates afiliado = new ClientAffiliates();
	ArrayList<ClientAffiliates> clientAffiliates= new ArrayList<>(0);
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	
	int id_ldlc=-1;
	if (parametros.get("id_ldlc") != null){
			id_ldlc=Integer.parseInt(parametros.get("id_ldlc")[0]);
		}else {
			Gson gson = new Gson();
			return gson.toJson("ERROR - MISSING id_decorador DATA");
	}
	 	
	clientAffiliates=getClientsAffiliates(clientAffiliates);
	
	 	// TODO Auto-generated method stub
		ListaCompra lc = new ListaCompra();
	
	 	ListaCompraController lcc= new ListaCompraController();
		lc= lcc.getListaCompra(id_ldlc);
		lc.listAfiliados=clientAffiliates;
		lc.setItems();
	 	Gson gson = new Gson();
	 	return gson.toJson(lc);

}

@Override
public String getLdlcInd(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getLdlcInd");
	String tipo="";
	if (parametros.get("tipo") != null){
		tipo=parametros.get("tipo")[0];
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING tipo DATA");
	}
	// TODO Auto-generated method stub
	List<ListaCompra> lc = new ArrayList<ListaCompra>();
	ListaCompraController lcc= new ListaCompraController();
	lc= lcc.getListdlc(tipo); 
	Gson gson = new Gson();
	return gson.toJson(lc);

}

@Override
public String getLdlcInd2d(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getLdlcInd2d");
	int id_ldlc=-1;

	
	// TODO Auto-generated method stub
	List<ListaCompra> lc = new ArrayList<ListaCompra>();
	ListaCompraController lcc= new ListaCompraController();
	lc= lcc.getListdlc2(); 
	Gson gson = new Gson();
	return gson.toJson(lc);


}

@Override
public List<Proyecto> getProyects(int tipo, int orden, int estado, String path) throws Exception {
	String randon="";
	List<Proyecto> salida= new ArrayList<Proyecto>();
	if(orden==1) {
		randon="order by RAND()"; 
	}
    try {
    	Class.forName("com.mysql.jdbc.Driver");
		Connection conn = new dataBBDD().conectar();
		Statement statement = conn.createStatement(); 
		Statement statement2 = conn.createStatement(); 
		ResultSet rs;
		if(tipo==4) {
			String query ="Select d.nombre as nombrePiso,d.id as idPiso, p.id,p.nombre_proyecto_decorador,p.nombre_proyecto,p.id_decorador,p.id_usuario,p.pagado FROM projects p INNER JOIN pisos_projects j ON p.id = j.id_project INNER JOIN pisos d ON d.id=j.id_piso WHERE p.estado>="+estado+" GROUP BY idPiso";
			//System.out.println(query);
			statement.executeQuery(query); 
			rs = statement.getResultSet();
	 
		} else {
			String query ="Select * FROM projects  WHERE galeria_proyects="+tipo+" && estado>="+estado+" "+randon;
			//System.out.println(query);
			statement.executeQuery(query); 
			rs = statement.getResultSet();
		}
			while (rs.next()){
				int idProyecto= rs.getInt("id");
				Proyecto p = new Proyecto();
				p.id=rs.getInt("id");
				if(tipo==4) {
					p.tituloProyecto=rs.getString("nombrePiso");
					p.idPiso=rs.getInt("idPiso");
				} else {
					p.tituloProyecto=rs.getString("titulo_proyecto");
				}
				p.nombreProyectoDecorador=rs.getString("nombre_proyecto_decorador");
				p.nombreProyecto=rs.getString("nombre_proyecto");
				
				
				p.idDecorador=rs.getInt("id_decorador");
				p.id_user=rs.getInt("id_usuario");
				p.pagado=rs.getInt("pagado");
	
				if(p.id_user>0) {
					String query2 ="Select mail FROM users where id="+p.id_user+" limit 1";
					statement2.executeQuery(query2); 
					ResultSet rs2 = statement2.getResultSet();
					if (rs2.next()) {
					p.userMail=rs2.getString("mail"); 
					}
					rs2.close();
				} 
					 
				/*Decoradores decorador=getDecoradorById(p.idDecorador,-1,-1,path); */
				p.ldlcs= new ListaCompraController().getListaCompraByProyectAndPaso(idProyecto, 3);
				/*if(decorador.filesCara.size()>0) {
					p.caraDecorador=decorador.filesCara.get(0);
				}*/
				if(p.tituloProyecto!=null) {
				String query2 ="Select * FROM trabajos  WHERE id_decorador="+rs.getInt("id_decorador")+" && texto='"+p.tituloProyecto+"' limit 1";
				statement2.executeQuery(query2); 
				ResultSet rs2 = statement2.getResultSet();
				if (rs2.next()) {
					p.textoTrabajo=rs2.getString("texto"); 
				}
				rs2.close();
				}
				Proyecto proyect = new dataBBDD().getPoyectoById(idProyecto, 3, path);
	 
				p.propuestas= proyect.propuestas; 
				p.preferencias= proyect.preferencias;
				salida.add(p);
			
		}

		conn.close();		
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return salida;
	
}
 

@Override
public String getLdlcInd3d(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getLdlcInd3d");
	int id_ldlc=-1; 
	int id_proyecto=0;

	
	int tipo=0;
	if (parametros.get("tipo") != null){
		tipo=Integer.parseInt(parametros.get("tipo")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING tipo");
	}
	
	int orden=1;
	if (parametros.get("orden") != null){
		orden=Integer.parseInt(parametros.get("orden")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING ORDEN");
	}
	int estado=100;
	if (parametros.get("estado") != null){
		estado=Integer.parseInt(parametros.get("estado")[0]);
	}else {
		Gson gson = new Gson();
		return gson.toJson("ERROR - MISSING ORDEN");
	}

	Gson gson = new Gson();
	// TODO Auto-generated method stub
	List<Proyecto> p = new ArrayList<Proyecto>();
	p = getProyects(tipo, orden, estado,path); 
	 
	 
	return gson.toJson(p);


}

public void sendNotification(String nombreProyecto, int id_project, String nombreEnvia, int idTo, int fromto, int type, String other) {
	//Si es de tipo de mensaje de chat
	switch (type) {
	case 0: //Tipo de mensaje de chat
		List<Filter> filters = new ArrayList<>(0);
		
		Filter usuarioFilter= new Filter(Field.TAG,"idUser",Relation.EQUALS,idTo+"");
		
		filters.add(usuarioFilter);
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("id_project", id_project+"");
		
		final NotificationRequest notificationRequest = NotificationRequestBuilder
		.aNotificationRequest()
		.withAppId("83fe3df5-92dc-407f-996b-5ca2ccabab8d")
		.withHeading("en", nombreProyecto)
		.withSubtitle("en", nombreEnvia + " dice:")
		.withFilterOperator(Operator.OR) // filters.add(new Filter(operator))
                    .withFilters(filters) // this.filters = filters; and the above is ignored.
		.withData(data)
		.withContent("en", other)
		.build();

		OneSignal.createNotification("MDA2MGViYTEtOTc2NC00OWEwLWJmN2QtOTUxYjcxNDYzYzli", notificationRequest);
		break;
	}
}


@Override
public String urlAffiliates(Map<String, String[]> parametros, String path) throws Exception {
 
	
	String url="";
	if (parametros.get("url") != null){
		url=parametros.get("url")[0];
	}else {
		return "";
	}
	String urlComplete="";
	if (parametros.get("urlComplete") != null){
		urlComplete=parametros.get("urlComplete")[0];
	}else {
		urlComplete="";
	}
	byte ptext[] = urlComplete.getBytes();
	urlComplete = new String(ptext, "UTF-8"); 

	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String urlAffiliates(Map<String, String[]> parametros, String path) : " + "url: " + url);
	
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	ClientAffiliates clientAffiliates = new ClientAffiliates();
	
	try {
		if (conn != null) {
			String sql = "SELECT url_add, custom_param, tipo_afiliacion  FROM client_affiliates  where url_base='"+url+"' OR url_base2= '"+url+"' OR url_base3= '"+url+"' ";
			log.info("CoreImpl: "+sql);
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) { 

				String url_add=(rs.getString("url_add"));
				String custom_param=(rs.getString("custom_param"));
				int tipo_afiliacion=(rs.getInt("tipo_afiliacion"));
				int tipo=rs.getInt("tipo_afiliacion");
				// SI ES DE TIPO 2 (http://pdt.tradedoubler.com/click?...)
				if(tipo==2 && !urlComplete.equals("")) { 
					// COMPROBAMOS SI EXISTE YA UN ITEM CON LA URL QUE LE PASAMOS DESDE CLIENTE
					String sql2 = "SELECT * FROM item_afiliado  where URLpagina like '%"+urlComplete+"%'";
					log.info("CoreImpl: "+sql);
					ResultSet rs2 = stmt.executeQuery(sql2); 
					// EN CASO DE EXISTIR DEVOLVEMOS ESA URL

					if (rs2.next()) {  
						ItemLDLC item = new ItemLDLC();
						item.itemLDC_id =rs2.getInt("id");
						item.URLImage = rs2.getString("URLpagina");
						item.ImageTitle =rs2.getString("titulo");
						item.Price = rs2.getString("precio");
						item.PathImage =rs2.getString("pathimagen");
						clientAffiliates.ItemLDLC=item;
						clientAffiliates.url_add=url_add;
						clientAffiliates.custom_param=custom_param;
						clientAffiliates.tipo_afiliacion=tipo_afiliacion;
					} else {  
						clientAffiliates.ItemLDLC=""; 
						clientAffiliates.url_add=url_add;
						clientAffiliates.custom_param=custom_param;
						clientAffiliates.tipo_afiliacion=tipo_afiliacion;
					}
				} else {
					if(tipo==2) {
						
					} else {
					clientAffiliates.ItemLDLC="";
					clientAffiliates.url_add=url_add;
					clientAffiliates.custom_param=custom_param;
					clientAffiliates.tipo_afiliacion=tipo_afiliacion;
					}
				}
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
	Gson gson = new Gson();
	return gson.toJson(clientAffiliates);
}

@Override
public String getAlerts(Map<String, String[]> parametros, String path) throws Exception {
 
	ArrayList<Alerts> lista = new ArrayList<>(0);
	
	int id_usuario=0;
	if (parametros.get("id_usuario") != null){
		id_usuario=Integer.parseInt(parametros.get("id_usuario")[0]);
	}else {
		return "";
	}
	 
	int fromto=0;
	if (parametros.get("fromto") != null){
		fromto=Integer.parseInt(parametros.get("fromto")[0]);
	}else {
		return "";
	}

	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String getAlerts(Map<String, String[]> parametros, String path) : " + "id_usuario: " + id_usuario+ "fromto" + fromto);
	
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	
	try {
		if (conn != null) {
			String sql = "SELECT COUNT(*) AS contador, id_project  FROM alerts  where "+ id_usuario + " and fromto= "+fromto +" GROUP BY id_project";
			log.info("CoreImpl: "+sql);
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Alerts alerta = new Alerts();
				alerta.numeroDeMensajes=(rs.getInt("contador"));
				alerta.id_proyecto=(rs.getInt("id_project"));  
				lista.add(alerta);
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
	Gson gson = new Gson();
	return gson.toJson(lista);
}

@Override
public String getAfiliados(Map<String, String[]> parametros, String path) throws Exception {
	log.info("CoreImpl getAfiliados");
 
	ArrayList<GetAfiliadoInfo> lista = new ArrayList<>(0);
	
	int idAfiliado=0;
	if (parametros.get("idAfiliado") != null){
		idAfiliado=Integer.parseInt(parametros.get("idAfiliado")[0]);
	} else {
		return "";
	}
	
	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String getAfiliados(Map<String, String[]> parametros, String path) : " + "idAfiliado: " + idAfiliado);
	
	
	OfertasAfiliado ps2= null;
	GetAfiliadoInfo afiliado=null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	Statement stmt2 = conn.createStatement();
	ResultSet rs3=null;
	ResultSet resultSet=null;
	try {
		if (conn != null) {
			String sql = "SELECT *  FROM affiliates_users_veces  where id_affiliate="+ idAfiliado+" order by id";
			log.info("CoreImpl: "+sql);

			resultSet = stmt.executeQuery(sql);
			
			
			while (resultSet.next()) {
				afiliado = new GetAfiliadoInfo();
				int id_user=resultSet.getInt("id_user"); 
				
				
				User usuario = new User();
				usuario=getUserById(id_user);
				afiliado.nombreUsuario=usuario.mail;
				afiliado.id_user=id_user;
				afiliado.veces=(resultSet.getInt("veces")); 
				afiliado.money=(resultSet.getFloat("money"));
				afiliado.registro=(resultSet.getDate("date"));
				
 
				String sql3 = "SELECT * FROM decotheco.affiliates_offer where id= "
						+ resultSet.getInt("id_offer") + ";";
				rs3 = stmt2.executeQuery(sql3);
				if (rs3.next()) {
					float recompensa_porcentual=rs3.getFloat("recompensa_porcentual");
					float recompensa_unitaria=rs3.getFloat("recompensa_unitaria");
					String oferta="";
					if(recompensa_porcentual>0 && recompensa_unitaria>0) {
						oferta=Math.round(recompensa_unitaria)+"€ y un "+Math.round(recompensa_porcentual)+"%";
					} else if(recompensa_unitaria>0) {
						oferta=Math.round(recompensa_unitaria)+"€";
					}else if(recompensa_porcentual>0) {
						oferta=Math.round(recompensa_porcentual)+"%";
					}
					
					afiliado.oferta=oferta;
				} 
				rs3.close(); 
				
				
				lista.add(afiliado);
			}
			resultSet.close(); 
			conn.close(); 
			stmt.close();
			stmt2.close(); 
			conn = null;
			stmt = null;
			stmt2 = null;
		}
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close(); 
		stmt.close();
		stmt2.close(); 
		conn = null;
		stmt = null;
		stmt2 = null;
		
	}
	Gson gson = new Gson();
	return gson.toJson(lista);
}
@Override
public String getProjectsInfo(Map<String, String[]> parametros, String path) throws Exception { 
 
	ArrayList<Proyecto> lista = new ArrayList<>(0);
	
	String tipo="";
	if (parametros.get("tipo") != null){
		tipo=parametros.get("tipo")[0];
	}
	int id=0;
	if (parametros.get("id") != null){
		id=Integer.parseInt(parametros.get("id")[0]);
	}

	
	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String getProjectsInfo(Map<String, String[]> parametros, String path) ");
	
	
	Proyecto ps= null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt2 = conn.createStatement();
	ResultSet rs4=null;
	ResultSet rs3=null;
	try {
		if (conn != null) { 
			
			if(tipo.equals("decoradores")) {
				String sql4 = "SELECT * FROM decotheco.projects WHERE id_decorador="+id+" and nombre_proyecto!='NULL'";
				log.info("CoreImpl: "+sql4);

				rs4 = stmt2.executeQuery(sql4);
				
				while (rs4.next()) {
					 
					ps=new Proyecto();
					ps.id=rs4.getInt("id");
					ps.nombreProyecto=rs4.getString("nombre_proyecto");;
					ps.pagado=rs4.getInt("pagado");
					ps.estado=rs4.getInt("estado");
					ps.idDecorador=rs4.getInt("id_usuario");

					lista.add(ps);
				}

				rs4.close();  
			} else if(tipo.equals("usuarios")) {	
				String sql3 = "SELECT * FROM decotheco.projects WHERE id_usuario="+id+" and nombre_proyecto!='NULL'";
				log.info("CoreImpl: "+sql3);

				rs3 = stmt2.executeQuery(sql3);
				
				while (rs3.next()) {
					 
					ps=new Proyecto();
					ps.id=rs3.getInt("id");
					ps.nombreProyecto=rs3.getString("nombre_proyecto");;
					ps.pagado=rs3.getInt("pagado");
					ps.estado=rs3.getInt("estado");
					ps.idDecorador=rs3.getInt("id_decorador");

					lista.add(ps);
				}
				rs3.close();

			}
			}
			conn.close(); 
			stmt2.close(); 
			conn = null;
			stmt2 = null;
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close(); 
		stmt2.close(); 
		conn = null;
		stmt2 = null;
	}
	
	Gson gson = new Gson();
	return gson.toJson(lista);
}

@Override
public String getUsuariosInfo(Map<String, String[]> parametros, String path) throws Exception { 
 
	ArrayList<User> lista = new ArrayList<>(0);
	
	String tipo="";
	if (parametros.get("tipo") != null){
		tipo=parametros.get("tipo")[0];
	}

	
	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String getUsuariosInfo(Map<String, String[]> parametros, String path) : ");
	
	
	User ps= null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt2 = conn.createStatement();
	ResultSet rs4=null;
	ResultSet rs3=null;
	try {
		if (conn != null) { 
			
			if(tipo.equals("decoradores")) {
				String sql4 = "SELECT * FROM decotheco.decoradores";
				log.info("CoreImpl: "+sql4);

				rs4 = stmt2.executeQuery(sql4);
				
				while (rs4.next()) {
					 
					ps=new User();
					ps.id=rs4.getInt("id");
					ps.mail=rs4.getString("mail");;
					ps.userName=rs4.getString("nombre");
					ps.pass=rs4.getString("pass"); 

					lista.add(ps);
				}

				rs4.close();  
			} else if(tipo.equals("usuarios")) {	
				String sql3 = "SELECT * FROM decotheco.users";
				log.info("CoreImpl: "+sql3);

				rs3 = stmt2.executeQuery(sql3);
				
				while (rs3.next()) {
					 
					ps=new User();
					ps.id=rs3.getInt("id");
					ps.mail=rs3.getString("mail");;
					ps.userName=rs3.getString("username");
					ps.pass=rs3.getString("pass"); 

					lista.add(ps);
				}
				rs3.close();

			}
			}
			conn.close(); 
			stmt2.close(); 
			conn = null;
			stmt2 = null;
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close(); 
		stmt2.close(); 
		conn = null;
		stmt2 = null;
	}
	
	Gson gson = new Gson();
	return gson.toJson(lista);
}

@Override
public String getInfoUserDecorador(Map<String, String[]> parametros, String path) throws Exception { 
  
	
	String textoCodigo="";
	if (parametros.get("textoCodigo") != null){
		textoCodigo=parametros.get("textoCodigo")[0];
	}

	
	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String getInfoUserDecorador(Map<String, String[]> parametros, String path)");
	
	 
	Connection conn = new dataBBDD().conectar();
	Statement stmt2 = conn.createStatement();
	ResultSet rs4=null; 
	String salida="";
	try {
		if (conn != null) { 
			 
				String sql4 = "SELECT codigo FROM decotheco.web WHERE id=1";
				log.info("CoreImpl: "+sql4);

				rs4 = stmt2.executeQuery(sql4);
				
				if (rs4.next()) {
					  
					String codigo=rs4.getString("codigo"); 
					if(codigo.equals(textoCodigo)) {
						salida="1";
					} else {
						salida="0";
					}
				}

				rs4.close();  
			 
			}
			conn.close(); 
			stmt2.close(); 
			conn = null;
			stmt2 = null;
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close(); 
		stmt2.close(); 
		conn = null;
		stmt2 = null;
	}
	 
	return salida;
}

@Override
public String getAfiliadosInfo(Map<String, String[]> parametros, String path) throws Exception { 
 
	ArrayList<PagosAfiliado> lista = new ArrayList<>(0);
	
	int idAfiliado=0;
	if (parametros.get("idAfiliado") != null){
		idAfiliado=Integer.parseInt(parametros.get("idAfiliado")[0]);
	} else {
		return "";
	}
	
	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("String getAfiliadosInfo(Map<String, String[]> parametros, String path) : " + "idAfiliado: " + idAfiliado);
	
	
	Afiliado ps= null;
	PagosAfiliado ps2= null;
	Connection conn = new dataBBDD().conectar();
	Statement stmt2 = conn.createStatement();
	ResultSet rs2=null;
	ResultSet rs4=null;
	try {
		if (conn != null) {

				
				String sql2 = "SELECT * FROM decotheco.affiliates where id= "
						+ idAfiliado + ";";
				log.info("CoreImpl: "+sql2);

				rs2 = stmt2.executeQuery(sql2);
				
				if (rs2.next()) {
					 
					ps=new Afiliado();
					ps.id=rs2.getInt("id");
					ps.name=rs2.getString("name");;
					ps.surname=rs2.getString("surname");
					ps.url=rs2.getString("url");
					ps.img=rs2.getString("img");
					
					String sql4 = "SELECT * FROM decotheco.pagos_afiliados where id= "
							+ idAfiliado + ";";
					log.info("CoreImpl: "+sql4);

					rs4 = stmt2.executeQuery(sql4);
					
					while (rs4.next()) {
						 
						ps2=new PagosAfiliado();
						ps2.cantidad=rs4.getFloat("cantidad");
						ps2.concepto=rs4.getString("concepto");;
						ps2.otros=rs4.getString("otros");
						ps2.token=rs4.getString("token");
						ps2.fecha_pago=rs4.getDate("fecha_pago");

						lista.add(ps2);
					}

					ps.pagos_afiliado=lista;
					rs4.close(); 
				}
				rs2.close(); 
				
			}
			conn.close(); 
			stmt2.close(); 
			conn = null;
			stmt2 = null;
		
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		conn.close(); 
		stmt2.close(); 
		conn = null;
		stmt2 = null;
	}
	
	Gson gson = new Gson();
	return gson.toJson(ps);
}
@Override
public int setAlert(Map<String, String[]> parametros, String path) throws Exception { 
	

	String nombreProyecto=parametros.get("nombreProyecto")[0];
	String nombreEnvia=parametros.get("nombreEnvia")[0];

	String other=parametros.get("other")[0];
	int idTo=0;

	
	int type=0;
	if (parametros.get("type") != null){
		type=Integer.parseInt(parametros.get("type")[0]);
	}else {
		return -1;
	}
	
	int id_project=0;
	if (parametros.get("id_project") != null){
		id_project=Integer.parseInt(parametros.get("id_project")[0]);
	}else {
		return -1;
	}
	
	int id_decorador=0;
	if (parametros.get("id_decorador") != null){
		id_decorador=Integer.parseInt(parametros.get("id_decorador")[0]);
	}else {
		return -1;
	}
	
	int id_user=0;
	if (parametros.get("id_user") != null){
		id_user=Integer.parseInt(parametros.get("id_user")[0]);
	}else {
		return -1;
	}
	
	int fromto=0;
	if (parametros.get("fromto") != null){
		fromto=Integer.parseInt(parametros.get("fromto")[0]);
	}else {
		return -1;
	}
	if(fromto==0) {
		idTo=id_decorador;
	}else{
		idTo=id_user;
	}
	

	log.info("---------------------------                            -------------------------------                     ----------------------------)");
	log.info("int setAlert(Map<String, String[]> parametros, String path) : " + "nombreProyecto: " + nombreProyecto+ "nombreEnvia:" + nombreEnvia+ "other:" + other+ "type:" + type+ "id_project:" + id_project+ "id_decorador:" + id_decorador+ "fromto:" + fromto);
	
	
	sendNotification(nombreProyecto, id_project, nombreEnvia, idTo, fromto, type, other);
	int resultvar=0;
	Connection conn = new dataBBDD().conectar();
	Statement stmt = conn.createStatement();
	int resultado=0;
	try {
		if (conn != null) {
			String sql = "INSERT INTO alerts (type, id_user, id_decorador, id_project, other, fromto) VALUES ("+ type+",'"+ id_user+"','" + id_decorador+"','" + id_project+"','" + other+"','" + fromto+"')";
			log.info("CoreImpl: "+sql);
			resultado = stmt.executeUpdate(sql);
		}
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage()); 
		return 0;
	}

	return resultado;
}

	@Override
	public int deleAlert(Map<String, String[]> parametros, String path) throws Exception {
		int type=0;
		if (parametros.get("type") != null){
			type=Integer.parseInt(parametros.get("type")[0]);
		}else {
			return -1;
		}
		
		int id_project=0;
		if (parametros.get("id_project") != null){
			id_project=Integer.parseInt(parametros.get("id_project")[0]);
		}else {
			return -1;
		}
		
		int fromto=0;
		if (parametros.get("fromto") != null){
			fromto=Integer.parseInt(parametros.get("fromto")[0]);
		}else {
			return -1;
		} 
		
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("int deleAlert(Map<String, String[]> parametros, String path) : " + "type: " + type+ "id_project:" + id_project+ "fromto" + fromto);
		
		
		int resultvar=0;
		Connection conn = new dataBBDD().conectar();
		Statement stmt = conn.createStatement();
		try {

			if (conn != null) {
				String sql = "delete from alerts where id_project ="+ id_project+" AND fromto="+ fromto+" AND type="+ type;

				log.info("CoreImpl: "+sql);

				int resultado = stmt.executeUpdate(sql);
			} else {
				return 0;
			}
			
		} catch (Exception e) {

			log.error("ERROR en try catch:" + e.getMessage()); 
			return 0;
		}
		
		
		return resultvar;
	}

}
