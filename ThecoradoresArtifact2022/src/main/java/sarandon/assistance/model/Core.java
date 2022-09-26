package sarandon.assistance.model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import sarandon.assistance.vo.Cita;
import sarandon.assistance.vo.Facturacion;
import sarandon.assistance.vo.Preferencia;
import sarandon.assistance.vo.Promocion;
import sarandon.assistance.vo.Proyecto;
import sarandon.assistance.vo.User;
import sarandon.assistance.vo.portfolio.PortfolioItem;
import sarandon.decotheco.ldlc.model.ListaCompra;
import sarandon.decotheco.thecoradores.bean.Decoradores;
import sarandon.decotheco.thecoradores.bean.Etiquetas;
import sarandon.decotheco.thecoradores.bean.ProjectsStates;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sarandon.decotheco.thecoradores.bean.Trabajos;

public interface Core {

	
	//public Decoradores getDecoradorById(int id_decorador) throws Exception;
	public int setDecoradorToProject(int id_decorador, int project) throws Exception;
	public ProjectsStates getProjectStatebyId(int id_state) throws Exception;
	public ProjectsTypes getProjectType(int idType) throws Exception;
	public int getIdStateFromProjectbyIdProject(int id_proyecto) throws Exception;
	public int getIdTypeFromProyectbyId(int id_proyecto) throws Exception;
	public int setEstadoToProject(int estado, int id_project) throws Exception;
	int getNextStateFromAuxTypesStates(int id_type, int id_state) throws Exception;
	Proyecto getProyectoBasicById(int id_proyecto) throws Exception;
	Proyecto getProyectoById(int id_proyecto, String path) throws Exception; 
	Proyecto getProyecto360(int id_proyecto, String path) throws Exception; 
	/*
	 * 
	 * Metodo para mirar si un proyecto está pagado o no
	 * @author Diego Collazo
	 * @param idproyecto el id del proyecto que queremos buscar
	 * @return booleano true si esta pagado y false si no esta pagado
	 * */
	Boolean isPagado(int id_proyecto) throws Exception; 
	/*
	 * 
	 * Metodo para devolver el proyecto null del usuario
	 * @author Diego Collazo
	 * @param id_user el id del usuario que queremos buscar su proyecto null
	 * @return devuelve el id del proyecto si hay error 0
	 * */
	int getProjectNullByIdUser(int id_user) throws Exception; 
	
	Cita getCita(int id_proyecto) throws Exception;
	int setStateDateToProject(Date dateForInsert, int id_proyecto) throws Exception;
	int setNextEstado(int id_proyecto, int fromEstadoActual) throws  Exception;
	int validateDecoradorByMail(String mail, String pass) throws Exception;
	int validateDecoradorByIdentificadorUnico(String identificadorUnico, String pass) throws Exception;
	Decoradores getDecoradorByMail(String mail, int detail_level, int detail_level_projects, String path) throws Exception;

	Set<Etiquetas> getEtiquetasByIdTrabajo(int id_trabajo) throws Exception;
	Set<Etiquetas> getEtiquetasByIdLdlc(int id_ldlc) throws Exception;
	Set<Etiquetas> getEtiquetasByIdDecorador(int id_decorador) throws Exception;
	
	
	String decoradorLogin(Map<String, String[]> parametros, String path) throws Exception;
	
	/**
	 *Devuelve un Objeto Decoradores que contendrá los datos del Decorador y sus arrays atributos en funcion del detail_level y el detail_level_project
	 *
	 * @param  id  el identificador del decorador
	 * @param  detail_level el nivel de detalle para los atributos en array del decorador que son: etiquetas del decorador, trabajos, proyectos e imagenes.
	 * @param  detail_level_projects el nivel de detalle para el getProjects.
	 * @param  path para consguir los credenciales para poder acceder a S3. Se pasa desde el Servlet
	 * @return    Decoradores Un decorador o null sino existe
	 * @see       Decoradores
	 */
	public Decoradores getDecoradorById(int id, int detail_level, int detail_level_projects, String path) throws Exception;

	public int instantComp(int id_decorador, String pass, int id_project) throws Exception;
	// OBTENEMOS LISTA DE BORRADORES (AJAX)
	String getBorradores(Map<String, String[]> parametros, String path) throws Exception;
	// OBTENEMOS LISTA DE LDLC PUBLICADAS (AJAX)
	String getPublicados(Map<String, String[]> parametros, String path) throws Exception;
	// OBTENEMOS NÚMERO DE ITEMS PAGINADOS
	String getItemsPaginado(Map<String, String[]> parametros, String path) throws Exception;
	
	public int instantComp(int id_decorador, String pass) throws Exception;
	String decoradorGetProject(Map<String, String[]> parametros, String path) throws Exception;
	String decoradorGetDecoradorwithNoCredentials(Map<String, String[]> parametros, String path) throws Exception;
	String projectGetInfoPisos(Map<String, String[]> parametros, String path) throws Exception;
	String projectGetInfo(Map<String, String[]> parametros, String path) throws Exception;
	String projectGetInfoPromocion(Map<String, String[]> parametros, String path) throws Exception;
	Proyecto projectGetInfoWithId(String id_proyecto, String path) throws Exception;
	String projectGet360(Map<String, String[]> parametros, String path) throws Exception;
	Set<Etiquetas> get9Etiquetas() throws Exception;
	
