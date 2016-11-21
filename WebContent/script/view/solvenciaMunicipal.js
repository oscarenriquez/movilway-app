var table = null; 


var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});


function resumen(matri,termi ) { 
	  
	if(table !== null){
		table.fnDestroy();
		table = null;
	}
	 
	 
	table = $('#tabla_solvenciaMuniDet').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 81});
            aoData.push({"name": "matri","value": matri});
            aoData.push({"name": "termi","value": termi});  
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
							alertify.warning(oaData.msg); 
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
        	$(".dataTables_filter").hide(); 
        	$("#tabla_solvenciaMuniDet_length select").css('color','#000000'); 
            $(".dataTables_processing").hide(); 
          
        },   
		"aoColumns": [   
				{ "sWidth": "20%","sClass": "center", "bSortable": false },
				{ "sWidth": "20%","sClass": "center", "bSortable": false },  
				{ "sWidth": "20%","sClass": "center", "bSortable": false },  
				{ "sWidth": "20%","sClass": "center", "bSortable": false },
				{ "sWidth": "10%","sClass": "right", "bSortable": false }, 
				{ "sWidth": "10%","sClass": "center", "bSortable": false },
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
 

function busqueda() {
	var matri =$("#matricula").val(); 
	var termi =$("#terminacion").val(); 
		
	if(!vParam(matri)){ 
		alertify.error('Ingerese Matricula');
		return  false;
	} 
	
	if(!vParam(termi)){ 
		alertify.error('Ingerese Terminacion'); 
		return  false;
	} 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 80});		 
	param.push({"name" : "matri", "value" : matri});
	param.push({"name" : "termi", "value" : termi});  
	 
	appWait.showPleaseWait(); 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
			 var df = new DecimalFormat("###,###,###.00");
					$("#matriculaSol").val(matri);  
					$("#terminaSol").val(termi);   
					$("#saldoVAgua").val("Q. "+df.format(data.aData.saldoVAgua));   
					$("#saldoVConvenio").val("Q. "+df.format(data.aData.saldoVConvenio));  
					$("#saldoCXM").val("Q. "+df.format(data.aData.saldoCXM));   
					$("#medidor").val( data.aData.medidor );  
					$("#ccosto").val( data.aData.ccosto );  
					$("#anexo").val(data.aData.anexo);  
					$("#direccion").val(data.aData.direccion);  
					$("#finca").val(data.aData.finca);   
					$("#folio").val(data.aData.folio);  
					$("#libro").val(data.aData.libro);   
					$("#saldototal").val("Q. "+df.format(data.aData.saldototal));  
					$("#saldoVencido").val("Q. "+df.format(data.aData.saldoVencido));  
					$("#saldoVenConvenio").val("Q. "+df.format(data.aData.saldoVenConvenio));  
					 
			 
				 $("#informacion").show();
				 $("#filtros").hide();
				  
			}else{
				alertify.error("Error: "+data.msg );  
				 $("#filtros-Seguimiento").show();
				 cabecera = null;
			}
		}else{
			alertify.warning("Advertencia: "+data.msg );
			 $("#filtros").show();
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		 $("#filtros").show();
		appWait.hidePleaseWait(); 
			logException(jqXHR, statusTxt, errorThrown); 
	 
		return false;
	}).always(function(){ 
		appWait.hidePleaseWait(); 
		setTimeout(function(){resumen(matri, termi );}, 300);  
	});
	
}


function clickReturn() {
	 
	buildForm(this,79,0); 
}


$(document).ready(function(){	
 
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	}
	
	$(window).resize(function() {
    	if (screen.width < 481) {
	    	$('div').each(function() {   
	    		$(this).removeClass('col-xs-12').removeClass('col-xs-6').removeClass('col-xs-4').removeClass('col-xs-3'); 
	    	}); 
	    } 
		    else {
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
});

 
 