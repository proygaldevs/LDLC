<%@ page import="sarandon.decotheco.ldlc.Parser" %>


<%

	//recupero parámetros: id_ldlc, createldlc, cargar_elemento, 
	String id_decorador = request.getParameter("id_decorador");

	String url = request.getParameter("ref");
	
	

	//*****************QUITAR
	//todo: quitar esto
	//id_decorador = "1";
	
	url="https://www.zalando.es/ropa-de-mujer/";
	//p.run("https://www.zalando.es/ropa-de-mujer/");
	
	
	//url=http://www.ikea.com/es/es/catalog/categories/departments/kitchen/kitchen_int_lighting/";
	//*****************QUITAR
	

  	Parser p = new Parser();
	p.run(url);

	
%>
<html>
	<head>
		<title><%=p.pageTitle%></title>
		<link rel="stylesheet" href="estilos.css?versionCssJs=1" type="text/css">   
		<script type="text/javascript" src="js/functions.js?versionCssJs=1" ></script>
		
		<link rel="stylesheet" href="css/bootstrap.css?versionCssJs=1">
        <link rel="stylesheet" href="css/estilo.css?versionCssJs=1" type="text/css">
		<script>
			console.log('Cargando <%=url%>');
		</script>
		<!-- PARA QUE FUNCIONE MODAL LOGIN	 -->
		<script type="text/javascript" src="js/jquery.min.js?versionCssJs=1"></script>
		<script type="text/javascript" src="js/bootstrap.js?versionCssJs=1"></script>
     	<script type="text/javascript" src="js/links.js?versionCssJs=1" ></script>
		<script type="text/javascript" src="js/login.js?versionCssJs=1" ></script>
		 <style>
        input:-webkit-autofill {
   			-webkit-box-shadow: 0 0 0 30px white inset;
  		}
        .modal-header {
        	border-bottom:0
        }
        .modal-body {
        	width:90%;
        	margin-left:5%
        }
        input[type="text"], input[type="password"] {
        	width:93%
        }
        .modal-footer {
        	width:93%;
        	border:0;
        	background-color:white
        } 
        .buttonstandard_invertido  {
        	overflow: hidden;
		    text-overflow: ellipsis;
		    display: inline-block;
		    padding-top: 5px;
		    padding-bottom: 2px;
		    padding-left: 5px;
		    padding-right: 5px;
		    text-transform: uppercase;
		    letter-spacing: 5px;
		    width: 93%;
		    max-width: 100%;
		    text-align: center;
		    white-space: nowrap;
		    vertical-align: middle;
		    cursor: pointer;
		    text-decoration: none;
		    -moz-user-select: none;
		    background-image: none;
		    border: 1px solid rgba(0, 0, 0, 1);
		    border-radius: 1px;
		    transition: all 0.3s ease 0s;
		    line-height: 1.75;
		    color: white;
		    background-color: black;
        }
        .buttonstandard_invertido:hover { 
        	text-decoration: none;
		    background-color: white;
		    color: black;
        }
        #errors_container {
        	margin-top:13%
        }
        </style>
    </head>
    
    <body class="wk win" onload="inicializar();login('form')">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="0" width="0">
	  <defs>
	     <filter id="blur" x="0" y="0">
	       <feGaussianBlur stdDeviation="6" />
	     </filter>
	  </defs>
	</svg>
	<div id="elcontainerfluid" class=" conefectos supreme-container container-fluid" style="padding-right: 0px; padding-left: 0px;">

		<div class="new_header fullsize logo_only" id="headercontainer" >
			<div id="header_container">
				<div id="header" >
					<div class="logo" id="nav_logo">
						<img width="200" height="34" alt="Deco The co" src="img/logo128.png" title="Deco The co" >
					</div>
				</div>
			</div>
		</div>
		<div id="close" style="position: absolute; top: 7px; right: 7px;" onclick="window.close();">×</div>
		<div id="container">
			<div id="login" class="msg hidden invisible" style="display: none; visibility: hidden;">
				<h1>Sign up to get styling ideas for this item!</h1>
				
				<div id="user_actions">
					<div><a target="_blank" href="https://decotheco.com/" class="btn btn_action facebook_connect">Connect with Facebook</a></div>
					<div class="register">
						<a target="_blank" href="https://decotheco.com/" class="btn">Sign up with email</a>
					</div>
					<div class="signin"><a target="_blank" href="https://decotheco.com/">Already have an account?</a></div>
				</div>
			</div>
			<div id="err" class="msg err"></div>
			<div id="msg" class="msg"></div>
			<div id="main" class="" style="display: block; visibility: inherit;">
				<p>[LISTA DE LA COMPRA]</p>
				<div id="left" style="width: 630px;">
					<div id="available_images" style="max-height: 328px;">
						<div class="resultset" trackcontext="resultset" trackelement="resultset">
							<div class="emptymsg unselectable" unselectable="on">
						</div>
						<div class="unselectable bd" unselectable="on">
						
						<% 
							for (int i=0; i<p.listaImagenes.size(); i++){
								%>
								<div id="picker_image<%=i%>" class="clipper_image _83">
									<div class="image_wrapper">
										<div class="image_background">
											<img src="<%=p.listaImagenes.get(i).URLImage%>" class="clipper_image" onclick="if(event.ctrlKey){
																																unSelectImage('picker_image<%=i%>');
																															}else{ 
																																selectImage('picker_image<%=i%>');
																																setURL('<%=url%>');
																																setURLimage('<%=p.listaImagenes.get(i).URLImage%>');
																															}" >
										</div>
									</div>
								</div>
								<% 
							}
						%>

							
						</div>
						<div class="result_footer"></div>
					</div>
				  </div>
				
				</div>
				<div id="right">
				<form enctype="multipart/form-data" id="import_form" action="CreateFromExtension" method="POST" class="newform " >
					<div class="hidden_inputs">
						<input type="hidden" id="default_title" value="<%=p.pageTitle%>" >
						<input type="hidden" id="itemurl" name="itemurl" value="<%=url%>" >
						<input type="hidden" id="itemurlimage" name="itemurlimage" value="" >
						<input type="hidden" id="decorador_id" name="decorador_id" value="" >
					</div>
					<div class="input type_text " id="js_import_form_row1">
						<label for="title">T&iacute;tulo</label>
						<div class="value">
							<input type="text" class="input-box"  id="itemtitulo" name="itemtitulo" value="<%=p.pageTitle%>" >
						</div>
						<ul id="js_import_form_error2" class="error"></ul>
					</div>
					<div class="input type_text " id="js_import_form_row7">
						<label for="tags">Etiquetas</label>
						<div class="value"> 
							<input type="text" class="input-box" id="itemetiquetas" name="itemetiquetas">
						</div>
						<div class="meta input_hint">ej. silla, mesa, cortina,...</div>
						<ul id="js_import_form_error8" class="error"></ul>
					</div>
					<div class="input type_select " id="js_import_form_row9">
						<label for="price">Precio Encontrado</label>
						<div class="value">
							<select name="itemprecio" class="input-box" id="itemprecio"  data-value="">
							<% 
								for (int i=0; i<p.listaPrecios.size(); i++){
									%>
										<option value="<%=p.listaPrecios.get(i).replace(",", ".")%>"><%=p.listaPrecios.get(i)%></option>
									<% 
								}
							%>
							</select>
						</div>

						<ul id="jsimporterror" class="error">
						</ul>
					</div>
					<div class="input type_text " id="custom_price_container">
						<label for="custom_price">... o intruduce tú mismo el precio</label>
						<div class="value">
							<input  id="custom_price" class="input-box" type="number" step=".01" name="custom_price">
						</div>
					</div>
					<div class="input type_buttons " id="js_import_form_row17">
						<div class="value" >
							<ul class="actions horizontal">
								<li><input type="button" id="import_btn" class="btn_pill btn_action " onclick="submitform();" value="Guardar"></li>
							</ul>
						</div>
					</div>
					
					
					<div id="errors_container">
						<div id="no_image_selected"> No se ha seleccionado ninguna imagen.</div>
						<div id="no_price"> Debe introducir el precio.</div>
						<div id="bad-price-format"> Formato de precio incorrecto.</div>
						<div id="no_title"> Debe introducir el título.</div>
						<div id="no_tags"> Debe introducir al menos una etiqueta.</div>
					</div>
				</form>
				
				</div>
			</div>

		</div>
