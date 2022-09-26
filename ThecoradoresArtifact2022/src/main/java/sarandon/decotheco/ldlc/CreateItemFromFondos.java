package sarandon.decotheco.ldlc;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import sarandon.assistance.servlet.more.S3Sample;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.decotheco.ldlc.controller.ItemController;
import sarandon.decotheco.ldlc.model.ItemLDLC;

/**
 * Recupera los valores de un formulario multipart/form-data
 * @author carlos
 *
 */

@MultipartConfig
public class CreateItemFromFondos  extends HttpServlet {

	private final static Logger log = Logger.getLogger(dataBBDD.class);
	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.info("CreateItem: doPost");
		ItemLDLC item = new ItemLDLC();
		ItemController ic = new ItemController();

		String image_data = request.getParameter("imageDataFondos");
		String titulo = request.getParameter("itemtitulo").replaceAll("[\"']", "");
		String etiquetas = request.getParameter("itemetiquetas").replaceAll("[\"']", "");
		String precio = request.getParameter("itemprecio");
		String url = request.getParameter("itemurl");
		String urlItem = request.getParameter("itemsrc");
		String decorador_id = request.getParameter("decorador_id");
		String id_ldlc = request.getParameter("id_ldlc");
		String id_proyecto = request.getParameter("id_proyecto");
		String tipo = request.getParameter("tipo");
		
		//etiquetas
		List<String> lista_etiquetas = Arrays.asList(etiquetas.split(","));


	    //almaceno el archivo en disco
	    String namefile = decorador_id+"-"+System.currentTimeMillis();
	    String relativeWebPath = "ldlc/items/";
	 		//String absoluteDiskPathForTemp = getServletContext().getRealPath("items")+File.separator;
	 	    String absoluteDiskPath = relativeWebPath;
		//String absoluteDiskPath = getServletContext().getRealPath(relativeWebPath)+File.separator;
	   
	   // String destinationFile = absoluteDiskPath;
	    
 	    log.info("destinationFile+namefile: "+absoluteDiskPath+namefile); 
	    String new_name="";
	    if(tipo.equals("1") || tipo.equals("-3")) {
	    	 if(url.indexOf("data:image/png;base64") != -1){
	    		 new_name=namefile+"-"+System.currentTimeMillis();
	    	 } else {
	    		 new_name= url.replace(new sarandon.assistance.servlet.more.Config().URL_items, "").replace(".jpg", "").replace(".png", "")+"-"+System.currentTimeMillis();
	    		 log.info("image_name: "+new_name);
	    	 }
	    } else {
	    	 new_name= url.replace(new sarandon.assistance.servlet.more.Config().URL_items, "").replace(".jpg", "").replace(".png", "");
	    }
		String img64 = image_data.replace("data:image/png;base64,","");
        byte[] decodedBytes = Base64.getMimeDecoder().decode(img64); 
        BufferedImage bfi = ImageIO.read(new ByteArrayInputStream(decodedBytes));    
        
        /* File outputfile = new File(absoluteDiskPathForTemp+new_name+".png");
        ImageIO.write(bfi , "png", outputfile);
        bfi.flush();*/
        

	    if(tipo.equals("1") || tipo.equals("-3")) {
        try {
			new S3Sample().insertarFicheroS3png(bfi, getServletContext().getRealPath("/credentials"),absoluteDiskPath+new_name+".png");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.print(e);
			e.printStackTrace();
		}
	    }
       /* File outputfile = new File(absoluteDiskPath+new_name+".png");
        ImageIO.write(bfi , "png", outputfile);
        bfi.flush();*/
	    
	    

	    
	    //inserto en base de datos
		item.ListaEtiquetas = lista_etiquetas;
		item.PathImage=new_name+".png";
	    item.ImageTitle=titulo;
	    //item.URLImage = new sarandon.assistance.servlet.more.Config().URL_items+new_name+".png";
	    item.URLImage = urlItem;
	    item.Price=precio;
	    if(tipo.equals("1")) {
	    	ic.create(item,lista_etiquetas, Integer.parseInt(decorador_id),Integer.parseInt(id_ldlc));
	    }
	    if(tipo.equals("-3")) {
	    	ic.create(item,lista_etiquetas, Integer.parseInt(decorador_id),0);
	    }
	    String padevolver="1";
	    System.out.print(padevolver);

	    //String completo="{\"id\":\""+padevolver+"\", \"nombre\":\""+namefile+"\"}";
	    response.sendRedirect("loadItems.html?id="+padevolver+"&nombre="+new_name+".png"+"&fondos=si&url=\"+url");
		
	}
}
