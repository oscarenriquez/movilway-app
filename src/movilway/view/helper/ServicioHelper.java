package movilway.view.helper;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.PropertyResourceBundle;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import movilway.dao.domain.Usuario;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.Alerta;
import movilway.view.ServiceLocator;
import movilway.view.bean.ServiceLocatorBean;
import net.sf.json.JSONObject;
import security.dao.domain.Empresa;
import security.dao.domain.Rol;
import security.service.SecurityService;
import security.service.impl.SecurityServiceImpl;
import security.view.bean.SessionBean;

public class ServicioHelper implements Serializable {

	private static final long serialVersionUID = 1L;
	private static ServletContext servletContext;
	private SecurityService securityService;
	private Rol sortedRol;
	private String context;
	private Long servicesid;
	protected static final String FALTA_PERMISOS = "No posee permisos para completar esta solicitud, comuniquese con el administrador!!";
	protected static final String PARAM_NECESARIOS = "No es posible realizar esta solicitud, no cuenta con los parametros necesarios!!";
	protected static final String DISABLED_BD = "Este servicio no se encuentra disponible en este momento, intente mas tarde!!";
	protected static final String SIN_INFO = "No existe informacion para esta consulta!!";
	protected static final String CREATE = "¡Registro creado!";
	protected static final String UPDATE = "¡Registro actualizado!";
	protected static final String DELETE = "¡Registro eliminado!";

	protected static final String ICON_VER = "glyphicon glyphicon-eye-open";
	protected static final String ICON_INACTIVO = "glyphicon glyphicon-eye-close";
	protected static final String ICON_EDITAR = "glyphicon glyphicon-edit";
	protected static final String ICON_ELIMINAR = "glyphicon glyphicon-trash";
	protected static final String ICON_DETALLE = "glyphicon glyphicon-th-list";
	protected static final String ICON_AUTORIZA = "glyphicon glyphicon-check";
	protected static final String ICON_ANULAR = "glyphicon glyphicon-remove";
	protected static final String ICON_PAGOS = "glyphicon glyphicon-usd";
	protected static final String ICON_CALCULO = "glyphicon glyphicon-sound-5-1";

	public static final String SESION_EXPIRADA = "Su sesion ha Expirado, por favor ingrese nuevamente!!";

	public static final String EMAIL = "webapp@empagua.com";

	private ServiceLocator serviceLocator;
	protected PropertyResourceBundle bundle;
	private HttpSession session;
	private Alerta alerta;

	public String ip = null;
	public String host = null;
	public int rport = 0;
	public String ruser = null;

	public ServicioHelper() {
		super();
		securityService = SecurityServiceImpl.build();
		serviceLocator = ServiceLocatorBean.getInstance();
		alerta = new Alerta();
		bundle = (PropertyResourceBundle) PropertyResourceBundle.getBundle("applicationMovilway");
	}

	@SuppressWarnings("static-access")
	public ServicioHelper(ServletContext servletContext) {
		this.servletContext = servletContext;
		serviceLocator = ServiceLocatorBean.getInstance();
	}

	public synchronized static String getUrlApp(HttpServletRequest request) {

		HttpSession sessionRequest = request.getSession(false);
		String urlApp = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
		StringBuilder sb = new StringBuilder();

		if (sessionRequest != null) {
			SessionBean sessionBean = (SessionBean) sessionRequest.getAttribute("sessionBean");
			if (sessionBean != null) {
				sb.append("SessionID " + sessionRequest.getId() + " | TO " + urlApp + " | USER " + sessionBean.getUsuario().getUser());
			} else {
				sb.append("SessionID " + sessionRequest.getId() + " | TO " + urlApp + " | ERROR IN SESSIONBEAN ");
			}
		} else {
			sb.append("SessionID invalidated | TO " + urlApp + " | ERROR IN SESSIONBEAN ");
		}

		return sb.toString();
	}

