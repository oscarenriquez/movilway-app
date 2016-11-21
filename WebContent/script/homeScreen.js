var keys;
$(document).ready(function(){
	getKeys();
});

var context = [];
var buffer = [];
var audioSupport = true;
var sounds = ['woosh', 'woosh2', 'notification', 'plop', 'plop2', 'plop3'];
var isAcceso = false;
var app = 'movilway';

var standalone =  window.navigator.standalone;
var navegador = navigator.userAgent;
var ios = navegador.match(/like Mac OS X/i);
var iosDesk = navegador.match(/Mac OS X/i);
var iosMac = navegador.match(/Macintosh/i);
var android = navegador.match(/Mobile/i);
var chrome  = navegador.match(/Chrome/i);
var safari = navegador.match(/Safari/i);
var tamanio = screen.height-document.documentElement.clientHeight;
var passui= "";
var userui= "";
var bandui= "";


function getKeys() {
	$.jCryption.getKeys("EcServlet?doWizzard=true", function(receivedKeys) {
		keys = receivedKeys;
	});
}

function notification(content) {
    playSound('notification', 0);

    if ($('#alert').length > 0) {
        $('#alert').remove();
        clearTimeout(timeout);
    }

    $('#app').addClass('reduce');

    var notification = $('<div id="alert" />');
    notification.html(content);
    notification.appendTo('body');

    timeout = setTimeout(function () {
        notification.addClass('up');
        $('#app').removeClass('reduce');
        notification.delay(300).queue(function () {
            notification.remove();
            $(this).dequeue();
        });
    }, 6000);

    notification.bind('touchstart', function () {
        notification.addClass('up');

        notification.delay(300).queue(function () {
            notification.remove();
            $(this).dequeue();
        });
    });
    
    
    
   

}

function playSound(name, when_) {
    if (!buffer[name] || audioSupport == false)
        return;
    var source = context[name].createBufferSource();
    source.buffer = buffer[name];
    source.connect(context[name].destination);
    source.noteOn(when_);
};

function fetching() {
    $.each(sounds, function (i) {
        var name = sounds[i];
        if (typeof AudioContext !== "undefined") {
            context[name] = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context[name] = new webkitAudioContext();
        } else {
            audioSupport = false;
            return;
        }

        var request = new XMLHttpRequest();
        request.open("GET", "http://"+app+".outsmobi.net/audio/" + sounds[i] + '.mp3', true);
        request.responseType = "arraybuffer";
        request.onload = function () {
            	context[name].decodeAudioData(request.response, function (buffer_) {
                console.log('['+app+'] — Success: Decoded audio file: ' + sounds[i]);
                buffer[name] = buffer_;
            }, function () {
                console.log('['+app+'] — Error: Couldn\'t decode audio file: ' + sounds[i]);
            });
        };
        request.send();
    });
}


function carga(){				
	$.ajax({
	  type: "GET",
	  url: "./Action",		  
	  success: function(msg){
		  isAcceso = true;
		  console.log(">>>>> Servidor Arriba");
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		  console.log(XMLHttpRequest);
		  console.log(textStatus);
		  console.log(errorThrown);
	      isAcceso = false;
	  }
	}).always(function() {
		validaAgente();
	});		
}

function cryp(){
	 $.jCryption.encrypt(userui, keys, function(encrypted) {									
			$.jCryption.encrypt(passui, keys, function(encryptedPasswd) {	
				$('#clave').val(encryptedPasswd);
				$('#usuario').val(encrypted);
				$('#formLogin').submit();
			});
		});
	
}


