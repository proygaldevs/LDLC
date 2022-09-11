package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import sarandon.assistance.servlet.more.dataBBDD;

/**
 * Servlet implementation class getNews
 */
public class GetImages extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(GetImages.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetImages() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//ServletOutputStream output = response.getOutputStream();
		//String jsonText = "{\"name\":\"dHTML Examples\",\"site\":\"http://dhtmlexamples.com/\",\"properties\":{\"isBlog\":true,\"html5\":true,\"css3\":true, \"jQuery\":true, \"description\":\"mediocre blog\"}}";
		//String jsonText = Utils.readFile("/Users/raul/Documents/NC/iPhone/Hoteles/apache-tomcat-6.0.33/webapps/hs5/docs/promociones.json");
		//String jsonText = Utils.readFile("c:/produccion/servidores/apache-tomcat-6.0.20/webapps/hs5/docs/promociones.json");

//		String jsonText = Utils.readFile("/Users/raul/Desktop/Hoteles/apache-tomcat-6.0.33/webapps/hs5/docs/promociones.json");
		
		String paso1 = request.getParameter("paso1");
		String paso2 = request.getParameter("paso2");
		String paso3 = request.getParameter("paso3");
		String paso4 = request.getParameter("paso4");
		String paso5 = request.getParameter("paso5");
		
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{
			jsonText=hht.getImagenesJson(paso1, paso2, paso3, paso4, paso5);
			log.info(jsonText);
			
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage()); 
			jsonText="FALLO"+e.getMessage();
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
