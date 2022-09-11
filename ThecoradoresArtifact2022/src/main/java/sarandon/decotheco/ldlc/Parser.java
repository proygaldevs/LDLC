package sarandon.decotheco.ldlc;


import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.apache.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.decotheco.ldlc.model.ItemLDLC;


/**
 * Contiene métodos para parsear una página web, extrayendo imágenes y precios asociados.
 * @author carlos
 *
 */
public class Parser {
	private final static Logger log = Logger.getLogger(dataBBDD.class);
	public static int min_width= 140;
	public static int min_height= 140;
	
	/**
	 * Atributos de la clase
	 */
	public List<ItemLDLC> listaImagenes = new ArrayList<ItemLDLC>();
	public String pageTitle = new String();
	public List<String> listaPrecios = new ArrayList<String>(); //contiene precios sin duplicados 
	
	
	/**
	 * Parsea la página asignando valor a los atributos de la clase.
	 * @param URL
	 * @return
	 */
	public int run(String URL){
		//System.out.println("run "+URL);
		
		try {
			URL =URLDecoder.decode(URL, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			log.error("ERROR en try catch:" + e1.getMessage());
			e1.printStackTrace();
		}
		
		//System.out.println("run decoded: "+URL);
		
		int salida=0;
		String html=new String();
		listaImagenes = new ArrayList<ItemLDLC>();
		
		try {
			html = Jsoup.connect(URL).followRedirects(false).get().html();

			URL url_page = new URL(URL);
			String base = url_page.getProtocol() + "://" + url_page.getHost() ;
			//System.out.println("base "+base);
			
			//System.out.println(html);
			Document doc = Jsoup.parse(html);
				
	        
	        pageTitle = doc.title();
	        //System.out.println("pageTitle " + pageTitle);
			
			String regex = "^(?!€*$)(€ ?(?!.*€)(?=,?\\d))?\\-?([1-9]{1,3}( \\d{3})*|[1-9]{1,3}(\\.\\d{3})*|(0|([1-9]\\d*)?))(,[0-9]{2})(\\s*?€)?";
			regex="((?:[1-9](\\d{0}|\\d{1}|\\d{2}|\\d{3}|\\d{4}|\\d{5}))([,.]\\d{2})*)(\\s*€|\\s*EUR)";
			
			//System.out.println("EUR " + doc.select("div:contains(^(?!€*$)(€ ?(?!.*€)(?=,?\\d))?\\-?([1-9]{1,3}( \\d{3})*|[1-9]{1,3}(\\.\\d{3})*|(0|([1-9]\\d*)?))(,[0-9]{2})?( ?€)?$)"));
			//System.out.println("EUR " + doc.select("div:contains(€)").get(0));
		
			Elements nodos_imagen = doc.select("img");
			for (int k=0; k<nodos_imagen.size(); k++){ //para todos los nodos donde haya imagen busco el nodo con precio
				
				//System.out.println("nodo: " +base+ nodos_imagen.get(k).attr("src"));

				//String url_image =  nodos_imagen.get(k).absUrl("src"); No funciona a pesar de que es la forma "oficial" con jsoup
				String url_image =new String();
				if (nodos_imagen.get(k).attr("src").startsWith("http")){
					url_image= nodos_imagen.get(k).attr("src");
				}else{
					url_image=base+ nodos_imagen.get(k).attr("src");
				}
				
				//proceso normal después de extraer la URL de la imagen
				if (url_image!=null && url_image!="" && url_image.contains("?")){//limpio posibles parámetros
					url_image =  url_image.substring(0,url_image.lastIndexOf("?"));
				}
				
				//System.out.println("imageURL " + url_image);
				if (url_image.toLowerCase().endsWith(".jpg") || url_image.toLowerCase().endsWith(".jpeg") || url_image.toLowerCase().endsWith(".png")){
				    URL url=new URL(url_image);
				    BufferedImage image = ImageIO.read(url);
				    int height = image.getHeight();
				    int width = image.getWidth();
				    
				    if (height>min_height && width>min_width){
				    	ItemLDLC ildc = new ItemLDLC();
				    	ildc.URLImage = url_image;
						//System.out.println("imageURL " + url_image);
				    	
				    	//titulo de la imagen
				    	ildc.ImageTitle = pageTitle;
				    	//System.out.println("imageTitle " + pageTitle);
				    	
				    	//busco el precio
						if (null!=nodos_imagen.get(k).parent().parent().select("div:matchesOwn(((?:[1-9](\\d{0}|\\d{1}|\\d{2}|\\d{3}|\\d{4}|\\d{5}))([,.]\\d{2})*)(\\s*€|\\s*EUR)")){
							//System.out.println("Patterm11: " + nodos_imagen.get(k).parent().parent());
							
							Pattern pattern = Pattern.compile(regex);
							Matcher matcher = pattern.matcher(nodos_imagen.get(k).parent().parent().text());
							if (matcher.find())
							{
							    ildc.Price=matcher.group(1);
							    //System.out.println("Precio: " + matcher.group(1));
							}
							
						}
						
						//todo: buscar en span, p, li
				    	
				    	
				    	listaImagenes.add(ildc);
				    	salida = 1;
				    }
				}
			}
			//System.out.println("Imágenes: " + nodos_imagen.size());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			log.error("ERROR en try catch:" + e.getMessage());
		}
		
		//creo la lista de precios sin duplicados
		listaPrecios = new ArrayList<String>();
		for (int i=0; i<listaImagenes.size(); i++){
			if (!listaPrecios.contains(listaImagenes.get(i).Price)){
				listaPrecios.add(listaImagenes.get(i).Price);
			}
		}
		
		return salida;

	}

}
