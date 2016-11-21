var id = null; 
var oTable = null;
 

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});
 
 
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

function clickConsulta(anexoCon) { 
  
	if(oTable !== null){
		oTable.fnDestroy();
		oTable = null;
	}
	
	oTable = $('#tabla_revision').dataTable({  
		"bProcessing": true, 
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session",
        "aaSorting": [[1, 'desc']],
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
            aoData.push({"name": "key","value": 50});
            aoData.push({"name": "anexoCon","value": anexoCon});  
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
	        				$("#medidorR").val(oaData.medidor);
	        				$("#cCostoR").val(oaData.ccosto);
	        				$("#tcnfolR").val(anexoCon);
	        				$("#clienteR").val(oaData.cliente);
	        				
	        				$("#div-Contenido").show(); 
	        				
						}else{
							 appWait.hidePleaseWait();
							alertify.error("Error: "+oaData.msg+", Por favor intente mas tarde!!");
							clickReturn();
	        			}	
	        		}else{
	        			alertify.warning(oaData.msg);
	        			 appWait.hidePleaseWait();
	        			 clickReturn();
					}
                  
                },
                "error": function(jqXHR, textStatus, errorThrown) {
                	appWait.hidePleaseWait();
                    if (textStatus !== "abort") { 
                        alertify.error("Error: " + textStatus + ", Por favor intente mas tarde!!");  
                    }  
                    clickReturn();
                }
            });
        },
        "fnInitComplete": function(a, json) { 
        	$(".dataTables_filter").hide(); 
        	$("#tabla_revision_length select").css('color','#000000'); 
            $(".dataTables_processing").hide();
            appWait.hidePleaseWait();
        },  
        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
            $(nRow).find("img").on("click", function(event) {
                var nTr = $(this).parents('tr')[0];
                if (oTable.fnIsOpen(nTr)) {
                    this.src = "./img/signoMas.png";
                    oTable.fnClose(nTr);
                } else {
                    detalleRevision(nTr, this);
                }
            });
        }, 
		"aoColumns": [
				{ "sWidth": "5%","sClass": "center", "bSortable": false }, 
				{ "sWidth": "5%","sClass": "center", "bSortable": false },
				{ "sWidth": "23%","sClass": "center", "bSortable": false }, 
				{ "sWidth": "5%","sClass": "center", "bSortable": false },
				{ "sWidth": "7%","sClass": "center", "bSortable": false },
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
}

function detalleRevision(nTr, obj){
	var aData = oTable.fnGetData( nTr );
	var id = aData[1]; 
	
	if(id =="" || id == null){
		alertify.warning("ERROR AL RECUPERAR EL NUMERO DE REVISION.!!");
 		return false;
	}
	 
	  var param = new Array();
		param.push({"name" : "key", "value" : 52});		 
		param.push({"name" : "idRevision", "value" : id});  
		  
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
			    oTable.fnOpen( nTr, sOut, 'details' );
					  
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


function verOrden(orden) {
	var key = 57; 
	var logo2 = "LogoEMPAGUA-small.jpg";	
	var url = "jspReportes/reporte.jsp"; 
	var reportFileName = "otRevision";
	
	
	
	var abrir = window.open(url+"?key="+key+"&reportFileName="+reportFileName+"&p_orden="+orden+"&logo2="+logo2,
			"Reporte", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=650, height=400");
	abrir.window.focus();
}

$(document).ready(function(){
	
	var tcnfol = $("#tcnfolDefault").val();
	
	if(tcnfol !== 'null'  && tcnfol !== 'undefined'  && tcnfol !== null  && tcnfol !== undefined  && tcnfol !== ''){ 
		 setTimeout(function(){clickConsulta(tcnfol);}, 300);
		
	}else{
		alertify.error('Error al recuperar el Anexo');
		setTimeout(function(){clickReturn();}, 300);
		
	}
});