	int setEtiquetasDecorador(Set<Etiquetas> etiquetasDecorador, int id_decorador) throws Exception;
	int setEtiquetasTrabajo(Set<Etiquetas> etiquetasTrabajos, int id_trabajo) throws Exception;
	int setEtiquetasCanvas(Set<Etiquetas> etiquetas, int id_ldlc) throws Exception;
	String decoradorModificar(Map<String, String[]> parametros, String path) throws Exception; 
	String ldlcEtiquetas(Map<String, String[]> parametros, String path) throws Exception; 
	String getLdlcEtiquetas(Map<String, String[]> parametros, String path) throws Exception; 
	String ldlcHabitacion(Map<String, String[]> parametros, String path) throws Exception;  
	String nombreEspacio(Map<String, String[]> parametros, String path) throws Exception;  
	String nombreEspacioDecorador(Map<String, String[]> parametros, String path) throws Exception; 
	String getEtiquetas() throws Exception;
	String setAceptarCita(Map<String, String[]> parametros, String path) throws Exception;
	String getItemsEtiquetas(Map<String, String[]> parametros, String path) throws Exception;
	public String getItems(Map<String, String[]> parametros, String path) throws Exception;
	public String getItemsSinFondo(Map<String, String[]> parametros, String path) throws Exception;
	int instantCompUser(String mail, String pass, int id_project) throws Exception;
	String setAceptarPaso3_2D(Map<String, String[]> parametros, String path) throws Exception;
	String setAceptarPaso3_3D(Map<String, String[]> parametros, String path) throws Exception;
	String setAceptarPaso4(Map<String, String[]> parametros, String path) throws Exception;
	String setEnviarPaso3_2D(Map<String, String[]> parametros, String path) throws Exception;
	String setEnviarPaso3_3D(Map<String, String[]> parametros, String path) throws Exception;
	String setEnviarPaso4(Map<String, String[]> parametros, String path) throws Exception;
	String getStatebyIdProject(Map<String, String[]> parametros, String path) throws Exception;
	String checkLdlc(Map<String, String[]> parametros, String path) throws Exception;
	String getLdlc(Map<String, String[]> parametros, String path) throws Exception;
	String getProyectosPisos(Map<String, String[]> parametros, String path) throws Exception;
	String getPisos(Map<String, String[]> parametros, String path) throws Exception;
	String getLdlcInd(Map<String, String[]> parametros, String path) throws Exception;
	String getLdlcInd2d(Map<String, String[]> parametros, String path) throws Exception;
	String getLdlcInd3d(Map<String, String[]> parametros, String path) throws Exception; 
	
	User getUserById(int id_user) throws Exception;
	ArrayList<PortfolioItem> getPortfolioItemsDecoradores( String path) throws Exception;
	ArrayList<PortfolioItem> getPortfolioItemsDecoradoresAll( String path) throws Exception;
	Set<Trabajos> getTrabajosByIdDecorador(int id_decorador, String path, String mail_decorador, int detail_level) throws Exception;
	String decoradorCrear(Map<String, String[]> parametros, String path) throws Exception;
	String asignarPromocion(int id_decorador, int numero_proyectos, int tanto_por_ciento_promocionado, String descripcion) throws Exception;
	String decoradorAsignarProyecto(Map<String, String[]> parametros, String path) throws Exception;
	String decoradorAsignarProyecto(String id_decorador, String id_proyecto) throws Exception;
	String decoradorTrabajo(Map<String, String[]> parametros, String path) throws Exception;
	String decoradorAddTrabajo(Map<String, String[]> parametros, String path) throws Exception;
	int insertNuevaEtiqueta(Etiquetas et) throws Exception;
	int instantCompLdlcDecorador(int id_decorador, int ldlc) throws Exception;
	int instantCompProyectoDecorador(int id_decorador, int id_proyecto) throws Exception;
	int instantComp(String mail, String pass) throws Exception;
	String checkLdlcExtension(Map<String, String[]> parametros, String path) throws Exception;
	String checkDiscount(Map<String, String[]> parametros, String path) throws Exception;
	String addDiscount(Map<String, String[]> parametros, String path) throws Exception;
	int subtractDiscount(Map<String, String[]> parametros, String path) throws Exception;
	int subtractDiscountDirect(int id_user, float valor) throws Exception;
	String getFacturacion(Map<String, String[]> parametros, String path) throws Exception;
	
	int getIdDecoradorByMailPass(String mail, String pass) throws Exception;
	ArrayList<Facturacion> getFacturacionByIdDecorador(int id, String path, String mail) throws Exception;
	String decoradorTrabajo(Trabajos trabajo, String path) throws Exception;
	String decoradorSetFacturacion(Map<String, String[]> parametros, String path) throws Exception;
	Promocion getPromocionByIdDecorador(int id) throws Exception;
	String getPagoInfo(Map<String, String[]> parametros, String path) throws Exception;
	List<Proyecto> getProyects(int tipo, int orden, int estado, String path) throws Exception;
	
	String urlAffiliates(Map<String, String[]> parametros, String path) throws Exception;
	int setAlert(Map<String, String[]> parametros, String path) throws Exception;
	String getAlerts(Map<String, String[]> parametros, String path) throws Exception;
	String getAfiliados(Map<String, String[]> parametros, String path) throws Exception;
	String getAfiliadosInfo(Map<String, String[]> parametros, String path) throws Exception;
	String getUsuariosInfo(Map<String, String[]> parametros, String path) throws Exception;
	String getInfoUserDecorador(Map<String, String[]> parametros, String path) throws Exception;
	String getProjectsInfo(Map<String, String[]> parametros, String path) throws Exception;
	
	int deleAlert(Map<String, String[]> parametros, String path) throws Exception;
	
	
		
}
