var tableAsignados = null; 
var tableEtapas = null;
var procesoId = null;
var etapaSelecId = null;
var i = 0;
var isEtapas = null;
  
var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});
  
/**************
 * PRIORIDAD DE CASO
 * ******/

function cambioPrioridad(keyParam, med) {   
	msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de Colocar con PRIORIDAD ALTA el caso con medidor No.  "+med+
	 "  ? <div>";
			
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
 
				var param = new Array();
				param.push({"name" : "key", "value" : 190});		 
				param.push({"name" : "cdetalleEstrategia", "value" : keyParam});
				param.push({"name" : "prioridad", "value" : 1});  
		
			appWait.showPleaseWait();
		
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){ 
							 noty({text: data.msg, type: 'success', timeout:5000}); 
						}else{ 
							noty({text: data.msg, type: 'error', timeout:5000}); 
						}
					}else{  
						noty({text: data.msg, type: 'error', timeout:5000}); 
					}
				}).fail(function( jqXHR, textStatus, errorThrown ) {  
					appWait.hidePleaseWait(); 
						logException(jqXHR, statusTxt, errorThrown);
				 
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
					setTimeout(function(){buildFormBack(105);}, 300);  							
				});
	  } else {
		return false;   
		}
	});  
} 


function generaPDFFicha(idDetCampa) {
 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 188});		
	param.push({"name" : "idDetCampa", "value" : idDetCampa});   
	
	appWait.showPleaseWait2();
	$.post("./Session", param, function(data){ 
		if(data.permiso){
			if(data.isSuccess){ 
				$("#ListadoCasos-Div").hide();
				$("#div-conteRep").show(); 
				$("#formReporte").attr("src", "data:application/pdf;base64,"+data.pdfBase64);
			}else{ 
				noty({text: data.msg, type: 'error', timeout:5000}); 
			}
		}else{ 
			noty({text: data.msg, type: 'warning', timeout:5000}); 
		}   
				 
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait2(); 
			logException(jqXHR, statusTxt, errorThrown); 
			$("#formReporte").html("");
		return false;
	}).always(function(){
		appWait.hidePleaseWait2();  
		var reporte = document.getElementById('formReporte');
		reporte.src = reporte.src;  
	}); 
}


function ejecutaCierreCaso() {
	try{
		 
		var obser = 	$("#obserEtapaFC").val();
		 
		 
		 if(!vParam(obser)){  
				noty({text: "Ingrese observaciones", type:'error', timeout:7000}); 
				return false; 
		} 
		 
		var param = new Array();
		param.push({"name" : "key", "value" : 115});		  
		param.push({"name" : "pProceso", "value" : procesoId});
		param.push({"name" : "pObser", "value" : obser});
		
		 
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de cerrar el caso del medidor <b>"+
						$("#medEtapaC").val()+"  </br> Tome en cuenta que al momento de cerrar el caso ya no podra asignar tareas ni trasladarlo para un nuevo trabajo ?";
		  
		
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
						procesoId = null;
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
				 
					$("#cancelCerrarCaso").trigger("click"); 
					setTimeout(function(){buildFormBack(105);}, 300);  
				});
			  } else {
					return false;   
					}
				});
		
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}
	
}

function showCierreCaso() {
	try{		
		
		$("#showModalCerrarCaso").modal('show'); 
		$("#obserEtapaFC").val('').html(''); 
		$("#medEtapaC").val($("#medidorCaso").val());
		$("#abonadoEtapaC").val($("#abonadoCaso").val());
		$("#direEtapaC").val($("#direCaso").val());
		$("#proceEtapaC").val($("#procesoCaso").val());
		$("#descEtapaC").val($("#etapaAsigna").val()); 
		 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}


function ejecutaTraslado() {
	try{
		
		var trabajo = 	$("#trabajoAsig").val();
		var obser = 	$("#obserTrabajo").val();
		var motTrabajo = $("#motTrabajo").val();
		
		 if(!vParam(trabajo)){  
				noty({text: "Seleccione trabajo", type:'error', timeout:7000}); 
				return false; 
		} 
		 
		 if(!vParam(obser)){  
				noty({text: "Ingrese observaciones", type:'error', timeout:7000}); 
				return false; 
		} 
		 
			if(!vParam(motTrabajo) || motTrabajo === '0'){ 
				noty({text: "Por favor seleccione motivo de Trabajo!", type:'warning', timeout:7000});
				return false;
			} 

			
		var param = new Array();
		param.push({"name" : "key", "value" : 117});		 
		param.push({"name" : "pTrabajo", "value" : trabajo});
		param.push({"name" : "pProceso", "value" : procesoId});
		param.push({"name" : "pObser", "value" : obser});
		param.push({"name" : "motivoT", "value" : motTrabajo});
		 
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de asignar el trabajo de  <b>"+
						$("#trabajoAsig  option:selected").text()+"  </b>  con las siguientes obserbaciones:  </b>  <b>"+obser+"  </b>?";
		  
		
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
						procesoId = null;
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
				 
					$("#btnCerrarTraslado").trigger("click"); 
					setTimeout(function(){buildFormBack(105);}, 300);  
					
				});
			  } else {
					return false;   
					}
				});
		
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}
	
}


