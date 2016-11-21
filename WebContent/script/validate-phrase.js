function cancel() {
	window.location.href = "./Action";
	}

$(document).ready(function(){
	
	document.formPhrase.question.focus();

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
						$("#formPhrase").find("h1").append("<img src='"+data.icono1+"' id='icono1' class='icono1'/>");
					}
					$('#formPhrase').find("h1").append("<span class='log-in'>Login </span><span class='sign-up'>"+data.App+" </span> "+data.ver);
					if(data.icono2 != "empty"){
						$("#formPhrase").find("h1").append("<img src='"+data.icono2+"' id='icono2' class='icono2'/>");
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
				
			    
			    $('#crearPhrase').click(function(){
			      var question = document.formPhrase.question.value;
			   	  var phrase = document.formPhrase.phrase.value;
			   	  var nameRegex = /^[a-zA-Z0-9_]+(([\'\,\.\- ][a-zA-Z0-9_])?[a-zA-Z0-9_]*)*$/;
			   	  
			   	  if(question == "") {
			   		reset();
			    	alertify.error("Seleccione la pregunta por favor !!");
			    	document.formPhrase.question.focus();
			    	return false;
			   	  }
			   	  if(phrase == "") {
			   		reset();
			    	alertify.error("Debe de ingresar la respuesta !!");
			    	document.formPhrase.phrase.focus();
			    	return false;
			   	  }
			   	  if(phrase.length <= 1) {
			   		reset();
			    	alertify.error("La nueva clave debe de ser mayor a 6 caracteres !!");
			    	document.formPhrase.phrase.focus();
			    	return false;
			   	  }
			   	  if(phrase.length > 100) {
			   		reset();
			    	alertify.error("La respuesta no puede ser mayor a 100 caracteres !!");
			    	document.formPhrase.phrase.focus();
			    	return false;
			   	  }
			   	  if(!phrase.match(nameRegex)) {
			   		reset();
			    	alertify.error("La ha ingresado caracteres incorrectos !!");
			    	document.formPhrase.phrase.focus();
			    	return false;
			   	  }
			   	  
			   	  $('#formPhrase #key').val(-9);
			   	
			   	  return true;
				    
				   });
			});