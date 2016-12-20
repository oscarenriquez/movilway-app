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
import movilway.dao.domain.RegionProvincia;
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
							estado.setDescripcion(descripcion.toUpperCase());
							estado.setAbrev(abrev.toUpperCase());
							
							pais.addEstado(estado);
							getServiceLocator().getPaisService().updateEntity(pais);
							msg = CREATE;
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
							estado.setDescripcion(descripcion.toUpperCase());
							estado.setAbrev(abrev.toUpperCase());
							getServiceLocator().getEstadoService().updateEntity(estado);
							msg = UPDATE;
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
							msg = DELETE;
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
								option.put("label", " Ver Provincias");
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
							provincia.setDescripcion(descripcion.toUpperCase());
							provincia.setAbrev(abrev.toUpperCase());
							
							estado.addProvincia(provincia);
							getServiceLocator().getEstadoService().updateEntity(estado);
							msg = CREATE;
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
							provincia.setDescripcion(descripcion.toUpperCase());
							provincia.setAbrev(abrev.toUpperCase());
							getServiceLocator().getProvinciaService().updateEntity(provincia);
							msg = UPDATE;
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
							msg = DELETE;
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
								
								option = new HashMap<>();
								option.put("icon", ICON_ELIMINAR);
								option.put("params", "EstadoCtrl.fnMostrarRegiones("+provincia.getProvinciaId()+", '"+provincia.getDescripcion()+"')");
								option.put("label", "Ver Regiones");
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

	public void crearRegion (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String provinciaId = getNumberValue(req.getParameter("provincia"));
				String abrev = getStringValue(req.getParameter("abrev"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(vParam(descripcion) && vParam(abrev) && vParam(provinciaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Provincia provincia = getServiceLocator().getProvinciaService().loadEntity(Provincia.class, Long.valueOf(provinciaId));
							RegionProvincia regionProvincia = new RegionProvincia();
							regionProvincia.setDescripcion(descripcion.toUpperCase());
							regionProvincia.setAbrev(abrev.toUpperCase());
							
							provincia.addRegionProvincia(regionProvincia);
							getServiceLocator().getProvinciaService().updateEntity(provincia);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearRegion", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearRegion", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearRegion", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
		
	public void modificarRegion (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String regionId = getNumberValue(req.getParameter("regionId"));				
				String abrev = getStringValue(req.getParameter("abrev"));
				String descripcion = getStringValue(req.getParameter("descripcion"));
				if(vParam(regionId) && vParam(abrev) && vParam(descripcion)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RegionProvincia regionProvincia = getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionId));
							regionProvincia.setDescripcion(descripcion.toUpperCase());
							regionProvincia.setAbrev(abrev.toUpperCase());
							getServiceLocator().getRegionProvinciaService().updateEntity(regionProvincia);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("modificarRegion", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("modificarRegion", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("modificarRegion", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void consultarRegion (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String regionId = getNumberValue(req.getParameter("regionId"));
				if(vParam(regionId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RegionProvincia region = getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionId));
							result.put("model", getSerializeJSONObject(region));							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("consultarRegion", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("consultarRegion", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("consultarRegion", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarRegion (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
				String regionId = getNumberValue(req.getParameter("regionId"));
				if(vParam(regionId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							RegionProvincia region = getServiceLocator().getRegionProvinciaService().loadEntity(RegionProvincia.class, Long.valueOf(regionId));
							Provincia provincia = region.getProvincia();
							provincia.removeRegionProvincia(region);
							getServiceLocator().getProvinciaService().updateEntity(provincia);					
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarRegion", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarRegion", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("eliminarRegion", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaRegion (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String provinciaId = getNumberValue(req.getParameter("provincia"));
				if(vParam(provinciaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							List<RegionProvincia> listaRegionProvincia = getServiceLocator().getRegionProvinciaService().getListaRegionProvincia(Long.valueOf(provinciaId));
							JSONArray lista = new JSONArray();
							for(RegionProvincia region : listaRegionProvincia) {
								List<Map<String, Object>> options = new ArrayList<>();
								Map<String, Object> option = new HashMap<>();
								option.put("icon", ICON_EDITAR);
								option.put("params", "EstadoCtrl.fnConsultarRegion("+region.getRegionprovinciaId()+")");
								option.put("label", "Editar");
								options.add(option);
								
								option = new HashMap<>();
								option.put("icon", ICON_ELIMINAR);
								option.put("params", "EstadoCtrl.fnEliminarRegion("+region.getRegionprovinciaId()+")");
								option.put("label", "Eliminar");
								options.add(option);														
								
								JSONArray array = new JSONArray();														
								
								array.add(getHtmlLink(options));
								array.add(region.getDescripcion());
								array.add(region.getAbrev());								
								lista.add(array);
							}
							result.put("lista", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("listaRegion", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("listaRegion", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("listaRegion", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void comboBoxEstadosByPais (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
					String paisId = getNumberValue(req.getParameter("pais"));
					if(vParam(paisId)){
						try{														
							List<Estado> listaEstados = getServiceLocator().getEstadoService().getListaEstadosByPais(Long.valueOf(paisId));
							JSONArray lista = new JSONArray();
							JSONObject seleccione = new JSONObject();
							seleccione.put("ID", "");
							seleccione.put("DESCRIPCION", "-- seleccione --");
							lista.add(seleccione);
							for(Estado estado : listaEstados) {
								JSONObject jsObj = new JSONObject();
								jsObj.put("ID", estado.getEstadoId());
								jsObj.put("DESCRIPCION", estado.getAbrev() + " - " + estado.getDescripcion());
								lista.add(jsObj);
							}
							formulario.put("comboBox", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("comboBoxEstadosByPais", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("comboBoxEstadosByPais", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxEstadosByPais", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	
	public void comboBoxProvinciasByEstado (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
					String estadoId = getNumberValue(req.getParameter("estado"));
					if(vParam(estadoId)){
						try{														
							List<Provincia> listaProvincias = getServiceLocator().getProvinciaService().getListaProvinciasByEstado(Long.valueOf(estadoId));
							JSONArray lista = new JSONArray();
							JSONObject seleccione = new JSONObject();
							seleccione.put("ID", "");
							seleccione.put("DESCRIPCION", "-- seleccione --");
							lista.add(seleccione);
							for(Provincia provincia : listaProvincias) {
								JSONObject jsObj = new JSONObject();
								jsObj.put("ID", provincia.getProvinciaId());
								jsObj.put("DESCRIPCION", provincia.getAbrev() + " - " + provincia.getDescripcion());
								lista.add(jsObj);
							}
							formulario.put("comboBox", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("comboBoxProvinciasByEstado", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("comboBoxProvinciasByEstado", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxProvinciasByEstado", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	
	public void comboBoxRegionesByProvincia (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
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
					String provinciaId = getNumberValue(req.getParameter("provincia"));
					if(vParam(provinciaId)){
						try{														
							List<RegionProvincia> listaRegiones = getServiceLocator().getRegionProvinciaService().getListaRegionProvincia(Long.valueOf(provinciaId));
							JSONArray lista = new JSONArray();
							JSONObject seleccione = new JSONObject();
							seleccione.put("ID", "");
							seleccione.put("DESCRIPCION", "-- seleccione --");
							lista.add(seleccione);
							for(RegionProvincia region : listaRegiones) {
								JSONObject jsObj = new JSONObject();
								jsObj.put("ID", region.getRegionprovinciaId());
								jsObj.put("DESCRIPCION", region.getAbrev() + " - " + region.getDescripcion());
								lista.add(jsObj);
							}
							formulario.put("comboBox", lista);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("comboBoxRegionesByProvincia", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("comboBoxRegionesByProvincia", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("comboBoxRegionesByProvincia", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
