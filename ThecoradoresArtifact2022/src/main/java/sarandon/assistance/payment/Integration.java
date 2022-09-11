package sarandon.assistance.payment;


import java.text.DecimalFormat;


import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.log4j.Logger;




import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.servlet.more.Config;
import sarandon.assistance.servlet.more.Mail;
import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.PagoVO;

import sarandon.assistance.vo.RegaloVO;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sis.redsys.api.ApiMacSha256;

public class Integration {
	private final static Logger log = Logger.getLogger(dataBBDD.class);


	// INSERTAR METODO MAIL
	public static String generateDsMerchantParameters(int tipo, String id_proyecto, RegaloVO regalo) throws Exception {
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("String generateDsMerchantParameters(int tipo, String id_proyecto, RegaloVO regalo) : " + "tipo: " + tipo+ "tipoProyecto" + "regaloVO.id: " + regalo);
		// PAGO NORMAL 79/179
		String params ="";
		String value = "";
		String signature = "";
		String errorCode = "0";
		String errorMessage = "";
		String order = "";
		
		try {
		
			CoreImpl core = new CoreImpl();
			ProjectsTypes projectTypes = core.getProjectType(tipo);
			
			ApiMacSha256 apiMacSha256 = new ApiMacSha256();
			
			DecimalFormat df = new DecimalFormat("0.00");
			df.setMaximumFractionDigits(2);
			value = df.format(projectTypes.getPrecio()).replaceAll("[^\\d.]", "");
			value=value.replaceAll("\\.", "");
			apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", value);
			order = "0001" + RandomStringUtils.randomAlphanumeric(8);
			
			// DATOS PARA PASARELA DE PAGO
			apiMacSha256.setParameter("DS_MERCHANT_ORDER", order);		
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", "169018173");
			apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
			apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
			apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "001");
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", new Config().urlPagoConTPVHecho);

			int precioRestar=0;
			if(tipo==3||tipo==4){
				// REDIRECCION PAGAR REGALO
				regalo.codigo=tipo+order;
				apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/regalo-decoracion.html?pagado=ok");
				apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/regalo-decoracion.html?pagado=ko");
				
				int a=new dataBBDD().setRegaloUsado(regalo);
				
				
			}else{
				// REDIRECCION PAGO NORMAL 79/179
				apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/Home.html?pagado=ok");
				apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/Pagar.html?pagado=ko");
				
			} 

			// DATOS QUE SE PASAN SI EL PAGO ES OK
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTDATA", id_proyecto+"---"+tipo+"---0---0---0---0");

			
			
			
			params = apiMacSha256.createMerchantParameters();
			
			signature = apiMacSha256.createMerchantSignature(new Config().claveComercio);
		}
			catch (Exception exc) {
				log.error("ERROR en try catch:" + exc.getMessage());
				errorCode = "1";
				errorMessage = exc.getMessage();
		}
		
		String ret = "{ \"parameters\": \"" + params + "\",	\"signature\": \"" + 
					 signature + "\",\"error\" : {\"code\": \"" + 
					 errorCode + "\", \"message\": \"" + errorMessage + "\"}}";
		
