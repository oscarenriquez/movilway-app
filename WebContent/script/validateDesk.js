fnUserAgent();
var keys;
var lang;
var checkbxsCheckmark = document.getElementById("remember"),
pathDefs = {
	checkmark : ['M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16']			
},
animDefs = {
	checkmark : { speed : .2, easing : 'ease-in-out' }			
};

function getKeys() {
	$.jCryption.getKeys("EcServlet?doWizzard=true", function(receivedKeys) {
		keys = receivedKeys;
	});
}

function getLang() {
	var ln = x=window.navigator.language||navigator.browserLanguage;
	if(ln.toUpperCase() == 'ES') {
		chgLang('es');
		lang="es";
	}else if(ln.toUpperCase() == 'EN-US') {
		chgLang('en');
		lang="en";
	} else{
		chgLang('es');
		lang="es";
		
	}
};

function createSVGEl( def ) {
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	if( def ) {
		svg.setAttributeNS( null, 'viewBox', def.viewBox );
		svg.setAttributeNS( null, 'preserveAspectRatio', def.preserveAspectRatio );
	}
	else {
		svg.setAttributeNS( null, 'viewBox', '0 0 100 100' );
	}
	svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
	return svg;
}

function draw( el ) {
	var paths = [], pathDef, 
		animDef,
		svg = el.parentNode.querySelector( 'svg' );
	
	pathDef = pathDefs.checkmark; 
	animDef = animDefs.checkmark;	
	paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );	
	
	for( var i = 0, len = paths.length; i < len; ++i ) {
		var path = paths[i];
		svg.appendChild( path );

		path.setAttributeNS( null, 'd', pathDef[i] );

		var length = path.getTotalLength();
		path.style.strokeDasharray = length + ' ' + length;
		if( i === 0 ) {
			path.style.strokeDashoffset = Math.floor( length ) - 1;
		}
		else path.style.strokeDashoffset = length;
		path.getBoundingClientRect();
		path.style.transition = path.style.WebkitTransition = path.style.MozTransition  = 'stroke-dashoffset ' + animDef.speed + 's ' + animDef.easing + ' ' + i * animDef.speed + 's';
		path.style.strokeDashoffset = '0';
	}
}

function reset( el ) {
	Array.prototype.slice.call( el.parentNode.querySelectorAll( 'svg > path' ) ).forEach( function( el ) { el.parentNode.removeChild( el ); } );
}

function controlCheckbox( el, svgDef ) {
	var svg = createSVGEl( svgDef );
	el.parentNode.appendChild( svg );
	
	el.addEventListener( 'change', function() {
		if( el.checked ) {
			draw( el );
		}
		else {
			reset( el );
		}
	} );
}

function getKeys() {
	$.jCryption.getKeys("EcServlet?doWizzard=true", function(receivedKeys) {
		keys = receivedKeys;
	});
}

function getLang() {
	var ln = x=window.navigator.language||navigator.browserLanguage;
	if(ln == 'es') {
		chgLang('es');
	}else if(ln == 'en-us') {
		chgLang('en');
	} else{
		chgLang('es');
	}
};


