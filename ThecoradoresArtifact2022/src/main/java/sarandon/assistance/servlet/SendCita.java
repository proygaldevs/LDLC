package sarandon.assistance.servlet; 
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.Cita;
import sarandon.assistance.vo.Informacion;
import sarandon.assistance.vo.MailObject;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Proyecto;

/**
 * Servlet implementation class getNews
 */
public class SendCita extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SendCita.class); 
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendCita() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		log.info("class SendCita");
		// TODO Auto-generated method stub
		
	
		String toMail = request.getParameter("toMail");
		
		 
		String contentParam= request.getParameter("content");
		
		Gson gson = new Gson();  
		
		String contenido = request.getParameter("contenido");
		int id_proyecto = Integer.parseInt(request.getParameter("id_proyecto"));
		String idProyecto = request.getParameter("id_proyecto");
		int skype = Integer.parseInt(request.getParameter("skype"));
		String fecha = request.getParameter("fecha");
		String hora = request.getParameter("hora");
		
		
		SimpleDateFormat sdfSource1 = new SimpleDateFormat(
                "dd/MM/yyyy");
		SimpleDateFormat sdfSource2 = new SimpleDateFormat(
                "yyyy-MM-dd");
		
		Date date = null;
		try {
		   
		    date = sdfSource2.parse(fecha);
		    if (!fecha.equals(sdfSource2.format(date))) {
		        date = null;
		    }
		} catch (ParseException ex) {
			log.error("ERROR en try catch:" + ex.getMessage());
		}
		if (date == null) {
		    // Invalid date format
			try{
				Date date2 = sdfSource1.parse(fecha);
				String formattedDate2 = sdfSource2.format(date2);
				fecha=formattedDate2;
			}catch(ParseException ex){

				log.error("ERROR en try catch:" + ex.getMessage());
			}
			
		} else {
		    // Valid date format
		}
		
		Cita c= new Cita(id_proyecto, fecha, hora, skype, contenido);
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = ""; 
		dataBBDD dbo = new dataBBDD();
		try{
			Proyecto p = new Proyecto();
			 p = new CoreImpl().getProyectoBasicById(id_proyecto); 
			String contentMail[]= {"decoradorPaso2",p.nombreProyectDecorador};
			
			Mail hhtMail = new Mail();
			try{
				int a = hhtMail.sendMail( toMail, "info@decotheco.com", "Tienes una cita pendiente - Decotheco", contentMail);
				hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Tienes una cita pendiente - Decotheco", contentMail);
				hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Tienes una cita pendiente - Decotheco", contentMail);
				if(a!=-1){
					jsonText=""+dbo.setCita(c);
				}else{
					jsonText="-1";
				};
				log.info(jsonText);
			}catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage());
			} 
			
			
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
