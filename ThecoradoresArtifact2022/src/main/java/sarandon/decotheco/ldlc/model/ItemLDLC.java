package sarandon.decotheco.ldlc.model;

import java.util.ArrayList;
import java.util.List;

public class ItemLDLC {
	public int itemLDC_id;
	public String URLImage;
	public String ImageTitle;
	public String Price; 
	public String PathImage;
	public int Activo;
	public int Tipo;
	public List<String> ListaEtiquetas;
	
	public int numeroItems=1;
	
	public ItemLDLC(){
		this.itemLDC_id =-1;
		this.URLImage = new String();
		this.ImageTitle = new String();
		this.Price = new String(); 
		this.PathImage = new String();
		this.ListaEtiquetas= new ArrayList<String>();
	}

}
