package movilway.view.helper;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.TipoAgente;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class TipoAgenteHelper extends ServicioHelper {

	public void crearTipoAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String esAdmin = getBooleanValue(req.getParameter("esAdmin"));
				if(validateParam(descripcion) && vParam(esAdmin)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoAgente tipoAgente = new TipoAgente();
							tipoAgente.setDescripcion(descripcion);
							tipoAgente.setEsAdmin(Boolean.valueOf(esAdmin));
							tipoAgente.setEmpresaId(getEmpresaId());
							tipoAgente.setEstatus(Boolean.TRUE);
							getServiceLocator().getTipoAgenteService().saveEntity(tipoAgente);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearTipoAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearTipoAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearTipoAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void modificarTipoAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String descripcion = getStringValue(req.getParameter("descripcion"));
				String estatus = getBooleanValue(req.getParameter("estatus"));
				String esAdmin = getBooleanValue(req.getParameter("esAdmin"));
				String tipoagenteId = getNumberValue(req.getParameter("tipoagenteId"));
				if(vParam(tipoagenteId) && vParam(descripcion) && vParam(estatus) && vParam(esAdmin)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoAgente tipoAgente = getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.parseLong(tipoagenteId));
							tipoAgente.setDescripcion(descripcion);							
							tipoAgente.setEstatus(Boolean.valueOf(estatus));
							tipoAgente.setEsAdmin(Boolean.valueOf(esAdmin));
							getServiceLocator().getTipoAgenteService().updateEntity(tipoAgente);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarTipoAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarTipoAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarTipoAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarTipoAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String tipoagenteId = getNumberValue(req.getParameter("tipoagenteId"));
				if(vParam(tipoagenteId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoAgente tipoAgente = getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.parseLong(tipoagenteId));
							result.put("model", getSerializeJSONObject(tipoAgente));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarTipoAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarTipoAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarTipoAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarTipoAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String tipoagenteId = getNumberValue(req.getParameter("tipoagenteId"));
				if(vParam(tipoagenteId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							TipoAgente tipoAgente = getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.parseLong(tipoagenteId));
							getServiceLocator().getTipoAgenteService().deleteEntity(tipoAgente);							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarTipoAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarTipoAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarTipoAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaTipoAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						List<TipoAgente> listaTipoAgente = getServiceLocator().getTipoAgenteService().getAllEntitiesFiltered(TipoAgente.class, parameters);
						JSONArray lista = new JSONArray();
						for(TipoAgente tipoAgente : listaTipoAgente) {
							lista.add(getSerializeJSONObject(tipoAgente));
						}
						result.put("lista", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaTipoAgente", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaTipoAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("listaTipoAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
