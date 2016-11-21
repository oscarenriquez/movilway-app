var tableCasos = null;
var tableEstrategia = null;
var idEstrategia = null;
  
 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});


 

function backEstrategia(){
	buildFormBack(87);
}
 
function detalleCaso(idDetalleEstrategia) {
	//idParam = idDetallaCampaña||medidor||#campaña-tipocampaña
	
	buildForm(this, 43, idParam); 
}

function analisarMed(paramAnalisis) {
	buildForm(this, 43, paramAnalisis); 
}

function listadoCasosXEstrategia(estrategia, fecha, tipo){
	try{		
		if(tableCasos !== null){
			tableCasos.fnDestroy();
			tableCasos = null;
		}
		
		  $("#fechEstrategia").val(fecha);
          $("#estrategiaDescr").val(tipo);
           
		idEstrategia = estrategia;
		
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
	            aoData.push({"name": "key","value": 99});
	            aoData.push({"name": "idEstrategia","value": estrategia});
	            aoData.push({"name": "filtroEs","value": tipo}); 
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
		        				$("#estrategiaDesc").val(oaData.estraDesc);
		        	        	$("#fecEstrategia").val(oaData.fecEstra);
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
	            $("#ListadoCasos").show();
	            $("#ListadoEstrategia").hide();
	            $(".dataTables_filter").hide(); 
	            
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "8%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "7%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false },
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

  
 

function listadoEstrategias(){
	try{		
		if(tableEstrategia !== null){
			tableEstrategia.fnDestroy();
			tableEstrategia = null;
		}
		
		var estadoEs =  $("#estado").val();
		var fechaI = null; 
		var fechaF = null; 
		
		if($("#isFechas").is(":checked")){   
			fechaI =$("#fechaIni").find('input').val(); 
			fechaF = $("#fechaFin").find('input').val(); 
		} 
		
		$("#ListadoCasos").hide();
        $("#ListadoEstrategia").show();
		
		tableEstrategia =	$('#tabla_Estrategia').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 98});
	            aoData.push({"name": "estadoEs","value": estadoEs}); 
	            aoData.push({"name": "fechaI","value": fechaI});
	            aoData.push({"name": "fechaF","value": fechaF}); 
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
								 
								noty({text: oaData.msg, type:'error', timeout:7000}); 
								 $(".dataTables_filter").hide(); 
								
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
	            $(".dataTables_filter").hide(); 
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "14%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "14%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "14%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "center",  "bSortable": false }, 
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

function llenaComboFiltros() {
	$("#estado").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 91}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#estado"), 0, false, true);
				}else{
					
					 $("#estado").append(noExiste);
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
		listadoEstrategias();
	}); 
}

/******************/
 

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
	
 	
	$("#btnReturn").on('click', function(){
		backEstrategia();
	});
	
	
	$("#btnFiltrar").on('click', function(){
		listadoEstrategias();
	});
	
	var  estrategia = $('#paramCampa').val();
	 
	if(vParam(estrategia) && estrategia !== "null"  && estrategia !== "undefined"){
		
		var param = estrategia.split("|");   
		  
		  listadoCasosXEstrategia(param[5], param[3], param[6]);
	   
		
	}else{
		llenaComboFiltros();  
	}
	
	
	
	//buildForm(this, 43, "1|0|1- Denuncias");
});