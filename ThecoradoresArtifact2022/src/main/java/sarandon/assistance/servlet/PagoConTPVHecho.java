package sarandon.assistance.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.decotheco.thecoradores.bean.ProjectsTypes;
import sarandon.assistance.model.CoreImpl;
import sarandon.assistance.payment.Integration;

/**
 * Servlet implementation class getNews
 */
public class PagoConTPVHecho extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(PagoConTPVHecho.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PagoConTPVHecho() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		log.info("class PagoConTPVHecho");
		try{
			Integration.parseDsMerchantParameters(request);
	
		}catch(Exception e){
			log.error("ERROR en try catch:" + e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
		doGet(request,response);
	}

}
