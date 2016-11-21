/*$(document).ready(function(){
	//$.post("LangManager", {"opt": "getLang"}, function(data){ chgLang(data); });
	var ln = x=window.navigator.language||navigator.browserLanguage;
	if(ln.toUpperCase() == 'ES') {
		$.post("LangManager", {"opt": "setLang", "lang": "es"});
	}else if(ln.toUpperCase() == 'EN-US') {
		$.post("LangManager", {"opt": "setLang", "lang": "en"});
	} else{
		$.post("LangManager", {"opt": "setLang", "lang": "es"});
	}
});
*/

function getLang() {
	var ln = x=window.navigator.language||navigator.browserLanguage;
	if(ln.toUpperCase() == 'ES') {
		return chgLang('es');
	}else if(ln.toUpperCase() == 'EN-US') {
		return chgLang('en');
	} else{
		return chgLang('es');
	}
}

function chgLang(lang){
	try {
		var df = $.Deferred();
		jQuery.i18n.properties({
		    name:'locale', 
		    path:'locales/', 
		    mode:'map',
		    language:lang,
		    cache: false,
		    async: false,
		    callback: function() {		    	
		    	updateDomText();
		    	df.resolve('resolve');
		    	/*$.post("LangManager", {"opt": "setLang", "lang": lang});*/
		    }
		});
		return df.promise();
	} catch (e) {
		console.log(e);
	}	
}	

function updateDomText(){
	$(".i18n").each(function(i, element){
		if(element.tagName == "INPUT"){
			if($(element).is("[type=text]")||$(element).is("[type=password]")){
				$(element).attr("placeholder", jQuery.i18n.prop(element.id));
			}
		 
		}else{
			if(element.firstElementChild !== null && element.firstElementChild !== undefined ){
				if(element.firstElementChild.id !== null && element.firstElementChild.id !== ""){
					$(element.firstElementChild).html(jQuery.i18n.prop(element.firstElementChild.id));
				}
				$(element).html(jQuery.i18n.prop(element.id)+" "+ element.firstElementChild.outerHTML);
			}else{
				$(element).html(jQuery.i18n.prop(element.id));
			}
			
		}
			
	});
}

