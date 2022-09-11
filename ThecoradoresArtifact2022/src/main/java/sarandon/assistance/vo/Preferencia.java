package sarandon.assistance.vo;

import java.util.ArrayList;

public class Preferencia {
	
	public int id;
	public String habitacion="";
	public String estilo="";
	public String minimalismo="";
	public String color="";
	public String tiendas = "";
	public String id_moodboard = "";
	public int id_proyecto;
	
	
	public Preferencia(int id, String habitacion, String estilo,
			String minimalismo, String color) {
		super();
		this.id = id;
		this.habitacion = habitacion;
		this.estilo = estilo;
		this.minimalismo = minimalismo;
		this.color = color;
	}


	public Preferencia( String habitacion, String estilo,
			String minimalismo, String color, String tiendas,
			String id_moodboard, int id_proyecto) {
		
		this.habitacion = habitacion;
		this.estilo = estilo;
		this.minimalismo = minimalismo;
		this.color = color;
		this.tiendas = tiendas;
		this.id_moodboard = id_moodboard;
		this.id_proyecto = id_proyecto;
	}
	public Preferencia(int id, String habitacion, String estilo,
			String minimalismo, String color, String tiendas,
			String id_moodboard, int id_proyecto) {
		this.id=id;
		this.habitacion = habitacion;
		this.estilo = estilo;
		this.minimalismo = minimalismo;
		this.color = color;
		this.tiendas = tiendas;
		this.id_moodboard = id_moodboard;
		this.id_proyecto = id_proyecto;
	}


	public Preferencia() {
		// TODO Auto-generated constructor stub
	}
	
	
	
}
