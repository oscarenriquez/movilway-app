var tableFichas = null;
var tableEstrategia = null;
var idFicha = null;
 var fileF1 = null;
 var fileF2 = null;
 var fileF3 = null;
 var fileF4 = null;
 var cambioL = null;
 var fotoByte = null;

var dosMinutos = 240000;
$.ajaxSetup({
    type: "POST",
    timeout: dosMinutos,
    async: true
});

function validarEntero(e){
	  var keynum = window.event ? window.event.keyCode : e.which;
  if ((keynum == 8 || keynum == 48))
      return true;
  if (keynum <= 47 || keynum >= 58) return false;
  return /\d/.test(String.fromCharCode(keynum));
}
 
function llenaComboMotTrabajos() { 
	var noExiste = "<option value=''>No existen Informacion</option> "; 
	 var param = new Array();
		param.push({"name" : "key", "value" : 136});		 
		param.push({"name" : "tipo", "value" :"P"});
		
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){   
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#motTrabajo").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> "); 
						}else{
							$("#motTrabajo").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> "); 
						}
					});
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
		$('#motTrabajo').selectmenu('refresh'); 
	}); 
}

function cambioAlcantarillado() {
	
	if($("#checkAlcanta2").is(":checked")){   	 
		cambioL = 1;
		 
		$("#div-TFichaje").hide(); 
		$("#btnGuardarFichaje").hide();
		$("#btnAntTrabajo").hide();
		$("#btnAntAlcan").show();   
		$("#btnAlcantaNext").show();   
		$("#btnGuardarFichajeAlcanta").show(); 
		 
		
	}else{
		cambioL = null;
		$("#btnGuardarFichaje").show();
		$("#btnAntTrabajo").show();
		$("#btnAlcantaNext").hide();
		$("#btnAntAlcan").hide();  
		$("#btnGuardarFichajeAlcanta").hide(); 
		$("#div-TFichaje").show(); 
	}
	
	 
}

/****
 * guardarFichaje
 * **/