function llenaComboTrabajos(){ 
	 
	$("#trabajoAsig").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#trabajoAsig_chzn").remove(); 
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	var param = new Array();
	param.push({"name" : "key", "value" : 102});		 
	param.push({"name" : "clasifi", "value" :"C"});
	
	appWait.showPleaseWait();
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					 
					llenaComboPPL(data.formulario.comboBox,  $("#trabajoAsig"), 0, false, true);
				}else{
					
					 
					 $("#trabajoAsig").append(noExiste);
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
		llenaComboMotTrabajos();
	}); 
}

function llenaComboMotTrabajos(){ 
	
	$("#motTrabajo").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#motTrabajo_chzn").remove();
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 var param = new Array();
			param.push({"name" : "key", "value" : 136});		 
			param.push({"name" : "tipo", "value" :"P"});
			
	appWait.showPleaseWait();
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#motTrabajo"), 0, false, true);
				}else{
					
					 $("#motTrabajo").append(noExiste);
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

function showTraslado() {
	try{		
		
		$("#showModalTraslado").modal('show'); 
		$("#obserTrabajo").val('').html(''); 
		$("#medEtapaT").val($("#medidorCaso").val());
		$("#abonadoEtapaT").val($("#abonadoCaso").val());
		$("#direEtapaT").val($("#direCaso").val());
		$("#proceEtapaT").val($("#procesoCaso").val());
		$("#descEtapaT").val($("#etapaAsigna").val());
		llenaComboTrabajos();
		 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}



function ejecutaAsignaEtapa() {
	try{
		
		var personalCampa = 	$("#usuarioN").val();
		
		 if(!vParam(personalCampa)){  
				noty({text: "Seleccione usuario", type:'error', timeout:7000}); 
				return false; 
		} 
		 
		var param = new Array();
		param.push({"name" : "key", "value" : 114});		 
		param.push({"name" : "personalCampa", "value" : personalCampa});
		param.push({"name" : "pProceso", "value" : procesoId});
		param.push({"name" : "pEtapa", "value" : etapaSelecId});
		
		 
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de asignar la etapa de  "+
							$("#etapaN").val()  +" al usuario   <b>"+$("#usuarioN  option:selected").text()+"  </b>?";
		  
		
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
				
				appWait.showPleaseWait();
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){  
							isEtapas = data.masEtapas;
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
						procesoId = null;
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
					etapaSelecId = null;
					$("#btnCerrarAsignar").trigger("click"); 
					showEtapas(procesoId, null);
				});
			  } else {
					return false;   
					}
				});
		
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}
	
}

function limpiar(cmbName) {
	$(cmbName).val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$(cmbName+"_chzn").remove();
}


