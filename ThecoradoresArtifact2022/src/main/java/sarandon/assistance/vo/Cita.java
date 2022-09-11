/**
 * 
 */
package sarandon.assistance.vo;

import java.util.ArrayList;

/**
 * @author Sarandon
 *
 */
public class Cita {

	



	public Cita( int id_proyecto, String fecha, String hora, int skype,
			String contenido) {
		super();

		this.id_proyecto = id_proyecto;
		this.fecha = fecha;
		this.hora = hora;
		this.skype = skype;
		this.contenido = contenido;
	}


	public int id;
	public int id_proyecto;
	public String fecha;
	public String hora;
	public int skype;
	public String contenido;
	
	
	/**
	 * 
	 */
	public Cita() {
		// TODO Auto-generated constructor stub
	}

}


