var tableRecepcion = null; 
var procesoId = null;
var etapaId = null;

/***Arreglos*/
var arrayProcesos = new Array();
  
var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function recepcionarCaso() {  
// var etapaAs = $("#etapa").val();
 var personalCampa = $("#usuario").val();
 
 
	 if(!vParam(personalCampa)){  
			noty({text: "Seleccione usuario", type:'error', timeout:7000}); 
			return false; 
	} 
	 
	 if(!vParam(arrayProcesos)){  
			noty({text: "Imposible realizar la solicitud", type:'error', timeout:7000}); 
			return false; 
	} 
 
	var param = new Array();
	param.push({"name" : "key", "value" : 109});		 
	param.push({"name" : "personalCampa", "value" : personalCampa}); 
	param.push({"name" : "procesosId", "value" : arrayProcesos}); 
	 
	var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de asignar los casos seleccionados   al usuario "+$("#usuario  option:selected").text()+" ?";
	  
	
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
					setTimeout(buildFormBack(96), 300); 							
				});
		  } else {
		return false;   
		}
	});
	
	 
} 

function showRecepcionar(proceso) {
	procesoId = null;
	var param = new Array();
	param.push({"name" : "key", "value" : 107});		 
	param.push({"name" : "proceso", "value" : proceso});
	appWait.showPleaseWait();
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
				procesoId = proceso;
				etapaId = data.aData.idEtapaAsig;
				$("#medidorR").val(data.aData.medidor);
				$("#areaAsigna").val(data.aData.area);
				$("#abonado").val(data.aData.abonado);
				$("#dire").val(data.aData.direccion);
				$("#etapa").val(data.aData.etapaAsignar);
				$("#fecAsigna").val(data.aData.fechaAsigna);
				$("#obserAsigna").val(data.aData.observaciones);
				$("#recepcionDi").show();
				$("#ListadoEstrategia").hide();
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
		 					
	});
}

 
function llenaComboUsuarios(){ 
	 
	$("#usuario").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#usuario_chzn").remove();
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 108}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#usuario"), 0, false, true);
				}else{
					
					 $("#usuario").append(noExiste);
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


function llenaComboEstra(){ 
	 
	$("#tEstrategia").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#tEstrategia_chzn").remove();
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	var param = new Array();
	param.push({"name" : "key", "value" : 102});		 
	param.push({"name" : "clasifi", "value" :"O"});
	
	appWait.showPleaseWait();
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#tEstrategia"), 0, false, true);
				}else{
					
					 $("#tEstrategia").append(noExiste);
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
		llenaComboUsuarios();
	}); 
}



function llenaComboArea(){ 
	 
	$("#tAreaAsi").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#tAreaAsi_chzn").remove();
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 135}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#tAreaAsi"), 0, false, true);
				}else{
					
					 $("#tAreaAsi").append(noExiste);
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
		llenaComboEstra();
	}); 
}

 

function listadoEstrategias(tipo){
	try{		
		
		direStcCat= new Array();
		
	 	
		var fecIni = null;
		var fecFin = null;
		var trabajo = null;
		var areaAsigna = null;
		var medidor = null;
		var consumoIni = null;
		var consumoFin = null;
		var dMora = null;
		var zona = null;
		var isTodasZona = 0;
		var isPrioridad = "";
		
		if(tipo === 1){
			medidor =  $("#medidor").val();
			trabajo =  $("#tEstrategia").val();
			areaAsigna =  $("#tAreaAsi").val();
			consumoIni =  $("#consumo1").val();
			consumoFin =  $("#consumo2").val();
			dMora=  $("#dMora").val();
			zona =  $("#zonaBus").val();
			
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
			
			if(vParam(dMora)){
				if(!isNumber(dMora)){ 
					noty({text: 'Dias mora no valido', type:'error', timeout:7000}); 
					return false;
				} 
			} 
			
			
			
			if($("#isPrioridad").is(":checked")){  
				isPrioridad = 1;
			}
			
			if($("#isZonasT").is(":checked")){  
				zona ="";
				isTodasZona = 1;
			}else{ 
				 if(vParam(zona) ){
						if(!isZonas(zona)){ 
							noty({text:'Zona no valida' , type:'error', timeout:7000}); 
							return false;
						}
					}
				 }
		 
			
			if(!vParam(consumoIni)){ 
				if(vParam(consumoFin)){ 
						consumoIni = consumoFin;
						consumoFin = null;
					} 
			} 
		}
		

		if(tableRecepcion != null){
			tableRecepcion.fnDestroy();
			tableRecepcion = null;
		}
		
		
		tableRecepcion =	$('#tabla_recepcion').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 106});
	            aoData.push({"name": "tipoProceso","value": trabajo}); 
	            aoData.push({"name": "area","value": areaAsigna}); 
	            aoData.push({"name": "medidor","value": medidor}); 
	            aoData.push({"name": "fechaI","value": fecIni}); 
	            aoData.push({"name": "fechaF","value": fecFin}); 
	            aoData.push({"name": "consumoIni","value": consumoIni}); 
	            aoData.push({"name": "consumoFin","value": consumoFin}); 
	            aoData.push({"name": "zona","value": zona});
	            aoData.push({"name": "isTodasZona","value": isTodasZona});
	            aoData.push({"name": "prioridad","value": isPrioridad});
	            aoData.push({"name": "dMora","value": dMora});
	            
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
								//alertify.error("Error: "+oaData.msg+", Por favor intente mas tarde!!");
								 appWait.hidePleaseWait();
		        			}	
		        		}else{
		        			alertify.warning(oaData.msg);
		        		}
		        			 
	                },
	                "error": function(jqXHR, textStatus, errorThrown) { 
	                    if (textStatus !== "abort") { 
	                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
	                    }  
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait(); 
	            $(".dataTables_filter").hide();
	            if(tipo === 0){
	            	 llenaComboArea();
	            }
	           
	        },  
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "center",  "bSortable": false }, 
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false }
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


function recepcionarMacivo() {
	arrayProcesos =[];
	var seleccionado = null;
	
	$("input[name='procesosRecep']:checked").each(function() { 
		arrayProcesos.push($(this).val());
		seleccionado = true;
	});
	 
	if(seleccionado === true){
		$("#recepcionDi").show();
		$("#ListadoEstrategia").hide();
	}else{
		noty({text: "Por favor seleccione el o los casos a recepcionar!!", type:'error', timeout:7000}); 
	}
	
	
}

$(document).ready(function(){	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
	
	$("[name='isPrioridad']").bootstrapSwitch();
	
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
 
	$("#btnReturn").on('click', function(){
		try{			
			buildForm(this, 96,0);								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	
	$("#btnRecepcionar").on('click', function(){
		try{			
			  
			recepcionarCaso();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnFiltrar").on('click', function(){
		try{			
			  
			listadoEstrategias(1);								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
 
	listadoEstrategias(0);
	
});