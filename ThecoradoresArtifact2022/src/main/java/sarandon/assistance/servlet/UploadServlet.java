package sarandon.assistance.servlet;

import java.io.File;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.*;
import javax.servlet.http.*;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.HTMLDocument.Iterator;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;

import com.oreilly.servlet.multipart.MultipartParser;
import com.oreilly.servlet.multipart.Part;
import com.oreilly.servlet.multipart.FilePart;

public class UploadServlet extends HttpServlet {
	private final static Logger log = Logger.getLogger(UploadServlet.class);
    private String fileSavePath;
    private static final String UPLOAD_DIRECTORY = "upload";

    public void createDirectory(String user,  String proyecto) {
        fileSavePath = getServletContext().getRealPath("/") + File.separator + user+"/"+proyecto;/*save uploaded files to a 'Upload' directory in the web app*/
        if (!(new File(fileSavePath)).exists()) {
            (new File(fileSavePath)).mkdir();    // creates the directory if it does not exist        
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, java.io.IOException {
		log.info("class UploadServlet");
        Connection con = null;
        String proyectoAux="";
        String userAux="";
        List<FileItem> items;
        try {
            items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
            for (FileItem item : items) {
                if (item.isFormField()) {
                    // Process regular form field (input type="text|radio|checkbox|etc", select, etc).
                    String fieldname = item.getFieldName();
                    String fieldvalue = item.getString();
                    // ... (do your job here)
                    if(fieldname.equals("user")){
                    	userAux=fieldvalue;
                    }
                    if(fieldname.equals("proyecto")){
                    	proyectoAux=fieldvalue;
                    	createDirectory(userAux, userAux);
                    }
                    
                } else {
                    // Process form file field (input type="file").
                    String fieldname = item.getFieldName();
                    String filename = FilenameUtils.getName(item.getName()); 
                    InputStream filecontent = item.getInputStream();
                    // ... (do your job here)
                }
            }
        } catch (FileUploadException e1) {
            // TODO Auto-generated catch block
			log.error("ERROR en try catch:" + e1.getMessage());
            e1.printStackTrace();
        }
        /*
        String uid = request.getParameter("unique");
        String fullname = request.getParameter("fullname");
        log.info(fullname);
        String age = request.getParameter("age");
        String address = request.getParameter("address");
        String phonenumber = request.getParameter("phonenumber");*/
        String path = null;
        String message = null;
        String resp = "";
        int i = 1;
        resp += "<br>Here is information about uploaded files.<br>";

        try {
           /* DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/dropzone", "root", "root");

            String sql = "INSERT INTO details(u_id,name,age,address,phonenumber,path) values(?,?,?,?,?,?)";
            PreparedStatement statement = con.prepareStatement(sql);*/

            //##########################################################?//

            MultipartParser parser = new MultipartParser(request, 1024 * 1024 * 1024);  /* file limit size of 1GB*/
            Part _part;
            while ((_part = parser.readNextPart()) != null) {
                if (_part.isFile()) {
                    FilePart fPart = (FilePart) _part;  // get some info about the file
                    String name = fPart.getFileName();
                    if (name != null) {
                        long fileSize = fPart.writeTo(new File(fileSavePath));
                        resp += i++ + ". " + fPart.getFilePath() + "[" + fileSize / 1024 + " KB]<br>";
                    } else {
                        resp = "<br>The user did not upload a file for this part.";
                    }
                }
            }// end while 

            //##################################################################//
            /*statement.setString(1,"uid");
            statement.setString(2,"fullname");
            statement.setString(3,"age");
            statement.setString(4,"address");
            statement.setString(5,"phonenumber");
            statement.setString(6,"path");
            int row = statement.executeUpdate();
            if(row>0){
                message = "Contact saved";
            }*/

        } catch (Exception e) {
            // TODO Auto-generated catch block
			log.error("ERROR en try catch:" + e.getMessage());
            e.printStackTrace();
            message = "ERROR: " +e.getMessage();

        }
        finally
        {
            if(con !=null)
            {
                try{
                    con.close();

                }
                catch(SQLException ex)
                {
        			log.error("ERROR en try catch:" + ex.getMessage());
                    ex.printStackTrace();
                }
            }
            log.info(message);
           // request.setAttribute("Message",message);
           // getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }

    }
}