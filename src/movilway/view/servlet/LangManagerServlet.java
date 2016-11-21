package movilway.view.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.Locale;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "LangManagerServlet", urlPatterns = { "/Lang" }, loadOnStartup = 5)
public class LangManagerServlet extends HttpServlet implements Servlet {

	private static final long serialVersionUID = -4180240602177827139L;
	private PropertyResourceBundle bundle;

	
	public LangManagerServlet() {
		super();
	}
	
	public PropertyResourceBundle getBundle() {
		return bundle;
	}	

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		bundle = (PropertyResourceBundle) PropertyResourceBundle.getBundle("locale");
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.langManager(request, response);
	}

	protected void langManager(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); 
		response.setHeader("Cache-Control","max-age=60,stale-while-revalidate=60"); 
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Last-Modified", dateFormat.format(new Date()));
		String lang = (String) request.getParameter("lang") == null ? "es" : (String) request.getParameter("lang");
		ResourceBundle labels = ResourceBundle.getBundle("locale",new Locale(lang.toLowerCase().trim()));
		@SuppressWarnings("rawtypes")
		Enumeration bundleKeys = labels.getKeys();
		PrintWriter out = response.getWriter();
		 
	      while (bundleKeys.hasMoreElements()) {
	         String key = (String)bundleKeys.nextElement();
	         String value  = labels.getString(key);	         
	         out.write(key+"="+value+"\n");

	      }
		 out.close();
	
	}

}
