var tableHL = null; 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function clickCortes(anexo) {
try{	 
		
	
		if(tableHL !== null){
			tableHL.fnDestroy();
			tableHL = null;
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
	            aoData.push({"name": "key","value": 63}); 
	            aoData.push({"name" : "anexo", "value" : anexo}); 
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
								 clickReturn();
		        			}	
		        		}else{
		        			alertify.warning(oaData.msg);
		        			clickReturn();
		        		}
		        			 
	                },
	                "error": function(jqXHR, textStatus, errorThrown) { 
	                    if (textStatus !== "abort") { 
	                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
	                    }  
	                    clickReturn();
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
							{ "sWidth": "7%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "7%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "19%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "30%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "7%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true }
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
	
    var tcnfol = $("#tcnfolDefault").val();
	
	if(tcnfol !== 'null'  && tcnfol !== 'undefined'  && tcnfol !== null  && tcnfol !== undefined  && tcnfol !== ''){ 
		 setTimeout(function(){clickCortes(tcnfol);}, 300);
		
	}else{
		alertify.error('Error al recuperar el centro de costo');
		setTimeout(function(){clickReturn();}, 300);
		
	}
});