function guardarFichaje() { 
		try{
			
			var nombre = 	$("#nombre").val();
			var direccion = 	$("#direccion").val();
			var medidor = 	$("#medidor").val();
			var tomaLecP = 	$("#tomaLec").val();
			var estadoMed = 	$("#cmbEstadoMed").val();
			var medidorIP = 	$("#medidorI").val();
			var medidorDP = 	$("#medidorD").val();
			var nombreEnP = 	$("#nombreEn").val();
			var tipoContacto = 	$("#cmbContactoT").val();
			var contactoP = 	$("#contacto").val();
			var emailP = 	$("#email").val();
			var tipoSObser = 	$("#obserTipo").val(); 
			var prioriCheck = 0;
			
			var lecMedidorIP = 	$("#leMedidorI").val();
			var lecMedidorDP = 	$("#leMedidorD").val();
			var cantCisternaE  = 	0;
			var cantCcisternaS = 	0; 
			var cantCisternaEAl  = 	0;
			var cantCcisternaSAl = 	0; 
			
			
			var sueloDeshabitado = 	0;
			var sueloHabitado = 	0;
			var sueloBaldio = 	0;
			var sueloConstruccion = 	0;
			var noHabitantes = 	0;
			var noTrabajadores = 	0; 
		
			var tipoSFracionamiento = 	0;
			var tipoSVivienda = 	0;
			var tipoSUnifamiliar = 	0;
			var tipoSNivelVivienda = 	0;
			var tipoSCondominio = 	0;
			var tipoSConVertical = 	0;
			var tipoSConHorizontal = 	0;
			var tipoSComercio = 	0; 
			var tipoSComLocales = 	0;
			var tipoSComCantLocales = 	0;
			var tipoSComServicios = 	0;
			var tipoSComAlmtos = 	0;
			var tipoSIndustria = 	0;
			var tipoSOtros = 	0; 
			var abasEMPAGUA = 	0;
			var abasMARISCAL = 	0;
			var abasCandelaAl = 	0;
			var abasPlantaAl  = 	0; 
			var abasPipas = 	0;
			var abasPozo = 	0; 		
			var almaCisternaTipo = 	0;
			var almaCisternaCant = 	0;
			var almaToneles = 	0;
			var almaTonelesCant = 	0;
			var servSanitarios = 	0; 
			var servLavamanos = 	0; 
			var servLavaplatos = 	0; 
			var servDuchas = 	0; 
			var servChorros = 	0; 
			var servLavadora = 	0; 
			var servPila = 	0; 
			var servPiscina = 	0; 
			var servJardin = 	0;   
			var servMtJardin = 	0;   
			
			//alcantarillado 2
			var abasEMPAGUAAl = 	0;
			var abasMARISCALAl = 	0;
			var abasCandelaAlCA = 	0;
			var abasPlantaAlCA  = 	0;
			var abasPozoAbAl  = 	0;
			var abasPozoAbAlCant  = 	0;
			var almaCisternaTipoAl = 	0;
			var almaCisternaCantAl = 	0;
			var almaTonelesAl = 	0;
			var almaTonelesCantAl = 	0;
			var obser2 =  $("#obserTipoAl").val();
			var tomaLec =  $("#tomaLecAl").val();
			var estadoMedAl =  $("#cmbEstadoMedAl").val();
			   
			 
			  if(vParamM(tomaLecP)){
						if(!isNumberM(tomaLecP)){
							noty({text:'la toma de lectura debe ser numerica', type:'error', timeout:5000});
							$("#tomaLec").focus();
							return false;
						}
					} 
			
			  if(vParamM(medidorIP)){
					if(!isNumberM(medidorIP)){
						noty({text:'El medidor izquierdo debe ser numerico', type:'error', timeout:5000});
						return false;
					}
				} 	
				
			 if(vParamM(medidorDP)){
					if(!isNumberM(medidorDP)){
						noty({text:'El medidor derecho debe ser numerico', type:'error', timeout:5000});
						return false;
					}
				} 
					
			 if(vParamM(tipoContacto)){  
				 if(!vParamM(contactoP)){  
						noty({text: "Ingrese contacto, o no seleccione tipo de contacto", type:'error', timeout:7000}); 
						return false; 
				} 
			} 
			 
			if($("#habitadoNo").is(":checked")){  
				sueloDeshabitado = "D";
			}else {
				if($("#habitadoSi").is(":checked")){  
					sueloHabitado = "H";
					 
				}else{
					if($("#baldio").is(":checked")){  
						sueloBaldio = "B";
					}else{
						if($("#rConstruccion").is(":checked")){  
							sueloConstruccion = "E"; 
						}else{
							noty({text: "Por favor seleccione un uso de suelo", type:'error', timeout:5000});
							return false;
						}
					}
				}
			}
			 
			
			if($("#fracionaCheck").is(":checked")){  
				tipoSFracionamiento = 1;
			}
			 
			
			if($("#prioriCheck").is(":checked")){  
				prioriCheck = 1;
			}
			
			var abasCandelaAlCa = $("#checkCandelaAl").val();
			abasCandelaAl = 	$("#checkCandelaAbas").val();
			
			if($("#checkPlantaTAbas").is(":checked")){  
				abasPlantaAl = 1;
			}
			 
			
			if($("#viviendaCheck").is(":checked")){  
				if($("#rUnifami").is(":checked")){  
					
					tipoSVivienda = 1;
					tipoSUnifamiliar = 1;
					tipoSNivelVivienda = $("#cmbUnifamiliar").val();
						
					if(!vParamM(tipoSNivelVivienda)){
						noty({text: "Por favor ingrese No Niveles de la vivienda!", type:'error', timeout:5000});
						return false;
					}
				}else{
					if($("#rCondominio").is(":checked")){ 
						tipoSCondominio = 1;
						
						if($("#cVertical").is(":checked")){  
							tipoSConVertical = 1;
							tipoSVivienda = 1;
							tipoSNivelVivienda = $("#cmbCVertical").val();
							
							if(!vParamM(tipoSNivelVivienda)){
								noty({text: "Por favor ingrese No Niveles del Condominio!", type:'error', timeout:5000});
								return false;
							}
						}else{
							if($("#cHorizontal").is(":checked")){  
								tipoSConHorizontal = 1;
								tipoSVivienda = 1;
								tipoSNivelVivienda = $("#cmbCHorizontal").val();
							
								if(!vParamM(tipoSNivelVivienda)){
									noty({text: "Por favor ingrese No Niveles del Condominio!", type:'error', timeout:5000});
									return false;
								}
							}else{
								noty({text: "Por favor seleccione tipo de Condominio", type:'error', timeout:5000});
								 return false;
							}
						}
					} 
				}
			}
			
			
			if($("#comercioCheck").is(":checked")){  
				tipoSComercio = 	1;
				tipoSComLocales = $("#cmbLocales").val();
				
				if( tipoSComLocales ==='3' || tipoSComLocales === 3 ){
					tipoSComCantLocales = $("#cantLocales").val();
					
					if(vParamM(tipoSComCantLocales)){
						if(!isNumberM(tipoSComCantLocales)){
							noty({text:'Cantidad de locales no valido', type:'error', timeout:5000});
							return false;
						}
					}else{
						noty({text: "Por favor Ingrese cant. locales", type:'error', timeout:5000});
						return false;
					}
					
				}
				
				tipoSComServicios = $("#cmbServicio").val();
				tipoSComAlmtos = $("#cmbAlimentos").val();
				
			}
			
			if($("#checkIndustria").is(":checked")){  
				tipoSIndustria =  $("#cmbIndustria").val();
				
				if(!vParamM(tipoSIndustria)){
					noty({text: "Por favor seleccione Tipo de industria", type:'error', timeout:5000});
					return false;
				}
			}
			 
			if($("#checkOtros").is(":checked")){  
				tipoSOtros =  $("#cmbOtros").val();
				
				if(!vParamM(tipoSOtros)){
					noty({text: "Por favor seleccione otros servicios", type:'error', timeout:5000});
					return false;
				}
			}
			
			if($("#checkEmpaAbas").is(":checked")){  
				abasEMPAGUA = 	1; 
			}

			if($("#checkMarisAbas").is(":checked")){  
				abasMARISCAL = 	1;
			}
			
			if($("#checkPipaAbas").is(":checked")){  
				abasPipas = 	1; 
			}
			
			if($("#checkPozoAbas").is(":checked")){  
				abasPozo = 	1;
			}
	 
			/*
			if($("#checkCisterAl").is(":checked")){  
				almaCisternaTipo =  $("#tipoCisterna").val();
				almaCisternaCant =  $("#cantCisterna").val();
				
				if(!vParamM(almaCisternaTipo)){
					noty({text: "Por favor seleccione tipo de cisterna", type:'error', timeout:5000});
					return false;
				}
				
				if(!vParamM(almaCisternaCant)){
					noty({text: "Por favor ingrese cant. de cisternas", type:'error', timeout:5000});
					return false;
				}
			}*/
			
			cantCisternaE   =  $("#cisternaE").val();
			cantCcisternaS  =  $("#cisternaS").val();
			cantCisternaEAl   =  $("#cisternaEAl").val();
			cantCcisternaSAl  =  $("#cisternaSAl").val();
			
			if($("#checkTonel").is(":checked")){  
				almaToneles = 	1;
				almaTonelesCant =  $("#cantToneles").val();
				
				if(!vParamM(almaTonelesCant)){
					noty({text: "Por favor ingrese cant. de Toneles", type:'error', timeout:5000});
					return false;
				}
			}
			 
	 
			servSanitarios =  $("#checkSanitario").val();
			servLavamanos =  $("#checkLavama").val(); 
			servLavaplatos =  $("#checkLavaP").val();
			servDuchas =  $("#checkDuchas").val();
			servChorros =  $("#checkChorros").val();
			servLavadora =  $("#checkLavadora").val();
			servPila =  $("#checkPila").val();
			servPiscina =  $("#checkPiscina").val(); 
			
			if($("#checkJardin").is(":checked")){  
				servJardin = 	1;
				servMtJardin =  $("#mtJardin").val();
				
				if(!vParamM(servMtJardin)){
					noty({text: "Por favor ingrese mts de jardin", type:'error', timeout:5000});
					return false;
				}
			} 
			 
			
			var motTrabajo = 	$("#motTrabajo").val(); 
			var trabajoAsig = 	$("#trabajoAsig").val(); 
			var obserTrabajo = 	$("#obserTrabajo").val(); 
			
			if(trabajoAsig ==="0"){
				trabajoAsig = "";
			} 
			
			if(vParamM(trabajoAsig) && trabajoAsig != '0'){ 
				if(!vParamM(motTrabajo) || motTrabajo === '0'){ 
					noty({text: "Por favor seleccione motivo de Trabajo!", type:'warning', timeout:7000});
					return false;
				} 
				 
			} 
			 
		
 
			var param = new Array();
			param.push({"name" : "key", "value" : 133});
			param.push({"name" : "motivoId", "value" : motTrabajo});
			param.push({"name" : "trabajoId", "value" : trabajoAsig});
			param.push({"name" : "obserTras", "value" : obserTrabajo});
			param.push({"name" : "keyFicha", "value" : idFicha});
			param.push({"name" : "prioridad", "value" : prioriCheck});
			
			//para saber si cambia a alcantarillado
			param.push({"name" : "cambioFiAl", "value" : cambioL});
			param.push({"name" : "clienteNom", "value" : nombre});
			param.push({"name" : "direccion", "value" : direccion});
			param.push({"name" : "medidor", "value" : medidor}); 
			param.push({"name" : "tomaLecP", "value" : tomaLecP});
			param.push({"name" : "estadoMed", "value" : estadoMed});
			param.push({"name" : "medidorIP", "value" : medidorIP});		 
			param.push({"name" : "medidorDP", "value" : medidorDP});
			param.push({"name" : "nombreEnP", "value" : nombreEnP});
			param.push({"name" : "tipoContacto", "value" : tipoContacto});
			param.push({"name" : "contactoP", "value" : contactoP});		 
			param.push({"name" : "emailP", "value" : emailP});
			param.push({"name" : "sueloHabitado", "value" : sueloHabitado});
			param.push({"name" : "sueloDeshabitado", "value" : sueloDeshabitado});		 
			param.push({"name" : "sueloBaldio", "value" : sueloBaldio});
			param.push({"name" : "sueloConstruccion", "value" : sueloConstruccion});
			param.push({"name" : "noHabitantes", "value" : noHabitantes});
			param.push({"name" : "noTrabajadores", "value" : noTrabajadores}); 
			param.push({"name" : "tipoSFracionamiento", "value" : tipoSFracionamiento});
			param.push({"name" : "tipoSVivienda", "value" : tipoSVivienda});
			param.push({"name" : "tipoSUnifamiliar", "value" : tipoSUnifamiliar});
			param.push({"name" : "tipoSNivelVivienda", "value" : tipoSNivelVivienda});
			param.push({"name" : "tipoSCondominio", "value" : tipoSCondominio});
			param.push({"name" : "tipoSConVertical", "value" : tipoSConVertical});
			param.push({"name" : "tipoSConHorizontal", "value" : tipoSConHorizontal});  
			param.push({"name" : "tipoSComercio", "value" : tipoSComercio});
			param.push({"name" : "tipoSComLocales", "value" : tipoSComLocales});
			param.push({"name" : "tipoSComCantLocales", "value" : tipoSComCantLocales});
			param.push({"name" : "tipoSComServicios", "value" : tipoSComServicios});
			param.push({"name" : "tipoSComAlmtos", "value" : tipoSComAlmtos});
			param.push({"name" : "tipoSIndustria", "value" : tipoSIndustria});
			param.push({"name" : "tipoSOtros", "value" : tipoSOtros});
			param.push({"name" : "tipoSObser", "value" : tipoSObser});
			param.push({"name" : "abasEMPAGUA", "value" : abasEMPAGUA});
			param.push({"name" : "abasMARISCAL", "value" : abasMARISCAL}); 
			param.push({"name" : "abasPipas", "value" : abasPipas});
			param.push({"name" : "abasPozo", "value" : abasPozo});
			param.push({"name" : "almaCisternaTipo", "value" : almaCisternaTipo});
			param.push({"name" : "almaCisternaCant", "value" : almaCisternaCant});
			param.push({"name" : "almaToneles", "value" : almaToneles});
			param.push({"name" : "almaTonelesCant", "value" : almaTonelesCant});
			param.push({"name" : "servSanitarios", "value" : servSanitarios});
			param.push({"name" : "servLavamanos", "value" : servLavamanos});
			param.push({"name" : "servLavaplatos", "value" : servLavaplatos});
			param.push({"name" : "servDuchas", "value" : servDuchas});
			param.push({"name" : "servChorros", "value" : servChorros});
			param.push({"name" : "servPila", "value" : servPila});
			param.push({"name" : "servPiscina", "value" : servPiscina});
			param.push({"name" : "servJardin", "value" : servJardin});
			param.push({"name" : "servMtJardin", "value" : servMtJardin});
			param.push({"name" : "servLavadora", "value" : servLavadora});
			param.push({"name" : "candelas", "value" : abasCandelaAl});
			param.push({"name" : "plantaTrata", "value" : abasPlantaAl}); 
		 //ALCANTARILLADO
			param.push({"name" : "lectura", "value" : tomaLec});
			param.push({"name" : "estMedAlcanta", "value" : estadoMedAl});
			param.push({"name" : "empagua", "value" : abasEMPAGUAAl});
			param.push({"name" : "mariscal", "value" : abasMARISCALAl});
			param.push({"name" : "candelas", "value" : abasCandelaAlCA});
			param.push({"name" : "plantaTrata", "value" : abasPlantaAlCA});
			param.push({"name" : "pozoAbs", "value" : abasPozoAbAl});
			param.push({"name" : "cantPozoAbs", "value" : abasPozoAbAlCant});
			param.push({"name" : "cisTipo", "value" : almaCisternaTipoAl});
			param.push({"name" : "cisCant", "value" : almaCisternaCantAl});
			param.push({"name" : "toneles", "value" : almaTonelesAl});
			param.push({"name" : "cantToneles", "value" : almaTonelesCantAl});
			param.push({"name" : "obser2", "value" : obser2});
			param.push({"name" : "candels", "value" : abasCandelaAlCa});
			param.push({"name" : "plantaTrata", "value" : abasPlantaAl});
			param.push({"name" : "pozoAbs", "value" : abasPozoAbAl});
			param.push({"name" : "cantPozoAbs", "value" : abasPozoAbAlCant});
			param.push({"name" : "candelasVis", "value" : abasCandelaAl});
			param.push({"name" : "plantTratam", "value" : abasPlantaAl});
			param.push({"name" : "pozoAbsor", "value" : abasPozoAbAl});
			param.push({"name" : "pozoAbsCant", "value" : abasPozoAbAlCant});
			param.push({"name" : "observa2", "value" : obser2});
			//fotos
		/*	var imgData1 = JSON.stringify(fileF1);
			var imgData2 = JSON.stringify(fileF2);
			var imgData3 = JSON.stringify(fileF3);
			var imgData4 = JSON.stringify(fileF4);
			var imgData5 = JSON.stringify(fileF5);
			
			param.push({"name" : "pFoto1", "value" : imgData1});
			param.push({"name" : "pFoto2", "value" : imgData2});
			param.push({"name" : "pFoto3", "value" : imgData3});
			param.push({"name" : "pFoto4", "value" : imgData4}); 
			//fotos Alcantarillado 2
			param.push({"name" : "pFoto5", "value" : imgData5}); */
			
			param.push({"name" : "lecMedIzq", "value" : lecMedidorIP});		 
			param.push({"name" : "lecMedDer", "value" : lecMedidorDP});
			param.push({"name" : "almaCisternaEle", "value" : cantCisternaE});
			param.push({"name" : "almaCisternaSub", "value" : cantCcisternaS});
			param.push({"name" : "cisElev", "value" : cantCisternaEAl});
			param.push({"name" : "cisSubt", "value" : cantCcisternaSAl});
			
			
			 
			var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de guardar el Ruteo ?";
			  
			
			alertify.confirm(msjConfirm, function (e) {
				if (e) { 
					
					//appWait.showPleaseWait();
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
							logException(jqXHR, textStatus, errorThrown); 
						return false;
					}).always(function(){
						//appWait.hidePleaseWait();   
						$("#btnCancelar").trigger("click");  
					});
				  } else {
						return false;   
						}
					});
			
		} catch (e) {
			 
			alert(e.name+": "+e.message);
		}
		
	}

