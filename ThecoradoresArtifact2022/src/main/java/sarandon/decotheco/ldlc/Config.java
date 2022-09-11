package sarandon.decotheco.ldlc;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

import sarandon.assistance.servlet.more.dataBBDD;



public class Config {
	//public static final String config_properties="conf"+File.separator+"config.properties";
	private final static Logger log = Logger.getLogger(dataBBDD.class);
	//configuracion database (no va en fichero .properties)
	/*
	public static String db_URL = "jdbc:mysql://localhost:3306/petitecandela";
	public static String db_user ="petitecandela";
	public static String db_password ="petitecandela";
	*/
	
	/*public static String db_URL = "jdbc:mysql://decothecodesa.c7zr3sw50viy.eu-west-1.rds.amazonaws.com:3306/decotheco";
	public static String db_user ="decothecoPRE";
	public static String db_password ="D265y2PO";*/

	/*	public static String directory_items="C:"+File.separator+"Users"+File.separator+"carlos"+File.separator+"git"+File.separator+"ThecoradoresArtifact"+File.separator+"WebContent"+File.separator+"items";//"C:"+File.separator+"wamp"+File.separator+"www"+File.separator+"petitecandela"+File.separator+"items";
	public static String URL_base="http://localhost:8080/ThecoradoresArtifact";//"http://192.168.1.102/petitecandela";	
	public static String URL_items=URL_base+"/items/";
	
	public static String directory_mobiliario="C:"+File.separator+"Users"+File.separator+"carlos"+File.separator+"git"+File.separator+"ThecoradoresArtifact"+File.separator+"WebContent"+File.separator+"img"+File.separator+"mobiliario";
	public static String directory_complementos="C:"+File.separator+"Users"+File.separator+"carlos"+File.separator+"git"+File.separator+"ThecoradoresArtifact"+File.separator+"WebContent"+File.separator+"img"+File.separator+"complementos";
	public static String directory_extras="C:"+File.separator+"Users"+File.separator+"carlos"+File.separator+"git"+File.separator+"ThecoradoresArtifact"+File.separator+"WebContent"+File.separator+"img"+File.separator+"extras";
	*/
	//public static String directory_items="/Users/Co/git/ThecoradoresArtifact/WebContent/items";
	
	//public static String directory_items="C:"+File.separator+"Program Files"+File.separator+"Apache Software Foundation"+File.separator+"Tomcat 8.0"+File.separator+"wtpwebapps"+File.separator+"ThecoradoresArtifact"+File.separator+"items";
	//public static String URL_base="http://localhost:8080";//"http://desa.services.decotheco.com";"http://192.168.1.102/petitecandela";	
	
	/*public static String directory_mobiliario="/Users/Co/git/ThecoradoresArtifact/WebContent/img/mobiliario";
	public static String directory_complementos="/Users/Co/git/ThecoradoresArtifact/WebContent/img/complementos";
	public static String directory_extras="/Users/Co/git/ThecoradoresArtifact/WebContent/img/extras";*/
	
/*	public static String directory_mobiliario="img"+File.separator+"mobiliario";
	public static String directory_complementos="img"+File.separator+"complementos";
	public static String directory_extras="img"+File.separator+"extras";
*/
	

	

	//resto de variable de configuracion
	
	
	
	
	public Config(){
		//cargarConfiguracionInicial();
	}
	
	
	
    /**
     * Carga los valores del fichero de propiedades en el directorio conf en las variables estaticas de esta clase.
     */
    public void cargarConfiguracionInicial(){
    	Properties prop = new Properties();
    	InputStream input = null;
    	try {
    		//input = new FileInputStream(config_properties);
    		//prop.load(input);
    		//get the property value
        	
        	//this.db_URL= prop.getProperty("db_URL");
        	//this.db_user= prop.getProperty("db_user");
        	//this.db_password= prop.getProperty("db_password");
    		
    	} catch (Exception ex) {
			log.error("ERROR en try catch:" + ex.getMessage());
    		ex.printStackTrace();
    	} finally {
    		if (input != null) {
    			try {
    				input.close();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    		}
    	}
    	
    	
    }
	
	
}
