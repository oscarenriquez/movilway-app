package movilway.view.helper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Agente;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.domain.TipoAgente;
import movilway.dao.domain.Usuario;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class AgenteHelper extends ServicioHelper {

	public void dispacherMenuAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/agente.jsp");
	}
	
	public void crearAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String tipoagenteId = getNumberValue(req.getParameter("tipoAgente"));
				String userId = getNumberValue(req.getParameter("userId"));
				if(vParam(tipoagenteId) && vParam(userId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Usuario usuario = getServiceLocator().getUsuarioService().getUsuario(Long.valueOf(userId));
							if(usuario != null) {
								Agente agente = new Agente();
								agente.setUserId(usuario.getId());
								agente.setNombre(usuario.getNombre() + " " + usuario.getApellido());
								agente.setTipoAgente(getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.valueOf(tipoagenteId)));								
								agente.setEstatus(Boolean.TRUE);
								getServiceLocator().getAgenteService().saveEntity(agente);
								msg = CREATE;
							} else {
								isSuccess = false;
								msg = PARAM_NECESARIOS;
							}
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
				String tipoagenteId = getNumberValue(req.getParameter("tipoAgente"));
				String userId = getNumberValue(req.getParameter("userId"));
				String estatus = getBooleanValue(req.getParameter("estatus"));				
				if(vParam(agenteId) && vParam(tipoagenteId) && vParam(userId) && vParam(estatus)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Usuario usuario = getServiceLocator().getUsuarioService().getUsuario(Long.valueOf(userId));
							if(usuario != null) {
								Agente agente = getServiceLocator().getAgenteService().loadEntity(Agente.class, Long.parseLong(agenteId));
								agente.setUserId(usuario.getId());
								agente.setNombre(usuario.getNombre() + " " + usuario.getApellido());																					
								agente.setTipoAgente(getServiceLocator().getTipoAgenteService().loadEntity(TipoAgente.class, Long.valueOf(tipoagenteId)));
								agente.setEstatus(Boolean.valueOf(estatus));
								getServiceLocator().getAgenteService().updateEntity(agente);
								msg = UPDATE;
							} else {
								isSuccess = false;
								msg = PARAM_NECESARIOS;
							}
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
							msg = DELETE;
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
						List<Agente> listaAgente = getServiceLocator().getAgenteService().getListAgentes(getEmpresaId());
						JSONArray lista = new JSONArray();
						for(Agente agente : listaAgente) {
							List<Map<String, Object>> options = new ArrayList<>();
							Map<String, Object> option = new HashMap<>();
							option.put("icon", ICON_EDITAR);
							option.put("params", "AgenteCtrl.fnConsultarAgente("+agente.getAgenteId()+")");
							option.put("label", "Editar");
							options.add(option);
							
							option = new HashMap<>();
							option.put("icon", ICON_ELIMINAR);
							option.put("params", "AgenteCtrl.fnEliminarAgente("+agente.getAgenteId()+")");
							option.put("label", "Eliminar");
							options.add(option);														
							
							JSONArray array = new JSONArray();														
							
							array.add(getHtmlLink(options));
							array.add(agente.getTipoAgente().getDescripcion());
							array.add(agente.getNombre());
							array.add(getEstatus(agente.getEstatus()));
							lista.add(array);
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
	
	public void comboBoxUsuariosAgentes (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						List<Usuario> listaUsuarios = getListagUsuariosAplicacionRol(getContext(), Long.valueOf(getBundle().getString("movilway.roles.agente.id").trim()));
						List<Agente> listaAgentes = getServiceLocator().getAgenteService().getListAgentes(getEmpresaId());
						JSONArray lista = new JSONArray();
						JSONObject seleccione = new JSONObject();
						seleccione.put("ID", "");
						seleccione.put("DESCRIPCION", "-- seleccione --");
						lista.add(seleccione);
						for(Usuario usuario : listaUsuarios) {
							Boolean existe = false;
							for(Agente agente : listaAgentes) {
								if(agente.getUserId().equals(usuario.getId())) {
									existe = true;
									break;
								}
							}
							if(!existe) {
								JSONObject jsObj = new JSONObject();
								jsObj.put("ID", usuario.getId());
								jsObj.put("DESCRIPCION", usuario.getNombre() + " " + usuario.getApellido());
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
						getAlerta().enviarAlerta("comboBoxUsuariosAgentes", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("comboBoxUsuariosAgentes", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxUsuariosAgentes", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void comboBoxAgentes (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
						List<Agente> listaAgentes = getServiceLocator().getAgenteService().getListAgentes(getEmpresaId());						
						JSONArray lista = new JSONArray();											
						for(Agente agente : listaAgentes) {
							if(agente.getEstatus()) {
								JSONObject jsObj = new JSONObject();
								jsObj.put("ID", agente.getId());
								jsObj.put("DESCRIPCION", agente.getNombre());
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
						getAlerta().enviarAlerta("comboBoxAgentes", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("comboBoxAgentes", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxAgentes", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void comboBoxAgentesByCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
					
					String campanaId = getNumberValue(req.getParameter("campanaId"));
					if(vParam(campanaId)) {
						try{
							List<Map<String, Object>> listaAgentes = getServiceLocator().getAgenteService().getListAgentesByCampana(Long.valueOf(campanaId), CampanaDetalle.ASIGNADA);						
							JSONArray lista = new JSONArray();
							for(Map<String, Object> mapa : listaAgentes) {								
								JSONObject jsObj = new JSONObject();
								jsObj.put("ID", mapa.get("agenteId"));
								jsObj.put("DESCRIPCION", mapa.get("nombre") + " -  (" + mapa.get("cant") +")");
								lista.add(jsObj);								
							}
							formulario.put("comboBox", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("comboBoxAgentesByCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("comboBoxAgentesByCampana", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}
					} else {
						isSuccess = false;
						msg = PARAM_NECESARIOS;
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
			getAlerta().enviarAlerta("comboBoxAgentesByCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
