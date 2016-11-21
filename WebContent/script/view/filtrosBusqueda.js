var tableFiltro = null;
var filtroId = null; 
var optI = 'option[value="';
var optF = '"]'; 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

 
 
function clickButton(accion) {  
	var fuentes = $("#fuente").val();
	var zona  = $("#zonaBus").val();
	var bloques  = $("#bloques").val();
	var porDifMT  = $("#porDifMT").val();
	var codigo  = $("#codProblema").val();
	var nombre  = $("#nombreFiltro").val();
	
	var isCodProT = 0;
	var isTodasZona = 0;
	var denuncias = 0;
	var refichaje = 0;
	var mora = 0;
	var minDias = 0;
	var maxDias = 0;
	var minMonto = 0;
	var maxMonto = 0;
	 
	if(!vParam(nombre)){  
			noty({text: 'Ingrese nombre del filtro', type:'error', timeout:7000}); 
			return false; 
	} 
	
	if($("#isDenuncia").is(":checked")){   
		denuncias = 1;
	} 
	
	if($("#isRefichaje").is(":checked")){   
		refichaje = 1;
	}
	
	if($("#isMora").is(":checked")){   
		minDias  = $("#minDias").val();
		maxDias  = $("#maxDias").val();
		minMonto  = $("#minMonto").val();
		maxMonto  = $("#maxMonto").val();
		mora = 1;
		
		if(!vParam(minDias) ) {
			minDias = 0;
			if(!vParam(maxDias) ) {
				 noty({text: 'Debe ingresar un maximo o un minimo de dias mora para el filtro', type:'error', timeout:7000});  
					return false; 
			}
		}
		
		if(vParam(minDias) && vParam(maxDias) ){
			 if(parseInt(minDias) >= parseInt(maxDias) ){
				 noty({text: 'El minimo de Dias mora debe ser menor al maximo de dias mora', type:'error', timeout:7000});  
					return false; 
			 }
		}
		
	 
		
		if(!vParam(minMonto) ) {
			minMonto = 0;
			if(!vParam(maxMonto) ) {
				 noty({text: 'Debe ingresar un maximo o un minimo de Monto mora para el filtro', type:'error', timeout:7000});  
					return false; 
			}
		}
		
		if(vParam(minMonto) && vParam(maxMonto) ){
			 if(parseFloat(minMonto) >= parseFloat(maxMonto) ){
				 noty({text: 'El minimo de Monto mora debe ser menor al maximo de Monto mora', type:'error', timeout:7000});  
					return false; 
			 }
		}
		
	} 
	
	if(vParam(fuentes) ){
		if(denuncias == 1){
			fuentes =  fuentes+", 4";
		}
	}else{ 
		if(denuncias == 1){
			fuentes = "4";
		}else{
			if(refichaje == 1){
				fuentes = "7";
			}else{
				if(mora == 1){
					fuentes = "6";
				}
			}
		}
	}
	
	if(vParam(!fuentes) ){
		noty({text: 'seleccione fuente', type:'error', timeout:7000}); 
		return false;
	}
  	 
	 if(vParam(porDifMT) ){ 
		 porDifMT = "PORC_DIF_M3:"+porDifMT; 
	 }
 
	

	 if(!vParam(zona)  || zona == "0"){
		 noty({text: 'seleccione zona', type:'error', timeout:7000});  
			return false; 
		}else{
			if(!vParam(bloques)){  
				bloques = "";
			} 
		}
	 
	 
	if($("#isCodProT").is(":checked")){  
		codigo ="";
		isCodProT = 1;
	}
	 
	var param = new Array();
	if(accion == 2){
		
		 if(!vParam(filtroId)){
			 noty({text: 'Imposible realizar la solicitud', type:'error', timeout:7000});  
				return false; 
			}
		 
		param.push({"name" : "key", "value" : 158});
		param.push({"name" : "filtroId", "value" : filtroId});
		
	}else{
		param.push({"name" : "key", "value" : 90});
	}
	  	 
	param.push({"name" : "zona", "value" : zona});
	param.push({"name" : "fuentes", "value" : fuentes});
	param.push({"name" : "nombre", "value" : nombre});
	param.push({"name" : "isTodasZona", "value" : isTodasZona});
	param.push({"name" : "denuncia", "value" : denuncias});
	param.push({"name" : "refichaje", "value" : refichaje});
	param.push({"name" : "codigoP", "value" : codigo});
	param.push({"name" : "isCodProT", "value" : isCodProT});
	param.push({"name" : "bloque", "value" : bloques});
	param.push({"name" : "campoA", "value" : porDifMT});
	param.push({"name" : "minDias", "value" : minDias});
	param.push({"name" : "maxDias", "value" : maxDias});
	param.push({"name" : "minMonto", "value" : minMonto});
	param.push({"name" : "maxMonto", "value" : maxMonto});
	param.push({"name" : "mora", "value" : mora});
	
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){   
				noty({text: data.msg, type:'success', timeout:7000}); 
			}else{ 
				noty({text: data.msg, type:'error', timeout:7000}); 
			}
		}else{ 
			noty({text: data.msg, type:'error', timeout:7000}); 
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
		logException(jqXHR, statusTxt, errorThrown); 
		return false;
	}).always(function(){
		appWait.hidePleaseWait(); 
		buildFormBack(85);
	}); 
} 

