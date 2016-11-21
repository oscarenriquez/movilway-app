var tipoSelect = 0;
var idGrupo = null;
var idCuenta = null;
var tableGrupo = null;
var tableCuentas = null;
var tableConsumo = null;
var tableUsuario = null;
var tableConvenio = null;
var statusMed = null;
var isConvenio = null;
var jsonDataGrupo = { 
};

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

/***********USUARIOS*********/

function listadoUser(){
	try{	 
		
		if(tableUsuario !== null){
			tableUsuario.fnDestroy();
			tableUsuario = null;
		}
		
		tableUsuario =	$('#tabla_usuarioG').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 38}); 
	            aoData.push({"name" : "keyParam", "value" : idGrupo});
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
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait(); 
	        },    
			"aoColumns": [
								{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "25%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
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

function showUsuarios(keyGrupo){
	var param = [{"name": "keyParam", "value": keyGrupo},   
	              {"name": "key", "value": 5}]; 
	var exito = false;
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					idGrupo = keyGrupo;
					 var titulo = '<div class="alert alert-info text-center" role="alert" style =" width: 530px;padding-top: 3px; margin: 0 auto;">'
										+'<h5 style="    font-size: 25px;"><b>'+data.aData.grupo+'</b></h5>'
									+'</div>'; 
									
							$("#infoGrupoU").show().html(titulo);
					  
			}else{
				alertify.error("Error: "+data.msg ); 
				idGrupo = null;
			}
		}else{
			alertify.warning("Advertencia: "+data.msg ); 
			idGrupo = null;
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			idGrupo = null;
	 
		return false;
	}).always(function(){
		appWait.hidePleaseWait(); 
		if(exito === true){
			$("#contenido-Grupo").hide(); 
			$("#contenido-Cuentas").hide();
			$("#contenido-userGrupo").show();
			listadoUser();
		}else{
			$("#contenido-Grupo").show(); 
			$("#contenido-Cuentas").hide(); 
			$("#contenido-userGrupo").hide(); 
			$("#infoGrupoU").html('');
			idGrupo = null;
		}
		
	}); 
}


/********detalle cuenta*******/

