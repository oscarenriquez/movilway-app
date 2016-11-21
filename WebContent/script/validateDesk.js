fnUserAgent();

$(document).ready(function(){
	    $('#formcatpcha #userlogin').val("");
		$('#formcatpcha #pregunta').val("");
		$('#formcatpcha #respuesta').val("");
		$('#formcatpcha #key2').val("0");
		$('#formcatpcha #captchaimg').attr("src","");
		
		$('#formLogin #key1').val("0");
		$('#formLogin #usuario').val("");
		$('#formLogin #clave').val("");
		
		
	
	
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
				}
			};

             
/**
 * Se realizan dos post con ajax para realizar validaciones y traer constantes
 */
			$.get("./Constante",
					function(data){
						if(data.IsSuccess){
							if(data.background != "empty"){
								$("body").css("background-image","url("+data.background+")");
							}
							if(data.icono2 != "empty"){
								$("#formLogin").find("h1").append("<img src='"+data.icono2+"' id='icono2' class='icono1'/>");
							}
							$('#formLogin').find("h1").append("<span class='log-in'>Login </span><span class='sign-up'>"+data.App+" </span> "+data.ver);
							if(data.icono1 != "empty"){
								$("#formLogin").find("h1").append("<img src='"+data.icono1+"' id='icono1' class='icono2'/>");
							}
							$('head').append("<title>"+data.title+"</title>");
							$('#cabecera').append("<strong>"+data.App2+"</strong>");
							$('.footer-init').find("p").html("<strong>"+data.footer+"</strong>");
						
						}
				});

				$.get("./Mensaje",
						function(data){
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
								reset();
						    	alertify.error("Error eliminado PASS");
						    	return false;
							}
						}
					
					};
				
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
				
			    $(".showpassword").each(function(index,input) {
			        var $input = $(input);
			        $("<p class='opt'/>").append(
			            $("<input type='checkbox' class='showpasswordcheckbox' id='showPassword' style='float:left'/>").click(function() {
			                var change = $(this).is(":checked") ? "text" : "password";
			                var rep = $("<input placeholder='Password' type='" + change + "' />")
			                    .attr("id", $input.attr("id"))
			                    .attr("name", $input.attr("name"))
			                    .attr('class', $input.attr('class'))
			                    .val($input.val())
			                    .insertBefore($input);
			                $input.remove();
			                $input = rep;
			             })
			        ).append($("<label for='showPassword' style='float:left;'/>").text("Mostrar Password")).insertAfter($input.parent());

			        $("<p class='opt'/>").append(
				            $("<input type='checkbox'  id='remember' style='float:left'/>")
				    ).append($("<label for='remember' style='float:left; padding-right: 10px;'/>").text("Recordar Password")).insertAfter($input.parent());
			    });

			    $('#showPassword').click(function(){
					if($("#showPassword").is(":checked")) {
						$('.icon-lock').addClass('icon-unlock');
						$('.icon-unlock').removeClass('icon-lock');    
					} else {
						$('.icon-unlock').addClass('icon-lock');
						$('.icon-lock').removeClass('icon-unlock');
					}
			    });

			    IniLocalST();
			   
			    
			    $('#dologin').click(function(){
					var user = $('#usuario').val();
					var pass = $('#clave').val();
					var nameRegex = /^[a-zA-Z0-9_]+(([\'\,\.\- ][a-zA-Z0-9_])?[a-zA-Z0-9_]*)*$/;
					var conexion  =  localStorage.getItem('conexion');
					var regresa = true;
					

					if(pass != "" || user != ""){
						if('localStorage' in window && window['localStorage'] !== null) {
							$('#remember').LocalST(user,pass);
						}
					}
					
				    if(conexion=="false"){
				    	reset();
				    	alertify.error("Necesita una conexion 3G o WIFI para acceder");
				    	regresa = false;
				     }else if(user==""){
				    	 reset();
					     alertify.error("Ingrese el Usuario");
					     regresa = false;
					 }else if(!user.match(nameRegex)){
				    	 reset();
					     alertify.error("Ha introducido un usuario invalido");
					     regresa = false;
					 }else if(pass==""){
						 reset();
					     alertify.error("Ingrese su Password");
					     regresa = false;
					 }
				    
				    $('#formLogin #key1').val(-5);
				    
				    return regresa;
				    
				   });

			    $('#cancel').click(function() {
					$('.overlay').addClass('up').queue(function(){
						$('.overlay').slideUp().removeClass('up');
			  			$('.overlay').dequeue();
			  			$('#userlogin').val("");
			  			$('#captcha').val("");
			  			$('#pregunta').val("");
			  			$('#respuesta').val("");
			  			
			  		});
			  		return false;
				});
			    
			    $('#userlogin').focusout(function(){
			    	var user   = $('#userlogin').val();
			    	$.post("./Action",{"usuario":user,"key":-2},
							function(data){
								if(data.IsSuccess){
									$('#pregunta').val(data.question);
								}else{
									$('#pregunta').val(null);
								}
						});
			    	
			    });
				
			    $('#grabar').click(function() {

					var user2   = $('#userlogin').val();
					var captcha = $('#captcha').val();
					var respuesta = $('#respuesta').val();
					var pregunta = $('#pregunta').val();
					var nameRegex = /^[a-zA-Z0-9_]+(([\'\,\.\- ][a-zA-Z0-9_])?[a-zA-Z0-9_]*)*$/;
					var conexion2  =  localStorage.getItem('conexion');
					
					
					if(conexion2=="false"){
				    	reset();
				    	alertify.error("Necesita una conexion 3G o WIFI para acceder");
				    	return false;
				     }else if(user2 == ""){
						reset();
					     alertify.error("Ingrese el Usuario");
					     return false;
					}else if(!user2.match(nameRegex)){
						 reset();
					     alertify.error("Ha introducido un usuario invalido");
					     return false;
					}else if(pregunta == ""){
						reset();
					     alertify.error("Inregese la pregunta");
					     return false;
					}else if(respuesta == ""){
						reset();
					     alertify.error("Ingrese la respuesta");
					     return false;
					}else if(!respuesta.match(nameRegex)){
						 reset();
					     alertify.error("Ha introducido una respuesta invalida");
					     return false;
					}else if(captcha==""){
						 reset();
					     alertify.error("Ingrese el Captcha");
					     return false;
					}

					$('#formcatpcha #key2').val(-3);
					return true;
					
			    	 $('.overlay').addClass('up').queue(function(){
						$('.overlay').slideUp().removeClass('up');
			  			$('.overlay').dequeue();
			  		
			  		});
				});
				
			    $('#more').click(function(e) {
					e.preventDefault();
					if(!$('.overlay').hasClass('up')) {
						$('.overlay').slideDown();
						$('#captchaimg').attr("src","./Captcha");	
					}
				});
			    
			   window.addEventListener('load', function(e) {
					window.applicationCache.addEventListener('updateready', function(e) {
						if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
							//notification("An update has been installed.");
							reset();
					    	alertify.success("Se ha instalado una actualizacion");
					    	window.applicationCache.swapCache();
						} else {
							// Manifest didn't change. Nothing new to server.
							reset();
					    	alertify.success("No hay cambios en el servidor");
					    	
						}
					}, false);
				}, false);

			});