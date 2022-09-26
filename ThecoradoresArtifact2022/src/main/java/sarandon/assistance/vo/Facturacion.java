/**
 * 
 */
package sarandon.assistance.vo;

import java.sql.Date;
import java.util.ArrayList;


import sarandon.assistance.servlet.more.dataBBDD;

/**
 * @author Sarandon
 *
 */
public class Facturacion {



	public int id;
	public int id_proyecto;
	public String nombreProyecto;
	public int id_decorador;
	public Date fecha_pago;
	public float cantidad;
	public Date fecha_entrada;
	public String concepto;
	public String otros;
	public String token;
	public String factura="";
	public ArrayList<Preferencia> preferencias= new ArrayList<>(0);
	
	
	/**
	 * 
	 */
	public Facturacion() {
		// TODO Auto-generated constructor stub
	}

	
	
	public void setFiles(String path, String mail){
		
			
				dataBBDD db= new dataBBDD();
				try {
				this.factura = db.getFiles("decoradores/"+mail+"/facturas/"+id_proyecto+"/", path).get(0);
				}  catch (Exception e) {
					this.factura="";
				}
	}
}


