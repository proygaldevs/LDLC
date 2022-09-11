package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.Informacion;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Proyecto;

/**
 * Servlet implementation class getNews
 */
public class SetInformacion extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SetInformacion.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetInformacion() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		

		log.info("class SetInformacion");
		// TODO Auto-generated method stub
		Informacion info= new Informacion();
		info.id_proyecto = Integer.parseInt(request.getParameter("id_proyecto"));
		String idProyecto = request.getParameter("id_proyecto");
		int id_Proyecto = Integer.parseInt(request.getParameter("id_proyecto"));
		String mailDecorador = request.getParameter("mailDecorador");
		info.habitacion = request.getParameter("habitacion");
		info.en_mente = request.getParameter("en_mente");
		info.prioridad_1 = Integer.parseInt(request.getParameter("prioridad_1"));
		info.prioridad_2 = Integer.parseInt(request.getParameter("prioridad_2"));
		info.prioridad_3 = Integer.parseInt(request.getParameter("prioridad_3"));
		info.prioridad_4 = Integer.parseInt(request.getParameter("prioridad_4"));
		info.prioridad_5 = Integer.parseInt(request.getParameter("prioridad_5"));
		info.prioridad_6 = Integer.parseInt(request.getParameter("prioridad_6"));
		info.inspiracion_1 = request.getParameter("inspiracion_1");
		info.inspiracion_2 = request.getParameter("inspiracion_2");
		info.inspiracion_3 = request.getParameter("inspiracion_3");
		info.usos_1 = Integer.parseInt(request.getParameter("usos_1"));
		info.usos_2 = Integer.parseInt(request.getParameter("usos_2"));
		info.usos_3 = Integer.parseInt(request.getParameter("usos_3"));
		info.usos_4 = Integer.parseInt(request.getParameter("usos_4"));
		info.usos_5 = Integer.parseInt(request.getParameter("usos_5"));
		info.usos_6 = Integer.parseInt(request.getParameter("usos_6"));
		info.asientos_1 = Integer.parseInt(request.getParameter("asientos_1"));
		info.asientos_2 = Integer.parseInt(request.getParameter("asientos_2"));
		info.asientos_3 = Integer.parseInt(request.getParameter("asientos_3"));
		info.asientos_4 = Integer.parseInt(request.getParameter("asientos_4"));
		info.asientos_5 = Integer.parseInt(request.getParameter("asientos_5"));
		info.asientos_6 = Integer.parseInt(request.getParameter("asientos_6"));
		info.auxiliares_1 = Integer.parseInt(request.getParameter("auxiliares_1"));
		info.auxiliares_2 = Integer.parseInt(request.getParameter("auxiliares_2"));
		info.auxiliares_3 = Integer.parseInt(request.getParameter("auxiliares_3"));
		info.auxiliares_4 = Integer.parseInt(request.getParameter("auxiliares_4"));
		info.auxiliares_5 = Integer.parseInt(request.getParameter("auxiliares_5"));
		info.almacenaje_1 = Integer.parseInt(request.getParameter("almacenaje_1"));
		info.almacenaje_2 = Integer.parseInt(request.getParameter("almacenaje_2"));
		info.almacenaje_3 = Integer.parseInt(request.getParameter("almacenaje_3"));
		info.almacenaje_4 = Integer.parseInt(request.getParameter("almacenaje_4"));
		info.almacenaje_5 = Integer.parseInt(request.getParameter("almacenaje_5"));
		info.deco_1 = Integer.parseInt(request.getParameter("deco_1"));
		info.deco_2 = Integer.parseInt(request.getParameter("deco_2"));
		info.deco_3 = Integer.parseInt(request.getParameter("deco_3"));
		info.deco_4 = Integer.parseInt(request.getParameter("deco_4"));
		info.deco_5 = Integer.parseInt(request.getParameter("deco_5"));
		info.elementos_extra = request.getParameter("elementos_extra");
		info.imprescindibles_url_1 = request.getParameter("imprescindibles_url_1");
		info.imprescindibles_url_2 = request.getParameter("imprescindibles_url_2");
		info.imprescindibles_url_3 = request.getParameter("imprescindibles_url_3");
		info.otra_necesidad = request.getParameter("otra_necesidad");
		info.diy_1 = request.getParameter("diy_1");
		info.diy_2 = request.getParameter("diy_2");
		info.diy_3 = request.getParameter("diy_3");
		info.suelo = Integer.parseInt(request.getParameter("suelo"));
		info.pintura = Integer.parseInt(request.getParameter("pintura"));
		info.no_quiero = request.getParameter("no_quiero");
		info.medidas_ancho = request.getParameter("medidas_ancho");
		info.medidas_alto = request.getParameter("medidas_alto");
		info.presupuesto = request.getParameter("presupuesto");
		info.extra_otras_cosas=request.getParameter("extra_otras_cosas");
		info.ventanas_1 = Integer.parseInt(request.getParameter("ventanas_1"));
		info.ventanas_2 = Integer.parseInt(request.getParameter("ventanas_2"));
		info.ventanas_3 = Integer.parseInt(request.getParameter("ventanas_3")); 
		int estado = Integer.parseInt(request.getParameter("estado"));
		String cambio_estado_string=request.getParameter("cambio_estado");
		int cambio_estado=0;
		try{
			if(cambio_estado_string.equalsIgnoreCase("true")){
				cambio_estado=1;
			} else {
				cambio_estado=0;
			}
		}catch (Exception e) {
			cambio_estado=0;
		}
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{				
			Proyecto p = new Proyecto();
			 p = new CoreImpl().getProyectoBasicById(id_Proyecto);  
			jsonText=""+hht.setInfo(info,cambio_estado);
			if(cambio_estado==1 && estado==11){
				String content[]= {"decoradorPaso1",p.nombreProyectDecorador};
			Mail hhtMail = new Mail();
			try{

				int devuelve = hhtMail.sendMail( mailDecorador, "info@decotheco.com", "Proyecto en Paso 1", content);
				try{ 
					hhtMail.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Proyecto en Paso 1", content);
					hhtMail.sendMail( "info@decotheco.com", "info@decotheco.com", "Proyecto en Paso 1", content);
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
				}
				 
			}catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage());
			}
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
