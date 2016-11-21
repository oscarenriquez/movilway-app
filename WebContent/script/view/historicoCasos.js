var tableCasosDet = null; 
var tableCasos = null;
var tableNotas = null;  
var idDetCaso = null;

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function gestionarNota() {   
	if(idDetCaso !== null){
		var asunto = $("#asunto").val();
		var obser = $("#obserNota").val(); 
		var mensaje = "";
		 
		 if(!vParam(asunto)){  
				noty({text: "Ingrese asunto", type:'error', timeout:7000}); 
				return false; 
		} 
		 
		 if(!vParam(obser)){  
			 noty({text: "Ingrese Nota", type:'error', timeout:7000});  
				return false; 
		} 
	 
		
		 mensaje = "Esta seguro de crear la nota?";
		 
		 var param = new Array();
		     param.push({"name" : "key", "value" : 193});	
			 param.push({"name" : "nota", "value" : obser}); 
			 param.push({"name" : "titulo", "value" : asunto});
			 param.push({"name" : "detalleId", "value" : idDetCaso});   
		 
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; "+mensaje;
		  
		
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
	  
				appWait.showPleaseWait();
			
					$.post("./Session", param, function(data){
						if(data.permiso){
							if(data.isSuccess){ 
								 noty({text: data.msg, type:'success', timeout:7000}); 
							}else{
								noty({text: data.msg, type:'error', timeout:7000}); 
							}
						}else{
							noty({text: data.msg, type:'warning', timeout:7000}); 
						}
					}).fail(function( jqXHR, textStatus, errorThrown ) {  
						appWait.hidePleaseWait(); 
						logException(jqXHR, statusTxt, errorThrown);
					 
						return false;
					}).always(function(){
						appWait.hidePleaseWait();  
						returnNotas();						
					});
			  } else {
			return false;   
			}
		});
		
	}else{
		noty({text: 'Error al recuperar la informaci&oacute;, por favor intente mas tarde', type:'error', timeout:7000});
		
		setTimeout(function(){buildFormBack(164);}, 300); 
	}  
} 


function onNuevaNota() {
	$('#panelListNotas').hide();
	$('#conte-optionNotas').hide();
	$('#conte_nuevaNota').show();
	
}

function returnNotas() {
	$('#panelNotas').show();
	$('#panelListNotas').show();
	$('#conte-optionNotas').show();
	$('#conte_nuevaNota').hide();
	clearChildren('conte_nuevaNota');
	setTimeout(function(){listNotas();}, 300);
}

function listNotas(){
	if(idDetCaso !== null){
	 	try{		
			if(tableNotas !== null){
				tableNotas.fnDestroy();
				tableNotas = null;
			}
		    
			tableNotas =	$('#tabla_Notas').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[1, 'desc']],
		        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		            aoData.push({"name": "key","value": 192});   
		            $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoData,
		                "success": function(oaData) { 
		                	fnCallback(oaData);
		                	if(oaData.aaData.length == 0){
			               		 $(".dataTables_processing").hide();  
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaData.permiso){
			        			if(oaData.isSuccess){
			        				appWait.hidePleaseWait(); 
			        				 $(".dataTables_filter").hide(); 
								}else{
									 appWait.hidePleaseWait();
									 $(".dataTables_filter").hide(); 
									noty({text: oaData.msg, type:'error', timeout:7000});  
									
			        			}	
			        		}else{
			        			alertify.warning(oaData.msg);
			        		}
			        			 
		                },
		                "error": function(jqXHR, textStatus, errorThrown) { 
		                    if (textStatus !== "abort") { 
		                    	noty({text: textStatus , type:'error', timeout:7000});  
		                    }  
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		            appWait.hidePleaseWait();  
		            $(".dataTables_processing").hide();   
		            $(".dataTables_filter").hide();  
		        },     
				"aoColumns": [
								{ "sWidth": "15%",  "sClass": "left",  "bSortable": false },						
								{ "sWidth": "55%", "sClass": "left",  "bSortable": false },
								{ "sWidth": "15%", "sClass": "left",  "bSortable": false },  
								{ "sWidth": "15%", "sClass": "left",  "bSortable": false }
						  	],
		  		"oLanguage": {
					"sSearch": "Busqueda por todos los campos:",
					"sProcessing":   "Procesando...",
					"sLengthMenu":   "Mostrar _MENU_ registros",
					"sZeroRecords":  "No se encontraron resultados",
					"sInfo":         "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
					"sInfoEmpty":    "Mostrando desde 0 hasta 0 de 0 registros",
					"sInfoFiltered": "(filtrado de _MAX_ registros en total)",
					"sInfoPostFix":  "",
					"sUrl":          "",
						    "oPaginate": {
							"sFirst":    "Primero",
							"sPrevious": "Anterior",
							"sNext":     "Siguiente",
							"sLast":     "Ultimo"
						    }
				}	  		
			}); 
			
			
		} catch (e){
			alert("Error: "+e.message);
			throw new Error(mensajeError);
		}	 
	}else{
		noty({text: 'Error al recuperar la informaci&oacute;, por favor intente mas tarde', type:'error', timeout:7000});
		
		setTimeout(function(){buildFormBack(164);}, 300); 
	} 
	
}