function showDetalle(keyParam){
 
	 
	 var param = new Array();
	param.push({"name" : "key", "value" : 0});		 
	param.push({"name" : "keyParam", "value" : keyParam});  
	 
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  
				var df = new DecimalFormat("###,###,###.00");
					$("#medidorCuenta").val(data.aData.medidor);  
					$("#anexoCuenta").val(data.aData.anexo);  
					$("#cCostoCuenta").val(data.aData.cCosto);  
					$("#clienteCuenta").val(data.aData.cliente);  
					$("#estadoCuenta").val(data.aData.estadoMedL);  
					statusMed =data.aData.estadoMed;
					isConvenio = data.aData.isConvenio;
					$("#planCuenta").val(data.aData.plan);  
					$("#cateCuenta").val(data.aData.cate);  
					$("#subCateCuenta").val(data.aData.subCate);  
					$("#nombreCliCuenta").val(data.aData.nombreCli);  
					$("#direCuenta").val(data.aData.dire);  
					$("#fechaCuenta").val(data.aData.fecha);  
					$("#saldoCuenta").val(df.format(data.aData.saldoT));  
					$("#diaMoraCuenta").val(data.aData.diaMora);  
					$("#saldoMoraCuenta").val(df.format(data.aData.saldoMora));  
					$("#montoConveCuenta").val(df.format(data.aData.montoConve));  
					$("#abonoConveCuenta").val(df.format(data.aData.abonoConve));  
					$("#montoPenConveCuenta").val(df.format(data.aData.montoPenConve));  
					$("#cuotaConveCuenta").val(data.aData.cuotaConve);  
					$("#cuotaAboConveCuenta").val(data.aData.cuotaAboConve);  
					$("#cuotaPenConveCuenta").val(data.aData.cuotaPenConve);   
					$("#filtros-CuentaNueva").hide(); 
					$("#detalleCuenta").show(); 
					  
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

/****************Tracking**********************/

function backCuenta() {
	$("#contenido-Tracking").hide();
	$("#contenido-Grupo").hide(); 
	$("#contenido-userGrupo").hide(); 
	$("#contenido-Cuentas").show();
	idCuenta = null;
	listadoCuentas();
}

function trackingConvenio (){
	try{	
		
		if(tableConvenio !== null){
			tableConvenio.fnDestroy();
			tableConvenio = null;
		}
		
		tableConvenio =	$('#tabla_convenio').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 22}); 
	            aoData.push({"name" : "keyParam", "value" : idCuenta});
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
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait();  
	        },    
			"aoColumns": [
							{ "sWidth": "10%",  "sClass": "right",  "bSortable": false },						
							{ "sWidth": "10%", "sClass": "right",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "right",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "right",  "bSortable": true }, 
							{ "sWidth": "15%", "sClass": "right",  "bSortable": true }, 
							{ "sWidth": "15%", "sClass": "right",  "bSortable": true }, 
							{ "sWidth": "15%", "sClass": "right",  "bSortable": true }, 
							{ "sWidth": "10%", "sClass": "right",  "bSortable": true }
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

function trackingConsumo (){
	try{	
		
		if(tableConsumo !== null){
			tableConsumo.fnDestroy();
			tableConsumo = null;
		}
		
		tableConsumo =	$('#tabla_consumo').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 21}); 
	            aoData.push({"name" : "keyParam", "value" : idCuenta});
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
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait(); 
				trackingConvenio();
	        },    
			"aoColumns": [
							{ "sWidth": "20%",  "sClass": "right",  "bSortable": false },						
							{ "sWidth": "20%", "sClass": "right",  "bSortable": true },
							{ "sWidth": "20%", "sClass": "right",  "bSortable": true },
							{ "sWidth": "20%", "sClass": "right",  "bSortable": true }, 
							{ "sWidth": "20%", "sClass": "right",  "bSortable": true }
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


function showTracking(keyParam ){ 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 13});		 
	param.push({"name" : "keyParam", "value" : keyParam}); 
	
	var exito = false;
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					idCuenta = keyParam;
					 var titulo = '<div class="alert alert-info text-center" role="alert" style ="height: 125px; width: 530px;padding-top: 3px; margin: 0 auto; margin-bottom: 5px;">'
										+'<h5 style="border-bottom: 2px solid transparent;border-color: #9acfea;"><b>Centro Costo : '+data.aData.centroCosto+'</b></h5>'
										+'<div class="col-lg-12 col-md-12">'
											+'<b>Actualmente el Centro Costo pertenece al grupo: '+data.aData.grupo+'</b><br>';
											if(data.aData.fechaUpdate != "--" && data.aData.userUpdate !="--"){
												titulo+='<b>La ultima actualizacion fue realizada:'+data.aData.fechaUpdate+' por el usuario:'+data.aData.userUpdate+'</b>';
											}
											
										titulo+='</div>' 
									+'</div>'; 
									
							$("#infocuentaSelect").show().html(titulo);
					  
			}else{
				alertify.error("Error: "+data.msg ); 
				idGrupo = null;
			}
		}else{
			alertify.warning("Advertencia: "+data.msg ); 
			idGrupo = null;
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			idGrupo = null;
	 
		return false;
	}).always(function(){
		appWait.hidePleaseWait(); 
		if(exito === true){
			$("#contenido-Tracking").show();
			$("#contenido-Grupo").hide(); 
			$("#contenido-Cuentas").hide();
			trackingConsumo();
		}else{
			$("#contenido-Tracking").hide();
			$("#contenido-Grupo").hide(); 
			$("#contenido-Cuentas").show();
			idCuenta = null;
			listadoCuentas();
			
		}
	});
}

/***********cuentas*****************/

function activarCuenta(keyParam) {  
	var param = new Array();
	param.push({"name" : "key", "value" : 13});		 
	param.push({"name" : "keyParam", "value" : keyParam}); 
	
	var msjConfirm="";
	var exito = false;
	
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de activar el centro de costo no. "+data.aData.centroCosto+
								" del grupo : "+data.aData.grupo +"  ? <div>";
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
		if(exito === true){
			alertify.confirm(msjConfirm, function (e) {
				if (e) { 
 
					param = new Array();
					param.push({"name" : "key", "value" : 14});		 
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
							setTimeout(listadoCuentas(), 300); 							
						});
				  } else {
				return false;   
				}
			}); 
		} 
		
	});  
} 
 