$(document).ready(function(){
	getLang();
	getKeys();
    $('#formcatpcha #userlogin').val("");
	$('#formcatpcha #pregunta').val("");
	$('#formcatpcha #respuesta').val("");
	$('#formcatpcha #key2').val("0");
	$('#formcatpcha #captchaimg').attr("src","");		
	$('#formLogin #key1').val("0");
	$('#formLogin #usuario').val("");
	$('#formLogin #clave').val("");					
	
	/**
	 * funcion para el checkbox de remember
	 */
	if( document.createElement('svg').getAttributeNS ) {			
		controlCheckbox( checkbxsCheckmark );
	}
	
/**
 * funcion que inicializa el LocalStorage
 */
	IniLocalST = function () {	
		var passui= "";
		var userui= "";
		var bandui= "";
						
		try {
		    if (localStorage.getItem) {
		        passui = localStorage.getItem('pass');
		        userui = localStorage.getItem('user');
		        bandui = localStorage.getItem('band');				       				        
		    }
		} catch(e) {
			passui = "";
			userui = "";
			bandui = "";
		}

		 $('#clave').val(passui);
		 $('#usuario').val(userui);
		 
		if(bandui == "true"){
			$('#remember').attr('checked', true);
			draw( checkbxsCheckmark );	
		}
	};

             
/**
 * Se realizan dos post con ajax para realizar validaciones y traer constantes
 */
	$.get("./Constante",
		function(data){
			if(data.IsSuccess){							
				$("#formLogin").find("h1").append("<img src='./img/Icon.png' id='icono2' class='icono1 hidden-xs'/ width='48'>");							
				$('#formLogin').find("h1").append("<span class='log-in'>Login </span><span class='sign-up'>"+data.App+" </span> "+data.ver);
				$("#formLogin").find("h1").append("<img src='./img/movilway_white.png' id='icono1' class='icono2 hidden-xs' width='48'/>");																				
				$('head').append("<title>"+data.title+"</title>");
				$('#cabecera').append("<strong>"+data.App2+"</strong>");
				$('.footer-init').find("p").html("<strong>"+data.footer+"</strong>");						
			}
	});

	$.get("./Mensaje", function(data){
		if(data.IsCaptcha){
			if(!$('.overlay').hasClass('up')) {
				$('.overlay').slideDown();
				$('#captchaimg').attr("src","./Captcha");
				$('#userlogin').val("");
	  			$('#pregunta').val("");
	  			$('#respuesta').val("");
	  			$('#formcatpcha #key2').val("0");
	  			$('#formLogin #key1').val("0");
			}
			
			if(data.IsSuccess){									
				noty({text:data.Msg, type : "success", timeout: 4000});
				setTimeout(pausa(),5000);							    	
	    	}else{										
		    	noty({text:data.Msg, type : "error", timeout: 4000});
		    	return false;
			}
		}else{
			if(data.IsSuccess){								
	    		noty({text:data.Msg, type : "error", timeout: 4000});
	    		return false;
			}
		}
	});
				
	function pausa(){
		
		$('.overlay').addClass('up').queue(function(){
			$('.overlay').slideUp().removeClass('up');
  			$('.overlay').dequeue();
  			
  		});
		return false;
		
	}

/**
 * se crea controlador de Jquery para actualizar el LocalStorage
 */
	$.fn.LocalST = function(user,pass){
		if($("#remember").is(":checked")) {

	    	localStorage.setItem('user', user);
	    	localStorage.setItem('pass', pass);
	    	localStorage.setItem('band', "true");
			 
		} else {
			try {
			    if (localStorage.getItem) {
				    
			    	localStorage.removeItem('user');
			    	localStorage.removeItem('pass');
			    	localStorage.removeItem('band');
			    		
			    }
				    
			} catch(e) {
				noty({text:"ERROR AL LIMPIAR LA CONTRASEÑA", type : "error", timeout: 4000});
		    	return false;
			}
		}		
	};				   

    IniLocalST();
   
    
    $('#dologin').click(function(e){
    	getKeys();
    	e.preventDefault();
    	e.stopPropagation();
    	$(this).addClass("processing");
    	    
		var user = $('#usuario').val();
		var pass = $('#clave').val();
		var nameRegex = /^[a-zA-Z0-9_]+(([\'\,\.\- ][a-zA-Z0-9_])?[a-zA-Z0-9_]*)*$/;
		var conexion  =  localStorage.getItem('conexion');					
		
		if(pass != "" || user != ""){
			if('localStorage' in window && window['localStorage'] !== null) {
				$('#remember').LocalST(user,pass);
			}
		}							
		
	    if(conexion=="false"){				    		    	
	    	noty({text:"Necesita una conexion 3G o WIFI para acceder", type : "error", timeout: 4000});
	    	$(this).removeClass("processing");
	    	return false;
	     }else if(user==""){				    	 		     
		     noty({text:"Ingrese el Usuario", type : "error", timeout: 4000});
		     $(this).removeClass("processing");
		     return false;
		 }else if(!user.match(nameRegex)){				    	 		     
		     noty({text:"Ha introducido un usuario invalido", type : "error", timeout: 4000});
		     $(this).removeClass("processing");
		     return false;
		 }else if(pass==""){						 		     
		     noty({text:"Ingrese su Password", type : "error", timeout: 4000});
		     $(this).removeClass("processing");
		     return false;
		 }
	    
	    $('#formLogin #key1').val(-5);
	    $('#formLogin #lang').val(lang);
	    
	    setTimeout(function(){
	    	  $.jCryption.encrypt(user, keys, function(encrypted) {									
	  			$.jCryption.encrypt(pass, keys, function(encryptedPasswd) {	
	  				$('#clave').css("color", "transparent");
	  				$('#clave').val(encryptedPasswd);
	  				$('#usuario').css("color", "transparent");
	  				$('#usuario').val(encrypted);
	  				$('#formLogin').submit();
	  			});
	  		});
    	},500);

		 $(this).removeClass("processing");
	});

        
   window.addEventListener('load', function(e) {
		window.applicationCache.addEventListener('updateready', function(e) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				//notification("An update has been installed.");		    	
		    	noty({text:"Se ha instalado una actualizacion", type : "success", timeout: 4000});
		    	window.applicationCache.swapCache();
			} else {
				// Manifest didn't change. Nothing new to server.						    	
		    	noty({text:"No hay cambios en el servidor", type : "success", timeout: 4000});
			}
		}, false);
	}, false);
   
   


});