var _this = this;
_this.obj_geoCerca = false;
_this.locationsPolygon = [];
_this.lnPolygon = 0;
_this.markers = [];
_this.path = new google.maps.MVCArray; 
var poly = null, mapa = null, map = null, image="./img/marker/beachflag.png";

function removeLocations(){
	_this.obj_geoCerca = false;	
	
 	for(var i = 0; i < _this.lnPolygon; i++){ 		
 		_this.markers[i].setMap(null); 				
 	}
 	
 	_this.markers.splice(0, _this.markers.length); 	 	 		 	
 	_this.path.clear();
 	_this.locationsPolygon.splice(0, _this.locationsPolygon.length);
 	_this.lnPolygon = 0; 		
	var bottomPosition = ($(window).height() + 100) + "px";
	$("#slideDetalle").css({top : bottomPosition});
	$("#geoCerca").text('Geocerca').removeClass('btn-warning').addClass('btn-primary');	
	$("#totalGeoCerca").html(_this.locationsPolygon.length);
}

function addPolygonPoint(map, event){
	try {
		if(_this.obj_geoCerca) {		  
			  
			  _this.path.insertAt(_this.path.length, event.latLng);
			  
			  var marker = new google.maps.Marker({position: event.latLng, map: map, icon: image});
			  marker.setTitle("#" + _this.path.length);
			  _this.markers.push(marker);		  
			  _this.lnPolygon++;
			  
			  _this.locationsPolygon = mapa.PolygonGetLocations(poly);
			  
			  $("#totalGeoCerca").html(_this.locationsPolygon.length);			  			  		  		  		
		  }
	} catch(e){
		noty({text: "MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000});
	}	  				 
}

function createObjMap(points, legend){
	try {
		mapa = new Maplace({
	      locations: points,
	      generate_controls: false,
	      map_div: '#mapa-canvas',
	      map_options: {
	    	zoom: 16  
	      },
	      //type: 'circle',
	      visualRefresh: true,
	      stroke_options: {
	    	  strokeColor: '#0000FF',
	    	  strokeOpacity: 0.6,
	    	  strokeWeight: 2,
	    	  fillColor: '#0000FF',
	    	  fillOpacity: 0.2
	      },
	      listeners: {
	    	  click: addPolygonPoint
	      }
	    }).Load();
	   
	   	map = mapa.getObjectMap();
	   	
	   	poly = new google.maps.Polygon({
		   strokeWeight: 3,
		   fillColor: '#5555FF'
		});		  
		poly.setMap(map);
		poly.setPaths(new google.maps.MVCArray([path]));
		 
	} catch (e){		
		throw e;
	}		
}

function generaMapa(param, title){
	appWait.showPleaseWait();
	try{				
		
		$.post("Session", param , function(data) {
			try{
				if(data.permiso){					
					if(data.isSuccess){	
					   	createObjMap(data.points, data.legend);					   	
					} else {
						noty({text: data.msg, type:'error', timeout:7000});
					}
				} else {
					noty({text: data.msg, type:'warning', timeout:7000});
				}		
			} catch (e) {
				$("#cerrarMapa").trigger('click');
				noty({text: "MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000});				
			} 		
		}).done(function() {
			$("#btnOptions").show();
			appWait.hidePleaseWait();			
		}).fail(function(jqXHR, textStatus, errorThrown){
			$("#btnOptions").show();			
			appWait.hidePleaseWait();
			logException(jqXHR, textStatus, errorThrown);
		}).always(function(){
			$("#btnOptions").show();			
			$("#titleMap").html(title);
		});
	} catch (e) {
		alert("Error "+e.name+": "+e.message);
	}
}

function generaMapaCenso(param, title){
	appWait.showPleaseWait();
	try{				
		
		$.post("Session", param , function(data) {
			try{
				if(data.permiso){					
					if(data.isSuccess){							
						mapa = new Maplace({
					      locations: data.points,
					      generate_controls: false,
					      map_div: '#mapa-canvas',
					      type: 'circle',
					      map_options: {
						    	zoom: 16  
						  },
					      visualRefresh: true,
					      stroke_options: {
					    	  strokeColor: '#0000FF',
					    	  strokeOpacity: 0.6,
					    	  strokeWeight: 2,
					    	  fillColor: '#0000FF',
					    	  fillOpacity: 0.2
					      },
					      listeners: {
					    	  click: addPolygonPoint
					      }
					    }).Load();
					   
					   	map = mapa.getObjectMap();
					   	
					   	poly = new google.maps.Polygon({
						   strokeWeight: 3,
						   fillColor: '#5555FF'
						});		  
						poly.setMap(map);
						poly.setPaths(new google.maps.MVCArray([path]));
						
						$("#totalMapa").html(data.points.length);
						$("#legend-one").html(data.legend);
						$("#legends").show();
						$("#btnOptions").show();
						$("body").css({overflow: "hidden"});
					} else {
						noty({text: data.msg, type:'error', timeout:7000});
					}
				} else {
					noty({text: data.msg, type:'warning', timeout:7000});
				}		
			} catch (e) {
				noty({text: "MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000});
			} 		
		}).done(function() {
			$("#btnOptions").show();
			appWait.hidePleaseWait();			
		}).fail(function(jqXHR, textStatus, errorThrown){
			$("#btnOptions").show();			
			appWait.hidePleaseWait();
			logException(jqXHR, textStatus, errorThrown);
		}).always(function(){
			$("#btnOptions").show();			
			$("#titleMap").html(title);
		});
	} catch (e) {		
		alert("Error "+e.name+": "+e.message);		
	}
}

function detallesMapa(id){
	appWait.showPleaseWait();
	try{
		
		var param = [{"name" : "key", "value": 128},
		             {"name" : "idAnotacion", "value": id}];
		
		$.post("Session", param , function(data) {
			try{
				if(data.permiso){					
					if(data.isSuccess){	
						$("#actual").html(data.formulario.actual);
						$("#evento").html(data.formulario.evento);
						$("#fechaMapa").html(data.formulario.fecha);
						$("#usuarioCreo").html("Creado: <strong>"+data.formulario.usuarioCreo+"</strong>");
						$("#estado").html(data.formulario.estado);
						$("#asignado").html("Asignado: <strong>"+data.formulario.asignado+"</strong>");
						$("#descripcion").html(data.formulario.descripcion);
						$("#corr").html("Correlativo #"+data.formulario.corr);
						$("#detalleMapa").modal('show');
					} else {
						noty({text: data.msg, type:'error', timeout:7000});
					}
				} else {
					noty({text: data.msg, type:'warning', timeout:7000});
				}		
			} catch (e) {
				noty({text: "MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000});
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

function detallesMapaGeoCerca(e){	
	try{
		if(_this.locationsPolygon.length > 0){
			e.preventDefault();
			appWait.showPleaseWait();
			
			var param = [{"name" : "key", "value": 178},
			             {"name" : "anotaciones", "value": _this.locationsPolygon.toString()}];
			
			$.post("Session", param , function(data) {
				try{
					if(data.permiso){					
						if(data.isSuccess){							
							$("#tbBodyDetalleGeoCerca").html("");
							$.each(data.oaData, function(idx, value) {
								var trApp = "<tr>";
								$.each(value, function(i, e) {
									trApp +="<td>"+e+"</td>";
								});
								trApp += "</tr>";
								$("#tbBodyDetalleGeoCerca").append(trApp);
							});
							$("#overlayDetalleGeoCerca").modal('show');						
							$("#slideDetalle").animate({top: "0px"}, 1000);
						} else {
							noty({text: data.msg, type:'error', timeout:7000});
						}
					} else {
						noty({text: data.msg, type:'warning', timeout:7000});
					}		
				} catch (e) {
					noty({text: "MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000});
				} 		
			}).done(function() {
				appWait.hidePleaseWait();			
			}).fail(function(jqXHR, textStatus, errorThrown){
				appWait.hidePleaseWait();
				logException(jqXHR, textStatus, errorThrown);
			}).always(function(){
				appWait.hidePleaseWait();
			});
		}
	} catch (e) {
		alert("Error "+e.name+": "+e.message);
	}
}

function cerrarDetallesMapaGeoCerca(e){
	try {
		e.preventDefault();
		var bottomPosition = ($(window).height()+100)+"px";
		$("#slideDetalle").animate({top: bottomPosition}, 700, function(){
			$("#overlayDetalleGeoCerca").modal('hide');
		});
	} catch (e){
		$("#overlayDetalleGeoCerca").modal('hide');
		console.log(e.name+": "+e.message);
	}	
}

function cerrarMapa(e){
	try{
		e.preventDefault();
		$("#mapa").modal('hide');
		$("body").css({overflow: "auto"});
		$("#mapa-canvas").html('');
		$("#legend-one").html('');			
		$("#titleMap").html('');					
		$("#legends").hide();
		$("#btnOptions").hide();
		mapa = null;
		poly = null;
		map = null;
		
		try {
			removeLocations();
		} catch(e){
			console.log(e.name+": "+e.message);
		}
		
	} catch (e) {
		$("#mapa").modal('hide');
		$("body").css({overflow: "auto"});
		console.log(e.name+": "+e.message);
	}
}

function toggleGeoCerca(e){
	try {
		e.preventDefault();	
		if(_this.obj_geoCerca){
			try {
				removeLocations();
			} catch(e){
				console.log(e.name+": "+e.message);
			}		
		} else {
			_this.obj_geoCerca = true;
			$("#geoCerca").text('Eliminar Geocerca').addClass('btn-warning').removeClass('btn-primary');
		}
	} catch (e) {		
		alert("Error "+e.name+": "+e.message);
	}	
}

function showDetalleMapa(e){
	if( $(this).hasClass("active") || e==null ){
		$("#legends").animate({ bottom: '-150px' }, 400);
		$("#showLegends").animate({ bottom: '0px' }, 400).removeClass("active").html("<i class='glyphicon glyphicon-chevron-up'></i>");
	} else {
		$("#legends").animate({ bottom: '0px' }, 400);
		$("#showLegends").animate({ bottom: '150px' }, 400).addClass("active").html("<i class='glyphicon glyphicon-chevron-down'></i>");
	}
	
	if( e!=null )
		e.preventDefault();
}

function reportedetallesMapaGeoCerca(e){	
	try{
		if(_this.locationsPolygon.length > 0){
			e.preventDefault();
			appWait.showPleaseWait();
			
			var param = [{"name" : "key", "value": 179},
			             {"name" : "anotaciones", "value": _this.locationsPolygon.toString()}];
			
			$.post("Session", param , function(data) {
				        var form = $('<form method="post" class="fileDownloadForm" action="./Download">'); 
		                form.append($('<input type="hidden" name="nombre" value="' + data.nombre + '">'));
		                //form.append($('<input type="hidden" name="path" value="' + data.path + '">'))
		            //$('#principal').append(form);
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
			}).done(function() {
				appWait.hidePleaseWait();			
			}).fail(function(jqXHR, textStatus, errorThrown){
				appWait.hidePleaseWait();
				logException(jqXHR, textStatus, errorThrown);
			}).always(function(){
				appWait.hidePleaseWait();
			});
		}
	} catch (e) {
		alert("Error "+e.name+": "+e.message);
	}
}