function onNotas(idDetalle, desc ) {
	
	idDetCaso = idDetalle;
	var para = desc.split('|');
	
	if(para[3] === "1"){ 
		$('#prioriAltaN').show();
	}else{
		$('#prioriAltaN').hide();
	}
	 
	$('#medidorNot').val(para[0]);
	$('#direNot').val(para[1]);
	$('#abonadoNot').val(para[2]);
	
	$('#panelNotas').show();
	$('#contenido').hide();
 
	setTimeout(function(){listNotas();}, 300); 
}


function clickFotos(paramKey){ 
 
		var param = new Array();
		param.push({"name" : "key", "value" : 191});
		param.push({"name" : "fichaId", "value" : paramKey});		 
 
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){  
					
					if(data.divHTML.length>0){
					
						 $("#conteFotosCampo").html(data.divHTML);
						 $('[data-toggle="tooltip"]').tooltip(); 
					} else{ 
						 var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
								+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
							+'</div>'; 
						 
						 $("#conteFotosCampo").html(titulo);
						  
					}
					 
					 
				} else{ 
					
					if(data.msg ==="No Existen Fotos"){
						var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
						+'</div>'; 
					 
					 $("#conteFotosCampo").html(titulo);
					} else{
						var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>'+data.msg+' </b></h5>'
						+'</div>'; 
					 
					 $("#conteFotosCampo").html(titulo);
					}
					 
					  
				}
			} else{
				var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
					+'<h5 ><b>'+data.msg+' </b></h5>'
				+'</div>'; 
			 
			 $("#conteFotosCampo").html(titulo);
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {   
			appWait.hidePleaseWait();  
			return false;
		}).always(function(){ 
			
			 $("#consultaFotosCampo").html("<span class='glyphicon glyphicon-camera'></span> Fotografias");
			appWait.hidePleaseWait();  
			
			var $lg = $('.lightbox');
			if ($lg[0]) {
			    $lg.lightGallery({
			        enableTouch: true,
			        onOpen: function (plugin){			        	
			    		$("#lg-action").append('<a class="text-center" data-rotate="0" id="rotate-img"><span class="glyphicon glyphicon-share-alt"></span></a>');
			    		$("#rotate-img").on("click", function(){ 
			    			var $obj = $(".lg-slide.current"); 
			    			var valueRotate = $obj.data("rotate"); 
			    			var nowRotate = 0;			        			
			    			if(valueRotate !== undefined){
			    				nowRotate = fnRotateImage($obj.find("img"), valueRotate); 
			    			} else {
			    				nowRotate = fnRotateImage($obj.find("img"), 0); 
			    			}
			    			
			    			$obj.data("rotate", nowRotate);
			    			
			    		});
			        }
			    });			        			        
			}
		}); 	
}	 

