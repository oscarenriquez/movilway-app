var id = null;
var table = null;
var table2 = null;
var oTable = null;
var oTableGrupo = null;
var idUser=null;
var oTableG = null;


var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});
 

/*******activar/inactivar******/

function activaUser(keyParam, user) {  
	 
	 
	exito = true;
	msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de  activar el usuario "+user+
				" ? <div>";
	alertify.confirm(msjConfirm, function (e) {
		if (e) { 
		var param = new Array();
		param.push({"name" : "key", "value" : 41});		 
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

function inactivaUser(keyParam, user) {  
	 
 
		exito = true;
		msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de Inactivar El usuario "+user+
					" ? <div>";
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
			var param = new Array();
			param.push({"name" : "key", "value" : 42});		 
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

/*****Listado asignacion de nuevos grupos a nuevos usuarios*******/

function showCheck2(keyParam) {
	
	if($("#checkAd"+keyParam).is(":checked")){  
		
		$("#conteCheck"+keyParam).show();
		
	}else{ 
		$("#conteCheck"+keyParam).hide();
		$("#labelS"+keyParam).removeClass('active'); 
		$("#labelN"+keyParam).removeClass('active'); 
		$("#SI"+keyParam).attr('disabled', true).attr('checked', false);
		$("#NO"+keyParam).attr('disabled', true).attr('checked', false);  
		
		 
	  } 
}

function asignarGrupoNew() {
	var isSelected = false;
	var listGrupos= new Array(); 
	var usuario = $("#userNew").val();
	
	if(usuario === null || usuario === undefined || usuario === "-1"){
		alertify.warning('Seleccione un usuario por favor.!!');
		return false;
	}
	
	$("input[type='checkbox']:checked").each(function() { 
		var corre = $(this).val();
		
		if($("#SI"+corre).is(":checked")){  
			listGrupos.push($("#SI"+corre).val());
		  }else{ 
			listGrupos.push($("#NO"+corre).val());
		  }  
			isSelected = true;
	});
	
	if(isSelected === false){
		alertify.warning('Seleccione un grupo por favor.!!');
		return false;
	}
	
	
	var param = new Array();
	param.push({"name" : "key", "value" : 35});	
	param.push({"name" : "listGrupos", "value" : listGrupos});	
	param.push({"name" : "usuario", "value" : usuario});	
	
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
				setTimeout(backUsuario(), 300); 							
			});
}


function llenaComboUser(){ 
	
	$("#userNew").val('').html('').trigger("liszt:updated"); 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 33});		
	
	appWait.showPleaseWait();
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					
					$("#userNew").append("<option value='-1' >Seleccione una Opcion</option> ");
					$.each(data.formulario.comboBox, function(index, el) {
						$("#userNew").append("<option value='"+el.ID+"' >"+el.DESCRIPCION+"</option> ");
					});
				} else{ 
					alertify.error("No existen usuarios para asignar"); 
					backUsuario ();
				}
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
	}); 
}

function clickCrearUsuarioGrupo() {
	
	if(oTableG !== null){
		oTableG.fnDestroy();
		oTableG = null;
	}
	
	oTableG = $('#tbListGrupo').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 34}); 
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
							 $(".dataTables_processing").hide(); 
	        			}	
	        		}else{
	        			 appWait.hidePleaseWait();
	        			alertify.warning(oaData.msg);
	        			 $(".dataTables_processing").hide(); 
	        			
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait(); 
                	 $(".dataTables_processing").hide(); 
                    if (textStatus !== "abort") { 
                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                    }  
                }
            });
        },
        
        
        "fnInitComplete": function(a, json) { 
            appWait.hidePleaseWait(); 
            $("#listadoUsuarios").hide(); 
    		$("#listadoNewGrupos").show();
    		$("#listadoGrupos").hide(); 
    		llenaComboUser();
        },   
		"aoColumns": [
						{ "sWidth": "20%","sClass": "center", "bSortable": false  },
						{ "sWidth": "20%","sClass": "center", "bSortable": false },
						{ "sWidth": "60%","sClass": "center", "bSortable": false }
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
}

 

/*******activar/inactivar notificacion******/

function activarNotifi(keyParam, grupo) {  
	 
	 
	exito = true;
	msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de  activar  Las  notificaciones del grupo: "+grupo+
				" ? <div>";
	alertify.confirm(msjConfirm, function (e) {
		if (e) { 
		var param = new Array();
		param.push({"name" : "key", "value" : 31});		 
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
				setTimeout(showGrupos(idUser), 300); 							
			});
	  } else {
		  return false;  
	  }
	});
} 

function inactivaNoti(keyParam, grupo) {  
	 
 
		exito = true;
		msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de Inactivar Las  notificaciones del grupo: "+grupo+
					" ? <div>";
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
			var param = new Array();
			param.push({"name" : "key", "value" : 32});		 
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
					setTimeout(showGrupos(idUser), 300); 							
				});
		  } else {
			  return false;  
		  }
		});
} 

/*******activar/inactivar******/

