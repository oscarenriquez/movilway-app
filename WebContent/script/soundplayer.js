var playlist;
var playItem = 0;
var playing = false;
function play(playCount) {
	var timesPlayed = 0;
	var player = jQuery("#jquery_jplayer_1");
	playing = true;
	player.jPlayer({
		ready: function () {
			jQuery(this).jPlayer("setMedia", {
				mp3: "audio/doorbell.mp3",
			}).jPlayer("play");
		},
		ended: function() { // The jQuery.jPlayer.event.ended event
			timesPlayed++;
			if(timesPlayed < playCount) {
				player.jPlayer("play");
			}
			else {
				jQuery("#jquery_jplayer_1").jPlayer("destroy");
				playing = false;
			}
		},
		solution: "flash, html",
		wmode: "window",
		swfPath: "swf",
		supplied: "mp3"
    });
}

function playPrinterSfx()
{
	var player = jQuery("#jquery_printerPlayer");
	player.jPlayer({
		ready:function()
		{
			jQuery(this).jPlayer("setMedia",{
				mp3: "audio/dot_matrix_printer.mp3"
			}).jPlayer("play");
			
			/*setTimeout(function(){
				jQuery("#ticket").animate({
					bottom: 40
				}, "slow");
			},500);*/
			
		},
		ended: function(){
			jQuery("#jquery_printerPlayer").jPlayer("destroy");
		},
		solution: "flash, html",
		wmode: "window",
		swfPath: "swf",
		supplied: "mp3"
	});
}

function playVoice(repeatCall) {
	var timesPlayed = 1;
	var player = jQuery("#jquery_jplayer_1");
	playing = true;
	play = false;
	player.jPlayer({
		ready: function () {
			playItem = 0;
			playListChange(playItem);
		},
		ended: function() { // The jQuery.jPlayer.event.ended event
			
			if(playItem < playlist.length) {
				playListChange(playItem);
			}
			else if(timesPlayed < repeatCall) {
				timesPlayed++;
				playListChange(0);
			}
			else {
				console.log("destroy");
				jQuery("#jquery_jplayer_1").jPlayer("destroy");
				playing = false;
				$.unblockUI({ 
					   onUnblock: function(){ 
						  $("video").each(function(){
								$(this).get(0).play();
								recall = true;
								servidor = true;
								});
			   	   }             
				   });
				
				
				
				
			}
			play = true;
		},
		playlistOptions: {
			  autoPlay: false,
			  loopOnPrevious: false,
			  enableRemoveControls: false,
			  removeTime: 'fast',
		},
		solution: "flash, html",
		wmode: "window",
		swfPath: "swf",
		supplied: "mp3"
    });
	
	return play;
	
}

function playVoiceRecall(repeatCall) {
	var timesPlayed = 1;
	var player = jQuery("#jquery_jplayer_1");
	playing = true;
	play = false;
	player.jPlayer({
		ready: function () {
			playItem = 0;
			playListChange(playItem);
		},
		ended: function() { // The jQuery.jPlayer.event.ended event
			
			if(playItem < playlist.length) {
				playListChange(playItem);
			}
			else if(timesPlayed < repeatCall) {
				timesPlayed++;
				playListChange(0);
			}
			else {
				console.log("destroy");
				jQuery("#jquery_jplayer_1").jPlayer("destroy");
				playing = false;
				$.unblockUI({ 
					   onUnblock: function(){ 
						  $("video").each(function(){
								$(this).get(0).play();
								turno = true;
								servidoRecall = true;
								});
			   	   }             
				   });
				
				
				
				
			}
			play = true;
		},
		playlistOptions: {
			  autoPlay: false,
			  loopOnPrevious: false,
			  enableRemoveControls: false,
			  removeTime: 'fast',
		},
		solution: "flash, html",
		wmode: "window",
		swfPath: "swf",
		supplied: "mp3"
    });
	
	return play;
	
}

/*function createPlaylist(queueNumber, prefix, suffix, section, counterNo, isDemo, hasInitial, hasPost) {*/

