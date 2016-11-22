package movilway.view.helper;

import java.io.IOException;
import java.util.HashMap;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.ReceptorLlamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class ReceptorLlamadaHelper extends ServicioHelper {

	public void crearReceptorLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String abrev = getStringValue(req.getParameter("abrev"));
				if(vParam(descripcion) && vParam(abrev)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							ReceptorLlamada receptorLlamada = new ReceptorLlamada();
							receptorLlamada.setEmpresaId(getEmpresaId());
							receptorLlamada.setDescripcion(descripcion);
							receptorLlamada.setAbrev(abrev);
							receptorLlamada.setEstatus(Boolean.TRUE);
							getServiceLocator().getReceptorLlamadaService().saveEntity(receptorLlamada);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearReceptorLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearReceptorLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearReceptorLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void modificarReceptorLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String receptorId = getNumberValue(req.getParameter("receptorId"));				
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String abrev = getStringValue(req.getParameter("abrev"));
				String estatus = getBooleanValue(req.getParameter("estatus"));				
				if(vParam(receptorId) && vParam(abrev) && vParam(descripcion) && vParam(estatus)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							ReceptorLlamada receptorLlamada = getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.parseLong(receptorId));
							receptorLlamada.setDescripcion(descripcion);
							receptorLlamada.setAbrev(abrev);
							receptorLlamada.setEstatus(Boolean.valueOf(estatus));
							getServiceLocator().getReceptorLlamadaService().updateEntity(receptorLlamada);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarReceptorLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarReceptorLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarReceptorLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarReceptorLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String receptorId = getNumberValue(req.getParameter("receptorId"));
				if(vParam(receptorId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							ReceptorLlamada receptorLlamada = getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.parseLong(receptorId));
							result.put("model", getSerializeJSONObject(receptorLlamada));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarReceptorLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarReceptorLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarReceptorLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarReceptorLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String receptorId = getNumberValue(req.getParameter("receptorId"));
				if(vParam(receptorId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							ReceptorLlamada receptorLlamada = getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.parseLong(receptorId));
							getServiceLocator().getReceptorLlamadaService().deleteEntity(receptorLlamada);							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarReceptorLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarReceptorLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarReceptorLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaReceptorLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						List<ReceptorLlamada> listaReceptorLlamada = getServiceLocator().getReceptorLlamadaService().getAllEntitiesFiltered(ReceptorLlamada.class, parameters);
						JSONArray lista = new JSONArray();
						for(ReceptorLlamada receptorLlamada : listaReceptorLlamada) {
							lista.add(getSerializeJSONObject(receptorLlamada));
						}
						result.put("lista", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaReceptorLlamada", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaReceptorLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("listaReceptorLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}