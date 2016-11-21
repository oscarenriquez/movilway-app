var tableDenuncia = null;
var idDenuncia = null;
var accion = null;  
 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

 function showEditDenuncia(denuncia) { 
		idDenuncia = null;
		var param = new Array();
		
		param.push({"name" : "key", "value" : 148});		 
		param.push({"name" : "keyParam", "value" : denuncia});
		appWait.showPleaseWait();
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){ 
					idDenuncia = denuncia; 
					$("#medidor").val(data.aData.medidor);
					$("#dire").val(data.aData.direccion);
					$("#zona").val(data.aData.zona);
					$("#referencia").val(data.aData.nombreRef);
					$("#tel").val(data.aData.telefono);
					$("#email").val(data.aData.email);
					$("#obser").val(data.aData.denuncia);
					
					var optI = 'option[value="';
					var optF = '"]';

					$("#fuenteD "+optI+data.aData.fuenteId+optF).attr('selected', true); 
					$('#fuenteD').change().trigger('liszt:updated'); 
					
					$("#motivo "+optI+data.aData.motivoId+optF).attr('selected', true); 
					$('#motivo').change().trigger('liszt:updated'); 
					
					$("#origen "+optI+data.aData.origenId+optF).attr('selected', true); 
					$('#origen').change().trigger('liszt:updated'); 
					
					 $("#conte_nuevaDenuncia").show();
					 $("#ListadoDenuncias").hide();
					 $("#titleDenuncia").html('Editar Denuncia');
						
						accion = "2";
				}else{
					noty({text: data.msg, type:'error', timeout:7000}); 
				}
			}else{
				noty({text: data.msg, type:'warning', timeout:7000}); 
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
				logException(jqXHR, statusTxt, errorThrown);
				idDenuncia = null;
			return false;
		}).always(function(){
			appWait.hidePleaseWait();  
			 					
		});
}

function gestionarDenuncia() {   

	var motivo = $("#motivo").val();
	var origen = $("#origen").val();
	var fuenteD = $("#fuenteD").val();
	var medidor = $("#medidor").val();
	var referencia = $("#referencia").val();
	var dire = $("#dire").val();
	var zona = $("#zona").val();
	var tel = $("#tel").val();
	var email = $("#email").val();
	var obser = $("#obser").val(); 
	var mensaje = "";
	 
		 if(!vParam(motivo)){  
				noty({text: "Seleccione motivo", type:'error', timeout:7000}); 
				return false; 
		} 
		 
		 if(!vParam(origen)){  
			 noty({text: "Seleccione origen", type:'error', timeout:7000});  
				return false; 
		} 
	 
		 if(!vParam(fuenteD)){  
			 noty({text: "Seleccione fuente", type:'error', timeout:7000});  
				return false; 
		} 
	 
		 if(!vParam(obser)){  
				noty({text: "Por favor ingrese denuncia", type:'error', timeout:7000}); 
				return false; 
		} 
	 
		 if(vParam(email)){  
			 if(!isEmail(email)){  
					noty({text: "E-mail incorrecto", type:'error', timeout:7000}); 
					return false; 
			}  
		} 
	  
		 if(!vParam(zona)){  
				noty({text: "Ingrese Zona", type:'error', timeout:7000}); 
				return false; 
		} 
	  
	 
		var param = new Array();
		
		if(accion === "1"){
			param.push({"name" : "key", "value" : 146});	
			mensaje = "Esta seguro de crear la denuncia?";
		}else {
			
			 if(vParam(idDenuncia)){  
				 param.push({"name" : "key", "value" : 147});
					param.push({"name" : "denunciaId", "value" : idDenuncia});
			}else{
				noty({text: "Imposible realizar solicitud", type:'error', timeout:7000}); 
				return false; 
			}
			  
			 mensaje = "Esta seguro de Editar la denuncia?";
		}
			 
		param.push({"name" : "motivoId", "value" : motivo}); 
		param.push({"name" : "origenId", "value" : origen});
		param.push({"name" : "fuenteId", "value" : fuenteD}); 
		param.push({"name" : "medidor", "value" : medidor}); 
		param.push({"name" : "nombreRef", "value" : referencia}); 
		param.push({"name" : "direc", "value" : dire}); 
		param.push({"name" : "zona", "value" : zona}); 
		param.push({"name" : "telefono", "value" : tel}); 
		param.push({"name" : "email", "value" : email});
		param.push({"name" : "denuncia", "value" : obser});  
		 
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
						setTimeout(buildFormBack(141), 300); 							
					});
			  } else {
			return false;   
			}
		});
		
		 
	} 


  
