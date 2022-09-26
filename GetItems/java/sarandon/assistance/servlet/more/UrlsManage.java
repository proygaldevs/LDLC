package sarandon.assistance.servlet.more;

import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;

public class UrlsManage {
	private final static Logger log = Logger.getLogger(UrlsManage.class);
	
	public String urlOrigin="";
	public String protocol="";
	public String file="";
	public String fileName="";
	public String fileExtension="";
	public String route="";
	public String routeWitoutProtocol="";
	public String bucketName;
	
	
	
	public UrlsManage(String urlOrigin, String bucketName) throws MalformedURLException {
		// TODO Auto-generated constructor stub
		this.urlOrigin=urlOrigin;
		this.bucketName=bucketName;
		URL url = new URL(urlOrigin);
        this.file=FilenameUtils.getName(url.getPath());
        this.fileExtension=FilenameUtils.getExtension(url.getPath());
        this.fileName=FilenameUtils.getBaseName(url.getPath());
        this.route=urlOrigin.replaceAll(this.file, "");
        String[] parts =  this.route.split(bucketName);
        this.routeWitoutProtocol= this.route.replaceAll(parts[0],""); 
	}

	 public UrlsManage() {
		// TODO Auto-generated constructor stub
	}

	public UrlsManage(String prefix) {
		// TODO Auto-generated constructor stub
		
		this.routeWitoutProtocol=prefix;
	}

	public int insertFileInBBDD() throws Exception{
		Class.forName("com.mysql.jdbc.Driver");
        // Setup the connection with the DB
        Connection conn = DriverManager.getConnection("jdbc:mysql://decothecodesabbdd.c7zr3sw50viy.eu-west-1.rds.amazonaws.com:3306/decotheco?zeroDateTimeBehavior=convertToNull&"
                        + "user=decothecoPRE&password=D265y2PO"); 
		Statement stmt = conn.createStatement();
		//replace https or http

		log.info("insertFileInBBDD");
		try {

			if (conn != null) {
				String sql = "DELETE from routes where bucket='"
						+ this.bucketName+"' and route ='"
						+ this.routeWitoutProtocol+"' and filename ='"
						+ this.fileName+"'";
				
				
				int resultado = stmt.executeUpdate(sql);

				sql = "insert into routes ("
						+ "bucket, route, filename, extension "
						+ ") values (" + "'"
						+ this.bucketName
						+ "','"
						+ this.routeWitoutProtocol
						+ "','"
						+ this.file
						+ "','"
						+ this.fileExtension
						+ "')";

				log.info(sql);
				
				int resultadoInsert=stmt.executeUpdate(sql);
				
				
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				
				
			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;// alguna excepciï¿½n no controlada
		}
		return 0;// todo correcto
	}
	
	public int deleteFileBBDD() throws Exception{
		Class.forName("com.mysql.jdbc.Driver");
        // Setup the connection with the DB
        Connection conn = DriverManager.getConnection("jdbc:mysql://decothecodesabbdd.c7zr3sw50viy.eu-west-1.rds.amazonaws.com:3306/decotheco?zeroDateTimeBehavior=convertToNull&"
                        + "user=decothecoPRE&password=D265y2PO"); 
		Statement stmt = conn.createStatement();
		//replace https or http

		log.info("deleteFileBBDD");
		try {

			if (conn != null) {
				String sql = "DELETE from routes where bucket='"
						+ new ConfigTiendas().bucket_name+"' and route ='"
						+ this.routeWitoutProtocol+"' and filename ='"
						+ this.file+"'";
				
				
				int resultado = stmt.executeUpdate(sql);

				conn.close();
				stmt.close();
				conn = null;
				stmt = null;	
			}
		} catch (Exception e) {
			log.error("ERROR en try catch0:" + e.getMessage());
			conn.close();
			stmt.close();
			conn = null;
			stmt = null;
			return 1;// alguna excepciï¿½n no controlada
		}
		return 0;// todo correcto
	}
	 
	 public ArrayList<String> getFilesFromUrl() throws Exception{
			log.info("getFilesFromUrl");
			Class.forName("com.mysql.jdbc.Driver");
	        // Setup the connection with the DB
	        Connection conn = DriverManager.getConnection("jdbc:mysql://decothecodesabbdd.c7zr3sw50viy.eu-west-1.rds.amazonaws.com:3306/decotheco?zeroDateTimeBehavior=convertToNull&"
	                        + "user=decothecoPRE&password=D265y2PO"); 
			Statement stmt = conn.createStatement();
			ArrayList<String> listaFiles = new ArrayList<>(0);
			try {

				if (conn != null) {
					String sql = "SELECT filename FROM routes where route = "
							+ "'" + this.routeWitoutProtocol + "';";
					log.info(sql);
					
					ResultSet rs = stmt.executeQuery(sql);
					while (rs.next()) {
						listaFiles.add(rs.getString("filename"));
					}
					rs.close();
					conn.close();
					stmt.close();
					conn = null;
					stmt = null;
					// createProyecto(mail);

				}
			} catch (Exception e) {
				log.error("ERROR en try catch0:" + e.getMessage());
				conn.close();
				stmt.close();
				conn = null;
				stmt = null;
				
			}
			return listaFiles;
		}
}