function llenaComboUsuarios(){ 
	var noExiste = "<option value=''>No existen Informacion</option> ";

	$("#usuarioN").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#usuarioN_chzn").remove();
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 108}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					i++;
					llenaComboPPL(data.formulario.comboBox,  $("#usuarioN"), 0, false, true);
				
				}else{
					
					 $("#usuarioN").append(noExiste);
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

function showAsignaEtapa() {
	try{		
		etapaSelecId = null;
		
		 
		var param = new Array();
		param.push({"name" : "key", "value" : 107});		 
		param.push({"name" : "proceso", "value" : procesoId});
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){  
					etapaSelecId = data.aData.idEtapaAsig; 
					
					$("#medEtapaN").val($("#medidorCaso").val());
					$("#abonadoEtapaN").val($("#abonadoCaso").val());
					$("#direEtapaN").val($("#direCaso").val());
					$("#proceEtapaN").val($("#procesoCaso").val());
					$("#etapaN").val(data.aData.etapaAsignar);
					$("#showModalNewEtapa").modal('show');  
					
				}else{
					noty({text: data.msg, type:'error', timeout:7000}); 
				}
			}else{
				noty({text: data.msg, type:'warning', timeout:7000}); 
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
				logException(jqXHR, statusTxt, errorThrown);
				procesoId = null;
			return false;
		}).always(function(){
			appWait.hidePleaseWait();  
			llenaComboUsuarios(); 					
		});
		
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}

function ejecutaCierreEtapa() {
	try{
		
		var obser = 	$("#obserEtapaF").val();
		
		 if(!vParam(obser)){  
				noty({text: "Ingrese observaciones para finalizar la etapa", type:'error', timeout:7000}); 
				return false; 
		} 
		 
		var param = new Array();
		param.push({"name" : "key", "value" : 113});		 
		param.push({"name" : "pObser", "value" : obser});
		param.push({"name" : "pProceso", "value" : procesoId});
		param.push({"name" : "pEtapa", "value" : etapaSelecId});
		
		 
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de finalizar la etapa de  "+
							$("#descEtapaF").val()  +" con las siguientes observaciones: </br> <b>"+obser+"  </b>?";
		  
		
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
						procesoId = null;
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
					$("#btnCerrarEtapaF").trigger("click"); 
					etapaSelecId = null;
					showEtapas(procesoId, null);
				});
			  } else {
					return false;   
					}
				});
		
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}
	
}


function showCierreEtapa(etapaId, etapaName) {
	try{		
		etapaSelecId = null;
		$("#showModalFinEtapa").modal('show'); 
		$("#obserEtapaF").val('').html(''); 
		$("#medEtapaF").val($("#medidorCaso").val());
		$("#abonadoEtapaF").val($("#abonadoCaso").val());
		$("#direEtapaF").val($("#direCaso").val());
		$("#proceEtapaF").val($("#procesoCaso").val());
		$("#descEtapaF").val(etapaName);
		etapaSelecId = etapaId;
		 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}




function listadoEtapas(){
	try{		
		
		if(tableEtapas !== null){
			tableEtapas.fnDestroy();
			tableEtapas = null;
		}
		 
		tableEtapas =	$('#tabla_etapas').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 112});
	            aoData.push({"name": "pProceso","value": procesoId});  
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
	                        noty({text: textStatus, type:'error', timeout:7000}); 
	                    }  
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait();  
	            $(".dataTables_filter").hide(); 
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false }, 
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


function showEtapas(proceso, priori) {
	procesoId = null;
	
	if(priori === 1  ){ 
		$('#prioriAlta').show();
	}else{
		if(priori === 0  ){
			$('#prioriAlta').hide();
		}
		
	}
	
	var param = new Array();
	param.push({"name" : "key", "value" : 111});		 
	param.push({"name" : "proceso", "value" : proceso});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
				procesoId = proceso;
				 
				$("#medidorCaso").val(data.aData.medidor);
				$("#abonadoCaso").val(data.aData.abonado);
				$("#direCaso").val(data.aData.direccion);
				$("#procesoCaso").val(data.aData.tipoProceso);
				$("#fecAsigna").val(data.aData.fechaAsigna);
				$("#etapaAsigna").val(data.aData.nomUltEtapa);
				$("#userAsigna").val(data.aData.userAsUEtapa);
				
				if(data.aData.pendientes === true){
					$("#btnCerrarCaso").hide(); 
					$("#btnTrasladar").hide();
					$("#btnEtapa").hide();
				}else{
					$("#btnCerrarCaso").show(); 
					$("#btnTrasladar").show();
					
					isEtapas = data.aData.existeSiguiete;
					
					if(isEtapas === true ||isEtapas === null){
						$("#btnEtapa").show();
					}else{
						$("#btnEtapa").hide();
					}
					
				} 
				
				
				
				$("#ListadoEtapas-Div").show();
				$("#ListadoCasos-Div").hide();
				
			}else{
				noty({text: data.msg, type:'error', timeout:7000}); 
			}
		}else{
			noty({text: data.msg, type:'warning', timeout:7000}); 
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			procesoId = null;
		return false;
	}).always(function(){
		appWait.hidePleaseWait();  
		listadoEtapas();		
	});
}

