package movilway.view.servlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import security.dao.domain.Parametro;
import security.service.ParametroService;
import security.service.impl.ParametroServiceImpl;
import movilway.view.helper.ConstantsHelper;

@WebServlet(name = "ConstanteServlet", urlPatterns = { "/Constante" }, loadOnStartup = 3)
public class ConstanteServlet extends HttpServlet implements Servlet {
	private static final long serialVersionUID = 1L;
	private volatile JSONObject result;
	private ParametroService parametroService;

	public ConstanteServlet() {
		super();
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		parametroService = ParametroServiceImpl.build();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.constante(request, response);
	}

	private ParametroService getParametroService() {
		return parametroService;
	}

	protected void constante(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Boolean IsSuccess = true;
		String Msg = null;
		String title = "";
		String App = "";
		String App2 = "";
		String ver = "";
		String footer = "";
		String backgroundimg1 = null;
		String iconoEmpresa1 = null;
		String iconoEmpresa2 = null;

		title = ConstantsHelper.Title;
		App = ConstantsHelper.App;
		App2 = ConstantsHelper.App2;
		ver = ConstantsHelper.ver;
		footer = ConstantsHelper.Title2;

		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Cache-Control", "max-age=60,stale-while-revalidate=60");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Last-Modified", dateFormat.format(new Date()));
		List<Parametro> parametros = null;

		synchronized (this){
			try {
				security.dao.util.HibernateUtil.beginTransaction();
				parametros = getParametroService().getListParametros();
				if (parametros != null) {
					for (Parametro parametro : parametros) {
						if (parametro.getDescripcion().equalsIgnoreCase("BACKGROUDIMG1")) {
							backgroundimg1 = parametro.getValor();
						} else if (parametro.getDescripcion().equalsIgnoreCase("ICONOEMPRESA1")) {
							iconoEmpresa1 = parametro.getValor();
						} else if (parametro.getDescripcion().equalsIgnoreCase("ICONOEMPRESA2")) {
							iconoEmpresa2 = parametro.getValor();
						}
						if ((backgroundimg1 != null) && (iconoEmpresa1 != null)
						        && (iconoEmpresa2 != null)) {
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
		}		
		result = new JSONObject();
		result.put("IsSuccess", IsSuccess);
		result.put("Msg", Msg);
		result.put("title", title);
		result.put("App", App);
		result.put("App2", App2);
		result.put("ver", ver);
		result.put("footer", footer);
		result.put("background", (backgroundimg1 != null ? backgroundimg1 : "empty"));
		result.put("icono1", (iconoEmpresa1 != null ? iconoEmpresa1 : "empty"));
		result.put("icono2", (iconoEmpresa2 != null ? iconoEmpresa2 : "empty"));
		response.setContentType("application/x-json;charset=UTF-8");
		response.setHeader("Cache-Control", "no-store");

		try {
			response.getWriter().print(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
