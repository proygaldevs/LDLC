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
public class GetUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(GetUser.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUser() {
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
		
		String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");
		String detail_level_String = request.getParameter("detail_level");
		int detail_level=-1;
		try{
			detail_level=Integer.parseInt(detail_level_String);
		}catch (Exception e) {
			detail_level=-1;
		}
		int id_proyecto=-1;
		try{
			id_proyecto=Integer.parseInt(request.getParameter("id_proyecto"));
		}catch (Exception e) {
			id_proyecto=-1;
		}
		
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{
			String absoluteDiskPath="";
				String relativeWebPath = "/";
				//absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
				String sux = getServletContext().getRealPath("/");
				String sux2 = getServletContext().getRealPath("\\");
				String sux3 = getServletContext().getRealPath("");
				String sux4 = getServletContext().getRealPath("/credentials");
			jsonText=hht.getLoginJson(mail, pass, detail_level,id_proyecto,getServletContext().getRealPath("/credentials"));
			log.info(jsonText);
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage()); 
		}
		response.getWriter().write((jsonText));
		//output.write(jsonText.getBytes());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/*String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");*/
		// TODO Auto-generated method stub
	
		doGet(request,response);
	}

}
