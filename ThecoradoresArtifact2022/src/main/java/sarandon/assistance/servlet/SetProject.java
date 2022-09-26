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
public class SetProject extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SetProject.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetProject() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		// TODO Auto-generated method stub

		log.info("class SetProject");
		String paso1 = request.getParameter("paso1");
		String paso2 = request.getParameter("paso2");
		String paso3 = request.getParameter("paso3");
		String paso4 = request.getParameter("paso4");
		String paso5 = request.getParameter("paso5");
		String id_moodboard = request.getParameter("id_moodboard");
		String id_project_string=request.getParameter("id_proyecto");
		int id_project = Integer.parseInt(id_project_string);
		String aux_decorador_seleccionado= request.getParameter("id_decorador_seleccionado");
		
			int id_decorador_seleccionado=-1;
		try{
			
			id_decorador_seleccionado= Integer.parseInt(aux_decorador_seleccionado);
		}catch (Exception e) {
			// TODO: handle exception
			id_decorador_seleccionado=-1; 
		}
		

		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{
			Preferencia p= new Preferencia(paso1,paso2,paso3,paso4,paso5,id_moodboard,id_project);
			jsonText=""+hht.setProjectJson(p,id_decorador_seleccionado);
			log.info(jsonText);
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
			throw new ServletException(e);
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
