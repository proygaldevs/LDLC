package sarandon.assistance.servlet.more;

public class Config {
	
	//DESA
	
	public static String urlPagoConTPVHecho = "http://localhost:8080"+"/PagoConTPVHecho";
	public String bucket_name = "desa.decotheco-thecoradores";
	public String bucket_region = "s3-eu-west-1.amazonaws.com";
	public String bucket_protocol = "https";
	
	
	public static String urlForRedirects="http://localhost:8080/UsuariosFrontEnd";
	
	public static String decoradores="http://localhost:8080/ThecoradoresFrontEnd";
	
	public static String claveComercio = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";

	
	
	//PRO
/*			
	public static String urlPagoConTPVHecho = "https://services.decotheco.com"+"/PagoConTPVHecho";
	public String bucket_name = "pro.decotheco-thecoradores";
	public String bucket_region = "s3-eu-west-1.amazonaws.com";
	public String bucket_protocol = "https";
	
	
	public static String urlForRedirects="http://decotheco.com";
	
	public static String decoradores="http://decoradores.decotheco.com";
	
	public static String claveComercio = "UsdEh2Q0FcHbUU/6haQ/ZqDz5BM/45Xq";

*/
	
	public static String URL_base_mobiliario=new sarandon.assistance.servlet.more.Config().decoradores_url+"ldlc/icons/mobiliario/";
	public static String URL_base_complementos=new sarandon.assistance.servlet.more.Config().decoradores_url+"ldlc/icons/complementos/";
	public static String URL_base_extras=new sarandon.assistance.servlet.more.Config().decoradores_url+"ldlc/icons/extras/";
	
	public static String URL_items=new sarandon.assistance.servlet.more.Config().decoradores_url+"ldlc/items/";
	

	public static String proyectos=decoradores+"/home.html";
	
	

	//public String decoradores_url="https://s3-eu-west-1.amazonaws.com/"+bucket_name+"/";
	public String decoradores_url=bucket_protocol+":/"+"/"+bucket_region+"/"+bucket_name+"/";
	//public String decoradores_url = new Config().bucket_protocol+":/"+"/"+new Config().bucket_name+"."+new Config().bucket_region+"/";
	
	
	public String Cabecera1="<div style='width:100%;height: auto;float: left; padding-top: 8%;background-color:#dcdcdc'><img src='";
	public String Cabecera11=".jpg' style='width:80%;margin-left:10%;height:auto;float:left;border:0'/><div style='background-color:white;float:left;width:80%;margin-left:10%;'><div style='padding:5%;text-align:left;font-size:0.8em'>";
	
	public String Cabecera2="<div style='width:100%;height: auto;float: left; padding-top: 8%;background-color:#dcdcdc'>"
			+ "<div style='background-color:white;float:left;width:80%;margin-left:10%;'><div style='margin-top:10px;text-align:center;width:20%;margin-left:40%;'><img src='"+decoradores_url+"mails/pie/logo-pie.jpg' style='width:100%;margin-top:15px'/></div><div style='padding:5%;text-align:left;font-size:0.8em'>"
			+ "";
	
	public String Cabecera3="<div style='width:100%;height: auto;float: left; padding-top: 8%;background-color:#dcdcdc'><img src='";
	public String Cabecera31=".jpg' style='width:80%;margin-left:10%;height:auto;float:left;border:0'/><div style='background-color:white;float:left;width:80%;margin-left:10%;'><div style='padding:5%;text-align:left;font-size:0.8em'>";
	
	
	public String mensajeBienvenidaUsuario="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>¡Bienvenido!</div>"
			+ "<p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Bienvenid@ a Deco The Co.! <br/><br/>"
			+ "A partir de hoy vamos a comenzar juntos una aventura y queremos que formes parte activa en ella.<br/><br/>"
			+ "Tu suscripción te da acceso a un montón de experiencias que esperamos disfrutes mucho. Pero no queremos molestar demasiado, así que sólo nos pondremos en contacto contigo si nos necesitas.<br/><br/>"
			+ "Ahora que estás dentro, coge tu equipo de investigación y cotillea toda nuestra web. Conoce a nuestros decoradores, crea y comparte tus moodboards, y si lo deseas contrata nuestros servicios.<br/><br/>";
	
