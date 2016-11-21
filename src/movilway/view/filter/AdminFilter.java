package movilway.view.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

/**
 * 
 * Filtro para que la aplicación valide siempre la seguridad
 */

@WebFilter(filterName = "AdminFilter", urlPatterns = { "/jsp/*" } )
public class AdminFilter implements Filter {
	
	 private ServletContext context;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException {
		HttpServletRequest requestMod = ((HttpServletRequest) request);

		if (isPermited(requestMod) == false) {
			requestMod.getSession().setAttribute("requestedPage",requestMod.getRequestURL().toString());
			RequestDispatcher noPermited = request.getRequestDispatcher("/WEB-INF/access/restricted.html");
			noPermited.forward(request, response);
		} else {
			chain.doFilter(request, response);
		}
	}

	private boolean isPermited(HttpServletRequest request) {
		if (request.getSession().getAttribute("auth") == "false" || request.getSession().getAttribute("usuario") == null) {
			return false;
		} else {
			return true;
		}
		
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		 this.context = filterConfig.getServletContext();
	     this.context.log("RequestAdminFilter initialized");

	}

	@Override
	public void destroy() {
	}
}