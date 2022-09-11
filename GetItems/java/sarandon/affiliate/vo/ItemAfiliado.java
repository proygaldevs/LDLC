/**
 * 
 */
package sarandon.affiliate.vo;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import sarandon.assistance.vo.portfolio.ImagenVO;
import sarandon.decotheco.ldlc.model.ItemLDLC;

 
/**
 * @author Sarandon
 *
 */
public class ItemAfiliado extends ItemLDLC{

	public int id_tienda_afiliada;
	public long id_item_tienda_afiliada;
	public String updated;

 
	public ArrayList<ItemAfiliado> listaItems= new ArrayList<>(0);
	public String NombreFinal;
	
	
	/**
	 * 
	 */
	public ItemAfiliado() {
		// TODO Auto-generated constructor stub
	} 
	
	
	
}