function llenaComboTrabajos() { 
	var noExiste = "<option value=''>No existen Informacion</option> "; 
	var param = new Array();
	param.push({"name" : "key", "value" : 102});		 
	param.push({"name" : "clasifi", "value" :"C"});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){   
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#trabajoAsig").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> "); 
						}else{
							$("#trabajoAsig").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> "); 
						}
					});
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
		$('#trabajoAsig').selectmenu('refresh'); 
	}); 
}


function llenaCmbOtros() {
 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	var param = new Array();
	param.push({"name" : "key", "value" : 126});		 
	param.push({"name" : "tipoUso", "value" : 5});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbOtros").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbOtros").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#cmbOtros").append(noExiste); 
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
		$('#cmbOtros').selectmenu('refresh');
	}); 
}

function llenaCmbIndustria() { 
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	var param = new Array();
	param.push({"name" : "key", "value" : 126});		 
	param.push({"name" : "tipoUso", "value" : 3});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbIndustria").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbIndustria").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#cmbIndustria").append(noExiste); 
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
		$('#cmbIndustria').selectmenu('refresh');
	}); 
}

function llenaCmbAlimentos() {
 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	var param = new Array();
	param.push({"name" : "key", "value" : 126});		 
	param.push({"name" : "tipoUso", "value" : 2});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbAlimentos").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbAlimentos").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#cmbAlimentos").append(noExiste); 
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
		$('#cmbAlimentos').selectmenu('refresh');
	}); 
}

