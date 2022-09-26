package sarandon.affiliate.main.more;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
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

import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import pswebservice.PSWebServiceClient;
import pswebservice.PrestaShopWebserviceException;
import sarandon.affiliate.vo.Categorie;
import sarandon.affiliate.vo.ItemAfiliado;
import sarandon.assistance.servlet.more.ConfigTiendas;
import sarandon.assistance.vo.portfolio.ImagenVO;

public class TiendaAfiliadaPrestashop extends TiendaAfiliada implements TiendaAfiliadaInterface{

	
	
	public TiendaAfiliadaPrestashop(String urlBase, String key, String productPath, String imagesPath, String categoriesPath, String nombre, String descAfili, int tipoAfili) {
		super( urlBase,  key,  productPath,  imagesPath,  categoriesPath,  nombre,  descAfili,  tipoAfili);
	}

	public ArrayList<ItemAfiliado> getItemsAfiliadoList() throws PrestaShopWebserviceException, TransformerException, IOException {
		
		ArrayList<ItemAfiliado> list = new ArrayList<ItemAfiliado>(0);
		
		String nombreTienda=this.nombre;   
		String nombreFinal=nombreTienda.replace(" ","-");
		
		HashMap<String, Object> getSchemaOptCategories = new HashMap();
		getSchemaOptCategories.put("url", urlBaseAPI + this.categoriesPath);
		log.info("Procesando Categorías...");
		System.out.println("Procesando Categorías...");
		Document schemaCategories = wsCategories.get(getSchemaOptCategories);
		// Recogemos los nodos cuyo nombre del tag sea category
		NodeList categories = schemaCategories.getElementsByTagName("category");
		// recorremos cada nodo de tipo category para crear un objeto de tipo category e
		// insertarlo en la lista de categriís
		for (int i = 0; i < categories.getLength(); i++) {
			if (categories.item(i).getNodeType() == Node.ELEMENT_NODE) {
				Categorie category = new Categorie();
				Element element = (Element) categories.item(i);
				category.id = Integer
						.parseInt(getCharacterDataFromElement((Element) element.getElementsByTagName("id").item(0)));
				category.levelDepth=getCharacterDataFromElement((Element) element.getElementsByTagName("level_depth").item(0));
				//TODO podríamos valorar en el nombre separarlos ya por comas e " y " para tener los terminos ya como querríamos insertar después
				String name=getCharacterDataFromElement((Element) element.getElementsByTagName("name").item(0));
				name=name.replace(" y ",",");
				name=name.replace(" o ",",");
				name=name.replace(" e ",",");
				category.name = name;
				// solo si la categoría tiene nombre, entonces la insertamos sino la
				// despreciamos
				if (category.name.length() > 0) {
					categoriesList.add(category);
				}
			}
		}
		log.info("Categorías procesadas: "+ categoriesList.size() );
		System.out.println("Categorías procesadas: "+ categoriesList.size() );
		log.info("Procesando Productos...");
		System.out.println("Procesando Productos...");
		//Productos
		HashMap<String, Object> getSchemaOptProducts = new HashMap();
		getSchemaOptProducts.put("url", urlBaseAPI + this.productPath);

		
		Document schemaProducts = wsCategories.get(getSchemaOptProducts);
		// Recogemos los nodos cuyo nombre del tag sea product
		NodeList products = schemaProducts.getElementsByTagName("product");
		// recorremos cada nodo de tipo product para crear un objeto de tipo itemAfiliado e
		// insertarlo en la lista de itemsafiliados
		
		// products.getLength() en vez de 50
		for (int i = 0; i < products.getLength(); i++) {
			if (products.item(i).getNodeType() == Node.ELEMENT_NODE) {
				
				ItemAfiliado producto = new ItemAfiliado();
				Element element = (Element) products.item(i);
				
				//ID
				String idString=getCharacterDataFromElement((Element) element.getElementsByTagName("id").item(0));
				try {
					producto.id_item_tienda_afiliada = Integer
							.parseInt(idString);
				}catch (Exception e) {
					log.info("no ha podido convertir a String el id:" + idString);
					System.out.println("no ha podido convertir a String el id:" + idString);
				}
				//NOMBRE
				producto.ImageTitle=getCharacterDataFromElement((Element) element.getElementsByTagName("name").item(0));
				//si no hay name, pasamos al siguiente nodo pues este no es un nodo de los que nos interesan (padre)
				if(producto.ImageTitle.length()<=0) {
					log.info(list.size()+"/"+i+"/"+products.getLength());
					System.out.println(list.size()+"/"+i+"/"+products.getLength());
					continue;
				}
				
				//ACTIVO
				String activeString=getCharacterDataFromElement((Element) element.getElementsByTagName("active").item(0));
				try {
					producto.Activo = Integer
							.parseInt(activeString);
				}catch (Exception e) {
					log.info("no ha podido convertir a String el active:" + activeString);
					System.out.println("no ha podido convertir a String el active:" + activeString);
				}
				if(producto.Activo==0){
					//ya no cogemos más datos porque no está activo, lo insertamos y a por otro
					list.add(producto);
					log.info(list.size()+"/"+i+"/"+products.getLength());
					System.out.println(list.size()+"/"+i+"/"+products.getLength());
					continue;
				}
				
				
				//IMAGEN https://www.decoratualma.com/api/images/products/4895/20554
				producto.PathImage=urlBaseAPI+imagesPath+producto.id_item_tienda_afiliada+"/"+getCharacterDataFromElement((Element) element.getElementsByTagName("id_default_image").item(0));
				
				
				
				//TAGS DEFECTO
				
				String etiquetasDefecto=getCharacterDataFromElement((Element) element.getElementsByTagName("meta_keywords").item(0));
				//Sino tiene por defecto vamos a por los 
				if(etiquetasDefecto.length()<=0) {
					//Buscamos las categorías
					Node associations=element.getElementsByTagName("categories").item(0);
					NodeList nodeListcategoriesProduct = ((Element) associations).getElementsByTagName("category");
					// recorremos cada nodo de tipo product para crear un objeto de tipo itemAfiliado e
					// insertarlo en la lista de itemsafiliados
					// Aqui tendremos las categorías en numérico
					ArrayList<String> listaCategoriasProducto= new ArrayList<>(0);
					for (int ii = 0; ii < nodeListcategoriesProduct.getLength(); ii++) {
						if (nodeListcategoriesProduct.item(ii).getNodeType() == Node.ELEMENT_NODE) {
							
							
							Element elementCategory = (Element) nodeListcategoriesProduct.item(ii);
							
							//ID de categoría
							String categoriaProducto=getCharacterDataFromElement((Element) elementCategory.getElementsByTagName("id").item(0));
							if(categoriaProducto.length()>0) {
								listaCategoriasProducto.add(categoriaProducto);
							}
						}
					}
					//TODO Hay que quitar los repetidos!!!
					etiquetasDefecto=asignarCategorias(listaCategoriasProducto, categoriesList);	
						
				}
				//TODO como en los dos pasos anteriores lo que se consigue es aue etiquetasDefecto esté correctamente relleno se convierte a etiquetas y se asigna a producto
				etiquetasDefecto=convertirStringEtiquetas(etiquetasDefecto, nombreTienda, producto.ImageTitle);

				producto.ListaEtiquetas=Arrays.asList(etiquetasDefecto.split(","));
				
				//PRecio
				//TODO hay que añadir el IVA y hacer que encajen los decimales
				double price=Float.parseFloat(getCharacterDataFromElement((Element) element.getElementsByTagName("price").item(0)));
				double iva=price*0.21;
				double total=price+iva; 
				producto.Price=String.valueOf(round(total,2));
				producto.NombreFinal=nombreFinal;
				//UPDATED
				producto.updated=getCharacterDataFromElement((Element) element.getElementsByTagName("date_upd").item(0));
				
				//URL PRODUCT
				producto.URLImage=getFinalURL(urlBase+"/index.php?controller=product&id_product="+producto.id_item_tienda_afiliada);
				
				producto.Tipo=-3;
				list.add(producto);
				log.info(list.size()+"/"+i+"/"+products.getLength());
				System.out.println(list.size()+"/"+i+"/"+products.getLength());
				
			}
		}
		
		log.info("Productos procesados: "+list.size());			
		System.out.println("Productos procesados: "+list.size());	
		return list;

	}
	