function inactivarCuenta(keyParam) {  
	var param = new Array();
	param.push({"name" : "key", "value" : 13});		 
	param.push({"name" : "keyParam", "value" : keyParam}); 
	
	var msjConfirm="";
	var exito = false;
	
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de inactivar el centro de costo no. "+data.aData.centroCosto+
								" del grupo : "+data.aData.grupo +"  ? <div>";
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
		if(exito === true){
			alertify.confirm(msjConfirm, function (e) {
				if (e) { 
 
					param = new Array();
					param.push({"name" : "key", "value" : 15});		 
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
							setTimeout(listadoCuentas(), 300); 							
						});
				  } else {
				return false;   
				}
			}); 
		} 
		
	});  
} 


	

function generaCuenta() { 
	var medidor = $("#medidorCuenta").val();
	var anexo = 	$("#anexoCuenta").val();
	var cCosto = 	$("#cCostoCuenta").val(); 
	var cliente = 	$("#clienteCuenta").val(); 
	var plan = 	$("#planCuenta").val(); 
	var cate = 	$("#cateCuenta").val(); 
	var subCate = 	$("#subCateCuenta").val(); 
	var nombreCli = 	$("#nombreCliCuenta").val(); 
	var dire = 	$("#direCuenta").val(); 
	var fechaSaldo = 	$("#fechaCuenta").val(); 
	var saldo = 	$("#saldoCuenta").val(); 
	var diaMora = 	$("#diaMoraCuenta").val(); 
	var saldoMora = 	$("#saldoMoraCuenta").val(); 
	var montoConve = 	$("#montoConveCuenta").val(); 
	var abonoConve = 	$("#abonoConveCuenta").val(); 
	var montoPenConve = 	$("#montoPenConveCuenta").val(); 
	var cuotaConve = 	$("#cuotaConveCuenta").val(); 
	var cuotaAboConve = 	$("#cuotaAboConveCuenta").val(); 
	var cuotaPenConve = 	$("#cuotaPenConveCuenta").val(); 
	
 
 
	var param = new Array();
	param.push({"name" : "key", "value" : 12});		 
	param.push({"name" : "medidor", "value" : medidor}); 
	param.push({"name" : "anexo", "value" : anexo}); 
	param.push({"name" : "cCosto", "value" : cCosto});  
	param.push({"name" : "cliente", "value" : cliente});
	param.push({"name" : "cate", "value" : cate});
	param.push({"name" : "plan", "value" : plan});
	param.push({"name" : "subCate", "value" : subCate});
	param.push({"name" : "nombreCli", "value" : nombreCli});
	param.push({"name" : "dire", "value" : dire});
	param.push({"name" : "fechaSaldo", "value" : fechaSaldo});
	param.push({"name" : "saldo", "value" : saldo});
	param.push({"name" : "diaMora", "value" : diaMora});
	param.push({"name" : "saldoMora", "value" : saldoMora});
	param.push({"name" : "montoConve", "value" : montoConve});
	param.push({"name" : "abonoConve", "value" : abonoConve});
	param.push({"name" : "montoPenConve", "value" : montoPenConve});
	param.push({"name" : "cuotaConve", "value" : cuotaConve});
	param.push({"name" : "cuotaAboConve", "value" : cuotaAboConve});
	param.push({"name" : "statusMed", "value" : statusMed});
	param.push({"name" : "idGrupo", "value" : idGrupo});
	param.push({"name" : "cuotaPenConve", "value" : cuotaPenConve});
	param.push({"name" : "isConvenio", "value" : isConvenio});
	
	
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
			statusMed =null;
			isConvenio = null;
			setTimeout(showCuentasGrupo(idGrupo), 300);
			$("#cerrarNewC").trigger("click");  
		}); 
}

