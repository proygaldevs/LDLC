package sarandon.assistance.servlet;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.sun.mail.iap.Response;

import sarandon.assistance.model.Core;
import sarandon.assistance.model.CoreImpl;




/**
 * Servlet implementation class getNews
 */
public class DecoradoresController  extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(GetFrases.class);

	private boolean sessionOk(String token[]){
		if(token==null) return false;
			//comprobaremos el la validad del token
			if(token[0].length()>0 && true)
				return true;
		return false;
	}
	
	
		

	
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    	doGet(req, res);

    }

    private final String PARAM_TOKEN="token";
    private final String PARAM_DISPATCHER="action";
    
	private Enumeration<String> parametrosNombres;
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub


		
		request.setCharacterEncoding("utf8");

		response.setCharacterEncoding("utf8");


		
		
		try {
			 
			
			Map<String, String[]> parametros=request.getParameterMap();
			parametrosNombres = request.getParameterNames();
			
			
				//Token de seguridad
				
			if(sessionOk(parametros.get(PARAM_TOKEN))==false) { 
				response.getWriter().write(("ERROR TOKEN SESSION"));
				return;
			}else
				
				if(parametros.get(PARAM_DISPATCHER)==null) { 
					response.getWriter().write(("ERROR DISPATCHER"));
					return;
				}else{
					dispatcher(parametros.get(PARAM_DISPATCHER)[0],parametros, response);
				}
				
			
			
			

		
		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage()); 
			response.getWriter().write(("ERROR DISPATCHER"));
			response.getWriter().write("ERROR TOKEN SESSION - "+e.getMessage());
		}
		
	}
	
	private void dispatcher(String dispatch, Map<String, String[]> parametros, HttpServletResponse response) throws Exception{
		/*ThecoradoresCoreImpl thCore= new ThecoradoresCoreImpl();*/
		Core core= new CoreImpl();
		
		
		response.setHeader("Access-Control-Allow-Origin", "*");
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	    response.setHeader("Access-Control-Max-Age", "3600");
	    response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
	    
	    String path=getServletContext().getRealPath("/credentials");
	    
		switch (dispatch) {
		case "decoradores_crear":
			response.getWriter().write(core.decoradorCrear(parametros, path));
			break;
		case "get_borradores":
			response.getWriter().write(core.getBorradores(parametros, path));
			break;
		case "get_publicados":
			response.getWriter().write(core.getPublicados(parametros, path));
			break;
		case "get_items_paginado":
			response.getWriter().write(core.getItemsPaginado(parametros, path));
			break;
		case "decoradores_login":
			response.getWriter().write(core.decoradorLogin(parametros, path));
			break;
		case "decoradores_get_project":
			response.getWriter().write(core.decoradorGetProject(parametros, path));
			break;
		case "decoradores_modificar":
			response.getWriter().write(core.decoradorModificar(parametros, path));
			break;
		case "ldlc_etiquetas":
			response.getWriter().write(core.ldlcEtiquetas(parametros, path));
			break;
		case "get_ldlc_etiquetas":
			response.getWriter().write(core.getLdlcEtiquetas(parametros, path));
			break;
		case "ldlc_habitacion":
			response.getWriter().write(core.ldlcHabitacion(parametros, path));
			break;
		case "nombre_espacio":
			response.getWriter().write(core.nombreEspacio(parametros, path));
			break;
		case "nombre_espacio_decorador":
			response.getWriter().write(core.nombreEspacioDecorador(parametros, path));
			break;
		/*case "decoradores_activar":
			response.getWriter().write(core.decoradorActivar(parametros, path));
			break;*/
		case "decoradores_asociar_proyecto":
			response.getWriter().write(core.decoradorAsignarProyecto(parametros, path));
			break;
		case "decoradores_add_trabajo":
			response.getWriter().write(core.decoradorAddTrabajo(parametros, path));
			break;
		case "decoradores_trabajo":
			response.getWriter().write(core.decoradorTrabajo(parametros, path));
			break;
		/*case "decoradores_trabajo_add_etiqueta":
			response.getWriter().write(thCore.decoradorTrabajoAddEtiqueta(parametros, path));
			break;*/
		/*case "decoradores_trabajo_set_etiquetas":
			response.getWriter().write(thCore.decoradorTrabajoSetEtiquetas(parametros, path));
			break;*/
		case "decoradores_get_etiquetas":
			response.getWriter().write(core.getEtiquetas());
			break;
		case "get_items_by_etiquetas":
			response.getWriter().write(core.getItemsEtiquetas(parametros, path));
			break;
		case "get_items":
			response.getWriter().write(core.getItems(parametros, path));
			break;
		case "get_items_sinfondo":
			response.getWriter().write(core.getItemsSinFondo(parametros, path));
			break;
		/*case "decoradores_get_etiquetasByTrabajo":
			response.getWriter().write(thCore.decoradorGetEtiquetasByTrabajo(parametros, path));
			break;*/
		case "decoradores_get_decorador_info"://detail_level project_level
			response.getWriter().write(core.decoradorGetDecoradorwithNoCredentials(parametros, path));
			break;
		case "project_get_info"://detail_level project_level
			response.getWriter().write(core.projectGetInfo(parametros, path));
			break;
		case "project_get_info_pisos"://detail_level project_level
			response.getWriter().write(core.projectGetInfoPisos(parametros, path));
			break;
		case "project_get_info_promocion"://detail_level project_level
			response.getWriter().write(core.projectGetInfoPromocion(parametros, path));
			break;
		case "project_get_360"://detail_level project_level
			response.getWriter().write(core.projectGet360(parametros, path));
			break;
		case "aceptar_cita":
			response.getWriter().write(core.setAceptarCita(parametros, path));
			break;
		case "aceptarPaso3_2D":
			response.getWriter().write(core.setAceptarPaso3_2D(parametros, path));
			break;
		case "aceptarPaso3_3D":
			response.getWriter().write(core.setAceptarPaso3_3D(parametros, path));
			break;
		case "aceptarPaso4":
			response.getWriter().write(core.setAceptarPaso4(parametros, path));
			break;
		case "enviarPaso3_2D":
			response.getWriter().write(core.setEnviarPaso3_2D(parametros, path));
			break;
		case "enviarPaso3_3D":
			response.getWriter().write(core.setEnviarPaso3_3D(parametros, path));
			break;
		case "enviarPaso4":
			response.getWriter().write(core.setEnviarPaso4(parametros, path));
			break;
		case "getState":
			response.getWriter().write(core.getStatebyIdProject(parametros, path));
			break;
		case "getPisos":
			response.getWriter().write(core.getPisos(parametros, path));
			break;
		case "getProyectosPisos":
			response.getWriter().write(core.getProyectosPisos(parametros, path));
			break;
		case "checkLdlc":
			response.getWriter().write(core.checkLdlc(parametros, path));
			break;
		case "getLdlc":
			response.getWriter().write(core.getLdlc(parametros, path));
			break;
		case "get_Ldlc":
			response.getWriter().write(core.getLdlcInd(parametros, path));
			break;
		case "get_Ldlc_2d":
			response.getWriter().write(core.getLdlcInd2d(parametros, path));
			break;
		case "get_Ldlc_3d":
			response.getWriter().write(core.getLdlcInd3d(parametros, path));
			break;
		case "checkLdlcExtension":
			response.getWriter().write(core.checkLdlcExtension(parametros, path));
			break;
		case "checkDiscount":
			response.getWriter().write(core.checkDiscount(parametros, path));
			break;
		case "addDiscount":
			response.getWriter().write(core.addDiscount(parametros, path));
			break;
		case "subtractDiscount":
			response.getWriter().write(core.subtractDiscount(parametros, path));
			break;
		case "getFacturacion":
			response.getWriter().write(core.getFacturacion(parametros, path));
			break;
		case "decoradorSetFacturacion":
			response.getWriter().write(core.decoradorSetFacturacion(parametros, path));
			break;
		case "getPagoInfo":
			response.getWriter().write(core.getPagoInfo(parametros, path));
			break;
		case "url_Affiliates":
			response.getWriter().write(core.urlAffiliates(parametros, path));
			break;
		case "setAlert":
			response.getWriter().write(core.setAlert(parametros, path));
			break;
		case "getAlerts":
			response.getWriter().write(core.getAlerts(parametros, path));
			break;	
		case "getAfiliados":
			response.getWriter().write(core.getAfiliados(parametros, path));
			break;
		case "getAfiliadosInfo":
			response.getWriter().write(core.getAfiliadosInfo(parametros, path));
			break;
		case "getUsuariosInfo":
			response.getWriter().write(core.getUsuariosInfo(parametros, path));
			break;
		case "getInfoUserDecorador":
			response.getWriter().write(core.getInfoUserDecorador(parametros, path));
			break;
		case "getProjectsInfo":
			response.getWriter().write(core.getProjectsInfo(parametros, path));
			break;
		case "removeAlert":
			response.getWriter().write(core.deleAlert(parametros, path));
			break;
			
		default:
			response.getWriter().write(new Gson().toJson("ERROR - NO AVAIBLE ACTION"));
			break;
		}
	}
}
