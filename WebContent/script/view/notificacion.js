var table = null;
var table2 = null;


var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

$(document).ready(function(){	
var dayFin = new Date();
	var dayIni = new Date(dayFin.getFullYear(), dayFin.getMonth(), 1);
	var startDate = dayIni.format("dd/mm/yyyy");
	var endDate = dayFin.format("dd/mm/yyyy"); 
	
	$("#example-search").hide();
	
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
			try{ 
                self.setTimeout(function(){listadoOnDemmand(2)}, 300);
	         } catch (e) {
	                alert(e.name+": "+e.message);
	               
	         }
		}
	});			
	
  var yearDate = new Date().format('yyyy');
  $('#year').find('input').val(yearDate);
  $('#year').datepicker({
        format: ' yyyy',
        viewMode: 'years',
        minViewMode: 'years'
    }).on('changeDate', function(ev) { 
            $(this).datepicker('hide');
            try{
            	self.setTimeout(function(){listadoOnDemmand(1)}, 300);
	         } catch (e) {
	             alert(e.name+": "+e.message);
	         }
    });
	 
 
		  
$("#Notificaciones").submit(function( event ) {		
	event.preventDefault();
	try{
		var GRUPO =  $("#Xnotificacion").val(); 
		if(GRUPO =="" || GRUPO == null){
			alertify.warning("POR FAVOR INGRESE NOMBRE DEL GRUPO");
			$("#Xnotificacion").focus();
	 		return false;
		} 
		listadoOnDemmand(3);									
	} catch (e) {
		alert(e.name+": "+e.message);
	}
});
	

});

 

/*******************LISTA *********************/

function detalleTracking ( nTr, obj ){
	appWait.showPleaseWait();
	obj.disabled = true;
    var aData = table.fnGetData( nTr );
    var usuarios = aData[0];   
     
	var param = [{"name":"key", "value":40},
	             {"name":"keyParam", "value":usuarios}];
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){ 
				
				var sOut = '<table  class="tableDetU">'+
					' <tr><th>Nombre</th><th>User</th></tr>'; 
		 
				if(data.formulario.comboBox.length>0){
					$.each(data.formulario.comboBox, function(index, el) {
						sOut += "<tr>";
						sOut +="<td>"+el.nombre+"</td>"; 
						sOut +="<td>"+el.user+"</td>";
						sOut += "<tr>";
					}); 
				}else{
					sOut += "<tr>";
					sOut +="<td colspan='2' style='FONT-SIZE: 17px;font-weight: bold;text-align: center;'>NO SE ENCONTRARON REGISTROS</td>";
					sOut += "<tr>";
				}
			 
			    sOut += '</table>';
			    obj.disabled = false;
			    obj.src = "./img/details_close.png";		    
			    table.fnOpen( nTr, sOut, 'details' );
			}else{
				alertify.error("Error: "+data.msg+", Por favor intente mas tarde!!");
				obj.disabled = false;
				return false;
			}
		}else{
			alertify.warning("No tiene los permisos para consultar esta informacion!!");
			obj.disabled = false;
			return false;
		}
	}).fail(function( responseTxt,statusTxt,xhr ) {
		appWait.hidePleaseWait();
		obj.disabled = false;
		alertify.error("Error: "+xhr.status+": "+xhr.statusText); 
		return false;
	}).done(function(){
		appWait.hidePleaseWait();
	});   
}



function listadoOnDemmand(obj){ 
	try{	
		var yearID = $('#year').find('input').val(); 
		var fechaIni = $('#fechaIni').find('input').val();
		var fechaFin = $('#fechaFin').find('input').val();
		var grupo = $("#Xnotificacion").val();
		
		var param = new Array();
		param.push({"name" : "key", "value" : 0});		
		param.push({"name" : "filtro", "value" : obj});
		
		if(obj == 3){
			if(grupo != undefined && grupo !== "" && grupo.length > 0){
				param.push({"name" : "grupo", "value" : grupo});
			}
		}
		
		if(obj == 2){
			if(fechaIni != undefined && fechaIni !== "" && fechaIni.length > 0){
				if(fechaFin != undefined && fechaFin !== "" && fechaFin.length > 0){
				param.push({"name" : "fechaIni", "value" : fechaIni});
				param.push({"name" : "fechaFin", "value" : fechaFin});
				}
			}
		}
	   
		if(obj == 1){
			if(yearID != undefined && yearID !== "" && year.yearID > 0){
				param.push({"name" : "anio", "value" : yearID});
			}
		}
		
		appWait.showPleaseWait();
		
		if(table !== null){
			table.fnDestroy();
			table = null;
		}
		 
		table = $('#tbNotifica').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	        	aoData.push({"name": "key","value": 39});  
	            aoData.push({"name" : "filtro", "value" : obj});
	            aoData.push({"name" : "anio", "value" : yearID});
	            aoData.push({"name" : "fechaIni", "value" : fechaIni});
				aoData.push({"name" : "fechaFin", "value" : fechaFin});
				aoData.push({"name" : "grupo", "value" : grupo});
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
								alertify.error("Error: "+oaData.msg+", Por favor intente mas tarde!!");
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
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait();
	            $(".dataTables_filter").hide(); 
	            $('#listaNotificaciones').show();
	        },   
	        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
	        	$(nRow).find("td").eq(0).addClass('hide');
	            $(nRow).find("button").on("click", function(event) {
	                var nTr = $(this).parents('tr')[0];
	                if (table.fnIsOpen(nTr)) {
	                    this.src = "./img/details_open.png";
	                    table.fnClose(nTr);
	                } else {
	                    detalleTracking(nTr, this);
	                }
	            });
	        }, 
			"aoColumns": [
							{ "sWidth": "5%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "10%",  "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "30%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "10%", "sClass": "left",  "bSortable": true },
							{ "sWidth": "15%", "sClass": "left",  "bSortable": true }
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