<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="security.view.bean.*, security.dao.domain.*"%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="description" content="Ticket" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<meta name="keywords" content="SIG, Sistema Gerencial, Empagua">
<link rel="shortcut icon" href="./img/favicon.ico" />
<SCRIPT type="text/javascript">
	function func_1(thisObj, thisEvent) {
		document.forms[0].submit();
	}
</SCRIPT>
</HEAD>
<%
	String key = (String) request.getParameter("key");
	String reporte = (String) request.getParameter("reportFileName");
	String p_orden = (String) request.getParameter("p_orden");
	String p_tcncon = (String) request.getParameter("p_tcncon"); 
	String logo1 = (String) request.getParameter("logo1");
	String logo2 = (String) request.getParameter("logo2"); 
	

	if (reporte == null || reporte.isEmpty() || reporte.length() == 0) {
		reporte = "-1";
	}
	
	if (p_orden == null || p_orden.isEmpty() || p_orden.length() == 0) {
		p_orden = "-1";
	}

	if (p_tcncon == null || p_tcncon.isEmpty() || p_tcncon.length() == 0) {
		p_tcncon = "-1";
	}
 
	
	if(key == null){
		key = "57";
	}
 
%>
<BODY onload="return func_1(this, event);">
	<FORM action="../Session" name="formone" method="post">
		<input type="hidden" name="key" value="<%=key%>" />
		<input type="hidden" name="reportFileName" value="<%=reporte%>" />
		<input type="hidden" name="p_orden" value="<%=p_orden%>" />
		<input type="hidden" name="p_tcncon" value="<%=p_tcncon%>" />        
		<input type="hidden" name="logo1" value="<%=logo1%>" /> 
		<input type="hidden" name="logo2" value="<%=logo2%>" /> 
	</FORM>
</BODY>
</HTML>