package sarandon.decotheco.ldlc;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

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
public class CreateFromExtension  extends HttpServlet {
	private final static Logger log = Logger.getLogger(dataBBDD.class);

	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.info("class CreateFromExtension");
		ItemLDLC item = new ItemLDLC();
		ItemController ic = new ItemController();

		String titulo = request.getParameter("itemtitulo").replaceAll("[\"']", "");
		String etiquetas = request.getParameter("itemetiquetas").replaceAll("[\"']", "");
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
		String custom_price = request.getParameter("custom_price").replace(',','.');
		
		String url = request.getParameter("itemurl");
		String urlimage = request.getParameter("itemurlimage");
		String decorador_id = request.getParameter("decorador_id");
		String itemurltipo = request.getParameter("itemurltipo");

		
	    //almaceno el archivo en disco
	    String namefile = decorador_id+"-"+System.currentTimeMillis()+".";
	    
	   // System.out.println(Config.directory_items+File.separator+namefile);
	    
	    String relativeWebPath = "ldlc/items/";
		//String absoluteDiskPath = getServletContext().getRealPath(relativeWebPath)+File.separator;
	    String absoluteDiskPath = relativeWebPath;
		String destinationFile = absoluteDiskPath;
	     
	    
	    int error=0;
		//URL url_obj = new URL(urlimage); 

	    try {
		//final String urlStr = "http://www.earthtimes.org/newsimage/osteoderms-storing-minerals-helped-huge-dinosaurs-survive_3011.jpg";

    	URL urlFI = new URL(urlimage);
		URLConnection connection = urlFI.openConnection();
		connection.addRequestProperty ("User-Agent", "Mozilla / 5.0 (Windows NT 6.1; WOW64; rv: 25.0) Gecko / 20100101 Firefox / 25.0");
		InputStream is = connection.getInputStream();
		BufferedImage img = ImageIO.read(is);

		boolean hasAlpha = false;
	    hasAlpha =  img.getColorModel().hasAlpha();
	    if(hasAlpha) {
	    	namefile=namefile+"png";
			new S3Sample().insertarFicheroS3Extensionpng(img, getServletContext().getRealPath("/credentials"),absoluteDiskPath+namefile); 
	    } else {
	    	namefile=namefile+"jpg";
			BufferedImage convertedImg = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_INT_RGB);
		    convertedImg.getGraphics().drawImage(img, 0, 0, null);
			new S3Sample().insertarFicheroS3Extensionjpg(convertedImg, getServletContext().getRealPath("/credentials"),absoluteDiskPath+namefile);
	    }
	     
		/*//final String urlStr = "http://www.earthtimes.org/newsimage/osteoderms-storing-minerals-helped-huge-dinosaurs-survive_3011.jpg";
		URL urlFI = new URL(urlimage);
		InputStream is = urlFI.openStream();
		BufferedImage img = ImageIO.read(is);

		boolean hasAlpha = false;
	    hasAlpha =  img.getColorModel().hasAlpha();
	    if(hasAlpha) {
	    	namefile=namefile+"png";
			new S3Sample().insertarFicheroS3Extensionpng(img, getServletContext().getRealPath("/credentials"),absoluteDiskPath+namefile); 
	    } else {
	    	namefile=namefile+"jpg";
			BufferedImage convertedImg = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_INT_RGB);
		    convertedImg.getGraphics().drawImage(img, 0, 0, null);
			new S3Sample().insertarFicheroS3Extensionjpg(convertedImg, getServletContext().getRealPath("/credentials"),absoluteDiskPath+namefile);
	    }
		*/
		
		
		 
		
		
		
      //  BufferedImage img = ImageIO.read(url_obj);
         
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage()); 
			e.printStackTrace();
			error=1;
		}
/*        File file = new File(absoluteDiskPath+namefile);
        ImageIO.write(img, "jpg", file);*/

		
	    
	    if(error==0) {
	    	
	    	//etiquetas
			List<String> lista_etiquetas = new ArrayList<String>(Arrays.asList(etiquetas.split(",")));
		    
		    //inserto en base de datos
			item.ListaEtiquetas = lista_etiquetas;
			item.PathImage=namefile;
		    item.ImageTitle=titulo;
		    item.URLImage = url;
		    if (custom_price!="" && custom_price !=null && custom_price.length()>0 && Float.parseFloat(custom_price)>=0){
		    	item.Price=custom_price;
		    }else{
		    	item.Price=precio;
		    }
		    if(itemurltipo.equals("-4")) {
		    	ic.create(item,lista_etiquetas, Integer.parseInt(decorador_id),-4);
		    } else {
			    ic.create(item,lista_etiquetas, Integer.parseInt(decorador_id),-1);
		    }
		    
	    	response.sendRedirect("loadItems.html?id=1");
	    } else {
	    	response.sendRedirect("loadItems.html?id=3");
	    }


		
	}
}
