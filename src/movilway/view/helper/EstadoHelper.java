package movilway.view.helper;

import java.io.IOException;
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
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class EstadoHelper extends ServicioHelper {	
	
	
	/**
	 * Crear Estado
	 * @param req
	 * @param resp
	 * @param key
	 * @throws ServletException
	 * @throws IOException
	 */
	public void crearEstado (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String paisId = getNumberValue(req.getParameter("pais"));
				String abrev = getStringValue(req.getParameter("abrev"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(vParam(descripcion) && vParam(abrev) && vParam(paisId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Pais pais = getServiceLocator().getPaisService().loadEntity(Pais.class, Long.valueOf(paisId));
							Estado estado = new Estado();
							estado.setDescripcion(descripcion);
							estado.setAbrev(abrev);
							
							pais.addEstado(estado);
							getServiceLocator().getPaisService().updateEntity(pais);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearEstado", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearEstado", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearEstado", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	/**
	 * Modificar Estado
	 * @param req
	 * @param resp
	 * @param key
	 * @throws ServletException
	 * @throws IOException
	 */
	public void modificarEstado (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String estadoId = getNumberValue(req.getParameter("estadoId"));				
				String abrev = getStringValue(req.getParameter("abrev"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(vParam(estadoId) && vParam(abrev) && vParam(descripcion)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Estado estado = getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.parseLong(estadoId));
							estado.setDescripcion(descripcion);
							estado.setAbrev(abrev);
							getServiceLocator().getEstadoService().updateEntity(estado);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarEstado", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarEstado", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarEstado", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarEstado (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String estadoId = getNumberValue(req.getParameter("estadoId"));
				if(vParam(estadoId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Estado estado = getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.parseLong(estadoId));
							result.put("model", getSerializeJSONObject(estado));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarEstado", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarEstado", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarEstado", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarEstado (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String estadoId = getNumberValue(req.getParameter("estadoId"));
				if(vParam(estadoId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Estado estado = getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.parseLong(estadoId));
							Pais pais = estado.getPais();
							pais.removeEstado(estado);
							getServiceLocator().getPaisService().updateEntity(pais);							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarEstado", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarEstado", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarEstado", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaEstado (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String paisId = getNumberValue(req.getParameter("pais"));
				if(vParam(paisId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							List<Estado> listaEstado = getServiceLocator().getEstadoService().getListaEstadosByPais(Long.valueOf(paisId));
							JSONArray lista = new JSONArray();
							for(Estado estado : listaEstado) {
								List<Map<String, Object>> options = new ArrayList<>();
								Map<String, Object> option = new HashMap<>();
								option.put("icon", ICON_EDITAR);
								option.put("params", "EstadoCtrl.fnConsultarEstado("+estado.getEstadoId()+")");
								option.put("label", "Editar");
								options.add(option);
								
								option = new HashMap<>();
								option.put("icon", ICON_ELIMINAR);
								option.put("params", "EstadoCtrl.fnEliminarEstado("+estado.getEstadoId()+")");
								option.put("label", "Eliminar");
								options.add(option);
								
								option = new HashMap<>();
								option.put("icon", ICON_DETALLE);
								option.put("params", "EstadoCtrl.fnMostrarProvincias("+estado.getEstadoId()+", '"+estado.getDescripcion()+"')");
								option.put("label", "Eliminar");
								options.add(option);			
								
								JSONArray array = new JSONArray();														
								
								array.add(getHtmlLink(options));								
								array.add(estado.getDescripcion());
								array.add(estado.getAbrev());								
								lista.add(array);
							}
							result.put("lista", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("listaEstado", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("listaEstado", e, getUsuarioBean(),  EMAIL);
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
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("listaEstado", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	
	public void crearProvincia (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String estadoId = getNumberValue(req.getParameter("estado"));
				String abrev = getStringValue(req.getParameter("abrev"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(vParam(descripcion) && vParam(abrev) && vParam(estadoId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Estado estado = getServiceLocator().getEstadoService().loadEntity(Estado.class, Long.valueOf(estadoId));
							Provincia provincia = new Provincia();
							provincia.setDescripcion(descripcion);
							provincia.setAbrev(abrev);
							
							estado.addProvincia(provincia);
							getServiceLocator().getEstadoService().updateEntity(estado);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearProvincia", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearProvincia", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearProvincia", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
		
	public void modificarProvincia (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String provinciaId = getNumberValue(req.getParameter("provinciaId"));				
				String abrev = getStringValue(req.getParameter("abrev"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(vParam(provinciaId) && vParam(abrev) && vParam(descripcion)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Provincia provincia = getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.parseLong(provinciaId));
							provincia.setDescripcion(descripcion);
							provincia.setAbrev(abrev);
							getServiceLocator().getProvinciaService().updateEntity(provincia);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarProvincia", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarProvincia", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarProvincia", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarProvincia (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String provinciaId = getNumberValue(req.getParameter("provinciaId"));
				if(vParam(provinciaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Provincia provincia = getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.parseLong(provinciaId));
							result.put("model", getSerializeJSONObject(provincia));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarProvincia", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarProvincia", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarProvincia", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarProvincia (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String provinciaId = getNumberValue(req.getParameter("provinciaId"));
				if(vParam(provinciaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Provincia provincia = getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.parseLong(provinciaId));
							Estado estado = provincia.getEstado();
							estado.removeProvincia(provincia);
							getServiceLocator().getEstadoService().updateEntity(estado);						
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarProvincia", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarProvincia", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarProvincia", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaProvincia (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String estadoId = getNumberValue(req.getParameter("estado"));
				if(vParam(estadoId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							List<Provincia> listaProvincia = getServiceLocator().getProvinciaService().getListaProvinciasByEstado(Long.valueOf(estadoId));
							JSONArray lista = new JSONArray();
							for(Provincia provincia : listaProvincia) {
								List<Map<String, Object>> options = new ArrayList<>();
								Map<String, Object> option = new HashMap<>();
								option.put("icon", ICON_EDITAR);
								option.put("params", "EstadoCtrl.fnConsultarProvincia("+provincia.getProvinciaId()+")");
								option.put("label", "Editar");
								options.add(option);
								
								option = new HashMap<>();
								option.put("icon", ICON_ELIMINAR);
								option.put("params", "EstadoCtrl.fnEliminarProvincia("+provincia.getProvinciaId()+")");
								option.put("label", "Eliminar");
								options.add(option);														
								
								JSONArray array = new JSONArray();														
								
								array.add(getHtmlLink(options));
								array.add(provincia.getDescripcion());
								array.add(provincia.getAbrev());								
								lista.add(array);
							}
							result.put("lista", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("listaProvincia", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("listaProvincia", e, getUsuarioBean(),  EMAIL);
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
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("listaProvincia", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
