$(document).ready(function(){
	// setup the dialog
	$("#dialog").dialog({
		autoOpen: false,
		modal: true,
		width: 400,
		height: 200,
		closeOnEscape: false,
		draggable: false,
		resizable: false,
		buttons: {
			'Si, Mantenga Trabajo': function(){
				$(this).dialog('close');
			},
			'No, Cierre Sesion': function(){
				// fire whatever the configured onTimeout callback is.
				// using .call(this) keeps the default behavior of "this" being the warning
				// element (the dialog in this case) inside the callback.
				$.idleTimeout.options.onTimeout.call(this);
			}
		}
	});

	// cache a reference to the countdown element so we don't have to query the DOM for it on each ping.
	var $countdown = $("#dialog-countdown");

	// start the idle timer plugin
	$.idleTimeout('#dialog', 'div.ui-dialog-buttonpane button:first', {
		idleAfter: 1800,
		pollingInterval: 2,
		keepAliveURL: '',
		serverResponseEquals: 'OK',
		onTimeout: function(){
			$("#formAux").attr("action", "./Session");
			$("#formAux #key2").val(-2);
			$("#formAux").submit();
		},
		onIdle: function(){
			$(this).dialog("open");
		},
		onCountdown: function(counter){
			$countdown.html(counter); // update the counter
		}
	});
});