package sarandon.decotheco.thecoradores.bean;
// Generated 26-jul-2017 12:40:51 by Hibernate Tools 5.2.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Componentes generated by hbm2java
 */
@Entity
@Table(name = "componentes", catalog = "decotheco")
public class Componentes implements java.io.Serializable {

	private Integer id;
	private String categoria;
	private String nombre;

	public Componentes() {
	}

	public Componentes(String categoria, String nombre) {
		this.categoria = categoria;
		this.nombre = nombre;
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

	@Column(name = "categoria", length = 512)
	public String getCategoria() {
		return this.categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	@Column(name = "nombre", length = 512)
	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}
