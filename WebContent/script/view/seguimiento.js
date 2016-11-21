var id = null;
var table = null;
var table2 = null;
var oTable = null;
var idTipo = null;
var cabecera = null;
var tableHL = null;
var oTableRev = null;
var oTableLeva = null;
var oTableCorteSig = null;
var oTableLect = null;
var oTableCortesSTC = null;
var oTableEstado = null;
var oTableFncs= null;
var oTableConvenios= null;
var oTableRobo= null;
var oTableSaldoRubro= null;
var oTableNotasAbono= null;
var oTableSaldoRubroDet= null;
var tablaBusquedaGeneral = null;
var oTableHistAnalisis = null;

var paramCampaReturn = null;


/***
 * variables para analisis de casos
 */

var cMedidor= null;
var cEstrategia  = null;
var cIdEstrategia = null;
var cFecha = null;
var cInfoMed = null;
var cDire = null;
var oTableDenunciasCaso = null;
var oTableFichajeCaso = null;

/********
 *Variables para cancelacion de peticiones 
 * ********/

var _this = this;
_this.isLoadFoto = false;
_this.jqXHRFoto = null;
_this.isLoadFicha = false;
_this.jqXHRFicha = null;
_this.isLoadConsultaInte = false;
_this.jqXHRConsultaInte = null;
_this.isLoadConsultaLectura = false;
_this.jqXHRConsultaLectura = null;
_this.isLoadConsumo = false;
_this.jqXHRConsumo = null;
_this.isLoadConvenios = false;
_this.jqXHRFConvenios = null;
_this.isLoadRevision = false;
_this.jqXHRRevision = null;
_this.isLoadLevantamiento = false;
_this.jqXHRLevantamiento = null;
_this.isLoadCortesSig = false;
_this.jqXHRCortesSig = null;
_this.isLoadLecturas = false;
_this.jqXHRLecturas = null;
_this.isLoadCortesSTC = false;
_this.jqXHRCortesSTC = null;
_this.isLoadEstadoCuenta = false;
_this.jqXHREstadoCuenta = null;
_this.isLoadRobo = false;
_this.jqXHRRobo = null;
_this.isLoadDeuda = false;
_this.jqXHRDeuda = null;
_this.isLoadSaldoRubro = false;
_this.jqXHRSaldoRubro = null;
_this.isLoadNotasAbono = false;
_this.jqXHRNotasAbono = null;

_this.isLoadSalRubroDet = false;
_this.jqXHRSalRubroDet = null;

_this.isLoadEnviaNoti = false;
_this.jqXHREnviaNoti = null;

_this.isLoadDetCortesSig = false;
_this.jqXHRDetCortesSig = null;
_this.isLoadDetLevantamiento = false;
_this.jqXHRDetLevantamiento = null;

_this.jqXHRHistAnalisis= null;
_this.isLoadHistAnalisis = false;

var graficConsumo = null;
var rubro = null;
var tipGrafic = null;
var jsonDataGrafic = {
		data: []
};


/********variables de permisos para menu*******/

var isConsultaIntegral= null;
var isRevision= null;
var isLevantamiento= null;
var isCortesSig= null;
var isLecturas= null;
var isEstadoCuenta= null;
var isFicha= null;
var isCortesSTC= null;
var isNotificaSeguimiento= null;
var isRoboYFraude= null; 
var isHistoricoAnalisis = null;

var dosMinutos = 360000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});


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



/***
 * 
 * Analisis de casos
 * 
 */

/***********ficha*********/

function detalleAnalisis(nTr, obj){
	var aData = oTableHistAnalisis.fnGetData( nTr ); 
				  
	var sOut = 
		'<table  class="tableDet" >'+
		'<tr class="tableDetalle"> '+ 
					'<th  class="text-center" >Observaciones Analisis</th>'+
					'<th  class="text-center" >Observaciones Cierre de Caso</th>'+ 
				'</tr>';  
	
				sOut += "<tr style='font-size: 12px; background-color: rgba(147, 197, 236, 0.33); border: #486586 double;'>";
				sOut +="<td>"+aData[7]+"</td>"; 
				sOut +="<td>"+aData[8]+"</td>";
			 
			sOut += "<tr>";   
    sOut += '</table>';
    obj.disabled = false;
   
    obj.src = "./img/signoMenos.png";		  
    oTableHistAnalisis.fnOpen( nTr, sOut, 'details' );
 
}

function historicoAnalisisInit() {
	
	if(isHistoricoAnalisis != null && isHistoricoAnalisis === true){
		
	
	if(oTableHistAnalisis !== null){
		oTableHistAnalisis.fnDestroy(); 
		oTableHistAnalisis = null;
	}
 
	var medidor  = $("#medidorSeg").val();
	
	if(medidor !== null && medidor !== undefined){  
	 
		oTableHistAnalisis =	$('#tabla_analisis').dataTable({  
			"bProcessing": true,  
		    "bServerSide": true,
		    "bJQueryUI": true,
		    "bDestroy": true, 
		    "bAutoWidth": false, 
		    "sPaginationType": "full_numbers",
		    "sAjaxSource": "Session",
		    "aaSorting": [[1, 'desc']],
		    "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		        aoData.push({"name": "key","value": 140}); 
		        aoData.push({"name" : "medidor", "value" : medidor}); 
		   
		        if(_this.jqXHRHistAnalisis && _this.jqXHRHistAnalisis != null){
		    		_this.jqXHRHistAnalisis.abort(); 
		    		_this.jqXHRHistAnalisis = null;
		    		_this.isLoadHistAnalisis = false;
		    	}
		    	
		        _this.isLoadHistAnalisis = true;
		    	
		        _this.jqXHRHistAnalisis =  $.ajax({
		            "dataType": 'json',
		            "type": "POST",
		            "url": sSource,
		            "data": aoData,
		            "success": function(oaData) { 
		            	fnCallback(oaData); 
		            	
		            	if(oaData.permiso){
		        			if(oaData.isSuccess){ 
							}else{ 
								 appWait.hidePleaseWait();
								 $("#optionAnalisis").html("<span class='glyphicon glyphicon-folder-close'></span> Analisis");
		        			}	
		        		}else{
		        			alertify.warning(oaData.msg);
		        		}
		        			 
		            },
		            "error": function(jqXHR, textStatus, errorThrown) { 
		                if (textStatus !== "abort") { 
		                    alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                }  
		                _this.isLoadHistAnalisis = false;
		                $("#optionAnalisis").html("<span class='glyphicon glyphicon-folder-close'></span> Analisis");
		            }
		        });
		    },
		    "fnInitComplete": function(a, json) {  
		        $("#tabla_analisis_length select").css('color','#000000'); 
		        $(".dataTables_processing").hide(); 
		  		 $(".dataTables_filter").hide(); 
		  		_this.isLoadHistAnalisis = false;
		  		 $("#optionAnalisis").html("<span class='glyphicon glyphicon-folder-close'></span> Analisis");
		    }, 
		    "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
	        	$(nRow).find("td").eq(7).hide();
	        	$(nRow).find("td").eq(8).hide(); 
	         
	            $(nRow).find("img").on("click", function(event) {
	                var nTr = $(this).parents('tr')[0];
	                if (oTableHistAnalisis.fnIsOpen(nTr)) {
	                    this.src = "./img/signoMas.png";
	                    oTableHistAnalisis.fnClose(nTr);
	                } else {
	                	detalleAnalisis(nTr, this);
	                }
	            });
	        }, 
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "center",  "bSortable": false },
							{ "sWidth": "15%",  "sClass": "center",  "bSortable": false },	
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },   
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }
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
	
	}
}


function clickAnalisis() { 
	if(isHistoricoAnalisis != null && isHistoricoAnalisis === true){
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Historico Analsis"});  
	   
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#conte-SeguimientoGeneral").hide();
					 $("#conte-histoAnalisis").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
	}else{
		 $("#optionAnalisis").parent("li").hide(); 
		}
}



function casoNoProcedeShow() {
	try{		
		 
		$("#showModalNoProcede").modal('show');
		$("#descEstrategia").val(cEstrategia);
		$("#medEstrategia").val(cMedidor);
		$("#obserEstrategia").val('').html(''); 
		
		$("#motTrabajoN").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
		$("#motTrabajoN_chzn").remove();
		
		var noExiste = "<option value=''>No existen Informacion</option> ";
		 var param = new Array();
				param.push({"name" : "key", "value" : 136});		 
				param.push({"name" : "tipo", "value" :"N"});
				
		appWait.showPleaseWait();
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){
					if(data.formulario.comboBox.length>0){ 
						llenaComboPPL(data.formulario.comboBox,  $("#motTrabajoN"), 0, false, true);
					}else{
						
						 $("#motTrabajoN").append(noExiste);
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
		 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}

function casoNoProcedeEjecucion() {
	try{			 
		 
		var obser = $("#obserEstrategia").val();
		var motTrabajo = $("#motTrabajoN").val();
		 
		
		if(!vParam(motTrabajo) || motTrabajo === '0'){ 
			noty({text: "Por favor seleccione motivo!", type:'warning', timeout:7000});
			return false;
		} 

		 var param = new Array();
			param.push({"name" : "key", "value" : 103});		 
			param.push({"name" : "obser", "value" :obser});
			param.push({"name" : "cdetalleEstrategia", "value" : cIdEstrategia});
			param.push({"name" : "cMedidor", "value" : cMedidor});
			param.push({"name" : "motivoT", "value" : motTrabajo});  
			
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de cerrar el caso del medidor  "+
		cMedidor+"  como no procede?";


		alertify.confirm(msjConfirm, function (e) {
			if (e) {  
				appWait.showPleaseWait();
				
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){ 
							appWait.hidePleaseWait(); 
							 noty({text: data.msg, type:'success', timeout:7000});
						}else{ 
							appWait.hidePleaseWait(); 
							noty({text: data.msg, type:'error', timeout:7000});
						}
					}else{ 
						appWait.hidePleaseWait(); 
						noty({text: data.msg, type:'warning', timeout:7000});
					}
				}).fail(function( jqXHR, textStatus, errorThrown ) {  
					appWait.hidePleaseWait(); 
						logException(jqXHR, statusTxt, errorThrown);
				 
					return false;
				}).always(function(){
					appWait.hidePleaseWait();  
					$("#btnCerrarNoProcede").trigger("click");   
					setTimeout(function(){buildForm(this, 87, paramCampaReturn);}, 300);  						
				});
			} else {
				return false;   
			}
		});
		 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}

function llenaComboTrabajos(){ 
	
	$("#trabajoAsig").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#trabajoAsig_chzn").remove();
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	var param = new Array();
	param.push({"name" : "key", "value" : 102});		 
	param.push({"name" : "clasifi", "value" :"O"});
	
	appWait.showPleaseWait();
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#trabajoAsig"), 0, false, true);
				}else{
					
					 $("#trabajoAsig").append(noExiste);
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
		llenaComboMotTrabajos();
	}); 
}

function llenaComboMotTrabajos(){ 
	
	$("#motTrabajo").val('').html('').removeClass("chzn-done").trigger('chosen:updated'); 
	$("#motTrabajo_chzn").remove();
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 var param = new Array();
			param.push({"name" : "key", "value" : 136});		 
			param.push({"name" : "tipo", "value" :"P"});
			
	appWait.showPleaseWait();
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#motTrabajo"), 0, false, true);
				}else{
					
					 $("#motTrabajo").append(noExiste);
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


function casoProcedeShow() {
	try{		
		 
		$("#showModalProcede").modal('show');
		$("#descEstrategiaP").val(cEstrategia);
		$("#medEstrategiaP").val(cMedidor);
		$("#obserEstrategiaP").val('').html(''); 
		llenaComboTrabajos();
		
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
}


function casoProcedeEjecucion() {
	try{
		var obser = $("#obserEstrategiaP").val();
		var trabajoAsignar = $("#trabajoAsig").val();
		var motTrabajo = $("#motTrabajo").val();
		var prioridad = 0;
		var retur = false;
		
		if(!vParam(trabajoAsignar) || trabajoAsignar === '0'){ 
			noty({text: "Por favor seleccione Trabajo!", type:'warning', timeout:7000});
			return false;
		} 


		if(!vParam(motTrabajo) || motTrabajo === '0'){ 
			noty({text: "Por favor seleccione motivo de Trabajo!", type:'warning', timeout:7000});
			return false;
		} 
		
		if($("#isPrioridad").is(":checked")){   
			prioridad = 1;
		} 
		
		 var param = new Array();
			param.push({"name" : "key", "value" : 104});		 
			param.push({"name" : "obser", "value" :obser});
			param.push({"name" : "cdetalleEstrategia", "value" : cIdEstrategia});
			param.push({"name" : "cMedidor", "value" : cMedidor});
			param.push({"name" : "trabajoAsignar", "value" : trabajoAsignar});  
			param.push({"name" : "motivoT", "value" : motTrabajo});
			param.push({"name" : "prioridad", "value" : prioridad});
			
		var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de asignar el trabajo de "+$("#trabajoAsig option:selected").text()
						+" al medidor  "+cMedidor ;


		alertify.confirm(msjConfirm, function (e) {
			if (e) {  
				appWait.showPleaseWait();
				
				$.post("./Session", param, function(data){
					if(data.permiso){
						if(data.isSuccess){ 
							 noty({text: data.msg, type:'success', timeout:7000});
							 retur = true;
						}else{ 
							if(data.existeFicha){
								retur = false;
							} 
							noty({text: data.msg, type:'warning', timeout:7000});
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
					$("#cerrarFinProcede").trigger("click");  
					 
					if(retur === true){
						setTimeout(function(){buildForm(this, 87, paramCampaReturn);}, 300);  	
					}
					
				});
			} else {
				return false;   
			}
		});
		 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}	
	
}


function casoSinMedidor() {
	 $("#conte-CasosSinMed").show();
	 $("#conte-SeguimientoGeneral").hide(); 
	 
	 $("#casoEstrategia").val(cEstrategia);
	 $("#casoFecEstrategia").val(cFecha); 
	 $("#casoMedInfo").val(cInfoMed);
	 $("#casoMedNumero").val(cMedidor);
	 $("#casodire").val(cDire);
	 
	 posiblesDenuncias();
	 
}


function posiblesDenuncias() {
	
	oTableDenunciasCaso = $('#tabla_casos').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 100});
            aoData.push({"name": "medidorCaso","value": cMedidor});
            aoData.push({"name": "direCaso","value": cDire});   
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
	        				
						}else{
							 appWait.hidePleaseWait(); 
							 
	        			}	
	        		}else{ 
	        			 appWait.hidePleaseWait();
	        			 
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait();
                    if (textStatus !== "abort") { 
                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                        noty({text: textStatus, type:'error', timeout:7000});
                    }  
                    _this.isLoadSalRubroDet = false;
                }
            });
        },
        "fnInitComplete": function(a, json) { 
        	$(".dataTables_filter").hide();  
            $(".dataTables_processing").hide(); 
            appWait.hidePleaseWait();
            posiblesEstrategias();
        }, 
		"aoColumns": [   
				{ "sWidth": "10%","sClass": "center", "bSortable": false },
				{ "sWidth": "15%","sClass": "center", "bSortable": false },  
				{ "sWidth": "15%","sClass": "left", "bSortable": false },  
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "30%","sClass": "right", "bSortable": false }
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