	public String mensajeBienvenidaDecorador="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>¡Bienvenido!</div>"
			+ "<p style='width:100%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Bienvenido al equipo Deco The Co.!<br/><br/>"
			+ "Tu registro como decorador está pendiente de revisión, completa tu perfil y pronto tendrás una respuesta.<br/><br/>"
			+ "Mientras esperas, coge tu equipo de investigación y cotillea toda nuestra web. Conoce a tus nuevos compañeros decoradores, crea y comparte tus moodboards, prueba nuestra herramienta de listas de la compra y curiosea las tiendas con las que trabajamos.<br/><br/>";
	
	public String mensajeDecoradorPlataforma="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>¡Hola!</div>"
			+ "<p style='width:100%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Se ha registrado un decorador nuevo!<br/><br/>"
			+ "Email:<br/> ";
	
	public String mensajeDecoradorFactura="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>¡Factura subida!</div>"
			+ "<p style='width:100%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "La factura se ha subido correctamente, verificaremos los datos y procederemos al pago. Si te diriges al menú de la plataforma y haces click en facturación, podrás ver un listado de las facturas que hayas subido y su estado.<br/><br/>";	
	
	public String mensajeFacturaPlataforma="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>¡Factura subida!</div>"
			+ "<p style='width:100%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "Un decorador subió una factura. Email:<br/><br/>";	
	
	public String regaloCajaComprador="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Caja Deco</div>"
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "Tu pedido Caja-Deco ya está confirmado. Nos ponemos en marcha para que el regalo pueda recibirse y disfrutar ¡cuanto antes!<br/><br/>"
			+ "En aproximadamente cinco días laborables el pedido llegará a su destino. Como es probable que estés deseando que llegue cuando antes, si quieres saber dónde se encuentra contacta con nosotros aportando los datos del pedido que se encuentran más abajo.<br/><br/>"
			+ "Consulta la información sobre tu pedido a continuación:<br/>"
			+ "";
	
	public String regaloCajaApl="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Caja Deco</div>"
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "Un pedido Caja-Deco ya está confirmado.<br/><br/>"
			+ "Consulta la información sobre el pedido a continuación:<br/>"
			+ "";
	
	public String regaloEmailComprador="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>E-tarjeta</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "Tu pedido E-tarjeta ya está confirmado. Nos ponemos en marcha para que la persona que hayas elegido pueda recibirlo.<br/><br/>"
			+ "Como ya sabes, la E-tarjeta puede tardar en llegar al destinatario hasta 2 días laborables, que es el tiempo que nos llevará personalizarla con tu mensaje.<br/><br/>"
			+ "Consulta la información sobre tu pedido a continuación:<br/>";
	/*regaloCajaComprador2*/
	
	public String regaloEmailDestinatario="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Regalo E-tarjeta de un amigo</div>"
			+ "<p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Alguien que te quiere mucho ha decidido darte una sorpresa ¡que te va a encantar!<br/><br/>"
			+ " Pero antes de desvelarte nada, deja que nos presentemos. Somos Deco The Co., una pequeña empresa de decoración online que trabaja con mimo y dedicación para llenar vuestros hogares de sueños cumplidos.<br/><br/>"
			+ "¿Tienes algún sueño por cumplir en tu hogar? Pues atiende:<br/><br/>";
	public String regaloEmailDestinatario2="<br/><span style='font-size:0.9em;letter-spacing: 2px;font-family:Georgia, Times, Times New Roman, serif;line-height:160%;'>¿Empezamos? Es muy sencillo.<br/><br/>"
			+ "<a style='color:black;text-decoration:none' href='"+urlForRedirects+"'><b>Regístrate</b></a> en nuestra web, entra en como funciona, pulsa en comprar pack de 179€ e introduce el siguiente código regalo: </span>";
	public String regaloEmailDestinatario3="<span style='letter-spacing: 2px;font-family:Georgia, Times, Times New Roman, serif;line-height:160%;font-size:0.9em;'> ¡Listo! Una vez hecho recibirás más instrucciones, super sencillas, para que esa idea que tienes en mente se convierta en realidad.</span>";
		
	public String compraNormal="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Datos del pedido</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>" 
			+ "¡Hola!<br/><br/> "
			+ "Tu pedido ya está confirmado.<br/><br/>"
			+ "¡Disfrútalo!<br/><br/>"
			+ "Consulta la información sobre tu pedido a continuación:<br/><br/>";
	
