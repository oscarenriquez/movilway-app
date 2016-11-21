function cancel() {
	window.location.href = "./Action";
	}

$(document).ready(function(){
	
	document.formPass.actual.focus();
/**
 * funcion que inicializa el LocalStorage
 */
			IniLocalST = function () {	
				try {
				    if (localStorage.getItem) {
					    
				    	localStorage.removeItem('user');
				    	localStorage.removeItem('pass');
				    	localStorage.removeItem('band');
				    		
				    }
					    
				} catch(e) {
					reset();
			    	alertify.error("Error eliminado PASS");
			    	return false;
				}
			};

/**
 * Se realizan dos post con ajax para realizar validaciones y traer constantes
 * 
 * 
 */
			$.get("./Constante",
					function(data){
						if(data.IsSuccess){
							if(data.background != "empty"){
								$("body").css("background-image","url("+data.background+")");
							}
							if(data.icono1 != "empty"){
								$("#formPass").find("h1").append("<img src='"+data.icono1+"' id='icono1' class='icono1'/>");
							}
							$('#formPass').find("h1").append("<span class='log-in'>Login </span><span class='sign-up'>"+data.App+" </span> "+data.ver);
							if(data.icono2 != "empty"){
								$("#formPass").find("h1").append("<img src='"+data.icono2+"' id='icono2' class='icono2'/>");
							}
							$('head').append("<title>"+data.title+"</title>");
							$('#cabecera').append("<strong>"+data.App2+"</strong>");
						}
				});	
			
			$.get("./Mensaje",
					function(data){
						if(data.IsCaptcha){
							if(!$('.overlay').hasClass('up')) {
								$('.overlay').show();
							}
							
							if(data.IsSuccess){
								reset();
								alertify.success(data.Msg);
								setTimeout(pausa(),5000);
						    	
						    	}else{
									reset();
							    	alertify.error(data.Msg);
							    	return false;
									}
							}else{
								if(data.IsSuccess){
								reset();
						    	alertify.error(data.Msg);
						    	return false;
								}
							}
				});

				
				function pausa(){
					
					$('.overlay').addClass('up').queue(function(){
						$('.overlay').hide("slow").removeClass('up');
			  			$('.overlay').dequeue();
			  			
			  		});
					return false;
					
				}

				reset = function () {
					$("toggleCSS").href = "css/alertify.default.css";
						alertify.set({
						labels : {
							ok     : "OK",
							cancel : "Cancel"
						},
						delay : 5000,
						buttonReverse : false,
						buttonFocus   : "ok"
					});
				};
				
			    IniLocalST();
			   
			    
			    $('#Cambiar-Pass').click(function(){
			      var actual = document.formPass.actual.value;
			   	  var clave = document.formPass.clave.value;
			   	  var confirmar = document.formPass.confirmar.value;
			   	  var nameRegex = /^[a-zA-Z0-9_]+(([\'\,\.\- ][a-zA-Z0-9_])?[a-zA-Z0-9_]*)*$/;
			   	  
			   	  if(actual == "") {
			   		reset();
			    	alertify.error("Debe de ingresar su clave actual !!");
			    	document.formPass.actual.focus();
			    	return false;
			   	  }
			   	  if(clave == "") {
			   		reset();
			    	alertify.error("Debe de ingresar su nueva clave !!");
			    	document.formPass.clave.focus();
			    	return false;
			   	  }
			   	  if(clave.length < 6) {
			   		reset();
			    	alertify.error("La nueva clave debe de ser mayor a 6 caracteres !!");
			    	document.formPass.clave.focus();
			    	return false;
			   	  }
			   	  if(clave.length > 12) {
			   		reset();
			    	alertify.error("La nueva clave no puede ser mayor a 12 caracteres !!");
			    	document.formPass.clave.focus();
			    	return false;
			   	  }
			   	  if(!clave.match(nameRegex)) {
			   		reset();
			    	alertify.error("La nueva clave debe de ser alphanumerica !!");
			    	document.formPass.clave.focus();
			    	return false;
			   	  }
			   	  if(confirmar == "") {
			   		reset();
			    	alertify.error("Debe de confirmar la clave !!");
			    	document.formPass.confirmar.focus();
			    	return false;
			   	  }
			   	  if(!confirmar.match(nameRegex)) {
			   		reset();
			   		alertify.error("La nueva clave debe de ser alphanumerica !!");
			   		document.formPass.confirmar.focus();
			    	return false;
			   	  }
			   	  if(confirmar != clave){
			   		reset();
			   		alertify.error("Las claves no coinciden !!");
			   		document.formPass.confirmar.focus();
			    	return false;
			       }
			   	  
			   	  $('#formPass #key').val(-4);
			   	
			   	  return true;
				    
				   });
			});