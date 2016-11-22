package movilway.view.helper;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Agente;
import movilway.dao.domain.TipoAgente;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class AgenteHelper extends ServicioHelper {

	public void crearAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String tipoagenteId = getNumberValue(req.getParameter("tipoagenteId"));
				String nombre = getStringValue(req.getParameter("nombre"));
				if(vParam(tipoagenteId) && vParam(nombre)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Agente agente = new Agente();
							agente.setTipoAgente(getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.valueOf(tipoagenteId)));
							agente.setNombre(nombre);
							agente.setEstatus(Boolean.TRUE);
							getServiceLocator().getAgenteService().saveEntity(agente);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void modificarAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String agenteId = getNumberValue(req.getParameter("agenteId"));
				String tipoagenteId = getNumberValue(req.getParameter("tipoagenteId"));
				String nombre = getStringValue(req.getParameter("nombre"));
				String estatus = getBooleanValue(req.getParameter("estatus"));				
				if(vParam(agenteId) && vParam(tipoagenteId) && vParam(nombre) && vParam(estatus)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Agente agente = getServiceLocator().getAgenteService().loadEntity(Agente.class, Long.parseLong(agenteId));
							agente.setNombre(nombre);
							agente.setTipoAgente(getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.valueOf(tipoagenteId)));
							agente.setEstatus(Boolean.valueOf(estatus));
							getServiceLocator().getAgenteService().updateEntity(agente);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String agenteId = getNumberValue(req.getParameter("agenteId"));
				if(vParam(agenteId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Agente agente = getServiceLocator().getAgenteService().loadEntity(Agente.class, Long.parseLong(agenteId));
							result.put("model", getSerializeJSONObject(agente));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String agenteId = getNumberValue(req.getParameter("agenteId"));
				if(vParam(agenteId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Agente agente = getServiceLocator().getAgenteService().loadEntity(Agente.class, Long.parseLong(agenteId));
							getServiceLocator().getAgenteService().deleteEntity(agente);							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						List<Agente> listaAgente = getServiceLocator().getAgenteService().getAllEntities(Agente.class);
						JSONArray lista = new JSONArray();
						for(Agente agente : listaAgente) {
							lista.add(getSerializeJSONObject(agente));
						}
						result.put("lista", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaAgente", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaAgente", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("listaAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
