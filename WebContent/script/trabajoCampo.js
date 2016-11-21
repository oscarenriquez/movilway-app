var intervalsDeclared = new Array();
var itemsAppStorage = new Array();
var appWait;

function setLocalStorage(id, val){
	if(!itemsAppStorage.contains(id)){
		itemsAppStorage.push(id);
	}	
	localStorage.setItem(id, val);
}

function getLocalStorage(id){
	return  localStorage.getItem(id);
}

function removeLocalStorage(id){
	var idx = itemsAppStorage.indexOf(id);
	if(idx > -1){
		itemsAppStorage.splice(idx, 1);
	}
	localStorage.removeItem(id);
}

function clearAppStorage(){	
	for(var i = 0; i < itemsAppStorage.length; i++){		
		removeLocalStorage(itemsAppStorage[i])
	}
}


appWait = appWait || (function () {
    var pleaseWaitDiv = $('<div class="modal no-seleccionable" style="cursor:wait;overflow:hidden;background:rgba(0,0,0,0.8);" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="myModal"> '+
    						'<div class="modal-dialog" style="margin-top:13%;width:100%;"> '+
    						'	<div> '+
    						'   <div class="modal-body"> '+
    						'      <h1 class="text-center" style="font-weight: bold; color: #2187e7;">Procesando</h1> '+
    						'		<div class="content"> '+
    						'			<div class="circle"></div> '+
    						'			<div class="circle1"></div> '+
    						'		</div> '+
    						'  	</div> '+
    						'	</div> '+
    						'</div> '+
    					  '</div>');     
    return {
        showPleaseWait: function() {
        	pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
        	if(this.isVisible()){
        		pleaseWaitDiv.modal('hide');        	
        	}            
        },        
        isVisible: function() {        	
    		if(pleaseWaitDiv.is(":visible")){
    			return true;
    		}
    		return false;        	
        } 
    };
})();

function isEmailM(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
}

function isNumberM(number){
	if(!isNaN(number)){		
		return true;
	}
	return false;
}

function vParamM(param){	
	if(param !== undefined && param !== null && param !== ""){
		if(isNaN(param) && param.length > 0){
			return true;
		}
		if(param.toString() > 0){
			return true;
		} 
	}
	return false;
}

function build(obj, event, key){
	intervalCleaned();
	appWait.showPleaseWait();
	$("#principal").load("./Session", {"key":key}, function(responseTxt, statusTxt, xhr){
		appWait.hidePleaseWait();
		if(statusTxt=="error"){
			logException(responseTxt, statusTxt, xhr);
		}
		
		
	});
	
}

function buildFormBackMobi(key, id){ 
	$("#principal").load("./Session", {"key":key,"id":id}, function(responseTxt,statusTxt,xhr){
		 
		if(statusTxt=="error"){
			logException(responseTxt, statusTxt, xhr);
		}
		 $(this).trigger('create');
	});
}

$(document).ready(function(){
   
	 $("#logout").on("click",function(event, ui) {
		 clearAppStorage();
		 document.getElementById('formAux').submit();	 	
	});
	 
	 
	 
	 $("#btnRuteo").on("click",function(event, ui) {
		 buildFormBackMobi(125, null); 	
	});
	 
	var css = "color: red; font-size: 40px; text-shadow: 1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black";
	console.log("%cEMPAGUA-SECURITY", css);
	var css2 = "background: #333; color: white; font-size: 20px; line-height: 40px; padding: 5px";
	console.log("%cEsta es una función de navegador destinado para los desarrolladores. Te recomendamos que no intentes nada por acá pues podría afectar el funcionamiento de tu cuenta.", css2);
	  
	buildFormBackMobi(116, null);
});
 
 