function llenaCmbServicio() {
 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	var param = new Array();
	param.push({"name" : "key", "value" : 126});		 
	param.push({"name" : "tipoUso", "value" : 4});
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){ 
					
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbServicio").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbServicio").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#cmbServicio").append(noExiste); 
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
		$('#cmbServicio').selectmenu('refresh');
	}); 
}
 

function llenaCmbLocales() {
	//comercio
  	var param = new Array();
	param.push({"name" : "key", "value" : 126});		 
	param.push({"name" : "tipoUso", "value" : 1});
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbLocales").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbLocales").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#cmbLocales").append(noExiste); 
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
		$('#cmbLocales').selectmenu('refresh');
	}); 
}


function llenaCmbCantidades() {	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	
	
	$.post("./Session", {"key": 124}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBoxCant.length>0){  
					
					$.each(data.formulario.comboBoxCant, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbNoHabitantes").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cmbNoTrabajadores").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantPipas").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantPipasAl").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantCisterna").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantCisternaAl").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantToneles").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantTonelesAl").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cantPozoAbAl").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbNoHabitantes").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cmbNoTrabajadores").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantPipas").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantPipasAl").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantCisterna").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantCisternaAl").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantToneles").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantTonelesAl").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cantPozoAbAl").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					}); 
					 
				}else{
					$("#cmbNoHabitantes").append(noExiste);
					 $("#cmbNoTrabajadores").append(noExiste);
					 $("#cantPipasAl").append(noExiste);
					 $("#cantPipas").append(noExiste);
					 $("#cantCisterna").append(noExiste);
					 $("#cantCisternaAl").append(noExiste);
					 $("#cantToneles").append(noExiste);
					 $("#cantTonelesAl").append(noExiste);
					 $("#cantPozoAbAl").append(noExiste);
					 
				}
				
				if(data.formulario.comboBoxNivel.length>0){  
					
					$.each(data.formulario.comboBoxNivel, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbUnifamiliar").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cmbCVertical").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cmbEstadoMed").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbUnifamiliar").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cmbCVertical").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cmbCHorizontal").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
					
				}else{
					
					 $("#cmbUnifamiliar").append(noExiste);
					 $("#cmbCVertical").append(noExiste);
					 $("#cmbCHorizontal").append(noExiste);
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
		$('#cmbUnifamiliar').selectmenu('refresh');
		$('#cmbCVertical').selectmenu('refresh');
		$('#cmbCHorizontal').selectmenu('refresh');
		$("#cmbNoHabitantes").selectmenu('refresh');
		 $("#cmbNoTrabajadores").selectmenu('refresh');
		 $("#cantPipas").selectmenu('refresh');
		 $("#cantCisterna").selectmenu('refresh');
		 $("#cantCisternaAl").selectmenu('refresh');
		 $("#cantToneles").selectmenu('refresh');
		 $("#cantTonelesAl").selectmenu('refresh');
		 $("#cantPozoAbAl").selectmenu('refresh');
		 
	}); 
}

