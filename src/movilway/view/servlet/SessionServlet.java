package movilway.view.servlet;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;

import movilway.view.helper.SessionHelper;

/*@WebServlet(name = "SessionServlet2",
        urlPatterns = { "/Session2" },
        loadOnStartup = 1,
        initParams = { @WebInitParam(name = "log4j-properties-location", value = "WEB-INF/log4j.xml") })*/
public class SessionServlet extends HttpServlet implements Servlet {
	private static Logger logger = Logger.getLogger(SessionServlet.class);
	private static final long serialVersionUID = 1L;
	private SessionHelper action;
	private HttpSession session_action;

	private String keys;
	private static int key;

	public SessionServlet() {
		super();
	}

	@Override
	public void init(ServletConfig config) throws ServletException {

		System.out.println("SessionServlet is initializing log4j");
		String log4jLocation = config.getInitParameter("log4j-properties-location");

		ServletContext sc = config.getServletContext();

		if (log4jLocation == null) {
			System.err.println("*** SessionServlet-No log4j-properties-location init param-security, so initializing log4j with BasicConfigurator");
			BasicConfigurator.configure();
		} else {
			String webAppPath = sc.getRealPath("/");
			String log4jProp = webAppPath + log4jLocation;
			File yoMamaYesThisSaysYoMama = new File(log4jProp);
			if (yoMamaYesThisSaysYoMama.exists()) {
				DOMConfigurator.configure(log4jProp);
				logger.info("SessionServlet-Initializing log4j with: " + log4jProp);
			} else {
				System.err.println("*** " + log4jProp + " SessionServlet-file not found-security, so initializing log4j with BasicConfigurator");
				BasicConfigurator.configure();
			}
		}

		super.init(config);
		action = new SessionHelper(this.getServletContext());
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.session(request, response);
	}

	private boolean isPermited(String auth, String user) {
		if ((user == "false") || (auth == "false")) {
			return true;
		} else {
			return false;
		}

	}

	protected synchronized void session(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		session_action = request.getSession(false);

		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Cache-Control", "max-age=60,stale-while-revalidate=60");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Last-Modified", dateFormat.format(new Date()));

		if (session_action != null) {
			String auth = (String) session_action.getAttribute("auth") != null ? (String) session_action.getAttribute("auth") : "false";
			String user = (String) session_action.getAttribute("usuario") != null ? (String) session_action.getAttribute("usuario") : "false";
			if (isPermited(auth, user)) {
				session_action.invalidate();
				session_action = null;
				this.getServletContext().getRequestDispatcher("/html/init.html").forward(request, response);
			} else {
				keys = request.getParameter("key") != null ? request.getParameter("key") : "0";
				key = Integer.parseInt(keys);

				switch (key) {
					case 0:
						break;
					case -1:
						action.about(request, response);
						break;
					case -2:
						action.logout(request, response);
						break;
					case -3:
						action.userPhoto(request, response);
						break;					
					default:
						action.action(request, response, key);
				}
			}

		}
	}

}
