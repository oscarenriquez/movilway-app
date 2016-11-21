package movilway.view.servlet.async;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.AsyncContext;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;

import movilway.view.servlet.async.AppAsyncListener;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import movilway.view.helper.ServicioHelper;
import movilway.view.helper.SessionHelper;
import movilway.view.servlet.SessionServlet;

@MultipartConfig
@WebServlet(name = "SessionServlet",
asyncSupported = true,
urlPatterns = { "/Session" },
loadOnStartup = 1,
initParams = { @WebInitParam(name = "log4j-properties-location", value = "WEB-INF/log4j.xml") })
public class AsyncLongRunningServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger logger = Logger.getLogger(SessionServlet.class);
	private SessionHelper action;	
	public static final int CALLBACK_TIMEOUT = 10000;	

	/** executor service */
	private ExecutorService exec;
	
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
		int size = 100;
	    exec = Executors.newFixedThreadPool(size);
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected  void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("org.apache.catalina.ASYNC_SUPPORTED", true);
		AppAsyncListener asyncListener = new AppAsyncListener();
		AsyncContext asyncCtx = request.startAsync();
		asyncCtx.setTimeout(600000);
		asyncCtx.addListener(asyncListener);
		enqueLongRunningTask(asyncCtx, asyncListener, request.getSession(false));
	}
	
	private void enqueLongRunningTask(final AsyncContext asyncContext, final AppAsyncListener asyncListener, final HttpSession session_action) {

	     exec.execute(new Runnable() {

	      @Override
	      public synchronized void run() {
	    	  
	    	  try {
					HibernateUtil.beginTransaction();
					 try {

				        	HttpServletRequest request = (HttpServletRequest) asyncContext.getRequest();
							HttpServletResponse response = (HttpServletResponse) asyncContext.getResponse();
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
									asyncContext.getRequest().getServletContext().getRequestDispatcher("/html/init.html").forward(request, response);
								} else {
									String keys = request.getParameter("key") != null ? request.getParameter("key") : "0";
									int key = Integer.parseInt(keys);

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
					 	} catch (IllegalStateException ex) {
							System.out.println(ServicioHelper.getUrlApp((HttpServletRequest) asyncContext.getRequest())	+ " | ERROR IN AsyncServlet-IllegalStateException| "+ ex);
							ex.printStackTrace();
						} catch (Exception e) {
							System.out.println(ServicioHelper.getUrlApp((HttpServletRequest) asyncContext.getRequest())	+ " | ERROR IN AsyncServlet-Exception | " + e);
							e.printStackTrace();
						}
						HibernateUtil.commitTransaction();		

	    	  } catch (InfraestructureException e) {
					try {
						HibernateUtil.rollbackTransaction();
					} catch (InfraestructureException e1) {
						e1.printStackTrace();

					}
					System.out.println(ServicioHelper.getUrlApp((HttpServletRequest) asyncContext.getRequest())	+ " | ERROR IN AsyncServlet-InfraestructureException | "+ e);
					e.printStackTrace();

				} catch (Exception e) {
					System.out.println(ServicioHelper.getUrlApp((HttpServletRequest) asyncContext.getRequest())	+ " | ERROR IN AsyncServlet-Exception2 | " + e);
					e.printStackTrace();
				} finally {
					if (asyncContext != null && asyncListener.getState() != AppAsyncListener.STATE.complete) {
						asyncContext.complete();
					}

					try {
						if (HibernateUtil.getSession().isOpen()) {
							HibernateUtil.closeSession();
						}
					} catch (InfraestructureException e) {
						e.printStackTrace();

					}

				}

			}
		});
      
	  }
	

	private synchronized boolean isPermited(String auth, String user) {
		if ((user == "false") || (auth == "false")) {
			return true;
		} else {
			return false;
		}

	}
	
	 @Override
	  public void destroy() {
	    exec.shutdown();
	  }

}