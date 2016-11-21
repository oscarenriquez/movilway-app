function redirectError() {
	var a0 = window.location.pathname;
	//window.location.pathname = a0.substring(0, a0.lastIndexOf("/"));
}

function fnUserAgent() {
	var standalone = window.navigator.standalone;
	var navegador = navigator.userAgent;
	var ios = navegador.match(/like Mac OS X/i);
	var iosDesk = navegador.match(/Mac OS X/i);
	var iosMac = navegador.match(/Macintosh/i);
	var android = navegador.match(/Mobile/i);
	var chrome = navegador.match(/Chrome/i);
	var safari = navegador.match(/Safari/i);
	var tamanio = screen.height - document.documentElement.clientHeight;	
	
	if(ios && chrome){
		return true;
	} else if (ios) {
		if (!standalone) {
			redirectError();
		} else {
			return true;
		}
	} else if (android) {
		if ((tamanio > 40)) {
			redirectError();

		} else {
			return true;
		}
	} else if (iosDesk && iosMac && safari) {
		return true;
	} else if (chrome) {
		return true;
	} else {
		redirectError();
	}
}
