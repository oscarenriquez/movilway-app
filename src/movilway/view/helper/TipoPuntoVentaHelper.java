package movilway.view.helper;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.TipoPuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class TipoPuntoVentaHelper extends ServicioHelper {

	public void dispacherMenuTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/tipoPuntoVenta.jsp");
	}
	
	public void crearTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(validateParam(descripcion)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoPuntoVenta tipoPuntoVenta = new TipoPuntoVenta();
							tipoPuntoVenta.setDescripcion(descripcion.toUpperCase());
							tipoPuntoVenta.setEmpresaId(getEmpresaId());
							tipoPuntoVenta.setEstatus(Boolean.TRUE);
							getServiceLocator().getTipoPuntoVenta().saveEntity(tipoPuntoVenta);
							msg = CREATE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearTipoPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearTipoPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearTipoPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void modificarTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String estatus = getBooleanValue(req.getParameter("estatus"));
				String tipopuntoventaId = getNumberValue(req.getParameter("tipopuntoventaId"));
				if(vParam(tipopuntoventaId) && vParam(descripcion) && vParam(estatus)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoPuntoVenta tipoPuntoVenta = getServiceLocator().getTipoPuntoVenta().loadEntity(TipoPuntoVenta.class, Long.parseLong(tipopuntoventaId));
							tipoPuntoVenta.setDescripcion(descripcion.toUpperCase());							
							tipoPuntoVenta.setEstatus(Boolean.valueOf(estatus));
							getServiceLocator().getTipoPuntoVenta().updateEntity(tipoPuntoVenta);
							msg = UPDATE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarTipoPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarTipoPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarTipoPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String tipopuntoventaId = getNumberValue(req.getParameter("tipopuntoventaId"));
				if(vParam(tipopuntoventaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoPuntoVenta tipoPuntoVenta = getServiceLocator().getTipoPuntoVenta().loadEntity(TipoPuntoVenta.class, Long.parseLong(tipopuntoventaId));
							result.put("model", getSerializeJSONObject(tipoPuntoVenta));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarTipoPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarTipoPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarTipoPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String tipopuntoventaId = getNumberValue(req.getParameter("tipopuntoventaId"));
				if(vParam(tipopuntoventaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoPuntoVenta tipoPuntoVenta = getServiceLocator().getTipoPuntoVenta().loadEntity(TipoPuntoVenta.class, Long.parseLong(tipopuntoventaId));
							getServiceLocator().getTipoPuntoVenta().deleteEntity(tipoPuntoVenta);
							msg = DELETE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarTipoPuntoVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarTipoPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarTipoPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){												
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{
						Map<String, Serializable> parameters = new HashMap<>();
						List<TipoPuntoVenta> listaTipoPuntoVenta = getServiceLocator().getTipoPuntoVenta().getAllEntitiesFiltered(TipoPuntoVenta.class, parameters);
						JSONArray lista = new JSONArray();
						for(TipoPuntoVenta tipoPuntoVenta : listaTipoPuntoVenta) {
							List<Map<String, Object>> options = new ArrayList<>();
							Map<String, Object> option = new HashMap<>();
							option.put("icon", ICON_EDITAR);
							option.put("params", "TipoPuntoVentaCtrl.fnConsultarTipoPuntoVenta("+tipoPuntoVenta.getTipopuntoventaId()+")");
							option.put("label", "Editar");
							options.add(option);
							
							option = new HashMap<>();
							option.put("icon", ICON_ELIMINAR);
							option.put("params", "TipoPuntoVentaCtrl.fnEliminarTipoPuntoVenta("+tipoPuntoVenta.getTipopuntoventaId()+")");
							option.put("label", "Eliminar");
							options.add(option);														
							
							JSONArray array = new JSONArray();														
							
							array.add(getHtmlLink(options));
							array.add(tipoPuntoVenta.getDescripcion());
							array.add(getEstatus(tipoPuntoVenta.getEstatus()));							
							lista.add(array);
						}
						result.put("lista", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaTipoPuntoVenta", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaTipoPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("listaTipoPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void comboBoxTipoPuntoVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						Map<String, Serializable> parameters = new HashMap<>();
						List<TipoPuntoVenta> listaTipoPuntoVenta = getServiceLocator().getTipoPuntoVenta().getAllEntitiesFiltered(TipoPuntoVenta.class, parameters);
						JSONArray lista = new JSONArray();
						JSONObject seleccione = new JSONObject();
						seleccione.put("ID", "");
						seleccione.put("DESCRIPCION", "-- seleccione --");
						lista.add(seleccione);
						for(TipoPuntoVenta tipoPuntoVenta : listaTipoPuntoVenta) {
							JSONObject jsObj = new JSONObject();
							jsObj.put("ID", tipoPuntoVenta.getTipopuntoventaId());
							jsObj.put("DESCRIPCION", tipoPuntoVenta.getDescripcion().toUpperCase());
							lista.add(jsObj);
						}
						formulario.put("comboBox", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("comboBoxTipoPuntoVenta", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("comboBoxTipoPuntoVenta", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxTipoPuntoVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