</div>
<!-- MODAL LOGIN -->
 <div class="modal fade" id="login-modal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
	style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header" align="center">
				<a style="position: absolute;right: 3px; top: 0px; color: black; cursor: pointer;" data-dismiss="modal"> <i class="fa fa-times" aria-hidden="true"></i></a>
				
				<h4 class="letra-xxl letra-mayusculas">Accede!</h4>
				<div style="width: 100%; text-align: center; padding-top: 3px; padding-bottom: 15px;padding-left: 1.5vw; padding-right: 1.5vw;  ">
					<div style="width: 90%; text-align: center; border-bottom-style: solid;  border-bottom-width: thin; "></div>
				</div> 
			</div>

			<!-- Begin # DIV Form -->
			<div id="div-forms">

				<!-- Begin # Login Form -->
				<form id="login-form">
					<div class="modal-body">
						<div id="div-login-msg">
							<div id="icon-login-msg" class="glyphicon glyphicon-chevron-right"></div> 
							<span id="text-login-msg"></span>
						</div>
						<input style="background-color: white;" id="login_username" class="form-control" type="text"
							placeholder="EMAIL*" required> <input
							id="login_password" class="form-control" type="password"
							placeholder="CONTRASEÑA*" required>
							<br/>
						<div class="checkbox">
							<label class="mantenersesioniniciada"> <input
								type="checkbox" id="check_login_recuerdame" checked>Mantener sesion iniciada
							</label>
						</div>
					</div><br/>
					<div class="modal-footer" style="padding:0;padding-bottom:15px">
						<div>
							<button type="button" onclick="loguear('form')"
								class="buttonstandard_invertido ">ENTRAR</button>
						</div>
						<div style="margin-top:3%">
							<button id="login_lost_btn" type="button" onclick="Registrar()" class="btn btn-link letra-mayusculas" style="color:black">¿Olvidaste
								tu contraseña?</button>
							<button id="login_register_btn" type="button"
								class="btn btn-link letra-mayusculas" onclick="Registrar()" style="color:black">Registrar</button>
						</div>
					</div>
				</form>
				<!-- End # Login Form -->

				<!-- Begin | Lost Password Form -->
				<form id="lost-form" style="display: none;">
					<div class="modal-body">
						<div id="div-lost-msg">
							<div id="icon-lost-msg"
								class="glyphicon glyphicon-chevron-right"></div>
							<span id="text-lost-msg">Escribe tu mail.</span>
						</div>
						<input style="background-color: white;" id="lost_email" class="form-control" type="text"
							placeholder="[E-MAIL]" required>
					</div>
					<div class="modal-footer">
						<div>
							<button type="submit"
								class=" botonesloginreglost btn btn-primary btn-lg btn-block">Enviar
								>></button>
						</div>
						<div>
							<button id="lost_login_btn"   type="button" class="btn btn-link letra-mayusculas">Acceder></button>
							<button id="lost_register_btn" type="button"
								class="btn btn-link letra-mayusculas">Registrar></button>
						</div>
					</div>
				</form>
				<!-- End | Lost Password Form -->

				

			</div>
			<!-- End # DIV Form -->

		</div>
	</div>
</div>
	</body>
</html>