package sarandon.assistance.vo.portfolio;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import sarandon.assistance.vo.TituloValorParaFicherosTexto;

public class SeccionesVO {

	public int orden=0;
	public String tipoSeccion="";
	public ArrayList<TituloValorParaFicherosTexto> listaTextos= new ArrayList<TituloValorParaFicherosTexto>(0);
	public ArrayList<ImagenVO> listaImagenes = new ArrayList<ImagenVO>(0);
	
	
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	
	public void ordenarImagenes(){
		 Comparator<ImagenVO> byHireDate = new Comparator<ImagenVO>() {//Funcion para ordenar la lista de acciones como necesitamos.
	    	  public int compare (ImagenVO o1, ImagenVO o2) {
	    		  
	    		    Integer x1 = o1.orden;
	    		    Integer x2 = o2.orden;
		            int sComp = x1.compareTo(x2);
		            return sComp;
		            
		    }
	    	};
	    Collections.sort(listaImagenes, byHireDate);//Las ordenamos
	      
	}
}
