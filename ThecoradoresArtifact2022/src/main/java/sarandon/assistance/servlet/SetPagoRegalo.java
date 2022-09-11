package sarandon.assistance.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.PagoVO;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.RegaloVO;

/**
 * Servlet implementation class getNews
 */
public class SetPagoRegalo extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SetPagoRegalo.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetPagoRegalo() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		log.info("class SetPagoRegalo");
		String nombre=request.getParameter("nombre");
		String direccion=request.getParameter("direccion");
		String cp=request.getParameter("cp");
		String telefono_buyer=request.getParameter("telefono_buyer");
		String poblacion=request.getParameter("poblacion");
		String comentarios=request.getParameter("comentarios");
		String nombre_buyer=request.getParameter("nombre_buyer");
		String mail_buyer=request.getParameter("mail_buyer");
		String mensaje_personalizar=request.getParameter("mensaje_personalizar");
		String mail=request.getParameter("mail");

		String id_project_string=request.getParameter("id_proyecto");
		String concepto=request.getParameter("concepto");
		String codigo=request.getParameter("codigo");
		int id_projecto = Integer.parseInt(id_project_string);
		String total_string=request.getParameter("total");
		Float total = Float.parseFloat(total_string);
		
		
		PagoVO pago= new PagoVO( total, concepto, codigo, id_projecto);
		String codigoForRegalo= new Date().getTime()+"";
		RegaloVO regalo = new RegaloVO( total, codigoForRegalo, nombre, direccion, cp, telefono_buyer, poblacion, comentarios, nombre_buyer, mail_buyer, mensaje_personalizar, mail);
		
		 request.setCharacterEncoding("utf8");
	        
		 response.setCharacterEncoding("utf8");
		 
		String jsonText = "";
		dataBBDD hht = new dataBBDD();
		try{
			
			if(hht.setPago(pago)==0){ 
				if(hht.setRegalo(regalo)!=0){
					jsonText="1";
					// SI ES UN REGALO DE TIPO CAJA PAGADO CON TPV
					if(total_string.equals("199")){
						// MENSAJE PARA EL COMPRADOR
						String content[]= {"regaloCajaComprador","","", nombre_buyer, mail_buyer, telefono_buyer, nombre, direccion, cp, poblacion};
						
						Mail hht2 = new Mail();
						try{
							int devuelve = hht2.sendMail( mail_buyer, "info@decotheco.com", "Compra de caja Deco", content);
							 
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage());
						}
						// MENSAJE QUE RECIBIMOS
						String content2[]= {"regaloCajaApl","","", nombre_buyer, mail_buyer, telefono_buyer, nombre, direccion, cp, poblacion, comentarios, mensaje_personalizar};
						Mail hht3 = new Mail();
						try{ 

							hht3.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Alquien compró una caja Deco", content2);
							int devuelve2 = hht3.sendMail( "info@decotheco.com", "info@decotheco.com", "Alquien compró una caja Deco", content2);
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage());
						}
						
						 
						
					// SI ES UNA REGALO TIPO EMAIL	
					} else if(total_string.equals("179") && nombre_buyer!=null) {
						if(total_string.equals("179") && nombre_buyer!="") {
							// REGALO EMAIL PARA COMPRADOR
							String content3[]= {"regaloEmailComprador","","",mail};
							Mail hht3 = new Mail();
							try{
								int devuelve3 = hht3.sendMail(mail_buyer, "info@decotheco.com", "E-Tarjeta pedido efectuado", content3);
								hht3.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "E-Tarjeta pedido efectuado", content3);
								hht3.sendMail( "info@decotheco.com", "info@decotheco.com", "E-Tarjeta pedido efectuado", content3);
								 
							}catch(Exception e){
								log.error("ERROR en try catch:" + e.getMessage());
							}
							// REGALO EMAIL DESTINATARIO
							String content4[]= {"regaloEmailDestinatario",mensaje_personalizar,codigoForRegalo};
							Mail hht4 = new Mail();
							try{
								int devuelve3 = hht4.sendMail(mail, "info@decotheco.com", "Regalo de un amigo", content4);
								 
							}catch(Exception e){
								log.error("ERROR en try catch:" + e.getMessage());
							}
						}
 
					// SI ES UN PAGO NORMAL CON TPV DESDE PAGAR
					} else  if(total_string.equals("79") || total_string.equals("179")) {
						
						String content4[]= {"compraNormal","","",total_string};
						Mail hht4 = new Mail();
						try{
							int devuelve3 = hht4.sendMail(mail, "info@decotheco.com", "Compra de un pack Deco", content4);
							try{ 
								hht4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Compra de un pack Deco", content4);
								hht4.sendMail( "info@decotheco.com", "info@decotheco.com", "Compra de un pack Deco", content4);
							}catch(Exception e){
								log.error("ERROR en try catch:" + e.getMessage());
							}
							 
						}catch(Exception e){
							log.error("ERROR en try catch:" + e.getMessage());
						}
						
						
					}
					
					
					
					
					
					
				}else{
					jsonText="0";
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
