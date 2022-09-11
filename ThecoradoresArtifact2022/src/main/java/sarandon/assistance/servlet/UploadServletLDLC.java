package sarandon.assistance.servlet;

//Import required java libraries
import java.io.*;
import java.util.*;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.output.*;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.codec.binary.Base64;

import sarandon.assistance.servlet.more.S3Sample;
import sarandon.assistance.servlet.more.dataBBDD;


public class UploadServletLDLC extends HttpServlet {
	private final static Logger log = Logger.getLogger(UploadServletLDLC.class);
private boolean isMultipart;
private String filePath;
private int maxFileSize = 99999999 * 1024;
private int maxMemSize = 4 * 1024;
private File file ;
private String fileSavePath;
private String fileSavePathTemp;

//private static final String UPLOAD_DIRECTORY = "upload";

public void createDirectory(String user,  String proyecto) {
    fileSavePath = getServletContext().getRealPath("/") + File.separator + user+"/"+proyecto;/*save uploaded files to a 'Upload' directory in the web app*/
    if (!(new File(fileSavePath)).exists()) {
        (new File(fileSavePath)).mkdir();    // creates the directory if it does not exist        
    }
}

public void createDirectorybaseurl(String a, String b) {
	String absoluteDiskPath="";
	if(a.length()>0){
		String relativeWebPath = "/"+a+"/";
		absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
		File file = new File(absoluteDiskPath);
	    
	    if (!(new File(absoluteDiskPath)).exists()) {
	        (new File(absoluteDiskPath)).mkdir();    // creates the directory if it does not exist        
	    }
	    
	    if(b.length()>0){
			relativeWebPath = "/"+a+"/"+b+"/";
			absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
			file = new File(absoluteDiskPath);
		    
		    if (!(new File(absoluteDiskPath)).exists()) {
		        (new File(absoluteDiskPath)).mkdir();    // creates the directory if it does not exist        
		    }
		    
		    
		}
	}
	
	
    filePath=absoluteDiskPath;
    
}
public void createRouteldlcs() {
	String relativeWebPath = "/ldlcs/";
	String absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
	File file = new File(absoluteDiskPath);
    
    if (!(new File(absoluteDiskPath)).exists()) {
        (new File(absoluteDiskPath)).mkdir();    // creates the directory if it does not exist        
    }
    fileSavePathTemp=absoluteDiskPath;
}
public void init( ){
   // Get the file location where it would be stored.
  // filePath = 
         // getServletContext().getInitParameter("file-upload"); 
}
public void doPost(HttpServletRequest req, 
            HttpServletResponse response)
           throws ServletException, java.io.IOException {

	log.info("class UploadServletLDLC");
	InputStream in = null;
    FileOutputStream fos = null;
    try {
    	createRouteldlcs();
        HttpServletRequestWrapper wrappedRequest = new HttpServletRequestWrapper(req);
        InputStream is = wrappedRequest.getInputStream();
        StringWriter writer = new StringWriter();
        IOUtils.copy(is, writer, "UTF-8");
        String imageString = writer.toString();
        imageString = imageString.substring("data:image/png;base64,"
                .length());
        byte[] contentData = imageString.getBytes();
        
        byte[] decodedData = Base64.decodeBase64(contentData);
        String nombre= String.valueOf(System.currentTimeMillis()) + ".png";
        String imgName = fileSavePathTemp+"\\"+nombre;
        fos = new FileOutputStream(imgName);
        fos.write(decodedData);
        
        
        File file = File.createTempFile(nombre,".png");
        
        
        FileUtils.writeByteArrayToFile(file, decodedData);
        
        S3Sample s3= new S3Sample();
 	   String rutaImagen= s3.insertarFicheroS3(file,getServletContext().getRealPath("/credentials"),"ldlcs/"+nombre);
 	   file.delete();
        
        response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		
		try{
			jsonText=nombre;
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}
		response.getWriter().write((jsonText));
    } catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
        e.printStackTrace();
        String loggerMessage = "Upload image failed : "; 
    } finally {
        if (in != null) {
            in.close();
        }
        if (fos != null) {
            fos.close();
        }
    }
}
public void doGet(HttpServletRequest request, 
                    HttpServletResponse response)
     throws ServletException, java.io.IOException {
     
     throw new ServletException("GET method used with " +
             getClass( ).getName( )+": POST method required.");
} 
}
