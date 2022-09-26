package sarandon.assistance.vo.portfolio;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import sarandon.decotheco.thecoradores.bean.Decoradores;


public class PortfolioItem {
	
	public int id;
	public String titulo;
	public String imagenPrincipal;
	public String imagenCara;
	public String tipo;
	public String descripcionCorta;
	public int activo;
	
	public ArrayList<SeccionesVO> listaSecciones= new ArrayList<SeccionesVO>(0);
	public Decoradores decorador;
	public String rrss;
	public String blog;
	public int btb;
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	
	public void ordenarSecciones(int pos){
		id=pos;
		 Comparator<SeccionesVO> byHireDate = new Comparator<SeccionesVO>() {//Funcion para ordenar la lista de acciones como necesitamos.
	    	  public int compare (SeccionesVO o1, SeccionesVO o2) {
	    		  
	    		    Integer x1 = o1.orden;
	    		    Integer x2 = o2.orden;
		            int sComp = x1.compareTo(x2);
		            return sComp;
		            
		    }
	    	};
	    Collections.sort(listaSecciones, byHireDate);//Las ordenamos
	 
	    for(int i = 0 ; i<listaSecciones.size();i++){
	    	listaSecciones.get(i).ordenarImagenes();
	    }
	}
	
}
