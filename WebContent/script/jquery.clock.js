(function($, window, document, undefined){
	"use strict";	
	$.fn.clock = function( options ) {
		var defaults = {
			boxClass: "box-white",
			numberClass: "number-clock",
			pointClass: "point-clock",
			warningClass: "amarillofont",
			dangerClass: "rojofont",
			minTime: "00:01:00",
			maxTime: "00:05:00"		
		}, seconds = 0, minutes = 0, hours = 0, $this = this;
		
		var settings = $.extend(defaults, options);
		$this.addClass(settings.boxClass);
		
		$('<span class="'+settings.numberClass+'" id="hours">00</span>').appendTo($this);
		$('<span class="'+settings.pointClass+'" >:</span>').appendTo($this);
		$('<span class="'+settings.numberClass+'" id="minutes">00</span>').appendTo($this);
		$('<span class="'+settings.pointClass+'" >:</span>').appendTo($this);
		$('<span class="'+settings.numberClass+'" id="seconds">00</span>').appendTo($this);
		var $hours = $("#hours"), $minutes = $("#minutes"), $seconds = $("#seconds");
		var cronometroID = null;
		
		function digitalClock(){			
			console.log(seconds);
			seconds++;
			if(seconds==60){
			    seconds=0;
				minutes++;
                    if(minutes==60){
                    	minutes=0;
                    	hours++;
                    	$hours.html((hours < 10 ? "0" : "") + hours);
                    }
                    $minutes.html((minutes < 10 ? "0" : "") + minutes);
                }
			$seconds.html((seconds < 10 ? "0" : "") + seconds);
				
			var time = timeToSec(getTime(hours, minutes, seconds));
			var maxTimePr = timeToSec(settings.maxTime);
			var minTimePr = timeToSec(settings.minTime);
						
			if(time >= minTimePr){
				if(time >= maxTimePr){								
					$hours
						.removeClass(settings.warningClass)
						.addClass(settings.dangerClass)
						.siblings()
							.removeClass(settings.warningClass)
							.addClass(settings.dangerClass);								
				}else{								
					$hours
						.removeClass(settings.dangerClass)
						.addClass(settings.warningClass)
						.siblings()
							.removeClass(settings.dangerClass)
							.addClass(settings.warningClass);
				}
			}
						
			if($("#hours").length){
				cronometroID = setTimeout(digitalClock, 1000);
			}			
		}
		
		function timeToSec(time){
			var spec = time.split(":", 3);
			return (parseInt(spec[0])*60*60)+(parseInt(spec[1])*60)+parseInt(spec[2]);
		}
		
		function getTime(hour,minute,second){
			return (hour+":"+minute+":"+second);
		}		
		cronometroID = setTimeout(digitalClock, 1000);
		return $this;
	};			
}(jQuery));