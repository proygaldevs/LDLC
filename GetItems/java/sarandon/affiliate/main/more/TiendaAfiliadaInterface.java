package sarandon.affiliate.main.more;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.xml.transform.TransformerException;

import pswebservice.PrestaShopWebserviceException;
import sarandon.affiliate.vo.ItemAfiliado;

public interface TiendaAfiliadaInterface {
	public ArrayList<ItemAfiliado> getItemsAfiliadoList() throws PrestaShopWebserviceException, TransformerException, IOException, Exception;
	public void processItems(TiendaAfiliada tiendaObject) throws SQLException, Exception;
	
}
