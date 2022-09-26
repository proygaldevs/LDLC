package sarandon.decotheco.ldlc.model;

import java.util.ArrayList;
import java.util.List;

public class ItemLDLCForParse {
	public int id;
	public String src;
	public String title;
	public float price;
	public String url;
	public String tags;
	public String tipo;
	
	public int cantidad=1;
	
	public ItemLDLCForParse(){
		this.cantidad=1;
	}

	public ItemLDLCForParse(int id, Float precio, String url,  String pathimagen, String titulo, String etiquetas) {
		this.id = id;
		this.price = precio;
		this.src = pathimagen;
		this.title = titulo;
		this.url = url;
		this.tags = etiquetas;
		this.cantidad=1;

	} 
	public ItemLDLCForParse(int id, Float precio, String url,  String pathimagen, String titulo, String etiquetas, String tipo) {
		this.id = id;
		this.price = precio;
		this.src = pathimagen;
		this.title = titulo;
		this.url = url;
		this.tags = etiquetas;
		this.cantidad=1;
		this.tipo=tipo;

	} 

	public ItemLDLCForParse(int id, Float precio, String url,  String pathimagen, String titulo, String etiquetas, String tipo, int cantidad) {
		this.id = id;
		this.price = precio;
		this.src = pathimagen;
		this.title = titulo;
		this.url = url;
		this.tags = etiquetas;
		this.cantidad=cantidad;
		this.tipo=tipo;

	} 
}