function llenaCmbTipoContacto() {  
	var noExiste = "<option value=''>No existen Informacion</option> "; 
	$.post("./Session", {"key": 122}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbContactoT").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbContactoT").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{ 
					 $("#cmbContactoT").append(noExiste); 
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
		$('#cmbContactoT').selectmenu('refresh');
	}); 
}

function llenaComboEstadosMed() { 
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	
	$.post("./Session", {"key": 123}, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){   
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#cmbEstadoMed").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
							$("#cmbEstadoMedAl").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#cmbEstadoMed").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
							$("#cmbEstadoMedAl").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#cmbEstadoMed").append(noExiste);
					 $("#cmbEstadoMedAl").append(noExiste);
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
		$('#cmbEstadoMed').selectmenu('refresh');
		$('#cmbEstadoMedAl').selectmenu('refresh');
	}); 
}

function nextPanel(panelOcultar, panelMostrar) {
	switch (panelOcultar) {
	case "filaDos":
		var tomaLecP = $("#tomaLec").val();
		var medidorIP = $("#medidorI").val();
		var medidorDP = $("#medidorD").val();
		var estadoMed = $("#cmbEstadoMed").val();
		
		 if(vParamM(tomaLecP)){
				if(!isNumberM(tomaLecP)){
					noty({text:'la toma de lectura debe ser numerica', type:'error', timeout:5000});
					$("#tomaLec").focus();
					return false;
				}
			}  
		 
		 if(vParamM(medidorIP)){
				if(!isNumberM(medidorIP)){
					noty({text:'El medidor izquierdo debe ser numerico', type:'error', timeout:5000});
					$("#medidorI").focus();
					return false;
				}
			} 	
			
		 if(vParamM(medidorDP)){
				if(!isNumberM(medidorDP)){
					noty({text:'El medidor derecho debe ser numerico', type:'error', timeout:5000});
					$("#medidorD").focus();
					return false;
				}
			} 
		 
		 if(!vParamM(estadoMed) && estadoMed =="0"){  
				noty({text: "Seleccione estado del medidor", type:'error', timeout:7000}); 
				$("#contacto").focus();
				return false; 
		}
		break;
	case "filaTres":
		var tipoContacto = $("#cmbContactoT").val();
		var contactoP = $("#contacto").val();
		var email = $("#email").val();
		
		 if(vParamM(tipoContacto)){  
			 if(!vParamM(contactoP) || contactoP =="0"){  
					noty({text: "Ingrese contacto, o no seleccione tipo de contacto", type:'error', timeout:7000}); 
					$("#contacto").focus();
					return false; 
			}else{
				if(!isNumberM(contactoP)){
					noty({text:'El numero de contacto debe ser numerico', type:'error', timeout:5000});
					$("#contacto").focus();
					return false;
				}
			}
		} 
		 
		 if(vParamM(email)){
				if(!isEmailM(email)){
					noty({text:'El E-mail no es correcto', type:'error', timeout:5000});
					$("#email").focus();
					return false;
				}
			}
		 
		break;
	case "filaCuarta":
		 if(!$("#habitadoNo").is(":checked")){  
			 if(!$("#habitadoSi").is(":checked")){   
					if(!$("#baldio").is(":checked")){  
						if(!$("#rConstruccion").is(":checked")){   
							noty({text: "Por favor seleccione un uso de suelo", type:'error', timeout:5000});
							return false;
						}
					} 
				}
		 }			 
	break;
	case "filaQuinta":
		if($("#viviendaCheck").is(":checked")){  
			if($("#rUnifami").is(":checked")){  
				 
				var tipoSNivelVivienda = $("#cmbUnifamiliar").val();
					
				if(!vParamM(tipoSNivelVivienda) && tipoSNivelVivienda =="0"){
					noty({text: "Por favor seleccione Niveles de la vivienda!", type:'error', timeout:5000});
					return false;
				}
			}else{
				if($("#rCondominio").is(":checked")){  
					if($("#cVertical").is(":checked")){   
						var tipoSNivelVivienda = $("#cmbCVertical").val();
						
						if(!vParamM(tipoSNivelVivienda)  && tipoSNivelVivienda =="0"){
							noty({text: "Por favor seleccione Niveles del Condominio!", type:'error', timeout:5000});
							return false;
						}
					}else{
						if($("#cHorizontal").is(":checked")){ 
							tipoSNivelVivienda = $("#cmbCHorizontal").val();
						
							if(!vParamM(tipoSNivelVivienda)  && tipoSNivelVivienda =="0"){
								noty({text: "Por favor seleccione Niveles del Condominio!", type:'error', timeout:5000});
								return false;
							}
						}else{
							noty({text: "Por favor seleccione tipo de Condominio", type:'error', timeout:5000});
							 return false;
						}
					}
				}else{
					noty({text: "Por favor seleccione tipo de vivienda", type:'error', timeout:5000});
					 return false;
				}
			}
		}
		
		if($("#comercioCheck").is(":checked")){   
			var tipoSComLocales = $("#cmbLocales").val();
			var tipoSComServicios = $("#cmbServicio").val();
			var tipoSComAlmtos = $("#cmbAlimentos").val();
			
			if(vParamM(tipoSComLocales)){
				if( tipoSComLocales ==='3' || tipoSComLocales === 3 ){
					var cantLocales = $("#cantLocales").val();
					
					if(vParamM(cantLocales)){
						if(!isNumberM(cantLocales)){
							noty({text:'Cantidad de locales no valido', type:'error', timeout:5000});
							return false;
						}
					}else{
						noty({text: "Por favor Ingrese cant. locales", type:'error', timeout:5000});
						return false;
					}
					
				}
			}else{
				if(!vParamM(tipoSComServicios)){
					if(!vParamM(tipoSComAlmtos) && tipoSComAlmtos =="0"){
						noty({text: "Por favor seleccione el o los tipos de comercio", type:'error', timeout:5000});
						return false;
					}
				}
			} 
		}
		
		if($("#checkIndustria").is(":checked")){  
			var tipoSIndustria =  $("#cmbIndustria").val();
			
			if(!vParamM(tipoSIndustria) && tipoSIndustria =="0"){
				noty({text: "Por favor seleccione Tipo de industria", type:'error', timeout:5000});
				return false;
			}
		}
		 
		if($("#checkOtros").is(":checked")){  
			var tipoSOtros =  $("#cmbOtros").val();
			
			if(!vParamM(tipoSOtros) && tipoSOtros =="0"){
				noty({text: "Por favor seleccione otros servicios", type:'error', timeout:5000});
				return false;
			}
		}
	break;
	default:
		break;
	}
	
	$("#"+panelMostrar).show();
	$("#"+panelOcultar).hide();
}