function detalleDenuncia(nTr, obj){
	var aData = tableDenuncia.fnGetData( nTr ); 
				  
	var sOut = '<table  class="tableDet" >'+
				'<tr class="tableDetalle"> '+
					'<th  class="text-center" >Referencia</th>'+
					'<th  class="text-center" >zona</th>'+
					'<th  class="text-center" >Telefono</th>'+
					'<th  class="text-center" >Email</th>'+ 
					'<th  class="text-center" >Denuncia</th>'+ 
				'</tr>'; 
 
	
				sOut += "<tr style='font-size: 12px'>"; 
				sOut +="<td>"+aData[10]+"</td>"; 
				sOut +="<td>"+aData[11]+"</td>";
				sOut +="<td>"+aData[12]+"</td>";
				sOut +="<td>"+aData[13]+"</td>";
				sOut +="<td>"+aData[14]+"</td>";
				
			 
			sOut += "<tr>";   
    sOut += '</table>';
    obj.disabled = false;
   
    obj.src = "./img/signoMenos.png";		  
    tableDenuncia.fnOpen( nTr, sOut, 'details' );
 
}

function llenaComboOrigen(){ 
	 
	$("#origen").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#origen_chzn").remove();
	var noExiste = "<option value=''>No existen Informacion</option> ";
	  
	$.post("./Session", {"key": 144}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#origen"), 0, false, true);
				}else{
					
					 $("#origen").append(noExiste);
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

function llenaComboMotivo(){ 
	 
	$("#motivo").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#motivo_chzn").remove();
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	$.post("./Session", {"key": 145}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#motivo"), 0, false, true);
				}else{
					
					 $("#motivo").append(noExiste);
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

function llenaComboFuente(){ 
	 
	$("#fuenteD").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#fuenteD_chzn").remove();
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	
	$.post("./Session", {"key": 143}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#fuenteD"), 0, false, true);
				}else{
					
					 $("#fuenteD").append(noExiste);
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

function denunciasList(){
	try{		
		if(tableDenuncia !== null){
			tableDenuncia.fnDestroy();
			tableDenuncia = null;
		}
	 
		
		tableDenuncia =	$('#tabla_Denuncias').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 142}); 
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
	            setTimeout(function(){llenaComboFuente();}, 300);
	            setTimeout(function(){llenaComboMotivo();}, 300);  
	            setTimeout(function(){llenaComboOrigen();}, 300);
	        },    
	        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
	        	$(nRow).find("td").eq(10).hide();
	        	$(nRow).find("td").eq(11).hide();
	        	$(nRow).find("td").eq(12).hide(); 
	        	$(nRow).find("td").eq(13).hide();
	        	$(nRow).find("td").eq(14).hide(); 
	         
	            $(nRow).find("img").on("click", function(event) {
	                var nTr = $(this).parents('tr')[0];
	                if (tableDenuncia.fnIsOpen(nTr)) {
	                    this.src = "./img/signoMas.png";
	                    tableDenuncia.fnClose(nTr);
	                } else {
	                	detalleDenuncia(nTr, this);
	                }
	            });
	        }, 
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "20%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "center",  "bSortable": false }, 
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }
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
	 
	$("#btnNuevaDenuncia").on('click', function(){
		try{			
			$("#conte_nuevaDenuncia").show();
			$("#ListadoDenuncias").hide();
			$("#titleDenuncia").html('Crear Denuncia');
			
			accion = "1";  
										
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnReturn").on('click', function(){
		try{			
			buildFormBack(141);
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	 
	 
	 
	denunciasList();  
	
	 
});