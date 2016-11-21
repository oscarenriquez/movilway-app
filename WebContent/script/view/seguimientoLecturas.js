
var tableHL = null; 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function clickLecturas(tipo) {
try{	 
		
	
		if(tableHL !== null){
			tableHL.fnDestroy();
			tableHL = null;
		}
	 
		
		var anexo  = $("#tcnfolDefault").val();  
		
		var fechaIni = null; 
		var fechaFin = null; 
		var anuladas = 0;
		
		if($("#isFecha").is(":checked")){  
			fechaIni =$("#fechaIni").val(); 
			fechaFin = $("#fechaFin").val();	
			tipo = 2;
		}else{
			tipo = 1;
		}
		
		if($("#checkSi").is(":checked")){   	 
			anuladas = 2;
		}
		 
		 
		tableHL =	$('#tabla_HistorialLec').dataTable({  
			"bProcessing": true,  
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true, 
	        "bAutoWidth": false, 
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 48}); 
	            aoData.push({"name" : "anexo", "value" : anexo});
	            aoData.push({"name" : "fechaIni", "value" : fechaIni});
	            aoData.push({"name" : "fechaFin", "value" : fechaFin});
	            aoData.push({"name" : "tipo", "value" : tipo});
	            aoData.push({"name" : "anuladas", "value" : anuladas});
	            $.ajax({
	                "dataType": 'json',
	                "type": "POST",
	                "url": sSource,
	                "data": aoData,
	                "success": function(oaData) { 
	                	fnCallback(oaData); 
	                	
	                	if(oaData.permiso){
		        			if(oaData.isSuccess){
		        				appWait.hidePleaseWait(); 
		        				$("#tcnfolL").val(anexo); 
		        				$("#medidorL").val( oaData.medidor); 
		        				$("#cCostoL").val( oaData.ccosto);
		        				$("#clienteL").val( oaData.cliente); 
							}else{
								alertify.error("Error: "+oaData.msg+", Por favor intente mas tarde!!");
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
	            $("#tabla_HistorialLec_length select").css('color','#000000'); 
	            $(".dataTables_processing").hide(); 
          		 $(".dataTables_filter").hide(); 
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": true }
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
 
 


function clickReturn() { 
	 try{			
			
		 var param = new Array();
			param.push({"name" : "key", "value" : 43});		 
			param.push({"name" : "medDefault", "value" : $("#mediDefault").val()});  
		 
		 
			buildFormParam(this, event, param);
		
	} catch (e) {			
		alertify.error(e.name+": "+e.message);
	}	
}
  

$(document).ready(function(){
	
	var dayFin = new Date();
	var dayIni = new Date(dayFin.getFullYear(), dayFin.getMonth()+1, 1);
	var startDate = dayIni.format("mm/yyyy");
	var endDate = dayFin.format("mm/yyyy"); 
	 
	  
	 $('#fechaIni').val(endDate);
	    $('#fechaIni').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	 $('#fechaFin').val(startDate);
	    $('#fechaFin').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
 
	    
	    var tcnfol = $("#tcnfolDefault").val();
		
		if(tcnfol !== 'null'  && tcnfol !== 'undefined'  && tcnfol !== null  && tcnfol !== undefined  && tcnfol !== ''){ 
			 setTimeout(function(){clickLecturas(1);}, 300);
			
		}else{
			alertify.error('Error al recuperar el centro de costo');
			setTimeout(function(){clickReturn();}, 300);
			
		}
});