//radio-Button
function mostrarContenido(panelOcultar, panelMostrar, inputVal) {
	
	if(panelMostrar !== '0'){
		$("#"+panelMostrar).show();	
		
		if(inputVal !== '0'){
			$("#"+inputVal).val('1');
		}
		
	} else{
		if(inputVal !== '0'){
			$("#"+inputVal).val('');	
		}	
		
	}
	
	var param = panelOcultar.split("|");  
	if(param.length > 0){
		for (i = 0; i < param.length; i++) {
			$("#"+param[i]).hide();	
		}
	} 
	 
}

//Check-nbox
function mostrarConteCheck(nameCheck, panelContenido, inputVal) { 
	if($("#"+nameCheck).is(":checked")){   	 
		$("#"+panelContenido).show();	
		if(inputVal !== '0'){
			$("#"+inputVal).val('1');
		}
	}else{
		$("#"+panelContenido).hide();
		
		if(inputVal !== '0'){
			$("#"+inputVal).val('');	
		}
		
		if(nameCheck =="viviendaCheck"){
			$("#conte-Condominio").hide();
			$("#vertical-cmb").hide();
			$("#hori-cmb").hide();
		}
	}
	
	
}




/******************/

function guardaFotoBean(nFoto) {
	var imgData1 = JSON.stringify(fotoByte); 
	var tipoF =  $('#imgF'+nFoto).attr('data-extencion'); 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 195});
	param.push({"name" : "idFicha", "value" : 1});
	param.push({"name" : "pFoto", "value" : imgData1});
	param.push({"name" : "tipo", "value" : tipoF}); 
	 
 
	
			$.post("./Session", param, function(data){
				if(data.permiso){
					if(data.isSuccess){   
						   
						$('#imgF'+nFoto).attr('data-id', data.idFoto);
					}else{
						$('#imgF'+nFoto).attr('data-extencion', '');
						$('#imgF'+nFoto).attr('data-id', '');  
					}
				}else{
					 
				}
			}).fail(function( jqXHR, textStatus, errorThrown ) {  
				appWait.hidePleaseWait(); 
					logException(jqXHR, textStatus, errorThrown); 
					return false;
			}).always(function(){
				 
			});
}
 
