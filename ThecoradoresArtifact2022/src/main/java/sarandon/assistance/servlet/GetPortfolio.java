package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;


import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.dataBBDD;


/**
 * Servlet implementation class getNews
 */
public class GetPortfolio extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(GetPortfolio.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetPortfolio() {
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

		String carpeta = request.getParameter("tipo");
		String lista = request.getParameter("lista");
		
		
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		
		try{
			String absoluteDiskPath="";
				String relativeWebPath = "/";
				absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
				absoluteDiskPath=absoluteDiskPath+"portfolio\\";
			if(carpeta==null) {
				jsonText=hht.getPortfolioJson(absoluteDiskPath);
			} else if(carpeta.equalsIgnoreCase("Decoradores")) {
				if(lista.equals("proyectos")) {
					// NOS DEVUELVE 5 DECORADORES (1 DE NUESTRA PLANTILLA)
					jsonText =hht.getPortfolioJson( getServletContext().getRealPath("/credentials"));
				} else {
					// NOS DEVUELVE TODOS LOS DECORADORES
					jsonText =hht.getPortfolioJsonAll( getServletContext().getRealPath("/credentials"));
				}
				log.info(jsonText);
			}
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage()); 
			//trans.rollback();
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