function clickExisteInfoCuenta(keyParam){
	var medidor = "";
	var centroCosto = "";
	
	if(keyParam === 'M'){
		medidor = $("#medidorBC").val();
		$("#anexoBC").val('');
		
		if(!vParam(medidor)){
			alertify.warning("Ingrese Medidor");
			return false;
		}else{
			if(!isNumber(medidor)){
				alertify.error('Medidor no valido');
				return false;
			}
		}
	}else {
		if(keyParam === 'C'){
			centroCosto = $("#anexoBC").val();
			$("#medidorBC").val('');
			
			if(!vParam(centroCosto)){
				alertify.warning("Ingrese Centro de Costo");
				return false;
			}else{
				if(!isNumber(centroCosto)){
					alertify.error('Centro de Costo no valido');
					return false;
				}
			}
		}
	}
	 
	 var param = new Array();
	param.push({"name" : "key", "value" : 11});		 
	param.push({"name" : "medidor", "value" : medidor}); 
	param.push({"name" : "centroCosto", "value" : centroCosto});
	 
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  
				var df = new DecimalFormat("###,###,###.00");
					$("#medidorCuenta").val(data.aData.medidor);  
					$("#anexoCuenta").val(data.aData.anexo);  
					$("#cCostoCuenta").val(data.aData.cCosto);  
					$("#clienteCuenta").val(data.aData.cliente);  
					$("#estadoCuenta").val(data.aData.estadoMedL);  
					statusMed =data.aData.estadoMed;
					isConvenio = data.aData.isConvenio;
					$("#planCuenta").val(data.aData.plan);  
					$("#cateCuenta").val(data.aData.cate);  
					$("#subCateCuenta").val(data.aData.subCate);  
					$("#nombreCliCuenta").val(data.aData.nombreCli);  
					$("#direCuenta").val(data.aData.dire);  
					$("#fechaCuenta").val(data.aData.fecha);  
					$("#saldoCuenta").val(df.format(data.aData.saldoT));  
					$("#diaMoraCuenta").val(data.aData.diaMora);  
					$("#saldoMoraCuenta").val(df.format(data.aData.saldoMora));  
					$("#montoConveCuenta").val(df.format(data.aData.montoConve));  
					$("#abonoConveCuenta").val(df.format(data.aData.abonoConve));  
					$("#montoPenConveCuenta").val(df.format(data.aData.montoPenConve));  
					$("#cuotaConveCuenta").val(data.aData.cuotaConve);  
					$("#cuotaAboConveCuenta").val(data.aData.cuotaAboConve);  
					$("#cuotaPenConveCuenta").val(data.aData.cuotaPenConve);   
					$("#filtros-CuentaNueva").hide(); 
					$("#detalleCuenta").show();
					$("#btngenera").show(); 
					$("#btnlimpia").show(); 
					  
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

function limpiezaCuenta() { 
	$("#filtros-CuentaNueva").show(); 
	$("#detalleCuenta").hide(); 
	$("#btngenera").show(); 
	$("#btnlimpia").show();
	$("#btngenera").hide(); 
	$("#btnlimpia").hide();
	clearChildren('div-cuentaNueva');
}



function showNewCuenta(){
	$("#showDetallNewCuenta").modal(); 
	$("#filtros-CuentaNueva").show(); 
	$("#detalleCuenta").hide(); 
	$("#btngenera").hide(); 
	$("#btnlimpia").hide();
	$("#titleCuentaDet").html('Nueva Cuenta');
	clearChildren('div-cuentaNueva');
	
}


function backGrupo(){
	$("#contenido-Grupo").show(); 
	$("#contenido-Cuentas").hide(); 
	$("#contenido-userGrupo").hide();
	$("#infocuentasTotal").html('');
	idGrupo = null;
	listadoGrupos();
}
 



 

function listadoCuentas (){
	try{	
		$("#btngenera").hide(); 
		$("#btnlimpia").hide();
		
		if(tableCuentas !== null){
			tableCuentas.fnDestroy();
			tableCuentas = null;
		}
		
		tableCuentas =	$('#tabla_cuenta').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 10}); 
	            aoData.push({"name" : "keyParam", "value" : idGrupo});
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
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait(); 
	        },    
			"aoColumns": [
								{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true }, 
							{ "sWidth": "20%", "sClass": "left",  "bSortable": true },
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




function showCuentasGrupo(keyGrupo){
	var param = [{"name": "keyParam", "value": keyGrupo},   
	              {"name": "key", "value": 5}]; 
	var exito = false;
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					idGrupo = keyGrupo;
					 var titulo = '<div class="alert alert-info text-center" role="alert" style ="height: 125px; width: 530px;padding-top: 3px; margin: 0 auto;">'
										+'<h5 style="border-bottom: 2px solid transparent;border-color: #9acfea;"><b>'+data.aData.grupo+'</b></h5>'
										+'<div class="col-lg-4 col-md-4">'
											+'<div class="col-lg-12 col-md-12"><b>Total</b></div>'
											+'<div class="col-lg-12 col-md-12 alert alert-success"><b>'+data.aData.total+'</b></div>'
										+'</div>'
										+'<div class="col-lg-4 col-md-4">'
											+'<div class="col-lg-12 col-md-12"><b>Activas</b></div>'
											+'<div class="col-lg-12 col-md-12 alert alert-info"><b>'+data.aData.activas+'</b></div>'
										+'</div>'
										+'<div class="col-lg-4 col-md-4">'
											+'<div class="col-lg-12 col-md-12"><b>Inactivas</div>'
											+'<div class="col-lg-12 col-md-12 alert alert-danger"><b>'+data.aData.inactivas+'</b></div>'
										+'</div>' 
									+'</div>'; 
									
							$("#infocuentasTotal").show().html(titulo);
					  
			}else{
				alertify.error("Error: "+data.msg ); 
				idGrupo = null;
			}
		}else{
			alertify.warning("Advertencia: "+data.msg ); 
			idGrupo = null;
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			idGrupo = null;
	 
		return false;
	}).always(function(){
		appWait.hidePleaseWait(); 
		if(exito === true){
			$("#contenido-Grupo").hide(); 
			$("#contenido-Cuentas").show();
			listadoCuentas();
		}else{
			$("#contenido-Grupo").show(); 
			$("#contenido-Cuentas").hide(); 
			$("#infocuentasTotal").html('');
			idGrupo = null;
		}
		
	}); 
}









