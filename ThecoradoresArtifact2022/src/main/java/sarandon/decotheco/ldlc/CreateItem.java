package sarandon.decotheco.ldlc;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

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
public class CreateItem  extends HttpServlet {
	private final static Logger log = Logger.getLogger(dataBBDD.class);

	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.info("CreateItem: doPost");
		ItemLDLC item = new ItemLDLC();
		ItemController ic = new ItemController();


		String titulo = request.getParameter("itemtitulo").replaceAll("[\"']", "");
		String etiquetas = request.getParameter("itemetiquetas").replaceAll("[\"']", "");
		// AÑADIR ETIQUETAS AFF (AFILIADO) Y NOMBRE SIN ESPACIOS
		if (etiquetas.indexOf("aff,") > -1) {
			etiquetas=etiquetas.replace("aff,",""); 
			etiquetas=etiquetas.replace("aff,",""); 
	    }
		if (etiquetas.indexOf("aff") > -1) {
			etiquetas=etiquetas.replace(",aff",""); 
			etiquetas=etiquetas.replace(", aff",""); 
	    }
		String tag = etiquetas.toLowerCase(); 
		tag=tag.trim();
		String[] tag1=tag.split(", ");
		String resultado1=String.join(",", tag1);
		String[] tag2=resultado1.split("- ");
		String resultado2=String.join(",", tag2);
		String[] tag3=resultado2.split("-");
		String resultado3=String.join(",", tag3);
		String[] tagsFinal=resultado3.split(" ");
		etiquetas=String.join(",", tagsFinal);
		String precio = request.getParameter("itemprecio").replace(',','.');
		String url = request.getParameter("itemurl");
		String decorador_id = request.getParameter("decorador_id");
		String id_ldlc = request.getParameter("id_ldlc");
		String id_proyecto = request.getParameter("id_proyecto");
		String itemurltipo = request.getParameter("item_tipo");

	    Part filePart = request.getPart("itemimagefile"); 
	    String imageFile = Paths.get(filePart.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
	    InputStream fileContent = filePart.getInputStream();
		
		//etiquetas
		List<String> lista_etiquetas = Arrays.asList(etiquetas.split(","));

		
	    //almaceno el archivo en disco
	    String namefile = decorador_id+"-"+System.currentTimeMillis()+".jpg";
	    String relativeWebPath = "ldlc/items/";

	   String totalpath=getServletContext().getRealPath("/")+namefile; 
	    File file = new File(totalpath);
	    OutputStream os = new FileOutputStream(file);

		byte[] b = new byte[2048];
		int length;

		while ((length = fileContent.read(b)) != -1) {
			os.write(b, 0, length);
		}
		
		fileContent.close();
		os.flush();
		os.close();
	    
		try {
			new S3Sample().insertarFicheroS3(file,getServletContext().getRealPath("/credentials"),relativeWebPath+namefile);
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
		file.delete();
	    //inserto en base de datos
		item.ListaEtiquetas = lista_etiquetas;
		item.PathImage=namefile;
	    item.ImageTitle=titulo;
	    item.URLImage = url;
	    item.Price=precio;
	    
	    if(itemurltipo.equals("-4")) {
	    	ic.create(item,lista_etiquetas, Integer.parseInt(decorador_id),-4);
	    } else {
	    	ic.create(item,lista_etiquetas, Integer.parseInt(decorador_id),-2);
	    }
	    
	    
	    
	    String padevolver=new Gson().toJson(ic.getItems(Integer.parseInt(decorador_id)).get(0).itemLDC_id);
	    System.out.print(padevolver);

	    //String completo="{\"id\":\""+padevolver+"\", \"nombre\":\""+namefile+"\"}";
	    response.sendRedirect("loadItems.html?id="+padevolver+"&nombre="+namefile+"&fondos=no&url="+url);

	}
}
