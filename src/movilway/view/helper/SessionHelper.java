package movilway.view.helper;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.regex.Pattern;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.compress.utils.IOUtils;

import movilway.dao.domain.Usuario;
import movilway.service.UsuarioService;
import movilway.service.impl.UsuarioServiceImpl;
import net.sf.json.JSONObject;
import security.dao.ParametroDao;
import security.dao.domain.Empresa;
import security.dao.domain.Parametro;
import security.service.ParametroService;
import security.service.SecurityService;
import security.service.impl.ParametroServiceImpl;
import security.service.impl.SecurityServiceImpl;
import security.view.bean.SessionBean;
import sun.misc.BASE64Encoder;

public class SessionHelper implements Serializable {

	private static final long serialVersionUID = 1L;
	public static final String ID_ENTIDAD = "idEntidad";
	public static final String NOM_ENTIDAD = "nombreEntidad";
	private final ServletContext servletContext;
	private final SecurityService securityService;
	private final UsuarioService usuarioService;
	private final ParametroService parametroService;
	public static HttpSession session;

	@SuppressWarnings("unused")
	private ServicioHelper servicioHelper;

	public SessionHelper(ServletContext servletContext) {
		this.servletContext = servletContext;
		servicioHelper = new ServicioHelper(servletContext);
		securityService = SecurityServiceImpl.build();
		usuarioService = UsuarioServiceImpl.build();
		parametroService = ParametroServiceImpl.build();

	}

	public String getContext(HttpServletRequest req){
		String context = req.getContextPath();
		context = context.substring(1, context.length()).trim();		
		//String context = req.getServerName().substring(0,req.getServerName().indexOf("."));
		return context;		
	}
	
	public synchronized String getUrlApp(HttpServletRequest request) {

		HttpSession sessionRequest = request.getSession(false);
		String urlApp = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
		StringBuilder sb = new StringBuilder();
		SessionBean sessionBean = (SessionBean) sessionRequest.getAttribute("sessionBean");
		if (sessionBean != null) {
			sb.append("SessionID " + sessionRequest.getId() + " | TO " + urlApp + " | USER " + sessionBean.getUsuario().getUser());
		} else {
			sb.append("SessionID " + sessionRequest.getId() + " | TO " + urlApp + " | ERROR IN SESSIONBEAN ");
		}
		return sb.toString();
	}

