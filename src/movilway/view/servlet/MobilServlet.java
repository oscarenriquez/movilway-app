package movilway.view.servlet;

import java.io.File;
import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import security.view.bean.SessionBean;
import movilway.view.ServiceLocator;
import movilway.view.bean.ServiceLocatorBean;

@WebServlet(name = "MobilServlet", urlPatterns = { "/Mobil" }, loadOnStartup = 4)
public class MobilServlet extends HttpServlet implements Servlet {

	private static final long serialVersionUID = -4180240602177827139L;
	private ServiceLocator serviceLocator;

	public MobilServlet() {
		super();
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		serviceLocator = ServiceLocatorBean.getInstance();
	}

	public ServiceLocator getServiceLocator() {
		return serviceLocator;
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.process(request, response);
	}

	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String fileName = request.getParameter("nombre");
		String filePath = request.getServletContext().getRealPath("/report/");
		HttpSession sessionRequest = request.getSession(false);
		SessionBean sessionBean = null;

		String fullPath = filePath + "/" + fileName;
		File file = new File(fullPath);
		try {
			if (sessionRequest != null) {
				sessionBean = (SessionBean) sessionRequest.getAttribute("sessionBean");
				if (file.isFile()) {
					getServiceLocator().getUsuarioService().enviarInforme(sessionBean.getUsuario().geteMail(), fullPath);
				}
			}

		} catch (Exception e) {
			System.out.println("Mobil: error: " + e.toString());
		} finally {

			file.delete();

		}

		try {
			response.getWriter().print("Done");
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
