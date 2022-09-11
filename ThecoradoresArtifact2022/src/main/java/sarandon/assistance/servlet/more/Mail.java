package sarandon.assistance.servlet.more;


import java.util.Arrays;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;





public class Mail {
	
	// Amazon SES SMTP host name. This example uses the US West (Oregon) region.
    static final String HOST = "email-smtp.eu-west-1.amazonaws.com";    
    
    // The port you will connect to on the Amazon SES SMTP endpoint. We are choosing port 25 because we will use
    // STARTTLS to encrypt the connection.
    static final int PORT = 25;
	
	
	private final static Logger log = Logger.getLogger(Mail.class);
	public int sendMail( String toMail, String fromMail, String subject, String[] contenido) throws Exception{
		final String username = "AKIAIOLTF62JZ72EVWZA";
		final String password = "AobKx6nu4orn76HMA9FiV+UR+15xiFKVKyWxv+1mCgwL";

		//Properties props = new Properties();
		Properties props = System.getProperties();

		
		props.put("mail.transport.protocol", "smtps");
    	props.put("mail.smtp.port", PORT); 
    	props.put("mail.smtp.auth", "true");
    	props.put("mail.smtp.starttls.enable", "true");
    	props.put("mail.smtp.starttls.required", "true");
    	 


    	String content ="";
    	if(Arrays.asList(contenido).contains("bienvenida-usuario")) {
		    	content=content+ new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0];
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().mensajeBienvenidaUsuario;
		    	content=content+new Config().pie1; 
	    } else if (Arrays.asList(contenido).contains("mensajeBienvenidaDecorador")) {
	    	content=content+ new Config().Cabecera1;
	    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0];
	    	content=content+new Config().Cabecera11;
	    	content=content+new Config().mensajeBienvenidaDecorador;
	    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("mensajeDecoradorFactura")) {
	    	content=content+ new Config().Cabecera1;
	    	content=content+new Config().decoradores_url+"mails/cabecera/usuarioFinalizar";
	    	content=content+new Config().Cabecera11;
	    	content=content+new Config().mensajeDecoradorFactura;
	    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("mensajeDecoradorPlataforma")) {
	    	content=content+ new Config().Cabecera1;
	    	content=content+new Config().decoradores_url+"mails/cabecera/info";
	    	content=content+new Config().Cabecera11;
	    	content=content+new Config().mensajeDecoradorPlataforma; 
	    	content=content+"<br/>"+contenido[1]+"<br/><br/>"; 
	    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("mensajeFacturaPlataforma")) {
	    	content=content+ new Config().Cabecera1;
	    	content=content+new Config().decoradores_url+"mails/cabecera/info";
	    	content=content+new Config().Cabecera11;
	    	content=content+new Config().mensajeFacturaPlataforma; 
	    	content=content+"<br/>"+contenido[1]+"<br/><br/>";
	    	content=content+"<br/><a href='"+new Config().decoradores_url+"decoradores/"+contenido[1]+"/facturas/"+contenido[2]+"/factura.pdf'>Ver factura</a><br/><br/>";
	    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("regaloCajaComprador")) {
	    	content=content+ new Config().Cabecera2; 
	    	content=content+new Config().regaloCajaComprador;
	    	content=content+"<p style='float:left;margin-top:25px;text-align:center;width:100%'><b >Detalles de tu compra</b></p>"
				+ "<div style='float:left;width:100%'>"
				+ "<div style='width:50%;float:left'><p style='margin-top:25px;text-align:center;width:100%'><b>Dirección de facturación</b></p>"
				+ "<p style='margin-top:10px;text-align:center;text-transform: uppercase'>"+contenido[3]+"</p>"
    				+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[4]+"</p>"
    				+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[5]+"</p>"
    				+ "</div>"
    				+ "<div style='width:50%;float:left'><p style='margin-top:25px;text-align:center;width:100%'><b>Dirección de envío</b></p>"
				+ "<p style='text-align:center;margin-top:10px;text-transform: uppercase'>"+contenido[6]+"</p>"
	    			+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[7]+"</p>"
	    	    		+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[8]+"</p>"
	    	    	    	+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[9]+"</p>"
    	    			+ "</div>";
	    	content=content+new Config().pie2;
	    	content=content+new Config().decoradores_url+"mails/pie/"+contenido[0]; 
	    	content=content+new Config().pie21;
    }  else if (Arrays.asList(contenido).contains("regaloCajaApl")) {
	    	content=content+ new Config().Cabecera2; 
	    	content=content+new Config().regaloCajaApl;
	    	content=content+"<p style='float:left;margin-top:25px;text-align:center;width:100%'><b >Detalles de la compra</b></p>"
				+ "<div style='float:left;width:100%'>"
				+ "<div style='width:50%;float:left'><p style='margin-top:25px;text-align:center;width:100%'><b>Dirección de facturación</b></p>"
				+ "<p style='margin-top:10px;text-align:center;text-transform: uppercase'>"+contenido[3]+"</p>"
					+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[4]+"</p>"
					+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[5]+"</p>"
					+ "</div>"
					+ "<div style='width:50%;float:left'><p style='margin-top:25px;text-align:center;width:100%'><b>Dirección de envío</b></p>"
				+ "<p style='text-align:center;margin-top:10px;text-transform: uppercase'>"+contenido[6]+"</p>"
	    			+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[7]+"</p>"
	    	    		+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[8]+"</p>"
	    	    	    	+ "<p style='text-align:center;margin-top: -5px;text-transform: uppercase'>"+contenido[9]+"</p>"
    	    	    	    	+ "<p style='text-align:left;margin-top: 20px;'>Comentario: "+contenido[10]+"</p>"
    	    	    	    	+ "<p style='text-align:left;margin-top: 20px;'>Mensaje Personalizado: "+contenido[11]+"</p>"
		    			+ "</div>";
	    	content=content+new Config().pie2;
	    	content=content+new Config().decoradores_url+"mails/pie/"+contenido[0]; 
	    	content=content+new Config().pie21;
	} else if (Arrays.asList(contenido).contains("regaloEmailComprador")) {
		    	content=content+ new Config().Cabecera2; 
		    	content=content+new Config().regaloEmailComprador;
		    	content=content+ "<div style='float:left;width:100%'>"
	    				+ "<p style='margin-top:25px;float:left;text-align:center;width:100%'><b>Email destinatario</b></p>"
					+ "<p style='text-align:center;float:left;margin-top:10px;;width:100%;margin-bottom: 20px;'>"+contenido[3]+"</p><br/><br/>" ; 
		    	content=content+new Config().pie2;
		    	content=content+new Config().decoradores_url+"mails/pie/"+contenido[0]; 
		    	content=content+new Config().pie21;
	    } else if (Arrays.asList(contenido).contains("regaloEmailDestinatario")) {
	     	content=content+ new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0];
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().regaloEmailDestinatario; 
		    	content=content+"<div style='width:80%;padding:4%;border:1px dotted black;margin-left:5%'>"+contenido[1]+"</div>";
		    	content=content+"<div style='margin-left:5%'>"+new Config().regaloEmailDestinatario2;
		    	content=content+"<br/><br/>"+contenido[2]+"<br/><br/>";
		    	content=content+new Config().regaloEmailDestinatario3+"</div>";
		    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("compraNormal")) {
	    		content=content+ new Config().Cabecera2; 
		    	content=content+new Config().compraNormal;
		    	content=content+ "<div style='float:left;width:100%'>"
		    			+ "<p style='float:left;margin-top:25px;text-align:center;width:100%'><b >Detalles de tu compra</b></p>"
		    			/*+ "<p style='text-align:center;margin-top:10px;float:left;width:100%'>Pedido #: "+contenido[1]+"</p>"
		    			+ "<p style='text-align:center;float:left;width:100%;margin-top: -10px;'>Fecha Pedido: "+contenido[2]+"</p>" 
		    			+ "<p style='text-align:center;float:left;width:100%;margin-top: -10px;'>Usuario: "+contenido[3]+"</p>"*/ 
		    			+ "<p style='text-align:center;float:left;width:100%;margin-top: -10px;margin-bottom: 40px;'>Pack: "+contenido[3]+"</p><br/><div style='float:left;margin-top:10px'></div>";
	    				 
		    	content=content+new Config().pie2;
		    	content=content+new Config().decoradores_url+"mails/pie/"+contenido[0]; 
		    	content=content+new Config().pie21;
	    } else if (Arrays.asList(contenido).contains("compraNormalCodigo")) {
	    		content=content+ new Config().Cabecera2; 
		    	content=content+new Config().compraNormal;
		    	content=content+ "<div style='float:left;width:100%'>"
		    			+ "<p style='float:left;margin-top:25px;text-align:center;width:100%'><b >Detalles de tu compra</b></p>"
		    			/*+ "<p style='text-align:center;margin-top:10px;float:left;width:100%'>Pedido #: "+contenido[1]+"</p>"
		    			+ "<p style='text-align:center;float:left;width:100%;margin-top: -10px;'>Fecha Pedido: "+contenido[2]+"</p>" 
		    			+ "<p style='text-align:center;float:left;width:100%;margin-top: -10px;'>Usuario: "+contenido[3]+"</p>"*/ 
		    			+ "<p style='text-align:center;float:left;width:100%;margin-top: -10px;margin-bottom: 40px;'>Pack 179€ para proyecto con id:"+contenido[3]+"</p><br/><div style='float:left;margin-top:10px'></div>";
	    				 
		    	content=content+new Config().pie2;
		    	content=content+new Config().decoradores_url+"mails/pie/compraNormal"; 
		    	content=content+new Config().pie21;
	    } else if (Arrays.asList(contenido).contains("decoradorPaso1")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0]; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().decoradorPaso1;
		    	content=content+"<br/>Proyecto: "+contenido[1]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("decoradorPaso2")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0]; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().decoradorPaso2;
		    	content=content+"<br/>Proyecto: "+contenido[1]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("usuarioAceptarCita")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/decoradorPaso2"; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().usuarioAceptarCita;
		    	content=content+"<br/>Proyecto: "+contenido[1]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("usuarioRechazarCita")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0]; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().usuarioRechazarCita;
		    	content=content+"<br/>Proyecto: "+contenido[1]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("decoradorRecordatorioCita")) {
	    		// FALTA ESTE MENSAJE
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/decoradorPaso2"; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().decoradorRecordatorioCita;
		    	content=content+"<br/>"+contenido[1]+"<br/>";
		    	content=content+new Config().decoradorRecordatorioCita2;
		    	content=content+"<br/>A través de  "+contenido[2];
		    	content=content+" a las: "+contenido[3];
		    	content=content+new Config().decoradorRecordatorioCita3;
		    	content=content+"<br/><br/>Proyecto: "+contenido[4]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("usuarioPropuestas2D")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0]; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().usuarioPropuestas2D;
		    	content=content+"<img src='"+new Config().decoradores_url+"mails/cabecera/pasos.jpg' style='width: 100%;margin-top:15px'/>";
		    	content=content+new Config().usuarioPropuestas2D2;
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("decoradorPropuestas2D")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/usuarioPropuestas2D"; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().decoradorPropuestas2D;
		    	content=content+"<br/>Proyecto: "+contenido[1]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("usuarioPropuestas3D")) {
	    		content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/usuarioPropuestas2D"; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().usuarioPropuestas3D;
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("decoradorPropuestas3D")) {
    			content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/usuarioPropuestas2D"; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().decoradorPropuestas3D;
		    	content=content+"<br/>Proyecto: "+contenido[1]+"<br/>";
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("usuarioListaCompra")) {
			content=content+ new Config().Cabecera3; 
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0]; 
	    		content=content+ new Config().Cabecera31; 
		    	content=content+new Config().usuarioListaCompra;
		    	content=content+new Config().pie3;
	    } else if (Arrays.asList(contenido).contains("usuarioFinalizar")) {
		    	content=content+new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0];
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().usuarioFinalizar;
		    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("decoradorProyectoAceptado")) {
	    		content=content+new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/usuarioFinalizar";
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().decoradorProyectoAceptado;
		    	content=content+contenido[1];
		    	content=content+new Config().decoradorProyectoAceptado2;
		    	content=content+new Config().pie1;
	    }  else if (Arrays.asList(contenido).contains("decoradorAceptado")) {
	    		content=content+new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0];
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().decoradorAceptado; 
		    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("info")) {
	    		content=content+new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/"+contenido[0];
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().info; 
		    	content=content+contenido[1]; 
		    	content=content+"<br/><br/>"+contenido[2]; 
		    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("mensajeContacto")) {
	    		content=content+new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/info";
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().info; 
		    	content=content+contenido[1];  
		    	content=content+new Config().pie1;
	    } else if (Arrays.asList(contenido).contains("recordatorio")) {
	    		content=content+new Config().Cabecera1;
		    	content=content+new Config().decoradores_url+"mails/cabecera/info";
		    	content=content+new Config().Cabecera11;
		    	content=content+new Config().recordatorio; 
		    	content=content+"Contraseña: "+contenido[1];  
		    	content=content+new Config().pie1;
	    }
    	
    	
    	 // Create a Session object to represent a mail session with the specified properties. 
    	Session session = Session.getDefaultInstance(props);

        // Create a message with the specified information. 
        MimeMessage msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("decotheco@decotheco.com"));
        msg.addRecipients(Message.RecipientType.TO, 
                InternetAddress.parse(toMail));
       // String[] a= toMail.split(",");
       // for(int i=0; i<a.length; i++){
        	// msg.setRecipient(Message.RecipientType.TO, new InternetAddress(toMail));
       // }
       
        //msg.setRecipient(Message.RecipientType.TO, new InternetAddress("info@decotheco.com"));
         msg.setSubject(subject);
        msg.setContent(content, "text/html; charset=utf-8");
        
    	Transport transport = session.getTransport();
		try {


	         
            
            // Connect to Amazon SES using the SMTP username and password you specified above.
            transport.connect(HOST, username, password);
        	
            // Send the email.
            transport.sendMessage(msg, msg.getAllRecipients()); 
			log.info("Email enviado!");

			log.info("Done");

		} catch (MessagingException e) {
			log.error("ERROR en try catch:" + e.getMessage()); 
			
		}
		 finally
	        {
	            // Close and terminate the connection.
	            transport.close();        	
	        }
		return 0;
	}
	public static void main(String[] args) throws Exception {
		Mail a= new Mail();
		String[] arr = {"Este es un mail automático generado por decotheco.com. \nRecuerda, el día 18/06/2016 a las 12:00 nos pondremos en contacto contigo vía Skype (@manolitadiaz.skype) \n:)"}; 
		a.sendMail( " pcageao@gmail.com", "decoracion-online@decotheco.com", "No responda - Recordatorio de cita - Paso 2", arr);
	}
	
}