function posiblesEstrategias() {
	
	oTableFichajeCaso = $('#tabla_casosFichaje').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 101});
            aoData.push({"name": "medidorCaso","value": cMedidor});
            aoData.push({"name": "direCaso","value": cDire});   
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
	        				
						}else{
							 appWait.hidePleaseWait(); 
							 
	        			}	
	        		}else{ 
	        			 appWait.hidePleaseWait();
	        			 
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait();
                    if (textStatus !== "abort") { 
                        
                        noty({text: textStatusxt, type:'error', timeout:7000});
                    }  
                    _this.isLoadSalRubroDet = false;
                }
            });
        },
        "fnInitComplete": function(a, json) { 
        	$(".dataTables_filter").hide();  
            $(".dataTables_processing").hide(); 
            appWait.hidePleaseWait();   
        }, 
		"aoColumns": [   
				{ "sWidth": "15%","sClass": "center", "bSortable": false },
				{ "sWidth": "10%","sClass": "center", "bSortable": false },  
				{ "sWidth": "15%","sClass": "left", "bSortable": false },  
				{ "sWidth": "15%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "15%","sClass": "right", "bSortable": false }
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


/**
 * fin
 * 
 * **/

function generaLog(accion) {
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : accion});  
	    
		$.post("./Session", param, function(data){ 
				 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown);  
			return false;
		}).always(function(){  
			
		}); 
}


/***
 * 
 * Descarga estados de cuenta
 * *****/

function descargaReportEstado() {
 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Estado Cuenta - Descarga de Reporte"});  
	  
		 
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					var key = 82; 
					var logo2 = "LogoEMPAGUA-small.jpg";	
					var logo1 = "LOGO_2010.jpg";
					var url = "jspReportes/reporte.jsp"; 
					var reportFileName = "ESTAFACT";
					var p_tcncon = $("#cCostoSeg").val();    
					
					
					
					var abrir = window.open(url+"?key="+key+"&reportFileName="+reportFileName+"&p_tcncon="+p_tcncon+"&logo1="+logo1+"&logo2="+logo2,
							"Reporte", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=650, height=400");
					abrir.window.focus();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

 

/**
 * saldo por rubro
 * **/

function clickReturnSaldoR() {
	if(oTableSaldoRubroDet !== null){
		oTableSaldoRubroDet.fnDestroy();
		oTableSaldoRubroDet = null;
	} 
	
	$("#saldoRubroDet").hide();
	$("#saldoRubroNota").show();
	$("#saldoRubroRes").show();
	$("#cabeceradetalleRubro").html('');
	
}

function detalleSaldoRubro(nTr, obj){
	var aData = oTableSaldoRubro.fnGetData( nTr ); 
	var cCosto  = $("#cCostoSeg").val();    
	var accion = "MEDIDOR|"+$("#medidorSeg").val()+"|ACCION|Estado Cuenta - DETALLE SALDO RUBRO";
	
	if(oTableSaldoRubroDet !== null){
		oTableSaldoRubroDet.fnDestroy();
		oTableSaldoRubroDet = null;
	} 
		  
	var titulo = '<div class="alert alert-info text-center" role="alert" style ="padding-top: 3px; margin: 0 auto;">'
		+'<h5 style="    font-size: 25px;">Rubro:<b>'+aData[1]+'</b> | Descripcion:<b>'+aData[2]+
		'</b> | Total: <b>'+aData[3]+'</b> | Afectado: <b>'+aData[4]+'</b> | Saldo: <b>'+aData[5]+'</b> </h5>'
	+'</div>'; 
	
	$("#cabeceradetalleRubro").html(titulo);

	oTableSaldoRubroDet = $('#tabla_SaldoRubroDet').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 77});
            aoData.push({"name": "cCosto","value": cCosto});
            aoData.push({"name": "rubro","value": aData[1]});  
            aoData.push({"name" : "accion", "value" : accion});
            if(_this.isLoadSalRubroDet && _this.jqXHRSalRubroDet != null){
        		_this.jqXHRSalRubroDet.abort(); 
        		_this.jqXHRSalRubroDet = null;
        		_this.isLoadSalRubroDet = false;
        	}
        	_this.isLoadSalRubroDet = true;
        	_this.jqXHRSalRubroDet =  $.ajax({
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
	        				
						}else{
							 appWait.hidePleaseWait(); 
							 
	        			}	
	        		}else{ 
	        			 appWait.hidePleaseWait();
	        			 
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait();
                    if (textStatus !== "abort") { 
                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                    }  
                    _this.isLoadSalRubroDet = false;
                }
            });
        },
        "fnInitComplete": function(a, json) { 
        	$(".dataTables_filter").hide(); 
        	$("#tabla_SaldoRubroDet_length select").css('color','#000000'); 
            $(".dataTables_processing").hide();
            $("#saldoRubroDet").show();
            $("#saldoRubroNota").hide();
        	$("#saldoRubroRes").hide();
            appWait.hidePleaseWait();  
            _this.isLoadSalRubroDet = false;
        }, 
		"aoColumns": [   
				{ "sWidth": "20%","sClass": "center", "bSortable": false },
				{ "sWidth": "10%","sClass": "center", "bSortable": false },  
				{ "sWidth": "10%","sClass": "left", "bSortable": false },  
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false }, 
				{ "sWidth": "10%","sClass": "right", "bSortable": false }
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

function saldoRubroInit() { 
	 
	if(isEstadoCuenta !== null && isEstadoCuenta !== false){
	if(oTableSaldoRubro !== null){
		oTableSaldoRubro.fnDestroy();
		oTableSaldoRubro = null;
	}
	
	var cCosto  = $("#cCostoSeg").val();   
	
	$("#cbValores").addClass("ui-state-default center");
	$("#cbFechaSR").addClass("ui-state-default center");
	 
	oTableSaldoRubro = $('#tabla_SaldoRubro').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 74});
            aoData.push({"name": "cCosto","value": cCosto});  
            if(_this.isLoadSaldoRubro && _this.jqXHRSaldoRubro != null){
        		_this.jqXHRSaldoRubro.abort(); 
        		_this.jqXHRSaldoRubro = null;
        		_this.isLoadSaldoRubro = false;
        	}
        	_this.isLoadSaldoRubro = true;
        	_this.jqXHRSaldoRubro = $.ajax({
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
	        				
						}else{
							 appWait.hidePleaseWait(); 
							 
	        			}	
	        		}else{ 
	        			 appWait.hidePleaseWait();
	        			 
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait();
                    if (textStatus !== "abort") { 
                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                    }  
                    $(".dataTables_processing").hide(); 
              		 $(".dataTables_filter").hide(); 
              		_this.isLoadSaldoRubro = false; 
                  
                }
            });
        },
        "fnInitComplete": function(a, json) { 
        	$(".dataTables_filter").hide(); 
        	$("#tabla_SaldoRubro_length select").css('color','#000000'); 
            $(".dataTables_processing").hide();
            appWait.hidePleaseWait(); 
            _this.isLoadSaldoRubro = false; 
           

        },
        "fnRowCallback": function(nRow, aaData, iDisplayIndex) {  
            $(nRow).find("a").on("click", function(event) {
                var nTr = $(this).parents('tr')[0]; 
                 detalleSaldoRubro(nTr, this); 
            });
        }, 
		"aoColumns": [   
				{ "sWidth": "5%","sClass": "center", "bSortable": false },
				{ "sWidth": "15%","sClass": "center", "bSortable": false },  
				{ "sWidth": "35%","sClass": "left", "bSortable": false },  
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false }, 
				{ "sWidth": "10%","sClass": "right", "bSortable": false }
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
}

function notasAbonoInit() { 
	  
	 if(isEstadoCuenta !== null && isEstadoCuenta !== false){
	if(oTableNotasAbono !== null){
		oTableNotasAbono.fnDestroy();
		oTableNotasAbono = null;
	}
	
	var cCosto  = $("#cCostoSeg").val();   
	 
	 
	oTableNotasAbono = $('#tabla_notasAbono').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 75});
            aoData.push({"name": "cCosto","value": cCosto});  
            if(_this.isLoadNotasAbono && _this.jqXHRNotasAbono != null){
        		_this.jqXHRNotasAbono.abort(); 
        		_this.jqXHRNotasAbono = null;
        		_this.isLoadNotasAbono = false;
        	}
        	_this.isLoadNotasAbono = true;
        	_this.jqXHRNotasAbono = $.ajax({
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
	        				
						}else{
							 appWait.hidePleaseWait(); 
							 
	        			}	
	        		}else{ 
	        			 appWait.hidePleaseWait(); 
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait();
                    if (textStatus !== "abort") { 
                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                    }  
                    _this.isLoadNotasAbono = false; 
                  
                }
            });
        },
        "fnInitComplete": function(a, json) { 
        	$(".dataTables_filter").hide(); 
        	$("#tabla_notasAbono_length select").css('color','#000000'); 
            $(".dataTables_processing").hide();
            appWait.hidePleaseWait(); 
            _this.isLoadNotasAbono = false;
            $("#saldosporrubro").html("<span class='glyphicon glyphicon-dashboard'></span> Saldos Por Rubro");
          
        },    
		"aoColumns": [   
				{ "sWidth": "10%","sClass": "center", "bSortable": false },
				{ "sWidth": "10%","sClass": "center", "bSortable": false },  
				{ "sWidth": "10%","sClass": "left", "bSortable": false },  
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "20%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false }, 
				{ "sWidth": "10%","sClass": "right", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false }
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
}



/**
 * robo y fraude
 * **/

function clickRobo() {
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Robo y Fraude"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#conte-SeguimientoGeneral").hide();
					$("#conte-RoboFraude").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}


function roboInit() {
	 if(isRoboYFraude !== null && isRoboYFraude !== false){
		 if(oTableRobo !== null){
			 oTableRobo.fnDestroy();
			 oTableRobo = null;
			}
			
			var anexo  = $("#tcnfolSeg").val();
			
			oTableRobo = $('#tabla_RoboFraude').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[15, 'desc']],
		        "fnServerData": function(sSource, aoDataR, fnCallback, oSettings) {
		        	aoDataR.push({"name": "key","value": 73});
		        	aoDataR.push({"name": "anexoCon","value": anexo});  
		        	if(_this.isLoadRobo && _this.jqXHRRobo != null){
		        		_this.jqXHRRobo.abort(); 
		        		_this.jqXHRRobo = null;
		        		_this.isLoadRobo = false;
		        	}
		        	_this.isLoadRobo = true;
		        	_this.jqXHRRobo = $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoDataR,
		                "success": function(oaDataR) {
		                	fnCallback(oaDataR);
		                	 $("#optionRobo").html("<span class='glyphicon glyphicon-cog'></span> Robo Y Fraude");
		                	if(oaDataR.aaData.length == 0){
			               		 $(".dataTables_processing").hide(); 
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaDataR.permiso){
			        			if(oaDataR.isSuccess){
			        				appWait.hidePleaseWait();  
			        				
								}else{
									 appWait.hidePleaseWait(); 
									 
			        			}	
			        		}else{ 
			        			 appWait.hidePleaseWait(); 
							}
		                  
		                },
		                "error": function(jqXHR, textStatus, errorThrown) {
		                	appWait.hidePleaseWait();
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }  
		                    $("#optionRobo").html("<span class='glyphicon glyphicon-cog'></span> Robo Y Fraude"); 
		                    _this.isLoadRobo = false; 
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		        	$(".dataTables_filter").hide(); 
		        	$("#tabla_RoboFraude_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide(); 
		            _this.isLoadRobo = false; 
		            $("#optionRobo").parent("li").show(); 
		            $("#optionRobo").html("<span class='glyphicon glyphicon-cog'></span> Robo Y Fraude");
		        },  
		        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
		        	$(nRow).find("td").eq(0).addClass('hide');
		        	$(nRow).find("td").eq(6).addClass('hide');
		        	$(nRow).find("td").eq(7).addClass('hide');
		        	$(nRow).find("td").eq(8).addClass('hide');
		        	$(nRow).find("td").eq(22).addClass('hide');
		        	$(nRow).find("td").eq(23).addClass('hide');
		        	$(nRow).find("td").eq(24).addClass('hide');
		        	$(nRow).find("td").eq(25).addClass('hide');
		        	$(nRow).find("td").eq(26).addClass('hide');
		        	$(nRow).find("td").eq(27).addClass('hide');
		        	$(nRow).find("td").eq(28).addClass('hide');
		         
		            $(nRow).find("img").on("click", function(event) {
		                var nTr = $(this).parents('tr')[0];
		                if (oTableRobo.fnIsOpen(nTr)) {
		                    this.src = "./img/signoMas.png";
		                    oTableRobo.fnClose(nTr);
		                } else {
		                    detalleRobo(nTr, this);
		                }
		            });
		        }, 
				"aoColumns": [
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "3%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "3%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "3%","sClass": "right", "bSortable": false },
						{ "sWidth": "1%","sClass": "right", "bSortable": false },  
						{ "sWidth": "1%","sClass": "right", "bSortable": false },  
						{ "sWidth": "1%","sClass": "right", "bSortable": false },
						{ "sWidth": "10%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },  
						{ "sWidth": "10%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },  
						{ "sWidth": "5%","sClass": "right", "bSortable": false },  
						{ "sWidth": "5%","sClass": "right", "bSortable": false },  
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },  
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "1%","sClass": "center", "bSortable": false }
						
						
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
		}else{
			 $("#optionRobo").parent("li").hide();
		}
	 
} 


