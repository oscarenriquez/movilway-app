var id = null;
var table = null;
var table2 = null;
var oTable = null;
var idTipo = null;


var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

 
 /**********Inactivar********/
function inactivaTipoGrupo(keyParam, descripcion) {   
	msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de Inactivar el Tipo de grupo: "+descripcion+
	 "  ? <div>";
			
		alertify.confirm(msjConfirm, function (e) {
			if (e) {  
				var param = new Array();
				param.push({"name" : "key", "value" : 23});		 
				param.push({"name" : "keyParam", "value" : keyParam});  
		
			appWait.showPleaseWait();
		
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){
							 alertify.success(data.msg+" !!");
						}else{
							alertify.error("Error: "+data.msg ); 
						}
					}else{
						alertify.warning("Advertencia: "+data.msg ); 
					}
				}).fail(function( jqXHR, textStatus, errorThrown ) {  
					appWait.hidePleaseWait(); 
						logException(jqXHR, statusTxt, errorThrown);
				 
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
					setTimeout(listadoOnDemmand(), 300); 							
				});
	  } else {
		return false;   
		}
	});  
} 
	
/**********Activar********/
function activaTipoGrupo(keyParam, descripcion) {   
	msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de Activar el Tipo de grupo: "+descripcion+
	 "  ? <div>";
			
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
 
				var param = new Array();
				param.push({"name" : "key", "value" :24});		 
				param.push({"name" : "keyParam", "value" : keyParam});  
		
			appWait.showPleaseWait();
		
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){
							 alertify.success(data.msg+" !!");
						}else{
							alertify.error("Error: "+data.msg ); 
						}
					}else{
						alertify.warning("Advertencia: "+data.msg ); 
					}
				}).fail(function( jqXHR, textStatus, errorThrown ) {  
					appWait.hidePleaseWait(); 
						logException(jqXHR, statusTxt, errorThrown);
				 
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
					setTimeout(listadoOnDemmand(), 300); 							
				});
	  } else {
		return false;   
		}
	});  
} 

/*********EDITAR GRUPO ********/


function showEditTipoGrupo(paramKey, descripcion) {
	$("#editTipoGrupo").modal(); 					
	$("#tipoGrupoDescripcionEdit").val(descripcion);
	idTipo = paramKey;
}
	

function actualizarTipoGrupo(){  
	try{		
		var  tipoGrupoDescripcion =$("#tipoGrupoDescripcionEdit").val();
		
		if(tipoGrupoDescripcion =="" || tipoGrupoDescripcion == null){
			alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD DEBE INGRESAR NOMBRE DEL GRUPO!");
	 		return false;
		} 
		
		if(idTipo =="" || idTipo == null){
			alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, ERROR AL RECUPERAR EL CORRELATIVO DEL TIPO DE GRUPO!");
	 		return false;
		} 

		var alerta ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; ESTA SEGURO QUE DESEA MODIFICAR EL TIPO GRUPO:    "+tipoGrupoDescripcion+" ? <div>";

		alertify.confirm(alerta, function (e) {
			if (e) { 
					var param = new Array();
					param.push({"name" : "key", "value" : 18});		 
					param.push({"name" : "id", "value" : idTipo});
					param.push({"name" : "tipoGrupoDescripcion", "value" : tipoGrupoDescripcion}); 		
					
					var exito = false;
					
					appWait.showPleaseWait();
					$.post("Session", param , function(data) {
						try{
							if(data.permiso){
								if(data.isSuccess){		
																		
									alertify.success(data.msg+" !!");
									exito = true;
								} else {
									alertify.error(data.msg);
								}
							} else {
								alertify.warning(data.msg);
							}	
						} catch (e) {
							throw e;
						} 		
					}).done(function() {
						appWait.hidePleaseWait();			
					}).fail(function(jqXHR, textStatus, errorThrown){
						appWait.hidePleaseWait();
						logException(jqXHR, textStatus, errorThrown);
					}).always(function(){
						appWait.hidePleaseWait();
						 if(exito === true){ 
					    	   $("#cerrarNewedit").trigger("click");  
					    	   listadoOnDemmand();
					       }
						 
					});		
			} else { 
				 $("#cerrarNewedit").trigger("click");  			 
				return false;   
				}
			}); 
		
	} catch (e){
		alert("Error: "+e.message);
		throw new Error(mensajeError);
	}	
	
}



/******************GUARDAR TIPO GRUPO**********************/
function generaTipoGrupo() {	
	var tipoGrupoDescripcion = $("#tipoGrupoDescripcion").val(); 
	
	if(tipoGrupoDescripcion =="" || tipoGrupoDescripcion == null){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD DEBE INGRESAR NOMBRE DEL GRUPO!");
 		return false;
	} 
	
	var alerta ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; ESTA SEGURO QUE DESEA CREAR EL TIPO GRUPO:    "+tipoGrupoDescripcion+" ? <div>";

	alertify.confirm(alerta, function (e) {
		if (e) { 
			   var param = new Array();
			   param.push({"name" : "key", "value" : 16});	
			   param.push({"name" : "tipoGrupoDescripcion", "value" :tipoGrupoDescripcion});
			 
			 var exito = false;
			 appWait.showPleaseWait();
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){  
							alertify.success(data.msg+" !!");
							exito = true;
							 
						}else{
							alertify.error("Error: "+data.msg );
						}
					}else{
						alertify.warning("Advertencia: "+data.msg );
					}
				}).fail(function( jqXHR, textStatus, errorThrown ) {
					logException(jqXHR, textStatus, errorThrown);
					appWait.hidePleaseWait();
					return false;
				}).always(function() { 
			       appWait.hidePleaseWait();   
			       if(exito === true){ 
			    	   $("#cerrarNew").trigger("click");  
			    	   listadoOnDemmand();
			       }
			   });  
		} else { 
			 $("#cerrarNew").trigger("click");  			 
			return false;   
			}
		}); 
}







/******************LEVANTA MODAL**********************/

function clickCrearTipoGrupo() { 
	 $("#newTipo_Grupo").modal(); //	newTipo_Grupo   editTipoGrupo
}

  
/******************LISTA TIPO GRUPO**********************/
function listadoOnDemmand(){
	try{			
	
		if(table !== null){
			table.fnDestroy();
			table = null;
		}
		
		 table = $('#tbGrupo').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",  
		        "aaSorting": [[2, 'desc']],
		        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		            aoData.push({"name": "key","value":17});  
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
				"aoColumns": [
								{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
								{ "sWidth": "40%", "sClass": "left",  "bSortable": true },
								{ "sWidth": "20%", "sClass": "left",  "bSortable": true },
								{ "sWidth": "20%", "sClass": "left",  "bSortable": true },
								{ "sWidth": "15%", "sClass": "left",  "bSortable": true }
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
	listadoOnDemmand();
});