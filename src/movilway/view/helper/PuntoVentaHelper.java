package movilway.view.helper;

import static movilway.service.util.FechaHoraUtil.getParseDateLong;
import static movilway.service.util.FechaHoraUtil.getStringDate;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Estado;
import movilway.dao.domain.Pais;
import movilway.dao.domain.Provincia;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.domain.RegionProvincia;
import movilway.dao.domain.TipoPuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import movilway.view.util.DataTableObject;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class PuntoVentaHelper extends ServicioHelper {

	public void dispacherMenuPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/puntoVenta.jsp");
	}
	
	public void crearPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String puntoventaId = getStringValue(req.getParameter("puntoventaId"));
				String estado = getNumberValue(req.getParameter("estado"));
				String pais = getNumberValue(req.getParameter("pais"));
				String provincia = getNumberValue(req.getParameter("provincia"));
				String tipoPuntoVenta = getNumberValue(req.getParameter("tipoPuntoVenta"));
				String telefono = getNumberValue(req.getParameter("telefono"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String nivel = getNumberValue(req.getParameter("nivel"));
				String regionProvincia = getNumberValue(req.getParameter("regionProvincia"));
				String direccion = getStringValue(req.getParameter("direccion"));
				String observaciones = getStringValue(req.getParameter("observaciones"));
				String DPuntoventasuperior = getStringValue(req.getParameter("DPuntoventasuperior"));
				String saldo = getStringValue(req.getParameter("saldo"));
				String saldoFechahora = getStringValue(req.getParameter("saldoFechahora"));
				//String coordenada = getStringValue(req.getParameter("coordenada"));
				String latitud = getStringValue(req.getParameter("latitud"));
				String longitud = getStringValue(req.getParameter("longitud"));
				String puntoAbastecimiento = getStringValue(req.getParameter("puntoAbastecimiento"));
				String contacto = getStringValue(req.getParameter("contacto"));
				
				if(vParam(puntoventaId) && vParam(estado) && vParam(pais) && vParam(provincia) 
						&& vParam(tipoPuntoVenta) && vParam(saldo) && vParam(saldoFechahora) && vParam(puntoAbastecimiento)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							PuntoVenta puntoVenta = new PuntoVenta();
							puntoVenta.setPuntoventaId(puntoventaId);
							puntoVenta.setEmpresaId(getEmpresaId());
							puntoVenta.setEstado(getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.valueOf(estado)));
							puntoVenta.setPais(getServiceLocator().getPaisService().loadEntity(Pais.class, Long.valueOf(pais)));
							puntoVenta.setProvincia(getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.valueOf(provincia)));
							puntoVenta.setTipoPuntoVenta(getServiceLocator().getTipoPuntoVenta().loadEntity(TipoPuntoVenta.class, Long.valueOf(tipoPuntoVenta)));
							puntoVenta.setTelefono(Integer.valueOf(telefono));
							puntoVenta.setDescripcion(descripcion);
							puntoVenta.setNivel(nivel);
							puntoVenta.setRegionProvincia(getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionProvincia)));
							puntoVenta.setDireccion(direccion);
							puntoVenta.setObservaciones(observaciones);
							puntoVenta.setDPuntoventasuperior(DPuntoventasuperior);
							puntoVenta.setSaldo(new BigDecimal(saldo));
							puntoVenta.setSaldoFechahora(getParseDateLong(saldoFechahora));
							puntoVenta.setLatitud(Float.parseFloat(latitud));
							puntoVenta.setLongitud(Float.valueOf(longitud));
							puntoVenta.setPuntoAbastecimiento(new BigDecimal(puntoAbastecimiento));
							puntoVenta.setContacto(contacto);
							
							getServiceLocator().getPuntoVentaService().saveEntity(puntoVenta);
							HibernateUtil.flushSession();
							msg = CREATE;
							isSuccess = true;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("crearPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void modificarPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String id = getStringValue(req.getParameter("id"));
				String puntoventaId = getStringValue(req.getParameter("puntoventaId"));
				String estado = getNumberValue(req.getParameter("estado"));
				String pais = getNumberValue(req.getParameter("pais"));
				String provincia = getNumberValue(req.getParameter("provincia"));
				String tipoPuntoVenta = getNumberValue(req.getParameter("tipoPuntoVenta"));
				String telefono = getNumberValue(req.getParameter("telefono"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String nivel = getNumberValue(req.getParameter("nivel"));
				String regionProvincia = getNumberValue(req.getParameter("regionProvincia"));
				String direccion = getStringValue(req.getParameter("direccion"));
				String observaciones = getStringValue(req.getParameter("observaciones"));
				String DPuntoventasuperior = getStringValue(req.getParameter("DPuntoventasuperior"));
				String saldo = getStringValue(req.getParameter("saldo"));
				String saldoFechahora = getStringValue(req.getParameter("saldoFechahora"));
				//String coordenada = getStringValue(req.getParameter("coordenada"));
				String latitud = getStringValue(req.getParameter("latitud"));
				String longitud = getStringValue(req.getParameter("longitud"));
				String puntoAbastecimiento = getStringValue(req.getParameter("puntoAbastecimiento"));
				String contacto = getStringValue(req.getParameter("contacto"));
				
				if(vParam(puntoventaId) && vParam(estado) && vParam(pais) && vParam(provincia) && vParam(id)
						&& vParam(tipoPuntoVenta) && vParam(saldo) && vParam(saldoFechahora) && vParam(puntoAbastecimiento)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							PuntoVenta puntoVenta = getServiceLocator().getPuntoVentaService().loadEntity(PuntoVenta.class, Long.valueOf(id));
							puntoVenta.setPuntoventaId(puntoventaId);
							puntoVenta.setEstado(getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.valueOf(estado)));
							puntoVenta.setPais(getServiceLocator().getPaisService().loadEntity(Pais.class, Long.valueOf(pais)));
							puntoVenta.setProvincia(getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.valueOf(provincia)));
							puntoVenta.setTipoPuntoVenta(getServiceLocator().getTipoPuntoVenta().loadEntity(TipoPuntoVenta.class, Long.valueOf(tipoPuntoVenta)));
							puntoVenta.setTelefono(Integer.valueOf(telefono));
							puntoVenta.setDescripcion(descripcion);
							puntoVenta.setNivel(nivel);
							puntoVenta.setRegionProvincia(getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionProvincia)));
							puntoVenta.setDireccion(direccion);
							puntoVenta.setObservaciones(observaciones);
							puntoVenta.setDPuntoventasuperior(DPuntoventasuperior);
							puntoVenta.setSaldo(new BigDecimal(saldo));
							puntoVenta.setSaldoFechahora(getParseDateLong(saldoFechahora));
							puntoVenta.setLatitud(Float.parseFloat(latitud));
							puntoVenta.setLongitud(Float.valueOf(longitud));
							puntoVenta.setPuntoAbastecimiento(new BigDecimal(puntoAbastecimiento));
							puntoVenta.setContacto(contacto);
							
							getServiceLocator().getPuntoVentaService().updateEntity(puntoVenta);
							HibernateUtil.flushSession();
							msg = UPDATE;
							isSuccess = true;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("modificarPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String id = getNumberValue(req.getParameter("id"));
				if(vParam(id)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							PuntoVenta puntoVenta = getServiceLocator().getPuntoVentaService().loadEntity(PuntoVenta.class, Long.valueOf(id));
							result.put("model", getSerializeJSONObject(puntoVenta));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("consultarPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String id = getNumberValue(req.getParameter("id"));
				if(vParam(id)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							PuntoVenta puntoVenta = getServiceLocator().getPuntoVentaService().loadEntity(PuntoVenta.class, Long.valueOf(id));
							getServiceLocator().getPuntoVentaService().deleteEntity(puntoVenta);
							msg = DELETE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("eliminarPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			DataTableObject dt = getInstanceDataTable(req);
			JSONArray lista = new JSONArray();
			
			if(getSession() != null){												
				permiso = true; //pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{											
						List<PuntoVenta> listaPuntoVenta = getServiceLocator().getPuntoVentaService().getListaPuntoVentaDataTable(getEmpresaId(), dt.getSearchSQL(), dt.getsSearch(), dt.getStart(), dt.getAmount());
						dt.setiTotalDisplayRecords(getServiceLocator().getPuntoVentaService().getTotalPuntoVenta(getEmpresaId(), dt.getSearchSQL(), dt.getsSearch()));
						dt.setiTotalRecords(dt.getiTotalDisplayRecords());						
						for(PuntoVenta puntoVenta : listaPuntoVenta) {
							List<Map<String, Object>> options = new ArrayList<>();
							Map<String, Object> option = new HashMap<>();
							option.put("icon", ICON_EDITAR);
							option.put("params", "PuntoVentaCtrl.fnConsultarPuntoVenta("+puntoVenta.getId()+")");
							option.put("label", "Editar");
							options.add(option);
							
							option = new HashMap<>();
							option.put("icon", ICON_ELIMINAR);
							option.put("params", "PuntoVentaCtrl.fnEliminarPuntoVenta("+puntoVenta.getId()+")");
							option.put("label", "Eliminar");
							options.add(option);														
							
							JSONArray array = new JSONArray();														
							
							array.add(getHtmlLink(options));
							array.add(puntoVenta.getPuntoventaId());
							array.add(puntoVenta.getTipoPuntoVenta().getDescripcion());
							//array.add(puntoVenta.getObservaciones());
							array.add(puntoVenta.getDireccion());
							array.add(puntoVenta.getTelefono());
							//array.add(puntoVenta.getContacto());
							try {
								if(puntoVenta.getSaldo() != null) {
									array.add(df.format(puntoVenta.getSaldo()));
								} else {
									array.add("--");
								}
								if(puntoVenta.getSaldoFechahora() != null) {
									array.add(getStringDate(puntoVenta.getSaldoFechahora()));
								} else {
									array.add("--");
								}
								if(puntoVenta.getPuntoAbastecimiento() != null) {
									array.add(df.format(puntoVenta.getPuntoAbastecimiento()));
								} else {
									array.add("--");
								}
																
								lista.add(array);
							} catch (Exception e) {
								System.err.println(e.getMessage());
								System.out.println(puntoVenta.toString());
							}														
						}						
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaPuntoVenta", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			result.put("sEcho", dt.getEcho());
			result.put("iTotalRecords", dt.getiTotalRecords());
			result.put("iTotalDisplayRecords", dt.getiTotalDisplayRecords());
			result.put("aaData", lista);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("listaPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void comboBoxPuntosDeVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONObject formulario = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){												
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{
						String puntoventaId = getStringValue(req.getParameter("puntoventaId"));
						String nivel = getNumberValue(req.getParameter("nivel"));
						String paisId = getNumberValue(req.getParameter("paisId"));
						String estadoId = getNumberValue(req.getParameter("estadoId"));
						String provinciaId = getNumberValue(req.getParameter("provinciaId"));
						JSONArray lista = new JSONArray();										
						List<PuntoVenta> listaPuntosVenta = getServiceLocator().getPuntoVentaService().getListaPuntosVentaByPaisEstadoRegion(
								puntoventaId,
								Integer.valueOf(nivel),
								Long.valueOf(paisId), 
								Long.valueOf(estadoId), 
								Long.valueOf(provinciaId));
						JSONObject seleccione = new JSONObject();
						seleccione.put("ID", "");
						seleccione.put("DESCRIPCION", "-- seleccione --");
						lista.add(seleccione);
						for(PuntoVenta puntoVenta : listaPuntosVenta) {
							if(puntoVenta.getSaldo() != null) {
								JSONObject jsObj = new JSONObject();							
								String label = puntoVenta.getEstado().getDescripcion() + " - "+ puntoVenta.getDescripcion().toUpperCase() + " -  Q " + df.format(puntoVenta.getSaldo());
								jsObj.put("ID", puntoVenta.getPuntoventaId());
								jsObj.put("DESCRIPCION", label);
								lista.add(jsObj);
							}							
						}
						formulario.put("comboBox", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("comboBoxPuntosDeVenta", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("comboBoxPuntosDeVenta", e, getUsuarioBean(),  EMAIL);
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
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			result.put("formulario", formulario);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("comboBoxPuntosDeVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	protected DataTableObject getInstanceDataTable(HttpServletRequest req){
		DataTableObject dataTable = new DataTableObject();
		String sStart = (req.getParameter("iDisplayStart") == null ? "" : req.getParameter("iDisplayStart"));
		String sAmount = (req.getParameter("iDisplayLength") == null ? "" : req.getParameter("iDisplayLength"));
		String sEcho = (req.getParameter("sEcho") == null ? "" : req.getParameter("sEcho"));
		String sCol = (req.getParameter("iSortCol_0") == null ? "" : req.getParameter("iSortCol_0"));
		String sdir = (req.getParameter("sSortDir_0") == null ? "" : req.getParameter("sSortDir_0"));
		String searchTerm = (req.getParameter("sSearch") == null ? "" : req.getParameter("sSearch"));
		
		String[] cols = { "accion", "t1.puntoventaId", "t1.tipoPuntoVenta.descripcion", "t1.direccion", "t1.telefono", "t1.saldo", "t1.saldoFechahora", "t1.puntoAbastecimiento" };

		String sSearchSQL = " and (t1.puntoventaId like ('%'||:searchTerm||'%') "
				+ " or t1.tipoPuntoVenta.descripcion like ('%'||:searchTerm||'%') "
				+ " or t1.direccion like ('%'||:searchTerm||'%') "
				+ " or t1.telefono like ('%'||:searchTerm||'%') "
				+ " or t1.saldo like ('%'||:searchTerm||'%') "				
				+ " or t1.saldoFechahora like ('%'||:searchTerm||'%') "
				+ " or t1.puntoAbastecimiento like ('%'||:searchTerm||'%')) ";

		dataTable.setsColumns(cols);
		dataTable.setSearchSQL(sSearchSQL);
		dataTable.processDataTable(sStart, sAmount, sEcho, sCol, sdir, searchTerm);

		return dataTable;
	}
}
