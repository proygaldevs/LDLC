package sarandon.assistance.servlet;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import sarandon.assistance.servlet.more.S3Sample;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.Preferencia;

/**
 * Servlet implementation class getNews
 */
public class RemoveFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(RemoveFile.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoveFile() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		log.info("class RemoveFile");
		String ruta= request.getParameter("ruta");
		String user = request.getParameter("user");
		String proyecto = request.getParameter("proyecto");
		String seccion = request.getParameter("seccion");
		String fichero = request.getParameter("fichero");
		
		
		
		 request.setCharacterEncoding("utf8");
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		String absoluteDiskPath="";
		/*try{
			String relativeWebPath = "/usuarios/"+user+"/"+proyecto+"/"+seccion+"/"+fichero;
			absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
			File file = new File(absoluteDiskPath);
		    
		    if ((new File(absoluteDiskPath)).exists()) {
		    	file.delete();
		    }
			
			jsonText="0";
			log.info(jsonText);
		}catch(Exception e){
			System.out.println(e.getMessage()); log.error(e.getMessage());
			jsonText="-1";
		}*/
		try{
			String relativeWebPath = "usuarios/"+user+"/"+proyecto+"/"+seccion+"/"+fichero;
			 S3Sample s3= new S3Sample();
			 int rutaImagen=-1;
			 if(ruta!=null){
				  rutaImagen= s3.deleteFile(getServletContext().getRealPath("/credentials"),ruta);
			 }
			 else{
				  rutaImagen= s3.deleteFile(getServletContext().getRealPath("/credentials"),relativeWebPath);
			 }
		 	 

			jsonText=""+rutaImagen; 
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
			jsonText="-1";
		}
		response.getWriter().write((jsonText));
		//output.write(jsonText.getBytes());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");
		// TODO Auto-generated method stub
	
		doGet(request,response);
	}

}
