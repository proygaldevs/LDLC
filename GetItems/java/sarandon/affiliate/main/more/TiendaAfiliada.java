package sarandon.affiliate.main.more;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import javax.imageio.ImageIO;
import javax.xml.transform.TransformerException;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.auth.profile.ProfilesConfigFile;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import pswebservice.PSWebServiceClient;
import pswebservice.PrestaShopWebserviceException;
import sarandon.affiliate.vo.Categorie;
import sarandon.affiliate.vo.ItemAfiliado;
import sarandon.assistance.servlet.more.ConfigTiendas;
import sarandon.assistance.vo.portfolio.ImagenVO;

public class TiendaAfiliada {
	public int id; 
	//public String nombre;
	public String logo;
	public int id_affiliado;
	//public String url_base;
	public String url_base2;
	public String url_base3;
	public String url_add;
	public String custom_param;
	//public String image_path;
	//public String products_path;
	//public String categories_path;
	public String dominio_tienda;
	//public String key;
	public String contra;
	public int tipo_afiliacion;
	public String desc_afiliacion;	

	public String key;
	public  String urlBase;
	public String urlBaseAPI;
	public String productPath;
	public String imagesPath;
	public String categoriesPath;
	public String nombre;
	public ArrayList<Categorie> categoriesList = new ArrayList<>(0);
	ArrayList<ItemAfiliado> list = new ArrayList<ItemAfiliado>(0);

	
	int articulosInsertados=0;
	int articulosUpdateados=0;
	int articulosDesactivados=0;
	ArrayList<Long> articulosErroneos= new ArrayList<>(0);
	
	
	public final static Logger log = Logger.getLogger(MainTiendas.class);
	static Connection conn = null;  
	
	
	// Para acceder a los productos
	public PSWebServiceClient wsProducts;

	// Para acceder a las categorías
		public PSWebServiceClient wsCategories;
		
		// Para acceder a las todo si no es prestashop
		public PSWebServiceClient wsProductsNoKey;

	public TiendaAfiliada(String urlBase, String key, String productPath, String imagesPath, String categoriesPath, String nombre, String descAfili, int tipoAfili) {
		this.urlBase = urlBase;
		
		this.urlBaseAPI = urlBase + "/api/";
		this.productPath = productPath;
		this.imagesPath = imagesPath;
		this.nombre = nombre;
		this.categoriesPath = categoriesPath;
		this.desc_afiliacion = descAfili;
		this.tipo_afiliacion = tipoAfili;
		this.wsProducts = new PSWebServiceClient(urlBase+productPath, key, false);
		this.wsCategories = new PSWebServiceClient(urlBase+categoriesPath, key, false);
		this.wsProductsNoKey= new PSWebServiceClient(urlBase+categoriesPath);
	}

	public TiendaAfiliada() {

		
	}

	
	
	
	public ArrayList<ItemAfiliado>  ordenarListPorIdTiendaAfiliada(ArrayList<ItemAfiliado> list){
		 Comparator<ItemAfiliado> byHireDate = new Comparator<ItemAfiliado>() {//Funcion para ordenar la lista de acciones como necesitamos.
	    	  public int compare (ItemAfiliado o1, ItemAfiliado o2) {
	    		  
	    		    Long x1 = o1.id_item_tienda_afiliada;
	    		    Long x2 = o2.id_item_tienda_afiliada;
		            int sComp = x1.compareTo(x2);
		            return sComp;
		            
		    }
	    	};
	    Collections.sort(list, byHireDate);//Las ordenamos
	    
	    return list;
	      
	}
	
	
	
	protected static double round(double value, int places) {
	    if (places < 0) throw new IllegalArgumentException();
	 
	    BigDecimal bd = new BigDecimal(Double.toString(value));
	    bd = bd.setScale(places, RoundingMode.HALF_UP);
	    return bd.doubleValue();
	}
	
