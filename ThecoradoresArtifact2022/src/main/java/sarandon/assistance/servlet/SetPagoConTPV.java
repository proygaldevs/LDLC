package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.PagoVO;
import sarandon.assistance.vo.RegaloVO;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.payment.Integration;

/**
 * Servlet implementation class getNews
 */
public class SetPagoConTPV extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(SetPagoConTPV.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetPagoConTPV() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
		
 
		log.info("class SetPagoConTPV"); 
		// RECOGEMOS DATOS
		String jsonText = "";
		String idType_string = request.getParameter("id_tipo");
		String idType_string2 = "";
		try{
			idType_string2=request.getParameter("id_tipo2");
		}catch (Exception e) {
			idType_string2="";
		}
		String id_proyecto = request.getParameter("id_proyecto");
		int idType2=0;
		int idType = Integer.parseInt(idType_string); // 9
		if(idType_string2==null || idType_string2.equals("")) { idType2 =0; } else {
			idType2 = Integer.parseInt(idType_string2); // 1 2 3 4
		}
		String valorPar=request.getParameter("valor");
		float valor=0;
		try{
			valor = Float.parseFloat(valorPar);
		}catch (Exception e) {
			valor=-1;
		}
		
		if (valor > -1 && idType2<=2){
			// SI ES UN PISO O PROYECTO AFILIADO ENTRA POR AQUÍ
			int idDecorador;
			try{
				// LOCALHOST id_decoradors=request.getParameter("id_decorador");
				idDecorador=Integer.parseInt(request.getParameter("id_decorador")); 
			}catch (Exception e) {
				idDecorador=-1;
			}
			try{   
				// PRUEBA LOCALHOST new dataBBDD().setProyectoPisoPagado(id_proyecto, id_decoradors);
				request.setCharacterEncoding("utf8");
				response.setCharacterEncoding("utf8");
				String a = "-";
				int piso=id_proyecto.indexOf(a); 
				if(piso==1) {
					// PAGO DE PISO
					// 10 / 0 / 2-3-3-3-9 / 600 / 0
					// PRUEBA PAGO DESPUÉS DE PASARELA pagarPisoPrueba( id_proyecto,  idType,  valor,  request.getParameter("id_decorador"),  0);
					jsonText = Integration.generateDsMerchantParametersPiso(idType,idType2,id_proyecto,valor,idDecorador);
				} else if(idType==9){
					// PAGO AFILIADO
					jsonText = Integration.generateDsMerchantParametersSpecial(idType,idType2,id_proyecto,valor,idDecorador);
				} else if(idType==8){
					// PAGO VARIADO
					jsonText = Integration.generateDsMerchantParametersVariable(idType,idType2,id_proyecto,valor,idDecorador);
				}
				 
			}catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage());
			}
			
		}else {
			// SI ES PAGO REGALO O NORMAL 79/179
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
			String concepto=request.getParameter("concepto");
			String codigo=request.getParameter("codigo");
			int id_projecto = Integer.parseInt(id_proyecto);
			String total_string=request.getParameter("total");
			RegaloVO regalo=null;
			
			if(idType==3 && idType2==0 || idType==4 && idType2==0 || idType2==3 || idType2==4){
				// SI ES UN REGALO CREAMOS EL OBJETO REGALO PARA PASAR AL SIGUIENTE MÉTODO
				Float total = Float.parseFloat(total_string);
				regalo = new RegaloVO( total, "", nombre, direccion, cp, telefono_buyer, poblacion, comentarios, nombre_buyer, mail_buyer, mensaje_personalizar, mail);
				
			} 
			
			try{ 
				request.setCharacterEncoding("utf8");
				response.setCharacterEncoding("utf8");
				if(idType2!=0) {
					// PAGO REGALO
					jsonText = Integration.generateDsMerchantParametersRegalo(idType2,id_proyecto,valor, idType,regalo);
				} else {
					// PAGO NORMAL 79/179
					jsonText = Integration.generateDsMerchantParameters(idType,id_proyecto, regalo);
				}
				 
			} catch(Exception e){
				log.error("ERROR en try catch:" + e.getMessage());
			}
	 
		}
		
		Gson gson = new Gson();
		response.getWriter().write((gson.toJson(jsonText)));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
		doGet(request,response);
	}
	
	protected void pagarPisoPrueba(String id_proyecto2, int tipoProy2, float valor2, String idDecorador2, int tipoProyecto2) { 
		int proyectoid=0;
		String id_proyecto="";
		try{
			id_proyecto=id_proyecto2;
			//proyectoid=Integer.parseInt(datosseparados[0]);
		}catch (Exception e) {
			id_proyecto="";
		} 
		
		
		String a = "-";
		int piso=id_proyecto.indexOf(a);
		if(piso==1) {

					log.info("tipo==10)");
					// SI SE TRATA DE UN PISO ENTRA POR AQUÍ
			
					
					
					//  tipo,  tipoProyecto,  id_proyecto,  valor,  idDecorador  ----  99 / 0 / 2-3-3-3-9 / 600 / 0 
					String tipo="";
					int tipoProy=0;
					try {
						tipoProy=tipoProy2;
					} catch (Exception e) {
						tipoProy=-1;
					} 
	
					Float valor=Float.parseFloat("0.00");
					try {
						valor=valor2;
					} catch (Exception e) {
						valor=Float.parseFloat("0.00");
					}  
					String idDecorador="";
					try {
						idDecorador=idDecorador2;
					} catch (Exception e) {
						idDecorador="";
					}   
					
					log.info(" tipo: " + tipoProy );
					
					
					
					PagoVO pago=null;
					if(tipoProy==10) { 
	
						int tipoProyecto=0;
						try{
							tipoProyecto=tipoProyecto2;
						}catch (Exception e) {
							tipoProyecto=0;
						}
						 
						String concepto="Redsis - Piso comprado por usuario"; 
						String codigo="adsadasdasdasdasdasdasd";
						Float total=valor;
						String total_str=Float.toString(total);
						pago= new PagoVO( total, concepto, codigo, 0); 
						 
						
							
						try {
								 // ADD PAGO
								 new dataBBDD().setPago(pago); 
								 // ADD PROYECTOS
								 new dataBBDD().setProyectoPisoPagado(id_proyecto, idDecorador); 
								 
								 String content4[]= {"compraNormal","","",total_str};
								 Mail hhtMail4 = new Mail(); 
									 try{ 
										 hhtMail4.sendMail( "dcotheco@gmail.com", "info@decotheco.com", "Compra de un pack piso", content4);
										 hhtMail4.sendMail( "info@decotheco.com", "info@decotheco.com", "Compra de un pack piso", content4);
									}catch(Exception e){
										log.error("ERROR en try catch:" + e.getMessage());
							 		}
								  
						}  catch (Exception exc) {
							log.error("ERROR en try catch:" + exc.getMessage());
						 
						}
						   
						 
					} 
				
		}
		
	}

}
