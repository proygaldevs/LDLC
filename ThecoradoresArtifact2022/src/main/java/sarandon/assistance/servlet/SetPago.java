package sarandon.assistance.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import sarandon.assistance.model.Core;
import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.PagoVO;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Proyecto;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;

/**
 * Servlet implementation class getNews
 */
public class SetPago extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SetPago.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetPago() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		log.info("class SetPago");
		String id_project_string=request.getParameter("id_proyecto");
		String mail=request.getParameter("mail");
		String codigo=request.getParameter("codigo");
		Float precio;
		String total_string=request.getParameter("total");
		Float total;
		Float valor;
		try{ 
			total = Float.parseFloat(total_string);
			precio = Float.parseFloat(total_string);
			valor = Float.parseFloat(total_string);
		} catch (Exception e) {
			// TODO: handle exception
			total=(float) 0;
			precio=(float) 0;
			valor = (float) 0;
		}
		
		
		String tipo=request.getParameter("tipo");
		int tipo_int=0;
		try{
			tipo_int = Integer.parseInt(tipo);
		}catch (Exception e) {
			// TODO: handle exception
			tipo_int=2;
		}
		String jsonText = "";
		// si no es un piso entra aquí
		if(tipo_int!=99) {
			String concepto=request.getParameter("concepto");
			int id_projecto = Integer.parseInt(id_project_string); 
			request.setCharacterEncoding("utf8");
			response.setCharacterEncoding("utf8");
			dataBBDD hht = new dataBBDD();
			ProjectsTypes pt= null;
				try{ 
					Core c = new CoreImpl();
					pt=c.getProjectType(tipo_int);
					Boolean pagado=c.isPagado(id_projecto);
					// Vamos a verificar si el idProyecto que trae desde cliente es un proyecto pagado o no 
					if(pagado) { 
						// Obtenemos proyecto null
						Proyecto proyecto=null;
						proyecto=c.getProyectoBasicById(id_projecto);
						id_projecto=c.getProjectNullByIdUser(proyecto.id_user);
						if(id_projecto==0) {
							// si devuelve 0 hubo un error
							jsonText="1"; 
						}
					}
				}catch (Exception e) {
					log.error("ERROR en try catch:" + e.getMessage()); 
					jsonText="1"; 
				}
				String total_str="";
				if(pt!=null){
					total=pt.getPrecio();
					concepto=pt.getNombreProyecto();
					if(precio<total) {
						total_str=Float.toString(precio);
						total=precio;
					} else {
						total_str=Float.toString(total);
					}
				}
				try{
					PagoVO pago= new PagoVO( total, concepto, codigo, id_projecto);
					if(hht.setPago(pago)==0){
						if(hht.setProyectoPagado(id_projecto, tipo_int)==1){
							jsonText="1";
						}else{
							jsonText="0";
							String content4[]= {"compraNormal","","",total_str};
							Mail hhtMail4 = new Mail();
							try{
								 hhtMail4.sendMail(mail, "info@decotheco.com", "Compra de un pack Deco", content4);
								 try{ 
									 hhtMail4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Compra de un pack Deco", content4);
									 hhtMail4.sendMail( "info@decotheco.com", "info@decotheco.com", "Compra de un pack Deco", content4);
								}catch(Exception e){
									log.error("ERROR en try catch:" + e.getMessage());
								}
							}catch(Exception e){
								log.error("ERROR en try catch:" + e.getMessage());
							}
						}
					}else{
						jsonText="1";
					}
					
					log.info(jsonText);
					
					
				}catch(Exception e){
					log.error("ERROR en try catch:" + e.getMessage());
					jsonText="1";
				}

		} else {
			
			String idDecorador=request.getParameter("decorador");
			 
			
			request.setCharacterEncoding("utf8");
			response.setCharacterEncoding("utf8");
			 
			dataBBDD hht = new dataBBDD(); 
			String total_str=""; 
			try{ 
				int id_projecto=0; 
				String concepto="Paypal - Piso comprado por usuario";
				 PagoVO pago= new PagoVO( total, concepto, codigo, id_projecto);
 
				  
				if(hht.setPago(pago)==0){
					new dataBBDD().setProyectoPisoPagado(id_project_string, idDecorador);
					jsonText="0";
					String content4[]= {"compraNormal","","",total_str};
					Mail hhtMail4 = new Mail();
					try{
						 hhtMail4.sendMail(mail, "info@decotheco.com", "Compra de un pack piso", content4);
						 try{ 
							 hhtMail4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Compra de un pack piso", content4);
							 hhtMail4.sendMail( "info@decotheco.com", "info@decotheco.com", "Compra de un pack piso", content4);
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage());
						}
					}catch(Exception e){
						log.error("ERROR en try catch:" + e.getMessage());
					} 
				}else{
					jsonText="1";
				}
				
				log.info(jsonText);
				
				
			}catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage());
				jsonText="1";
			}
			
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