	public synchronized void printJson(HttpServletResponse resp, JSONObject result) throws IOException {
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
		} catch (Exception e) {
			resp.flushBuffer();
			e.printStackTrace();
		}
	}

	public SecurityService getSecurityService() {
		return securityService;
	}

	public UsuarioService getUsuarioService() {
		return usuarioService;
	}

	public ParametroService getParametroService() {
		return parametroService;
	}

	public void logout(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession(false);
		String context = getContext(req);
		if (session != null) {
			SessionBean bean = (SessionBean) session.getAttribute("sessionBean");
			if (bean != null) {
				try {
					security.dao.util.HibernateUtil.beginTransaction();
					getSecurityService().elimarSessioneslost(context, bean.getUsuario().getUser());
					security.dao.util.HibernateUtil.commitTransaction();
					System.out.println(getUrlApp(req) + " |  Se elimino la Sesion");
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
			}
			session.setAttribute("sessionBean", new SessionBean());			
			session.invalidate();
			session = null;
		}
		req.logout();
		servletContext.getRequestDispatcher("/html/init.html").forward(req, resp);
	}
	
	public void action(HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		String context = getContext(req);
		Long posicion = (long) key;
		String[] claseMetodo = new String[2];
		String sClase = null;
		String sMetodo = null;			

		try {
			try {
				security.dao.util.HibernateUtil.beginTransaction();
				claseMetodo = getSecurityService().getPathServices(posicion, context).split("/", 2);
				sClase = claseMetodo[0];
				sMetodo = claseMetodo[1];
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
				}
			}

			try {
				cargaDinamica(sClase, sMetodo, req, resp, key);
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
			logout(req, resp);
		}
	}

	public static void cargaDinamica(String clase, String metodoLlamado, HttpServletRequest req, HttpServletResponse resp, int key)
	        throws ClassNotFoundException, InstantiationException, IllegalAccessException, SecurityException, NoSuchMethodException,
	        IllegalArgumentException, InvocationTargetException {

		@SuppressWarnings("rawtypes")
		Class _class = Class.forName(clase);

		Object tempClass = _class.newInstance();

		@SuppressWarnings("rawtypes")
		Class claseCargada = tempClass.getClass();

		//Firma del metodo.
		@SuppressWarnings("rawtypes")
		Class[] argumentos = new Class[3];
		argumentos[0] = HttpServletRequest.class;
		argumentos[1] = HttpServletResponse.class;
		argumentos[2] = int.class;

		//Busqueda del metodo a ejecutar
		@SuppressWarnings("unchecked")
		Method metodo = claseCargada.getDeclaredMethod(metodoLlamado.trim(), argumentos);

		//Ejecucion del m?todo pasandole la clase de este y los parametros.
		metodo.invoke(tempClass, req, resp, key);

	}

	public void about(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		servletContext.getRequestDispatcher("/jsp/about.jsp").forward(req, resp);
	}

	public void userPhoto(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String sId = req.getParameter("id");
		Long idUsuario = Long.parseLong((sId == null ? "0" : sId));

		try {
			byte[] photoData = null ;

			Usuario usuario = getUsuarioService().getUsuario(idUsuario);
			if(usuario.getUserPhoto() != null){
				photoData = usuario.getUserPhoto();
			}else{
				try {
					security.dao.util.HibernateUtil.beginTransaction();
					SessionBean sb = (SessionBean) req.getSession(false).getAttribute("sessionBean");					
					Empresa empresa = getSecurityService().getEmpresaByUsuario(sb.getUsuario().getId());										
					Long idEmpresa = (empresa != null ? empresa.getId() : 0L);
					Parametro paramAux = getParametroService().getParametroXEmpresa(idEmpresa, "PHOTO-SEGURIDAD");
					if (paramAux != null) {
						if(paramAux.getTipo().equals(ParametroDao.TIPO_IMAGEN)){
							if(paramAux.getImagen() != null) {
								photoData = paramAux.getImagen();
							} else {
								InputStream is = servletContext.getResourceAsStream("/img/anonymous.jpg");
								photoData = IOUtils.toByteArray(is);
							}
						} else {
							InputStream is = servletContext.getResourceAsStream("/img/anonymous.jpg");
							photoData = IOUtils.toByteArray(is);
						}
					} else {
						InputStream is = servletContext.getResourceAsStream("/img/anonymous.jpg");
						photoData = IOUtils.toByteArray(is);
					}
					
					security.dao.util.HibernateUtil.commitTransaction();
				}  catch(security.dao.exception.InfraestructureException e){
					try {
						security.dao.util.HibernateUtil.rollbackTransaction();
					} catch(security.dao.exception.InfraestructureException e1){
						e.printStackTrace();
					}
					e.printStackTrace();
				} catch(Exception e){
					e.printStackTrace();
				}				
			}
			
			resp.setContentType("image/gif"); 
			ServletOutputStream servletOutputStream = resp.getOutputStream(); 
			if(photoData != null){
				servletOutputStream.write(photoData, 0, photoData.length);
			}
			servletOutputStream.flush(); 
	        servletOutputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
	
	public void setSessionAttrEntidad(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		Long idEntidad = 0L; 		
		String nombreEntidad = "";				
				
		if (session != null) {
			SessionBean bean = (SessionBean) session.getAttribute("sessionBean");
			if (bean != null) {
				security.dao.domain.Usuario usuario = bean.getUsuario();
				Long idUsuario = usuario.getId();
				Empresa empresa = getEmpresa(idUsuario);
				if (empresa != null) {
					idEntidad = empresa.getId();
					nombreEntidad = empresa.getNombre();

				}
			}
		}				
		session.setAttribute(ID_ENTIDAD, idEntidad);
		session.setAttribute(NOM_ENTIDAD, nombreEntidad);					
	}
	
	protected Empresa getEmpresa(Long userId){
		Empresa emp = null;
		
		try {
			security.dao.util.HibernateUtil.beginTransaction();
			Empresa empresa = securityService.getEmpresaByUsuario(userId);
			if(empresa != null){
				emp = empresa;
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
		
		return emp;
	}
	
	public void getParameters(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		StringBuilder css = new StringBuilder();
		try {
			security.dao.util.HibernateUtil.beginTransaction();
			SessionBean sb = (SessionBean) req.getSession(false).getAttribute("sessionBean");
			Empresa empresa = null;
			if(sb != null) {
				empresa = getSecurityService().getEmpresaByUsuario(sb.getUsuario().getId());
			} else {
				empresa = (Empresa) req.getSession(false).getAttribute("empresa");
			}
			
			Long idEmpresa = (empresa != null ? empresa.getId() : 0L);
			Parametro parambg = getParametroService().getParametroXEmpresa(idEmpresa, "BACKGROUD-SEGURIDAD");
			Parametro paramcl = getParametroService().getParametroXEmpresa(idEmpresa, "NAVBARCOLOR");
			Parametro parFocl = getParametroService().getParametroXEmpresa(idEmpresa, "NAVBARFONTCOLOR");
			Parametro parLkcl = getParametroService().getParametroXEmpresa(idEmpresa, "NAVBARLINKCOLOR");
			
			Character tipo1 = parambg != null ? parambg.getTipo() : null;
			Character tipo2 = paramcl != null ? paramcl.getTipo() : null;
			Character tipo3 = parFocl != null ? parFocl.getTipo() : null;
			Character tipo4 = parLkcl != null ? parLkcl.getTipo() : null;
			
			if(ParametroDao.TIPO_IMAGEN.equals(tipo1)){
				String img =new BASE64Encoder().encode(parambg.getImagen());
				img = img.replaceAll("\\t", "");
				img = img.replaceAll("\\n", "");
				img = img.replaceAll("\\s", "");
				img = img.replaceAll(" ", "");
				css.append("body { \n");
				css.append("background-image: url(\"data:image/png;base64,").append(img).append("\"); \n");
				css.append("background-attachment: fixed !important; \n");				
				css.append("background-repeat: no-repeat !important; \n");
				css.append("background-position: bottom center !important; \n");
				css.append("-webkit-background-size:cover !important; \n");
				css.append("-moz-background-size: cover !important; \n");
				css.append("background-size: cover !important; \n");
				css.append("} \n");
				
			} else if(ParametroDao.TIPO_COLOR.equals(tipo1)){
				
				String[] valores = parambg.getValor().split(Pattern.quote("|"), 3);
				String stopColor1 = valores[0];
				String stopColor2 = valores[1];
				String angle = valores[2];
				
				css.append("body {  \n");
				css.append("background: -webkit-linear-gradient(").append(angle).append("deg, ").append(stopColor1).append(", ").append(stopColor2).append(") !important;  \n");
				css.append("background: -o-linear-gradient(").append(angle).append("deg, ").append(stopColor1).append(", ").append(stopColor2).append("); !important;  \n");
				css.append("background: -moz-linear-gradient(").append(angle).append("deg, ").append(stopColor1).append(", ").append(stopColor2).append("); !important;  \n");
				css.append("background: linear-gradient(").append(angle).append("deg, ").append(stopColor1).append(", ").append(stopColor2).append("); !important;  \n");
				css.append("}  \n");
			}
			
			if(ParametroDao.TIPO_COLOR.equals(tipo2) && ParametroDao.TIPO_FONT_COLOR.equals(tipo3) && ParametroDao.TIPO_COLOR.equals(tipo4)){
				if(!paramcl.getValor().equalsIgnoreCase("null") && paramcl.getValor().contains("|")){
					String[] valBg = paramcl.getValor().split(Pattern.quote("|"), 3);
					String stopColorBg1 = valBg[0];
					String stopColorBg2 = valBg[1];
					css.append(".navbar-inverse {  \n");
					css.append("background-color: "+stopColorBg1+" !important;  \n");
					css.append("border-color: "+stopColorBg2+" !important;  \n");
					css.append("}  \n");					
					css.append(".navbar-inverse .navbar-toggle { ");
					css.append("border-color: "+stopColorBg1+"; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-toggle:hover, ");
					css.append(".navbar-inverse .navbar-toggle:focus { ");
					css.append("background-color: "+stopColorBg2+"; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-nav .dropdown-toggle:hover, ");
					css.append(".navbar-inverse .navbar-nav .dropdown-toggle:focus { ");
					css.append("background-color: "+stopColorBg2+"; ");
					css.append("} ");
					css.append(".navbar-inverse { ");
					css.append("background-image: -webkit-gradient(linear, left 0%, left 100%, from("+stopColorBg1+"), to("+stopColorBg2+")) !important; ");
					css.append("background-image: -webkit-linear-gradient(top, "+stopColorBg1+", 0%, "+stopColorBg2+", 100%) !important; ");
					css.append("background-image: -moz-linear-gradient(top, "+stopColorBg1+" 0%, "+stopColorBg2+" 100%) !important; ");
					css.append("background-image: linear-gradient(to bottom, "+stopColorBg1+" 0%, "+stopColorBg2+" 100%) !important; ");
					css.append("background-repeat: repeat-x; ");					
					css.append("} ");
				}
				if(!parLkcl.getValor().equalsIgnoreCase("null") && parLkcl.getValor().contains("|")){
					String[] valLk = parLkcl.getValor().split(Pattern.quote("|"));
					String stopColorLk1 = valLk[0];
					String stopColorLk2 = valLk[1];
					
					css.append(".navbar-inverse .navbar-nav > li > a:hover, \n");
					css.append(".navbar-inverse .navbar-nav > li > a:focus { \n");					
					css.append("background-color: "+stopColorLk1+" !important; \n");
					css.append("} \n");					
					css.append(".navbar-inverse .navbar-nav > .active > a, \n");
					css.append(".navbar-inverse .navbar-nav > .active > a:hover, \n");
					css.append(".navbar-inverse .navbar-nav > .active > a:focus { \n");					
					css.append("background-color: "+stopColorLk2+" !important; \n");
					css.append("} \n");
					css.append(".navbar-inverse .navbar-nav > .active > a { \n");
					css.append("background-image: -webkit-linear-gradient(top, "+stopColorLk1+" 0%, "+stopColorLk2+" 100%) !important; \n");
					css.append("background-image:         linear-gradient(to bottom, "+stopColorLk1+" 0%, "+stopColorLk2+" 100%) !important; \n");					
					css.append("background-repeat: repeat-x; ");
					css.append("-webkit-box-shadow: inset 0 3px 9px "+stopColorLk1+" !important; ");
					css.append("box-shadow: inset 0 3px 9px "+stopColorLk1+" !important; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus { ");
					css.append("background-color: "+stopColorLk1+" !important; ");					
					css.append("} ");
				}
				if(!parFocl.getValor().equalsIgnoreCase("null")){										
					String fontColor = parFocl.getValor();										
															
					css.append(".navbar-inverse .navbar-brand { ");
					css.append("color: "+fontColor+"; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-brand:hover, ");
					css.append(".navbar-inverse .navbar-brand:focus { ");
					css.append("color: "+fontColor+"; ");
					css.append("opacity: 0.8; ");
					css.append("background-color: transparent; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-text { ");
					css.append("color: "+fontColor+"; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-nav > li > a { ");
					css.append("color: "+fontColor+"; ");
					css.append("} ");
					css.append(".navbar-inverse .navbar-nav > li > a:hover, ");
					css.append(".navbar-inverse .navbar-nav > li > a:focus { ");
					css.append("color: "+fontColor+"; ");					
					css.append("} ");
					css.append(".navbar-inverse .navbar-nav > .active > a, ");
					css.append(".navbar-inverse .navbar-nav > .active > a:hover, ");
					css.append(".navbar-inverse .navbar-nav > .active > a:focus { ");
					css.append("color: "+fontColor+"; ");					
					css.append("} ");
					css.append(".navbar-inverse .navbar-nav > .disabled > a, ");
					css.append(".navbar-inverse .navbar-nav > .disabled > a:hover, ");
					css.append(".navbar-inverse .navbar-nav > .disabled > a:focus { ");
					css.append("color: "+fontColor+"; ");
					css.append("background-color: transparent; ");
					css.append("} ");					
					css.append(".navbar-inverse .navbar-toggle .icon-bar { ");
					css.append("background-color: "+fontColor+"; ");
					css.append("} ");				
					css.append(".navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus { ");					
					css.append("color: "+fontColor+" !important; ");
					css.append("} ");
				}								
			}
						
			security.dao.util.HibernateUtil.commitTransaction();
		}  catch(security.dao.exception.InfraestructureException e){
			try {
				security.dao.util.HibernateUtil.rollbackTransaction();
			} catch(security.dao.exception.InfraestructureException e1){
				e.printStackTrace();
			}
			e.printStackTrace();
		} catch(Exception e){
			e.printStackTrace();
		}
		
		resp.setContentType("text/css)");
		resp.getWriter().print(css.toString());
	}
}
