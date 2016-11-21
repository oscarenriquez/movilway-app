function reporteIngGobDet(){	
	try{
		 var fechaIni = $('#fechaIni').find('input').val();
		 var fechaFin = $('#fechaFin').find('input').val();
	 
		 
		 if(!vParam(fechaIni)){  
				noty({text: 'Seleccione fecha inicio', type:'error', timeout:7000}); 
				return false; 
		} 
		 
		 if(!vParam(fechaFin)){  
				noty({text: 'Seleccione fecha Fin', type:'error', timeout:7000}); 
				return false; 
		} 
		 
		var param = new Array();
		param.push({"name" : "key", "value" : 199});		 
		param.push({"name" : "fechaFin", "value" : fechaFin});
		param.push({"name" : "fechaIni", "value" : fechaIni}); 
		 
			appWait.showPleaseWait();
		 
			$.post("Session", param , function(data) {
				if(data.permiso){
					if(data.isSuccess){						
						 var form = $('<form method="post" class="fileDownloadForm" action="./Download">'); 
			                form.append($('<input type="hidden" name="nombre" value="' + data.nombre + '">')); 
			            form.on("submit", function (e) {
			                $.fileDownload($(this).prop('action'), {
			                    //preparingMessageHtml: "We are preparing your report, please wait...",
			                    //failMessageHtml: "There was a problem generating your report, please try again.",
			                    httpMethod: "POST",
			                    data: $(this).serialize()
			                });
			                e.preventDefault(); //otherwise a normal form submit would occur
			            });
			            form.submit();					
					} else {						
						alertify.error(data.msg);
					}
				} else {					
					alertify.warning(data.msg);
				}	    
			}).done(function() {
				appWait.hidePleaseWait();			
			}).fail(function(jqXHR, textStatus, errorThrown){
				appWait.hidePleaseWait();
				logException(jqXHR, textStatus, errorThrown);
			}).always(function(){
				appWait.hidePleaseWait();
			}); 
	} catch (e) {
		alert("Error "+e.name+": "+e.message);
	}
}

 

$(document).ready(function(){	
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
	
	 
	
	$("#btnDetalle").on('click', function(e){
		e.preventDefault();
		try{
			reporteIngGobDet();									
		} catch (e) {
			alert(e.name+": "+e.message);
		}
	});
 
 
});