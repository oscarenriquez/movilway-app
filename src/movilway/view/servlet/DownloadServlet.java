package movilway.view.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.AsyncContext;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import movilway.view.helper.ServicioHelper;
import movilway.view.servlet.async.AppAsyncListener;

@WebServlet(name = "DownloadServlet", asyncSupported = true, urlPatterns = { "/Download" }, loadOnStartup = 4)
public class DownloadServlet extends HttpServlet implements Servlet {

	private static final long serialVersionUID = -4180240602177827139L;
	/** executor service */
	private ExecutorService exec;

	public DownloadServlet() {
		super();
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		int size = 100;
		exec = Executors.newFixedThreadPool(size);
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.process(request, response);
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
			public void run() {
				try {
					HttpServletRequest request = (HttpServletRequest) asyncContext.getRequest();
					HttpServletResponse response = (HttpServletResponse) asyncContext.getResponse();

					String fileName = request.getParameter("nombre");
					String filePath = request.getServletContext().getRealPath("/report/");

					String fullPath = filePath + "/" + fileName;
					File file = new File(fullPath);
					byte b[] = new byte[(int) file.length()];
					response.setContentType("application/force-download");
					response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
					response.setHeader("Content-Transfer-Encoding", "binary;");
					response.setContentLength((int) file.length());
					response.setHeader("Pragma", "no-cache;");
					response.setHeader("Expires", "-1;");
					if (file.isFile()) {
						BufferedInputStream fin = new BufferedInputStream(new FileInputStream(file));
						BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
						int read = 0;
						try {
							while ((read = fin.read(b)) != -1) {
								outs.write(b, 0, read);
							}
							outs.close();
							fin.close();
						} catch (Exception e) {
							System.out.println("Download: error: " + e.toString());
						} finally {
							if (outs != null) {
								outs.close();
							}
							if (fin != null) {
								fin.close();
							}
							file.delete();

						}

					}

				} catch (Exception e) {
					System.out.println(ServicioHelper.getUrlApp((HttpServletRequest) asyncContext.getRequest()) + " | ERROR IN AsyncServlet-Exception2 | " + e);
					e.printStackTrace();
				} finally {
					if ((asyncContext != null) && (asyncListener.getState() != AppAsyncListener.STATE.complete)) {
						asyncContext.complete();
					}
				}

			}
		});

	}

	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String fileName = request.getParameter("nombre");
		String filePath = request.getServletContext().getRealPath("/reportes/");

		String fullPath = filePath + "/" + fileName;
		File file = new File(fullPath);
		byte b[] = new byte[(int) file.length()];
		response.setContentType("application/force-download");
		response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
		response.setHeader("Content-Transfer-Encoding", "binary;");
		response.setContentLength((int) file.length());
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1;");
		if (file.isFile()) {
			BufferedInputStream fin = new BufferedInputStream(new FileInputStream(file));
			BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
			int read = 0;
			try {
				while ((read = fin.read(b)) != -1) {
					outs.write(b, 0, read);
				}
				outs.close();
				fin.close();
			} catch (Exception e) {
				System.out.println("Download: error: " + e.toString());
			} finally {
				if (outs != null) {
					outs.close();
				}
				if (fin != null) {
					fin.close();
				}
				file.delete();

			}

		}
	}
}
