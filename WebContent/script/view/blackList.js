var table = null; 


var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function liberarMed() {
	var medidor =$("#medidor").val();  
		
	if(vParam(medidor)){
		if(!isNumber(medidor)){ 
			noty({text: 'Medidor no valido', type:'error', timeout:7000}); 
			return false;
		} 
	} 
	 
	var param = new Array();
	param.push({"name" : "key", "value" : 130});		 
	param.push({"name" : "medidorp", "value" : medidor}); 
	 
	var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de quitar de lista negra el medidor "+medidor+"?";
	  
	
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
						noty({text: data.msg, type:'error', timeout:7000}); 
					}
				}).fail(function( jqXHR, textStatus, errorThrown ) {  
					appWait.hidePleaseWait(); 
						logException(jqXHR, statusTxt, errorThrown); 
				 
					return false;
				}).always(function(){ 
					appWait.hidePleaseWait(); 
					retornar() ;
				});
		 } else {
				return false;   
				}
			});
}

 

function consultaPosibleMed() {
	var medidor =$("#medidorBC").val();  
		
	if(vParam(medidor)){
		if(!isNumber(medidor)){
			noty({text: 'Medidor no valido', type:'error', timeout:7000}); 
			return false;
		} 
	} 
	
	var param = new Array();
	param.push({"name" : "key", "value" :129});		 
	param.push({"name" : "medidorp", "value" : medidor}); 
	 
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  
				if(data.existe){  
					$("#medidor").val( data.aData.medidor );  
					$("#anexo").val( data.aData.anexo );  
					$("#nombreCli").val(data.aData.nombreCli);  
					$("#fecha").val(data.aData.fecha);  
					$("#obser").val(data.aData.obser);    
					$("#user").val(data.aData.userIngreso);  
				 
					 $("#medidoresLista").show();
					 $("#conte-Msg").hide();
					 $("#conte-info").show();
					 $("#filtroAnalisis").hide();
				}else{
					 var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
							+'<h5 ><b> '+data.msg+' </b></h5>'
						+'</div>'; 
					 
					 $("#msg").html(titulo);
					 

					 $("#medidoresLista").show();
					 $("#conte-Msg").show();
					 $("#conte-info").hide();
					 $("#filtroAnalisis").hide();
				}
				 
			}else{
				/*
				noty({text: data.msg, type:'error', timeout:7000}); 
				 $("#medidoresLista").hide();
				 $("#conte-Msg").hide();
				 $("#filtroAnalisis").show();*/
				var titulo = '<div class="alert alert-info text-center" role="alert" style ="  width: 530px; margin: 0 auto; margin-bottom: 5px;">'
					+'<h5 ><b>  '+data.msg+'  </b></h5>'
				+'</div>'; 
			 
			 $("#msg").html(titulo);
			 

			 $("#medidoresLista").show();
			 $("#conte-Msg").show();
			 $("#conte-info").hide();
			 $("#filtroAnalisis").hide();
			}
		}else{
			noty({text: data.msg, type:'error', timeout:7000}); 
			 $("#medidoresLista").hide();
			 $("#conte-Msg").hide();
			 $("#filtroAnalisis").show();
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		 $("#filtros").show();
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown); 
	 
		return false;
	}).always(function(){ 
		appWait.hidePleaseWait(); 
		
	});
	
}


function retornar() {
	 
	buildForm(this, 128,0); 
}


$(document).ready(function(){	
 
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
	
	 
});

 
 