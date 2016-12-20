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

import movilway.dao.domain.RespuestaLlamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class RespuestaLlamadaHelper extends ServicioHelper {

	public void dispacherMenuRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/respuestaLlamada.jsp");
	}
	
	public void crearRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String abrev = getStringValue(req.getParameter("abrev"));
				String efectiva = getBooleanValue(req.getParameter("efectiva"));
				String generaLlamada = getBooleanValue(req.getParameter("generaLlamada"));
				if(vParam(descripcion) && vParam(abrev) && vParam(efectiva) && vParam(generaLlamada)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RespuestaLlamada respuestaLlamada = new RespuestaLlamada();
							respuestaLlamada.setEmpresaId(getEmpresaId());
							respuestaLlamada.setDescripcion(descripcion.toUpperCase());
							respuestaLlamada.setAbrev(abrev.toUpperCase());
							respuestaLlamada.setEstatus(Boolean.TRUE);
							respuestaLlamada.setEfectiva(Boolean.valueOf(efectiva));
							respuestaLlamada.setGeneraLlamada(Boolean.valueOf(generaLlamada));
							getServiceLocator().getRespuestaLlamadaService().saveEntity(respuestaLlamada);
							msg = CREATE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearRespuestaLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearRespuestaLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearRespuestaLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void modificarRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String respuestaId = getNumberValue(req.getParameter("respuestaId"));				
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String abrev = getStringValue(req.getParameter("abrev"));
				String efectiva = getBooleanValue(req.getParameter("efectiva"));
				String generaLlamada = getBooleanValue(req.getParameter("generaLlamada"));
				String estatus = getBooleanValue(req.getParameter("estatus"));				
				if(vParam(respuestaId) && vParam(abrev) && vParam(descripcion) && vParam(estatus) && vParam(efectiva) && vParam(generaLlamada)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RespuestaLlamada respuestaLlamada = getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.parseLong(respuestaId));
							respuestaLlamada.setDescripcion(descripcion.toUpperCase());
							respuestaLlamada.setAbrev(abrev.toUpperCase());
							respuestaLlamada.setEstatus(Boolean.valueOf(estatus));
							respuestaLlamada.setEfectiva(Boolean.valueOf(efectiva));
							respuestaLlamada.setGeneraLlamada(Boolean.valueOf(generaLlamada));
							getServiceLocator().getRespuestaLlamadaService().updateEntity(respuestaLlamada);
							msg = UPDATE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarRespuestaLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarRespuestaLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarRespuestaLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String respuestaId = getNumberValue(req.getParameter("respuestaId"));
				if(vParam(respuestaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RespuestaLlamada respuestaLlamada = getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.parseLong(respuestaId));
							result.put("model", getSerializeJSONObject(respuestaLlamada));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarRespuestaLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarRespuestaLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarRespuestaLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String respuestaId = getNumberValue(req.getParameter("respuestaId"));
				if(vParam(respuestaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RespuestaLlamada respuestaLlamada = getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.parseLong(respuestaId));
							getServiceLocator().getRespuestaLlamadaService().deleteEntity(respuestaLlamada);
							msg = DELETE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarRespuestaLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarRespuestaLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarRespuestaLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						parameters.put("empresaId", getEmpresaId());
						List<RespuestaLlamada> listaRespuestaLlamada = getServiceLocator().getRespuestaLlamadaService().getAllEntitiesFiltered(RespuestaLlamada.class, parameters);
						JSONArray lista = new JSONArray();
						for(RespuestaLlamada respuestaLlamada : listaRespuestaLlamada) {
							List<Map<String, Object>> options = new ArrayList<>();
							Map<String, Object> option = new HashMap<>();
							option.put("icon", ICON_EDITAR);
							option.put("params", "RespuestaCtrl.fnConsultarRespuesta("+respuestaLlamada.getRespuestaId()+")");
							option.put("label", "Editar");
							options.add(option);
							
							option = new HashMap<>();
							option.put("icon", ICON_ELIMINAR);
							option.put("params", "RespuestaCtrl.fnEliminarRespuesta("+respuestaLlamada.getRespuestaId()+")");
							option.put("label", "Eliminar");
							options.add(option);														
							
							JSONArray array = new JSONArray();														
							
							array.add(getHtmlLink(options));
							array.add(respuestaLlamada.getDescripcion());
							array.add(respuestaLlamada.getAbrev());
							array.add(getLabelValue(respuestaLlamada.getEfectiva()));
							array.add(getLabelValue(respuestaLlamada.getGeneraLlamada()));
							array.add(getEstatus(respuestaLlamada.getEstatus()));
							lista.add(array);
						}
						result.put("lista", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaRespuestaLlamada", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaRespuestaLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("listaRespuestaLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void comboBoxRespuestaLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						JSONArray lista = new JSONArray();	
						Map<String, Serializable> parameters = new HashMap<>();
						parameters.put("empresaId", getEmpresaId());
						List<RespuestaLlamada> listaRespuestaLlamada = getServiceLocator().getRespuestaLlamadaService().getAllEntitiesFiltered(RespuestaLlamada.class, parameters);
						JSONObject seleccione = new JSONObject();
						seleccione.put("ID", "");
						seleccione.put("DESCRIPCION", "-- seleccione --");
						lista.add(seleccione);
						for(RespuestaLlamada respuesta : listaRespuestaLlamada) {
							JSONObject jsObj = new JSONObject();
							jsObj.put("ID", respuesta.getRespuestaId());
							jsObj.put("DESCRIPCION", respuesta.getDescripcion().toUpperCase());
							jsObj.put("TYPE_EXTRA", respuesta.getGeneraLlamada());
							lista.add(jsObj);
						}
						formulario.put("comboBox", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("comboBoxReceptor", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("comboBoxReceptor", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxReceptor", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
