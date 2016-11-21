

var tableOrigen = null;
var idOrigen = null;
var accion = null;  
 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});
 

 function showEditOrigenD(origen) { 
		idOrigen = null;
		var param = new Array();
		
		param.push({"name" : "key", "value" : 187});		 
		param.push({"name" : "keyParam", "value" : origen});
		appWait.showPleaseWait();
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){ 
					idOrigen = origen;  
					$("#descripcion").val(data.aData.origen);
					 
					$("#conte_gestion").show();
					$("#conte_listado").hide();
					$("#conteBtnEdit").show();
					$("#conteBtnGuardar").hide();
					$("#titleGestion").html('Editar Origen');
						 
				}else{
					noty({text: data.msg, type:'error', timeout:7000}); 
				}
			}else{
				noty({text: data.msg, type:'warning', timeout:7000}); 
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
				logException(jqXHR, statusTxt, errorThrown);
				idOrigen = null;
			return false;
		}).always(function(){
			appWait.hidePleaseWait();  
			 					
		});
}

function clickButton(accion) {   
 
	var descripcion = $("#descripcion").val();
	  
	var mensaje = "";  
		 
		 if(!vParam(descripcion)){  
			 noty({text: "Ingrese origen de denuncia", type:'error', timeout:7000});  
				return false; 
		} 
	    	 
		var param = new Array();
		
		if(accion === 1){
			param.push({"name" : "key", "value" : 185});	
			mensaje = "Esta seguro de crear el origen de denuncia: "+descripcion+" ?";
		}else {
			
			 if(vParam(idOrigen)){  
				 param.push({"name" : "key", "value" : 186});
				 param.push({"name" : "origenId", "value" : idOrigen});
				 param.push({"name" : "activo", "value" : 1});
			}else{
				noty({text: "Imposible realizar solicitud", type:'error', timeout:7000}); 
				return false; 
			}
			   
			 mensaje = "Esta seguro de Editar el origen de denuncia: "+descripcion+" ?";
		}
			    
		param.push({"name" : "origen", "value" : descripcion});  
		 
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
						setTimeout(buildFormBack(183), 300); 							
					});
			  } else {
			return false;   
			}
		});
		 
	} 
 
function motivList(){
	try{		
		if(tableOrigen !== null){
			tableOrigen.fnDestroy();
			tableOrigen = null;
		}
	 
		
		tableOrigen =	$('#tabla_origen').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 184}); 
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
							{ "sWidth": "10%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "15%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "right",  "bSortable": false }, 
							{ "sWidth": "15%", "sClass": "right",  "bSortable": false }
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
 

/******************/
 

$(document).ready(function(){	

	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
   
	
	motivList();  
	
	 
});