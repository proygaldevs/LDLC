package sarandon.assistance.servlet;

//Import required java libraries
import java.io.*;
import java.util.*;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.output.*;
import org.apache.log4j.Logger;

import sarandon.assistance.servlet.more.S3Sample;
import sarandon.assistance.servlet.more.dataBBDD;

public class FileUploadHandler extends HttpServlet {
	private final static Logger log = Logger.getLogger(FileUploadHandler.class);
private boolean isMultipart;
private String filePath;
private int maxFileSize = 100000 * 1024;
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

public String getUtl(String a, String b,String c,String d) {
	return a+"/"+b+"/"+c+"/"+d+"/";
	
}
public void createDirectorybaseurl(String a, String b,String c,String d) {
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
		    
		    if(c.length()>0){
				relativeWebPath = "/"+a+"/"+b+"/"+c+"/";
				absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
				file = new File(absoluteDiskPath);
			    
			    if (!(new File(absoluteDiskPath)).exists()) {
			        (new File(absoluteDiskPath)).mkdir();    // creates the directory if it does not exist        
			    }
			    
			    if(d.length()>0){
					relativeWebPath = "/"+a+"/"+b+"/"+c+"/"+d+"/";
					absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
					file = new File(absoluteDiskPath);
				    
				    if (!(new File(absoluteDiskPath)).exists()) {
				        (new File(absoluteDiskPath)).mkdir();    // creates the directory if it does not exist        
				    }
				    
				    
				}
			    
			}
		    
		}
	}
	
	
    filePath=absoluteDiskPath;
    
}
public void createTemp() {
	String relativeWebPath = "/temp/";
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
public void doPost(HttpServletRequest request, 
            HttpServletResponse response)
           throws ServletException, java.io.IOException {
	String user = request.getParameter("user");
	String proyecto = request.getParameter("proyecto");
	String seccion = request.getParameter("seccion");
	String ruta = request.getParameter("ruta");
	
	
	
	String pathquenoexista="";
   // Check that we have a file upload request
	createDirectorybaseurl("usuarios",user,proyecto,seccion);
	String rutaquenecesito=getUtl("usuarios",user,proyecto,seccion);
   isMultipart = ServletFileUpload.isMultipartContent(request);
   response.setContentType("text/html");

   DiskFileItemFactory factory = new DiskFileItemFactory();
   // maximum size that will be stored in memory
   factory.setSizeThreshold(maxMemSize);
   // Location to save data that is larger than maxMemSize.
   createTemp();
   factory.setRepository(new File(fileSavePathTemp));

   // Create a new file upload handler
   ServletFileUpload upload = new ServletFileUpload(factory);
   // maximum file size to be uploaded.
   upload.setSizeMax( maxFileSize );
   String pathauxtohere="";
   try{ 
   // Parse the request to get file items.
   List fileItems = upload.parseRequest(request);
	
   // Process the uploaded file items
   Iterator i = fileItems.iterator();
   
  
   while ( i.hasNext () ) 
   {
      FileItem fi = (FileItem)i.next();
      if ( !fi.isFormField () )	
      {
         // Get the uploaded file parameters
         String fieldName = fi.getFieldName();
         String fileName = fi.getName();
         dataBBDD bbdd= new dataBBDD();
         fileName=bbdd.remove1(fileName);
         String contentType = fi.getContentType();
         boolean isInMemory = fi.isInMemory();
         long sizeInBytes = fi.getSize();
         // Write the file
         if( fileName.lastIndexOf("\\") >= 0 ){
        	 pathauxtohere=
     	            fileName.substring( fileName.lastIndexOf("\\"));
        	 int cont=2;
        	 pathquenoexista=filePath + "\\"+
        	            fileName.substring( fileName.lastIndexOf("\\"));
        	 while(new File(pathquenoexista).exists()){
        		 pathauxtohere=cont+"-"+
          	            fileName.substring( fileName.lastIndexOf("\\"));
        		 pathquenoexista=filePath + "\\"+pathauxtohere;
        		 cont++;
             }
            file = new File(pathquenoexista) ;
         }else{
        	 pathauxtohere=
     	            fileName.substring(fileName.lastIndexOf("\\")+1);
        	 int cont=2;
        	  pathquenoexista=filePath + "\\"+
        	            fileName.substring(fileName.lastIndexOf("\\")+1);
        	 while(new File(pathquenoexista).exists()){
        		 pathauxtohere=cont+"-"+
     		            fileName.substring(fileName.lastIndexOf("\\")+1);
        		 pathquenoexista=filePath + "\\"+pathauxtohere;
        		 cont++;
             }
            file = new File(pathquenoexista) ;
            
         }
         
         
         fi.write( file ) ;
      }
   }

}catch(Exception ex) {

	log.error("ERROR en try catch:" + ex.getMessage()); 
}
   String rutaImagen="";
   
	   S3Sample s3= new S3Sample();
	   if(ruta!=null)
		try {
			rutaImagen= s3.insertarFicheroS3(file,getServletContext().getRealPath("/credentials"),ruta);
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage()); 
			e.printStackTrace();
		}
	else
		try {
			rutaImagen= s3.insertarFicheroS3(file,getServletContext().getRealPath("/credentials"),rutaquenecesito+pathauxtohere);
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage());
			e.printStackTrace();
		}
	   
	   file.delete();
  
   response.getWriter().write((pathauxtohere));
}
public void doGet(HttpServletRequest request, 
                    HttpServletResponse response)
     throws ServletException, java.io.IOException {
     
     throw new ServletException("GET method used with " +
             getClass( ).getName( )+": POST method required.");
} 
}
