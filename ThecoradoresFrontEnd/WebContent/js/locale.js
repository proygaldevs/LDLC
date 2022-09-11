function messageChat(message) {
	switch(message) {
	    case "CitaCancelada":
	    	return "He cancelado la cita, propongamos otra fecha. (auto)";
	    	break;
	    case "CitaAceptada":
	    	return "He aceptada la cita, pronto me pondré en contacto contigo. (auto)";
	        break;
	    case "EnviarPropuestas":
	    	return "He enviado las propuestas 2D. (auto)";
	        break;
	    case "Enviar3d":
	    	return "He enviado las propuestas 3D. (auto)";
	        break;
	    case "Planos":
	    	return "He enviado los planos y la lista de la compra. (auto)";
	        break;
	    default:
	    	return "";
	}
}