	public String decoradorPaso1="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Un usuario rellenó el paso 1</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Alquien te ha seleccionado como su decorador, ¡Enhorabuena! Pronto recibirás un correo electrónico  con una propuesta de cita - vía teléfono o skype-  para que puedas ponerte en contacto con tu nuevo cliente. Ya puedes consultar las ideas que tiene, sus deseos y alguna información sobre su espacio.<br/><br/>"
			+ "¡Empezamos!<br/><br/>";
	
	public String decoradorPaso2="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Un usuario rellenó el paso 2</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ " Alquien estableció una fecha de contacto para empezar a hablar de su proyecto.<br/><br/>"
			+ "Dirígete a la plataforma y acepta la cita, en caso de no poder atenderle en ese momento, rechace la cita y utilice el chat para establecer una nueva, en caso de llegar a un acuerdo, el cliente debe establecer la nueva fecha y debes de aceptarla para poder pasar al siguiente paso.<br/><br/>"
			+ "¡Manos a la obra compañero!<br/><br/>";
	
	public String usuarioAceptarCita="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>El decorador aceptó la cita</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "El decorador se pondrá en contacto contigo el día establecido. Si por algún motivo no pudieras atenderle el día y/o a la hora indicada, ponte en contacto directamente con el decorador a través del chat interno de la plataforma para acordar una nueva cita.<br/><br/>"
			+ "<Muchas gracias por confiar en nosotros<br/><br/>";
	
	public String usuarioRechazarCita="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>El decorador rechazó la cita</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Al decorador le será imposible contactarte el día que has indicado. Pero ¡keep calm!, puedes proponer una nueva cita a través del chat interno del proyecto, una vez hablado con el decorador, establece la nueva fecha en el paso2, para ser aceptada y poder seguir avanzando en el proyecto.<br/><br/>"
			+ "Esperamos que no te ocasione mucha molestia este pequeño contratiempo ¡sigamos adelante!<br/><br/>"
			+ "Muchas gracias por confiar en nosotros<br/><br/>";
	
	public String decoradorRecordatorioCita = "<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Recordatorio cita</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Te recordamos que mañana tienes que ponerte en contacto con: <br/>";
	public String decoradorRecordatorioCita2 = "<br/> La forma de contacto y hora:<br/>";
	public String decoradorRecordatorioCita3 ="<br/><br/>Si por algún motivo no pudieras atenderle el día y/o a la hora indicada, ponte en contacto directamente con el usuario a través del chat interno de la plataforma para acordar una nueva cita.";
	
	public String usuarioPropuestas2D="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Propuestas 2D listas</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Ya puedes conocer las propuestas en 2D del decorador. Pero eh!<br/><br/>¡Espera!<br/><br/>"
			+ "Sabemos que estás impaciente por verlas, pero termina de leer, queremos recordarte el proceso.<br/><br/>"
			+ "Entras en la plataforma y revisas las propuestas, eliges la que más te gusta y ¡seguimos trabajando!<br/><br/>";
	public String usuarioPropuestas2D2="<p style='font-size:0.9em;letter-spacing: 2px;font-family:Georgia, Times, Times New Roman, serif;line-height:160%;text-align:center;margin-top:10px'>¡Ya no falta nada!</p><br/>"
			+ "<p style='margin-left:5%;width:90%;font-size:0.9em;letter-spacing: 2px;font-family:Georgia, Times, Times New Roman, serif;line-height:160%;'>Estamos a tu entera disposición así que no dudes en contactarnos cuando lo necesites. Visita nuestras Preguntas frecuentes si tienes alguna duda que resolver o escríbenos y charlamos."
			+ "Muchas gracias por confiar en nosotros</p><br/><br/>";
	
	public String decoradorPropuestas2D="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Propuesta 2D aceptada</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Ha sido aceptada una propuesta 2D en uno de los proyectos<br/><br/>"
			+ "Seguramente ya habrás hablado con tu cliente y conozcas sus impresiones, pero no sabes las nuestras. ¡Estamos orgullosos del esfuerzo y el tiempo invertido!<br/><br/>"
			+ "¡Ya no falta nada para acabar!<br/><br/>"
			+ "Manos a la obra con el siguiente Paso.<br/><br/>";

