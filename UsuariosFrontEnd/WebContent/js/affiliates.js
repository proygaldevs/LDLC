//recibe una url de un producto y le añade el parametro "custom_param" para saber de que decorador procede la venta.
function processUrlAffiliates(urlProducto, listaAfiliados, idDecorador) {

	for (i = 0; i < listaAfiliados.length; i++) {
		var url_base = listaAfiliados[i].url_base;
		var url_add = listaAfiliados[i].url_add;
		var tipo_afiliacion = listaAfiliados[i].tipo_afiliacion;
		
		if (urlProducto != undefined) {
			// si es de tipo prestashop
			if (tipo_afiliacion == 1) {
				if (urlProducto.indexOf(url_add) > -1
						&& urlProducto.indexOf(url_base) > -1) {
					if (urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
						// TODO habría que valorar si merece la pena hacer algo
						// en el else de este if
						urlProducto = urlProducto + "&"
								+ listaAfiliados[i].custom_param + "="
								+ idDecorador;
					}
				}
			} else
			// si es de tipo clickdoubler
			if (tipo_afiliacion == 2) {
				if (urlProducto.indexOf(url_add) > -1
						&& urlProducto.indexOf(url_base) > -1) {
					if (urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
						// TODO habría que valorar si merece la pena hacer algo
						// en el else de este if
						urlProducto = urlProducto
								+ listaAfiliados[i].custom_param + "("
								+ idDecorador + ")";
					}
				}

			}
		}

	}
	return urlProducto;

}