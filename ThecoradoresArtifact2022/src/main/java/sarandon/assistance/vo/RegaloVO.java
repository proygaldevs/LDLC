package sarandon.assistance.vo;

import java.sql.Date;

public class RegaloVO {
	public int id;
	public float total;
	public String codigo;
	public String nombre;
	public String direccion;
	public String cp;
	public String telefono_buyer;
	public String poblacion;
	public String comentarios;
	public String nombre_buyer;
	public String mail_buyer;
	public String mensaje_personalizar;
	public String mail;
	public int usado;
	public Date fecha_usado;

	public RegaloVO(int id, float total, String codigo, String nombre,
			String direccion, String cp, String telefono_buyer,
			String poblacion, String comentarios, String nombre_buyer,
			String mail_buyer, String mensaje_personalizar, String mail,
			int usado, Date fecha_usado) {
		super();
		this.id = id;
		this.total = total;
		this.codigo = codigo;
		this.nombre = nombre;
		this.direccion = direccion;
		this.cp = cp;
		this.telefono_buyer = telefono_buyer;
		this.poblacion = poblacion;
		this.comentarios = comentarios;
		this.nombre_buyer = nombre_buyer;
		this.mail_buyer = mail_buyer;
		this.mensaje_personalizar = mensaje_personalizar;
		this.mail = mail;
		this.usado = usado;
		this.fecha_usado = fecha_usado;
	}

	public RegaloVO( float total, String codigo, String nombre,
			String direccion, String cp, String telefono_buyer,
			String poblacion, String comentarios, String nombre_buyer,
			String mail_buyer, String mensaje_personalizar, String mail
			) {
		super();
		
		this.total = total;
		this.codigo = codigo;
		this.nombre = nombre;
		this.direccion = direccion;
		this.cp = cp;
		this.telefono_buyer = telefono_buyer;
		this.poblacion = poblacion;
		this.comentarios = comentarios;
		this.nombre_buyer = nombre_buyer;
		this.mail_buyer = mail_buyer;
		this.mensaje_personalizar = mensaje_personalizar;
		this.mail = mail;
		
	}
	
}
