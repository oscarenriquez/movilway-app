
$(document).ready(function(){
	
/*
window.addEventListener('load', function (e) {
    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            console.log('[OutsMobi-manifiest] Cache manifest updated. Relaunch required.');
            window.applicationCache.swapCache();
            console.log("addEventListener1-OutsMobi ");
        }
    }, false);
    console.log("addEventListener2-OutsMobi ");
    //carga();
}, false);
*/

window.applicationCache.onprogress = function (e) {               
    var message = 'Downloading offline resources.. ';

    if (e.lengthComputable) {
    	console.log(message + Math.round(e.loaded / e.total * 100) + '%');
    	
    	if( Math.round(e.loaded / e.total * 100) == 100){
    		carga();
    		console.log("llego a 100");
    	}
    } else {
    	console.log(message);
    };
};

function alerta(){
	
};


window.addEventListener('load', function(e) {
	  var appCache = window.applicationCache;
	  // Fired after the first cache of the manifest.
	  appCache.addEventListener('cached', handleCacheEvent, false);
	  // Checking for an update. Always the first event fired in the sequence.
	  appCache.addEventListener('checking', handleCacheEvent, false);
	  // An update was found. The browser is fetching resources.
	  appCache.addEventListener('downloading', handleCacheEvent, false);
	  // The manifest returns 404 or 410, the download failed,
	  // or the manifest changed while the download was in progress.
	  appCache.addEventListener('error', handleCacheError, false);
	  // Fired after the first download of the manifest.
	  appCache.addEventListener('noupdate', handleCacheCarga, false);
	  // Fired if the manifest file returns a 404 or 410.
	  // This results in the application cache being deleted.
	  appCache.addEventListener('obsolete', handleCacheCarga, false);
	  // Fired for each resource listed in the manifest as it is being fetched.
	  appCache.addEventListener('progress', handleCacheEvent, false);
	  // Fired when the manifest resources have been newly redownloaded.
	  appCache.addEventListener('updateready', handleCacheEvent, false);
	}, false);


	function handleCacheEvent(e) {		
	  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	      window.applicationCache.swapCache();
	      window.location.reload();
	    } 
	  console.log("handleCacheEvent-SIG "+e);	  
	};

	function handleCacheError(e) {
	  console.log("handleCacheError-SIG "+e);
	  carga();
	};

	function handleCacheCarga(e) {
	  console.log("handleCacheCarga-SIG "+e);
	  carga();
	};

	});