	protected synchronized void printJson(HttpServletResponse resp, JSONObject result) throws IOException {
		resp.setContentType("application/json");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setHeader("charset", "UTF-8");
		try {
			PrintWriter out = new PrintWriter(resp.getWriter(), true);
			out.println(result);
			out.flush();
			out.close();
			if (result != null) {
				result.clear();
			}
		} catch (IOException e) {
			resp.flushBuffer();
			e.printStackTrace();
		} catch (IllegalStateException unused) {
		} catch (Exception unused) {
			System.out.println(unused.getMessage());
		} catch (Throwable unused) {
			System.out.println(unused.getMessage());
		}
	}

	protected <T> JSONObject getSerializeJSONObject(T obj) throws Exception {
		JSONObject jsObj = new JSONObject();		
		if(obj != null){
			Class<?> clazz = obj.getClass();		
			Method[] methods = clazz.getDeclaredMethods();
			for(Field field : clazz.getDeclaredFields()){				
				Object genericValue = null;
				for(Method method : methods){
					if(method.getName().equalsIgnoreCase("get"+field.getName())){
						try {
							genericValue = method.invoke(obj);							
							if(genericValue != null && genericValue.getClass().getPackage() != null) {
								Class<?> c = genericValue.getClass();									
								Package pack = c.getPackage();
								if(!c.isPrimitive() && pack.getName().contains(".dao.domain")){									
									try {
										Method m = c.getDeclaredMethod("getId");
										Long id = (Long) m.invoke(genericValue);
										jsObj.put(field.getName(), id);
									} catch (NoSuchMethodException e){
										jsObj.put(field.getName(), genericValue);
									}								
								} else if(!(genericValue instanceof Collection<?>)) {
									jsObj.put(field.getName(), genericValue);
								}
							}						
						} catch (IllegalAccessException e) {
							e.printStackTrace();
						} catch (IllegalArgumentException e) {
							e.printStackTrace();
						} catch (InvocationTargetException e) {
							e.printStackTrace();
						} catch (SecurityException e) {
							e.printStackTrace();
						}
					}
				}			 			
			}				
		}			
		return jsObj;
	}			
	
	public ServiceLocator getServiceLocator() {
		return serviceLocator;
	}

	public Alerta getAlerta() {
		return alerta;
	}

	public String getContext() {
		return context;
	}

	public Long getServicesid() {
		return servicesid;
	}

	public void setServicesid(Long servicesid) {
		this.servicesid = servicesid;
	}

	public HttpSession getSession() {
		return session;
	}