function activarGrupo(keyParam, grupo) {  
	 
	 
	exito = true;
	msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de  activar La asignacion del grupo: "+grupo+
				" ? <div>";
	alertify.confirm(msjConfirm, function (e) {
		if (e) { 
		var param = new Array();
		param.push({"name" : "key", "value" : 29});		 
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
				setTimeout(showGrupos(idUser), 300); 							
			});
	  } else {
		  return false;  
	  }
	});
} 

function inactivarGrupo(keyParam, grupo) {  
	 
 
		exito = true;
		msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de Inactivar La asignacion del grupo: "+grupo+
					" ? <div>";
		alertify.confirm(msjConfirm, function (e) {
			if (e) { 
			var param = new Array();
			param.push({"name" : "key", "value" : 30});		 
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
					setTimeout(showGrupos(idUser), 300); 							
				});
		  } else {
			  return false;  
		  }
		});
} 

/*********asignar grupo a usuario *******/
function asignaGrupo() {	
	var grupo = $("#grupoAsig").val();
	var isNoti = 0;

	if(grupo == 0){
		alertify.warning("Por favor seleccione un Grupo para continuar !!! "); 
		return false;
	}
	
	if(idUser == 0){
		alertify.warning("Error al recuperar el correlativo de usuario!!! "); 
		return false;
	}
	
	 if($("#isNoti").is(":checked")){ 
		 isNoti = 1; 
	 }	else {
		 isNoti = 0;
	 }
	
	var param = new Array();
	param.push({"name" : "key", "value" : 28});		 
	param.push({"name" : "grupo", "value" : grupo}); 
	param.push({"name" : "idUser", "value" : idUser});
	param.push({"name" : "isNoti", "value" : isNoti});  
	
 var exito = false;

 var alerta ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; ESTA SEGURO QUE DESEA ASIGNARLE AL GRUPO:     "+grupo+
		"EL USUARIO:    "+$("#NombreUser").val()+" ? <div>";
	 
alertify.confirm(alerta, function (e) {
	if (e) { 
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
	    	   showGrupos(idUser);
	       }
	   });  
	} else {
		 
		return false;   
		}
	});
}
 
 
/***************nuevo************/


/*********** Grupos Asignado a usuario***********/

/*******************COMBO TIPO GRUPOS *********************/
function llenaComboGrupos(){ 
	
	$("#grupoAsig").val('').html('').trigger("liszt:updated"); 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 27});		
	param.push({"name" : "id", "value" : idUser});
	
	appWait.showPleaseWait();
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					$("#cmbComboGrupo").show();
					$("#btnAsiganGrupo").show();
					$("#detalleGrupo").hide().html("");
					
					$("#grupoAsig").append("<option value='-1' >Seleccione una Opcion</option> ");
					$.each(data.formulario.comboBox, function(index, el) {
						$("#grupoAsig").append("<option value='"+el.ID+"' >"+el.DESCRIPCION+"</option> ");
					});
				} else{ 
					 var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>El usuario ya se encuentra en todos los grupos </b></h5>'
						+'</div>'; 
					 
					$("#cmbComboGrupo").hide();
					$("#btnAsiganGrupo").hide();
					$("#detalleGrupo").show().html(titulo);
					
				}
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
	}); 
}

function backUsuario () {
	if(oTableGrupo !== null){
		oTableGrupo.fnDestroy();
		oTableGrupo = null;
	}
	
	if(table !== null){
		table.fnDestroy();
		table = null;
	}
	
	if(oTableG !== null){
		oTableG.fnDestroy();
		oTableG = null;
	}
	
	$("#NombreUser").val("");
	$("#UsuarioUser").val("");
	idUser=null;
	
	$("#listadoUsuarios").show();
	$("#listadoNewGrupos").hide(); 
	$("#listadoGrupos").hide(); 
	
	listadoOnDemmand();
}

function showGrupos(paramKey){   
	try{		
		 
		if(oTableGrupo !== null){
			oTableGrupo.fnDestroy();
			oTableGrupo = null;
		}
		 
		
		oTableGrupo =	$('#tbListUsuarioGrupo').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 26});
	            aoData.push({"name": "paramKey","value": paramKey}); 
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
		        				$("#NombreUser").val(oaData.NombreUser);
								$("#UsuarioUser").val(oaData.UsuarioUser);
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
	            idUser=paramKey;
	            $("#listadoUsuarios").hide(); 
	    		$("#listadoGrupos").show(); 
	    		llenaComboGrupos();
	        },    
			"aoColumns": [
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
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


/******************LISTA TIPO GRUPO**********************/
function listadoOnDemmand(){
	try{		
		if(table !== null){
			table.fnDestroy();
			table = null;
		}
		
		table =	$('#tbUsuarioGrupo').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 25}); 
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
		        				if(oaData.isUser){
		        					$("#btnNuevoA").show();
		        				}else{
		        					$("#btnNuevoA").hide();
		        				}
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
	        },    
			"aoColumns": [
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "50%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "20%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": true }
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