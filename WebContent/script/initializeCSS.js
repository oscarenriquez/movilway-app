var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {     
	  	var css = xhttp.responseText;
	    head = document.head || document.getElementsByTagName('head')[0],
	    style = document.createElement('style');
	    style.type = 'text/css';
	    
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
	
		head.appendChild(style);
  }
}
xhttp.open("POST", "Session", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("key=-4");