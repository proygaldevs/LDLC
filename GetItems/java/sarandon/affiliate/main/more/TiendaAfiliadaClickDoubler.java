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

public class TiendaAfiliadaClickDoubler extends TiendaAfiliada implements TiendaAfiliadaInterface{

	
	
	
	public TiendaAfiliadaClickDoubler(String urlBase, String key, String productPath, String imagesPath, String categoriesPath, String nombre, String descAfili, int tipoAfili) {
		super( urlBase,  key,  productPath,  imagesPath,  categoriesPath,  nombre,  descAfili,  tipoAfili);
	}


	public ArrayList<ItemAfiliado> getItemsAfiliadoList() throws Exception{

		ArrayList<ItemAfiliado> list = new ArrayList<ItemAfiliado>(0);
		
		String nombreTienda=this.nombre;
		String nombreFinal=nombreTienda.replace(" ","-");

		HashMap<String, Object> getSchemaOptCategories = new HashMap();
		getSchemaOptCategories.put("url", "");

		System.out.println("Procesando Categorías...");
		Document schemaProducts = wsProductsNoKey.get(this.productPath);

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
				String idString=getCharacterDataFromElement((Element) element.getElementsByTagName("TDProductId").item(0));
				try {
					producto.id_item_tienda_afiliada = Long.parseLong(idString);
	
				}catch (Exception e) {
					System.out.println("no ha podido convertir a String el id:" + idString);
				}
				//NOMBRE
				producto.ImageTitle=getCharacterDataFromElement((Element) element.getElementsByTagName("name").item(0));
				//si no hay name, pasamos al siguiente nodo pues este no es un nodo de los que nos interesan (padre)
				/*if(producto.ImageTitle.length()<=0) {
					System.out.println(list.size()+"/"+i+"/"+products.getLength());
					continue;
				}*/
				
				//ACTIVO
				String activeString="1";
				try {
					producto.Activo = Integer
							.parseInt(activeString);
				}catch (Exception e) {
					System.out.println("no ha podido convertir a String el active:" + activeString);
				}
				/*if(producto.Activo==0){
					//ya no cogemos más datos porque no está activo, lo insertamos y a por otro
					list.add(producto);
					System.out.println(list.size()+"/"+i+"/"+products.getLength());
					continue;
				}*/
				
				
				//IMAGEN https://www.decoratualma.com/api/images/products/4895/20554
				producto.PathImage=getCharacterDataFromElement((Element) element.getElementsByTagName("imageUrl").item(0));
				
				
				
				//TAGS DEFECTO
				/*if(i==2975) {
					System.out.println("yeeeeep" );
				}*/
				String etiquetasDefecto=getCharacterDataFromElement((Element) element.getElementsByTagName("merchantCategoryName").item(0));
				etiquetasDefecto=etiquetasDefecto.replaceAll("Inicio > ", "");
				etiquetasDefecto=etiquetasDefecto.replaceAll(" > ", ",");
				etiquetasDefecto=etiquetasDefecto.replaceAll(",...,", ",");
				etiquetasDefecto=etiquetasDefecto.replaceAll("\\...,", ",");
				
				//Sino tiene por defecto vamos a por los 
				/*if(etiquetasDefecto.length()<=0) {
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
						
				}*/
				//TODO como en los dos pasos anteriores lo que se consigue es aue etiquetasDefecto esté correctamente relleno se convierte a etiquetas y se asigna a producto
				///etiquetasDefecto=convertirStringEtiquetas(etiquetasDefecto, nombreTienda, producto.ImageTitle.replaceAll(",...,","").replaceAll("\\...,", ","));
				etiquetasDefecto=convertirStringEtiquetas(etiquetasDefecto, nombreTienda, producto.ImageTitle.replaceAll(",...,","").replaceAll("\\...,", ","));

				producto.ListaEtiquetas=Arrays.asList(etiquetasDefecto.split(","));
				
				//PRecio
				//TODO hay que añadir el IVA y hacer que encajen los decimales
				double price=Float.parseFloat(getCharacterDataFromElement((Element) element.getElementsByTagName("price").item(0)));
				double iva=price*0;
				double total=price+iva; 
				producto.Price=String.valueOf(round(total,2));
				producto.NombreFinal=nombreFinal;
				//UPDATED
				producto.updated="true";
				
				//URL PRODUCT
				producto.URLImage=getCharacterDataFromElement((Element) element.getElementsByTagName("productUrl").item(0));
				
				producto.Tipo=-3;
				
				producto.id_tienda_afiliada=this.id;
				
				list.add(producto);
				System.out.println(list.size()+"/"+i+"/"+products.getLength());
				
			}
		}
				
		System.out.println("Productos procesados: "+list.size());	
		list=ordenarListPorIdTiendaAfiliada(list);
		return list;

	}

	
	
		
		//procesa(inserta o actuliza los items que trajimos dl  api cuando es una tienda clickdoubler
		public void processItems(TiendaAfiliada tiendaObject) throws Exception {
			log.info("Comienzo de la inserción de los items de la tienda: "+ tiendaObject.nombre);
			System.out.println("Comienzo processItems de la tienda: "+ tiendaObject.nombre);
			ArrayList<Long> listaBbdd=getItemsFromBbddByIdTiendaAfiliada(tiendaObject.id);
			
			/*for(int i=0;i<10; i++) {
				System.out.println(list.get(i).id_item_tienda_afiliada);
			}*/
			int pointerApiItems=0;
			int pointerBBDDITems = 0;
			boolean fin=false;
			//Long aVeryLongLong=(long) (999999999);
			Long aVeryLongLong=(long) (999999999)*999;
			
			while (pointerApiItems<list.size() || pointerBBDDITems<listaBbdd.size()) {
					//Comprobamos que el api ha devuelto algo, si esta vacío salimos sin hacer nada.
					if(list.size()<=0) break;
					
					//inicializamos a valores muy grandes
					Long idBbDD=aVeryLongLong;
					Long idApi=aVeryLongLong;
					
					
					//si hay elementos y no se han acabado los items de bbdd
					if(listaBbdd.size()!=0 && pointerBBDDITems<listaBbdd.size()) {
						idBbDD= listaBbdd.get(pointerBBDDITems);
					}
					//si no se han acabaod los items del api
					if( pointerApiItems<list.size()) {
						idApi = list.get(pointerApiItems).id_item_tienda_afiliada;
					}
					 
					
					
					if(idBbDD<idApi) {
						//Si el id de la BBDD es menor, significa que ya no está activo. Lo descativamos y pasamos al siguiente de BBDD
						desactivarItem(idBbDD);
						
						pointerBBDDITems++;
						
						continue;
					}
					if(Long.valueOf(idBbDD).compareTo(Long.valueOf(idApi))==0) {
						//Si el id de la BBDD es igual actualizamos y seguimos con los siguientes items de las listas tanto de bbdd como de api
						actualizarItem(list.get(pointerApiItems));
						
						pointerBBDDITems++;
						pointerApiItems++;
						continue;
					}
					if(idBbDD>idApi) {
						//Si el id de la BBDD es igual actualizamos y seguimos con los siguientes items de las listas tanto de bbdd como de api
						insertarItem(list.get(pointerApiItems));
						
						pointerApiItems++;
						continue;
					}
			}
			
			
		}
		
		
	
}