function detalleRobo(nTr, obj){
	var aData = oTableRobo.fnGetData( nTr ); 
				  
	var sOut = '<table  class="tableDet" >'+
				'<tr class="tableDetalle"> '+
					'<th  class="text-center" >Cliente</th>'+
					'<th  class="text-center" >Direccion</th>'+
					'<th  class="text-center" >Zona</th>'+
					'<th  class="text-center" style="width: 400px;" >Observaciones</th>'+
					'<th  class="text-center" >Nombre</th>'+
					'<th  class="text-center" >Puesto</th>'+
					'<th  class="text-center" >telefono</th>'+
					'<th  class="text-center" >Celular</th>'+
					'<th  class="text-center" >Instalacion</th>'+
					'<th  class="text-center" >Entidad</th>'+
					'<th  class="text-center" >Descuento</th>'+ 
				'</tr>'; 
 
	
				sOut += "<tr style='font-size: 15px'>";
				sOut +="<td>"+aData[7]+"</td>";
				sOut +="<td>"+aData[8]+"</td>"; 
				sOut +="<td>"+aData[6]+"</td>"; 
				sOut +="<td>"+aData[0]+"</td>";
				sOut +="<td>"+aData[22]+"</td>"; 
				sOut +="<td>"+aData[23]+"</td>"; 
				sOut +="<td>"+aData[24]+"</td>"; 
				sOut +="<td>"+aData[25]+"</td>"; 
				sOut +="<td>"+aData[26]+"</td>"; 
				sOut +="<td>"+aData[27]+"</td>"; 
				sOut +="<td>"+aData[28]+"</td>"; 
			sOut += "<tr>";   
    sOut += '</table>';
    obj.disabled = false;
   
    obj.src = "./img/signoMenos.png";		  
    oTableRobo.fnOpen( nTr, sOut, 'details' );
 
    generaLog('Robo y Fraude - Detalle');
}



/**********Envio de Notificaciones********/

function clickCINotificaShow() {
	 
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Consulta Integral - Notificar"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#contenido-ConsultaI").hide();
					 $("#conte-notificaSeg").show(); 
					 $("#obserNotifica").val('');
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

function clickEnviaNoti() {
	var obser  = $("#obserNotifica").val();
	var anexo  = $("#tcnfolSeg").val();
	var medidor  = $("#medidorSeg").val();
	var cCosto  = $("#cCostoSeg").val();
	var cliente  = $("#clienteSeg").val();
	
	if(!vParam(obser)){
		alertify.warning("Por favor ingrese observaciones!");
		return false;
	} 
	
	if(!vParam(anexo)){
		alertify.warning("Error al recuperar anexo!");
		return false;
	} 
	
	if(!vParam(medidor)){
		alertify.warning("Error al recuperar medidor!");
		return false;
	} 
 
	var param = new Array();
	param.push({"name" : "key", "value" : 71});		 
	param.push({"name" : "obserNoti", "value" : obser}); 
	param.push({"name" : "anexoNoti", "value" : anexo}); 
	param.push({"name" : "medidorNoti", "value" : medidor});
	param.push({"name" : "cCostoNoti", "value" : cCosto});
	param.push({"name" : "clienteNoti", "value" : cliente});
	
	appWait.showPleaseWait();
	
	if(_this.isLoadEnviaNoti && _this.jqXHREnviaNoti != null){
		_this.jqXHREnviaNoti.abort(); 
		_this.jqXHREnviaNoti = null;
		_this.isLoadEnviaNoti = false;
	}
	
	_this.isLoadEnviaNoti = true;
	_this.jqXHREnviaNoti = $.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){
					 alertify.success(data.msg+" !!");
				}else{
					alertify.warning("Error: "+data.msg ); 
				}
			}else{
				alertify.warning("Advertencia: "+data.msg ); 
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
			_this.isLoadEnviaNoti = false;
		 
			return false;
		}).always(function(){
			_this.isLoadEnviaNoti = false;
			appWait.hidePleaseWait();   
			$("#btnCancelNotifica").trigger("click");  
		}); 
	
}

function clickReturn() {
	
	if(_this.isLoadFoto && _this.jqXHRFoto != null){
		_this.jqXHRFoto.abort(); 
	}
	
	if(_this.isLoadFicha && _this.jqXHRFicha != null){
		_this.jqXHRFicha.abort(); 
	}
	

	if(_this.isLoadHistAnalisis && _this.jqXHRHistAnalisis != null){
		_this.jqXHRHistAnalisis.abort(); 
	}
	
	
	if(_this.isLoadConsultaInte && _this.jqXHRConsultaInte != null){
		_this.jqXHRConsultaInte.abort(); 
	}
	
	
	if(_this.isLoadConsultaLectura && _this.jqXHRConsultaLectura != null){
		_this.jqXHRConsultaLectura.abort(); 
	}
	
	
	if(_this.isLoadConsumo && _this.jqXHRConsumo != null){
		_this.jqXHRConsumo.abort(); 
	}
	
	
	if(_this.isLoadConvenios && _this.jqXHRFConvenios != null){
		_this.jqXHRFConvenios.abort(); 
	}
	
	
	if(_this.isLoadRevision && _this.jqXHRRevision != null){
		_this.jqXHRRevision.abort(); 
	}
	
	
	if(_this.isLoadLevantamiento && _this.jqXHRLevantamiento != null){
		_this.jqXHRLevantamiento.abort(); 
	}
	
	
	if(_this.isLoadCortesSig && _this.jqXHRCortesSig != null){
		_this.jqXHRCortesSig.abort(); 
	}

	
	if(_this.isLoadLecturas && _this.jqXHRLecturas != null){
		_this.jqXHRLecturas.abort(); 
	}
	
	if(_this.isLoadCortesSTC && _this.jqXHRCortesSTC != null){
		_this.jqXHRCortesSTC.abort(); 
	}
	
	if(_this.isLoadEstadoCuenta && _this.jqXHREstadoCuenta != null){
		_this.jqXHREstadoCuenta.abort(); 
	}
	
	if(_this.isLoadRobo && _this.jqXHRRobo != null){
		_this.jqXHRRobo.abort(); 
	}
	
	if(_this.isLoadDeuda && _this.jqXHRDeuda != null){
		_this.jqXHRDeuda.abort(); 
	}
	 
	if(_this.isLoadSaldoRubro && _this.jqXHRSaldoRubro != null){
		_this.jqXHRSaldoRubro.abort(); 
	}
	 
	if(_this.isLoadNotasAbono && _this.jqXHRNotasAbono != null){
		_this.jqXHRNotasAbono.abort(); 
	}
	
	if(_this.isLoadSalRubroDet && _this.jqXHRSalRubroDet != null){
		_this.jqXHRSalRubroDet.abort();  
	}
	
	if(_this.isLoadEnviaNoti && _this.jqXHREnviaNoti != null){
		_this.jqXHREnviaNoti.abort();  
	}
	

	 if(_this.isLoadDetCortesSig && _this.jqXHRDetCortesSig != null){
			_this.jqXHRDetCortesSig.abort();  
		}
		
		if(_this.isLoadDetLevantamiento && _this.jqXHRDetLevantamiento != null){
			_this.jqXHRDetLevantamiento.abort();  
		}
	
	buildForm(this,43,0); 
}


 
/*******ESTADO CUENTA********/

function clickEstadoC() {
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Estado Cuenta"});  
	   
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#conte-SeguimientoGeneral").hide();
					 $("#conte-EstCuenta").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

function clickReloadEstado() {
	  
	 
		 if(oTableEstado !== null){
				oTableEstado.fnDestroy();
				oTableEstado = null;
			}
			
			var cCosto  = $("#cCostoSeg").val();
			var isTodos  = 0;
			
			if($("#istodosD").is(":checked")){   	 
				isTodos = 1; 
			}
			
			oTableEstado = $('#tabla_EstadoC').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[1, 'desc']],
		        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		            aoData.push({"name": "key","value": 65});
		            aoData.push({"name": "cCosto","value": cCosto});
		            aoData.push({"name": "isTodosDocu","value": isTodos});  
		            if(_this.isLoadEstadoCuenta && _this.jqXHREstadoCuenta != null){
		        		_this.jqXHREstadoCuenta.abort(); 
		        		_this.jqXHREstadoCuenta = null;
		        		_this.isLoadEstadoCuenta = false;
		        	}
		            
		        	_this.isLoadEstadoCuenta = true;
		        	_this.jqXHREstadoCuenta = $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoData,
		                "success": function(oaDataEs) {
		                	fnCallback(oaDataEs);
		                	if(oaDataEs.aaData.length == 0){
			               		 $(".dataTables_processing").hide(); 
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaDataEs.permiso){
			        			if(oaDataEs.isSuccess){
			        				appWait.hidePleaseWait(); 
			        				
								}else{
									 appWait.hidePleaseWait(); 
			        			}	
			        		}else{
			        			alertify.warning(oaDataEs.msg);
			        			 appWait.hidePleaseWait(); 
							}
		                  
		                },
		                "error": function(jqXHR, textStatus, errorThrown) {
		                	appWait.hidePleaseWait();
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }   
		                    _this.isLoadEstadoCuenta = false;
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		        	$(".dataTables_filter").hide(); 
		        	$("#tabla_EstadoC_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide();
		            appWait.hidePleaseWait();
		            $("#optionEstadoC").show(); 
		            _this.isLoadEstadoCuenta = false;
		        },   
				"aoColumns": [  
						{ "sWidth": "3%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "4%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },
						{ "sWidth": "2%","sClass": "right", "bSortable": false },   
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "2%","sClass": "center", "bSortable": false }
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


/*******Cortes STC********/

function clickCortesSTC() {
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Cortes STC"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#conte-SeguimientoGeneral").hide();
					 $("#conte-CortesSTC").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}


/*******Lecturas*****/

