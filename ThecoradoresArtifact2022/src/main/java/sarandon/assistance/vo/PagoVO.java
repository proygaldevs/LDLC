package sarandon.assistance.vo;

public class PagoVO {
	
	public int id;
	public float total;
	public String concepto;
	public String codigo;
	public int project_id;
	public String regalo_id;
	public String tipo_pago=" ";
	
	
	 
	
	public PagoVO( float total, String concepto, String codigo,
			int project_id) {
		super();

		this.total = total;
		this.concepto = concepto;
		this.codigo = codigo;
		this.project_id = project_id;
		
	}
	
	public PagoVO( float total, String concepto, String codigo,
			int project_id, String tipo_pago) {
		super();

		this.total = total;
		this.concepto = concepto;
		this.codigo = codigo;
		this.project_id = project_id;
		this.tipo_pago = tipo_pago;
		
	}
	public PagoVO(Float precio, int tipo, String pedido_autorizacion, int proyectoid, String regalo_id, String tipo_pago) {
		// TODO Auto-generated constructor stubsuper();

		this.total = precio;
		this.concepto = ""+tipo;
		this.codigo = pedido_autorizacion;
		this.project_id = proyectoid;
		this.regalo_id= regalo_id;
		this.tipo_pago=tipo_pago;
	}
	public PagoVO(Float precio, String concepto, String codigo, String regalo_id, String tipo_pago) {
		// TODO Auto-generated constructor stubsuper();

		this.total = precio;
		this.concepto = ""+concepto;
		this.codigo = codigo; 
		this.regalo_id= regalo_id;
		this.tipo_pago=tipo_pago;
	}
	

	

}