function verFicha(idDetalle, priori) {
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 167});		 
		param.push({"name" : "idDetalle", "value" : idDetalle});
		param.push({"name" : "consulta", "value" : 1});  
 
		var idFicha = "";
		
		if(priori === "1"){ 
			$('#prioriAltaF').show();
		}else{
			$('#prioriAltaF').hide();
		}
		
		$.post("./Session", param, function(dataF){
				if(dataF.permiso){
					if(dataF.isSuccess){  
						$('#panelFicha').show();
						$('#contenido').hide();
						
					idFicha = dataF.aData.idFicha;
				 	$("#medF").val(dataF.aData.medidor);
				 	$("#racSocial").val(dataF.aData.razonSoc);  
					$("#lecturaF").val(dataF.aData.lecMed);  
					$("#nombreF").val(dataF.aData.nombre);  
					$("#direccionF").val(dataF.aData.direccion);
					$("#estadoMedF").val(dataF.aData.estadoMed);	
					$("#lecturaF").val(dataF.aData.lecMed); 
					$("#izquierdo").val(dataF.aData.medidorIzq);  
					$("#derecho").val(dataF.aData.medidorDer);  
					$("#nomEntrevF").val(dataF.aData.nomEntrev);   
					$("#emailF").val(dataF.aData.email);  
					$("#tipoTelF").val(dataF.aData.tipoTel);  
					$("#telContactoF").val( dataF.aData.telContacto );    
					$("#usoSueloF").val( dataF.aData.usoSuelo );  
					$("#cantHabitantesF").val( dataF.aData.cantHabitantes );  
					$("#cantTrabajadorF").val( dataF.aData.cantTrabajador );  
					$("#subTPrivadoF").val( dataF.aData.PRIVADO );    
					$("#gobiernF").val(dataF.aData.gobiern);  
					$("#tuComercio").val(dataF.aData.comercio);  
					$("#numLocalesF").val(dataF.aData.numLocales);  
					$("#tuServicioF").val(dataF.aData.SERVICIOS);
					$("#tuAlimenF").val(dataF.aData.subTAlimen);	
					$("#tuIndustriaF").val(dataF.aData.subTIndus); 
					$("#tuOtrosF").val(dataF.aData.subTOtros);
					$("#obser").val(dataF.aData.obser);   					
					$("#empagua").val(dataF.aData.empagua);  
					$("#mariscal").val(dataF.aData.mariscal);
					$("#pozo").val(dataF.aData.pozo);
					$("#pipa").val(dataF.aData.pipas);
					$("#pFrecuencia").val(dataF.aData.frecuencia);
					$("#pCantidad").val(dataF.aData.cantPipa);
					$("#cisternaEF").val(dataF.aData.cisterEle); 
					$("#cisternaSF").val(dataF.aData.cisterSub);
					$("#tonel").val(dataF.aData.tonelCant); 
					$("#sanitario").val(dataF.aData.sanitarios);
					$("#lavamanos").val(dataF.aData.lavamanos);
					$("#lavaplatos").val(dataF.aData.lavaplatos);
					$("#ducha").val(dataF.aData.duchas);
					$("#chorro").val(dataF.aData.chorros);
					$("#lavadora").val(dataF.aData.lavadora);
					$("#pila").val(dataF.aData.pila);
					$("#piscina").val(dataF.aData.piscina);
					$("#jardin").val(dataF.aData.mtsJardin);
					$("#IDENTIFICADORFICHA").val(dataF.aData.IDENTIFICADORFICHA);
					$("#TIPOFICHA").val(dataF.aData.TIPOFICHA);
					$("#userCarga").val(dataF.aData.userCarga);
					$("#fecCarga").val(dataF.aData.fecCarga);
					$("#viviendaF").val(dataF.aData.VIVIENDA);
					$("#nivelesV").val(dataF.aData.nivelesV);
					$("#obserAsigF").val(dataF.aData.OBSERASIGNA);
					$("#userCarga").val(dataF.aData.USERCREAFICHA);
					$("#fecCarga").val(dataF.aData.FECCREAFICHA);
				    
					if(dataF.aData.tipo === "L"){
						$("#lecturaALF").val(dataF.aData.lecMedAlca);  
						$("#estadoMedAlcanF").val(dataF.aData.estMedAlcanta);
						$("#empaguaAlca").val(dataF.aData.esEmpagua);
						$("#mariscalAlca").val(dataF.aData.esMariscal);
						$("#candelasVAl").val(dataF.aData.candelasVis);
						$("#plantaTAlcanF").val(dataF.aData.plantTrata);
						$("#pozoAbALF").val(dataF.aData.cantPozoAbs);
						$("#tonelAlca").val(dataF.aData.tonelCant);
						$("#cisternaEAlF").val(dataF.aData.cisterEleAl);
						$("#cisternaSAF").val(dataF.aData.cisterSubAl); 
						$("#obser2").val(dataF.aData.observa);
						$("#alcaConte").show();
					}
					 
					  
				}else{ 
					noty({text: dataF.msg, type:'error', timeout:7000}); 
				} 
			}else{ 
				noty({text: dataF.msg, type:'error', timeout:7000}); 
			} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {    
		 
			return false;
		}).always(function(){   
			 setTimeout(function(){clickFotos(idFicha);}, 300); 
		});  
}