	public void setSession(HttpSession session) {
		this.session = session;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public Long getServiceId() {
		return servicesid;
	}

	public void setServiceId(Long serviceId) {
		servicesid = serviceId;
	}

	public ServletContext getServletContext() {
		return servletContext;
	}

	public PropertyResourceBundle getBundle() {
		return bundle;
	}

	public SecurityService getSecurityService() {
		return securityService;
	}
	
	protected Long getUsuarioId() {
		Long user = null;
		if (getSession() != null) {
			SessionBean bean = (SessionBean) getSession().getAttribute("sessionBean");
			if (bean != null) {
				user = bean.getUsuario().getId();
			}
		}

		return user;
	}

	protected Usuario getUsuario() throws InfraestructureException {
		Usuario user = null;
		if (getSession() != null) {
			SessionBean bean = (SessionBean) getSession().getAttribute("sessionBean");
			if (bean != null) {
				user = getServiceLocator().getUsuarioService().getUsuario(bean.getUsuario().getId());
			}
		}

		return user;
	}

	protected Long getEmpresaId() throws InfraestructureException {
		Long idEmpresa = 0L;
		if (getSession() != null) {
			idEmpresa = (Long) getSession().getAttribute(SessionHelper.ID_ENTIDAD);
		}
		return idEmpresa;
	}
	
	protected Long getEmpresaId(Long userId) {
		Long idEmpresa = 0L;

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			Empresa empresa = securityService.getEmpresaByUsuario(userId);
			if (empresa != null) {
				idEmpresa = empresa.getId();
			}
			security.dao.util.HibernateUtil.commitTransaction();
		} catch (security.dao.exception.InfraestructureException e) {
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch (security.dao.exception.InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				security.dao.util.HibernateUtil.closeSession();
			} catch (security.dao.exception.InfraestructureException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return idEmpresa;
	}
	
	protected List<Usuario> getListagUsuariosAplicacionRol(String context, Long idRol) throws Exception, IOException {
		List<Usuario> list = new ArrayList<Usuario>();

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			List<security.dao.domain.Usuario> listUsuarios = securityService.getListaUsuarioAplicacion(context);
			for (security.dao.domain.Usuario user : listUsuarios) {
				Set<Rol> rolSet = user.getRolSet();
				Iterator<Rol> iterRolSet = rolSet.iterator();
				while (iterRolSet.hasNext()) {
					Rol rol = iterRolSet.next();
					if (rol.getId().equals(idRol)) {
						list.add(getServiceLocator().getUsuarioService().getUsuario(user.getId()));
						break;
					}
				}
			}

			security.dao.util.HibernateUtil.commitTransaction();
		} catch (security.dao.exception.InfraestructureException e) {
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch (security.dao.exception.InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				security.dao.util.HibernateUtil.closeSession();
			} catch (security.dao.exception.InfraestructureException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return list;
	}

	protected List<Usuario> getListaUsuariosAplicacion(String context) throws Exception, IOException {
		List<Usuario> list = new ArrayList<Usuario>();

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			List<security.dao.domain.Usuario> listUsuarios = securityService.getListaUsuarioAplicacion(context);
			for (security.dao.domain.Usuario user : listUsuarios) {
				list.add(getServiceLocator().getUsuarioService().getUsuario(user.getId()));

			}

			security.dao.util.HibernateUtil.commitTransaction();
		} catch (security.dao.exception.InfraestructureException e) {
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch (security.dao.exception.InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				security.dao.util.HibernateUtil.closeSession();
			} catch (security.dao.exception.InfraestructureException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return list;
	}

	protected String getUsuarioBean() {
		String user = null;
		if (getSession() != null) {
			SessionBean bean = (SessionBean) getSession().getAttribute("sessionBean");
			if (bean != null) {
				user = bean.getUsuario().getUser();
			}
		}

		return user;
	}

	protected boolean tipoRol(Long idUsuario, Long idRol, String context) throws Exception, IOException {
		Boolean rolAsignado = false;

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			security.dao.domain.Usuario usuario = securityService.getUsuario(idUsuario);
			Set<Rol> rol = usuario.getRolSet();

			for (Iterator<Rol> iteratorRol = rol.iterator(); iteratorRol.hasNext();) {
				sortedRol = iteratorRol.next();

				if (sortedRol.getAplicacion().getAlias().equals(context)) {
					if (sortedRol.getId() == idRol) {
						rolAsignado = true;
						break;
					}
				}
			}

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

		return rolAsignado;
	}

	protected boolean pageAcceso(HttpServletRequest req, Long key, String context) throws Exception, IOException {
		session = req.getSession(false);
		SessionBean bean = (SessionBean) session.getAttribute("sessionBean");
		Boolean access = false;

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			access = securityService.validarAccesoContextoXUsuarioServicio(context, bean.getUsuario().getId(), key.intValue());
			security.dao.util.HibernateUtil.commitTransaction();
		} catch (security.dao.exception.InfraestructureException e) {
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch (security.dao.exception.InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				security.dao.util.HibernateUtil.closeSession();
			} catch (security.dao.exception.InfraestructureException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return access;
	}

	protected boolean isEntidadEnabled() {
		if (getSession() != null) {
			Long entidad = (Long) getSession().getAttribute("idEntidad");
			String nombreEntidad = (String) getSession().getAttribute("nombreEntidad");
			if ((entidad != null) && (nombreEntidad != null) && !nombreEntidad.isEmpty()) {
				return true;
			}
		}
		return false;
	}
	
	protected void dispacherController(HttpServletRequest req, HttpServletResponse resp, int key, String path) throws ServletException, IOException {
		try {
			setDefaultValues(req, key);			
				if (isEntidadEnabled()) {
					boolean permiso = pageAcceso(req, servicesid, context);
					if (!permiso) {
						path = "/html/acceso.html";
					}
				} else {
					path = "/html/entidadDisabled.html";
				}			
			resp.setContentType("text/html");
			resp.setHeader("Cache-Control", "no-cache");
			resp.setHeader("charset", "UTF-8");
			servletContext.getRequestDispatcher(path).forward(req, resp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void setDefaultValues(HttpServletRequest req, int key) {
		setSession(req.getSession(false));
		String context = req.getContextPath();
		context = context.substring(1, context.length()).trim();
		//String context = req.getServerName().substring(0, req.getServerName().indexOf("."));
		setContext(context);
		setServicesid((long) key);
		ip = req.getRemoteAddr();
		host = req.getRemoteHost();
		ruser = req.getRemoteUser();
		rport = req.getRemotePort();
		
	}

	protected String getStringValue(String value) {
		return value == null ? "" : value;
	}
	
	protected String getBooleanValue(String value) {
		return value == null ? "false" : value;
	}
	
	protected String getNumberValue(String value) {
		return value == null ? "0" : value;
	}
	
	protected String getEstatus(Boolean value) {
		return value ? "<span class='activo-class'> ACTIVO </span>" : "<span class='inactivo-class'> INACTIVO </span>";
	}
	
	protected String getLabelValue(Boolean value) {
		return value ? "SI" : "NO";
	}
	
	protected boolean vParam(String param) {
		return (param == null ? false : (param.isEmpty() ? false : (param.length() > 0 ? true : false)));
	}

	protected boolean vList(List<?> list) {
		return (list == null ? false : (list.isEmpty() ? false : (list.size() > 0 ? true : false)));
	}

	protected String getHtmlLink(List<Map<String, Object>> list) {
		StringBuilder sb = new StringBuilder();
		sb.append("<div class=\"btn-group\">");
		sb.append("<button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">");
		sb.append("Opciones <span class=\"caret\"></span>");
		sb.append("</button>");
		sb.append("<ul class=\"dropdown-menu\">");
		for (Map<String, Object> map : list) {
			String params = (String) map.get("params");
			String icon = (String) map.get("icon");
			String label = (String) map.get("label");
			sb.append("<li><a onclick=\"" + params + "\"> <span class=\"" + icon + "\"></span> " + label + " </a></li>");
		}
		sb.append("</ul>");
		sb.append("</div>");

		return sb.toString();
	}

	protected String getHtmlProgressBar(Integer base, Integer value, String label) {
		StringBuilder sb = new StringBuilder();
		sb.append("<div class=\"progress\" style=\"margin: 0; width: 150px;\">");
		sb.append("<div class=\"progress-bar progress-bar-heap progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"" + base + "\" aria-valuemin=\"0\" aria-valuemax=\"" + base + "\" style=\"width: " + base + "%\">");
		sb.append("<div class=\"progress progress-inset pull-right\" style=\"width: " + (base - value) + "%\"></div>");
		sb.append("</div>");
		sb.append("</div>");
		return sb.toString();
	}

	protected Long getRolId(String context) throws Exception, IOException {
		SessionBean bean = (SessionBean) session.getAttribute("sessionBean");
		Long rolId = 0L;

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			security.dao.domain.Usuario usuario = securityService.getUsuario(bean.getUsuario().getId());
			Set<Rol> rol = usuario.getRolSet(); // bean.getUsuario().getRolSet();

			for (Iterator<Rol> iteratorRol = rol.iterator(); iteratorRol.hasNext();) {
				sortedRol = iteratorRol.next();
				if (sortedRol.getAplicacion().getAlias().equals(context)) {
					rolId = sortedRol.getId();
					break;
				}
			}

			security.dao.util.HibernateUtil.commitTransaction();
		} catch (security.dao.exception.InfraestructureException e) {
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch (security.dao.exception.InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				security.dao.util.HibernateUtil.closeSession();
			} catch (security.dao.exception.InfraestructureException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return rolId;
	}

	protected Rol getRolByContext(String context) throws Exception, IOException {
		SessionBean bean = (SessionBean) session.getAttribute("sessionBean");
		Rol role = null;

		try {
			security.dao.util.HibernateUtil.beginTransaction();
			security.dao.domain.Usuario usuario = securityService.getUsuario(bean.getUsuario().getId());
			Set<Rol> rol = usuario.getRolSet(); // bean.getUsuario().getRolSet();

			for (Iterator<Rol> iteratorRol = rol.iterator(); iteratorRol.hasNext();) {
				sortedRol = iteratorRol.next();
				if (sortedRol.getAplicacion().getAlias().equals(context)) {
					role = sortedRol;
					break;
				}
			}

			security.dao.util.HibernateUtil.commitTransaction();
		} catch (security.dao.exception.InfraestructureException e) {
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch (security.dao.exception.InfraestructureException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				security.dao.util.HibernateUtil.closeSession();
			} catch (security.dao.exception.InfraestructureException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return role;
	}

	protected String[] getPropertyStringArray(PropertyResourceBundle bundle2, String keyPrefix) {
		String[] result;
		Enumeration<String> keys = bundle2.getKeys();
		ArrayList<String> temp = new ArrayList<String>();

		for (Enumeration<String> e = keys; keys.hasMoreElements();) {
			String key = e.nextElement();
			if (key.startsWith(keyPrefix)) {
				temp.add(key);
			}
		}
		result = new String[temp.size()];

		for (int i = 0; i < temp.size(); i++) {
			result[i] = bundle2.getString(temp.get(i));
		}

		return result;
	}

	protected boolean rolAsignadoPropertY(String[] child) throws IOException, Exception {
		boolean isRol = false;

		if (getSession() != null) {
			SessionBean bean = (SessionBean) getSession().getAttribute("sessionBean");
			if (bean != null) {
				for (int i = 0; i < child.length; i++) {
					if (tipoRol(bean.getUsuario().getId(), Long.parseLong(child[i]), getContext())) {
						isRol = true;
						break;
					}

				}
			}
		}
		return isRol;
	}

	protected Map<String, String> convertStringToMap(String str) {
		Map<String, String> map = new HashMap<String, String>();
		if ((str != null) && !str.isEmpty()) {
			String[] keysAndValues = str.split(";");
			for (String keyAndValue : keysAndValues) {
				String[] taken = keyAndValue.trim().split("=", 2);
				String key = taken[0];
				String value = taken[1];
				value = (value == null) || value.isEmpty() || value.equals("null") ? "0" : value;
				map.put(key, value);
			}
		}
		return map;
	}

	protected String convertMapToString(Map<String, Object> map) {
		StringBuilder str = new StringBuilder("");
		if ((map != null) && !map.isEmpty()) {
			Iterator<String> iterMapKeys = map.keySet().iterator();
			while (iterMapKeys.hasNext()) {
				String key = iterMapKeys.next();
				if (map.containsKey(key)) {
					Object value = map.get(key);
					value = (value == null) || value.equals("null") ? "0" : value;
					str.append(key).append("=").append(value).append(";");
				}
			}
		}
		String result = str.toString();
		if ((result != null) && !result.isEmpty()) {
			result = result.substring(0, result.length() - 1);
		}
		return result;
	}

	protected boolean validateParam(String param) {
		return (param == null ? false : (param.isEmpty() ? false : (param.length() > 0 ? true : false)));
	}	

	protected String getMsgError(Throwable aThrowable, String urlApp) {
		final StringBuilder result = new StringBuilder(urlApp + " ");
		final String NEW_LINE = System.getProperty("line.separator");
		result.append(NEW_LINE);
		result.append(aThrowable.toString());
		result.append(NEW_LINE);

		for (StackTraceElement element : aThrowable.getStackTrace()) {
			result.append(element);
			result.append(NEW_LINE);
		}
		return result.toString();
	}

}
