package sarandon.decotheco.thecoradores.bean;
// Generated 16-abr-2017 9:59:59 by Hibernate Tools 5.2.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * Citas generated by hbm2java
 */
@Entity
@Table(name = "citas", catalog = "decotheco")
public class Citas implements java.io.Serializable {

	private Integer id;
	private Projects projects;
	private String fecha;
	private String hora;
	private Integer skype;
	private String contenido;
	private Integer valida;

	public Citas() {
	}

	public Citas(Projects projects, String fecha, String hora, Integer skype, String contenido, Integer valida) {
		this.projects = projects;
		this.fecha = fecha;
		this.hora = hora;
		this.skype = skype;
		this.contenido = contenido;
		this.valida = valida;
	}



	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_proyecto")
	@JsonBackReference
	public Projects getProjects() {
		return this.projects;
	}

	public void setProjects(Projects projects) {
		this.projects = projects;
	}

	@Column(name = "fecha", length = 45)
	public String getFecha() {
		return this.fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	@Column(name = "hora", length = 45)
	public String getHora() {
		return this.hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	@Column(name = "skype")
	public Integer getSkype() {
		return this.skype;
	}

	public void setSkype(Integer skype) {
		this.skype = skype;
	}

	@Column(name = "contenido", length = 4096)
	public String getContenido() {
		return this.contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}

	@Column(name = "valida")
	public Integer getValida() {
		return this.valida;
	}

	public void setValida(Integer valida) {
		this.valida = valida;
	}

}