function createPlaylist(prefix, suffix, counterNo, section, ventanilla, hastks, hasInitial, hasPost) {
	playlist = new Array();
	
	var counter = -1;
	
	//paging start
	if(hasInitial == true) {
		playlist[++counter] = "audio/paging1.mp3";
	}
	
	//prefix
	if(prefix!=null && prefix!='') {
		playlist[++counter] = "audio/" + prefix +".mp3";
	}
	
	if(suffix!=null && suffix!='') {
		playlist[++counter] = "audio/" + suffix +".mp3";
	}
	
	if(counterNo!=null && counterNo!='') {
		if(counterNo <=30){
			playlist[++counter] = "audio/" + counterNo +".mp3";	
		}else if(counterNo>30 && counterNo <= 99) {
			var dec = parseInt(counterNo / 10);
			var uni = counterNo % 10 ;
			
			if(dec == 3){
				playlist[++counter] = "audio/" + dec +"0.mp3";
				
			}else if (dec == 4){
				playlist[++counter] = "audio/" + dec +"0.mp3";
				
			}else if (dec == 5){
				playlist[++counter] = "audio/" + dec +"0.mp3";
				
			}else if (dec == 6){
				playlist[++counter] = "audio/" + dec +"0.mp3";
				
			}else if (dec == 7){
				playlist[++counter] = "audio/" + dec +"0.mp3";
				
			}else if (dec == 8){
				playlist[++counter] = "audio/" + dec +"0.mp3";
				
			}else if (dec == 9){
				playlist[++counter] = "audio/" + dec +"0.mp3";
			}
			
			if(uni != 0){
				playlist[++counter] = "audio/Y.mp3";
				playlist[++counter] = "audio/" + uni +".mp3";
			}
			
		}else if(counterNo==100){
			playlist[++counter] = "audio/" + counterNo +".mp3";
		}else if(counterNo>101 && counterNo <= 999){
			var cen = parseInt(counterNo / 100);
			var dec = counterNo % 100 ;
			
			if(cen == 1){
				playlist[++counter] = "audio/Ciento.mp3";
				
			}else if (cen == 2){
				playlist[++counter] = "audio/200.mp3";
				
			}else if (cen == 3){
				playlist[++counter] = "audio/300.mp3";
				
			}else if (cen == 4){
				playlist[++counter] = "audio/400.mp3";
				
			}else if (cen == 5){
				playlist[++counter] = "audio/500.mp3";
				
			}else if (cen == 6){
				playlist[++counter] = "audio/600.mp3";
				
			}else if (cen == 7){
				playlist[++counter] = "audio/700.mp3";
				
			}else if (cen == 8){
				playlist[++counter] = "audio/800.mp3";
				
			}else if (cen == 9){
				playlist[++counter] = "audio/900.mp3";
			}
			
			
			if(dec >=1 && dec <=30){
				playlist[++counter] = "audio/" + dec +".mp3";
				
			}else if(dec >=31 && dec <=99) {
				var dec2 = parseInt(dec / 10);
				var uni2 = dec % 10 ;
				
				if(dec2 == 3){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
					
				}else if (dec2 == 4){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
					
				}else if (dec2 == 5){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
					
				}else if (dec2 == 6){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
					
				}else if (dec2 == 7){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
					
				}else if (dec2 == 8){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
					
				}else if (dec2 == 9){
					playlist[++counter] = "audio/" + dec2 +"0.mp3";
				}
				if(uni2 != 0){
					playlist[++counter] = "audio/Y.mp3";
					playlist[++counter] = "audio/" + uni2 +".mp3";
				}
				
				
			}
			
			
		}
		
		
	}
	
	if(section!==null && section!='') {
		playlist[++counter] = "audio/" + section +".mp3";
	}
	
	if(ventanilla!==null && ventanilla!='') {
		playlist[++counter] = "audio/" + ventanilla +".mp3";
	}
	
	/*if(hastks == true) {
		playlist[++counter] = "audio/Gracias.mp3";
	}*/
	
	//paging end
	if(hasPost == true) {
		playlist[++counter] = "audio/paging2.mp3";
	} else {
		playlist[++counter] = "audio/blank.mp3";
	}
	
		
	return true;
}

function playListChange( index ) {
	playItem = index;
	jQuery("#jquery_jplayer_1").jPlayer("setMedia", { mp3 : (playlist[playItem++])}).jPlayer("play");
}

function stop() {
	jQuery("#jquery_jplayer_1").jPlayer("stop");
}

function pulsateQueueNumber(tdelement) {		
	jQuery(tdelement).effect("pulsate", { times:7 }, 2000);
}