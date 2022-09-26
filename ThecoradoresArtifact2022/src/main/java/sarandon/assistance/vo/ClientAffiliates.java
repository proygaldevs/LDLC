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

public class ClientAffiliates<ItemLDLC> {

	public int id; 
	public String nombre;
	public String logo;
	public int id_affiliado;
	public String url_base;
	public String url_base2;
	public String url_base3;
	public String url_add;
	public String custom_param;
	public int tipo_afiliacion;

	public ItemLDLC ItemLDLC;
		
	
	
	
	public ClientAffiliates() {
		// TODO Auto-generated constructor stub
	} 

}