function validaAgente(){
	if(ios && chrome){
		if (!window.navigator.onLine) {
			active = 1;
	        $('body').removeClass('preview').addClass('initialize').html('<div id="app"><h1>'+app+'</h1><p>OFFLINE<em>Requiere Conexion 3G o Wifi</em></p><div class="photo"></div><div class="background"></div><a class="in">In</a><div class="pagination"><span class="active"></span><span></span><span></span><span></span></div></div>');
	        $('.pagination').hide();
	        $(document).bind('touchstart', function (e) {
	            e.preventDefault();
	        });
	        notification(""+app+" requiere una conexi&oacuten 3G o Wi-Fi de trabajo.");
	    } else {
	    	 window.location = './Action'; 
	    	
	    	if(isAcceso){
	    		
				
			}else{
				window.location = './'+app+'Offline.html';
			}
	    }
	} else if(ios){
		
		if (!window.navigator.onLine) {
			active = 1;
	        $('body').removeClass('preview').addClass('initialize').html('<div id="app"><h1>'+app+'/h1><p>OFFLINE<em>Requiere Conexion 3G o Wifi</em></p><div class="photo"></div><div class="background"></div><a class="in">In</a><div class="pagination"><span class="active"></span><span></span><span></span><span></span></div></div>');
	        $('.pagination').hide();
	        $(document).bind('touchstart', function (e) {
	            e.preventDefault();
	        });
	        notification(""+app+" requiere una conexi&oacuten 3G o Wi-Fi de trabajo.");
	    } else {
	    		if(!standalone){
	    			console.log("Android-iOs Detected");
	    			var img = new Image();
	    			var canvas = document.createElement('canvas');
	    	        canvas.width = 144;
	    	        canvas.height = 144;
	    	        var context = canvas.getContext("2d");
	    	         
	    	        img.src = './img/Icon-72@2x.png';

	    	        img.onload = function () {
	    	            context.drawImage(img, 00, 00);
	    	            context.textAlign = "center";
	    	            context.fillStyle = '#11b2a1';
	    	            context.textBaseline = "middle";
	    	            context.font = "bold 32px HelveticaNeue";
	    	            var baseImg = canvas.toDataURL();
	    	            $('head').append('<link id="icon" rel="apple-touch-icon-precomposed" href="' + baseImg + '" />');
	    	        };
	    	        
	    	        $('body').addClass('install').html('<div id="install"><div id="homescreen"><span></span><h2 id="add">A&ntildeadir a <strong>Home Screen-IOS</strong></h2></div></div>');
	    	       
	    	        var count = 50;
	    	        var interval = null;
	    	        interval = setInterval(function () {
	    	            count++;
	    	            if (count > 200) {
	    	                clearInterval(interval);
	    	            }
	    	        }, 220);
	    		}else{
	    			
	    			
	    			if(isAcceso){
	    				 if (localStorage.getItem) {
	    		 		        passui = localStorage.getItem('pass');
	    		 		        userui = localStorage.getItem('user');
	    		 		        bandui = localStorage.getItem('band');	
	    		 		        if(bandui == "true"){
	    		 		        	$('#clave').val(passui);
	    		 		   		    $('#usuario').val(userui);
	    		 		   		    cryp();
	    		 		        	
	    		 		        }else{
	    		 		        	window.location = './Action';
	    		 		        }
	    		 		     }else{
	    		 		    	window.location = './Action'; 
	    		 		     }
    				}else{
    					window.location = './'+app+'Offline.html';
    				}
	    			
	    			
	    		}
	    }
		
	}else if (android){	
		
		if (!window.navigator.onLine) {
			active = 1;
	        $('body').removeClass('preview').addClass('initialize').html('<div id="app"><h1>'+app+'</h1><p>OFFLINE<em>Requiere Conexion 3G o Wifi</em></p><div class="photo"></div><div class="background"></div><a class="in">In</a><div class="pagination"><span class="active"></span><span></span><span></span><span></span></div></div>');
	        $('.pagination').hide();
	        $(document).bind('touchstart', function (e) {
	            e.preventDefault();
	        });
	        notification(""+app+" requiere una conexi&oacuten 3G o Wi-Fi de trabajo.");
	    } else {
	    	
	    	if ((tamanio>40)) {
	    		console.log("Standalone");
				console.log("Android-iOs Detected");
				var img = new Image();
				var canvas = document.createElement('canvas');
		        canvas.width = 144;
		        canvas.height = 144;
		        var context = canvas.getContext("2d");
		         
		        img.src = './img/Icon-72@2x.png';

		        img.onload = function () {
		            context.drawImage(img, 00, 00);
		            context.textAlign = "center";
		            context.fillStyle = '#11b2a1';
		            context.textBaseline = "middle";
		            context.font = "bold 32px HelveticaNeue";
		            var baseImg = canvas.toDataURL();
		            $('head').append('<link id="icon" rel="apple-touch-icon-precomposed" href="' + baseImg + '" />');
		        };
		        
		        $('body').addClass('install').html('<div id="install"><div id="homescreen"><span></span><h2 id="add">A&ntildeadir a <strong>Home Screen-Android</strong></h2></div></div>');
		        
		        var count = 50;
		        var interval = null;
		        interval = setInterval(function () {
		            count++;
		            if (count > 200) {
		                clearInterval(interval);
		            }
		        }, 220);
	            
	    	}else{
	    		if(isAcceso){
	    			 if (localStorage.getItem) {
	 	 		        passui = localStorage.getItem('pass');
	 	 		        userui = localStorage.getItem('user');
	 	 		        bandui = localStorage.getItem('band');	
	 	 		        if(bandui == "true"){
	 	 		        	$('#clave').val(passui);
	 	 		   		    $('#usuario').val(userui);
	 	 		   		    cryp();
	 	 		        }else{
	 	 		        	window.location = './Action';
	 	 		        }
	 	 		     }else{
	 	 		    	window.location = './Action'; 
	 	 		     }
				}else{
					window.location = './'+app+'Offline.html';
				}
	    	}
	    }
		
		
		
		
		
	} else if(iosDesk && iosMac && safari) {
		if (!window.navigator.onLine) {
			active = 1;
	        $('body').removeClass('preview').addClass('initialize').html('<div id="app"><h1>'+app+'</h1><p>OFFLINE<em>Requiere Conexion 3G o Wifi</em></p><div class="photo"></div><div class="background"></div><a class="in">In</a><div class="pagination"><span class="active"></span><span></span><span></span><span></span></div></div>');
	        $('.pagination').hide();
	        $(document).bind('touchstart', function (e) {
	            e.preventDefault();
	        });
	        notification(""+app+" requiere una conexi&oacuten 3G o Wi-Fi de trabajo.");
	    } else {
	    	
	    	if(isAcceso){
	    		
	 		    	window.location = './Action'; 
	 		     
			}else{
				window.location = './'+app+'Offline.html';
			}
	    }
	}else if (chrome) {
		if (!window.navigator.onLine) {
			active = 1;
	        $('body').removeClass('preview').addClass('initialize').html('<div id="app"><h1>'+app+'</h1><p>OFFLINE<em>Requiere Conexion 3G o Wifi</em></p><div class="photo"></div><div class="background"></div><a class="in">In</a><div class="pagination"><span class="active"></span><span></span><span></span><span></span></div></div>');
	        $('.pagination').hide();
	        $(document).bind('touchstart', function (e) {
	            e.preventDefault();
	        });
	        notification(""+app+" requiere una conexi&oacuten 3G o Wi-Fi de trabajo.");
	    } else {
	    	
	    	if(isAcceso){
	    		
	 		    	window.location = './Action'; 
	 		     
			}else{
				window.location = './'+app+'Offline.html';
			}
	    }
		
		
	}else{
		
		if (!window.navigator.onLine) {
			active = 1;
	        $('body').removeClass('preview').addClass('initialize').html('<div id="app"><h1>'+app+'</h1><p>OFFLINE<em>Requiere Conexion 3G o Wifi</em></p><div class="photo"></div><div class="background"></div><a class="in">In</a><div class="pagination"><span class="active"></span><span></span><span></span><span></span></div></div>');
	        $('.pagination').hide();
	        $(document).bind('touchstart', function (e) {
	            e.preventDefault();
	        });
	        notification(""+app+" requiere una conexi&oacuten 3G o Wi-Fi de trabajo.");
	    } else {
	    	
	    	var img = new Image();
	    	var canvas = document.createElement('canvas');
	        canvas.width = 144;
	        canvas.height = 144;
	        var context = canvas.getContext("2d");
	         
	        img.src = './img/Icon-72@2x.png';

	        img.onload = function () {
	            context.drawImage(img, 00, 00);
	            context.textAlign = "center";
	            context.fillStyle = '#11b2a1';
	            context.textBaseline = "middle";
	            context.font = "bold 32px HelveticaNeue";
	            var baseImg = canvas.toDataURL();
	            $('head').append('<link id="icon" rel="apple-touch-icon-precomposed" href="' + baseImg + '" />');
	        };
	        
	        $('body').addClass('install').html('<div id="install"><div id="homescreen"><span></span><h2 id="add">Favor de Utilizar <strong> GOOGLE CHROME </strong></h2></div></div>');
	        
	        var count = 50;
	        var interval = null;
	        interval = setInterval(function () {
	            count++;
	            if (count > 200) {
	                clearInterval(interval);
	            }
	        }, 220);
	    	
	    }					
	}
}