function clickLecturas() {
	
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Historial Lecturas"});  
	  
		 
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#conte-SeguimientoGeneral").hide();
					 $("#conte-LEctura").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

function clickReloadLecturas() {
	try{	 
		
		
		if(oTableLect !== null){
			oTableLect.fnDestroy();
			oTableLect = null;
		}
	 
		
		var anexo  = $("#tcnfolSeg").val();   
		
		var fechaIni = null; 
		var fechaFin = null; 
		var anuladas = 0;
		var tipo =1;
		
		if($("#isFechaLE").is(":checked")){  
			fechaIni =$("#fechaIniLE").val(); 
			fechaFin = $("#fechaFinLE").val();	
			tipo = 2;
		}else{
			tipo = 1;
		}
		
		if($("#checkSiLE").is(":checked")){   	 
			anuladas = 2;
		}
		 
		 
		oTableLect =	$('#tabla_Lecturas').dataTable({  
			"bProcessing": true,  
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true, 
	        "bAutoWidth": false, 
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[15, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 48}); 
	            aoData.push({"name" : "anexo", "value" : anexo});
	            aoData.push({"name" : "fechaIni", "value" : fechaIni});
	            aoData.push({"name" : "fechaFin", "value" : fechaFin});
	            aoData.push({"name" : "tipo", "value" : tipo});
	            aoData.push({"name" : "anuladas", "value" : anuladas});
	            if(_this.isLoadLecturas && _this.jqXHRLecturas != null){
	        		_this.jqXHRLecturas.abort(); 
	        		_this.jqXHRLecturas = null;
	        		_this.isLoadLecturas = false;
	        	}
	        	
	            _this.isLoadLecturas = true;
	        	
	        	_this.jqXHRLecturas =   $.ajax({
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
	                    _this.isLoadLecturas = false;
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait();  
	            $("#tabla_Lecturas_length select").css('color','#000000'); 
	            $(".dataTables_processing").hide(); 
          		 $(".dataTables_filter").hide(); 
          		_this.isLoadLecturas = false;
	        },    
			"aoColumns": [
							{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "15%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false }
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

/*********CORTES SIG********/

function clickCortesSig() {
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Cortes SIG"});  
	  
	 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#conte-SeguimientoGeneral").hide();
					 $("#conte-CortesSig").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}
 
function detalleCortesSig(nTr, obj){
	var aData = oTableCorteSig.fnGetData( nTr );
	var id = aData[2]; 
	var accion = "MEDIDOR|"+$("#medidorSeg").val()+"|ORDEN|"+id+"|ACCION|Detalle Cortes Sig";
	
	if(id =="" || id == null){
		alertify.warning("ERROR AL RECUPERAR EL NUMERO DE REVISION.!!");
 		return false;
	}
	 
	  var param = new Array();
		param.push({"name" : "key", "value" : 60});		  
		param.push({"name" : "idOrden", "value" : id});
		param.push({"name" : "accion", "value" : accion});  
		  
		appWait.showPleaseWait(); 
		if(_this.isLoadDetCortesSig && _this.jqXHRDetCortesSig != null){
			_this.jqXHRDetCortesSig.abort(); 
			_this.jqXHRDetCortesSig = null;
			_this.isLoadDetCortesSig = false;
		}
		
		_this.isLoadDetCortesSig = true;
		
		_this.jqXHRDetCortesSig = $.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){ 
				  
				var sOut = '<table  class="tableDet">'+
							'<tr class="tableDetalle"> '+
								'<th colspan="3" class="text-center">Corte</th>'+
								'<th colspan="2" class="text-center">Pago</th>   '+ 
								'<th colspan="2" class="text-center" >Reconexion</th>    '+
								'<th colspan="1" class="text-center">Cierre</th>    '+
								'<th colspan="3" class="text-center">Anterior</th>    '+
								'<th colspan="3" class="text-center">Actual</th>    '+
							'</tr>'+
							'<tr class="tableDetalle">'+
								'<th class="text-center">Contrata</th><th class="text-center">Fecha</th><th style="width: 300px;" class="text-center">Obser.</th>'+
								'<th class="text-center" style="width: 300px;">Obser.</th><th class="text-center">Documento</th>'+
								'<th class="text-center">Contrata</th><th class="text-center">Fecha</th>'+
								'<th class="text-center">Observaciones</th> '+
								'<th class="text-center">Fac.</th><th class="text-center">MT3</th><th class="text-center">Cat.</th>'+
								'<th class="text-center">Fac.</th><th class="text-center">MT3</th><th class="text-center">Cat.</th>'+
							'</tr>'; 
		  
						sOut += "<tr>";
							sOut +="<td>"+data.aData.contrataC+"</td>";
							sOut +="<td>"+data.aData.fechaC+"</td>";					
							sOut +="<td>"+ data.aData.obserC +"</td>";
							sOut +="<td>"+data.aData.obserP+"</td>";
							sOut +="<td>"+data.aData.docuP+"</td>";
							sOut +="<td>"+data.aData.contrataR+"</td>";
							sOut +="<td>"+data.aData.fechaR+"</td>";
							sOut +="<td>"+data.aData.obserCi+"</td>";
							sOut +="<td>"+data.aData.FacA+"</td>"; 
							sOut +="<td>"+data.aData.Mt3A+"</td>"; 
							sOut +="<td>"+data.aData.CatA+"</td>"; 
							sOut +="<td>"+data.aData.FacAc+"</td>"; 
							sOut +="<td>"+data.aData.Mt3Ac+"</td>"; 
							sOut +="<td>"+data.aData.CatAc+"</td>"; 
						sOut += "<tr>";   
			    sOut += '</table>';
			    obj.disabled = false;
			   
			    obj.src = "./img/signoMenos.png";		  
			    oTableCorteSig.fnOpen( nTr, sOut, 'details' );
					  
				}else{
					alertify.error("Error: "+data.msg );  
				} 
			}else{
				alertify.warning("Advertencia: "+data.msg );  
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
			_this.isLoadDetCortesSig = false;
		 
			return false;
		}).always(function(){
			_this.isLoadDetCortesSig = false;
			appWait.hidePleaseWait(); 
		}); 
		
}
 

/********Levantamiento******/
function clickLevantamiento() {
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Levantamiento"});  
	  
	 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#conte-SeguimientoGeneral").hide();
					 $("#conte-Levantamiento").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

function detalleLevantamiento(nTr, obj){
	var aData = oTableLeva.fnGetData( nTr );
	var id = aData[0]; 
	var accion = "MEDIDOR|"+$("#medidorSeg").val()+"|ORDEN|"+id+"|ACCION|Detalle Levantamiento";
	
	if(id =="" || id == null){
		alertify.warning("ERROR AL RECUPERAR EL NUMERO DE ORDEN.!!");
 		return false;
	}
	 
	  var param = new Array();
		param.push({"name" : "key", "value" : 54});		 
		param.push({"name" : "idOrden", "value" : id});
		param.push({"name" : "accion", "value" : accion});  
		  
		appWait.showPleaseWait(); 
		
		if(_this.isLoadDetLevantamiento && _this.jqXHRDetLevantamiento != null){
			_this.jqXHRDetLevantamiento.abort(); 
			_this.jqXHRDetLevantamiento = null;
			_this.isLoadDetLevantamiento = false;
		}
		
		_this.isLoadDetLevantamiento = true;
		_this.jqXHRDetLevantamiento = $.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){ 
				  
				var sOut = '<table  class="tableDet">'+
								'<tr class=" '+data.aData.status+'"> '+
									'<th colspan="5" class="text-center">Levantamiento</th>'+
									'<th colspan="3" class="text-center">Instalacion</th>   '+ 
									'<th class="text-center" >Sancion</th>    '+
									'<th colspan="3" class="text-center">Pago</th>    '+
								'</tr>'+
								'<tr class=" '+data.aData.status+'">'+
									'<th class="text-center">Orden</th><th class="text-center">Fecha</th><th class="text-center">RE. SP</th><th class="text-center">Resultado</th><th style="width: 300px;" class="text-center">Obser.</th>'+
									'<th class="text-center">Fecha</th class="text-center"><th class="text-center">RE. SP</th><th class="text-center">Medidor</th>'+
									'<th class="text-center">Fecha</th>'+
									'<th class="text-center">Fecha</th><th class="text-center">Usuario</th><th class="text-center">Forma Pago</th>'+
								'</tr>';
				 
						sOut += "<tr>";
							sOut +="<td>"+data.aData.Orden+"</td>";
							sOut +="<td>"+ data.aData.feLevan +"</td>";
							sOut +="<td>"+data.aData.RELevan+"</td>";
							sOut +="<td>"+data.aData.ResultadoLevan+"</td>";
							sOut +="<td>"+data.aData.ObserLevan+"</td>";
							sOut +="<td>"+data.aData.FeInsta+"</td>";
							sOut +="<td>"+data.aData.ReInsta+"</td>";
							sOut +="<td>"+data.aData.MedInsta+"</td>";
							sOut +="<td>"+data.aData.FeSansion+"</td>";
							sOut +="<td>"+data.aData.FePago+"</td>";
							sOut +="<td>"+data.aData.UserPago+"</td>";
							sOut +="<td>"+data.aData.FormaPAgo+"</td>";
						sOut += "</tr>";   
			    sOut += '</table>';
			    obj.disabled = false;
			    obj.src = "./img/signoMenos.png";		    
			    oTableLeva.fnOpen( nTr, sOut, 'details' );
					  
				}else{
					alertify.error("Error: "+data.msg );  
				}
			}else{
				alertify.warning("Advertencia: "+data.msg );  
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
			_this.isLoadDetLevantamiento = false;
		 
			return false;
		}).always(function(){
			_this.isLoadDetLevantamiento = false;
			appWait.hidePleaseWait(); 
		}); 
		
}

function verOrdenLeva(orden) {
	var key = 57; 
	var logo2 = "LogoEMPAGUA-small.jpg";	
	var url = "jspReportes/reporte.jsp"; 
	var reportFileName = "otLevantamiento";
	
	
	
	var abrir = window.open(url+"?key="+key+"&reportFileName="+reportFileName+"&p_orden="+orden+"&logo2="+logo2,
			"Reporte", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=650, height=400");
	abrir.window.focus();
}


/********Revision*********/

function clickRevision() {
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Revision"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#conte-SeguimientoGeneral").hide();
					 $("#conte-Revision").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
	 
}

function detalleRevision(nTr, obj){
	var aData = oTableRev.fnGetData( nTr );
	var id = aData[1]; 
	var accion = "MEDIDOR|"+$("#medidorSeg").val()+"|ORDEN|"+id+"|ACCION|Detalle Revision";
	
	if(id =="" || id == null){
		alertify.warning("ERROR AL RECUPERAR EL NUMERO DE REVISION.!!");
 		return false;
	}
	 
	  var param = new Array();
		param.push({"name" : "key", "value" : 52});		 
		param.push({"name" : "idRevision", "value" : id});
		param.push({"name" : "accion", "value" : accion});  
		  
		appWait.showPleaseWait(); 
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){ 
				  
				var sOut = '<table  class="tableDet">'+
					' <tr><th class="text-center">Orden</th><th class="text-center">Observaciones</th><th class="text-center">Fecha Ejecutado</th><th class="text-center">Dias</th><th class="text-center">Medidor</th>'+
					'<th class="text-center">Lectura OTV</th><th class="text-center">Medicion</th><th style="width: 250px;" class="text-center">Anotaciones</th><th class="text-center">Expediente</th><th class="text-center">Medidor Ref.</th>'+
					'<th>Causa</th><th>NRB</th><th>Fecha Pago</th></tr>'; 
		  
						sOut += "<tr>";
							sOut +="<td>"+data.aData.Orden+"</td>";
							sOut +="<td>"+data.aData.Observaciones+"</td>";					
							sOut +="<td>"+ data.aData.feEjecuta +"</td>";
							sOut +="<td>"+data.aData.Dias+"</td>";
							sOut +="<td>"+data.aData.Medidor+"</td>";
							sOut +="<td>"+data.aData.LecturaOTV+"</td>";
							sOut +="<td>"+data.aData.Medicion+"</td>";
							sOut +="<td>"+data.aData.Anotaciones+"</td>";
							sOut +="<td>"+data.aData.Expediente+"</td>";
							sOut +="<td>"+data.aData.MedRef+"</td>";
							sOut +="<td>"+data.aData.Causa+"</td>";
							sOut +="<td>"+data.aData.NRB+"</td>";
							sOut +="<td>"+data.aData.FePago+"</td>";
						sOut += "<tr>";   
			    sOut += '</table>';
			    obj.disabled = false;
			   
			    obj.src = "./img/signoMenos.png";		  
			    oTableRev.fnOpen( nTr, sOut, 'details' );
					  
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


function verOrdenRev(orden) {
	var key = 57; 
	var logo2 = "LogoEMPAGUA-small.jpg";	
	var url = "jspReportes/reporte.jsp"; 
	var reportFileName = "otRevision";
	
	
	
	var abrir = window.open(url+"?key="+key+"&reportFileName="+reportFileName+"&p_orden="+orden+"&logo2="+logo2,
			"Reporte", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=650, height=400");
	abrir.window.focus();
}


/******************retorno general para opcions de consulta integral***************/

function clickReturnCI() {
	 $("#contenido-ConsultaI").show();
	 $("#conte-HistorialLEctura").hide();
	 $("#conte-HistorialFotos").hide();
	 $("#conte-HistorialFactu").hide(); 
	 $("#conte-notificaSeg").hide();
	 $("#optionConInte").trigger("click");   
}
 

/*******consulta Inte -> fotos******/

function clickCIFotoShow() {  
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Consulta Integral - Fotografias"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#contenido-ConsultaI").hide();
					 $("#conte-HistorialFotos").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}


/*******consulta Inte -> consumos******/

function clickCIConsumosShow() {
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Consulta Integral - Historial Consumo "});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#contenido-ConsultaI").hide();
					 $("#conte-HistorialFactu").show();
					 
				 
					 
					 if(jsonDataGrafic.categories.length > 0){ 
						 if(graficConsumo != null){
								graficConsumo.destroy();
								graficConsumo = null; 
							}
						 
						 var isMT3 = true;
						 
						 var subTitulo= "Medidor: "+$("#medidorSeg").val() +" | Centro Costo: "+$("#cCostoSeg").val() +" | Anexo: "+$("#tcnfolSeg").val();
						 
						 if($("#QUET").is(":checked")){   
								isMT3 = false; 
							}
						 
							chartConsumo.subtitle.text = subTitulo;
							chartConsumo.xAxis.categories = new Array();
							chartConsumo.xAxis.categories = jsonDataGrafic.categories;
							chartConsumo.series = new Array();
							
							if(isMT3){
								chartConsumo.series = jsonDataGrafic.seriesMT;	
							}else{
								chartConsumo.series = jsonDataGrafic.seriesQ;
							} 
							
							chartConsumo.yAxis.title.text = rubro;
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
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
	
	 
}

function clickCIConsumos() {
	  
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
	
	if($("#isFechasC").is(":checked")){  
		fechaIni =$("#fechaFinC").val(); 
		fechaFin = $("#fechaFinC").val();	
		tipo = 2;
	}else{
		tipo = 1;
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
	
	 
	if(_this.isLoadConsumo && _this.jqXHRConsumo != null){
		_this.jqXHRConsumo.abort(); 
		_this.jqXHRConsumo = null;
		_this.isLoadConsumo = false;
	}
	
	_this.isLoadConsumo = true;
	
	_this.jqXHRConsumo = $.post("Session", param, function(data) {
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
	 			}
	 		}else{
	 			if(graficConsumo != null){
	 				graficConsumo.destroy();
	 				graficConsumo = null; 
				}
					
				$("#graficaConsumo").html(""); 
	 		} 
		} catch (e) {
			appWait.hidePleaseWait();
			_this.isLoadConsumo = false;
			throw e;
		}	
		return true;
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		appWait.hidePleaseWait(); 
		_this.isLoadConsumo = false;
 
		return false;
	}).always(function() {
		_this.isLoadConsumo = false;
 		appWait.hidePleaseWait();  
	});
	 
}


/************Consulta Inte -> lecturas********/

function clickCILecturasShow() {
	 
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Consulta Integral - Historial Lectura"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#contenido-ConsultaI").hide();
					 $("#conte-HistorialLEctura").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

function clickCILecturas() {
	 
	 if(tableHL !== null){
			tableHL.fnDestroy();
			tableHL = null;
		}
	 
	var anexo  = $("#tcnfolSeg").val(); 
	 
	var fechaIni = null; 
	var fechaFin = null; 
	var anuladas = 0;
	var tipo = 1;
	
	if($("#isFechaL").is(":checked")){  
		fechaIni =$("#fechaIniL").val(); 
		fechaFin = $("#fechaFinL").val();	
		tipo = 2;
	}else{
		tipo =1;
	}
	
	if($("#checkSiL").is(":checked")){   	 
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
            if(_this.isLoadConsultaLectura && _this.jqXHRConsultaLectura != null){
	    		_this.jqXHRConsultaLectura.abort(); 
	    		_this.jqXHRConsultaLectura = null;
	    		_this.isLoadConsultaLectura = false;
	    	}
	        
	    	_this.isLoadConsultaLectura = true;
	    	
	    	_this.jqXHRConsultaLectura =  $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": function(oaData1) { 
                	fnCallback(oaData1); 
                	
                	if(oaData1.permiso){
	        			if(oaData1.isSuccess){
	        				appWait.hidePleaseWait(); 
						}else{ 
							 appWait.hidePleaseWait();
	        			}	
	        		}else{
	        			alertify.warning(oaData1.msg);
	        		}
	        			 
                },
                "error": function(jqXHR, textStatus, errorThrown) { 
                    if (textStatus !== "abort") {
                    	 alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                    }  
                    _this.isLoadConsultaLectura = false;
                }
            });
        },
        "fnInitComplete": function(a, json) { 
            appWait.hidePleaseWait();  
            $("#tabla_HistorialLec_length select").css('color','#000000'); 
            $(".dataTables_processing").hide(); 
      		 $(".dataTables_filter").hide(); 
      		_this.isLoadConsultaLectura = false;
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
	
}


/************convenios**********/

 
function clickCIConveniosShow() {
	//$("#conte-Convenios").show();
	$("#contenido-ConsultaI").hide(); 
}

/************Consulta Inte********/

function clickConsultaInt() {
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Consulta Integral"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					$("#conte-SeguimientoGeneral").hide();
					$("#contenido-ConsultaI").show(); 
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}


/***********ficha*********/

function clickFicha() { 
	
	 var param = new Array();
		param.push({"name" : "key", "value" : 84});		 
		param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});
		param.push({"name" : "accion", "value" : "Ficha"});  
	  
		 
		
		$.post("./Session", param, function(data){ 
				if(data.isSuccess){  		 
					 $("#conte-SeguimientoGeneral").hide();
					 $("#panelFicha").show();
				}else{
					alertify.error("Error: "+data.msg );  
				} 
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
				logException(jqXHR, statusTxt, errorThrown); 
				appWait.hidePleaseWait(); 
			return false;
		}).always(function(){ 
			appWait.hidePleaseWait(); 
		}); 
}

/***********mapa*********/

function ShowMapa() {
	try{			
		
		 var param = new Array();
			param.push({"name" : "key", "value" : 45});		 
			param.push({"name" : "medidor", "value" : $("#medidorSeg").val()});  
		 
		generaMapa(param, "Ubicacion GPS");
		$("#mapa").modal('show');
		
	} catch (e) {
		$("#cerrarMapa").show();			
		alert(e.name+": "+e.message);
	}	
}




/********funcion general para retorno de todas las opciones******/
function clickReturnSeg() {
	 $("#conte-SeguimientoGeneral").show();
	 $("#panelFicha").hide();
	 $("#conte-histoAnalisis").hide();
	 $("#contenido-ConsultaI").hide();
	 $("#conte-HistorialLEctura").hide();
	 $("#conte-HistorialFactu").hide();
	 $("#conte-HistorialFotos").hide();
	 $("#conte-Revision").hide();
	 $("#conte-CortesSig").hide();
	 $("#conte-LEctura").hide();
	 $("#conte-CortesSTC").hide();
	 $("#conte-EstCuenta").hide(); 
	 $("#conte-Levantamiento").hide();
	 $("#conte-RoboFraude").hide();
	 $("#optionSeg").trigger("click");   
}


