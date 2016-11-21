var id = null;
var tableHL = null;
var tableHC = null;
var table2 = null;
var oTable = null;
var idTipo = null;
var tipGrafic = null;
var isSpline = null;
var rubro = null;

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
}); 

var graficConsumo = null;

var jsonDataGrafic = {
		data: []
};
 

var chartConsumo = {
		chart: {
			renderTo: 'graficaConsumo'
		},
		credits : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		title : {
			text : 'HISTORIAL DE CONSUMO'
		},		
		subtitle : {
			text : ''
		},	 
		 xAxis: {
            categories: []
        },
		yAxis: {
	        title: {
                text: 'M3'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
	    },		
		tooltip: {
	        useHTML: true,  
	        formatter: function() {        	
	            var s = "";            
	            s += "<span style='color: " + this.point.color + ";'>" + this.point.series.name + "</b></span><br />" +
	                  this.point.y + rubro + "<br />";
	            return s;
	        } 
	    },
		series : [  ]
	};



 

function generaGrafic() { 
	try{
		
		if(graficConsumo != null){
			graficConsumo.destroy();
			graficConsumo = null; 
		} 
	
		var cCosto  = $("#cCostoSeg").val();
		var anexo  = $("#tcnfolSeg").val();   
			  
		var tipologi ="M3";
		rubro ="M3";
		var tipo = 1;
		
		tipGrafic ="spline";
		isSpline = true;
		var isMT3 = true;
		var fechaIni =null;
		var fechaFin =  null;
	
		if($("#QUET").is(":checked")){  
			tipologi ="Q.";
			rubro = "Q.";
			isMT3 = false;
			isSpline = false;
		}
		
		if($("#gColumn").is(":checked")){  
			tipGrafic ="column"; 
			
		}
		
		if($("#isFechas").is(":checked")){  
			fechaIni =$("#fechaIniF").val(); 
			fechaFin = $("#fechaFinF").val();	
			tipo = 2;
		}
		 
		var subTitulo= "Medidor: "+$("#medidorSeg").val() +" | Centro Costo: "+cCosto +" | Anexo: "+$("#tcnfolSeg").val();
		   
		 var param = new Array();
		 param.push({"name": "key","value": 49}); 
		 param.push({"name" : "cCosto", "value" : cCosto});
		 param.push({"name" : "fechaIni", "value" : fechaIni});
		 param.push({"name" : "fechaFin", "value" : fechaFin});
		 param.push({"name" : "tipo", "value" : tipo});
		 param.push({"name" : "tipGrafic", "value" : tipGrafic});
		 param.push({"name" : "anexo", "value" : anexo});
		 
		
		if(graficConsumo != null){ 
			graficConsumo.showLoading(); 
			graficConsumo.showLoading('Cargando informacion del servidor...'); 
		}
		
		appWait.showPleaseWait(); 
		
		$.post("Session", param, function(data) {
			try{
				if(data.permiso){
		 			if(data.isSuccess){
		 				jsonDataGrafic = data;
		 				
						if(data.categories.length > 0){ 
							chartConsumo.subtitle.text = subTitulo;
							chartConsumo.xAxis.categories = new Array();
							chartConsumo.xAxis.categories = data.categories;
							chartConsumo.series = new Array();
							
							if(isMT3){
								chartConsumo.series = data.seriesMT;	
							}else{
								chartConsumo.series = data.seriesQ;
							} 
							
							chartConsumo.yAxis.title.text = tipologi;
							chartConsumo.series[0].type =tipGrafic;
							chartConsumo.series[1].type =tipGrafic;
							
							graficConsumo = new Highcharts.Chart(chartConsumo);
						} else {
							if(graficConsumo != null){
								graficConsumo.destroy();
								graficConsumo = null; 
							}
							
							$("#graficaConsumo").html("<div> <p class='alert bg-danger text-danger text-center'> No existe Informacion!! </p> </div>");
						} 
		 			}else{
		 				if(graficConsumo != null){
		 					graficConsumo.destroy();
		 					graficConsumo = null; 
						}
							
						$("#graficaConsumo").html("");
		 				alertify.error("Error: "+data.msg ); 
		 			}
		 		}else{
		 			if(graficConsumo != null){
		 				graficConsumo.destroy();
		 				graficConsumo = null; 
					}
						
					$("#graficaConsumo").html("");
		 			alertify.warning("Advertencia: "+data.msg ); 
		 		} 
			} catch (e) {
				appWait.hidePleaseWait(); 
				throw e;
			}	
			return true;
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
			logException(jqXHR, textStatus, errorThrown);
	 
			return false;
		}).always(function() {
	 		appWait.hidePleaseWait();  
		});
		 
	} catch (e){
		alert("Error: "+e.message);
		throw new Error(mensajeError);
	}	
	
}

function clickConsumo(tipo) {
	try{	 
		
		if(graficConsumo != null){
				graficConsumo.destroy();
				graficConsumo = null; 
		} 
		
		var cCosto  = $("#cCostoSeg").val();
		var anexo  = $("#tcnfolSeg").val();  
		var fechaIni = null; 
		var fechaFin = null;
		
		$("#tcnfolC").val(anexo); 
		$("#medidorC").val($("#medidorSeg").val()); 
		$("#cCostoC").val(cCosto);
		$("#clienteC").val($("#clienteSeg").val()); 
		
			 
		$("#conte-HistorialFactu").show();
		$("#contenido-ConsultaI").hide();
			  
		var tipologi ="M3"; 
			tipGrafic ="spline";
			rubro ="M3";

		var subTitulo= "Medidor: "+$("#medidorSeg").val() +" | Centro Costo: "+cCosto +" | Anexo: "+$("#tcnfolSeg").val();
			   
		 var param = new Array();
		 param.push({"name": "key","value": 49}); 
		 param.push({"name" : "cCosto", "value" : cCosto});
		 param.push({"name" : "fechaIni", "value" : fechaIni});
		 param.push({"name" : "fechaFin", "value" : fechaFin});
		 param.push({"name" : "tipo", "value" : tipo});
		 param.push({"name" : "tipGrafic", "value" : tipGrafic});
		 param.push({"name" : "anexo", "value" : anexo});
			 
			
		if(graficConsumo != null){ 
			graficConsumo.showLoading(); 
			graficConsumo.showLoading('Cargando informacion del servidor...'); 
		}
		
		appWait.showPleaseWait(); 
			
		$.post("Session", param, function(data) {
			try{
				if(data.permiso){
		 			if(data.isSuccess){
		 				jsonDataGrafic = data;
		 				
						if(data.categories.length > 0){ 
							chartConsumo.subtitle.text = subTitulo;
							chartConsumo.xAxis.categories = new Array();
							chartConsumo.xAxis.categories = data.categories;
							chartConsumo.series = new Array();
							 
							chartConsumo.series = data.seriesMT;	 
							
							chartConsumo.yAxis.title.text = tipologi;
							chartConsumo.series[0].type =tipGrafic;
							chartConsumo.series[1].type =tipGrafic;
							
							graficConsumo = new Highcharts.Chart(chartConsumo);
						} else {
							if(graficConsumo != null){
								graficConsumo.destroy();
								graficConsumo = null; 
							}
							
							$("#graficaConsumo").html("<div> <p class='alert bg-danger text-danger text-center'> No existe Informacion!! </p> </div>");
						} 
		 			}else{
		 				if(graficConsumo != null){
		 					graficConsumo.destroy();
		 					graficConsumo = null; 
						}
							
						$("#graficaConsumo").html("");
		 				alertify.error("Error: "+data.msg ); 
		 			}
		 		}else{
		 			if(graficConsumo != null){
		 				graficConsumo.destroy();
		 				graficConsumo = null; 
					}
						
					$("#graficaConsumo").html("");
		 			alertify.warning("Advertencia: "+data.msg ); 
		 		} 
			} catch (e) {
				appWait.hidePleaseWait(); 
				throw e;
			}	
			return true;
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
			logException(jqXHR, textStatus, errorThrown);
	 
			return false;
		}).always(function() {
	 		appWait.hidePleaseWait();  
		});
			 
		} catch (e){
			alert("Error: "+e.message);
			throw new Error(mensajeError);
		}	
	}



function clickLecturas(tipo) {
try{	 
		
	
		if(tableHL !== null){
			tableHL.fnDestroy();
			tableHL = null;
		}
	 
		
		var anexo  = $("#tcnfolSeg").val(); 
		$("#tcnfolL").val(anexo); 
		$("#medidorL").val($("#medidorSeg").val()); 
		$("#cCostoL").val($("#cCostoSeg").val());
		$("#clienteL").val($("#clienteSeg").val()); 
		
		$("#conte-HistorialLEctura").show();
		 $("#contenido-ConsultaI").hide();
		
		var fechaIni = null; 
		var fechaFin = null; 
		var anuladas = 0;
		
		if($("#isFecha").is(":checked")){  
			fechaIni =$("#fechaIni").val(); 
			fechaFin = $("#fechaFin").val();	
			tipo = 2;
		}else{
			tipo =1;
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
 

function backConsulta() {
	if(tableHL !== null){
		tableHL.fnDestroy();
		tableHL = null;
	}
	
	if(tableHC !== null){
		tableHC.fnDestroy();
		tableHC = null;
	}
	
	if(graficConsumo != null){
			graficConsumo.destroy();
			graficConsumo = null; 
	}
	
	  
	clearChildren('general');
	clearChildren('generalS');
	
	 $("#conte-HistorialFactu").hide();
	 $("#conte-HistorialLEctura").hide();
	 $("#conte-HistorialFotos").hide();  
	 $("#contenido-ConsultaI").show();
	 
	 $("#conteFotos").html('');
 
	 $("#checkSi").trigger("click");
	 $("#gSpline").trigger("click");
	 $("#MTR").trigger("click");
	 $("#6Meses").trigger("click");
	 $("#isFechas").attr("checked", false);
	 $("#isFecha").attr("checked", false);
	 
	  
	  
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

function clickConsulta(cCostoDefault) { 
 
   var param = new Array();
		param.push({"name" : "key", "value" : 47});		 
		param.push({"name" : "cCosto", "value" : cCostoDefault});  
		 
		appWait.showPleaseWait(); 
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){ 
				 var df = new DecimalFormat("###,###,###.00");
						$("#medidorSeg").val(data.aData.medidorSeg);  
						$("#cCostoSeg").val(data.aData.cCostoSeg);  
						$("#tcnfolSeg").val(data.aData.tcnfolSeg);  
						$("#estadoSeg").val(data.aData.estadoSeg);
						$("#cateSeg").val(data.aData.cateSeg);	
						$("#subCateSeg").val(data.aData.subCateSeg); 
						$("#clienteSeg").val(data.aData.clienteSeg);
						$("#direInSeg").val(data.aData.direInSeg);   
						$("#direLecSeg").val(data.aData.direLecSeg);  
						$("#zonaInSeg").val(data.aData.zonaInSeg);  
						$("#zonaLecSeg").val(data.aData.zonaLecSeg);  
						$("#bloqueSeg").val(data.aData.bloqueSeg);  
						$("#planSeg").val(data.aData.planSeg);  
						$("#ulMesFac").val(data.aData.ulMesFac);  
						$("#ulFactNumero").val( data.aData.ulFactNumero );   
						$("#montoUltimaFac").val("Q. "+df.format(data.aData.montoUltimaFac)); 
						$("#fechaUltimaFac").val( data.aData.fechaUltimaFac );  
						$("#diaMoraSeg").val( data.aData.diaMoraSeg );  
						$("#venceFacBanco").val( data.aData.venceFacBanco );  
						$("#venceFacCaja").val( data.aData.venceFacCaja );   
						$("#saldoTSeg").val("Q. "+df.format(data.aData.saldoTSeg));  
						$("#saldoXVeSeg").val("Q. "+df.format(data.aData.saldoXVeSeg));  
						$("#saldoVSeg").val("Q. "+df.format(data.aData.saldoVSeg));   
						$("#saldoConSeg").val("Q. "+df.format(data.aData.saldoConSeg));    
						$("#saldoFncSeg").val("Q. "+df.format(data.aData.saldoFncSeg)); 
						$("#saldoFncFinSeg").val("Q. "+df.format(data.aData.saldoFncFinSeg));    
						
						if(data.aData.diaMoraSeg !== 0){
							$("#diaMoraSeg").css('color', '#FFFFFF');
							$("#diaMoraSeg").css('font-weight', 'bold');
							$("#diaMoraSeg").css('font-size', '20px');
							$("#diaMoraSeg").css('background-color', 'rgb(195, 50, 46)');
							 
						}else{
							$("#diaMoraSeg").css('color', 'rgba(218, 206, 118, 1)'); 
							$("#diaMoraSeg").css('font-size', '14px');
							$("#diaMoraSeg").css('background-color', 'rgba(216, 231, 117, 0.27)');
						}
						
						if(data.aData.saldoVSeg !== 0  ){  
							$("#saldoVSeg").css('color', '#FFFFFF');
							$("#saldoVSeg").css('font-weight', 'bold');
							$("#saldoVSeg").css('font-size', '20px');
							$("#saldoVSeg").css('background-color', 'rgb(195, 50, 46)');
						}else{ 
							$("#saldoVSeg").css('color', 'rgba(218, 206, 118, 1)'); 
							$("#saldoVSeg").css('font-size', '14px');
							$("#saldoVSeg").css('background-color', 'rgba(216, 231, 117, 0.27)');
						}
					
					 $("#div-Contenido").show(); 
					  
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

function clickFoto(){ 
	 
	var anio = "0";
	
	if($("#12Meses").is(":checked")){  
		 
		anio = 1;
	}
	
	
	var param = new Array();
	param.push({"name" : "key", "value" : 56});
	param.push({"name" : "anio", "value" : anio});		
	param.push({"name" : "medidor", "value" : $("#medidorSeg").val() });
	
	appWait.showPleaseWait();
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
				$("#tcnfolF").val($("#tcnfolSeg").val()); 
				$("#medidorF").val($("#medidorSeg").val()); 
				$("#cCostoF").val($("#cCostoSeg").val());
				$("#clienteF").val($("#clienteSeg").val()); 
				
				if(data.aaData.fotosList.length>0){
					 var vhtml ='<ul > '; 
					 
					$.each(data.aaData.fotosList, function(index, el) { 
				 	vhtml +='<li class ="col-md-2  conte-Fotos" >'+
									'<div id="wrap" style="top:0px;z-index:9999;position:relative;">'+
								    	'<a rev="group1" rel="zoomHeight:200, zoomWidth:400, adjustX: 10, adjustY:-4, position:\'body\'" '+ 
											'class="cloud-zoom" href="image/jpeg;base64,'+el.foto +'">'+ 
								    		'<img src="data:image/jpeg;base64,'+el.foto +'" alt="Fotografia"   height="200px" style="margin: 0 auto; display: block;">'+
								    		'<div class="mousetrap" style="z-index: 999; position: absolute; width: 910px; height: 907px; left: 0px; top: 0px; cursor: move; background-image: ;"></div>'+
								    	'</a>'+ 
								    '</div>'+ 
								'</li>';
					});
					
					
					
				 vhtml += '</ul>';
					
					
				} else{ 
					 var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
						+'</div>'; 
					 
					 $("#conteFotos").html(titulo);
					  
				}
				
				 $("#conte-HistorialFotos").show();  
				 $("#contenido-ConsultaI").hide();
				 
			}else{
				alertify.error("Error: "+data.msg ); 
				 $("#conte-HistorialFotos").hide();  
				 $("#contenido-ConsultaI").show();
			}
		}else{
			alertify.warning("Advertencia: "+data.msg ); 
			 $("#conte-HistorialFotos").hide();  
			 $("#contenido-ConsultaI").show();
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown);
			 $("#conte-HistorialFotos").hide();  
			 $("#contenido-ConsultaI").show();
		return false;
	}).always(function(){
		appWait.hidePleaseWait(); 
		setTimeout(function(){initZoom();}, 300);
	}); 
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
	    
	    $('#fechaIniF').val(endDate);
	    $('#fechaIniF').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	 $('#fechaFinF').val(startDate);
	    $('#fechaFinF').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
		

		
	    var cCosto = $("#cCostoDefault").val();
		
		if(cCosto !== 'null'  && cCosto !== 'undefined'  && cCosto !== null  && cCosto !== undefined  && cCosto !== ''){ 
			 setTimeout(function(){clickConsulta(cCosto);}, 300);
			
		}else{
			alertify.error('Error al recuperar el centro de costo');
			setTimeout(function(){clickReturn();}, 300);
			
		}
});