package sarandon.decotheco.ldlc.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.assistance.vo.ClientAffiliates;
import sarandon.assistance.vo.ListaItems;
import sarandon.decotheco.thecoradores.bean.Etiquetas;

public class ListaCompra {
	private final static Logger log = Logger.getLogger(dataBBDD.class);
	
	public int ListaCompra_id;
	public int Proyecto_id;
	public int Decorador_id;
	public String URLCanvas;
	public String Canvas;
	public String Estado;
	public String Habitacion;
	public String nombreLdlc;
	public String imagen;
	public int galeria_ldlc;
	public ArrayList<ItemLDLC> items = new ArrayList<>(0);
	public Set<Etiquetas> etiquetas = new HashSet<Etiquetas>(0);

	public ArrayList<ClientAffiliates> listaAfiliados;

	public ArrayList<ClientAffiliates> listAfiliados;
	
	public ListaCompra(){
		this.ListaCompra_id= -1;
		this.Canvas = new String();
		this.Estado = new String();
		this.Proyecto_id = -1;
		this.URLCanvas = new String();
		this.Habitacion = new String();
		this.nombreLdlc = new String();
		this.imagen = new String();
		this.Decorador_id= -1; 
		this.galeria_ldlc=-1;
	}

	public void setEtiquetas(Set<Etiquetas> etiquetas) {
		this.etiquetas = etiquetas;
	}
	public Set<Etiquetas> getEtiquetas() {
		return this.etiquetas;
	}
	
	public  void setItems(){
		
		if(this.Canvas==null) return;
		
		ArrayList<ItemLDLCForParse> itemsReturn = new ArrayList<>(0);
		
		
		Gson gson = new Gson();
		ListaItems json = gson.fromJson(this.Canvas, ListaItems.class);
		List<ItemLDLCForParse> jsonArray=  json.objects;
		try{
			Connection conn = new dataBBDD().conectar();
			Statement statement = conn.createStatement();
		String query ="Select i.id, i.titulo, i.precio, i.URLpagina, i.pathimagen, i.activo, i.tipo "
				+ "FROM item i  WHERE id in (";
		boolean firstOne=true;
		boolean queryPasa=false;
		for(int i=0;i<jsonArray.size();i++){
			String texto =jsonArray.get(i).src;
			boolean resultado=false;
			if(texto==null || texto.equals("")) {
			} else {
				resultado = texto.contains("tienda");
			}
			if(resultado) { queryPasa=true; } else { 
				boolean newcase=true; 
				for(int j=0;j<itemsReturn.size();j++){
					if(itemsReturn.get(j).id==jsonArray.get(i).id){
						itemsReturn.get(j).cantidad=itemsReturn.get(j).cantidad+1;
						if(firstOne){
							//query+= itemsReturn.get(j).id;
							firstOne=false;
							newcase=false;
						}else{
							//query+= ", "+itemsReturn.get(j).id;
							newcase=false;
						}
						
						break;
					}
				}
				if(newcase==false) continue;
				itemsReturn.add(jsonArray.get(i));
				if(firstOne){
					query+= jsonArray.get(i).id;
					firstOne=false;
				}else{
					query+= ", "+jsonArray.get(i).id;
				}
			}
		}
		
		if(queryPasa) {
			query+= ") UNION "
					+ " Select i.id, i.titulo, i.precio, i.URLpagina, i.pathimagen, i.activo, i.tipo "
					+ "FROM item i  WHERE id in (";
			firstOne=true;
			queryPasa=false;
			for(int i=0;i<jsonArray.size();i++){
				String texto =jsonArray.get(i).src;
				boolean resultado = texto.contains("/tienda-");
				if(resultado) { 
					boolean newcase=true; 
					for(int j=0;j<itemsReturn.size();j++){
						if(itemsReturn.get(j).id==jsonArray.get(i).id){
							itemsReturn.get(j).cantidad=itemsReturn.get(j).cantidad+1;
							if(firstOne){
								//query+= itemsReturn.get(j).id;
								firstOne=false;
								newcase=false;
							}else{
								//query+= ", "+itemsReturn.get(j).id;
								newcase=false;
							}
							
							break;
						}
					}
					if(newcase==false) continue;
					itemsReturn.add(jsonArray.get(i));
					if(firstOne){
						query+= jsonArray.get(i).id;
						firstOne=false;
					}else{
						query+= ", "+jsonArray.get(i).id;
					}
				}
			}
			
			query+= "); ";
		} else {
			query+= "); ";
		}
			
		log.info(query);
		statement.executeQuery(query); 
		ResultSet rs = statement.getResultSet();
		ArrayList<ItemLDLC> itemsFinals= new ArrayList<>(0);
		while (rs.next()){
			
			
			
			ItemLDLC item = new ItemLDLC();
			item.itemLDC_id =rs.getInt("id");
			item.URLImage = rs.getString("URLpagina");
			item.ImageTitle =rs.getString("titulo");
			item.Price = rs.getString("precio");
			item.PathImage =rs.getString("pathimagen");
			item.Tipo =rs.getInt("tipo");
			
			for(int i=0;i<itemsReturn.size();i++){
				if(itemsReturn.get(i).id==item.itemLDC_id){
					item.numeroItems=itemsReturn.get(i).cantidad;
					break;
				}
			}

			//item.numeroItems=item.numeroItems+1;
			itemsFinals.add(item);
		}
		
		this.items=itemsFinals;
        conn.close();			
	} catch (Exception e) {
		log.error("ERROR en try catch:" + e.getMessage());
		e.printStackTrace();
	}

	}
}