/***************/
/**funciones en cadena de coonsulta
/******************/

function clickFotos(){ 
	
	var anexo  = $("#tcnfolSeg").val();
	var medidor = $("#medidorSeg").val();
	
	if(anexo !== null && anexo !== undefined && medidor !== null && medidor !== undefined ){
		var anio = "0";
		
		if($("#12Meses").is(":checked")){  
			 
			anio = 1;
		}
		
		
		var param = new Array();
		param.push({"name" : "key", "value" : 56});
		param.push({"name" : "anio", "value" : anio});		
		param.push({"name" : "medidor", "value" :medidor});
		
		if(_this.isLoadFoto && _this.jqXHRFoto != null){
			_this.jqXHRFoto.abort();
			_this.jqXHRFoto = null;
			_this.isLoadFoto = false;
		}
		
		_this.isLoadFoto = true;
		_this.jqXHRFoto =	$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){  
					
					if(data.aaData.fotosList){
					
						 $("#conteFotos").html(data.divHTML);
						 $('[data-toggle="tooltip"]').tooltip(); 
					} else{ 
						 var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
								+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
							+'</div>'; 
						 
						 $("#conteFotos").html(titulo);
						  
					}
					 
					 
				} else{ 
					
					if(data.msg ==="No Existen Fotos"){
						var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
						+'</div>'; 
					 
					 $("#conteFotos").html(titulo);
					} else{
						var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>'+data.msg+' </b></h5>'
						+'</div>'; 
					 
					 $("#conteFotos").html(titulo);
					}
					 
					  
				}
			} else{
				var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
					+'<h5 ><b>'+data.msg+' </b></h5>'
				+'</div>'; 
			 
			 $("#conteFotos").html(titulo);
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			_this.isLoadFoto = false;
			appWait.hidePleaseWait();  
			return false;
		}).always(function(){
			_this.isLoadFoto = false; 
			
			 $("#consultaFotos").html("<span class='glyphicon glyphicon-camera'></span> Fotografias");
			appWait.hidePleaseWait();  
			
			var $lg = $('.lightbox');
			if ($lg[0]) {
			    $lg.lightGallery({
			        enableTouch: true,
			        onOpen: function (plugin){			        	
			    		$("#lg-action").append('<a class="text-center" data-rotate="0" id="rotate-img"><span class="glyphicon glyphicon-share-alt"></span></a>');
			    		$("#rotate-img").on("click", function(){ 
			    			var $obj = $(".lg-slide.current"); 
			    			var valueRotate = $obj.data("rotate"); 
			    			var nowRotate = 0;			        			
			    			if(valueRotate !== undefined){
			    				nowRotate = fnRotateImage($obj.find("img"), valueRotate); 
			    			} else {
			    				nowRotate = fnRotateImage($obj.find("img"), 0); 
			    			}
			    			
			    			$obj.data("rotate", nowRotate);
			    			
			    		});
			        }
			    });			        			        
			}
		}); 	
	}	
}

function deuda() { 
	 if(isEstadoCuenta !== null && isEstadoCuenta !== false){
	  
	if(oTableFncs !== null){
		oTableFncs.fnDestroy();
		oTableFncs = null;
	}
	
	var anexo  = $("#tcnfolSeg").val();
	if(anexo !== null && anexo !== undefined){ 
		$("#cbFechasF").addClass("ui-state-default center");
		$("#cbCuotas").addClass("ui-state-default center");
		 
		oTableFncs = $('#tabla_DeudaP').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 66});
	            aoData.push({"name": "anexo","value": anexo});  
	            if(_this.isLoadDeuda && _this.jqXHRDeuda != null){
	        		_this.jqXHRDeuda.abort(); 
	        		_this.jqXHRDeuda = null;
	        		_this.isLoadDeuda = false;
	        	}
	        	_this.isLoadDeuda = true;
	        	_this.jqXHRDeuda =  $.ajax({
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
		        				
							}else{
								 appWait.hidePleaseWait();  
		        			}	
		        		}else{
		        			alertify.warning(oaData.msg);
		        			 appWait.hidePleaseWait();  
						}
	                  
	                },
	                "error": function(jqXHR, textStatus, errorThrown) {
	                	appWait.hidePleaseWait();
	                    if (textStatus !== "abort") { 
	                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
	                    }   
	                    _this.isLoadDeuda = false;
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	        	$(".dataTables_filter").hide(); 
	        	$("#tabla_DeudaP_length select").css('color','#000000'); 
	            $(".dataTables_processing").hide();
	            _this.isLoadDeuda = false;
	            appWait.hidePleaseWait(); 
	        },   
			"aoColumns": [   
					{ "sWidth": "5%","sClass": "center", "bSortable": false },
					{ "sWidth": "13%","sClass": "center", "bSortable": false },  
					{ "sWidth": "14%","sClass": "center", "bSortable": false },  
					{ "sWidth": "5%","sClass": "center", "bSortable": false },
					{ "sWidth": "7%","sClass": "right", "bSortable": false },
					{ "sWidth": "5%","sClass": "right", "bSortable": false },
					{ "sWidth": "5%","sClass": "right", "bSortable": false },
					{ "sWidth": "10%","sClass": "right", "bSortable": false },  
					{ "sWidth": "10%","sClass": "center", "bSortable": false },  
					{ "sWidth": "10%","sClass": "right", "bSortable": false },
					{ "sWidth": "5%","sClass": "center", "bSortable": false },
					{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
					{ "sWidth": "5%","sClass": "center", "bSortable": false },
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
	
	 }
}
 