function llenaComboParametros(){ 
	
	$("#filtrosE").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 91}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#filtrosE"), 0, false, true);
				}else{
					
					 $("#filtrosE").append(noExiste);
				}
				 
			}else{
				noty({text: data.msg, type:'error', timeout:7000}); 
			}
		}else{
			noty({text: data.msg, type:'warning', timeout:7000}); 
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
	 
		return false;
	}).always(function(){
		appWait.hidePleaseWait();    
	}); 
}


/**********************/

function casosList(tipo){
	try{		
		if(tableCasos !== null){
			tableCasos.fnDestroy();
			tableCasos = null;
		}
	 
	 	
		var fecIni = null;
		var fecFin = null; 
		var medidor = null;
		var tAplica = null; 
		var filtro = null; 
		var isPrioridad = "";
		
		if(tipo === 1){
			medidor =  $("#medidor").val(); 
			filtro =  $("#filtrosE").val();
			tAplica =  $("#tAplica").val(); 
			
			if($("#isFechas").is(":checked")){   
				fecIni =$("#fechaIni").find('input').val(); 
				fecFin = $("#fechaFin").find('input').val(); 
			} 
		 	
			if(vParam(medidor)){
				if(!isNumber(medidor)){ 
					noty({text: 'Medidor no valido', type:'error', timeout:7000}); 
					return false;
				} 
			}  
			
			if($("#isPrioridad").is(":checked")){  
				isPrioridad = 1;
			}
		}
		
		
		
		tableCasos =	$('#tabla_casos').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 165});  
	            aoData.push({"name": "aplica","value": tAplica}); 
	            aoData.push({"name": "medidor","value": medidor});
	            aoData.push({"name": "filtro","value": filtro}); 
	            aoData.push({"name": "fechaI","value": fecIni}); 
	            aoData.push({"name": "fechaF","value": fecFin});
	            aoData.push({"name": "prioridad","value": isPrioridad});
	            $.ajax({
	                "dataType": 'json',
	                "type": "POST",
	                "url": sSource,
	                "data": aoData,
	                "success": function(oaData) { 
	                	fnCallback(oaData);
	                	if(oaData.aaData.length == 0){
		               		 $(".dataTables_processing").hide();  
		               		 $(".dataTables_filter").hide(); 
	                	}
	                	
	                	if(oaData.permiso){
		        			if(oaData.isSuccess){
		        				appWait.hidePleaseWait(); 
		        				 $(".dataTables_filter").hide(); 
							}else{
								 appWait.hidePleaseWait();
								 $(".dataTables_filter").hide(); 
								noty({text: oaData.msg, type:'error', timeout:7000});  
								
		        			}	
		        		}else{
		        			alertify.warning(oaData.msg);
		        		}
		        			 
	                },
	                "error": function(jqXHR, textStatus, errorThrown) { 
	                    if (textStatus !== "abort") { 
	                    	noty({text: textStatus , type:'error', timeout:7000});  
	                    }  
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait();  
	            $(".dataTables_processing").hide();   
	            $(".dataTables_filter").hide();  
	        },     
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },   
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false }
					  	],
	  		"oLanguage": {
				"sSearch": "Busqueda por todos los campos:",
				"sProcessing":   "Procesando...",
				"sLengthMenu":   "Mostrar _MENU_ registros",
				"sZeroRecords":  "No se encontraron resultados",
				"sInfo":         "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
				"sInfoEmpty":    "Mostrando desde 0 hasta 0 de 0 registros",
				"sInfoFiltered": "(filtrado de _MAX_ registros en total)",
				"sInfoPostFix":  "",
				"sUrl":          "",
					    "oPaginate": {
						"sFirst":    "Primero",
						"sPrevious": "Anterior",
						"sNext":     "Siguiente",
						"sLast":     "Ultimo"
					    }
			}	  		
		}); 
		
		
	} catch (e){
		alert("Error: "+e.message);
		throw new Error(mensajeError);
	}	
}


 

