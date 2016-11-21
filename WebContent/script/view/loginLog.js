
var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});


$(document).ready(function(){
	$('#tablaLogin').dataTable({ 
	    "bProcessing": true,
		"bServerSide": true,
		"bJQueryUI": true,
		"bDestroy": true,
		"bFilter": false,
		"bLengthChange": false,
		//"bSort": false,
		"bInfo": false,
		"bAutoWidth": false,
		"sPaginationType": "full_numbers",
		"sAjaxSource": "Session?key=2",//c
		"aaSorting": [[0,'asc']],
		"fnInitComplete": function (oSettings, json){
			fallidos();
		},
		"aoColumns": [
						{ "sWidth": "25%","sClass": "left", "bSortable": true },
						{ "sWidth": "25%","sClass": "left", "bSortable": true },
						{ "sWidth": "25%","sClass": "left", "bSortable": true },
			  			{ "sWidth": "25%","sClass": "left", "bSortable": true }
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
});