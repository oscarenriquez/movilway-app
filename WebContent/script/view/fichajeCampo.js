tableFichas = null;
var tableEstrategia = null;
var idFicha = null;
var idDenuncia= null;
 var fileF1 = null;
 var fileF2 = null;
 var fileF3 = null;
 var fileF4 = null;
 var ruta1 = null;
 var ruta2 = null;
 var ruta3 = null;
 var ruta4 = null;
 //fotos de alcantarillado 2
 var fileF5 = null;
 var fileF6 = null;
 var fileF7 = null;
 var fileF8 = null;
 var ruta5 = null;
 var ruta6 = null;
 var ruta7 = null;
 var ruta8 = null;
 var cambioL = null;
 var divAnterior="";
 var vFichado = null;
 var processFicha = null;

 var tipoF = null;
var fotoByte = null;

var divEsconder ="";
var accionResultado = "";
 
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


/****
 * guardarFichaje
 * tipo ---> 1 = fichaje
 * 			 2 = fichaje y Alcantarillado
 * 			 3 = alcantarillado
 * accion -->1 = crear
 * 			 2 = modificar
 * **/

function guardarFichaje(tipo, accion) {
	try{
		
		if(processFicha == null){
			
			var razonSoP = 	$("#razonSo").val();
			var tomaLecP = 	$("#tomaLec").val();
			var estadoMed = 	$("#cmbEstadoMed").val();
			var medidorIP = 	$("#medidorI").val();
			var medidorDP = 	$("#medidorD").val();
			var lecMedidorIP = 	$("#leMedidorI").val();
			var lecMedidorDP = 	$("#leMedidorD").val();
			var nombreEnP = 	$("#nombreEn").val();
			var tipoContacto = 	$("#cmbContactoT").val();
			var contactoP = 	$("#contacto").val();
			var emailP = 	$("#email").val();
			var tipoSuelo = 	$("#tSuelo").val();
			var tipoSObser = 	$("#obserTipo").val();
			
				
			var sueloDeshabitado = 	0;
			var sueloHabitado = 	0;
			var sueloBaldio = 	0;
			var sueloConstruccion = 	0;
			var noHabitantes = 	0;
			var noTrabajadores = 	0; 
			var tipoSGobierno = 	0;
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
			var abasPipasFrec = 	0;
			var abasPipasCant = 	0;
			var abasPipas = 	0;
			var abasPozo = 	0; 
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
			var cantCisternaE  = 	0;
			var cantCcisternaS = 	0; 
			var servMtJardin = 	0; 
			
			//alcantarillado 2
			var abasEMPAGUAAl = 	0;
			var abasMARISCALAl = 	0;
			var abasCandelaAl = 	0;
			var abasPlantaAl  = 	0; 
			
			var abasPozoAbAl  = 	0;
			var abasPozoAbAlCant  = 	0; 
			var almaTonelesAl = 	0;
			var almaTonelesCantAl = 	0;
			var abasPipasFrecAl = 	0;
			var abasPipasCantAl = 	0;
			var obser2 =  $("#obserTipoAl").val();
			var tomaLec =  $("#tomaLecAl").val();
			var estadoMedAl =  $("#cmbEstadoMedAl").val();
			var cantCisternaEAl  = 	0;
			var cantCcisternaSAl = 	0; 
			 
			
			
			if(tipo === 3 ){
				obser2 =  $("#obserTipoAl").val(); 
			}
			
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
					noHabitantes = $("#cmbNoHabitantes").val();
					
					if(!vParamM(noHabitantes)){
						noty({text: "Por favor Ingrese No Habitantes!", type:'error', timeout:5000});
						return false;
					}
					
				}else{
					if($("#baldio").is(":checked")){  
						sueloBaldio = "B";
					}else{
						if($("#rConstruccion").is(":checked")){  
							sueloConstruccion = "E";
							noTrabajadores = $("#cmbNoTrabajadores").val();
					
							if(!vParamM(noTrabajadores)){
								noty({text: "Por favor Ingrese No de Trabajadores!", type:'error', timeout:5000});
								return false;
							}
						}else{
							noty({text: "Por favor seleccione un uso de suelo", type:'error', timeout:5000});
							return false;
						}
					}
				}
			}
			

			if($("#checkPlantaAl").is(":checked")){  
				abasPlantaAl = 1;
			}
			 
			
			if($("#checkGobierno").is(":checked")){  
				tipoSGobierno = 1;
			}
			
			if($("#fracionaCheck").is(":checked")){  
				tipoSFracionamiento = 1;
			}
			
			if($("#viviendaCheck").is(":checked")){  
				if($("#rUnifami").is(":checked")){   
					tipoSVivienda = 1;
					tipoSUnifamiliar = 1;
					tipoSNivelVivienda = $("#cmbUnifamiliar").val();
						
					if(!vParamM(tipoSNivelVivienda)){
						noty({text: "Por favor Ingrese cant de Niveles de la vivienda!", type:'error', timeout:5000});
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
								noty({text: "Por favor Ingrese cant de Niveles del Condominio!", type:'error', timeout:5000});
								return false;
							}
						}else{
							if($("#cHorizontal").is(":checked")){  
								tipoSConHorizontal = 1;
								tipoSVivienda = 1;
								tipoSNivelVivienda = $("#cmbCHorizontal").val();
							
								if(!vParamM(tipoSNivelVivienda)){
									noty({text: "Por favor Ingrese cant de Niveles del Condominio!", type:'error', timeout:5000});
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
				abasPipasFrec = 	$("#frePipas").val();
				abasPipasCant = 	$("#cantPipas").val();
				
				if(!vParamM(abasPipasFrec)){
					noty({text: "Por favor seleccione frecuencia de pipas", type:'error', timeout:5000});
					return false;
				}
				
				if(!vParamM(abasPipasCant)){
					noty({text: "Por favor ingrese cant. de pipas", type:'error', timeout:5000});
					return false;
				}
			}
			
			if($("#checkPozoAbas").is(":checked")){  
				abasPozo = 	1;
			}
 
			
			cantCisternaE   =  $("#cisternaE").val();
			cantCcisternaS  =  $("#cisternaS").val();
			
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
			
			
				if($("#checkEmpaAbasAl").is(":checked")){  
					abasEMPAGUAAl = 	1; 
				}

				if($("#checkMarisAbasAl").is(":checked")){  
					abasMARISCALAl = 	1;
				}
				 
					abasCandelaAl = 	$("#checkCandelaAl").val();
		 
				if($("#checkPipaAbasAl").is(":checked")){   
					
					abasPipasFrecAl = $("#frePipasAl").val();
					abasPipasCantAl = $("#cantPipasAl").val();
					
					if(!vParamM(abasPipasCantAl) || abasPipasCantAl =="0" ){
						noty({text: "Por favor ingrese Cantidad de pipas", type:'error', timeout:5000});
						return false;
					}
					
					if(!vParamM(abasPipasFrecAl) || abasPipasFrecAl =="0" ){
						noty({text: "Por favor seleccione frecuencia de pipas", type:'error', timeout:5000});
						return false;
					}
				}
				
				if($("#checkPozoAbAl").is(":checked")){  
						abasPozoAbAl = 1;
						abasPozoAbAlCant = $("#cantPozoAbAl").val();
						
						if(!vParamM(abasPozoAbAlCant) || abasPozoAbAlCant =="0" ){
							noty({text: "Por favor ingrese Cantidad de pozos de absorci&oacute;n!", type:'error', timeout:5000});
							return false;
						}
						
					}
		 
				
				cantCisternaEAl   =  $("#cisternaEAl").val();
				cantCcisternaSAl  =  $("#cisternaSAl").val();
				
				if($("#checkTonelAl").is(":checked")){  
					almaTonelesAl = 	1;
					almaTonelesCantAl =  $("#cantTonelesAl").val();
					
					if(!vParamM(almaTonelesCantAl) || almaTonelesCantAl =="0" ){
						noty({text: "Por favor ingrese cant. de Toneles", type:'error', timeout:5000});
						return false;
					}
				}
			
			 
			var param = new Array();
			var motCierreF ="";
			var obserCierreF = "";
			var motTrabajo =  "";
			var trabajoAsig =  "";
			var obserTrabajo =  "";
			var resultF = 0;
			
			if(accionResultado === 1 || accionResultado ==="1" || accion === 1){
				if($("#radioCierre").is(":checked")){  
					resultF = 2;
					motCierreF =  $("#motCierreF").val();
					obserCierreF =  $("#obserCierreF").val();
					
					if(!vParamM(motCierreF) || motCierreF =="0" ){
						noty({text: "Por favor Seleccione motivo de cierre de ficha o seleccione CARGA DE INFORMACION", type:'error', timeout:5000});
						return false;
					}
					
					if(!vParamM(obserCierreF) ){
						noty({text: "Por favor ingrese observaciones de cierre de ficha o seleccione CARGA DE INFORMACION", type:'error', timeout:5000});
						return false;
					}
					 
				}else {
					if($("#radioTrabajo").is(":checked")){  
						resultF = 1;
						  motTrabajo = 	$("#motTrabajo").val(); 
						  trabajoAsig = 	$("#trabajoAsig").val(); 
						  obserTrabajo = 	$("#obserTrabajo").val(); 
						
						if(trabajoAsig ==="0"){
							trabajoAsig = "";
						} 
						
						if(vParamM(trabajoAsig) && trabajoAsig != '0'){ 
							if(!vParamM(motTrabajo) || motTrabajo === '0'){ 
								noty({text: "Por favor seleccione motivo de Trabajo!", type:'warning', timeout:7000});
								return false;
							} 
							 
						} else{
							noty({text: "Por favor seleccione Trabajo!", type:'warning', timeout:7000});
							return false;
						}
						
						
					}else{
						if(!$("#radioCarga").is(":checked")){  
							noty({text: "Por favor seleccione un resultado de ficha", type:'warning', timeout:7000});
							return false;
						}
					}
				}
				 
				param.push({"name" : "motCierreFId", "value" : motCierreF});
				param.push({"name" : "obserCierreF", "value" : obserCierreF}); 
				param.push({"name" : "motivoId", "value" : motTrabajo});
				param.push({"name" : "trabajoId", "value" : trabajoAsig});
				param.push({"name" : "obserTras", "value" : obserTrabajo});
				param.push({"name" : "resultF", "value" : resultF});
			}
			
			if(accion === 1){
				 
				param.push({"name" : "key", "value" : 118});
				 
			}else{
				param.push({"name" : "key", "value" : 132});
			}
			
			
			//dats de denuncia si existiera
			var medDenuncia =  "";
			var direDenuncia =  "";
			var zonaDenuncia =  "";
			
			if(idDenuncia != null){
				medDenuncia = $("#medidorDe").val();
				direDenuncia = $("#direccionDe").val();
				zonaDenuncia = $("#zonaDe").val(); 
			}
			
		
			 
			
			param.push({"name" : "keyFicha", "value" : idFicha});
			param.push({"name" : "denunciaId", "value" : idDenuncia});
			param.push({"name" : "medDenun", "value" : medDenuncia});
			param.push({"name" : "dirDenun", "value" : direDenuncia});
			param.push({"name" : "zonaD", "value" : zonaDenuncia});
			param.push({"name" : "razonSoP", "value" : razonSoP});
			param.push({"name" : "tomaLecP", "value" : tomaLecP});
			param.push({"name" : "estadoMed", "value" : estadoMed});
			param.push({"name" : "medidorIP", "value" : medidorIP});		 
			param.push({"name" : "medidorDP", "value" : medidorDP});
			param.push({"name" : "lecMedIzq", "value" : lecMedidorIP});		 
			param.push({"name" : "lecMedDer", "value" : lecMedidorDP});
			param.push({"name" : "nombreEnP", "value" : nombreEnP});
			param.push({"name" : "tipoContacto", "value" : tipoContacto});
			param.push({"name" : "contactoP", "value" : contactoP});		 
			param.push({"name" : "emailP", "value" : emailP});
			param.push({"name" : "tipoSuelo", "value" : tipoSuelo});
			param.push({"name" : "sueloHabitado", "value" : sueloHabitado});
			param.push({"name" : "sueloDeshabitado", "value" : sueloDeshabitado});		 
			param.push({"name" : "sueloBaldio", "value" : sueloBaldio});
			param.push({"name" : "sueloConstruccion", "value" : sueloConstruccion});
			param.push({"name" : "noHabitantes", "value" : noHabitantes});
			param.push({"name" : "noTrabajadores", "value" : noTrabajadores});
			param.push({"name" : "tipoSGobierno", "value" : tipoSGobierno});
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
			param.push({"name" : "abasPipasFrec", "value" : abasPipasFrec});
			param.push({"name" : "abasPipasCant", "value" : abasPipasCant});
			param.push({"name" : "abasPipas", "value" : abasPipas});
			param.push({"name" : "abasPozo", "value" : abasPozo}); 
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
			//para saber si
			param.push({"name" : "cambioFiAl", "value" : cambioL});
			param.push({"name" : "plantTratam", "value" : abasPlantaAl});
			//fotos
			/*
			var imgData1 = JSON.stringify(fileF1);
			var imgData2 = JSON.stringify(fileF2);
			var imgData3 = JSON.stringify(fileF3);
			var imgData4 = JSON.stringify(fileF4);
			
			var imgData5 = JSON.stringify(fileF5);
			var imgData6 = JSON.stringify(fileF6);
			var imgData7 = JSON.stringify(fileF7);
			var imgData8 = JSON.stringify(fileF8);
			
			param.push({"name" : "pFoto1", "value" : imgData1});
			param.push({"name" : "pFoto2", "value" : imgData2});
			param.push({"name" : "pFoto3", "value" : imgData3});
			param.push({"name" : "pFoto4", "value" : imgData4}); 
			
			//fotos Alcantarillado 2
			param.push({"name" : "pFoto5", "value" : imgData5});
			param.push({"name" : "pFoto6", "value" : imgData6});
			param.push({"name" : "pFoto7", "value" : imgData7});
			param.push({"name" : "pFoto8", "value" : imgData8}); */
			param.push({"name" : "lectura", "value" : tomaLec});
			param.push({"name" : "estMedAlcanta", "value" : estadoMedAl});
			param.push({"name" : "empagua", "value" : abasEMPAGUAAl});
			param.push({"name" : "mariscal", "value" : abasMARISCALAl});
			param.push({"name" : "candelas", "value" : abasCandelaAl});
			param.push({"name" : "candelasVis", "value" : abasCandelaAl});
			
			//param.push({"name" : "plantaTrata", "value" : abasPlantaAl});
			param.push({"name" : "pozoAbs", "value" : abasPozoAbAl});
			param.push({"name" : "cantPozoAbs", "value" : abasPozoAbAlCant});
			param.push({"name" : "almaCisternaEle", "value" : cantCisternaE});
			param.push({"name" : "almaCisternaSub", "value" : cantCcisternaS});
			param.push({"name" : "cisElev", "value" : cantCisternaEAl});
			param.push({"name" : "cisSubt", "value" : cantCcisternaSAl});
			param.push({"name" : "toneles", "value" : almaTonelesAl});
			param.push({"name" : "cantToneles", "value" : almaTonelesCantAl});
			param.push({"name" : "obser2", "value" : obser2});
			param.push({"name" : "candelas", "value" : abasCandelaAl});
			param.push({"name" : "plantaTrata", "value" : abasPlantaAl});
			param.push({"name" : "pozoAbs", "value" : abasPozoAbAl});
			param.push({"name" : "cantPozoAbs", "value" : abasPozoAbAlCant});
			param.push({"name" : "candelasVis", "value" : abasCandelaAl}); 
			param.push({"name" : "pozoAbsor", "value" : abasPozoAbAl});
			param.push({"name" : "pozoAbsCant", "value" : abasPozoAbAlCant});
			param.push({"name" : "observa2", "value" : obser2});
		 
	 
			 
			var msjConfirm ="<div style='color: #039; padding: 4px; font-weight: bold;' > &#191; Esta seguro de guardar la ficha ?";
			  var exito = false;
			
			alertify.confirm(msjConfirm, function (e) {
				if (e) { 
					processFicha = true; 
					$.post("./Session", param, function(data){
						if(data.permiso){
							if(data.isSuccess){   
								noty({text: data.msg, type:'success', timeout:7000}); 
								exito = true;
							}else{
								noty({text: data.msg, type:'error', timeout:7000}); 
							}
						}else{
							noty({text: data.msg, type:'warning', timeout:7000}); 
						}
					}).fail(function( jqXHR, textStatus, errorThrown ) {  
						appWait.hidePleaseWait(); 
							logException(jqXHR, textStatus, errorThrown);
							exito = false;
							return false;
					}).always(function(){
						appWait.hidePleaseWait();   
						processFicha = null;
						if(exito === true){
							$("#btnCancelar").trigger("click");  
						}
						
					});
				  } else {
					  processFicha = null;
						return false;   
						}
					});
		
		}
		 	 
	} catch (e) {
		 
		alert(e.name+": "+e.message);
	}
	
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


 

 

function llenaCmbTipoSuelo() {
	 
	var param = new Array();
	param.push({"name" : "key", "value" : 126});		 
	param.push({"name" : "tipoUso", "value" : 6});
	
	var noExiste = "<option value=''>No existen Informacion</option> ";
	 
	
	$.post("./Session", param , function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){  
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#tSuelo").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
						}else{
							$("#tSuelo").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> ");
						}
					});
				}else{
					
					 $("#tSuelo").append(noExiste);
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
		$('#tSuelo').selectmenu('refresh');
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
							$("#cmbCHorizontal").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> ");
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
		 $("#cantPipasAl").selectmenu('refresh');
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

function llenaComboCierreF() { 
	var noExiste = "<option value=''>No existen Informacion</option> "; 
	 var param = new Array();
		param.push({"name" : "key", "value" : 136});		 
		param.push({"name" : "tipo", "value" :"F"});
		
	$.post("./Session", param, function(data){
		if(data.permiso){
			if(data.isSuccess){
				if(data.formulario.comboBox.length>0){   
					$.each(data.formulario.comboBox, function(index, el) { 
						if(el.ID == "0"){
							$("#motCierreF").append("<option value='"+el.ID+"' selected>"+el.DESCRIPCION+"</option> "); 
						}else{
							$("#motCierreF").append("<option value='"+el.ID+"'>"+el.DESCRIPCION+"</option> "); 
						}
					});
				}else{
					
					 $("#motCierreF").append(noExiste); 
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
		$('#motCierreF').selectmenu('refresh'); 
	}); 
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

function fichajeView(idFichaje, tipo, fichado) {
	 
 idFicha = idFichaje; 
 vFichado = fichado;
 var param = new Array(); 
 
 $("#div-AsigT2").hide();
 $("#div-AsigT").hide();
 
 if(tipo === "L"){
		$("#btnGuardarFichaje").hide();
		$("#div-TFichaje").hide();
		$("#btnAlcantaNext").show();
		$("#btnGuardarFichajeAlcanta").show(); 
		$("#div-Alcant2").hide();
	}else{
		if(tipo === "A"){
			$("#title-filaQuinta").html('uso del suelo');
			$("#div-usoPrivado").hide();
			$("#div-usoGob").hide();
			$("#div-instaPipas").show();
			$("#div-SiguiAlcantarillado").show();
			$("#div-btnfilaQuinta").hide(); 
			$("#div-btnfilaDecima").show();
			$("#btnAnteriorFila7").hide();
			$("#btnAnteriorFila10").show();
			$("#div-medidoresAlre").hide();
			$("#btnGuardarFichajeAlcanta").hide();
			$("#div-TFichajeAlcanta").hide();
			$("#div-obser").hide();
			$("#btnGuardarFichaje").hide();
			$("#btnGuardarAlca").show();
			$("#div-TAlca").show();
			$("#div-anteFiAl").hide();
			$("#div-anteFila5").show();
			$("#div-obserAlcan").show();
			$("#conteMedidoresAl").hide();
			$("#div-Alcant2").hide();
			$("#div-TFichaje").hide();
		}else{
			$("#btnGuardarFichaje").show();
			$("#div-TFichaje").show();
			$("#btnAlcantaNext").hide();
		}
		
	}
 
 if(fichado ==="N"){
	
		param.push({"name" : "key", "value" : 127});		 
		param.push({"name" : "fichaId", "value" : idFichaje});
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){  
					$("#medidor").val(data.aData.medidor);
					$("#nombre").val(data.aData.nombre);
					$("#direccion").val(data.aData.direccion);
					$("#cuentasAl").val(data.aData.alcantarillado);
					$("#motivoLec").val(data.aData.motivo);
					$("#obserLec").val(data.aData.observaciones);
					
				  if(vParamM(data.aData.idDenuncia)){ 
						$("#medidorDe").val(data.aData.medDen);
						$("#direccionDe").val(data.aData.dirDen);
						$("#zonaDe").val(data.aData.zonaD);
						$("#obserDe").val(data.aData.denuncia);
						idDenuncia = data.aData.idDenuncia;
						
						$("#divDenuncia").show();
						
					}
				
 
					$("#conte-Fichaje").show();
					$("#conte-Listado").hide(); 
					$("#div-AsigT2").hide();
					$("#div-AsigT").hide();
					
					 
				}else{ 
					noty({text: data.msg, type:'error', timeout:7000}); 
				}
			}else{
				noty({text: data.msg, type:'warning', timeout:7000}); 
			}
		}).fail(function( jqXHR, textStatus, errorThrown ) {  
			appWait.hidePleaseWait(); 
				logException(jqXHR, statusTxt, errorThrown);
				idFicha = null;
			return false;
		}).always(function(){
			appWait.hidePleaseWait();   
		}); 
 }else{
	 
	 if(tipo === "F"){
		 	$("#btnActualizarFichaje").show();
			$("#btnActualizarAlca").hide();
			$("#btnActualizarFichajeAlcanta").hide();
			$("#btnGuardarFichaje").hide();
			$("#div-TFichaje").hide();
			$("#btnGuardarFichajeAlcanta").hide();
			$("#div-TFichajeAlcanta").hide();
			$("#btnGuardarAlca").hide();
			$("#div-TAlca").hide();
			$("#div-Alcant2").show();
			$("#btnCancelP").show();
	 }else{
		 if(tipo === "L"){
			 	$("#btnActualizarFichajeAlcanta").show();
			 	$("#btnCancels").show();
			 	
				$("#btnActualizarFichaje").hide();
				$("#btnActualizarAlca").hide();
				$("#btnGuardarFichaje").hide();
				$("#div-TFichaje").hide();
				$("#btnGuardarFichajeAlcanta").hide();
				$("#div-TFichajeAlcanta").hide();
				$("#btnGuardarAlca").hide();
				$("#div-TAlca").hide();
				$("#div-Alcant2").hide();
		 }else if(tipo === "A"){
			 $("#btnActualizarAlca").show();
			 $("#btnCancelP").show();
			$("#btnActualizarFichaje").hide();
			$("#btnCancelP").hide();
			$("#btnActualizarFichajeAlcanta").hide();
			$("#btnGuardarFichaje").hide();
			$("#div-TFichaje").hide();
			$("#btnGuardarFichajeAlcanta").hide();
			$("#div-TFichajeAlcanta").hide();
			$("#btnGuardarAlca").hide();
			$("#div-TAlca").hide();
			$("#div-Alcant2").hide();
		 }
	 }
	 
	 
	 param.push({"name" : "key", "value" : 131});		 
		param.push({"name" : "fichaId", "value" : idFichaje});
		
		$.post("./Session", param, function(data){
			if(data.permiso){
				if(data.isSuccess){  
					$("#medidor").val(data.aData.medidor);
					$("#nombre").val(data.aData.nombre);
					$("#direccion").val(data.aData.direccion);
					$("#cuentasAl").val(data.aData.alcantarillado);
					
					$("#razonSo").val(data.aData.razonSoc);
					$("#tomaLec").val(data.aData.lectura);
					$("#medidorI").val(data.aData.medidorIzq);
					$("#medidorD").val(data.aData.medidorDer);
					$("#leMedidorI").val(data.aData.lecMedidorIzq);
					$("#leMedidorD").val(data.aData.lecMedidorDer);
					$("#nombreEn").val(data.aData.nomEntrev);
					$("#contacto").val(data.aData.telContacto);
					$("#email").val(data.aData.email);
					$("#obserTipo").val(data.aData.obser);
					
					var optI = 'option[value="';
					var optF = '"]'; 		
					 
					$("#cmbEstadoMed option[value='0']").attr('selected', false); 
					$('#cmbEstadoMed').change().trigger('liszt:updated').selectmenu('refresh'); 
					$("#cmbEstadoMed "+optI+data.aData.estadoMed+optF).attr('selected', true); 
					$('#cmbEstadoMed').change().trigger('liszt:updated').selectmenu('refresh'); 
					
					$("#cmbContactoT option[value='0']").attr('selected', false); 
					$('#cmbContactoT').change().trigger('liszt:updated').selectmenu('refresh');
					
					$("#cmbContactoT "+optI+data.aData.tipoTel+optF).attr('selected', true); 
					$('#cmbContactoT').change().trigger('liszt:updated').selectmenu('refresh'); 
					
					if(data.aData.usoSuelo === "D"){
						$("#habitadoNo").trigger("click").attr("checked"); 
						$("#habitadoNoL").addClass('ui-radio-on');
					}else{
						if(data.aData.usoSuelo === "H"){
							$("#habitadoSi").trigger("click").attr("checked"); 
							$("#habitadoSiL").addClass('ui-radio-on');
							$('#cmbNoHabitantes').val(data.aData.cantHabitantes);
							 
							
						}else{
							if(data.aData.usoSuelo === "B"){
								$("#baldio").trigger("click").attr("checked"); 
								$("#baldioL").addClass('ui-radio-on');
							}else if(data.aData.usoSuelo === "E"){
									$("#rConstruccion").trigger("click").attr("checked"); 
									$("#rConstruccionL").addClass('ui-radio-on');
									$('#cmbNoTrabajadores').val(data.aData.cantTrabajador);
									 
							}
						} 
					} 
					 
					$("#tSuelo option[value='0']").attr('selected', false); 
					$('#tSuelo').change().trigger('liszt:updated').selectmenu('refresh'); 
					$('#tSuelo '+optI+data.aData.subTPrivado+optF).attr('selected', true); 
					$('#tSuelo').change().trigger('liszt:updated').selectmenu('refresh'); 
					
					if(data.aData.gobiern){
						$("#checkGobierno").trigger("click"); 
					}
					
					if(data.aData.fracciona){
						$("#fracionaCheck").trigger("click"); 
					}
					
					if(data.aData.vivienda){
						$("#viviendaCheck").trigger("click"); 
						
						if(data.aData.unifamiliar){
							$("#rUnifami").trigger("click"); 
							$("#rUnifamiL").addClass('ui-radio-on');
							$('#cmbUnifamiliar').val(data.aData.nivelesV);
							 
							
						}else{
							if(data.aData.condHorizo){
								$("#cHorizontal").trigger("click");
								$("#cHorizontalL").addClass('ui-radio-on');
								$("#rCondominio").trigger("click"); 
								$("#rCondominioL").addClass('ui-radio-on');
								$('#cmbCHorizontal').val(data.aData.nivelesV);
								 
							}else if(data.aData.condVerti){
								$("#cVertical").trigger("click"); 
								$("#cVerticalL").addClass('ui-radio-on');
								$("#rCondominio").trigger("click"); 
								$("#rCondominioL").addClass('ui-radio-on');
								$('#cmbCVertical').val(data.aData.nivelesV);
								 
								
							}
						}
						
					}
					
					if(data.aData.comercio){
						$("#comercioCheck").trigger("click");  
						$("#cantLocales").val(data.aData.numLocales);

						$("#cmbLocales option[value='0']").attr('selected', false); 
						$('#cmbLocales').change().trigger('liszt:updated').selectmenu('refresh'); 
						$('#cmbLocales '+optI+data.aData.tuComercio+optF).attr('selected', true); 
						$('#cmbLocales').change().trigger('liszt:updated').selectmenu('refresh'); 
						
						$("#cmbServicio option[value='0']").attr('selected', false); 
						$('#cmbServicio').change().trigger('liszt:updated').selectmenu('refresh');
						$('#cmbServicio '+optI+data.aData.subTServicio+optF).attr('selected', true); 
						$('#cmbServicio').change().trigger('liszt:updated').selectmenu('refresh'); 
						
						$("#cmbAlimentos option[value='0']").attr('selected', false); 
						$('#cmbAlimentos').change().trigger('liszt:updated').selectmenu('refresh'); 
						$('#cmbAlimentos '+optI+data.aData.subTAlimen+optF).attr('selected', true); 
						$('#cmbAlimentos').change().trigger('liszt:updated').selectmenu('refresh'); 
					}
					
					if(data.aData.industria){
						$("#checkIndustria").trigger("click"); 
						$("#cmbIndustria option[value='0']").attr('selected', false); 
						$('#cmbIndustria').change().trigger('liszt:updated').selectmenu('refresh'); 
						$('#cmbIndustria '+optI+data.aData.subTIndus+optF).attr('selected', true); 
						$('#cmbIndustria').change().trigger('liszt:updated').selectmenu('refresh'); 
					}
					
					if(data.aData.otros){
						$("#checkOtros").trigger("click"); 
						$("#cmbOtros option[value='0']").attr('selected', false); 
						$('#cmbOtros').change().trigger('liszt:updated').selectmenu('refresh'); 
						$('#cmbOtros '+optI+data.aData.subTOtros+optF).attr('selected', true); 
						$('#cmbOtros').change().trigger('liszt:updated').selectmenu('refresh'); 
					}

					if(data.aData.empagua){
						$("#checkEmpaAbas").trigger("click"); 
					}

					if(data.aData.mariscal){
						$("#checkMarisAbas").trigger("click"); 
					}

					if(data.aData.pipas){
						$("#checkPipaAbas").trigger("click");
						$("#frePipas option[value='0']").attr('selected', false); 
						$('#frePipas').change().trigger('liszt:updated').selectmenu('refresh'); 
						$('#frePipas '+optI+data.aData.frecuencia+optF).attr('selected', true); 
						$('#frePipas').change().trigger('liszt:updated').selectmenu('refresh'); 
						 
						
						$('#cantPipas').val(data.aData.cantPipa);
					}

					if(data.aData.pozo){
						$("#checkPozoAbas").trigger("click"); 
					} 
					
					if(data.aData.cistElevada || data.aData.cistSubter){ 
						
						$('#cisternaE').val(data.aData.cistElevada);
						$('#cisternaS').val(data.aData.cistSubter); 
						
					}
					
					
					if(data.aData.toneles){
						$("#checkTonel").trigger("click");
						$('#cantToneles').val(data.aData.cantTonel); 
					}
					
					$("#checkSanitario").val(data.aData.sanitarios);
					$("#checkLavama").val(data.aData.lavamanos);
					$("#checkLavaP").val(data.aData.lavaplatos);
					$("#checkDuchas").val(data.aData.duchas);
					$("#checkChorros").val(data.aData.chorros);
					$("#checkLavadora").val(data.aData.lavadora);
					$("#checkPiscina").val(data.aData.piscina);
					$("#checkPila").val(data.aData.pila); 
				 
					
					if(data.aData.jardin){
						$("#checkJardin").trigger("click"); 
						$("#mtJardin").val(data.aData.mtsJardin); 
					}
					
					$("#cmbEstadoMedAl option[value='0']").attr('selected', false); 
					$('#cmbEstadoMedAl').change().trigger('liszt:updated').selectmenu('refresh'); 
					$("#cmbEstadoMedAl "+optI+data.aData.estMedAlcanta+optF).attr('selected', true); 
					$('#cmbEstadoMedAl').change().trigger('liszt:updated').selectmenu('refresh'); 
					$("#tomaLecAl").val(data.aData.lecMed);
					
					 
					$("#obserTipoAl").val(data.aData.obser2);
					$("#obserAlca").val(data.aData.obser2);
					 
						if(data.aData.esEmpagua){
							$("#checkEmpaAbasAl").trigger("click"); 
						}
						
						if(data.aData.esMariscal){
							$("#checkMarisAbasAl").trigger("click"); 
						}
						 
						
						$('#cisternaEAl').val(data.aData.cisElevadAl);
						$('#cisternaSAl').val(data.aData.cisSubteAl); 
						
						if(data.aData.tonel){
							$("#checkTonelAl").trigger("click"); 
							$('#cantTonelesAl').val(data.aData.tonelCant); 
						} 
					
				 
						$("#checkCandelaAl").val(data.aData.candelasVis);
				 
					
					if(data.aData.plantTrata){
						$("#checkPlantaAl").trigger("click");  
					}
					
					if(data.aData.pozoAbsor){
						$("#checkPozoAbAl").trigger("click"); 
						$('#cantPozoAbAl').val(data.aData.cantPozoAbs); 
					} 
					 
					$("#conte-Fichaje").show();
					$("#conte-Listado").hide();
					$("#divTomaFoto").hide();
					$("#divTomaFotoAl").hide(); 
					
					 
					if(data.aData.asignaTrabajo === "1" || data.aData.asignaTrabajo === 1){
						$("#contBtnGuardar").hide();
						$("#contBtnAct").show();  
						
						 if(tipo === "F"){
							 $("#div-AsigT2").show();
							 $("#div-AsigT").hide();
						 } else  if(tipo === "A" || tipo === "L" ){
								 $("#div-AsigT2").hide();
								 $("#div-AsigT").show();
							 }
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
				idFicha = null;
			return false;
		}).always(function(){
			appWait.hidePleaseWait();   
		}); 
 }
	
	
}

function fnAccionResul(accion) { 
	  
	  if(accion == "1"){
		  if($("#radioCierre").is(":checked")){  
				 
			var	motCierreF =  $("#motCierreF").val();
			var	obserCierreF =  $("#obserCierreF").val();
				
				if(!vParamM(motCierreF) || motCierreF =="0" ){
					noty({text: "Por favor Seleccione motivo de cierre de ficha o seleccione CARGA DE INFORMACION", type:'error', timeout:5000});
					return false;
				}
				
				if(!vParamM(obserCierreF) ){
					noty({text: "Por favor ingrese observaciones de cierre de ficha o seleccione CARGA DE INFORMACION", type:'error', timeout:5000});
					return false;
				}
				 
			}else {
				if($("#radioTrabajo").is(":checked")){  
				 
				var	  motTrabajo = 	$("#motTrabajo").val(); 
				var	  trabajoAsig = 	$("#trabajoAsig").val();
					
					 
					
					if(vParamM(trabajoAsig) && trabajoAsig != '0'){ 
						if(!vParamM(motTrabajo) || motTrabajo === '0'){ 
							noty({text: "Por favor seleccione motivo de Trabajo!", type:'warning', timeout:7000});
							return false;
						} 
						 
					}else{
						noty({text: "Por favor seleccione Trabajo!", type:'warning', timeout:7000});
						return false;
					}
					
					
				}else{
					if(!$("#radioCarga").is(":checked")){  
						noty({text: "Por favor seleccione un resultado de ficha", type:'warning', timeout:7000});
						return false;
					}
				}
			}
		  
		  $("#"+divEsconder).show();
		  $("#filaTrabajos").hide(); 
		  divEsconder ="";
		  accionResultado = accion;
		  
	  }else{
		  $("#"+divEsconder).show();
		  $("#filaTrabajos").hide(); 
		  divEsconder ="";
		  accionResultado = accion;
	  }
}

function fnResultFicha(div) {
	  divEsconder = div;
	 
	  accionResultado = "";
	  $("#"+div).hide();
	  $("#filaTrabajos").show(); 
}

 

function nextPanel(panelOcultar, panelMostrar) { 
	
	if(panelOcultar == "filaDos" && panelMostrar !== "filaUno" ){
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
	}else if(panelOcultar == "filaTres" && panelMostrar !== "filaDos" ){
		var tipoContacto = $("#cmbContactoT").val();
		var contactoP = $("#contacto").val();
		var email = $("#email").val();
		
		 if(vParamM(tipoContacto) || tipoContacto !=="0" ){  
			 if(!vParamM(contactoP) ||  contactoP =="0"){  
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
	}else if(panelOcultar == "filaCuarta" && panelMostrar !== "filaTres" ){
		if(!$("#habitadoNo").is(":checked")){  
			 if($("#habitadoSi").is(":checked")){   
				var noHabitantes = $("#cmbNoHabitantes").val();
					
					if(!vParamM(noHabitantes) && noHabitantes =="0"){
						noty({text: "Por favor Ingrese No Habitantes!", type:'error', timeout:5000});
						return false;
					}
					
				}else{
					if(!$("#baldio").is(":checked")){  
						if($("#rConstruccion").is(":checked")){   
						  var	noTrabajadores = $("#cmbNoTrabajadores").val();
					      if(!vParamM(noTrabajadores) && noTrabajadores =="0"){
								noty({text: "Por favor Ingrese No de Trabajadores!", type:'error', timeout:5000});
								return false;
							}
						  }else{
							noty({text: "Por favor seleccione un uso de suelo", type:'error', timeout:5000});
							return false;
						}
					} 
				}
		 }	
	}else if(panelOcultar == "filaQuinta" && panelMostrar !== "filaCuarta" ){
		if($("#viviendaCheck").is(":checked")){  
			if($("#rUnifami").is(":checked")){  
				 
				var tipoSNivelVivienda = $("#cmbUnifamiliar").val();
					
				if(!vParamM(tipoSNivelVivienda) && tipoSNivelVivienda =="0"){
					noty({text: "Por favor ingrese cant. de Niveles de la vivienda!", type:'error', timeout:5000});
					return false;
				}
			}else{
				if($("#rCondominio").is(":checked")){  
					if($("#cVertical").is(":checked")){   
						var tipoSNivelVivienda = $("#cmbCVertical").val();
						
						if(!vParamM(tipoSNivelVivienda)  && tipoSNivelVivienda =="0"){
							noty({text: "Por favor ingrese cant. de Niveles del Condominio!", type:'error', timeout:5000});
							return false;
						}
					}else{
						if($("#cHorizontal").is(":checked")){ 
							tipoSNivelVivienda = $("#cmbCHorizontal").val();
						
							if(!vParamM(tipoSNivelVivienda)  && tipoSNivelVivienda =="0"){
								noty({text: "Por favor ingrese cant. de Niveles del Condominio!", type:'error', timeout:5000});
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
	}else if(panelOcultar == "filaSexta" && panelMostrar !== "filaQuinta" ){
		if($("#checkPipaAbas").is(":checked")){  
			var frePipas =  $("#frePipas").val();
			var cantPipas =  $("#cantPipas").val();
			
			if(!vParamM(frePipas) && frePipas =="0"){
				noty({text: "Por favor seleccione frecuencia", type:'error', timeout:5000});
				return false;
			}
			
			if(!vParamM(cantPipas) && cantPipas =="0"){
				noty({text: "Por favor ingrese cant. de pipas", type:'error', timeout:5000});
				return false;
			}
		}
	} 
	
	$("#"+panelMostrar).show();
	$("#"+panelOcultar).hide();
	
}

function cambioAlcantarillado() {
	
	if($("#checkAlcanta2").is(":checked")){   	 
		cambioL = 1;
		$("#btnGuardarFichaje").hide();
		$("#btnActualizarFichaje").hide();
		$("#div-TFichaje").hide(); 
		$("#btnAlcantaNext").show();  
		
		if(vFichado !="N"){
			$("#btnActualizarFichajeAlcanta").show();
		}else{
			$("#btnGuardarFichajeAlcanta").show(); 
		} 
		 
	}else{
		cambioL = null;
		$("#btnGuardarFichaje").show(); 
		$("#btnAlcantaNext").hide(); 
		$("#btnGuardarFichajeAlcanta").hide(); 
		if(vFichado ==="N"){
			$("#div-TFichaje").show();
		}else{
			$("#div-TFichaje").hide();
			$("#btnActualizarFichaje").show();
		}
	}
	
	 
}

//radio-Button
function mostrarContenido(panelOcultar, panelMostrar, inputVal) {
	
	if(panelMostrar !== '0'){
		$("#"+panelMostrar).show();
		
		if(inputVal !== '0'){
			$("#"+inputVal).val('1');
		}
		
	}else{
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

function detalleFichaT(nTr, obj){
	var aData = tableFichas.fnGetData( nTr ); 
				  
	var sOut = '<table style="margin: 0 auto;width: 75%;">'+
				'<tr style="background-color: rgba(51, 136, 204, 0.34); border: #486586 double;"> '+
					'<th  class="text-center" >Cliente</th>'+
					'<th  class="text-center" >Direccion</th>'+ 
				'</tr>';  
	
				sOut += "<tr style='font-size: 12px; background-color: rgba(147, 197, 236, 0.33); border: #486586 double;'>";
				sOut +="<td>"+aData[3]+"</td>"; 
				sOut +="<td>"+aData[4]+"</td>";
			 
			sOut += "<tr>";   
    sOut += '</table>';
    obj.disabled = false;
   
    obj.src = "./img/signoMenos.png";		  
    tableFichas.fnOpen( nTr, sOut, 'details' );
 
}

function listadoFichas(){
	try{		
		if(tableFichas !== null){
			tableFichas.fnDestroy();
			tableFichas = null;
		}
		 
		
		$("#conte-Fichaje").hide();
        $("#conte-Listado").show();
        
        tableFichas =	$('#tbFichajes').dataTable({  
			"bProcessing": true, 
	        "bServerSide": true,
	        "bJQueryUI": true,
	        "bDestroy": true,
	        "bAutoWidth": false,
	        "sPaginationType": "full_numbers",
	        "sAjaxSource": "Session",
	        "aaSorting": [[1, 'desc']],
	        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
	            aoData.push({"name": "key","value": 119}); 
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
		        				 $(".dataTables_filter").hide(); 
							}else{
								 appWait.hidePleaseWait();
								 
								noty({text: oaData.msg, type:'error', timeout:7000}); 
								 $(".dataTables_filter").hide(); 
								
		        			}	
		        		}else{
		        			
		        			noty({text:oaData.msg, type:'warning', timeout:5000});
		        		}
		        			 
	                },
	                "error": function(jqXHR, textStatus, errorThrown) { 
	                    if (textStatus !== "abort") { 
	                    	noty({text: textStatus , type:'error', timeout:7000});  
	                    }  
	                }
	            });
	        },
	        "fnInitComplete": function(a, json) { 
	            appWait.hidePleaseWait(); 
	            $("#tbFichajes_length select").css('color','#000000'); 
	          
	            setTimeout(function(){llenaComboEstadosMed();}, 300);
	            setTimeout(function(){llenaCmbTipoContacto();}, 300);  
	            setTimeout(function(){llenaCmbTipoSuelo();}, 300);
	           // setTimeout(function(){llenaCmbCantidades();}, 300);
	          //  
	            setTimeout(function(){llenaCmbLocales();}, 300);
	            setTimeout(function(){llenaCmbServicio();}, 300);
	            setTimeout(function(){llenaCmbAlimentos();}, 300);
	            setTimeout(function(){llenaCmbIndustria();}, 300);
	            setTimeout(function(){llenaCmbOtros();}, 300);
	            setTimeout(function(){llenaComboMotTrabajos();}, 300); 
	            setTimeout(function(){llenaComboTrabajos();}, 300);
	            setTimeout(function(){llenaComboCierreF();}, 300); 
	            
	        },    
	        "fnRowCallback": function(nRow, aaData, iDisplayIndex) { 
	        	$(nRow).find("td").eq(4).hide();
	        	$(nRow).find("td").eq(3).hide(); 
	         
	            $(nRow).find("img").on("click", function(event) {
	                var nTr = $(this).parents('tr')[0];
	                if (tableFichas.fnIsOpen(nTr)) {
	                    this.src = "./img/signoMas.png";
	                    tableFichas.fnClose(nTr);
	                } else {
	                	detalleFichaT(nTr, this);
	                }
	            });
	        }, 
			"aoColumns": [
							{ "sWidth": "2%",  "sClass": "left",  "bSortable": false },						
							{ "sWidth": "2%", "sClass": "left",  "bSortable": false }, 
							{ "sWidth": "50%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "1%", "sClass": "left",  "bSortable": false },
							{ "sWidth": "45%", "sClass": "left",  "bSortable": false }
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
		 
	}	
}


/******************/

function guardaFotoBean(nFoto) {
	var imgData1 = JSON.stringify(fotoByte); 
	var tipoF =  $('#imgF'+nFoto).attr('data-extencion'); 
	
	var param = new Array();
	param.push({"name" : "key", "value" : 195});
	param.push({"name" : "idFicha", "value" : idFicha});
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
				 $('#foto2').attr('disabled', false);  
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
	$("#div-imgF"+nFoto).hide();
	 switch (nFoto) {
		case 1:
			 fileF1 =null;
			 ruta1 =null;	
			break;
		case 2:
			 fileF2 = null;	
			 ruta2 =null;	
			break;
		case 3:
			 fileF3 = null;	
			 ruta3 =null;	
			break;
		case 4:
			 fileF4 = null;
			 ruta4 =null;	
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
			  
			guardarFichaje(1, 1);						
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
	
	$("#btnGuardarAlca").on('click', function(){
		try{			
			  
			guardarFichaje(3, 1);						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	
	$("#btnFotografia").on('click', function(){
		try{			
			  
			// $("#conte-cfotos").show();
			 $("#conte-imagenCarga").show(); 
			 $("#filaDos").hide();
			 $("#filaFotos").show();
			 
			 
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
 
	$("#btnCargarFotoAl").on('click', function(){
		try{			
			  
			$("#filaFotosAl").hide();
			$("#filaNovena").show();  
			 
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
	
	//editar ficha
	$("#btnActualizarAlca").on('click', function(){
		try{			
			  
			guardarFichaje(3, 2);						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnActualizarFichaje").on('click', function(){
		try{			
			  
			guardarFichaje(1, 2);						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnActualizarFichajeAlcanta").on('click', function(){
		try{			
			  
			guardarFichaje(2, 2);						
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#div-TFichajeAlcanta").on('click', function(){
		try{			
			  
			divAnterior = "#filaDecima";				
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	
	$("#div-TFichajeAlcanta").on('click', function(){
		try{			
			  
			divAnterior = "#filaDecima";				
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#div-TFichaje").on('click', function(){
		try{			
			  
			divAnterior = "#filaOctava";				
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	

	$("#div-TAlca").on('click', function(){
		try{			
			  
			divAnterior = "#filaOctava";				
		} catch (e) {
			alert(e.name+": "+e.message);
		}
		
	});
	
	$("#btnAntTrabajo").on('click', function(){
		try{			
			$(divAnterior).show();
			$("#filaTrabajos").hide();
			 				
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
	
	
	
 
	listadoFichas();
	
});