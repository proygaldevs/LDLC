package sarandon.decotheco.thecoradores.bean;
// Generated 16-abr-2017 9:59:59 by Hibernate Tools 5.2.1.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Regalos generated by hbm2java
 */
@Entity
@Table(name = "regalos", catalog = "decotheco")
public class Regalos implements java.io.Serializable {

	private Integer id;
	private Projects projects;
	private Float total;
	private String codigo;
	private String nombre;
	private String direccion;
	private String cp;
	private String telefonoBuyer;
	private String poblacion;
	private String comentarios;
	private String nombreBuyer;
	private String mailBuyer;
	private String mensajePersonalizar;
	private String mail;
	private Date fechaingreso;
	private Integer usado;
	private Date fechaUsado;
	private Set<Pagos> pagoses = new HashSet<Pagos>(0);

	public Regalos() {
	}

	public Regalos(Projects projects, Float total, String codigo, String nombre, String direccion, String cp,
			String telefonoBuyer, String poblacion, String comentarios, String nombreBuyer, String mailBuyer,
			String mensajePersonalizar, String mail, Date fechaingreso, Integer usado, Date fechaUsado,
			Set<Pagos> pagoses) {
		this.projects = projects;
		this.total = total;
		this.codigo = codigo;
		this.nombre = nombre;
		this.direccion = direccion;
		this.cp = cp;
		this.telefonoBuyer = telefonoBuyer;
		this.poblacion = poblacion;
		this.comentarios = comentarios;
		this.nombreBuyer = nombreBuyer;
		this.mailBuyer = mailBuyer;
		this.mensajePersonalizar = mensajePersonalizar;
		this.mail = mail;
		this.fechaingreso = fechaingreso;
		this.usado = usado;
		this.fechaUsado = fechaUsado;
		this.pagoses = pagoses;
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

	@Column(name = "total", precision = 12, scale = 0)
	public Float getTotal() {
		return this.total;
	}

	public void setTotal(Float total) {
		this.total = total;
	}

	@Column(name = "codigo", length = 512)
	public String getCodigo() {
		return this.codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	@Column(name = "nombre", length = 2048)
	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Column(name = "direccion", length = 4096)
	public String getDireccion() {
		return this.direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	@Column(name = "cp", length = 45)
	public String getCp() {
		return this.cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	@Column(name = "telefono_buyer", length = 45)
	public String getTelefonoBuyer() {
		return this.telefonoBuyer;
	}

	public void setTelefonoBuyer(String telefonoBuyer) {
		this.telefonoBuyer = telefonoBuyer;
	}

	@Column(name = "poblacion", length = 512)
	public String getPoblacion() {
		return this.poblacion;
	}

	public void setPoblacion(String poblacion) {
		this.poblacion = poblacion;
	}

	@Column(name = "comentarios", length = 8000)
	public String getComentarios() {
		return this.comentarios;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}

	@Column(name = "nombre_buyer", length = 2048)
	public String getNombreBuyer() {
		return this.nombreBuyer;
	}

	public void setNombreBuyer(String nombreBuyer) {
		this.nombreBuyer = nombreBuyer;
	}

	@Column(name = "mail_buyer", length = 2048)
	public String getMailBuyer() {
		return this.mailBuyer;
	}

	public void setMailBuyer(String mailBuyer) {
		this.mailBuyer = mailBuyer;
	}

	@Column(name = "mensaje_personalizar", length = 8000)
	public String getMensajePersonalizar() {
		return this.mensajePersonalizar;
	}

	public void setMensajePersonalizar(String mensajePersonalizar) {
		this.mensajePersonalizar = mensajePersonalizar;
	}

	@Column(name = "mail", length = 2048)
	public String getMail() {
		return this.mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fechaingreso", length = 0)
	public Date getFechaingreso() {
		return this.fechaingreso;
	}

	public void setFechaingreso(Date fechaingreso) {
		this.fechaingreso = fechaingreso;
	}

	@Column(name = "usado")
	public Integer getUsado() {
		return this.usado;
	}

	public void setUsado(Integer usado) {
		this.usado = usado;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fecha_usado", length = 0)
	public Date getFechaUsado() {
		return this.fechaUsado;
	}

	public void setFechaUsado(Date fechaUsado) {
		this.fechaUsado = fechaUsado;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "regalos")
	@JsonManagedReference
	public Set<Pagos> getPagoses() {
		return this.pagoses;
	}

	public void setPagoses(Set<Pagos> pagoses) {
		this.pagoses = pagoses;
	}

}