function trabajoBus() {
	$("#trabajoBusq").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#trabajoBusq_chzn").remove();
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	var param = new Array();
	param.push({"name" : "key", "value" : 102});		 
	param.push({"name" : "clasifi", "value" :"O"});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#trabajoBusq"), 0, false, true);
					llenaComboPPL(data.formulario.comboBox,  $("#trabajoAsig"), 0, false, true);
				}else{
					
					 $("#trabajoBusq").append(noExiste);
					 $("#trabajoAsig").append(noExiste);
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
		  
	}); 
}

function listadoTrabajos(){
	try{		
		
		if(tableAsignados !== null){
			tableAsignados.fnDestroy();
			tableAsignados = null;
		}
		

		var medidor =  $("#medidor").val();
		var trabajo =  $("#trabajoBusq").val();
		var fechaI = null; 
		var fechaF = null; 
		var isPrioridad = "";
		
		if($("#isPrioridad").is(":checked")){  
			isPrioridad = 1;
		}
		
		if($("#isFechas").is(":checked")){   
			fechaI =$("#fechaIni").find('input').val(); 
			fechaF = $("#fechaFin").find('input').val(); 
		} 
	 	
		if(vParam(medidor)){
			if(!isNumber(medidor)){
				alertify.error('Medidor no valido');
				noty({text: data.msg, type:'error', timeout:7000}); 
				return false;
			} 
		}else{
			medidor = null;
		}
		
		appWait.showPleaseWait();
		tableAsignados =	$('#tabla_trabajos').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 110});
	            aoData.push({"name": "pMedidor","value": medidor});
	            aoData.push({"name": "pTrabajo","value": trabajo}); 
	            aoData.push({"name": "pFechaI","value": fechaI});
	            aoData.push({"name": "pFechaF","value": fechaF}); 
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
	                	}
	                	
	                	if(oaData.permiso){
		        			if(oaData.isSuccess){
		        				appWait.hidePleaseWait(); 
		        				 $(".dataTables_processing").hide(); 
							}else{
								 appWait.hidePleaseWait(); 
								 $(".dataTables_processing").hide(); 
								noty({text: oaData.msg, type:'error', timeout:7000}); 
								
		        			}	
		        		}else{
		        			noty({text: oaData.msg, type:'error', timeout:7000}); 
		        			 $(".dataTables_processing").hide(); 
		        			 $(".dataTables_filter").hide(); 
		        		}
		        			 
	                },
	                "error": function(jqXHR, textStatus, errorThrown) { 
	                    if (textStatus !== "abort") {  
	                        noty({text: textStatus, type:'error', timeout:7000}); 
	                    }  
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	        	 $(".dataTables_processing").hide();
	        	 $(".dataTables_filter").hide(); 
	            appWait.hidePleaseWait(); 
	            trabajoBus();
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "13%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "14%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "14%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false }, 
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
 
	$("#btnFinProcede").on('click', function(){
		try{			
			 ejecutaCierreEtapa();			
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	
	$("#btnEtapa").on('click', function(){
		try{			
			  
			showAsignaEtapa();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnAsignar").on('click', function(){
		try{			
			  
			ejecutaAsignaEtapa();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
 
	$("#btnTrasladar").on('click', function(){
		try{			
			  
			showTraslado();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnEjeTraslado").on('click', function(){
		try{			
			  
			ejecutaTraslado();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnCerrarCaso").on('click', function(){
		try{			
			  
			showCierreCaso();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnEjeCerrarCaso").on('click', function(){
		try{			
			  
			ejecutaCierreCaso();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	

	$("#btnReturn").on('click', function(){
		try{			
			  
			buildFormBack(105);								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnFiltrar").on('click', function(){
		try{			
			  
			listadoTrabajos();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("[name='isPrioridad']").bootstrapSwitch();
	
	listadoTrabajos();
	
});