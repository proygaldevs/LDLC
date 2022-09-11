package sarandon.decotheco.ldlc;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import sarandon.assistance.servlet.CreateUser;
import sarandon.decotheco.ldlc.controller.ListaCompraController;;

public class LDLCCreate extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(CreateUser.class);


    public LDLCCreate() {
        super();
    }
    

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		
		ListaCompraController lcc = new ListaCompraController();
		//int id_lista= lcc.create();

		//response.sendRedirect("/"+id_lista+"/edit");
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

}
