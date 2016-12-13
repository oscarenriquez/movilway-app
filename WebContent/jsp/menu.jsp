<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="security.dao.exception.InfraestructureException"%>
<%@ page import="security.dao.util.HibernateUtil"%>
<%@ page import="security.view.bean.SessionBean"%>
<%@ page import="security.dao.domain.Usuario"%>
<%@ page import="java.util.Date"%>
<%@ page import="movilway.service.util.FechaHoraUtil"%>
<%@ page import="movilway.view.helper.ConstantsHelper"%>
<%
HttpSession sessionRequest = request.getSession(false);
String urlApp = "http://"+request.getServerName();
Boolean isSuper = false;
Date dNow = new Date( );

if(sessionRequest == null){
	response.sendRedirect(urlApp);
}else{
	SessionBean sessionBean = (SessionBean) sessionRequest.getAttribute("sessionBean");
	if(sessionBean != null){
		Usuario usuario = sessionBean.getUsuario();
		if(usuario != null){
			isSuper = usuario.getSuperUsuario().equals((byte) 1);
			System.out.println("Fecha "+FechaHoraUtil.getStringDate(dNow)+" | TO "+urlApp+" | USER "+usuario.getUser());
		} else {
			System.err.println("Fecha "+FechaHoraUtil.getStringDate(dNow)+" ERROR IN USER - POSIBLE ATAQUE ");
			response.sendRedirect(urlApp);
		}			
	} else {			
		System.out.println("Fecha "+FechaHoraUtil.getStringDate(dNow)+" ERROR IN SESSIONBEAN ");
		response.sendRedirect(urlApp);
	}			  
}
%>
<!DOCTYPE html>
	<html lang="es">
	<head>
			<meta charset="UTF-8" />
		    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		    <meta name="description" content="MOVILWAY"/>
		    <meta name="apple-mobile-web-app-capable" content="yes" />
		    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0" />
		    <link rel="shortcut icon" href="./img/favicon.ico" />
		    <link rel="stylesheet" href="./css/bootstrap.min.css" />
		    <link rel="stylesheet" href="./css/bootstrap-theme-green.css" />
		    <style type="text/css" media="screen">
			@import "./css/demo_table_jui.css";
			@import "./css/demo_table_complete.css";
			@import "./css/jquery-ui-1.7.2.custom.css";
			
			/*
			 * Override styles needed due to the mix of three different CSS sources! For proper examples
			 * please see the themes example in the 'Examples' section of this site
			 */
			.dataTables_info { padding-top: 0; }
			.dataTables_paginate { padding-top: 0; }
			.css_right { float: right; }
			
			</style>
			<link rel="stylesheet" href="./css/component.css" />
			<link rel="stylesheet" href="./css/alertify.core.css" />
			<link rel="stylesheet" href="./css/alertify.default.css"/>
		    <link rel="stylesheet" href="./css/alertify.bootstrap.css"  id="toggleCSS"  />
		    <link rel="stylesheet" href="./css/highslide.css" />
		    <link rel="stylesheet" href="./css/chosen-black.css"/>
			<link rel="stylesheet" href="./css/page.css" />
			<link rel="stylesheet" href="./css/idleTimeOut.css" />
			<link rel="stylesheet" href="./css/datepicker.css" />
	    	<link rel="stylesheet" href="./css/datetimepicker.min.css" />	    	   		   
	    	<link rel="stylesheet" href="./css/bootstrap-switch.css">     	    	
	    	<link rel="stylesheet" href="./css/animate.min.css">  	    	
	    	
			<script src="./script/modernizr.custom.js"></script>
			
			<script src="./script/initializeCSS.js"></script>
		    <title><%=ConstantsHelper.Title.toUpperCase()%></title>  		   
	</head>
	<body role="document">
	
	<%
		try {
			HibernateUtil.beginTransaction();
	%>
	<!-- Menu Container -->
	<jsp:include page="<%=ConstantsHelper.sServlet%>" flush="true">
		<jsp:param name="key" value="-7" />
		<jsp:param name="contexto"
			value="<%=ConstantsHelper.App.toUpperCase()%>" />
	</jsp:include>
	<div id="panel">
		<!-- panel Container-->
		<jsp:include page="<%=ConstantsHelper.sServlet%>" flush="true">
			<jsp:param name="key" value="-6" />
		</jsp:include>
	</div>
	
	<!-- dialog window markup -->
	<div style="display: none;" id="dialog" title="Su sesion está a punto de caducar!">
		<p>
			<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>
			Usted sera desconectado en <span id="dialog-countdown" style="font-weight:bold"></span> segundos.
		</p>
		
		<p>¿Quiere continuar con la sesion?</p>
	</div>
		
	<%
		HibernateUtil.commitTransaction();
		} catch (InfraestructureException e) {
			try {
				HibernateUtil.rollbackTransaction();
			} catch (InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} finally {
			try {
				if (HibernateUtil.getSession().isOpen()) {
					HibernateUtil.closeSession();
				}
			} catch (InfraestructureException e) {
				e.printStackTrace();
			}
		}
	%>
		
		<form id="formAux" method="post">
			<input id="key2" name="key" type="hidden" value="0" />
		</form>
		
		<!-- Contenido Principal -->
		<div class="container-fluid"  id="principal">
			<!-- Contenido -->
		</div>			
		
		<script src="http://maps.google.com/maps/api/js?sensor=false"></script> 
		<script src="./script/infobubble-compiled.js"></script> 
		<script src="./script/jquery-1.9.1.js"></script>
		<script src="./script/jquery-ui-1.9.2.custom.min.js"></script>
		    
		<script src="./script/jquery.throttle.min.js"></script>
		<script src="./script/jquery.fileDownload.js?v3.9"></script>	    
	    <script src="./script/bootstrap.min.js"></script>
	    <script src="./script/jquery.dataTables.min.js"></script>
	    <script src="./script/datatables.fnReloadAjax.js"></script>
	    
	    <!-- IdleTimeOut -->
		<script src="./script/jquery.idletimer.js" ></script>
		<script src="./script/jquery.idletimeout.js"></script>	    
		<script src="./script/idleTimeOut.js"></script>	
	    
	    <!-- Highcharts -->
	    <script src="./script/highstock-2.1.2.js"></script>
	    <script src="./script/highcharts-3d-4.0.4.js"></script>
	    <script src="./script/highcharts-more-4.0.4.js"></script>	    
	    <script src="./script/exporting-4.0.4.js"></script>	    
	    <script src="./script/highcharts-heatmap.js"></script>
		<script src="./script/themes/gray.js"></script>							
				
		<!-- Plugins Controles -->
	    <!-- Easy Pie Chart and Quick Stats -->
	    <script src="./script/jquery.easing.js"></script>
	    <script src="./script/jquery.easypiechart.min.js"></script>
	    <script src="./script/jquery.sparkline.js"></script>	  
		
	    <!-- Plugins Controles -->
	    
	    <!-- Alertify -->
	    <script src="./script/alertify.js"></script>
	    
	    <!-- Choosen -->
	    <script src="./script/chosen.jquery.js"></script>
	    
	    <!-- datepicker -->
	    <script src="./script/bootstrap-datepicker.js"></script>
	    <script src="./script/prototype.js"></script>
	    <script src="./script/datetimepicker.js"></script>
	    
	    <!-- App Own -->
	    <script src="./script/menu.js"></script>
	    <script src="./script/page.js"></script>   
	    <script src="script/jquery.noty.packaged.min.js"></script>
	    <script src="script/maplace-0.1.3.js"></script>	  
		<script src="./script/mapaScript.js"></script>		  	    	    	    
	      
	</body>
</html>