function visualizaIMG(files, nFoto) { 
	
	var file = files[0];
	var reader = new FileReader();
	var tipoF = null;
	 fotoByte = null;
	 
	reader.onload = function (e) {    
		 $('#imgF'+nFoto).attr('src',e.target.result);  
		 $('#div-imgF'+nFoto).show();
		
		 fotoByte = e.target.result;

		 switch (nFoto) {
			case 1:
				 fileF1 =e.target.result;	
				 tipoF = "F" ;  
				break;
			case 2:
				 fileF2 = e.target.result;	
				 tipoF = "F" ;
				break;
			case 3:
				 fileF3 =e.target.result;
				 tipoF = "F" ;
				break;
			case 4:
				 fileF4 = e.target.result;
				 tipoF = "F" ;
				break;
			case 5:
				 fileF5 =e.target.result;
				 tipoF = "A" ;
				break;
			case 6:
				 fileF6 = e.target.result;	
				 tipoF = "A" ;	
				break;
			case 7:
				 fileF7 = e.target.result;	
				 tipoF = "A" ;
				break;
			case 8:
				 fileF8 = e.target.result;
				 tipoF = "A" ;
				break;
			default:
				break;
			}
		 
		 $('#imgF'+nFoto).attr('data-extencion', tipoF); 
		
	}
	
	if(file !== null && file !== undefined && file !== ""){
		reader.readAsDataURL(file); 
		setTimeout(function(){guardaFotoBean(nFoto);}, 500); 
	}
 
	  
}

function limpiarFoto(nFoto) {
	$("#imgF"+nFoto).attr('src', "");
	//$("#foto"+nFoto).replaceWith($("#foto1").clone());
	$("#div-imgF"+nFoto).hide();
	 switch (nFoto) {
		case 1:
			 fileF1 =null;		
			break;
		case 2:
			 fileF2 = null;	
			break;
		case 3:
			 fileF3 = null;		
			break;
		case 4:
			 fileF4 = null;	
			break;
		case 5:
			 fileF5 =null;
			 ruta5 =null;	
			break;
		case 6:
			 fileF6 = null;	
			 ruta6 =null;	
			break;
		case 7:
			 fileF7 = null;	
			 ruta7 =null;	
			break;
		case 8:
			 fileF8 = null;
			 ruta8 =null;	
			break;
		default:
			break;
		}
	 
	 var idFoto = $('#imgF'+nFoto).attr('data-id');
	 var tipoF = $('#imgF'+nFoto).attr('data-extencion');
	 
	 var param = new Array();
		param.push({"name" : "key", "value" : 196});
		param.push({"name" : "tipo", "value" : tipoF});
		param.push({"name" : "idFicha", "value" : idFoto});  
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){   
					$('#imgF'+nFoto).attr('data-extencion', '');
					$('#imgF'+nFoto).attr('data-id', '');  
				} 
			}else{
				 
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
				logException(jqXHR, textStatus, errorThrown); 
				return false;
		}).always(function(){
			 
		});
	 
	 
}

function verificarMed() {
	var medidor  = $("#medidor").val(); 
	
	if(vParamM(medidor) && medidor !== ""){
		if(!isNumberM(medidor)){ 
			noty({text: "Medidor no valido", type:'error', timeout:7000}); 
			return false;
		} 
	}else{ 
		noty({text: "Ingrese medidor a consultar", type:'error', timeout:7000}); 
		return false;
	}
	
	var param = new Array();
	param.push({"name" : "key", "value" : 44});		 
	param.push({"name" : "medidor", "value" : medidor});
	
	 
	
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){  
				$("#nombre").val(data.aData.clienteSeg).attr('readonly','readonly');
				$("#direccion").val(data.aData.direInSeg).attr('readonly','readonly');  
				
			}else{
				noty({text: "Medidor no encontrado", type:'error', timeout:7000}); 
				$("#nombre").attr('readonly', false);
				$("#direccion").attr('readonly', false); 
			}
		}else{
			noty({text: data.msg, type:'warning', timeout:7000}); 
		}
	}).fail(function( jqXHR, textStatus, errorThrown ) {  
		 
			logException(jqXHR, statusTxt, errorThrown);
			idFicha = null;
		return false;
	}).always(function(){
		 
		 	
	});
	
}

