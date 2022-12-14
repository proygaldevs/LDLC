package sarandon.decotheco.thecoradores.bean;
// Generated 16-abr-2017 9:59:59 by Hibernate Tools 5.2.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Colores generated by hbm2java
 */
@Entity
@Table(name = "colores", catalog = "decotheco")
public class Colores implements java.io.Serializable {

	private Integer id;
	private String nombreimagen;
	private String color1;
	private String color2;
	private String color3;
	private String color4;
	private String color5;
	private String estiloColores;
	private String color6;

	public Colores() {
	}

	public Colores(String nombreimagen, String color1, String color2, String color3, String color4, String color5,
			String estiloColores, String color6) {
		this.nombreimagen = nombreimagen;
		this.color1 = color1;
		this.color2 = color2;
		this.color3 = color3;
		this.color4 = color4;
		this.color5 = color5;
		this.estiloColores = estiloColores;
		this.color6 = color6;
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

	@Column(name = "nombreimagen", length = 45)
	public String getNombreimagen() {
		return this.nombreimagen;
	}

	public void setNombreimagen(String nombreimagen) {
		this.nombreimagen = nombreimagen;
	}

	@Column(name = "color1", length = 45)
	public String getColor1() {
		return this.color1;
	}

	public void setColor1(String color1) {
		this.color1 = color1;
	}

	@Column(name = "color2", length = 45)
	public String getColor2() {
		return this.color2;
	}

	public void setColor2(String color2) {
		this.color2 = color2;
	}

	@Column(name = "color3", length = 45)
	public String getColor3() {
		return this.color3;
	}

	public void setColor3(String color3) {
		this.color3 = color3;
	}

	@Column(name = "color4", length = 45)
	public String getColor4() {
		return this.color4;
	}

	public void setColor4(String color4) {
		this.color4 = color4;
	}

	@Column(name = "color5", length = 45)
	public String getColor5() {
		return this.color5;
	}

	public void setColor5(String color5) {
		this.color5 = color5;
	}

	@Column(name = "estilo_colores", length = 45)
	public String getEstiloColores() {
		return this.estiloColores;
	}

	public void setEstiloColores(String estiloColores) {
		this.estiloColores = estiloColores;
	}

	@Column(name = "color6", length = 45)
	public String getColor6() {
		return this.color6;
	}

	public void setColor6(String color6) {
		this.color6 = color6;
	}

}
