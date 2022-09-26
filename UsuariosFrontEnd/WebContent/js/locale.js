function messageChat(message) {
	switch(message) {
	    case "citaUsuario":
	    	return "He concertado una cita (auto)";
	    	break;
	    case "RellenadoPaso1":
	    	return "He completado la información del paso 1. (auto)";
	        break;
	    case "Aceptar2d":
	    	return "He aceptado las propuestas 2D. (auto)";
	        break;
	    case "Aceptar3d":
	    	return "He aceptado las propuestas 3D. (auto)";
	        break;
	    case "Finalizar":
	    	return "He finalizado el proyecto. (auto)";
	        break;
	    default:
	    	return "";
	}
}