		return ret;
	} 
		public static String generateDsMerchantParametersRegalo(int tipo, String id_proyecto,float valor, int tipoProyecto, RegaloVO regalo) throws Exception {
			log.info("---------------------------                            -------------------------------                     ----------------------------)");
			log.info("String generateDsMerchantParametersRegalo(int tipo, String id_proyecto,float valor, int tipoProyecto, RegaloVO regalo) : " + "tipo: " + tipo+ "tipoProyecto" + tipoProyecto+ "id_proyecto: " + id_proyecto+ "valor: " + valor+ "regaloVO.id: " + regalo.id);
			
			// PAGO REGALO 
			String params ="";
			String value = "";
			String signature = "";
			String errorCode = "0";
			String errorMessage = "";
			String order = "";
			
			try {
			
				CoreImpl core = new CoreImpl();
				ProjectsTypes projectTypes = core.getProjectType(tipo);
				
				ApiMacSha256 apiMacSha256 = new ApiMacSha256();
				
				DecimalFormat df = new DecimalFormat("0.00");
				df.setMaximumFractionDigits(2);
				value = df.format(valor).replaceAll("[^\\d.]", "");
				value=value.replaceAll("\\.", "");
				apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", value);
				order = "0001" + RandomStringUtils.randomAlphanumeric(8);
				
				// PASANDO DATOS A LA PASARELA DE PAGO
				apiMacSha256.setParameter("DS_MERCHANT_ORDER", order);		
				apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", "169018173");
				apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
				apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
				apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "001");
				apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", new Config().urlPagoConTPVHecho);

				int precioRestar=0;
				if(tipo==3||tipo==4){
					// REDIRECCIONES PASARELA DE PAGO
					regalo.codigo=tipo+order; 
					apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/regalo-decoracion.html?especial=ok&tipo="+tipo);
					apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/regalo-decoracion.html?pagado=ko");
					
					int a=new dataBBDD().setRegaloUsado(regalo);
					
					
				} 
			 
				// DATOS QUE SE PASAN CUANDO EL PAGO RESULTA OK
				apiMacSha256.setParameter("DS_MERCHANT_MERCHANTDATA", id_proyecto+"---"+tipo+"---"+valor+"---0---0---"+tipoProyecto);

				
				
				
				params = apiMacSha256.createMerchantParameters();
				
				signature = apiMacSha256.createMerchantSignature(new Config().claveComercio);
			}
				catch (Exception exc) {
					log.error("ERROR en try catch:" + exc.getMessage());
					errorCode = "1";
					errorMessage = exc.getMessage();
			}
			
			String ret = "{ \"parameters\": \"" + params + "\",	\"signature\": \"" + 
						 signature + "\",\"error\" : {\"code\": \"" + 
						 errorCode + "\", \"message\": \"" + errorMessage + "\"}}";
			
			return ret;
		}
	public static String generateDsMerchantParametersSpecial(int tipo, int tipoProyecto, String id_proyecto, float valor, int idDecorador) throws Exception {
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("String generateDsMerchantParametersSpecial(int tipo, int tipoProyecto, String id_proyecto, float valor, int idDecorador) : " + "tipo: " + tipo+ "tipoProyecto" + tipoProyecto+ "id_proyecto: " + id_proyecto+ "valor: " + valor+ "idDecorador: " + idDecorador);
		String params ="";
		String value = "";
		String signature = "";
		String errorCode = "0";
		String errorMessage = "";
		String order = "";
		
		// PAGO AFILIADO
		try {
		
			CoreImpl core = new CoreImpl(); 
			
			ApiMacSha256 apiMacSha256 = new ApiMacSha256();
			
			DecimalFormat df = new DecimalFormat("0.00");
			df.setMaximumFractionDigits(2);
			value = df.format(valor).replaceAll("[^\\d.]", "");
			value=value.replaceAll("\\.", "");
			apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", value);
			order = "0001" + RandomStringUtils.randomAlphanumeric(8);
			
			// DATOS QUE SE PASAN A LA PASARELA DE PAGO
			apiMacSha256.setParameter("DS_MERCHANT_ORDER", order);		
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", "169018173");
			apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
			apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
			apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "001");
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", new Config().urlPagoConTPVHecho);
			float precio=new CoreImpl().getProjectType(tipoProyecto).getPrecio(); 
			
			if(tipo==9){ 
				// REDIRECCIONES PAGO AFILIADO EN FUNCIÓN DE SI ES REGALO O NORMAL
				if(tipoProyecto<=2) {
					apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/Pagar.html?pagado=ko");
					apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/Home.html?pagado=ok&precio="+precio);
				} else {
					apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/regalo-decoracion.html?pagado=ko");
					apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/regalo-decoracion.html?pagado=ok&precio="+precio);
				}
			}

			// DATOS QUE SE LE PASAN A LA SIGUIENTE FUNCIÓN SI RESULTA OK
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTDATA", id_proyecto+"---9---"+valor+"---"+idDecorador+"---"+precio+"---"+tipoProyecto);

			
			
			
			params = apiMacSha256.createMerchantParameters();
			
			signature = apiMacSha256.createMerchantSignature(new Config().claveComercio);
		}
			catch (Exception exc) {
				log.error("ERROR en try catch:" + exc.getMessage());
				errorCode = "1";
				errorMessage = exc.getMessage();
		}
		
		String ret = "{ \"parameters\": \"" + params + "\",	\"signature\": \"" + 
					 signature + "\",\"error\" : {\"code\": \"" + 
					 errorCode + "\", \"message\": \"" + errorMessage + "\"}}";
		
		return ret;
	}
	
	public static String generateDsMerchantParametersVariable(int tipo, int tipoProyecto, String id_proyecto, float valor, int idDecorador) throws Exception {
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("String generateDsMerchantParametersSpecial(int tipo, int tipoProyecto, String id_proyecto, float valor, int idDecorador) : " + "tipo: " + tipo+ "tipoProyecto" + tipoProyecto+ "id_proyecto: " + id_proyecto+ "valor: " + valor+ "idDecorador: " + idDecorador);
		String params ="";
		String value = "";
		String signature = "";
		String errorCode = "0";
		String errorMessage = "";
		String order = "";
		
		// PAGO AFILIADO
		try {
		
			CoreImpl core = new CoreImpl(); 
			
			ApiMacSha256 apiMacSha256 = new ApiMacSha256();
			
			DecimalFormat df = new DecimalFormat("0.00");
			df.setMaximumFractionDigits(2);
			value = df.format(valor).replaceAll("[^\\d.]", "");
			value=value.replaceAll("\\.", "");
			apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", value);
			order = "0001" + RandomStringUtils.randomAlphanumeric(8);
			
			// DATOS QUE SE PASAN A LA PASARELA DE PAGO
			apiMacSha256.setParameter("DS_MERCHANT_ORDER", order);		
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", "169018173");
			apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
			apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
			apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "001");
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", new Config().urlPagoConTPVHecho);
			float precio=valor; 
			
			if(tipo==8){ 
				// REDIRECCIONES PAGO AFILIADO EN FUNCIÓN DE SI ES REGALO O NORMAL 
					apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/Pago.html?pagado=ko");
					apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/Pago.html?pagado=ok");
			}

			// DATOS QUE SE LE PASAN A LA SIGUIENTE FUNCIÓN SI RESULTA OK
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTDATA", id_proyecto+"---8---"+valor+"---"+idDecorador+"---"+precio+"---"+tipoProyecto);

			
			
			
			params = apiMacSha256.createMerchantParameters();
			
			signature = apiMacSha256.createMerchantSignature(new Config().claveComercio);
		}
			catch (Exception exc) {
				log.error("ERROR en try catch:" + exc.getMessage());
				errorCode = "1";
				errorMessage = exc.getMessage();
		}
		
		String ret = "{ \"parameters\": \"" + params + "\",	\"signature\": \"" + 
					 signature + "\",\"error\" : {\"code\": \"" + 
					 errorCode + "\", \"message\": \"" + errorMessage + "\"}}";
		
		return ret;
	}
	
	public static String generateDsMerchantParametersPiso(int tipo, int tipoProyecto, String id_proyecto, float valor, int idDecorador) throws Exception {
		
		// PAGO PISO
		// 10 / 0 / 2-3-3-3-9 / 600 / idUsuario
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("String generateDsMerchantParametersSpecial(int tipo, int tipoProyecto, String id_proyecto, float valor, int idDecorador) : " + "tipo: " + tipo+ "tipoProyecto" + tipoProyecto+ "id_proyecto: " + id_proyecto+ "valor: " + valor+ "idDecorador: " + idDecorador);
		String params ="";
		String value = "";
		String signature = "";
		String errorCode = "0";
		String errorMessage = "";
		String order = "";
		
		try {
		
			CoreImpl core = new CoreImpl(); 
			
			ApiMacSha256 apiMacSha256 = new ApiMacSha256();
			
			DecimalFormat df = new DecimalFormat("0.00");
			df.setMaximumFractionDigits(2);
			value = df.format(valor).replaceAll("[^\\d.]", "");
			value=value.replaceAll("\\.", "");
			apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", value);
			order = "0001" + RandomStringUtils.randomAlphanumeric(8);
			
			// PASAMOS DATOS A PASARELA DE PAGO
			apiMacSha256.setParameter("DS_MERCHANT_ORDER", order);		
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", "169018173");
			apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
			apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
			apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "001");
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", new Config().urlPagoConTPVHecho);
			float precio=valor; 
			 // DATOS SI EL PAGO RESULTA OK
			//  tipo,  tipoProyecto,  id_proyecto,  valor,  idDecorador  ----  10 / 0 / 2-3-3-3-9 / 600 / 0 
			apiMacSha256.setParameter("DS_MERCHANT_MERCHANTDATA", id_proyecto+"---10---"+valor+"---"+idDecorador+"---"+precio+"---"+tipoProyecto);
			
		    if(tipo==10){  
		    	// REDIRECCIÓN PAGO PISO
					apiMacSha256.setParameter("DS_MERCHANT_URLKO", new Config().urlForRedirects+"/PagoPiso.html?tipo="+id_proyecto+"&pagado=ko");
					apiMacSha256.setParameter("DS_MERCHANT_URLOK", new Config().urlForRedirects+"/Home.html?pagado=ok&precio="+precio); 
			} 

		   

			
			
			
			params = apiMacSha256.createMerchantParameters();
			
			signature = apiMacSha256.createMerchantSignature(new Config().claveComercio);
		}
			catch (Exception exc) {
				log.error("ERROR en try catch:" + exc.getMessage());
				errorCode = "1";
				errorMessage = exc.getMessage();
		}
		
		String ret = "{ \"parameters\": \"" + params + "\",	\"signature\": \"" + 
					 signature + "\",\"error\" : {\"code\": \"" + 
					 errorCode + "\", \"message\": \"" + errorMessage + "\"}}";
		
		return ret;
	}
	public static void parseDsMerchantParameters(HttpServletRequest request) throws Exception {
		log.info("---------------------------                            -------------------------------                     ----------------------------)");
		log.info("parseDsMerchantParameters(HttpServletRequest request)");
		
		String errorCode = "0";
		String errorMessage = "";
		
		try {
			
			// SI EL PAGO RESULTA OK PASA POR AQUÍ, DONDE SE CREARÁN LOS PAGOS Y SE CREARÁN LOS PROYECTOS
			ApiMacSha256 apiMacSha256 = new ApiMacSha256();

			String version = request.getParameter("Ds_SignatureVersion");
			String parametersEnc = request.getParameter("Ds_MerchantParameters");
			String signature = request.getParameter("Ds_Signature");
			String parameters = apiMacSha256.decodeMerchantParameters(parametersEnc);
			
			String signatureCalculada = apiMacSha256.createMerchantSignatureNotif(new Config().claveComercio, parametersEnc);
			if (signatureCalculada.equals(signature)) { 
				
					// RECOGEMOS LOS DATOS ENVIADOS CUANDO EL PAGO FUE OK
					String codigoRespuesta = apiMacSha256.getParameter("Ds_Response");
					try {
						int codResp= Integer.parseInt(codigoRespuesta);
						if(codResp<0||codResp>99) 
							{
							log.error("ERROR EN PAGO TARJETA (CODE: " + codigoRespuesta);
							throw new Exception("ERROR EN PAGO TARJETA (CODE: " + codigoRespuesta);
							}
					}catch (Exception e) {
						log.error("ERROR en try catch:" + e.getMessage());
						throw new Exception("RESPUESTA INCORRECTA EN PAGO");
					}
					String pedido_numero = apiMacSha256.getParameter("Ds_Order");
					String pedido_fecha = apiMacSha256.getParameter("Ds_Date");
					String pedido_hora = apiMacSha256.getParameter("Ds_Hour");
					String pedido_autorizacion = apiMacSha256.getParameter("Ds_AuthorisationCode");
					
					String datos = apiMacSha256.getParameter("Ds_MerchantData");
					log.info(" datos: " + datos );
					
					String datosseparados[]=datos.split("---");
					int proyectoid=0;
					String id_proyecto="";
					try{
						id_proyecto=datosseparados[0];
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
									tipoProy=Integer.parseInt(datosseparados[1]);
								} catch (Exception e) {
									tipoProy=-1;
								} 
				
								Float valor=Float.parseFloat("0.00");
								try {
									valor=Float.parseFloat(datosseparados[2]);
								} catch (Exception e) {
									valor=Float.parseFloat("0.00");
								}  
								String idDecorador="";
								try {
									idDecorador=datosseparados[3];
								} catch (Exception e) {
									idDecorador="";
								}   
								
								log.info(" tipo: " + tipoProy );
								
								
								
								PagoVO pago=null;
								if(tipoProy==10) { 
				
									int tipoProyecto=0;
									try{
										tipoProyecto=Integer.parseInt(datosseparados[5]);
									}catch (Exception e) {
										tipoProyecto=0;
									}
									 
									String concepto="Redsis - Piso comprado por usuario"; 
									String codigo=pedido_autorizacion;
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
										errorCode = "1";
										errorMessage = exc.getMessage();
									}
									   
									 
								} 
							
					} else {
								
								try{ 
									proyectoid=Integer.parseInt(datosseparados[0]);
								}catch (Exception e) {
									proyectoid=-1;
								}
								int tipo=0;
								try{
									tipo=Integer.parseInt(datosseparados[1]);
								}catch (Exception e) {
									tipo=-1;
								} 
				
								Float valor=Float.parseFloat("0.00");
								try{
									valor=Float.parseFloat(datosseparados[2]);
								}catch (Exception e) {
									valor=Float.parseFloat("0.00");
								}  
								String idDecorador="";
								try{
									idDecorador="USER: "+datosseparados[3];
								}catch (Exception e) {
									idDecorador="";
								}   
								
								log.info(" tipo: " + tipo );
								
								
								
								PagoVO pago=null;
								// SI ES UN REGALO
								if(tipo==3||tipo==4){
									log.info(" tipo==3||tipo==4 " );
									
									int tipoProyecto=0;
									try{
										tipoProyecto=Integer.parseInt(datosseparados[5]);
									}catch (Exception e) {
										tipoProyecto=0;
									}
									if(tipoProyecto!=0) {
										log.info("if(tipoProyecto!=0) { " + tipoProyecto);
										 new dataBBDD().setRegaloValido(tipo+pedido_numero);
										 pago= new PagoVO( valor, tipo, pedido_autorizacion, proyectoid, tipo+pedido_numero, "REDSIS");
										 log.info("pago= new PagoVO( valor, tipo, pedido_autorizacion, proyectoid, tipo+pedido_numero, \"REDSIS\"); " + valor + ", " + tipo+ ", " + pedido_autorizacion+ ", " + proyectoid+ ", " + tipo+pedido_numero+ ", " + "REDSIS");
									} else {
										log.info("else   if(tipoProyecto!=0) { " + tipoProyecto);
										new dataBBDD().setRegaloValido(tipo+pedido_numero);
										pago= new PagoVO( valor, tipo, pedido_autorizacion, proyectoid, tipo+pedido_numero, "REDSIS");
										log.info("pago= new PagoVO( valor, tipo, pedido_autorizacion, proyectoid, tipo+pedido_numero, \"REDSIS\"); " + valor + ", " + tipo+ ", " + pedido_autorizacion+ ", " + proyectoid+ ", " + tipo+pedido_numero+ ", " + "REDSIS");
										
									}
									 
									 try {
										new dataBBDD().setPago(pago);
										log.info("new dataBBDD().setPago(pago); pago.id" + pago.id);
										new dataBBDD().enviarMail(tipo+pedido_numero, tipo);
										log.info("new dataBBDD().enviarMail(tipo+pedido_numero, tipo);" );
									}
									catch (Exception exc) {
										log.error("ERROR en try catch:" + exc.getMessage());
										errorCode = "1";
										errorMessage = exc.getMessage();
									}
								} else if(tipo==9) {

									// SI ES AFILIADO
									log.info("tipo==9)");
				
									int tipoProyecto=0;
									try{
										tipoProyecto=Integer.parseInt(datosseparados[5]);
									}catch (Exception e) {
										tipoProyecto=0;
									}
									
									
									pago= new PagoVO( valor, tipo, pedido_autorizacion, 0, idDecorador, "REDSIS");
									log.info("pago= new PagoVO( valor, tipo, pedido_autorizacion, 0, idDecorador, \"REDSIS\");" + valor);
									 new dataBBDD().setProyectoPagado(proyectoid, tipoProyecto);
									 log.info(" new dataBBDD().setProyectoPagado(proyectoid, tipoProyecto);" + tipoProyecto);
										
									 try {
											new dataBBDD().setPago(pago); 
											 log.info(" new dataBBDD().setPago(pago); " );
										}
										catch (Exception exc) {
											log.error("ERROR en try catch:" + exc.getMessage());
											errorCode = "1";
											errorMessage = exc.getMessage();
										}
									 
									float precio=0f; 
									try{
										precio=Float.parseFloat(datosseparados[4]);
									}catch (Exception e) {
										precio=0f;
									}  
									// añade numero de veces usado el descuento
									int iduser=Integer.parseInt(datosseparados[3]);
									 log.info(" int iduser=Integer.parseInt(datosseparados[3]);" + iduser);
									new CoreImpl().subtractDiscountDirect(iduser, precio);
									 log.info(" new CoreImpl().subtractDiscountDirect(iduser, precio); " + precio);
									 String proyectoId=Integer.toString(proyectoid);
									new dataBBDD().enviarMail(proyectoId, tipoProyecto);
									log.info(" new dataBBDD().enviarMail(proyectoId, tipo); " +tipo);
								} else if(tipo==8) {

									// SI ES PAGO VARIADO
									log.info("tipo==8)");
				
									int tipoProyecto=0;
									try{
										tipoProyecto=Integer.parseInt(datosseparados[5]);
									}catch (Exception e) {
										tipoProyecto=0;
									}
									
									
									pago= new PagoVO( valor, tipo, pedido_autorizacion, 0, idDecorador, "REDSIS");
									log.info("pago= new PagoVO( valor, tipo, pedido_autorizacion, 0, idDecorador, \"REDSIS\");" + valor); 
										
									 try {
											new dataBBDD().setPago(pago); 
											 log.info(" new dataBBDD().setPago(pago); " );
										}
										catch (Exception exc) {
											log.error("ERROR en try catch:" + exc.getMessage());
											errorCode = "1";
											errorMessage = exc.getMessage();
										} 
								} else{

									log.info("tipo==1 || tipo==2)");
									// SI ES NORMAL 79 O 179
									 pago= new PagoVO( new CoreImpl().getProjectType(tipo).getPrecio(), tipo, pedido_autorizacion, proyectoid, null, "REDSIS");
									 log.info(" pago= new PagoVO( new CoreImpl().getProjectType(tipo).getPrecio(), tipo, pedido_autorizacion, proyectoid, null, \"REDSIS\"); " );
									 new dataBBDD().setProyectoPagado(proyectoid, tipo);
									 log.info(" new dataBBDD().setProyectoPagado(proyectoid, tipo);" );
									 try {
											new dataBBDD().setPago(pago);
											 log.info(" new dataBBDD().setPago(pago);" );
											String proyectoId=Integer.toString(proyectoid);
											new dataBBDD().enviarMail(proyectoId, tipo);
											 log.info(" new dataBBDD().enviarMail(proyectoId, tipo); " +tipo);
										}
										catch (Exception exc) {
											log.error("ERROR en try catch:" + exc.getMessage());
											errorCode = "1";
											errorMessage = exc.getMessage();
										}
								}
						
					}
						
				
			}
			else {
				log.error("Firma inválida");
				throw new Exception("Firma inválida");
			}
				
			
		}
			catch (Exception exc) {
				log.error("ERROR en try catch:" + exc.getMessage());
				errorCode = "1";
				errorMessage = exc.getMessage();
		}
				
	} 

}