function estadoCuentaInit() {
	  
	 if(isEstadoCuenta !== null && isEstadoCuenta !== false){
		 if(oTableEstado !== null){
				oTableEstado.fnDestroy();
				oTableEstado = null;
			}
			
			var cCosto  = $("#cCostoSeg").val();
			
			oTableEstado = $('#tabla_EstadoC').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[1, 'desc']],
		        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		            aoData.push({"name": "key","value": 65});
		            aoData.push({"name": "cCosto","value": cCosto});
		            aoData.push({"name": "isTodosDocu","value": 0});
		            if(_this.isLoadEstadoCuenta && _this.jqXHREstadoCuenta != null){
		        		_this.jqXHREstadoCuenta.abort(); 
		        		_this.jqXHREstadoCuenta = null;
		        		_this.isLoadEstadoCuenta = false;
		        	}
		            
		        	_this.isLoadEstadoCuenta = true;
		        	_this.jqXHREstadoCuenta = $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoData,
		                "success": function(oaDataEs) {
		                	fnCallback(oaDataEs);
		                	$("#optionEstadoC").html("<span class='glyphicon glyphicon-stats'></span> Estado Cuenta");
		                	if(oaDataEs.aaData.length == 0){
			               		 $(".dataTables_processing").hide(); 
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaDataEs.permiso){
			        			if(oaDataEs.isSuccess){
			        				appWait.hidePleaseWait(); 
			        				
								}else{
									 appWait.hidePleaseWait(); 
			        			}	
			        		}else{ 
			        			 appWait.hidePleaseWait(); 
			        			 $("#optionEstadoC").parent("li").hide(); 
							}
		                  
		                },
		                "error": function(jqXHR, textStatus, errorThrown) {
		                	appWait.hidePleaseWait();
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }   
		                    _this.isLoadEstadoCuenta = false;
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		        	$(".dataTables_filter").hide(); 
		        	$("#tabla_EstadoC_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide();
		            appWait.hidePleaseWait();
		            _this.isLoadEstadoCuenta = false;
		            $("#optionEstadoC").parent("li").show(); 
		            $("#cSaldo").trigger("click");
		        },   
				"aoColumns": [  
						{ "sWidth": "3%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "4%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },
						{ "sWidth": "4%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },  
						{ "sWidth": "2%","sClass": "right", "bSortable": false },
						{ "sWidth": "2%","sClass": "right", "bSortable": false },   
						{ "sWidth": "4%","sClass": "right", "bSortable": false },
						{ "sWidth": "5%","sClass": "right", "bSortable": false },
						{ "sWidth": "2%","sClass": "center", "bSortable": false }
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
		}else{
			 $("#optionEstadoC").parent("li").hide(); 
		}
	
	
}

function cortesSTCInit() {
	
	 if(isCortesSTC !== null && isCortesSTC !== false){
		 if(oTableCortesSTC !== null){
				oTableCortesSTC.fnDestroy();
				oTableCortesSTC = null;
			}

			var anexo  = $("#tcnfolSeg").val();   
			
			$("#cbCorte").addClass("ui-state-default center");
			$("#cbPago").addClass("ui-state-default center");
			$("#cbReconexion").addClass("ui-state-default center");
			$("#cbCierre").addClass("ui-state-default center");
			$("#cbReferencia").addClass("ui-state-default center");
			$("#cbGeneral").addClass("ui-state-default center");
			
			
			oTableCortesSTC =	$('#tabla_corteSTC').dataTable({  
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
		            if(_this.isLoadCortesSTC && _this.jqXHRCortesSTC != null){
		        		_this.jqXHRCortesSTC.abort(); 
		        		_this.jqXHRCortesSTC = null;
		        		_this.isLoadCortesSTC = false;
		        	}
		            
		        	_this.isLoadCortesSTC = true;
		        	
		        	_this.jqXHRCortesSTC =  $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoData,
		                "success": function(oaDataC) { 
		                	fnCallback(oaDataC); 
		                	
		                	if(oaDataC.permiso){
			        			if(oaDataC.isSuccess){
			        				appWait.hidePleaseWait();  
								}else{ 
									 appWait.hidePleaseWait();
									  
			        			}	
			        		}else{
			        			alertify.warning(oaDataC.msg);
			        			$("#optionCStc").parent("li").hide();
			        		}
			        			 
		                },
		                "error": function(jqXHR, textStatus, errorThrown) { 
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }  
		                    $("#optionCStc").html("<span class='glyphicon glyphicon-copyright-mark'></span> Cortes STC");
		                    _this.isLoadCortesSTC = false;
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		            appWait.hidePleaseWait();  
		            $("#tabla_corteSTC_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide(); 
		      		$(".dataTables_filter").hide(); 
		      		$("#optionCStc").parent("li").show();
		      		$("#optionCStc").html("<span class='glyphicon glyphicon-copyright-mark'></span> Cortes STC");
		      		_this.isLoadCortesSTC = false;
		        },    
				"aoColumns": [
								{ "sWidth": "7%",  "sClass": "left",  "bSortable": false },						
								{ "sWidth": "7%", "sClass": "left",  "bSortable": false },
								{ "sWidth": "19%", "sClass": "left",  "bSortable": false },
								{ "sWidth": "30%", "sClass": "left",  "bSortable": false },
								{ "sWidth": "7%", "sClass": "left",  "bSortable": false }, 
								{ "sWidth": "10%", "sClass": "left",  "bSortable": false }, 
								{ "sWidth": "10%", "sClass": "left",  "bSortable": false }, 
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
		}else{
			 $("#optionCStc").parent("li").hide();
		}
	 
	
	 
}

function lecturasInit() {
	 
	 if(isLecturas !== null && isLecturas !== false){
		 try{	 
				
				
				if(oTableLect !== null){
					oTableLect.fnDestroy();
					oTableLect = null;
				}
			 
				
				var anexo  = $("#tcnfolSeg").val();   
				 
				oTableLect =	$('#tabla_Lecturas').dataTable({  
					"bProcessing": true,  
			        "bServerSide": true,
			        "bJQueryUI": true,
			        "bDestroy": true, 
			        "bAutoWidth": false, 
			        "sPaginationType": "full_numbers",
			        "sAjaxSource": "Session",
			        "aaSorting": [[15, 'desc']],
			        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
			            aoData.push({"name": "key","value": 48}); 
			            aoData.push({"name" : "anexo", "value" : anexo});
			            aoData.push({"name" : "fechaIni", "value" : null});
			            aoData.push({"name" : "fechaFin", "value" : null});
			            aoData.push({"name" : "tipo", "value" : 1});
			            aoData.push({"name" : "anuladas", "value" : 0});
			            if(_this.isLoadLecturas && _this.jqXHRLecturas != null){
			        		_this.jqXHRLecturas.abort(); 
			        		_this.jqXHRLecturas = null;
			        		_this.isLoadLecturas = false;
			        	}
			        	
			            _this.isLoadLecturas = true;
			        	
			        	_this.jqXHRLecturas = $.ajax({
			                "dataType": 'json',
			                "type": "POST",
			                "url": sSource,
			                "data": aoData,
			                "success": function(oaDataLe) { 
			                	fnCallback(oaDataLe); 	                	
			                	if(oaDataLe.permiso){
				        			if(oaDataLe.isSuccess){
				        				appWait.hidePleaseWait();  
									}else{ 
										 appWait.hidePleaseWait();
				        			}	
				        		}else{
				        			alertify.warning(oaDataLe.msg);
				        			$("#optionLecturas").parent("li").hide();
				        		}
				        			 
			                },
			                "error": function(jqXHR, textStatus, errorThrown) { 
			                    if (textStatus !== "abort") { 
			                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
			                    }
			                    $("#optionLecturas").html("<span class='glyphicon glyphicon-sound-6-1'></span> Lecturas");
			                    _this.isLoadLecturas = false;
			                }  
			            });
			        },
			        "fnInitComplete": function(a, json) { 
			            appWait.hidePleaseWait();  
			            $("#tabla_Lecturas_length select").css('color','#000000'); 
			            $(".dataTables_processing").hide(); 
		          		$(".dataTables_filter").hide(); 
		          		$("#optionLecturas").parent("li").show();
		          		$("#optionLecturas").html("<span class='glyphicon glyphicon-sound-6-1'></span> Lecturas");
		          		_this.isLoadLecturas = false;
			        },    
					"aoColumns": [
									{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
									{ "sWidth": "25%", "sClass": "left",  "bSortable": false },
									{ "sWidth": "25%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "15%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
									{ "sWidth": "25%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false }, 
									{ "sWidth": "5%", "sClass": "left",  "bSortable": false }
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
		}else{
			 $("#optionLecturas").parent("li").hide();
		} 
}


function cortesSigInit() {

	 if(isCortesSig !== null && isCortesSig !== false){
		 if(oTableCorteSig !== null){
				oTableCorteSig.fnDestroy();
				oTableCorteSig = null;
			}
			
			var anexo  = $("#tcnfolSeg").val();
			
			oTableCorteSig = $('#tabla_Cortes').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[1, 'desc']],
		        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		            aoData.push({"name": "key","value": 59});
		            aoData.push({"name": "anexo","value": anexo});  
		            if(_this.isLoadCortesSig && _this.jqXHRCortesSig != null){
		        		_this.jqXHRCortesSig.abort(); 
		        		_this.jqXHRCortesSig = null;
		        		_this.isLoadCortesSig = false;
		        	}
		            
		        	_this.isLoadCortesSig = true;
		        	
		        	_this.jqXHRCortesSig = $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoData,
		                "success": function(oaDataCorSig) {
		                	fnCallback(oaDataCorSig);
		                	if(oaDataCorSig.aaData.length == 0){
			               		 $(".dataTables_processing").hide(); 
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaDataCorSig.permiso){
			        			if(oaDataCorSig.isSuccess){
			        				appWait.hidePleaseWait(); 
			        				
								}else{
									 appWait.hidePleaseWait(); 
								 
			        			}	
			        		}else{
			        			alertify.warning(oaDataCorSig.msg);
			        			 appWait.hidePleaseWait();
			        			 $("#optionCSig").parent("li").hide();
			        			 
							}
		                  
		                },
		                "error": function(jqXHR, textStatus, errorThrown) {
		                	appWait.hidePleaseWait();
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }
		                    $("#optionCSig").html("<span class='glyphicon glyphicon-copyright-mark'></span> Cortes SIG");
		                    _this.isLoadCortesSig = false;
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		        	$(".dataTables_filter").hide(); 
		        	$("#tabla_Cortes_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide();
		            $("#optionCSig").parent("li").show();
		            $("#optionCSig").html("<span class='glyphicon glyphicon-copyright-mark'></span> Cortes SIG");
		            _this.isLoadCortesSig = false;
		        },  
		        "fnRowCallback": function(nRow, aaData, iDisplayIndex) {  
		            $(nRow).find("img").on("click", function(event) {
		                var nTr = $(this).parents('tr')[0];
		                if (oTableCorteSig.fnIsOpen(nTr)) {
		                    this.src = "./img/signoMas.png";
		                    oTableCorteSig.fnClose(nTr);
		                } else {
		                	detalleCortesSig(nTr, this);
		                }
		            });
		        }, 
				"aoColumns": [  
						{ "sWidth": "3%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "16%","sClass": "center", "bSortable": false },  
						{ "sWidth": "4%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "4%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false } 
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
	}else{
		 $("#optionCSig").parent("li").hide();
	} 
}

function levantamientoInit() {
	
	 if(isLevantamiento !== null && isLevantamiento !== false){
		 if(oTableLeva !== null){
				oTableLeva.fnDestroy();
				oTableLeva = null;
			}
			
			var anexo  = $("#tcnfolSeg").val();
			
			oTableLeva = $('#tabla_Levantamiento').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[1, 'desc']],
		        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		            aoData.push({"name": "key","value": 53});
		            aoData.push({"name": "anexoCon","value": anexo});
		           
		            if(_this.isLoadLevantamiento && _this.jqXHRLevantamiento != null){
		        		_this.jqXHRLevantamiento.abort(); 
		        		_this.jqXHRLevantamiento = null;
		        		_this.isLoadLevantamiento = false;
		        	}
		            
		        	_this.isLoadLevantamiento = true;
		        	
		        	_this.jqXHRLevantamiento = $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoData,
		                "success": function(oaDataLev) {
		                	fnCallback(oaDataLev);
		                	if(oaDataLev.aaData.length == 0){
			               		 $(".dataTables_processing").hide(); 
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaDataLev.permiso){
			        			if(oaDataLev.isSuccess){
			        				appWait.hidePleaseWait(); 
			        				
								}else{
									 appWait.hidePleaseWait(); 
			        			}	
			        		}else{
			        			alertify.warning(oaDataLev.msg);
			        			appWait.hidePleaseWait(); 
			        			$("#optionLevantamiento").parent("li").hide();
							}
		                  
		                },
		                "error": function(jqXHR, textStatus, errorThrown) {
		                	appWait.hidePleaseWait();
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }
		                    $("#optionLevantamiento").html("<span class='glyphicon glyphicon-export'></span> Levantamientos");
		                    _this.isLoadLevantamiento = false;
		                }
		                
		                
		                
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		        	$(".dataTables_filter").hide(); 
		        	$("#tabla_Levantamiento_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide();
		            $("#optionLevantamiento").parent("li").show();
		            $("#optionLevantamiento").html("<span class='glyphicon glyphicon-export'></span> Levantamientos");
		            _this.isLoadLevantamiento = false;
		        },  
		        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
		        	$(nRow).find("td").first().addClass('hide');
		            $(nRow).find("img").on("click", function(event) { 
		                var nTr = $(this).parents('tr')[0];
		                if (oTableLeva.fnIsOpen(nTr)) {
		                    this.src = "./img/signoMas.png";
		                    oTableLeva.fnClose(nTr);
		                } else {
		                    detalleLevantamiento(nTr, this);
		                }
		            });
		        }, 
				"aoColumns": [
				        { "sWidth": "1%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "20%","sClass": "center", "bSortable": false },
						{ "sWidth": "10%","sClass": "center", "bSortable": false },
						{ "sWidth": "10%","sClass": "center", "bSortable": false },  
						{ "sWidth": "10%","sClass": "center", "bSortable": false },  
						{ "sWidth": "10%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false } 
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
	}else{
		 $("#optionLevantamiento").parent("li").hide();
	} 
}


function revisionInit() {
	 if(isRevision !== null && isRevision !== false){
		 if(oTableRev !== null){
				oTableRev.fnDestroy();
				oTableRev = null;
			}
			
			var anexo  = $("#tcnfolSeg").val();
			
			oTableRev = $('#tabla_revision').dataTable({  
				"bProcessing": true, 
		        "bServerSide": true,
		        "bJQueryUI": true,
		        "bDestroy": true,
		        "bAutoWidth": false,
		        "sPaginationType": "full_numbers",
		        "sAjaxSource": "Session",
		        "aaSorting": [[15, 'desc']],
		        "fnServerData": function(sSource, aoDataR, fnCallback, oSettings) {
		        	aoDataR.push({"name": "key","value": 50});
		        	aoDataR.push({"name": "anexoCon","value": anexo});  
		        	if(_this.isLoadRevision && _this.jqXHRRevision != null){
		        		_this.jqXHRRevision.abort(); 
		        		_this.jqXHRRevision = null;
		        		_this.isLoadRevision = false;
		        	}
		        	
		        	_this.isLoadRevision = true;
		        	
		        	_this.jqXHRRevision = $.ajax({
		                "dataType": 'json',
		                "type": "POST",
		                "url": sSource,
		                "data": aoDataR,
		                "success": function(oaDataR) {
		                	fnCallback(oaDataR);
		                	if(oaDataR.aaData.length == 0){
			               		 $(".dataTables_processing").hide(); 
			               		 $(".dataTables_filter").hide(); 
		                	}
		                	
		                	if(oaDataR.permiso){
			        			if(oaDataR.isSuccess){
			        				appWait.hidePleaseWait();  
			        				
								}else{
									 appWait.hidePleaseWait(); 
									 
			        			}	
			        		}else{ 
			        			 appWait.hidePleaseWait();
			        			 $("#optionRevision").parent("li").hide();
							}
		                  
		                },
		                "error": function(jqXHR, textStatus, errorThrown) {
		                	appWait.hidePleaseWait();
		                    if (textStatus !== "abort") { 
		                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                    }  
		                    $("#optionRevision").html("<span class='glyphicon glyphicon-check'></span> Revision");
		                    _this.isLoadRevision = false;
		                }
		            });
		        },
		        "fnInitComplete": function(a, json) { 
		        	$(".dataTables_filter").hide(); 
		        	$("#tabla_revision_length select").css('color','#000000'); 
		            $(".dataTables_processing").hide();
		            $("#optionRevision").parent("li").show();
		            $("#optionRevision").html("<span class='glyphicon glyphicon-check'></span> Revision");
		            _this.isLoadRevision = false;
		        },  
		        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
		            $(nRow).find("img").on("click", function(event) {
		                var nTr = $(this).parents('tr')[0];
		                if (oTableRev.fnIsOpen(nTr)) {
		                    this.src = "./img/signoMas.png";
		                    oTableRev.fnClose(nTr);
		                } else {
		                    detalleRevision(nTr, this);
		                }
		            });
		        }, 
				"aoColumns": [
						{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "20%","sClass": "center", "bSortable": false }, 
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "10%","sClass": "center", "bSortable": false },  
						{ "sWidth": "10%","sClass": "center", "bSortable": false },  
						{ "sWidth": "10%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false },  
						{ "sWidth": "5%","sClass": "center", "bSortable": false } 
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
		}else{
			 $("#optionRevision").parent("li").hide();
		}
	 
}

function consultaConsumoInit() {
	if(graficConsumo != null){
		graficConsumo.destroy();
		graficConsumo = null; 
	} 
 
	var cCosto  = $("#cCostoSeg").val();
	var anexo  = $("#tcnfolSeg").val();
	
	if(anexo !== null && anexo !== undefined && cCosto !== null && cCosto !== undefined  ){ 
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
		
		if($("#isFechasC").is(":checked")){  
			fechaIni =$("#fechaFinC").val(); 
			fechaFin = $("#fechaFinC").val();	
			tipo = 2;
		}else{
			tipo = 1;
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
		
		if(_this.isLoadConsumo && _this.jqXHRConsumo != null){
			_this.jqXHRConsumo.abort(); 
			_this.jqXHRConsumo = null;
			_this.isLoadConsumo = false;
		}
		
		_this.isLoadConsumo = true;
		
		_this.jqXHRConsumo = $.post("Session", param, function(data) {
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
		 			}
		 		}else{
		 			if(graficConsumo != null){
		 				graficConsumo.destroy();
		 				graficConsumo = null; 
					}
						
					$("#graficaConsumo").html(""); 
		 		} 
			} catch (e) {
				appWait.hidePleaseWait(); 
				_this.isLoadConsumo = false;
				throw e;
			}	
			return true;
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
			_this.isLoadConsumo = false;
		
			return false;
		}).always(function() {	
			_this.isLoadConsumo = false;
		});
		
	}
	
}


function consultaConveniosInit() {
	if(oTableConvenios !== null){
		oTableConvenios.fnDestroy(); 
		oTableConvenios = null;
	}
 
	var cCosto  = $("#cCostoSeg").val();
	
	if(cCosto !== null && cCosto !== undefined){ 
		$("#cbCuotasConvenio").addClass("ui-state-default center");
		$("#cbFechaConvenio").addClass("ui-state-default center");
	 
		oTableConvenios =	$('#tabla_Convenios').dataTable({  
			"bProcessing": true,  
		    "bServerSide": true,
		    "bJQueryUI": true,
		    "bDestroy": true, 
		    "bAutoWidth": false, 
		    "sPaginationType": "full_numbers",
		    "sAjaxSource": "Session",
		    "aaSorting": [[1, 'desc']],
		    "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
		        aoData.push({"name": "key","value": 69}); 
		        aoData.push({"name" : "cCosto", "value" : cCosto}); 
		   
		        if(_this.isLoadConvenios && _this.jqXHRFConvenios != null){
		    		_this.jqXHRFConvenios.abort(); 
		    		_this.jqXHRFConvenios = null;
		    		_this.isLoadConvenios = false;
		    	}
		    	
		        _this.isLoadConvenios = true;
		    	
		        _this.jqXHRFConvenios =  $.ajax({
		            "dataType": 'json',
		            "type": "POST",
		            "url": sSource,
		            "data": aoData,
		            "success": function(oaData) { 
		            	fnCallback(oaData); 
		            	
		            	if(oaData.permiso){
		        			if(oaData.isSuccess){ 
							}else{ 
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
		                _this.isLoadConvenios = false;
		            }
		        });
		    },
		    "fnInitComplete": function(a, json) {  
		        $("#tabla_Convenios_length select").css('color','#000000'); 
		        $(".dataTables_processing").hide(); 
		  		 $(".dataTables_filter").hide(); 
		  		_this.isLoadConvenios = false;
		    },    
			"aoColumns": [
							{ "sWidth": "10%",  "sClass": "center",  "bSortable": false },						
							{ "sWidth": "7%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "7%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "7%", "sClass": "right",  "bSortable": false },
							{ "sWidth": "5%", "sClass": "right",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "right",  "bSortable": false }, 
							{ "sWidth": "7%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "5%", "sClass": "right",  "bSortable": false }, 
							{ "sWidth": "5%", "sClass": "right",  "bSortable": false }, 
							{ "sWidth": "10%", "sClass": "right",  "bSortable": false },
							{ "sWidth": "7%", "sClass": "right",  "bSortable": false },   
							{ "sWidth": "25%", "sClass": "left",  "bSortable": false }
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
	
	
}

function consultaLecturaInit() {
	if(tableHL !== null){
		tableHL.fnDestroy();
		tableHL = null;
	}
 
	var anexo  = $("#tcnfolSeg").val(); 
	if(anexo !== null && anexo !== undefined){ 
		var fechaIni = null; 
		var fechaFin = null; 
		var anuladas = 0;
		var tipo = 1;
		
		if($("#isFechaL").is(":checked")){  
			fechaIni =$("#fechaIniL").val(); 
			fechaFin = $("#fechaFinL").val();	
			tipo = 2;
		}else{
			tipo =1;
		}
		
		if($("#checkSiL").is(":checked")){   	 
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
		       
		        if(_this.isLoadConsultaLectura && _this.jqXHRConsultaLectura != null){
		    		_this.jqXHRConsultaLectura.abort(); 
		    		_this.jqXHRConsultaLectura = null;
		    		_this.isLoadConsultaLectura = false;
		    	}
		        
		    	_this.isLoadConsultaLectura = true;
		    	
		    	_this.jqXHRConsultaLectura = $.ajax({
		            "dataType": 'json',
		            "type": "POST",
		            "url": sSource,
		            "data": aoData,
		            "success": function(oaData2) { 
		            	fnCallback(oaData2); 
		            	 
		            	if(oaData2.permiso){
		        			if(oaData2.isSuccess){ 
							}else{ 
								 appWait.hidePleaseWait();
		        			}	
		        		}else{
		        			alertify.warning(oaData2.msg);
		        		}
		        			 
		            },
		            "error": function(jqXHR, textStatus, errorThrown) { 
		                if (textStatus !== "abort") { 
		                    alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
		                }
		                _this.isLoadConsultaLectura = false;
		            }
		        });
		    },
		    "fnInitComplete": function(a, json) {  
		        $("#tabla_HistorialLec_length select").css('color','#000000'); 
		        $(".dataTables_processing").hide(); 
		  		$(".dataTables_filter").hide(); 
		  		_this.isLoadConsultaLectura = false;

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
		
	}
	
}

function consultaInteInit() {
	
	if(isConsultaIntegral !== null && isConsultaIntegral !== false){
		var cCosto =$("#cCostoSeg").val();
		var param = new Array();
			param.push({"name" : "key", "value" : 47});		 
			param.push({"name" : "cCosto", "value" : cCosto});  
			  
		if(_this.isLoadConsultaInte && _this.jqXHRConsultaInte != null){
			_this.jqXHRConsultaInte.abort(); 
			_this.jqXHRConsultaInte = null;
			_this.isLoadConsultaInte = false;
		}
		
		_this.isLoadConsultaInte = true;
		
		_this.jqXHRConsultaInte = $.post("./Session", param, function(dataC){
				if(dataC.permiso){
					if(dataC.isSuccess){ 
					 var df = new DecimalFormat("###,###,###.00");
							$("#medidorCI").val(dataC.aData.medidorSeg);  
							$("#cCostoCI").val(dataC.aData.cCostoSeg);  
							$("#tcnfolCI").val(dataC.aData.tcnfolSeg);  
							$("#estadoCI").val(dataC.aData.estadoSeg);
							$("#cateCI").val(dataC.aData.cateSeg);	
							$("#subCateCI").val(dataC.aData.subCateSeg); 
							$("#clienteCI").val(dataC.aData.clienteSeg);
							$("#direInCI").val(dataC.aData.direInSeg);   
							$("#direLecCI").val(dataC.aData.direLecSeg);  
							$("#zonaInCI").val(dataC.aData.zonaInSeg);  
							$("#zonaLecCI").val(dataC.aData.zonaLecSeg);  
							$("#bloqueCI").val(dataC.aData.bloqueSeg);  
							$("#planCI").val(dataC.aData.planSeg);  
							$("#ulMesFacCI").val(dataC.aData.ulMesFac);  
							$("#ulFactNumeroCI").val( dataC.aData.ulFactNumero );   
							$("#montoUltimaFacCI").val("Q. "+df.format(dataC.aData.montoUltimaFac)); 
							$("#fechaUltimaFacCI").val( dataC.aData.fechaUltimaFac );  
							$("#diaMoraCI").val( dataC.aData.diaMoraSeg );  
							$("#venceFacBanco").val( dataC.aData.venceFacBanco );  
							$("#venceFacCaja").val( dataC.aData.venceFacCaja );   
							$("#saldoTCI").val("Q. "+df.format(dataC.aData.saldoTSeg));  
							$("#saldoXVeCI").val("Q. "+df.format(dataC.aData.saldoXVeSeg));  
							$("#saldoVCI").val("Q. "+df.format(dataC.aData.saldoVSeg));   
							$("#saldoConCI").val("Q. "+df.format(dataC.aData.saldoConSeg));    
							$("#saldoFncCI").val("Q. "+df.format(dataC.aData.saldoFncSeg)); 
							$("#saldoFncFinCI").val("Q. "+df.format(dataC.aData.saldoFncFinSeg));   
							
							$("#matriculaCI").val(dataC.aData.matricula);  
							$("#termiCI").val(dataC.aData.terminacion);  
							$("#fincaCI").val(dataC.aData.finca);  
							$("#folioCI").val(dataC.aData.libro);  
							$("#libroCI").val(dataC.aData.folio);  
							
							if(dataC.aData.diaMoraSeg !== 0){
								$("#diaMoraCI").css('color', '#FFFFFF');
								$("#diaMoraCI").css('font-weight', 'bold');
								$("#diaMoraCI").css('font-size', '15px');
								$("#diaMoraCI").css('background-color', 'rgb(195, 50, 46)');
								
								if(dataC.isConcejalia && dataC.aData.diaMoraSeg < 66){
									$("#diaMoraCI").css('color', 'rgb(195, 50, 46)');
									$("#diaMoraCI").val('');
								}
								 
							}else{
								$("#diaMoraCI").css('color', 'rgba(218, 206, 118, 1)'); 
								$("#diaMoraCI").css('font-size', '12px');
								$("#diaMoraCI").css('background-color', 'rgba(216, 231, 117, 0.27)');
							}
							
							if(dataC.aData.saldoVSeg !== 0  ){  
								$("#saldoVCI").css('color', '#FFFFFF');
								$("#saldoVCI").css('font-weight', 'bold');
								$("#saldoVCI").css('font-size', '15px');
								$("#saldoVCI").css('background-color', 'rgb(195, 50, 46)');
							}else{ 
								$("#saldoVCI").css('color', 'rgba(218, 206, 118, 1)'); 
								$("#saldoVCI").css('font-size', '12px');
								$("#saldoVCI").css('background-color', 'rgba(216, 231, 117, 0.27)');
							}
							
							if(isNotificaSeguimiento){
								 $("#optNotificaSeg").show();
							}else{
								 $("#optNotificaSeg").hide();
							}
							
					} else{
						$("#optionConsulta").parent("li").show();
						$("#optionConsulta").html("<span class='glyphicon glyphicon-folder-open'></span> Consulta Integral");
					}
				}  else{
					$("#optionConsulta").parent("li").hide();
					$("#optionConsulta").html("<span class='glyphicon glyphicon-folder-open'></span> Consulta Integral");
				}
			}).fail(function( jqXHR, textStatus, errorThrown ) {   
				_this.isLoadConsultaInte = false;
			 
				return false;
			}).always(function(){
				_this.isLoadConsultaInte = false;
				 $("#optionConsulta").parent("li").show();
				 $("#optionConsulta").html("<span class='glyphicon glyphicon-folder-open'></span> Consulta Integral");
			});  
	}else{
		 $("#optionConsulta").hide();
		 $("#optionConsulta").html("<span class='glyphicon glyphicon-folder-open'></span> Consulta Integral");
	} 
}


//carga de fotos de ficaje en campo.

function clickFotosCampo(paramKey){ 
	 
	var param = new Array();
	param.push({"name" : "key", "value" : 191});
	param.push({"name" : "fichaId", "value" : paramKey});		 
	if(_this.isLoadFicha && _this.jqXHRFicha != null){
		_this.jqXHRFicha.abort(); 
		_this.jqXHRFicha = null;
		_this.isLoadFicha = false;
	}
	
	_this.isLoadFicha = true;
	
	_this.jqXHRFicha = $.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  
				
				if(data.divHTML.length>0){
				
					 $("#conteFotosCampo").html(data.divHTML);
					 $('[data-toggle="tooltip"]').tooltip(); 
				} else{ 
					 var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
						+'</div>'; 
					 
					 $("#conteFotosCampo").html(titulo);
					  
				}
				 
				 
			} else{ 
				
				if(data.msg ==="No Existen Fotos"){
					var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
						+'<h5 ><b>No se encontraron fotos para este medidor </b></h5>'
					+'</div>'; 
				 
				 $("#conteFotosCampo").html(titulo);
				} else{
					var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
						+'<h5 ><b>'+data.msg+' </b></h5>'
					+'</div>'; 
				 
				 $("#conteFotosCampo").html(titulo);
				}
				 
				  
			}
		} else{
			var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
				+'<h5 ><b>'+data.msg+' </b></h5>'
			+'</div>'; 
		 
		 $("#conteFotosCampo").html(titulo);
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {   
		appWait.hidePleaseWait();  
		_this.isLoadFicha = false;
		return false;
	}).always(function(){ 
		_this.isLoadFicha = false;
		 $("#consultaFotosCampo").html("<span class='glyphicon glyphicon-camera'></span> Fotografias");
		appWait.hidePleaseWait();  
		
		var $lg = $('.lightbox');
		if ($lg[0]) {
		    $lg.lightGallery({
		        enableTouch: true,
		        onOpen: function (plugin){			        	
		    		$("#lg-action").append('<a class="text-center" data-rotate="0" id="rotate-img"><span class="glyphicon glyphicon-share-alt"></span></a>');
		    		$("#rotate-img").on("click", function(){ 
		    			var $obj = $(".lg-slide.current"); 
		    			var valueRotate = $obj.data("rotate"); 
		    			var nowRotate = 0;			        			
		    			if(valueRotate !== undefined){
		    				nowRotate = fnRotateImage($obj.find("img"), valueRotate); 
		    			} else {
		    				nowRotate = fnRotateImage($obj.find("img"), 0); 
		    			}
		    			
		    			$obj.data("rotate", nowRotate);
		    			
		    		});
		        }
		    });			        			        
		}
	}); 	
}	 

function fichaInit() {
	
	if(isFicha !== null && isFicha !== false){
		 var medidorSeg = $("#medidorSeg").val();
		 var idFicha = "";
		 var param = new Array();
			param.push({"name" : "key", "value" : 167});		 
			param.push({"name" : "medidor", "value" : medidorSeg});
			param.push({"name" : "consulta", "value" : 0}); 
			
			if(_this.isLoadFicha && _this.jqXHRFicha != null){
				_this.jqXHRFicha.abort(); 
				_this.jqXHRFicha = null;
				_this.isLoadFicha = false;
			}
			
			_this.isLoadFicha = true;
			
			_this.jqXHRFicha = $.post("./Session", param, function(dataF){
					if(dataF.permiso){
						if(dataF.isSuccess){   
							
							idFicha = dataF.aData.idFicha;
						 	$("#medF").val(dataF.aData.medidor);
						 	$("#racSocial").val(dataF.aData.razonSoc);  
							$("#lecturaF").val(dataF.aData.lecMed);  
							$("#nombreF").val(dataF.aData.nombre);  
							$("#direccionF").val(dataF.aData.direccion);
							$("#estadoMedF").val(dataF.aData.estadoMed);	
							$("#lecturaF").val(dataF.aData.lecMed); 
							$("#izquierdo").val(dataF.aData.medidorIzq);  
							$("#derecho").val(dataF.aData.medidorDer);  
							$("#nomEntrevF").val(dataF.aData.nomEntrev);   
							$("#emailF").val(dataF.aData.email);  
							$("#tipoTelF").val(dataF.aData.tipoTel);  
							$("#telContactoF").val( dataF.aData.telContacto );    
							$("#usoSueloF").val( dataF.aData.usoSuelo );  
							$("#cantHabitantesF").val( dataF.aData.cantHabitantes );  
							$("#cantTrabajadorF").val( dataF.aData.cantTrabajador );  
							$("#subTPrivadoF").val( dataF.aData.PRIVADO );    
							$("#gobiernF").val(dataF.aData.gobiern);  
							$("#tuComercio").val(dataF.aData.comercio);  
							$("#numLocalesF").val(dataF.aData.numLocales);  
							$("#tuServicioF").val(dataF.aData.SERVICIOS);
							$("#tuAlimenF").val(dataF.aData.subTAlimen);	
							$("#tuIndustriaF").val(dataF.aData.subTIndus); 
							$("#tuOtrosF").val(dataF.aData.subTOtros);
							$("#obser").val(dataF.aData.obser);   					
							$("#empagua").val(dataF.aData.empagua);  
							$("#mariscal").val(dataF.aData.mariscal);
							$("#pozo").val(dataF.aData.pozo);
							$("#pipa").val(dataF.aData.pipas);
							$("#pFrecuencia").val(dataF.aData.frecuencia);
							$("#pCantidad").val(dataF.aData.cantPipa);
							$("#cisternaEF").val(dataF.aData.cisterEle); 
							$("#cisternaSF").val(dataF.aData.cisterSub);
							$("#tonel").val(dataF.aData.tonelCant); 
							$("#sanitario").val(dataF.aData.sanitarios);
							$("#lavamanos").val(dataF.aData.lavamanos);
							$("#lavaplatos").val(dataF.aData.lavaplatos);
							$("#ducha").val(dataF.aData.duchas);
							$("#chorro").val(dataF.aData.chorros);
							$("#lavadora").val(dataF.aData.lavadora);
							$("#pila").val(dataF.aData.pila);
							$("#piscina").val(dataF.aData.piscina);
							$("#jardin").val(dataF.aData.mtsJardin);
							$("#IDENTIFICADORFICHA").val(dataF.aData.IDENTIFICADORFICHA);
							$("#TIPOFICHA").val(dataF.aData.TIPOFICHA);
							$("#userCarga").val(dataF.aData.userCarga);
							$("#fecCarga").val(dataF.aData.fecCarga);
							$("#viviendaF").val(dataF.aData.VIVIENDA);
							$("#nivelesV").val(dataF.aData.nivelesV);
							$("#obserAsigF").val(dataF.aData.OBSERASIGNA);
							$("#userAsig").val(dataF.aData.USERCREAFICHA);
							$("#fecAsig").val(dataF.aData.FECCREAFICHA);
						    
							if(dataF.aData.tipo === "L"){
								$("#lecturaALF").val(dataF.aData.lecMedAlca);  
								$("#estadoMedAlcanF").val(dataF.aData.estMedAlcanta);
								$("#empaguaAlca").val(dataF.aData.esEmpagua);
								$("#mariscalAlca").val(dataF.aData.esMariscal);
								$("#candelasVAl").val(dataF.aData.candelasVis);
								$("#plantaTAlcanF").val(dataF.aData.plantTrata);
								$("#pozoAbALF").val(dataF.aData.cantPozoAbs);
								$("#tonelAlca").val(dataF.aData.tonelCant);
								$("#cisternaEAlF").val(dataF.aData.cisterEleAl);
								$("#cisternaSAF").val(dataF.aData.cisterSubAl); 
								$("#obser2").val(dataF.aData.observa);
								$("#alcaConte").show();
							}
							setTimeout(function(){clickFotosCampo(idFicha);}, 300); 
						  
					}else{
						 $("#optionFicha").parent("li").show();
						 $("#optionFicha").html("<span class='glyphicon glyphicon-folder-close'></span> Ficha");
					} 
				}else{
					 $("#optionFicha").parent("li").hide();
					 $("#optionFicha").html("<span class='glyphicon glyphicon-folder-close'></span> Ficha");
				} 
			}).fail(function( jqXHR, textStatus, errorThrown ) {   
				_this.isLoadFicha = false;
			 
				return false;
			}).always(function(){ 
				_this.isLoadFicha = false;
				 $("#optionFicha").parent("li").show();
				 //setTimeout(function(){consultaInteInit();}, 300); 
				 $("#optionFicha").html("<span class='glyphicon glyphicon-folder-close'></span> Ficha");
				 
			});  
	}else{
		 $("#optionFicha").parent("li").hide(); 
		 //$("#optionFicha").html("<span class='glyphicon glyphicon-folder-close'></span> Ficha");
	}
	
}


/***********Seguimiento*********/

function clickSeguimiento(medidor) {  
	
	if(!vParam(medidor)){
		alertify.warning("Error al recuperar Medidor");
		return false;
	} 
	  
	 var param = new Array();
		param.push({"name" : "key", "value" : 44});		 
		param.push({"name" : "medidor", "value" : medidor});  
		 
	var existeMed = null;
	
		appWait.showPleaseWait(); 
		$.post("./Session", param, function(data){
			if(data.permiso){
				existeMed = data.isSuccess;
				if(data.isSuccess){ 
				 var df = new DecimalFormat("###,###,###.00");
						$("#medidorSeg").val(data.aData.medidorSeg);  
						$("#cCostoSeg").val(data.aData.cCostoSeg);  
						$("#tcnfolSeg").val(data.aData.tcnfolSeg);  
						$("#clienteSeg").val(data.aData.clienteSeg);  
						$("#direInSeg").val(data.aData.direInSeg);   
						$("#direLecSeg").val(data.aData.direLecSeg);  
						$("#zonaInSeg").val(data.aData.zonaInSeg);  
						$("#zonaLecSeg").val(data.aData.zonaLecSeg);  
						$("#bloqueSeg").val(data.aData.bloqueSeg);  
						$("#saldoTSeg").val("Q. "+df.format(data.aData.saldoTSeg));  
						$("#ultMesSeg").val(data.aData.ultMesSeg);  
						$("#facUltMesSeg").val("Q. "+df.format(data.aData.facUltMesSeg));  
						$("#saldoVSeg").val("Q. "+df.format(data.aData.saldoVSeg));  
						$("#diaMoraSeg").val( data.aData.diaMoraSeg );  
						$("#mesAntSeg").val("Q. "+df.format(data.aData.mesAntSeg));  
						$("#latitudSeg").val( data.aData.latitudSeg );  
						$("#longitudSeg").val( data.aData.longitudSeg );  
						$("#geoposicionSeg").val(data.aData.geoposicionSeg);
						$("#m3MesAntSeg").val( data.aData.m3MesAntSeg );  
						$("#m3MesSeg").val(data.aData.m3MesSeg);  
						$("#estadoSegui").val(data.aData.estadoSeg);
						 
						if(data.aData.diaMoraSeg !== 0){
							$("#diaMoraSeg").css('color', '#FFFFFF');
							$("#diaMoraSeg").css('font-weight', 'bold');
							$("#diaMoraSeg").css('font-size', '20px');
							$("#diaMoraSeg").css('background-color', 'rgb(195, 50, 46)');
							
							if(data.isConcejalia && data.aData.diaMoraSeg < 66){
								$("#diaMoraSeg").css('color', 'rgb(195, 50, 46)');
								$("#diaMoraSeg").val('');
							}
							 
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
						 
					clearChildren('filtros-Seguimiento');
					
					/********Se crea la cabecera General*********/
					
					cabecera = ' <div class="form-group "> '+
									'<div class="col-xs-4 col-md-4">'+
										'<label  class="control-label" style="text-align: right;" >Medidor: </label>'+
										'<input style="text-align: right;" class="form-control input-md" type="text"  readonly="readonly"  value="'+data.aData.medidorSeg+'"> '+
									'</div>    '+
									'<div class="col-xs-4 col-md-4">'+
										'<label  class="control-label" style="text-align: right;" >Centro Costo: </label>'+
										'<input style="text-align: right;" class="form-control input-md" type="text"  readonly="readonly"  value="'+data.aData.cCostoSeg+'"> '+
									'</div> '+
									'<div class="col-xs-4 col-md-4">'+
										'<label  class="control-label" style="text-align: right;" >Anexo: </label>'+
										'<input style="text-align: right;"  class="form-control input-md"  type="text"  readonly="readonly"  value="'+data.aData.tcnfolSeg+'"> '+
									'</div> '+
								'</div>  '+
							' <div class="form-group">  '+
								'<div class="col-md-12">'+ 
								'	<label class="control-label" style="text-align: right;" >Cliente: </label>'+ 
									'<input class="form-control input-md" type="text"  readonly="readonly"  value="'+data.aData.clienteSeg+'"> '+
								'</div>  '+
							'</div>  '; 
					
					$("#cabeceraLect").html(cabecera);
					$("#cabeceraConsumo").html(cabecera);
					$("#cabeceraRevision").html(cabecera);
					$("#cabeceraLevantamiento").html(cabecera);
					$("#cabeceraSIG").html(cabecera);
					$("#cabeceraLecturas").html(cabecera);
					$("#cabeceraSTC").html(cabecera);
					$("#cabeceraEstaCuenta").html(cabecera);
					$("#cabeceraConvenios").html(cabecera);
					$("#cabeceraNotificaSeg").html(cabecera);
					$("#cabeceraRoboFraude").html(cabecera);
					$("#cabeceraAnalisis").html(cabecera); 
					
					
					$("#conte-fotosCI").html(cabecera);
				 
					 $("#div-Contenido").show();
					 $("#filtros-Seguimiento").hide();
					 
					 /********variables de permisos******/
					 isConsultaIntegral= data.aData.isConsultaIntegral;
					 isRevision= data.aData.isRevision;
					 isLevantamiento= data.aData.isLevantamiento;
					 isCortesSig= data.aData.isCortesSig;
					 isLecturas= data.aData.isLecturas;
					 isEstadoCuenta= data.aData.isEstadoCuenta;
					 isFicha= data.aData.isFicha; 
					 isCortesSTC = data.aData.isCortesSTC;
					 isNotificaSeguimiento = data.aData.isNotificaSeguimiento;
					 isRoboYFraude = data.aData.isRoboYFraude;
					 isHistoricoAnalisis = data.aData.isHistoricoAnalisis; 
					   
				}else{
					alertify.error("Error: "+data.msg );  
					 $("#filtros-Seguimiento").show();
					 cabecera = null;
				}
			}else{
				alertify.warning("Advertencia: "+data.msg );
				 $("#filtros-Seguimiento").show();
				 cabecera = null;
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			 $("#filtros-Seguimiento").show();
			 cabecera = null;
			appWait.hidePleaseWait(); 
				logException(jqXHR, statusTxt, errorThrown); 
		 
			return false;
		}).always(function(){
			appWait.hidePleaseWait();
			if(existeMed === true){
				$("#optionSeg").html("<span class='glyphicon glyphicon-home'></span> Seguimiento");
				setTimeout(function(){clickFotos();}, 300);  
				setTimeout(function(){fichaInit();}, 300);  
				setTimeout(function(){historicoAnalisisInit();}, 300);
				setTimeout(function(){consultaInteInit();}, 300); 
				setTimeout(function(){consultaLecturaInit();}, 300); 
				setTimeout(function(){consultaConsumoInit();}, 300); 
				setTimeout(function(){consultaConveniosInit();}, 300);  
				setTimeout(function(){revisionInit();}, 300); 
				setTimeout(function(){levantamientoInit();}, 300); 
				setTimeout(function(){cortesSigInit();}, 300); 
				setTimeout(function(){lecturasInit();}, 300); 
				setTimeout(function(){cortesSTCInit();}, 300); 
				setTimeout(function(){estadoCuentaInit();}, 300);
				setTimeout(function(){roboInit();}, 300);  
				setTimeout(function(){deuda();}, 300); 
				setTimeout(function(){saldoRubroInit();}, 300); 
				setTimeout(function(){notasAbonoInit();}, 300);  
				  
			}else{
				if(vParam(cIdEstrategia)){
					cInfoMed = "Medidor no existe en STC";
					casoSinMedidor();
				}else{
					$("#conteFiltrosBus").show();
			  		$("#conte-TablaFiltros").hide(); 
				}
			}
			
		});
		
		
		
}
 

function consultaPosiblesMed() {
	var medidor  = $("#medidorBC").val(); 
	var identificacion  = $("#identificacion").val(); 
	var nombre  = $("#nombreBus").val(); 
	var dire  = $("#direBus").val(); 
	var apellido  = $("#apellidoBus").val(); 
	var zona  = $("#zonaBus").val(); 
	var isTodasZona = 0;
	
	$("#btnProcede").hide();
	$("#btnNoProcede").hide();
	$("#btnCancelAnalisis").hide();
	
	$("#btnNuevaBus").show();
	
	if(vParam(medidor)){
		if(!isNumber(medidor)){
			alertify.error('Medidor no valido');
			return false;
		}else{
			clickSeguimiento(medidor);
			return false;
		}
	} 
	
	if($("#isZonasT").is(":checked")){  
		zona ="";
		isTodasZona = 1;
	}else{
		if(vParam(zona)){
			if(!isNumber(zona)){
				alertify.error('Zona no valida');
				return false;
			}
		}else{
			if(!vParam(identificacion) && !vParam(nombre) && !vParam(dire) && !vParam(apellido)  ){ 
				alertify.error('Por favor ingrese por lo menos un filtro de busqueda.!');
				return false;
			} 
		}
	} 
	
	
	 
	
	if(tablaBusquedaGeneral !== null){
		tablaBusquedaGeneral.fnDestroy();
		tablaBusquedaGeneral = null;
	}
	
	appWait.showPleaseWait(); 
	
	tablaBusquedaGeneral =	$('#tabla_filtrosG').dataTable({  
		"bProcessing": true,  
	    "bServerSide": true,
	    "bJQueryUI": true,
	    "bDestroy": true, 
	    "bAutoWidth": false, 
	    "sPaginationType": "full_numbers",
	    "sAjaxSource": "Session",
	    "aaSorting": [[1, 'desc']],
	    "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	        aoData.push({"name": "key","value": 78});  
	        aoData.push({"name" : "identificacion", "value" : identificacion});
	        aoData.push({"name" : "nombre", "value" : nombre});
	        aoData.push({"name" : "dire", "value" : dire});
	        aoData.push({"name" : "apellido", "value" : apellido});
	        aoData.push({"name" : "isTodasZona", "value" : isTodasZona});
	        aoData.push({"name" : "zona", "value" : zona});
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
							alertify.warning(oaData.msg);
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
	        $("#tabla_filtrosG_length select").css('color','#000000'); 
	        $(".dataTables_processing").hide(); 
	  		 $(".dataTables_filter").hide();
	  		$("#conteFiltrosBus").hide();
	  		$("#conte-TablaFiltros").show();  
	  		
	    },    
		"aoColumns": [
						{ "sWidth": "5%",  "sClass": "left",  "bSortable": false },						
						{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
						{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
						{ "sWidth": "10%", "sClass": "left",  "bSortable": false },
						{ "sWidth": "20%", "sClass": "left",  "bSortable": false }, 
						{ "sWidth": "20%", "sClass": "left",  "bSortable": false }, 
						{ "sWidth": "10%", "sClass": "left",  "bSortable": false }, 
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
 
	
}

 


$(document).ready(function(){
	 
	$("#cerrarMapa").on('click', function(){
		$("#optionSeg").trigger("click"); 
		cerrarMapa();
	});
	
	
	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
	
	$("[name='isPrioridad']").bootstrapSwitch();
	
	var dayFin = new Date();
	var dayIni = new Date(dayFin.getFullYear(), dayFin.getMonth()+1, 1);
	var startDate = dayIni.format("mm/yyyy");
	var endDate = dayFin.format("mm/yyyy"); 
	 
	  
	 $('#fechaIniL').val(endDate);
	    $('#fechaIniL').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	 $('#fechaFinL').val(startDate);
	    $('#fechaFinL').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	    $('#fechaIniC').val(endDate);
	    $('#fechaIniC').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	 $('#fechaFinC').val(startDate);
	    $('#fechaFinC').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	    
	    $('#fechaIniLE').val(endDate);
	    $('#fechaIniLE').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	    
	 $('#fechaFinLE').val(startDate);
	    $('#fechaFinLE').datepicker({
	        format: 'mm/yyyy',
	        viewMode: 'years',
	        minViewMode: 'months'
	    }).on('changeDate', function(ev) {
	        if ($('.datepicker-months').is(':visible')) {
	            $(this).datepicker('hide'); 
	        }
	    });
	     
	    
	    $(window).resize(function() {
	    	if (screen.width < 481) {
		    	$('div').each(function() {   
		    		$(this).removeClass('col-xs-12').removeClass('col-xs-6').removeClass('col-xs-4').removeClass('col-xs-3'); 
		    	}); 
		    }else {
			    	$('div').each(function() {  
			    		$(this).removeClass('col-xs-12'); 
			    		 
			    		if($(this).hasClass('col-sm-12')){
			    			$(this).addClass('col-xs-12'); 
			    		}else{
			    			if($(this).hasClass('col-md-12')){
				    			$(this).addClass('col-xs-12'); 
				    		}else{ 
					    		if($(this).hasClass('col-md-6') && !$(this).hasClass('col-sm-12')){
					    			$(this).addClass('col-xs-6'); 
					    		}else{
					    			if($(this).hasClass('col-md-4')){
						    			$(this).addClass('col-xs-4'); 
						    		}else{
						    			if($(this).hasClass('col-md-3')){
							    			$(this).addClass('col-xs-3'); 
							    		}else{
							    			if($(this).hasClass('col-md-2')){
								    			$(this).addClass('col-xs-2'); 
								    		}
							    		}
						    		}
					    		}
				    		}
			    		}
			    	});
			    	
			    }
	    	});
	     
	    ///acciones para el analisis de cuentas
	    
	    $("#btnCancelAnalisis").on('click', function(){
	    	//buildFormBack(87);
	    	buildForm(this, 87, paramCampaReturn); 
		});
	    
	    $("#btnNoProcede").on('click', function(){
	    	casoNoProcedeShow();
		});
	     
	    $("#btnFinNoProcede").on('click', function(){
	    	casoNoProcedeEjecucion();
		});
	    
	    $("#btnProcede").on('click', function(){
	    	casoProcedeShow();
		});

	    $("#btnFinProcede").on('click', function(){
	    	casoProcedeEjecucion();
		});
	    
	    $("#btnProcedeSin").on('click', function(){
	    	casoProcedeShow();
		});  
	    
	    $("#btnNoProcedeSin").on('click', function(){
	    	casoNoProcedeShow();
		});
	    
	    $("#btnCancelAnalisisSin").on('click', function(){
	    	//buildFormBack(87); 
	    	buildForm(this, 87, paramCampaReturn); 
		}); 
	    
	    
	var  estrategia = $('#paramCampa').val();
	 
	if(vParam(estrategia) && estrategia !== "null"  && estrategia !== "undefined"){
		paramCampaReturn = estrategia;
		var param = estrategia.split("|");  
		  cMedidor= param[1];
		  cEstrategia  = param[2];
		  cIdEstrategia = param[0]; 
	 
		if(!vParam(cMedidor) || cMedidor == '0'){
			 cFecha = param[3];
			  cDire = param[4];
			cInfoMed = "caso sin medidor";
			casoSinMedidor();
		}else{
			$("#div-Contenido").show();
			$("#btnNuevaBus").show();
			$("#btnNoProcede").show();
			$("#btnNuevaBus").hide();
			$("#filtros-Seguimiento").hide();
			
			clickSeguimiento(cMedidor);
		}
		
	}
	
});