	//procesa(inserta o actuliza los items que trajimos dl  api cuando es una tienda prestashop
		public void processItems(TiendaAfiliada tiendaObject) throws SQLException {
			log.info("Comienzo de la inserción de los items de la tienda: "+ tiendaObject.nombre);
			System.out.println("Comienzo processItems items de la tienda: "+ tiendaObject.nombre);
			// RECORREMOS EL LISTADO
			for(int j=0;j<list.size();j++) {
				// Inserta, o actualiza (incluye que no esté activo) los items de la tienda
			    createItem(list.get(j), tiendaObject.key);
			}
		}
		
		private static void createItem(ItemAfiliado item, String key) throws SQLException{
			List<String>lista_etiquetas=item.ListaEtiquetas;
			int original=item.Tipo;
			log.info("private int createItem(ItemAfiliado item)");
	        try {  

				
				// ASIGNAMOS id_tienda_afiliada Y URL CON TERMINACIÃ“N
				extractHostname(item);
				
	            Class.forName("com.mysql.jdbc.Driver");
	            // Setup the connection with the DB
	            conn = DriverManager.getConnection(new ConfigTiendas().bbddconnectionstring); 
				Statement statement = conn.createStatement(); 
				
				// RECOGEMOS DE LA BD EL ITEM PARA VERIFICAR SI EXISTE
				String query ="Select id,titulo,precio,urlpagina,pathimagen, activo, tipo, id_tienda_afiliada, id_item_tienda_afiliada, updated FROM item_afiliado where id_item_tienda_afiliada="+item.id_item_tienda_afiliada+" limit 1";
				statement.executeQuery(query); 
				ResultSet rs = statement.getResultSet(); 
				//System.out.println("Id item tienda: ");
				//System.out.println(item.id_item_tienda_afiliada);
				// SI EXISTE EL ITEM COMPROBAMOS SI EXISTE ALGUNA DIFERENCIA PARA ACTUALIZARLO
				if (rs.next()) {
					
					Integer activo=rs.getInt("activo"); 
					String updated=rs.getString("updated"); 
					//System.out.println("Id en nuestra bd (UPDATE): ");
					//System.out.println(rs.getString("id"));
					
					
					// COMPROBAMOS SI EXISTE ALGUNA DIFERENCIA Y SI LA HAY ACTUALIZA LOS DATOS
					if(activo!=item.Activo) {
						log.info("Actualizando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						System.out.println("Actualizando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						String id=rs.getString("id"); 
						String sql3 = "UPDATE item_afiliado SET activo="
								+ item.Activo 
								+ " where id="
								+ id;
						statement.executeUpdate(sql3);
						if(item.Activo==1) {
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
									+ "' where id="
									+ id;
							statement.executeUpdate(sql4);
							
							// ELIMINAMOS LAS ETIQUETAS QUE EXISTEN PARA ESTE ITEM
							String sql = "DELETE from item_afiliado_etiqueta where id_ItemAfiliado="
									+ id;
							int resultado = statement.executeUpdate(sql);
							
							// INSERTO DE ETIQUETAS
							for (String etiqueta: lista_etiquetas) {
								
								

								// INSERTAMOS LAS NUEVAS ETIQUETAS QUE EXISTEN PARA ESTE ITEM
										
								String query3 ="INSERT INTO etiquetas (nombre) SELECT '"+etiqueta.trim().toLowerCase()+"' FROM dual WHERE NOT EXISTS (SELECT * FROM etiquetas WHERE nombre = '"+etiqueta.trim().toLowerCase()+"')";
								//System.out.println("Ejecutando: "+query3);
								statement.executeUpdate(query3); 
								log.info(query3);
								
								
								// RECUPERAMOS EL ID DE LA ETIQUETA RECIEN INSERTADA PARA AÃ‘ADIR LA RELACION M N
								int id_nueva_etiqueta=1;
								String query5 ="SELECT id FROM etiquetas WHERE nombre = '"+etiqueta.trim()+"'";
								//System.out.println(query5);
								statement.executeQuery(query5); 
								log.info(query5);
								ResultSet rs5 = statement.getResultSet();
								if (rs5.next()){
									id_nueva_etiqueta = rs5.getInt("id");
								}
								rs5.close();
								
								// INSERTAMOS LA RELACION ENTRE EL ItemAfiliado Y LA ETIQUETA
								String query4 ="INSERT INTO item_afiliado_etiqueta (id_ItemAfiliado,id_etiqueta) VALUES ('"+id+"',"+id_nueva_etiqueta+")"; 
								statement.executeUpdate(query4); 
							}
						}
						rs.close(); 
						statement=null;
						
					} else if(updated.equals(item.updated)) {  
						statement=null;
						log.info("Ya creado y no hace falta actualizar item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						System.out.println("Ya creado y no hace falta actualizar item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
					} else {
						log.info("Actualizando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						System.out.println("Actualizando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						String id=rs.getString("id"); 
						String sql3 = "UPDATE item_afiliado SET titulo='"
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
								+ "' where id="
								+ id;
						statement.executeUpdate(sql3);
						

						// ELIMINAMOS LAS ETIQUETAS QUE EXISTEN PARA ESTE ITEM
						String sql = "DELETE from item_afiliado_etiqueta where id_ItemAfiliado="
								+ id;
						int resultado = statement.executeUpdate(sql);
						
						// INSERTO DE ETIQUETAS
						for (String etiqueta: lista_etiquetas) {
							
							

							// INSERTAMOS LAS NUEVAS ETIQUETAS QUE EXISTEN PARA ESTE ITEM
									
							String query3 ="INSERT INTO etiquetas (nombre) SELECT '"+etiqueta.trim().toLowerCase()+"' FROM dual WHERE NOT EXISTS (SELECT * FROM etiquetas WHERE nombre = '"+etiqueta.trim().toLowerCase()+"')";
							//System.out.println("Ejecutando: "+query3);
							statement.executeUpdate(query3); 
							log.info(query3);
							
							
							// RECUPERAMOS EL ID DE LA ETIQUETA RECIEN INSERTADA PARA AÃ‘ADIR LA RELACION M N
							int id_nueva_etiqueta=1;
							String query5 ="SELECT id FROM etiquetas WHERE nombre = '"+etiqueta.trim()+"'";
							//System.out.println(query5);
							statement.executeQuery(query5); 
							log.info(query5);
							ResultSet rs5 = statement.getResultSet();
							if (rs5.next()){
								id_nueva_etiqueta = rs5.getInt("id");
							}
							rs5.close();
							
							// INSERTAMOS LA RELACION ENTRE EL ItemAfiliado Y LA ETIQUETA
							String query4 ="INSERT INTO item_afiliado_etiqueta (id_ItemAfiliado,id_etiqueta) VALUES ('"+id+"',"+id_nueva_etiqueta+")"; 
							statement.executeUpdate(query4); 
						} 
						statement=null;
					}
				  
				} else { 
					
					
					if(item.id_item_tienda_afiliada!=0 && item.Activo!=0) {
						

						log.info("Creando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						System.out.println("Creando item con id_item_tienda_afiliada: "+ item.id_item_tienda_afiliada);
						
						// ALMACENAMOS ARCHIVO EN DISCO 
					    String namefile = "tienda-"+item.NombreFinal+"-"+System.currentTimeMillis()+"."; 
					    String relativeWebPath = "ldlc/items/"; 
					    String absoluteDiskPath = relativeWebPath; 
						InputStream is;
						
						URLConnection connection=null;
						// INTRODUCIMOS EL USUARIO PARA LA DESCARGA DEL ARCHIVO SI ES NECESARIA
						if(key!="") {
							MyAuthenticator.setPasswordAuthentication(key, "");
				            Authenticator.setDefault(new MyAuthenticator ());
				            URL urlFI = new URL(item.PathImage);
							connection = urlFI.openConnection();
							is = connection.getInputStream();
						} else { 
							URL urlFI = new URL(item.PathImage);
							is = urlFI.openStream(); 
						}
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
									+ "VALUES ('"+item.ImageTitle+"','"+item.Price+"','"+item.URLImage+"','"+namefile+"','"+item.Activo+"'," + original +",'"+item.id_tienda_afiliada+"','"+item.id_item_tienda_afiliada+"','"+item.updated+"')";
						statement.executeUpdate(query2, Statement.RETURN_GENERATED_KEYS);
						ResultSet rs2 = statement.getGeneratedKeys();
						int lastid=-1;
						if (rs2.next()){
							lastid=rs2.getInt(1);
						} 
						rs2.close();
						
						
	 
						// INSERTAMOS LAS ETIQUETAS PARA EL ULTIMO ID INSERTADO SINO EXISTEN
						for (String etiqueta: lista_etiquetas) {
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
	 
						statement=null;
					 
					} else { 
						//System.out.println(" (NO ACTIVO) "); 
						log.info("Item no activo: "+ item.id_item_tienda_afiliada);
						System.out.println("Item no activo: "+ item.id_item_tienda_afiliada);
						statement=null;
					}
				}
	 
				System.out.println(" ");
				//System.out.println("  ");
				if(conn!=null) {
					conn.close();
				}
				
			} catch (Exception e) {
				log.error("ERROR en try catch:" + e.getMessage());
				// TODO Auto-generated catch block
				e.printStackTrace(); 
			} 
		}
		
	
}