/***********Grupos*****************/

function activarGrupo(keyParam) { 
	var param = [{"name": "keyParam", "value": keyParam},   
			  {"name": "key", "value": 5}]; 

	var msjConfirm="";
	var exito = false;
	
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Actualmente el grupo "+data.aData.grupo+
								" de Tipo: "+data.aData.tiponombre+
								" cuenta con un total de "+data.aData.total +" centro(s) de costo(s) asignado(s), esta seguro de Activarlo ? <div>";
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
		if(exito === true){
			alertify.confirm(msjConfirm, function (e) {
				if (e) { 
 
					param = new Array();
					param.push({"name" : "key", "value" : 9});		 
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
							setTimeout(listadoGrupos(), 300); 							
						});
				  } else {
				return false;   
				}
			}); 
		} 
		
	});  
} 

function inactivarGrupo(keyParam) { 
	var param = [{"name": "keyParam", "value": keyParam},   
			  {"name": "key", "value": 5}]; 

	var msjConfirm="";
	var exito = false;
	
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		 
					exito = true;
					msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Actualmente el grupo "+data.aData.grupo+
								" de Tipo: "+data.aData.tiponombre+
								" cuenta con un total de "+data.aData.total +" centro(s) de costo(s) asignado(s), esta seguro de Inactivarlo ? <div>";
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
		if(exito === true){
			alertify.confirm(msjConfirm, function (e) {
				if (e) { 
 
					param = new Array();
					param.push({"name" : "key", "value" : 8});		 
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
							setTimeout(listadoGrupos(), 300); 							
						});
				  } else {
				return false;   
				}
			}); 
		} 
		
	});  
} 