function verDetalle(id, desc){
	try{		
		if(tableCasosDet !== null){
			tableCasosDet.fnDestroy();
			tableCasosDet = null;
		}
	 
		$("#colEtapa").addClass("ui-state-default center");
		var para = desc.split('|');
		
		$('#medidorCaso').val(para[0]);
		$('#direCaso').val(para[1]);
		$('#abonadoCaso').val(para[2]);
		
		$('#conte_detalle').show();
		$('#conte_Head').hide();
		
		if(para[3] === "1"){ 
			$('#prioriAlta').show();
		}else{
			$('#prioriAlta').hide();
		}
		
		tableCasosDet =	$('#tabla_casosDet').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 166}); 
	            aoData.push({"name": "idDetalle","value": id}); 
	            $.ajax({
	                "dataType": 'json',
	                "type": "POST",
	                "url": sSource,
	                "data": aoData,
	                "success": function(oaData) { 
	                	fnCallback(oaData);
	                	if(oaData.aaData.length == 0){
		               		 $(".dataTables_processing").hide();  
	                	}
	                	
	                	if(oaData.permiso){
		        			if(oaData.isSuccess){
		        				appWait.hidePleaseWait(); 
							}else{
								 appWait.hidePleaseWait();
								 
								noty({text: oaData.msg, type:'error', timeout:7000});  
								
		        			}	
		        		}else{
		        			alertify.warning(oaData.msg);
		        		}
		        			 
	                },
	                "error": function(jqXHR, textStatus, errorThrown) { 
	                    if (textStatus !== "abort") { 
	                    	noty({text: textStatus , type:'error', timeout:7000});  
	                    }  
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait();  
	            $(".dataTables_processing").hide();   
	        },     
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "13%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "12%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },   
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false }
					  	],
	  		"oLanguage": {
				"sSearch": "Busqueda por todos los campos:",
				"sProcessing":   "Procesando...",
				"sLengthMenu":   "Mostrar _MENU_ registros",
				"sZeroRecords":  "No se encontraron resultados",
				"sInfo":         "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
				"sInfoEmpty":    "Mostrando desde 0 hasta 0 de 0 registros",
				"sInfoFiltered": "(filtrado de _MAX_ registros en total)",
				"sInfoPostFix":  "",
				"sUrl":          "",
					    "oPaginate": {
						"sFirst":    "Primero",
						"sPrevious": "Anterior",
						"sNext":     "Siguiente",
						"sLast":     "Ultimo"
					    }
			}	  		
		}); 
		
		
	} catch (e){
		alert("Error: "+e.message);
		throw new Error(mensajeError);
	}	
}


$(document).ready(function(){	

	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
 
	var dayFin = new Date();
	var dayIni = new Date(dayFin.getFullYear(), dayFin.getMonth(), 1);
	var startDate = dayIni.format("dd/mm/yyyy");
	var endDate = dayFin.format("dd/mm/yyyy");  
	
	$('#fechaIni').find('input').val(startDate);
	$('#fechaIni').datepicker().on('changeDate', function(ev) {
		if ($('.datepicker-days').is(':visible')) {
			$(this).datepicker('hide');
			
		}
	});
	
	$('#fechaFin').find('input').val(endDate);
	$('#fechaFin').datepicker().on('changeDate', function(ev) {
		if ($('.datepicker-days').is(':visible')) {
			$(this).datepicker('hide');	 
		}
	});	
	
	$("#btnFiltrar").on('click', function(){
		try{			
			  
			casosList(1);								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	}); 
	
	$("[name='isPrioridad']").bootstrapSwitch();
	
    setTimeout(function(){llenaComboParametros();}, 300);
    setTimeout(function(){casosList(0);}, 300); 
	
	 
});