	protected  String convertirStringEtiquetas(String etiquetasDefecto, String nombre, String titulo) {
		// TODO Auto-generated method stub
		//Convertimos las etiquetas en un solo string en un arraylist de etiquetas para que se lo trague itemAfiliado. 
		// AÑADIR ETIQUETAS AFF (AFILIADO) Y NOMBRE SIN ESPACIOS
		if (etiquetasDefecto.indexOf("aff") <= -1) {
			etiquetasDefecto = etiquetasDefecto.concat(", aff");
	    }
		nombre=nombre.replace(" ","");
		if (etiquetasDefecto.indexOf(nombre) <= -1) {
			etiquetasDefecto = etiquetasDefecto.concat(", "+nombre);
	    }
		
		/*//quitamos el título del producto de las etiquetas
		  if (etiquetasDefecto.indexOf(titulo) <= -1) {
			etiquetasDefecto = etiquetasDefecto.concat(", "+titulo);
	    }*/
		System.out.println("las etiquetas a añadir son: " + etiquetasDefecto);
		return etiquetasDefecto;
	}

	protected String asignarCategorias(ArrayList<String> listaCategoriasProducto, ArrayList<Categorie> categoriesList) {
		// TODO Auto-generated method stub
		String categoriasString="";
		for(int counter = 0; counter < listaCategoriasProducto.size(); counter++) {  
			String id=listaCategoriasProducto.get(counter);
			int idEtiqueta=Integer.parseInt(id); 

			for(int counter2 = 0; counter2 < categoriesList.size(); counter2++) {  

				Categorie categoria=categoriesList.get(counter2);
				int etiquetaProducto=categoria.id; 
				if(idEtiqueta==etiquetaProducto) {
					String etiqueta=categoria.name;
					
					if(counter2==0)
						categoriasString=etiqueta;
					else if(counter2==listaCategoriasProducto.size()-1)
						categoriasString=categoriasString+", "+etiqueta;
					else
						categoriasString=categoriasString+", "+etiqueta;

					counter2=categoriesList.size()-1;
				}
 			}
			
		}
		//Aqui se cruza el arraylist que llega por parametro, listaCategoriasProducto, lleno de categorías en formato numérico (son strings pero esos strings contienen números)
		//con categoriesList que contiene objetos del dtipo Categorie y que tienen un id y unos tags.
		
		return categoriasString;
	}

	public static String getFinalURL(String url) throws IOException {
	    HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
	    con.setInstanceFollowRedirects(false);
	    con.connect();
	    try {
	    	 con.getInputStream();
	    }catch (Exception e) {
			//Si falla cogemos la útlima url
	    		return url;
		}
	   

	    if (con.getResponseCode() == HttpURLConnection.HTTP_MOVED_PERM || con.getResponseCode() == HttpURLConnection.HTTP_MOVED_TEMP) {
	        String redirectUrl = con.getHeaderField("Location");
	        return getFinalURL(redirectUrl);
	    }
	    return url;
	}
	
	public  String getCharacterDataFromElement(Element e) throws TransformerException {
		//System.out.println(wsCategories.nodeToString(e));
		if(e==null) return "";
		NodeList list = e.getChildNodes();
		String data;

		
			if (list.item(0) instanceof CharacterData) {
				CharacterData child = (CharacterData) list.item(0);
				data = child.getData();

				if (data != null && data.trim().length() > 0)
					return child.getData();
			}else{
				Element listchild = (Element)((Element)e.getChildNodes()).getFirstChild();
				return getCharacterDataFromElement(listchild);
			}
		
		return "";
	}
	

