package movilway.view.helper;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Estado;
import movilway.dao.domain.Pais;
import movilway.dao.domain.Provincia;
import movilway.dao.domain.RegionProvincia;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import movilway.service.util.ReporteExcel;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import security.dao.domain.Empresa;

@SuppressWarnings("serial")
public class ReporteAbastecimientoHelper extends ServicioHelper {

	public void dispacherMenuReporteAbastecimiento (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/reportePuntoVentaAbast.jsp");
	}
	
	public void generarReporteGrafica (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONArray points = new JSONArray();
			JSONArray categories = new JSONArray();
			JSONArray series = new JSONArray();
			StringBuilder encabezado = new StringBuilder();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			String subtitle = "";
			
			if(getSession() != null){
				String[] paises = req.getParameterValues("paises");
				String[] estados = req.getParameterValues("estados");
				String[] provincias = req.getParameterValues("provincias");
				String[] regiones = req.getParameterValues("regionProvincia");
				
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{
						List<Map<String, Object>> listado = getServiceLocator().getPuntoVentaService().getListaPuntoVentaFilteredReport(RUTERO, getEmpresaId(), 
								null, null, null, null, null, null, null, null, null, 
								paises, estados, provincias, regiones, null);
						
						Collections.sort(listado, new Comparator<Map<String, Object>>() {
							@Override
							public int compare(Map<String, Object> o1, Map<String, Object> o2) {
								Double saldo1 = (Double) o1.get("saldo");
								Double saldo2 = (Double) o2.get("saldo");
								return saldo2.compareTo(saldo1);
							}
						});												
						
						subtitle = getTituloGrafica(null, null);
						
						encabezado.append("Pais: ");
						for(String paisId : paises) {
							Pais pais = getServiceLocator().getPaisService().loadEntity(Pais.class, Long.valueOf(paisId));
							encabezado.append(pais.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());						
						
						encabezado.append("| Estado: ");
						for(String estadoId : estados) {
							Estado estado = getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.valueOf(estadoId));
							encabezado.append(estado.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());
						
						encabezado.append("| Provincia: ");
						for(String provinciaId : provincias) {
							Provincia provincia = getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.valueOf(provinciaId));
							encabezado.append(provincia.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());
						
						encabezado.append("| Region: ");
						for(String regionId : regiones) {
							RegionProvincia region = getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionId));
							encabezado.append(region.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());
						
						JSONObject obj = new JSONObject();						
						JSONArray data = new JSONArray();
									
						int i = 0, l = COLORS.length;
						for(Map<String, Object> mapa : listado) {
							JSONObject point = new JSONObject();
							
							
							String descripcion = (String) mapa.get("descripcion");
							String puntoVentaId = (String) mapa.get("puntoVentaId");
							String direccion = (String) mapa.get("direccion");
							Integer telefono = (Integer) mapa.get("telefono");
							Double saldo = (Double) mapa.get("saldo");
							Double lat = (Double) mapa.get("latitud");
							Double lon = (Double) mapa.get("longitud");
							JSONObject o = new JSONObject();
							
							o.put("y", saldo);
							o.put("color", COLORS[i]);
							
							categories.add(descripcion.toUpperCase());
							data.add(o);
														
							i++;
							if(i == l){
								i = 0;
							}
							
							StringBuilder contentHtml = new StringBuilder();
							contentHtml.append("<div id=\"content\">");
							contentHtml.append("<h4>").append(descripcion).append("</h4>");
							contentHtml.append("<p style=\"font-size: 16px;\">").append("Saldo:  <strong> "+df.format(saldo)+"</strong>").append("</p>");
							contentHtml.append("<p style=\"font-size: 16px;\">").append("Direccion:  <strong> "+direccion+"</strong>").append("</p>");
							contentHtml.append("<p style=\"font-size: 16px;\">").append("Telefono:  <strong> "+telefono+"</strong>").append("</p>");
					        contentHtml.append("</div>");
							
							point.put("lat", lat);
							point.put("lon", lon);
							point.put("title", descripcion);
							point.put("html", contentHtml.toString());							
							point.put("visible", true);									
							point.put("withLabel", false);																					
							point.put("show_infowindow", true);
							point.put("puntoVentaId", puntoVentaId);
							points.add(point);
						}
						
						obj.put("name", "Saldo");
						obj.put("data", data);
						
						series.add(obj);
						
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("generarReporteGrafica", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("generarReporteGrafica", e, getUsuarioBean(),  EMAIL);
						e.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					}						
				} else {
					isSuccess = false;
					msg = FALTA_PERMISOS;
				}
			} else {
				isSuccess = false;
				msg = PARAM_NECESARIOS;
			}
			
			result.put("subtitle", subtitle);
			result.put("series", series);
			result.put("categories", categories);
			result.put("points", points);
			result.put("legend", encabezado.toString());
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("generarReporteGrafica", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void generarReporteExcel (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String[] paises = req.getParameterValues("paises");
				String[] estados = req.getParameterValues("estados");
				String[] provincias = req.getParameterValues("provincias");
				String[] regiones = req.getParameterValues("regionProvincia");
				
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{
						String vArchivo = null;
						String archivoSalida = null;
						String archivoBase = null;
						StringBuilder encabezado = new StringBuilder();
						SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
						formatter = new SimpleDateFormat("dd");
						String vDia = formatter.format(new Date());
						formatter = new SimpleDateFormat("MM");
						String vMes = formatter.format(new Date());
						formatter = new SimpleDateFormat("yyyy");
						String vAno = formatter.format(new Date());
						formatter = new SimpleDateFormat("hh");
						String vHora = formatter.format(new Date());
						formatter = new SimpleDateFormat("mm");
						String vMin = formatter.format(new Date());
						formatter = new SimpleDateFormat("ss");
						String vSeg = formatter.format(new Date());						

						vArchivo = "ReporteAnaliticas" + vDia + vMes + vAno + vHora + vMin + vSeg + ".xlsx";
						archivoSalida = req.getServletContext().getRealPath("/report") + "/" + vArchivo;
						archivoBase = req.getServletContext().getRealPath("/report/PlantillaGenerica.xlsx");
						
						List<Map<String, Object>> listado = getServiceLocator().getPuntoVentaService().getListaPuntoVentaFilteredReport(RUTERO, getEmpresaId(), 
								null, null, null, null, null, null, null, null, null, 
								paises, estados, provincias, regiones, null);
						
						Empresa empresa = null;
						try {
							security.dao.util.HibernateUtil.beginTransaction();
							empresa = getSecurityService().getEmpresaByUsuario(getUsuario().getId());
							security.dao.util.HibernateUtil.commitTransaction();
						} catch (security.dao.exception.InfraestructureException e) {
							try {
								security.dao.util.HibernateUtil.rollbackTransaction();
							} catch (security.dao.exception.InfraestructureException e1) {
								e1.printStackTrace();
							}
							e.printStackTrace();
						} finally {
							try {
								security.dao.util.HibernateUtil.closeSession();
							} catch (security.dao.exception.InfraestructureException e) {
								e.printStackTrace();
							}
						}
						
						encabezado.append("Pais: ");
						for(String paisId : paises) {
							Pais pais = getServiceLocator().getPaisService().loadEntity(Pais.class, Long.valueOf(paisId));
							encabezado.append(pais.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());						
						
						encabezado.append("| Estado: ");
						for(String estadoId : estados) {
							Estado estado = getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.valueOf(estadoId));
							encabezado.append(estado.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());
						
						encabezado.append("| Provincia: ");
						for(String provinciaId : provincias) {
							Provincia provincia = getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.valueOf(provinciaId));
							encabezado.append(provincia.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());
						
						encabezado.append("| Region: ");
						for(String regionId : regiones) {
							RegionProvincia region = getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionId));
							encabezado.append(region.getDescripcion()).append(", ");
						}
						
						encabezado.delete(encabezado.length() - 2, encabezado.length());
						
						ReporteExcel reporte = new ReporteExcel();
						reporte.creaEncabezadoReporte(archivoBase, archivoSalida, empresa.getNombre(), getUsuarioBean(), encabezado.toString());
						reporte.cargarDataReporte(listado, null, false, 8, (short) 0);
						
						result.put("nombreArchivo", vArchivo);
						
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("generarReporteExcel", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("generarReporteExcel", e, getUsuarioBean(),  EMAIL);
						e.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					}						
				} else {
					isSuccess = false;
					msg = FALTA_PERMISOS;
				}
			} else {
				isSuccess = false;
				msg = PARAM_NECESARIOS;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("generarReporteExcel", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
		
}