	public String usuarioPropuestas3D="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Propuestas 3D listas</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Te traemos buenas noticias, el decorador acaba de subir tu estancia en 3D. ¿Impaciente?  Entra en la plataforma y conoce el resultado. Recuerda que todavía te queda por recibir el plano y la lista de la compra, ¡y ya podrás ponerte manos a la obra!<br/><br/>"
			+ "Estamos a tu entera disposición así que no dudes en contactarnos cuando lo necesites. Visita nuestras Preguntas frecuentes si tienes alguna duda que resolver o escríbenos y charlamos.<br/><br/>"
			+ "Muchas gracias por confiar en nosotros<br/><br/>";
			
	
	public String decoradorPropuestas3D="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Propuestas 3D aceptadas</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Han sido aceptadas las propuestas 3D en uno de los proyectos<br/><br/>"
			+ "Seguramente ya habrás hablado con tu cliente y conozcas sus impresiones, pero no sabes las nuestras. ¡Estamos orgullosos del esfuerzo y el tiempo invertido!<br/><br/>"
			+ "¡Ya no falta nada para acabar!<br/><br/>"
			+ "Manos a la obra con los planos y lista de la compra.<br/><br/>";
	
	
	public String usuarioListaCompra="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Planos y lista de la compra listos</div>" 
			+ "<br/><hr style='width: 90%;padding-left: 0%;'/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "¿Conoces esa sensación tan placentera que te recorre cuando esperas un regalo? A veces la espera es mejor que recibir el regalo en sí, ¿verdad?<br/><br/>"
			+ "Esperamos que no sea ese caso porque tu espera ha terminado, ¡Ya tienes en la plataforma el plano y la lista de la compra!<br/><br/>"
			+ "Sabemos que estás en contacto continuo con tu decorador pero te recordamos que tienes que darle el visto bueno para poder finalizar el proyecto. Después de eso te haremos llegar la factura y ya habremos terminado. ¡No queda nada!<br/><br/>"
			+ "Muchas gracias por confiar en nosotros<br/><br/>";
			
	public String usuarioFinalizar="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Proyecto finalizado</div>" 
			+ "<br/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Ya tienes todo el material en tu poder, el siguiente paso ya es cosa tuya.<br/><br/>"
			+ "Pero ¿eh?, nuestra aventura a tu lado todavía no ha acabado. Queremos seguir acompañándote durante lo que queda del proceso. Puedes ir compartiendo con nosotros los pasos que das a través de las redes sociales, estaremos encantados de verlos.<br/><br/>"
			+ "No olvides emplear nuestra plataforma para acceder a las tiendas recomendadas y hacer tus pedidos desde la lista de la compra que te ha facilitado tu decorador.<br/><br/>"
			+ "Esperamos volver a verte pronto por aquí. <br/><br/>";
			
	public String decoradorProyectoAceptado="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Proyecto finalizado</div>" 
			+ "<br/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "¡Somos portadores de buenísimas noticias! El usuario del proyecto '";
	
	public String decoradorProyectoAceptado2="' ha aceptado el plano y la lista de la compra y por tanto ¡ya has finalizado el proyecto!<br/><br/>"
			+ "¡Muchísimas felicidades!<br/><br/>"
			+ "El último paso que debes completar, para poder archivar este trabajo, es <b>enviarnos la factura a través de la plataforma</b> y completar la info del proyecto para que podamos incorporarlo a tu portfolio de trabajos. No dudes en que eso motivará que pronto te lleguen nuevos proyectos. <br/><br/>"
			+ "Esperamos que hayas tenido una experiencia super motivadora para seguir con todas las ganas. Y no dudes en consultar la página de facturación de tu perfil para estar informado en todo momento cuándo se realizará el pago de este proyecto.";
			
	public String decoradorAceptado="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Has sido aceptado</div>" 
			+ "<br/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>"
			+ "¡Hola!<br/><br/>"
			+ "Hemos revisado tu solicitud de registro como decorador y ahora ya podemos decir oficialmente que ¡formas parte del equipo Deco The co!."
			+ "<p style='text-align:center;width:90%;padding:5%;letter-spacing: 2px;font-family:Georgia,Times,Times New Roman,serif'>¡Bienvenido!</p>"
			+ "<p style='width:90%;padding:5%;letter-spacing: 2px;font-family:Georgia,Times,Times New Roman,serif'>Ahora dispones de un espacio personal que puedes compartir con tus seguidores para que te contraten a través de la plataforma.<br/><br/>"
			+ "Rediseña tu perfil, llénalo de trabajos realizados por ti y promociónalo.</p>"
			+ "<p style='text-align:center;width:90%;padding:5%;letter-spacing: 2px;font-family:Georgia,Times,Times New Roman,serif'>¡Pronto empezarás a recibir solicitudes de proyectos!</p>"
			+ "<p style='width:90%;padding:5%;letter-spacing: 2px;font-family:Georgia,Times,Times New Roman,serif'>Estamos a tu entera disposición así que no dudes en contactarnos cuando lo necesites. Visita nuestras preguntas frecuentes si tienes alguna duda que resolver o escríbenos y charlamos.</p>";
	