function creacionGrupoNuevo() { 
	var tipoNew = $("#tipoNew").val();
	var nombreNew = 	$("#nombreNew").val();
	var obserNew = 	$("#obserNew").val(); 
	
		
	if(!vParam(tipoNew) || tipoNew ==='0'){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, SELECCIONE TIPO DE GRUPO!");
		return false;
	} 
	
	if(!vParam(nombreNew)){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, POR FAVOR INGRESE NOMBRE DEL GRUPO!");
		return false;
	} 
	
	if(!vParam(obserNew)){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, POR FAVOR INGRESE OBSERVACIONES!");
		return false;
	} 
 
	var param = new Array();
	param.push({"name" : "key", "value" : 7});		 
	param.push({"name" : "tipo", "value" : tipoNew}); 
	param.push({"name" : "nombre", "value" : nombreNew}); 
	param.push({"name" : "obser", "value" : obserNew});  
	
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
			setTimeout(listadoGrupos(), 300);
			$("#cerrarGrupo").trigger("click");  
		}); 
}

function actualizaGrupo() { 
	var tipoNew = $("#tipoNew").val();
	var nombreNew = 	$("#nombreNew").val();
	var obserNew = 	$("#obserNew").val(); 
	
		
	if(!vParam(tipoNew) || tipoNew ==='0'){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, SELECCIONE TIPO DE GRUPO!");
		return false;
	} 
	
	if(!vParam(nombreNew)){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, POR FAVOR INGRESE NOMBRE DEL GRUPO!");
		return false;
	} 
	
	if(!vParam(obserNew)){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, POR FAVOR INGRESE OBSERVACIONES!");
		return false;
	} 
	
	if(!vParam(idGrupo)){
		alertify.warning("IMPOSIBLE REALIZAR LA SOLICITUD, ERROR AL RECUPERAR EL CORRELATIVO DE GRUPO");
		return false;
	} 
 
	var param = new Array();
	param.push({"name" : "key", "value" : 6});		 
	param.push({"name" : "tipo", "value" : tipoNew}); 
	param.push({"name" : "nombre", "value" : nombreNew}); 
	param.push({"name" : "obser", "value" : obserNew});  
	param.push({"name" : "keyParam", "value" : idGrupo});  
	
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
			setTimeout(listadoGrupos(), 300);
			$("#cerrarGrupo").trigger("click"); 
			
		}); 
}


function showNewGrupo(){
	$("#showModalNewGrupo").modal(); 
	$("#title-Grupo").html('Agregar Nuevo Grupo'); 
	$("#btnGeneraGrupo").show(); 
	$("#btnEditaGrupo").hide(); 
	
	tipoSelect = 0;
	idGrupo = null;
	llenaComboTipo();
}

function showEditGrupo(keyParam){ 
	 var param = new Array();
		param.push({"name" : "key", "value" : 5});		 
		param.push({"name" : "keyParam", "value" : keyParam}); 
		
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
				idGrupo = keyParam;
					$("#nombreNew").val(data.aData.grupo);  
					$("#obserNew").val(data.aData.observaciones); 
					tipoSelect =data.aData.tipo;
					
					$("#showModalNewGrupo").modal(); 
					$("#title-Grupo").html('Editar Grupo'); 
					$("#btnGeneraGrupo").hide(); 
					$("#btnEditaGrupo").show(); 
					  
			}else{
				alertify.error("Error: "+data.msg ); 
				 idGrupo = null;
			}
		}else{
			alertify.warning("Advertencia: "+data.msg ); 
			 idGrupo = null;
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			 idGrupo = null;
	 
		return false;
	}).always(function(){
		appWait.hidePleaseWait();
		llenaComboTipo();
	}); 
	 
}



function llenaComboTipo(){
	 $("#tipoNew").val('').trigger("liszt:updated");
	 
		$.post("./Session", {"key":4}, function(data){
			if(data.permiso){
				if(data.isSuccess){
					llenaCombo(data.formulario.comboBox, $("#tipoNew"), tipoSelect, true, true);
				}else{
					alertify.error("Error: "+data.msg );
				}
			}else{
				alertify.warning("Advertencia: "+data.msg );
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {
			logException(jqXHR, textStatus, errorThrown);
			return false;
		});

}


 

function listadoGrupos(){
	try{		
		if(tableGrupo !== null){
			tableGrupo.fnDestroy();
			tableGrupo = null;
		}
		
		tableGrupo =	$('#tabla_grupo').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 3}); 
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
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait(); 
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": true }, 
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

/******************/
 

$(document).ready(function(){	

	listadoGrupos();
	
});