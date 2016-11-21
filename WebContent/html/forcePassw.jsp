<!DOCTYPE html>
<html lang="es">
<head>
<%
	String uri = request.getContextPath();
    String user=(String)request.getParameter("usuario");
%>
<title>MOVILWAY</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="MOVILWAY">
<meta name="author" content="Dirseo Gonzalez">
<link rel="shortcut icon" href="./img/favicon.ico" />
<!-- titulo -->
<link rel="stylesheet" type="text/css" href="./css/style.css" />
<link rel="stylesheet" type="text/css" href="./css/alertify.bootstrap.css" />
<link rel="stylesheet" type="text/css" href="./css/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="./css/init.css" />
<link rel="stylesheet" type="text/css" href="./css/alertify.default.css" id="toggleCSS" />
<link rel="stylesheet" type="text/css" href="./css/html5demos.css" />


<script src="./script/modernizr.custom.63321.js"></script>
<script src="./script/jquery-1.9.1.js"></script>
<script src="./script/alertify.min.js"></script>
<script src="./script/validate-password.js"></script>
<script src="./script/h5utils.js"></script>
<!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
<link rel="shortcut icon" href="img/favicon.ico" />
</head>
    <body class="logg">
   <section id="wrapper9">
<article>
  <p><span id="status">checking...</span></p>
  <ol id="state"></ol>
</article>
<script>
var statusElem  = document.getElementById('status'),
    state 		= document.getElementById('state');

function online(event) {
  statusElem.className = navigator.onLine ? 'online' : 'offline';
  statusElem.innerHTML = navigator.onLine ? 'online' : 'offline';
  //state.innerHTML += '<li>New event: ' + event.type + '</li>';
  localStorage.setItem('conexion', navigator.onLine ? 'true' : 'false');
}

addEvent(window, 'online', online);
addEvent(window, 'offline', online);
online({ type: 'ready' });

</script>
    
</section>
        <div class="container">
		
			<header>
			
				<h1 id="cabecera">
					Cambio de Clave
				</h1>
				<h2>
				<i>Su contrase&ntilde;a ha expirado, por favor es necesario que la cambie.</i>
				<br />
					<strong>
						Datos m&iacute;nimos para idenficaci&oacute;n positiva
					</strong>
				</h2>
				<div class="support-note">
					<span class="note-ie">Lo sentimos, la version de su navegador no es compatible con la aplicacion.</span>
				</div>
			</header>
			<section class="main">
				<form class="form-2" id="formPass" name="formPass" method="post" action="./Action" >
				<input type="hidden" id="key" name="key" value="-4" />
					<input type="hidden" name="user" value="<%=user%>" />
					<h1></h1>	
					<p class="floatp">
						<label for="actual"><i class="icon-lock"></i>Clave Actual</label>
						<input type="password" name="actual" id="actual" placeholder="Clave Actual">
					</p>
					<p class="floatp">
						<label for="clave"><i class="icon-refresh"></i>Nueva Clave</label>
						<input type="password" name="clave" id="clave" placeholder="Nueva Clave">
					</p>
					<p class="floatp">
						<label for="confirmar"><i class="icon-ok"></i>Confirmar</label>
						<input type="password" name="confirmar"  id="confirmar" placeholder="Confirmar">
					</p>
					<p class="clearfix"> 
						<input type="submit" name="Cambiar-Pass" id="Cambiar-Pass" value="Enviar">
						<input type="button" name="Cancelar-Pass" id="Cancelar-Pass"  onclick="cancel()" value="Cancelar">
						<input type="hidden" id="action" name="action" value="cambiar" />
					</p>
				</form>€‹
			</section>
        </div>
        <!-- jQuery if needed -->
    </body>
</html>