	public String info="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Información</div>" 
			+ "<br/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif'>";
	
	public String recordatorio="<p><div style='font-size:1.2em;letter-spacing: 2px;text-align: center;padding-top:15px;font-family: Helvetica, Times, Times New Roman, serif;text-transform: uppercase '>Recordatorio contraseña - Decotheco</div>" 
			+ "<br/><p style='width:90%;padding:5%;letter-spacing: 2px;line-height:160%;padding-bottom:0;font-size:0.9em;font-family:Georgia, Times, Times New Roman, serif;text-align:center'>";
	
	
	public String pie1 = "</p> </p> </div> "
			+ "<div style='width:90%;float:left;padding:5%;padding-top:0;padding-top:0;text-align:center;font-size:0.7em;color:black;border-top:0'> "
			+ "<a style='float:left;width:37%;margin-left:5%;background-color:grey;padding:8px;border-radius:3px;color:white;text-decoration:none' href='"+urlForRedirects+"/FAQS.html'>Preguntas Frecuentes</a>"
			+ "<a  style='float:left;width:37%;margin-left:6%;background-color:grey;padding:8px;border-radius:3px;color:white;text-decoration:none' href='"+urlForRedirects+"/contacto.html'>¡Escríbenos!</a>"
			+ "<p style='float:left;text-align:center;width:20%;margin-left:40%;font-family:Georgia, Times, Times New Roman, serif;letter-spacing: 2px;'><br/><br/>El equipo <br/><img src='"+decoradores_url+"mails/pie/logo-pie.jpg' style='width:100%;margin-top:15px'/></p>"
			+ "</div>"
			+ "</div><br/></div>";
	
	
	public String pie2 = "</p> </p> </div><hr style='width:90%;margin-left:5%;'/> "
			+ "<div style='width:90%;float:left;padding:5%;padding-top:0;padding-top:0;text-align:center;font-size:0.7em;color:black;border-top:0'> "
			+ "<br/><a style='float:left;width:37%;margin-left:5%;background-color:grey;padding:8px;border-radius:3px;color:white;text-decoration:none' href='"+urlForRedirects+"/FAQS.html'>Preguntas Frecuentes</a>"
			+ "<a  style='float:left;width:37%;margin-left:6%;background-color:grey;padding:8px;border-radius:3px;color:white;text-decoration:none' href='"+urlForRedirects+"/contacto.html'>¡Escríbenos!</a>"
			+ "<br/></div></div><div style='width:100%;height: auto;background-color:white'><img src='";
	public String pie21 = ".jpg' style='width:100%;margin-left:0%;height:auto;float:left;border:0'/><div style='padding:5%;text-align:left;font-size:0.8em'>"
			+ "</div>";
	
	public String pie3 = "</p> </p> </div><hr style='width:80%;margin-left:10%;'/> "
			+ "<div style='width:90%;float:left;padding:5%;padding-top:0;padding-top:0;text-align:center;font-size:0.7em;color:black;border-top:0'> "
			+ "<br/><a style='float:left;width:37%;margin-left:5%;background-color:grey;padding:8px;border-radius:3px;color:white;text-decoration:none' href='"+urlForRedirects+"/FAQS.html'>Preguntas Frecuentes</a>"
			+ "<a  style='float:left;width:37%;margin-left:6%;background-color:grey;padding:8px;border-radius:3px;color:white;text-decoration:none' href='"+urlForRedirects+"/contacto.html'>¡Escríbenos!</a>"
			+ "<br/></div><div style='width:100%;height: auto;background-color:white'><img src='"+decoradores_url+"mails/pie/piePasos.jpg' style='width:100%;margin-left:0%;height:auto;float:left;border:0'/>"
			+ "</div>"; 
	
	

}
