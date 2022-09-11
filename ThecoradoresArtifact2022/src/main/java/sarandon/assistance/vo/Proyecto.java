package sarandon.assistance.vo;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import sarandon.decotheco.ldlc.model.ListaCompra;
import sarandon.decotheco.thecoradores.bean.Etiquetas;
import sarandon.decotheco.thecoradores.bean.Projects;
import sarandon.decotheco.thecoradores.bean.ProjectsStates;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sarandon.decotheco.thecoradores.bean.Users;

public class Proyecto {

	public int id;
	public String nombreProyecto;
	public String tituloProyecto;
	public String nombreProyectDecorador;
	//public Preferencia preferencia=null;
	public ArrayList<Preferencia> preferencias=new ArrayList<Preferencia>(0);
	public Informacion informacion;
	public Cita cita;
	public int finalizado=0;
	public Date fechaFin;
	public int pagado=0;
	public int estado=0;
	public Date fechaestado;

	public ArrayList<Propuesta> propuestas=new ArrayList<Propuesta>(0);
	public ArrayList<Propuesta> render360=new ArrayList<Propuesta>(0);
	public ArrayList<ListaCompra> ldlcs=new ArrayList<ListaCompra>(0);
	public Set<Etiquetas> etiquetas = new HashSet<Etiquetas>(0);
	public ArrayList<Propuesta> planos=new ArrayList<Propuesta>(0);
	public int idDecorador;
	public int decoradorActivo;
	public String nombreDecorador;
	public String decoradorDisponibilidad;
	public String caraDecorador;
	public String textoTrabajo;
	public ProjectsStates projectsStates;
	public ProjectsTypes projectsTypes;
	public String diasRestantes="0";
	public String uniqueDecorador;
	public String nombreProyectoDecorador;
	public String paso3Propuestas;
	public String paso33d;
	public String paso4Plano;
	public String paso4Ldlc;
	public String userMail;
	public String habitacion;
	public String data360;
	public OfertasAfiliado promocion;
	public int id_user;
	public Users user_sin;
	public ArrayList<ClientAffiliates> listAfiliados;
	public Object piso;
	public int idPiso;
	public PisosPromocion pisosPromocion;
	public String nombrePiso; 
	
	
	public Proyecto(int id, String nombreProyecto, ArrayList<Preferencia> preferencias,
			Informacion informacion,Cita cita, int finalizado, int pagado, Date fechaFin) throws Exception {
		super();
		this.id = id;
		this.nombreProyecto = nombreProyecto;
		this.preferencias = preferencias;
		this.informacion = informacion;
		this.cita= cita;
		this.pagado=pagado;
		this.finalizado = finalizado;
		this.fechaFin = fechaFin;
		/*ThecoradoresCoreImpl th = new ThecoradoresCoreImpl();
		Projects p=th.getProjectById(this.id);
		this.projectsStates=p.getProjectsStates();
		this.projectsTypes=p.getProjectsTypes();
		this.diasRestantes=p.diasRestantes;*/
	}


	public Proyecto(int id, String nombreProyecto, int finalizado,int pagado) {
		super();
		this.id = id;
		this.nombreProyecto = nombreProyecto;
		this.finalizado = finalizado;
		this.pagado=pagado;
		/*ThecoradoresCoreImpl th = new ThecoradoresCoreImpl();
		Projects p=th.getProjectById(this.id);
		this.projectsStates=p.getProjectsStates();
		this.projectsTypes=p.getProjectsTypes();
		this.diasRestantes=p.diasRestantes;*/
	}
	
	public Proyecto(int id, String nombreProyecto, int finalizado,int pagado, Date fechaFin) {
		super();
		this.id = id;
		this.nombreProyecto = nombreProyecto;
		this.finalizado = finalizado;
		this.fechaFin = fechaFin;
		this.pagado=pagado;
		/*ThecoradoresCoreImpl th = new ThecoradoresCoreImpl();
		Projects p=th.getProjectById(this.id);
		this.projectsStates=p.getProjectsStates();
		this.projectsTypes=p.getProjectsTypes();
		this.diasRestantes=p.diasRestantes;*/
	}

	public Proyecto(int id, String nombreProyecto, String titulo_proyecto, String nombre_proyecto_decorador, int finalizado,int pagado, Date fechaFin, String paso3Propuestas,String paso33d,String paso4Plano,String paso4Ldlc ) {
		super();
		this.id = id;
		this.nombreProyecto = nombreProyecto;
		this.finalizado = finalizado;
		this.fechaFin = fechaFin;
		this.pagado=pagado;
		this.paso3Propuestas=paso3Propuestas;
		this.paso33d=paso33d;
		this.paso4Plano=paso4Plano;
		this.paso4Ldlc=paso4Ldlc;
		this.tituloProyecto=titulo_proyecto;
		this.nombreProyectDecorador=nombre_proyecto_decorador;
		/*ThecoradoresCoreImpl th = new ThecoradoresCoreImpl();
		Projects p=th.getProjectById(this.id);
		this.projectsStates=p.getProjectsStates();
		this.projectsTypes=p.getProjectsTypes();
		this.diasRestantes=p.diasRestantes;*/
	}


	public Proyecto(int id, String nombreProyecto, int finalizado,int pagado, Date fechaFin, int estado, Date fechaestado) {
		super();
		this.id = id;
		this.nombreProyecto = nombreProyecto;
		this.finalizado = finalizado;
		this.fechaFin = fechaFin;
		this.pagado=pagado;
		this.estado=estado;
		this.fechaestado=fechaestado;
	}


	public Proyecto() {
		// TODO Auto-generated constructor stub
	}


	public int getFinalizado() {
		return finalizado;
	}


	public void setFinalizado(int finalizado) {
		this.finalizado = finalizado;
	}


	public Date getFechaFin() {
		return fechaFin;
	}


	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}
	
	public int getIdDecorador() {
		return idDecorador;
	}


	public void setIdDecorador(int idDecorador) {
		this.idDecorador = idDecorador;
	}


	public String getNombreDecorador() {
		return nombreDecorador;
	}


	public void setNombreDecorador(String nombreDecorador) {
		this.nombreDecorador = nombreDecorador;
	}
	
	

}