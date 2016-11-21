var isAnalista = null; 
var parametrosBus = null;
var fechaI = null;
var fechaF = null;
var estrategia = null;

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function asignarMedidores() {  
 var analistas = $("#analistas").val();
 var msgAnalistas = "";
 
 if(isAnalista){
	 analistas = 0;
 }else{
	 if(!vParam(analistas)){  
			noty({text: "seleccione analistas", type:'error', timeout:7000}); 
			return false; 
	} 
	 
	 msgAnalistas = " con un total de "+analistas.length +" analistas ";
 }
 
	var param = new Array();
	param.push({"name" : "key", "value" : 95});		 
	param.push({"name" : "parametrosBus", "value" : parametrosBus});
	param.push({"name" : "estrategia", "value" : estrategia});
	param.push({"name" : "fechaI", "value" : fechaI});
	param.push({"name" : "fechaF", "value" : fechaF});
	param.push({"name" : "isAnalista", "value" : isAnalista});
	param.push({"name" : "analistas", "value" : analistas});
	 
	var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de crear la estrategia de tipo  "+
						$("#tEstrategiaCon").val() +msgAnalistas +" con un total de "+$("#totalMed").val() +" medidor(es)";
	  
	
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
					setTimeout(buildForm(this, 86,0), 300); 							
				});
		  } else {
		return false;   
		}
	});
	
	 
} 

function llenaComboAnalista(){ 
	
	$("#analistas").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 93}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#analistas"), 0, false, true);
				}else{
					
					 $("#analistas").append(noExiste);
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
 
function consultarInfo() {  
	  parametrosBus = $("#parametros").val();
	  estrategia  = $("#tEstrategia").val();
	  fechaI =$("#fechaIni").find('input').val(); 
	  fechaF = $("#fechaFin").find('input').val(); 
	
	if(!vParam(parametrosBus)){  
			noty({text: 'seleccione parametro de busqueda', type:'error', timeout:7000}); 
			return false; 
	} 
	
	if(!vParam(estrategia)){  
		noty({text: 'seleccione tipo de estrategia', type:'error', timeout:7000}); 
		return false; 
	} 
 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 94});		 
	param.push({"name" : "parametrosBus", "value" : parametrosBus});
	param.push({"name" : "estrategia", "value" : estrategia});
	param.push({"name" : "fechaI", "value" : fechaI});
	param.push({"name" : "fechaF", "value" : fechaF});
	 
	
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  		
				if(vParam(data.cantMedidores) && data.cantMedidores !== "0"){
					$("#filaPrimaria").hide();
					$("#filaSecundaria").show();
					$("#parametrosCon").val($("#parametros option:selected").text());
					$("#tEstrategiaCon").val($("#tEstrategia option:selected").text());
					$("#totalMed").val(data.cantMedidores);
					
					isAnalista = data.esAnalista;
				}else{
					noty({text: "No se encontro informaci&oacute;n", type:'warning', timeout:7000});
					isAnalista = null;
				}
				
				
			}else{ 
				noty({text: data.msg, type:'Error', timeout:7000}); 
				
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
		if(isAnalista){
			$("#conteAnalistas").hide();
		}else{
			if(isAnalista !== null){
				$("#conteAnalistas").show();
				llenaComboAnalista();
			} 
		}
	}); 
} 

function llenaComboEstrategia(){ 
	
	$("#tEstrategia").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 92}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#tEstrategia"), 0, false, true);
				}else{
					
					 $("#tEstrategia").append(noExiste);
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


function llenaComboParametros(){ 
	
	$("#parametros").val('').html('').trigger("liszt:updated"); 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	appWait.showPleaseWait();
	
	$.post("./Session", {"key": 189}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					llenaComboPPL(data.formulario.comboBox,  $("#parametros"), 0, false, true);
				}else{
					
					 $("#parametros").append(noExiste);
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
		llenaComboEstrategia();
	}); 
}

 


$(document).ready(function(){	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
	
	var dayFin = new Date();
	var dayIni = new Date(dayFin.getFullYear(), dayFin.getMonth(), 1);
	var startDate = dayIni.format("dd/mm/yyyy");
	var endDate = dayFin.format("dd/mm/yyyy");  
	
	$('#fechaIni').find('input').val(startDate);
	$('#fechaIni').datepicker().on('changeDate', function(ev) {
		if ($('.datepicker-days').is(':visible')) {
			$(this).datepicker('hide');
			
		}
	});
	
	$('#fechaFin').find('input').val(endDate);
	$('#fechaFin').datepicker().on('changeDate', function(ev) {
		if ($('.datepicker-days').is(':visible')) {
			$(this).datepicker('hide');	 
		}
	});	
	
	
	
	$("#btnReturn").on('click', function(){
		try{			
			buildForm(this, 86,0);								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	//consulta de medidores en base a los filtros
	$("#btnFiltrar").on('click', function(){
		try{			
			isAnalista = null; 
			parametrosBus = null;

			consultarInfo();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	//asignacion de medidores
	$("#btnAsignar").on('click', function(){ 
		try{			
			asignarMedidores();								
		} catch (e) {
			alert(e.name+": "+e.message);
		}
	});
	
	llenaComboParametros();
});