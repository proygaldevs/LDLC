package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.Preferencia;

/**
 * Servlet implementation class getNews
 */
public class DeleteProject extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(DeleteProject.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteProject() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		log.info("class DeleteProject");
		
		String id_project_string=request.getParameter("id_proyecto");
		int id_project = Integer.parseInt(id_project_string);
		
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{
			
			jsonText=""+hht.eliminaProject(id_project); 
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
		String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");
		// TODO Auto-generated method stub
	
		doGet(request,response);
	}

}
