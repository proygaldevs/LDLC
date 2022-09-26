package sarandon.affiliate.main.more;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.imageio.ImageIO;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException; 
import javax.sql.DataSource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.imgscalr.Scalr;

import sarandon.assistance.servlet.more.ConfigTiendas;
import sarandon.assistance.servlet.more.S3Sample;

import sarandon.affiliate.vo.ItemAfiliado;  
import sarandon.decotheco.ldlc.model.ItemLDLC; 

import sarandon.affiliate.main.more.MyAuthenticator;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.auth.profile.ProfilesConfigFile;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.rekognition.model.S3Object;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson; 

import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class MainTiendas {
	
	private final static Logger log = Logger.getLogger(MainTiendas.class);
	static Connection conn = null;  
	
	
	
	//En este arraylist guardaremos la lista de tiendas que recogemos de la bbdd
	ArrayList<TiendaAfiliada> listaTiendas = new ArrayList<TiendaAfiliada>(0);

	
	public static void main(String[] args) {
		
		
		MainTiendas m= new MainTiendas();
		m.mainProcess();
		//rellenamos la lista de tiendas
		
		
	}
	
	
	public void mainProcess() {
		log.info("class Prueba main");
		try {
			
			// OBTENEMOS TIENDAS
			log.info("Importación de artículos de tiendas MAIN()");
			listaTiendas=getTiendas();
			
			
			// RECORREMOS TIENDAS
			for(int i=0;i<listaTiendas.size();i++) {
				//recuperamos una tienda
				TiendaAfiliada tiendaObject = listaTiendas.get(i);
				
				// OBTENEMOS UN LISTADO CON TODOS LOS PRODUCTOS RECIBIDOS DE LA TIENDA
				//miramos de que tipo es:
				//SI es 1 es prestashop
				if(tiendaObject.tipo_afiliacion==1) {
					tiendaObject.list=((TiendaAfiliadaPrestashop) tiendaObject).getItemsAfiliadoList();
					((TiendaAfiliadaPrestashop) tiendaObject).processItems(tiendaObject);
					System.out.println("Fin de la tienda : " +tiendaObject.nombre);
				}
				//SI es 2 es clickDouble
				if(tiendaObject.tipo_afiliacion==2) {
					tiendaObject.list=((TiendaAfiliadaClickDoubler) tiendaObject).getItemsAfiliadoList();
					((TiendaAfiliadaClickDoubler) tiendaObject).processItems(tiendaObject);
					
					imprimirResultados(tiendaObject);
				}
				
				
				
				
			}
			log.info("Finalizó la subida de todos los items");
			System.out.println("Finalizó la subida de todos los items");
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("dataBBDD FAllo en escribir Fichero: " + e.getMessage());
			log.info("dataBBDD FAllo en escribir Fichero: " + e.getMessage());
		}
	}

	public void imprimirResultados(TiendaAfiliada tiendaObject) {
		System.out.println("Fin de la tienda : " +tiendaObject.nombre);
		System.out.println("Artículos actualizados: " + tiendaObject.articulosUpdateados);
		System.out.println("Artículos dados de baja: " + tiendaObject.articulosDesactivados);
		System.out.println("Artículos nuevos: " + tiendaObject.articulosInsertados);
		System.out.println("Artículos erroneos: " + tiendaObject.articulosErroneos.size());
		for(int i=0;i<tiendaObject.articulosErroneos.size();i++) {
			System.out.println("id_item_tienda_afiliada erroneos: " + tiendaObject.articulosInsertados);
		}
	}
	

	
	
	/*private ArrayList<ItemAfiliado> getItemAfiliadoList(String nombre, String dominio_tienda, String image_path, String products_path, String categories_path) {
		
		ArrayList<ItemAfiliado> list = new ArrayList<ItemAfiliado>(0);
		ItemAfiliado item_afiliado=null;
		
		// CREAMOS UN OBJETO PARA INSERTAR EN ITEM item_afiliado
		for(int i=65;i<=66;i++) {
		
			item_afiliado = new ItemAfiliado(); 
			item_afiliado.Price="33.33";
			item_afiliado.PathImage="https://www.ikea.com/es/es/images/products/malm-escritorio-con-tablero-extraible-blanco__0148191_PE306482_S4.JPG";
			
			 
			// CREAMOS URL CON TERMINACIÓN EL LA TIENDA DEL ITEM EN CLIENT_AFFILIATE
			item_afiliado.URLImage="https://www.decoratualma.com/decoracion/4622-perchero-nube.html";
			item_afiliado.ImageTitle="Actualizado3";
			item_afiliado.Activo=1;
			item_afiliado.Tipo=-3;
			item_afiliado.updated="2019";
			item_afiliado.id_item_tienda_afiliada=i;
			String etiqueta="blanco, pabloeswai";
			
			// AÑADIR ETIQUETAS AFF (AFILIADO) Y NOMBRE SIN ESPACIOS
			if (etiqueta.indexOf("aff") <= -1) {
				etiqueta = etiqueta.concat(", aff");
		    }
			nombre=nombre.replace(" ","");
			if (etiqueta.indexOf(nombre) <= -1) {
				etiqueta = etiqueta.concat(", "+nombre);
		    }
			
			// CONVERTIMOS EL STRING DE ETIQUETAS EN UNA LISTA DE ETIQUETAS
			item_afiliado.ListaEtiquetas = Arrays.asList(etiqueta.split(","));
			list.add(item_afiliado);
		}
		
		return list;
	}
*/	
	public static ArrayList<TiendaAfiliada> getTiendas() throws Exception {
		   
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("public static ClientAffiliates getTiendas() throws Exception");
		
		Class.forName("com.mysql.jdbc.Driver"); 
		new ConfigTiendas();
		conn = DriverManager.getConnection(ConfigTiendas.bbddconnectionstring); 
		Statement stmt = conn.createStatement(); 
		
		
		
		ArrayList<TiendaAfiliada> list = new ArrayList<TiendaAfiliada>(0);
		TiendaAfiliada clientAffiliates = null;
		
		try {
			if (conn != null) {
				String sql = "SELECT  url_add, id, dominio_tienda, image_path, products_path, categories_path, contra, nombre, tipo_afiliacion, des_afiliacion   FROM client_affiliates WHERE activo=1";
				log.info("CoreImpl: "+sql);
				ResultSet rs = stmt.executeQuery(sql);
				while(rs.next()) {
					//Convertimos los resultados en objetos del tipo tienda y los metemos al arraylist que devolvermos en el metodo
					if(rs.getInt("tipo_afiliacion")==1) //si es de tipo prestashop
						
						clientAffiliates= new TiendaAfiliadaPrestashop((rs.getString("dominio_tienda")), rs.getString("contra"), rs.getString("image_path"), rs.getString("products_path"), rs.getString("categories_path"), rs.getString("nombre"),rs.getString("des_afiliacion"),rs.getInt("tipo_afiliacion")); 
					if(rs.getInt("tipo_afiliacion")==2)//si es de tipo clickdoubler
						clientAffiliates= new TiendaAfiliadaClickDoubler((rs.getString("dominio_tienda")), rs.getString("contra"), rs.getString("image_path"), rs.getString("products_path"), rs.getString("categories_path"), rs.getString("nombre"),rs.getString("des_afiliacion"),rs.getInt("tipo_afiliacion")); 
					
					clientAffiliates.id=rs.getInt("id");
					clientAffiliates.url_add=rs.getString("url_add");
					list.add(clientAffiliates);
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
		return list;
	}
	
	
	
	
	
	
	
	
}
