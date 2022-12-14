package sarandon.decotheco.thecoradores.bean;
// Generated 16-abr-2017 9:59:59 by Hibernate Tools 5.2.1.Final

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Etiquetas generated by hbm2java
 */
@Entity
@Table(name = "etiquetas", catalog = "decotheco")
public class Etiquetas implements java.io.Serializable {

	public Integer id;
	private String nombre;
	private String grupo;


	public Etiquetas() {
	}

	public Etiquetas(String nombre, String grupo) {
		this.nombre = nombre;
		this.grupo = grupo;

	}
	public Etiquetas(int id, String nombre, String grupo) {
		this.id = id;
		this.nombre = nombre;
		this.grupo = grupo;

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

	@Column(name = "nombre", length = 45)
	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Column(name = "grupo", length = 45)
	public String getGrupo() {
		return this.grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

/*	@OneToMany(fetch = FetchType.LAZY, mappedBy = "etiquetas")
 * @JsonManagedReference
	public Set<AuxTrabajosEtiquetas> getAuxTrabajosEtiquetases() {
		return this.auxTrabajosEtiquetases;
	}

	public void setAuxTrabajosEtiquetases(Set<AuxTrabajosEtiquetas> auxTrabajosEtiquetases) {
		this.auxTrabajosEtiquetases = auxTrabajosEtiquetases;
	}*/

}