function llenaComboCodProblema(){ 
	
	$("#codProblema").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> "; 
	
	$.post("./Session", {"key": 89}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#codProblema"), 0, false, true);
				}else{
					
					 $("#codProblema").append(noExiste);
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

function llenaComboFuentes(){ 
	
	$("#fuente").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait2();
	
	$.post("./Session", {"key": 88}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#fuente"), 0, false, true);
				}else{
					
					 $("#fuente").append(noExiste);
				}
				 
			}else{
				noty({text: data.msg, type:'error', timeout:7000}); 
			}
		}else{
			noty({text: data.msg, type:'warning', timeout:7000}); 
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait2(); 
			logException(jqXHR, statusTxt, errorThrown);
	 
		return false;
	}).always(function(){
		appWait.hidePleaseWait2(); 
	}); 
}

function llenaComboZonas(){   
 
	$("#zonaBus").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#zonaBus_chzn").remove(); 
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 155}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					 
					llenaComboPPL(data.formulario.comboBox,  $("#zonaBus"), 0, false, true);
				}else{
					
					 
					 $("#zonaBus").append(noExiste);
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


function showEditFiltroC(filtro) { 
	filtroId = null;
	var param = new Array();
	
	param.push({"name" : "key", "value" : 157});		 
	param.push({"name" : "keyParam", "value" : filtro});
	appWait.showPleaseWait();
	
	var zona = null;
	var bloq = null;
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
				filtroId = filtro; 
				$("#nombreFiltro").val(data.aData.nombre); 
				
				var lista = data.aData.fuenteInf.split(",");
				
				$("#zonaBus option[value='0']").attr('selected', false); 
				$('#zonaBus').change().trigger('liszt:updated'); 
				
				$("#zonaBus "+optI+data.aData.zonas+optF).attr('selected', true); 
				$('#zonaBus').change().trigger('liszt:updated'); 
				
				zona = data.aData.zonas;
				
				if(data.aData.camAdicional !== "0"){
					var difeMT = data.aData.camAdicional.split(":");
					$("#porDifMT").val(difeMT[1]);
				} 
				
				
				if(lista.length > 0){  
					for (var i = 0; i < lista.length; i++) { 
						$("#fuente "+optI+lista[i]+optF).attr('selected', true); 
						$('#fuente').change().trigger('liszt:updated'); 
					}
				}
				 
				if(data.aData.codProblema !== "--"){
					lista = data.aData.codProblema.split(",");
					
					if(lista.length > 0){  
						for (var i = 0; i < lista.length; i++) { 
							$("#codProblema "+optI+lista[i]+optF).attr('selected', true); 
							$('#codProblema').change().trigger('liszt:updated'); 
						}
					}
				}else if(data.aData.codProblema === "0"){
					$("#isCodProT").trigger("click").attr("checked"); 
				}
				
				if(data.aData.bloques !== "--"){
					bloq = data.aData.bloques;
					
				}
				
				if(data.aData.isDenuncias){
					$("#isDenuncia").trigger("click").attr("checked"); 
				}
				
				if(data.aData.isRefichaje){
					$("#isRefichaje").trigger("click").attr("checked"); 
				}
				
				var isMora = null;
				
				if(data.aData.MinDiasMora !== "0" || data.aData.MinDiasMora !== 0){
					$("#minDias").val(data.aData.MinDiasMora); 
					isMora = true;
				}
				 

				if(data.aData.MaxDiasMora !== "0" || data.aData.MaxDiasMora !== 0){
					$("#maxDias").val(data.aData.MaxDiasMora); 
					isMora = true;
				}
				

				if(data.aData.MinMontoMora !== "0" || data.aData.MinMontoMora !== 0){
					$("#minMonto").val(data.aData.MinMontoMora); 
					isMora = true;
				}
				

				if(data.aData.MaxMontoMora !== "0" || data.aData.MaxMontoMora !== 0){
					$("#maxMonto").val(data.aData.MaxMontoMora); 
					isMora = true;
				}
				
				if(isMora === true){
					$("#isMora").trigger("click").attr("checked"); 
				}
				 
				
				 $("#conteBtnGuardar").hide();
				 $("#filaSegunda").hide();
				 $("#conteBtnEdit").show();
				 $("#titleF").html('Editar Filtro');
					 
			}else{
				noty({text: data.msg, type:'error', timeout:7000}); 
			}
		}else{
			noty({text: data.msg, type:'warning', timeout:7000}); 
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			filtroId = null;
		return false;
	}).always(function(){
		appWait.hidePleaseWait();  
		if(zona !== null){
			$("#conteBloques").show();
			var param = new Array();
			param.push({"name" : "key", "value" : 154});		 
			param.push({"name" : "zona", "value" : zona});
			 
			var noExiste = "<option value=''>No existen Informacion</option> "; 
			  
			$("#bloques").val('').html('').trigger("liszt:updated");  
			
			$.post("./Session", param, function(data){
				if(data.permiso){
					if(data.isSuccess){
						if(data.formulario.comboBox.length>0){ 
							llenaComboPPL(data.formulario.comboBox,  $("#bloques"), 0, false, true);
						}else{ 
							
							 $("#bloques").append(noExiste);
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
				
				if(bloq != null){
					var lista2 = bloq.split(",");
					 
					if(lista2.length > 0){   
						for (var i = 0; i < lista2.length; i++) {  
							$("#bloques "+optI+lista2[i]+optF).attr('selected', true); 
							$('#bloques').change().trigger('liszt:updated'); 
						}
					}
					
					$("#conteBloques").show();
				}
			}); 
		} 
	});
}




function detalleFiltro(nTr, obj){
	var aData = tableFiltro.fnGetData( nTr ); 
				  
	var sOut = '<table  class="tableDet" >'+
				'<tr class="tableDetalle"> '+
					'<th  class="text-center" >% Diferecia en MT3</th>'+
					'<th  class="text-center" >Codigos Problema</th>'+
					'<th  class="text-center" >Bloques a Excluir</th>'+
					'<th  class="text-center" >Min Dias Mora</th>'+
					'<th  class="text-center" >Max Dias Mora</th>'+
					'<th  class="text-center" >Min Monto Mora</th>'+
					'<th  class="text-center" >Max Monto Mora</th>'+
				'</tr>';  
	
				sOut += "<tr style='font-size: 12px'>"; 
				sOut +="<td>"+aData[9]+"</td>";
				sOut +="<td>"+aData[10]+"</td>"; 
				sOut +="<td>"+aData[11]+"</td>";
				sOut +="<td>"+aData[12]+"</td>"; 
				sOut +="<td>"+aData[13]+"</td>"; 
				sOut +="<td>"+aData[14]+"</td>"; 
				sOut +="<td>"+aData[15]+"</td>"; 
				
			 
			sOut += "<tr>";   
    sOut += '</table>';
    obj.disabled = false;
   
    obj.src = "./img/signoMenos.png";		  
    tableFiltro.fnOpen( nTr, sOut, 'details' );
 
}

function filtrosList(){
	try{		
		if(tableFiltro !== null){
			tableFiltro.fnDestroy();
			tableFiltro = null;
		}
	 
		
		tableFiltro =	$('#tabla_Filtros').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 156}); 
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
	            setTimeout(function(){llenaComboFuentes();}, 300);
	            setTimeout(function(){llenaComboCodProblema();}, 300);
	            setTimeout(function(){llenaComboZonas();}, 300);
	        },    
	        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
	        	$(nRow).find("td").eq(9).hide();
	        	$(nRow).find("td").eq(10).hide();
	        	$(nRow).find("td").eq(11).hide();
	        	$(nRow).find("td").eq(12).hide(); 
	        	$(nRow).find("td").eq(13).hide(); 
	        	$(nRow).find("td").eq(14).hide(); 
	        	$(nRow).find("td").eq(15).hide(); 
	         
	            $(nRow).find("img").on("click", function(event) {
	                var nTr = $(this).parents('tr')[0];
	                if (tableFiltro.fnIsOpen(nTr)) {
	                    this.src = "./img/signoMas.png";
	                    tableFiltro.fnClose(nTr);
	                } else {
	                	detalleFiltro(nTr, this);
	                }
	            });
	        }, 
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "7%", "sClass": "right",  "bSortable": false },
							{ "sWidth": "7%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "8%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false }, 
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
 
 
$(document).ready(function(){	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
	
	$("[name='isDenuncia']").bootstrapSwitch();
	$("[name='isRefichaje']").bootstrapSwitch();
	$("[name='isMora']").bootstrapSwitch();
	
	$('input[name="isMora"]').on('switchChange.bootstrapSwitch', function(event, state) {
		   
		  if( state ){   
				$("#conte-Mora").show();
				
				$("#conte-Switch").removeClass('col-xs-12 col-sm-12 col-md-12');
				$("#conte-Switch").addClass('col-xs-12 col-sm-6 col-md-6');
			}else{
				$("#conte-Mora").hide();
				$("#conte-Switch").removeClass('col-xs-12 col-sm-6 col-md-6');
				$("#conte-Switch").addClass('col-xs-12 col-sm-12 col-md-12');
			}
		});
	 
	
	   $('#zonaBus').chosen().change(function () {
			var zona  = $("#zonaBus").val();
	        	
			if(vParam(zona) && zona !== "0"){
				$("#conteBloques").show();
				var param = new Array();
				param.push({"name" : "key", "value" : 154});		 
				param.push({"name" : "zona", "value" : zona});
				 
				var noExiste = "<option value=''>No existen Informacion</option> "; 
				    
				$("#bloques").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
				$("#bloques_chzn").remove();
				
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){
							if(data.formulario.comboBox.length>0){ 
								llenaComboPPL(data.formulario.comboBox,  $("#bloques"), 0, false, true);
							}else{ 
								
								 $("#bloques").append(noExiste);
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
				
			}else{
				$("#conteBloques").hide();
			}
	        	
	    });
	 
	   filtrosList();
});