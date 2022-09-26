package sarandon.assistance.servlet;

import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;


import com.google.gson.Gson;

import sarandon.assistance.servlet.more.dataBBDD;
import sarandon.decotheco.thecoradores.bean.Sensaciones;



/**
 * Servlet implementation class getNews
 */
public class GetFrases extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(GetFrases.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetFrases() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub


		

		request.setCharacterEncoding("utf8");

		response.setCharacterEncoding("utf8");

		
		String jsonText = "ERROR";
		try {
			/*
			Sensaciones findObject = new Sensaciones();
			findObject.setTipo("frase");

			SensacionesHome dao = new SensacionesHome();

			// deco.attachDirty(decorador);
			List<Sensaciones> result = dao.findByExample(findObject);

			Gson gson = new Gson();

			jsonText = gson.toJson(result);

			trans.commit();*/

			dataBBDD hht = new dataBBDD();
		
			jsonText=hht.getFrasesJson();
			log.info(jsonText);

		} catch (Exception e) {
			log.error("ERROR en try catch:" + e.getMessage()); 
		}

		response.setHeader("Access-Control-Allow-Origin", "*");
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	    response.setHeader("Access-Control-Max-Age", "3600");
	    response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
		response.getWriter().write((jsonText));

		/*
		 * String jsonText = ""; dataBBDD hht = new dataBBDD(); try{
		 * jsonText=hht.getFrasesJson(); log.info(jsonText); }catch(Exception
		 * e){ System.out.println(e.getMessage()); log.error(e.getMessage()); }
		 * response.getWriter().write((jsonText));
		 */
		// output.write(jsonText.getBytes());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");
		// TODO Auto-generated method stub

		doGet(request, response);
	}

}
