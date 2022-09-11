/**
 * 
 */
package sarandon.assistance.vo;

import java.util.ArrayList;

/**
 * @author Sarandon
 *
 */
public class Informacion {

	public Informacion(int id_proyecto, String habitacion, String en_mente,
			int prioridad_1, int prioridad_2, int prioridad_3, int prioridad_4,
			int prioridad_5, int prioridad_6, String inspiracion_1,
			String inspiracion_2, String inspiracion_3, int usos_1, int usos_2,
			int usos_3, int usos_4, int usos_5, int usos_6, int asientos_1,
			int asientos_2, int asientos_3, int asientos_4, int asientos_5,
			int asientos_6, int auxiliares_1, int auxiliares_2,
			int auxiliares_3, int auxiliares_4, int auxiliares_5,
			int almacenaje_1, int almacenaje_2, int almacenaje_3,
			int almacenaje_4, int almacenaje_5, int deco_1, int deco_2,
			int deco_3, int deco_4, int deco_5, String elementos_extra,
			String imprescindibles_url_1, String imprescindibles_url_2,
			String imprescindibles_url_3, String otra_necesidad, String diy_1,
			String diy_2, String diy_3, int suelo, int pintura, String no_quiero,
			String medidas_ancho, String medidas_alto, String presupuesto) {
		super();
		this.id_proyecto = id_proyecto;
		this.habitacion = habitacion;
		this.en_mente = en_mente;
		this.prioridad_1 = prioridad_1;
		this.prioridad_2 = prioridad_2;
		this.prioridad_3 = prioridad_3;
		this.prioridad_4 = prioridad_4;
		this.prioridad_5 = prioridad_5;
		this.prioridad_6 = prioridad_6;
		this.inspiracion_1 = inspiracion_1;
		this.inspiracion_2 = inspiracion_2;
		this.inspiracion_3 = inspiracion_3;
		this.usos_1 = usos_1;
		this.usos_2 = usos_2;
		this.usos_3 = usos_3;
		this.usos_4 = usos_4;
		this.usos_5 = usos_5;
		this.usos_6 = usos_6;
		this.asientos_1 = asientos_1;
		this.asientos_2 = asientos_2;
		this.asientos_3 = asientos_3;
		this.asientos_4 = asientos_4;
		this.asientos_5 = asientos_5;
		this.asientos_6 = asientos_6;
		this.auxiliares_1 = auxiliares_1;
		this.auxiliares_2 = auxiliares_2;
		this.auxiliares_3 = auxiliares_3;
		this.auxiliares_4 = auxiliares_4;
		this.auxiliares_5 = auxiliares_5;
		this.almacenaje_1 = almacenaje_1;
		this.almacenaje_2 = almacenaje_2;
		this.almacenaje_3 = almacenaje_3;
		this.almacenaje_4 = almacenaje_4;
		this.almacenaje_5 = almacenaje_5;
		this.deco_1 = deco_1;
		this.deco_2 = deco_2;
		this.deco_3 = deco_3;
		this.deco_4 = deco_4;
		this.deco_5 = deco_5;
		this.elementos_extra = elementos_extra;
		this.imprescindibles_url_1 = imprescindibles_url_1;
		this.imprescindibles_url_2 = imprescindibles_url_2;
		this.imprescindibles_url_3 = imprescindibles_url_3;
		this.otra_necesidad = otra_necesidad;
		this.diy_1 = diy_1;
		this.diy_2 = diy_2;
		this.diy_3 = diy_3;
		this.suelo = suelo;
		this.pintura = pintura;
		this.no_quiero = no_quiero;
		this.medidas_ancho = medidas_ancho;
		this.medidas_alto = medidas_alto;
		this.presupuesto = presupuesto;
	}




	public int id;
	public int id_proyecto;
	public String habitacion;
	public String en_mente;
	public int prioridad_1;
	public int prioridad_2;
	public int prioridad_3;
	public int prioridad_4;
	public int prioridad_5;
	public int prioridad_6;
	public String inspiracion_1;
	public String inspiracion_2;
	public String inspiracion_3;
	public int usos_1;
	public 	int usos_2;
	public 	int usos_3;
	public 	int usos_4;
	public 	int usos_5;
	public 	int usos_6;
	public 	int asientos_1;
	public 	int asientos_2;
	public 	int asientos_3;
	public 	int asientos_4;
	public 	int asientos_5;
	public 	int asientos_6;
	public 	int auxiliares_1;
	public 	int auxiliares_2;
	public 	int auxiliares_3;
	public 	int auxiliares_4;
	public 	int auxiliares_5;
	public 	int almacenaje_1;
	public 	int almacenaje_2;
	public 	int almacenaje_3;
	public 	int almacenaje_4;
	public 	int almacenaje_5;
	public 	int deco_1;
	public 	int deco_2;
	public 	int deco_3;
	public 	int deco_4;
	public 	int deco_5;
	public String elementos_extra;
	public String imprescindibles_url_1;
	public 	String imprescindibles_url_2;
	public 	String imprescindibles_url_3;
	public 	String otra_necesidad;
	public 	String diy_1;
	public 	String diy_2;
	public 	String diy_3;
	public 	int suelo;
	public 	int pintura;
	public 	String no_quiero;
	public 	String medidas_ancho;
	public 	String medidas_alto;
	public 	String presupuesto;
	public  String extra_otras_cosas;
	public int ventanas_1;
	public int ventanas_2;
	public int ventanas_3;
	
	public 	int valida;
	
	public ArrayList<String> filesInspiraciones= new ArrayList<String>(0);
	public ArrayList<String> filesEsapcio= new ArrayList<String>(0);
	public ArrayList<String> filesPlanos= new ArrayList<String>(0);
	public ArrayList<String> filesMuebles= new ArrayList<String>(0);
	
	
	
	/**
	 * 
	 */
	public Informacion() {
		// TODO Auto-generated constructor stub
	}

}


