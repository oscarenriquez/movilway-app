package movilway.view.helper;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

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
import security.dao.domain.Parametro;
import security.service.ParametroService;
import security.service.SecurityService;
import security.service.impl.ParametroServiceImpl;
import security.service.impl.SecurityServiceImpl;
import security.view.bean.SessionBean;

public class SessionHelper implements Serializable {

	private static final long serialVersionUID = 1L;
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
		String context = req.getContextPath();
		context = context.substring(1, context.length()).trim();
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
		String context = req.getContextPath();
		context = context.substring(1, context.length()).trim();
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

			byte[] photoData = null;

			Usuario usuario = getUsuarioService().getUsuario(idUsuario);
			if (usuario.getUserPhoto() != null) {
				photoData = usuario.getUserPhoto();
			} else {
				try {
					security.dao.util.HibernateUtil.beginTransaction();
					Parametro paramAux = getParametroService().getParametro("USUARIOPHOTO");
					if (paramAux != null) {
						FileInputStream fileInput = new FileInputStream(servletContext.getRealPath(paramAux.getValor()));
						photoData = IOUtils.toByteArray(fileInput);
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
			}

			resp.setContentType("image/gif");
			ServletOutputStream servletOutputStream = resp.getOutputStream();
			if (photoData != null) {
				servletOutputStream.write(photoData, 0, photoData.length);
			}
			servletOutputStream.flush();
			servletOutputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
