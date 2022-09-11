package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.Informacion;
import sarandon.assistance.vo.MailObject;
import sarandon.assistance.vo.Preferencia;
import sarandon.decotheco.thecoradores.bean.Trabajos;

/**
 * Servlet implementation class getNews
 */
public class SendMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SendMail.class); 
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendMail() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		

		log.info("class SendMail");
		String toMail = request.getParameter("toMail");
		String fromMail = request.getParameter("fromMail");
		String subject = request.getParameter("subject"); 
		String contentParam= request.getParameter("content");
		
		 
		
		String content[]= {"mensajeContacto", contentParam};

		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		// MAIL DESDE CONTACTO WEB Y SOBRES
		Mail hht = new Mail();
		try{
			jsonText=""+hht.sendMail( toMail, fromMail, subject, content);
			jsonText=""+hht.sendMail( "dcotheco@gmail.com", fromMail, subject, content);
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