	public void desactivarItem(long idItem) throws SQLException {
		
		//System.out.println("desactivo el item con id= "+idItem);
		Statement statement=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
	        // Setup the connection with the DB
	        conn = DriverManager.getConnection(new ConfigTiendas().bbddconnectionstring); 
			statement = conn.createStatement(); 
		String sql3 = "UPDATE item_afiliado SET activo=0"
				+ " where id_item_tienda_afiliada="
				+ idItem;
		
				conn.close();
				statement.close();
				conn = null;
				statement = null; 
				articulosDesactivados++;
			}catch (Exception e) {
				articulosErroneos.add(idItem);
				// TODO: handle exception
				conn.close();
				statement.close();
				conn = null;
				statement = null; 
			}
	}
	
	
	public void actualizarItem(ItemAfiliado item) throws SQLException {
		//System.out.println("actualizo el item con id= "+item.id_item_tienda_afiliada);
		System.out.println(".update");
		Statement statement=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
	        // Setup the connection with the DB
	        conn = DriverManager.getConnection(new ConfigTiendas().bbddconnectionstring); 
			statement = conn.createStatement(); 
		log.info("Actualizando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
	
		
			String sql4 = "UPDATE item_afiliado SET titulo='"
					+ item.ImageTitle
					+ "', precio='"
					+ item.Price
					+ "', URLpagina='"
					+ item.URLImage
					+ "', activo="
					+ item.Activo
					+ ", tipo="
					+ item.Tipo
					+ ", id_tienda_afiliada="
					+ item.id_tienda_afiliada
					+ ", id_item_tienda_afiliada="
					+ item.id_item_tienda_afiliada
					+ ", updated='"
					+ item.updated 
					+ "' where id_item_tienda_afiliada="
					+ item.id_item_tienda_afiliada 
					+ " and id_tienda_afiliada="
					+ item.id_tienda_afiliada
					+ " AND LAST_INSERT_ID(id)"
					;
			System.out.println(sql4);
			statement.executeUpdate(sql4);
			
			sql4="SELECT LAST_INSERT_ID() as last_id;";
			statement.executeQuery(sql4); 
			int idItem=0;
			ResultSet rsIdItem = statement.getResultSet();
			if (rsIdItem.next()){
				idItem = Integer.parseInt(rsIdItem.getString("last_id"));
			}
			rsIdItem.close();
			insertarEtiquetas(item.ListaEtiquetas, statement, idItem);
			
			
			
			conn.close();
			statement.close();
			conn = null;
			statement = null; 
			articulosUpdateados++;
		}catch (Exception e) {
			// TODO: handle exception
			articulosErroneos.add(item.id_item_tienda_afiliada);
			conn.close();
			statement.close();
			conn = null;
			statement = null; 
		}
		
	}
	public void insertarItem(ItemAfiliado item) throws Exception {
		System.out.println(".insert");
		//System.out.println("inserto el item con id= "+item.id_item_tienda_afiliada);
		log.info("Creando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
		System.out.println("Creando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
		Statement statement=null;
		List<String>lista_etiquetas=item.ListaEtiquetas;
		 try {
			Class.forName("com.mysql.jdbc.Driver");
		
         new ConfigTiendas();
		// Setup the connection with the DB
         conn = DriverManager.getConnection(ConfigTiendas.bbddconnectionstring); 
		 statement = conn.createStatement(); 
		// ALMACENAMOS ARCHIVO EN DISCO 
	    String namefile = "tienda-"+item.NombreFinal+"-"+System.currentTimeMillis()+"."; 
	    String relativeWebPath = "ldlc/items/"; 
	    String absoluteDiskPath = relativeWebPath; 
		InputStream is;
		
		//URLConnection connection=null;
		// INTRODUCIMOS EL USUARIO PARA LA DESCARGA DEL ARCHIVO SI ES NECESARIA
		 
			URL urlFI = new URL(item.PathImage);
			is = urlFI.openStream(); 
		
		BufferedImage img = ImageIO.read(is);
		boolean hasAlpha = false;
	    hasAlpha =  img.getColorModel().hasAlpha();
	    
	    java.io.File file = new java.io.File("");   //Dummy file
	    String  abspath=file.getAbsolutePath();
	    //System.out.println(abspath+"\\credentials");
	    // COMPROBAMOS SI TIENE TRANSPARENCIA
	    if(hasAlpha) {
	    	namefile=namefile+"png";
	    	String PathImage=insertarFicheroExternoPng(img, abspath+"/credentials",absoluteDiskPath+namefile);
	    }
	    else {
	    	namefile=namefile+"jpg";
			BufferedImage convertedImg = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_INT_RGB);
		    convertedImg.getGraphics().drawImage(img, 0, 0, null);
		    String PathImage=insertarFicheroExterno(convertedImg, abspath+"/credentials",absoluteDiskPath+namefile);
	    }  
	              

		
		
		
		// SI ENTRAMOS AQUÃ� ES PORQUE NO EXISTE EL ITEM EN LA BD (item_afiliado), HACEMOS LA INSERCIÃ“N
		String query2 ="INSERT INTO item_afiliado (titulo,precio,URLpagina,pathimagen, activo, tipo, id_tienda_afiliada, id_item_tienda_afiliada, updated) "
					+ "VALUES ('"+item.ImageTitle+"','"+item.Price+"','"+item.URLImage+"','"+namefile+"','"+item.Activo+"'," + item.Tipo +",'"+item.id_tienda_afiliada+"','"+item.id_item_tienda_afiliada+"','"+item.updated+"')";
		statement.executeUpdate(query2, Statement.RETURN_GENERATED_KEYS);
		ResultSet rs2 = statement.getGeneratedKeys();
		int lastid=-1;
		if (rs2.next()){
			lastid=rs2.getInt(1);
		} 
		rs2.close();
		
		

		// INSERTAMOS LAS ETIQUETAS 
		insertarEtiquetas(lista_etiquetas, statement, lastid);
		/*for (String etiqueta: lista_etiquetas) {
			String query3 ="INSERT INTO etiquetas (nombre) SELECT '"+etiqueta.trim().toLowerCase()+"' FROM dual WHERE NOT EXISTS (SELECT * FROM etiquetas WHERE nombre = '"+etiqueta.trim().toLowerCase()+"')";
			//System.out.println("Ejecutando: "+query3);
			statement.executeUpdate(query3); 
			log.info(query3); 
			
			
			// RECUPERAMOS EL ID DE LA ETIQUETA INSERTADA
			int id_nueva_etiqueta=1;
			String query6 ="SELECT id FROM etiquetas WHERE nombre = '"+etiqueta.trim()+"'";
			//System.out.println(query5);
			statement.executeQuery(query6); 
			log.info(query6);
			ResultSet rs6 = statement.getResultSet();
			if (rs6.next()){
				id_nueva_etiqueta = rs6.getInt("id");
			}
			rs6.close();
			

			// INSERTAMOS EN LA TABLA QUE RELACIONA LOS ITEMS-AFILIADO DE LAS ETIQUETAS LAS RELACIONES DE ETIQUETAS QUE HAY
			String query4 ="INSERT INTO item_afiliado_etiqueta (id_ItemAfiliado,id_etiqueta) VALUES ('"+lastid+"',"+id_nueva_etiqueta+")"; 
			statement.executeUpdate(query4); 
			
		}*/
		statement.close();
		statement=null;
		conn.close();
		conn=null;
		articulosInsertados++;
		 } catch (Exception e) {
				// TODO Auto-generated catch block
			 	articulosErroneos.add(item.id_item_tienda_afiliada);
				System.out.println("ERROR insertarItem: " + e.getMessage() ) ;
				 statement.close();
					statement=null;
					conn.close();
					conn=null;
			}
	}

	public void insertarEtiquetas(List<String>lista_etiquetas, Statement statement, int lastid) throws SQLException {
		
				// INSERTAMOS EN LA TABLA QUE RELACIONA LOS ITEMS-AFILIADO DE LAS ETIQUETAS LAS RELACIONES DE ETIQUETAS QUE HAY
				String queryDelete ="DELETE FROM  item_afiliado_etiqueta WHERE id_ItemAfiliado="+lastid+";"; 
				statement.execute(queryDelete); 
				
				
				for (String etiqueta: lista_etiquetas) {
					// INSERTAMOS LAS ETIQUETAS PARA EL ITEM CON ID lastid  SINO EXISTEN
					String query3 ="INSERT INTO etiquetas (nombre) SELECT '"+etiqueta.trim().toLowerCase()+"' FROM dual WHERE NOT EXISTS (SELECT * FROM etiquetas WHERE nombre = '"+etiqueta.trim().toLowerCase()+"')";
					//System.out.println("Ejecutando: "+query3);
					statement.executeUpdate(query3); 
					log.info(query3); 
					
					
					// RECUPERAMOS EL ID DE LA ETIQUETA INSERTADA
					int id_nueva_etiqueta=1;
					String query6 ="SELECT id FROM etiquetas WHERE nombre = '"+etiqueta.trim()+"'";
					//System.out.println(query5);
					statement.executeQuery(query6); 
					log.info(query6);
					ResultSet rs6 = statement.getResultSet();
					if (rs6.next()){
						id_nueva_etiqueta = rs6.getInt("id");
					}
					rs6.close();
					

					// INSERTAMOS EN LA TABLA QUE RELACIONA LOS ITEMS-AFILIADO DE LAS ETIQUETAS LAS RELACIONES DE ETIQUETAS QUE HAY
					String query4 ="INSERT INTO item_afiliado_etiqueta (id_ItemAfiliado,id_etiqueta) VALUES ('"+lastid+"',"+id_nueva_etiqueta+")"; 
					statement.executeUpdate(query4); 
					
				}
	}
	
	protected static String insertarFicheroExternoPng(BufferedImage img,String path,String key) throws Exception{

		 AWSCredentials credentials = null;
		 String bucketName = new ConfigTiendas().bucket_name;
      try {
      	if(credentials==null){
      		ProfilesConfigFile p= new ProfilesConfigFile(path);
              credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
      	}
      	
      } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
          throw new AmazonClientException(
                  "Cannot load the credentials from the credential profiles file. " +
                  "Please make sure that your credentials file is at the correct " +
                  "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                  e);
      }
     // String bucketName = "decotheco-thecoradores";

      
      AmazonS3 s3 = new AmazonS3Client(credentials);
      Region usWest2 = Region.getRegion(Regions.EU_WEST_1);
      s3.setRegion(usWest2);
      


		log.info("Getting Inserting Buffer with Amazon S3");  
      try {
          
      	ByteArrayOutputStream os = new ByteArrayOutputStream();
  		ImageIO.write(img, "png", os);
  		byte[] buffer = os.toByteArray();
  		InputStream is = new ByteArrayInputStream(buffer);
  		
  		
  		
  		ObjectMetadata meta = new ObjectMetadata();
  		meta.setContentLength(buffer.length);
  		s3.putObject(new PutObjectRequest(bucketName,  key, is, meta).withCannedAcl(CannedAccessControlList.PublicRead));
  

          
          
      } catch (AmazonServiceException ase) {
          log.error("Caught an AmazonServiceException, which means your request made it "
                  + "to Amazon S3, but was rejected with an error response for some reason.");
          log.error("Error Message:    " + ase.getMessage());
          log.error("HTTP Status Code: " + ase.getStatusCode());
          log.error("AWS Error Code:   " + ase.getErrorCode());
          log.error("Error Type:       " + ase.getErrorType());
          log.error("Request ID:       " + ase.getRequestId());
          throw new Exception("Error al insertar en Amazon", ase);
      } catch (AmazonClientException ace) {
          log.error("Caught an AmazonClientException, which means the client encountered "
                  + "a serious internal problem while trying to communicate with S3, "
                  + "such as not being able to access the network.");
          log.error("Error Message: " + ace.getMessage());
          throw new Exception("Error al insertar en Amazon", ace);
      }catch (Exception e) {
          log.error("Caught an AmazonClientException, which means the client encountered "
                  + "a serious internal problem while trying to communicate with S3, "
                  + "such as not being able to access the network.");
          log.error("Error Message: " + e.getMessage());
          throw new Exception("Error al insertar en Amazon", e);
      }
   // String urlReturn = s3.getUrl(bucketName, key).toString();
      String urlReturn = new ConfigTiendas().bucket_protocol+":/"+"/"+new ConfigTiendas().bucket_name+"."+new ConfigTiendas().bucket_region+"/"+key; 
      //UrlsManage urlM = new UrlsManage( );
      insertFileInBBDD(urlReturn,bucketName);
      return urlReturn;
  }
	
	protected static String insertarFicheroExterno(BufferedImage img,String path,String key) throws Exception{

		 AWSCredentials credentials = null;
		 String bucketName = new ConfigTiendas().bucket_name;
       try {
       	if(credentials==null){
       		ProfilesConfigFile p= new ProfilesConfigFile(path);
               credentials = new ProfileCredentialsProvider(p,"default").getCredentials();
       	}
       	
       } catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
           throw new AmazonClientException(
                   "Cannot load the credentials from the credential profiles file. " +
                   "Please make sure that your credentials file is at the correct " +
                   "location (C:\\Users\\Sarandon\\.aws\\credentials), and is in valid format.",
                   e);
       }
      // String bucketName = "decotheco-thecoradores";

       
       AmazonS3 s3 = new AmazonS3Client(credentials);
       Region usWest2 = Region.getRegion(Regions.EU_WEST_1);
       s3.setRegion(usWest2);
       


		log.info("Getting Inserting Buffer with Amazon S3");  
       try {
           
       	ByteArrayOutputStream os = new ByteArrayOutputStream();
   		ImageIO.write(img, "jpg", os);
   		byte[] buffer = os.toByteArray();
   		InputStream is = new ByteArrayInputStream(buffer);
   		
   		
   		
   		ObjectMetadata meta = new ObjectMetadata();
   		meta.setContentLength(buffer.length);
   		s3.putObject(new PutObjectRequest(bucketName,  key, is, meta).withCannedAcl(CannedAccessControlList.PublicRead));
  
           
       } catch (AmazonServiceException ase) {
           log.error("Caught an AmazonServiceException, which means your request made it "
                   + "to Amazon S3, but was rejected with an error response for some reason.");
           log.error("Error Message:    " + ase.getMessage());
           log.error("HTTP Status Code: " + ase.getStatusCode());
           log.error("AWS Error Code:   " + ase.getErrorCode());
           log.error("Error Type:       " + ase.getErrorType());
           log.error("Request ID:       " + ase.getRequestId());
           throw new Exception("Error al insertar en Amazon", ase);
       } catch (AmazonClientException ace) {
           log.error("Caught an AmazonClientException, which means the client encountered "
                   + "a serious internal problem while trying to communicate with S3, "
                   + "such as not being able to access the network.");
           log.error("Error Message: " + ace.getMessage());
           throw new Exception("Error al insertar en Amazon", ace);
       }catch (Exception e) {
           log.error("Caught an AmazonClientException, which means the client encountered "
                   + "a serious internal problem while trying to communicate with S3, "
                   + "such as not being able to access the network.");
           log.error("Error Message: " + e.getMessage());
           throw new Exception("Error al insertar en Amazon", e);
       }
    // String urlReturn = s3.getUrl(bucketName, key).toString();
       String urlReturn = new ConfigTiendas().bucket_protocol+":/"+"/"+new ConfigTiendas().bucket_name+"."+new ConfigTiendas().bucket_region+"/"+key; 
       //UrlsManage urlM = new UrlsManage( );
       insertFileInBBDD(urlReturn,bucketName);
       return urlReturn;
   }
	
	
	
	public static int insertFileInBBDD(String urlOrigin, String bucketName) throws Exception{
		 
		URL url = new URL(urlOrigin);
       String file = FilenameUtils.getName(url.getPath());
       String fileExtension = FilenameUtils.getExtension(url.getPath());
       String fileName = FilenameUtils.getBaseName(url.getPath());
       String route = urlOrigin.replaceAll(file, "");
       String[] parts =  route.split(bucketName);
       Object routeWitoutProtocol = route.replaceAll(parts[0],"");
       
       
       
		Class.forName("com.mysql.jdbc.Driver"); 
		new ConfigTiendas();
		Connection connForinsert = DriverManager.getConnection(ConfigTiendas.bbddconnectionstring); 
		Statement stmt = connForinsert.createStatement();
		//replace https or http

		log.info("insertFileInBBDD");
		try {

			if (conn != null) {
				String sql = "DELETE from routes where bucket='"
						+ bucketName+"' and route ='"
						+ routeWitoutProtocol+"' and filename ='"
						+ fileName+"'";
				
				
				int resultado = stmt.executeUpdate(sql);

				sql = "insert into routes ("
						+ "bucket, route, filename, extension "
						+ ") values (" + "'"
						+ bucketName
						+ "','"
						+ routeWitoutProtocol
						+ "','"
						+ file
						+ "','"
						+ fileExtension
						+ "')";

				log.info(sql);
				
				connForinsert.close();
				stmt.close();
				connForinsert = null;
				stmt = null;
				
				
			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			connForinsert.close();
			stmt.close();
			connForinsert = null;
			stmt = null;
			return 1;// alguna excepciÃ¯Â¿Â½n no controlada
		}
		return 0;// todo correcto
	}
	
	public static TiendaAfiliada urlAffiliates(String url) throws Exception {
		   
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("public String urlAffiliates(String url) : " + "url: " + url);
		
		Class.forName("com.mysql.jdbc.Driver"); 
		conn = DriverManager.getConnection(new ConfigTiendas().bbddconnectionstring); 
		Statement stmt = conn.createStatement(); 

		TiendaAfiliada clientAffiliates = new TiendaAfiliada();
		
		try {
			if (conn != null) {
				String sql = "SELECT url_add, id  FROM client_affiliates  where url_base='"+url+"' OR url_base2= '"+url+"' OR url_base3= '"+url+"' ";
				log.info("CoreImpl: "+sql);
				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					clientAffiliates.url_add=(rs.getString("url_add"));
					clientAffiliates.id=(rs.getInt("id"));
				} else {
					clientAffiliates.url_add="";
					clientAffiliates.id=0;
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
			clientAffiliates.url_add="";
			clientAffiliates.id=0;
		}  
		return clientAffiliates;
	}
	
	
	
	protected static void extractHostname(ItemAfiliado item_afiliado) throws Exception {
	    String hostname;
		String URLPrincipal=item_afiliado.URLImage;
		String url=item_afiliado.URLImage;
	    //find & remove protocol (http, ftp, etc.) and get hostname

	    if (url.indexOf("://") > -1) {
	        hostname = url.split("/")[2];
	    }
	    else {
	        hostname = url.split("/")[0];
	    }
	    
	    
	    //find & remove port number
	    hostname = hostname.split(":")[0];
	    //find & remove "?"
	    hostname = hostname.split("\\?")[0];

	    String URLImage=hostname;
	    if(URLImage.indexOf("www.") > -1) { 
			Integer parte=URLImage.split("\\.").length;  
			if(parte==3){
				URLImage=URLImage.split("\\.")[1]+"."+URLImage.split("\\.")[2]; 
			}
			if(parte==4){
				URLImage=URLImage.split("\\.")[1]+"."+URLImage.split("\\.")[2]+"."+URLImage.split("\\.")[3]; 
			}
			
		}
		
		// HASTA AQUÃ� DOMINIO.TERMINACIÃ“N SIN WWW 
		
		TiendaAfiliada verificar=  urlAffiliates(URLImage);
		int id=verificar.id;
		item_afiliado.id_tienda_afiliada=id;
		String url_add=verificar.url_add;
		
		if(url_add.equals("")) {
			URLImage=URLPrincipal;
		} else { 
				// EXISTE EN LA BD Y SE LE AÃ‘ADE LA TERMINACIÃ“N O SE CAMBIA EL VALOR DEL IDDEAFILIADO SI VIENE CON Ã‰L
				String parte2=url_add.split("=")[0]; 
				if(URLPrincipal.indexOf(parte2)> -1) {
					parte2=URLPrincipal.split(parte2)[0];
					URLImage=parte2+""+url_add;
				} else {
					if(URLPrincipal.indexOf("?")> -1) {
						URLImage=URLPrincipal+"&"+url_add;
					}else {
						URLImage=URLPrincipal+"?"+url_add;
					}
				} 
		} 
		item_afiliado.URLImage=URLImage;
	}
	
	
	//devuelve la lista de ids de los items de la bbdd de una tienda por el id de la tienda afiliada
		public ArrayList<Long> getItemsFromBbddByIdTiendaAfiliada(int idTiendaAfiliada) throws Exception{
			ArrayList<Long> listaDeIds = new ArrayList<>(0);
			Statement statement=null;
			try {
				Class.forName("com.mysql.jdbc.Driver");
		        // Setup the connection with the DB
		        conn = DriverManager.getConnection(new ConfigTiendas().bbddconnectionstring); 
				statement = conn.createStatement(); 
				
				// RECOGEMOS DE LA BD EL ITEM PARA VERIFICAR SI EXISTE
				String query ="select id_item_tienda_afiliada FROM item_afiliado where id_tienda_afiliada="+idTiendaAfiliada + " order by id_item_tienda_afiliada";
				statement.executeQuery(query); 
				ResultSet rs = statement.getResultSet(); 
				//System.out.println("Id item tienda: ");
				//System.out.println(item.id_item_tienda_afiliada);
				// SI EXISTE EL ITEM COMPROBAMOS SI EXISTE ALGUNA DIFERENCIA PARA ACTUALIZARLO
				while (rs.next()) {
					listaDeIds.add(rs.getLong("id_item_tienda_afiliada"));
				}
				conn.close();
				statement.close();
				conn = null;
				statement = null; 
			}catch (Exception e) {
				// TODO: handle exception
				conn.close();
				statement.close();
				conn = null;
				statement = null; 
			}
			

			
			return listaDeIds;
			
		}
	
//	public static void main (String args[]) throws Exception{
//		//https://www.decoratualma.com/api/images/products/4895/20554
//		ProductForOneShop p = new ProductForOneShop("https://decoratualma.com", "6GTYUYLU5AID77SJ6VGEXRTIUTY1ZZ5W", "products/?display=full", "images/products/", "categories/?display=full", "decora tu alma");
//		p.getItemAfiliadoList();
//	}
}
