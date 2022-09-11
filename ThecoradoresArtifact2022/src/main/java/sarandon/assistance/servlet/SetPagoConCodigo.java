package sarandon.assistance.servlet;

import java.io.IOException;

import javax.crypto.spec.IvParameterSpec;
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
import sarandon.assistance.vo.PagoVO;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Proyecto;

/**
 * Servlet implementation class getNews
 */
public class SetPagoConCodigo extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SetPagoConCodigo.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetPagoConCodigo() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		log.info("class SetPagoConCodigo");

		String id_project_string=request.getParameter("id_proyecto");
		
		String codigo=request.getParameter("codigo");
		String mail=request.getParameter("mail");
		int id_projecto = Integer.parseInt(id_project_string);
	
		
		
		
		
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{
			
			if(hht.setRegaloUsado(codigo, id_projecto)!=-1){
				if(hht.setProyectoPagado(id_projecto,1)==1){
					jsonText="1";
					
					
					
				}else{
					Proyecto p = new Proyecto();
					p = new CoreImpl().getProyectoBasicById(id_projecto);
					jsonText="0";
					// PAGO CON CODIGO EMAIL
					String content4[]= {"compraNormalCodigo","","",p.tituloProyecto};
					Mail hht4 = new Mail();
					try{
						 hht4.sendMail(mail, "info@decotheco.com", "Uso de un pack Deco", content4); 
						 hht4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Uso de un pack Deco", content4);
						 hht4.sendMail( "info@decotheco.com", "info@decotheco.com", "Uso de un pack Deco", content4);
						 
					}catch(Exception e){
						log.error("ERROR en try catch:" + e.getMessage());
					}
				}
			}else{
				jsonText="1";
			}
			
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}
		Gson gson = new Gson();
		response.getWriter().write((gson.toJson(jsonText)));
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