$(document).ready(function(){	

	
	if($("#menu-contenedor").hasClass('show')){
		$("#showMenu").trigger("click"); 
	} 
	
 
	

	$("#btnCancelar").on('click', function(){
		try{			
			  
			buildFormBackMobi(116, null);						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	

	$("#btnGuardarFichaje").on('click', function(){
		try{			
			  
			guardarFichaje();						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnFotografia").on('click', function(){
		try{			
			 $("#conte-imagenCarga").show(); 
			 $("#filaDos").hide();
			 $("#filaFotos").show();
			 
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnFotografiaAl").on('click', function(){
		try{			
			  
			$("#filaFotosAl").show();
			$("#filaNovena").hide();
			 $("#conte-imagenCargaAl").show(); 
			 
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnCargarFoto").on('click', function(){
		try{			
			  
			$("#filaFotos").hide();
			$("#filaDos").show();  
			 
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	

	$("#btnCargarFotoAl").on('click', function(){
		try{			
			  
			$("#filaFotosAl").hide();
			$("#filaNovena").show();  
			 
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	//fotgrafias de alcantarillado 2
	$("#btnCancelFotoAl").on('click', function(){
		try{			
			  
				
				$("#imgF5").attr('src', "").attr('data-extencion', '').attr('data-id', '');
				 $("#imgF6").attr('src', "").attr('data-extencion', '').attr('data-id', '');
				 $("#imgF7").attr('src', "").attr('data-extencion', '').attr('data-id', '');
				 $("#imgF8").attr('src', "").attr('data-extencion', '').attr('data-id', '');
				  
				  
				 fileF5 =null;	 
				 fileF6 = null;	 
				 fileF7 = null;	 
				 fileF8 = null;	 
				 
				 ruta5 =null;	 
				 ruta6 = null;	 
				 ruta7 = null;	 
				 ruta8 = null;	 
				  
					var param = new Array();
					param.push({"name" : "key", "value" : 196});
					param.push({"name" : "idFicha", "value" : ''});
					param.push({"name" : "tipo", "value" : 'A'});  
						
						 
				 	$.post("./Session", param, function(data){
						 	$("#conte-imagenCargaAl").hide(); 
							$("#filaFotosAl").hide();
							$("#filaNovena").show(); 
						 
						}).fail(function( jqXHR, textStatus, errorThrown ) {  
							appWait.hidePleaseWait(); 
								logException(jqXHR, textStatus, errorThrown); 
								return false;
						}) ;
			 
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnCancelFoto").on('click', function(){
		try{			
			 
			    
			 $("#imgF1").attr('src', "").attr('data-extencion', '').attr('data-id', '');
			 $("#imgF2").attr('src', "").attr('data-extencion', '').attr('data-id', '');
			 $("#imgF3").attr('src', "").attr('data-extencion', '').attr('data-id', '');
			 $("#imgF4").attr('src', "").attr('data-extencion', '').attr('data-id', '');
			 
			 
			 fileF1 =null;	 
			 fileF2 = null;	 
			 fileF3 = null;	 
			 fileF4 = null;	 
			 
			 ruta1 =null;	 
			 ruta2 = null;	 
			 ruta3 = null;	
			 
			var param = new Array();
			param.push({"name" : "key", "value" : 196});
			param.push({"name" : "idFicha", "value" : ''});
			param.push({"name" : "tipo", "value" : 'F'}); 
				
			 
		 	$.post("./Session", param, function(data){
				 $("#filaFotos").hide();
				 $("#conte-imagenCarga").hide();
				 $("#filaDos").show(); 
				 
				 
				 ruta4 = null;
				 
				}).fail(function( jqXHR, textStatus, errorThrown ) {  
					appWait.hidePleaseWait(); 
						logException(jqXHR, textStatus, errorThrown); 
						return false;
				}) ;
					
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	

	$("#btnGuardarFichajeAlcanta").on('click', function(){
		try{			
			  
			guardarFichaje(2, 1);						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	}); 
	
	$("#cmbContactoT").on( "change", function() {
		 var contactot = 	$("#cmbContactoT").val();
		 if(!vParamM(contactot) || contactot === "0"){
			 $("#contContacto").hide();
			}else{
				$("#contContacto").show();
			}
	});
	
	$("#conte-Fichaje").show();
	$("#conte-Listado").hide();
 
    setTimeout(function(){llenaComboEstadosMed();}, 300);
    setTimeout(function(){llenaCmbTipoContacto();}, 300);   
    //setTimeout(function(){llenaCmbCantidades();}, 300);
    setTimeout(function(){llenaCmbLocales();}, 300);
    setTimeout(function(){llenaCmbServicio();}, 300);
    setTimeout(function(){llenaCmbAlimentos();}, 300);
    setTimeout(function(){llenaCmbIndustria();}, 300);
    setTimeout(function(){llenaCmbOtros();}, 300);
    setTimeout(function(){llenaComboTrabajos();}, 300);
    setTimeout(function(){llenaComboMotTrabajos();}, 300);
    
    
    
});