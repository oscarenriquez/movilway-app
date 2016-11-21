package movilway.view.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import movilway.service.util.Alerta;
import movilway.view.helper.ServicioHelper;

@WebFilter(filterName = "HibernateFilterApplication", urlPatterns = { "/Session" })
public class HibernateSessionRequestAppFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		try{
						
			chain.doFilter(request, response);
			
		} catch (Exception e){
			logFilterException(request, response, e);
		} catch (Throwable e){
			// captura error no controlado.
			logException(request, response, e);
		}
		
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void destroy() {

	}
	
	/**
	 * Metodo para los errores no controlados
	 * @param request
	 * @param response
	 * @param e
	 * @throws IOException
	 * @throws ServletException
	 */
	private void logException(ServletRequest request, ServletResponse response, Throwable e) throws IOException, ServletException {
        HttpServletRequest r = (HttpServletRequest) request;
        System.err.println("Request.RequestURL=" + r.getRequestURL());
        System.err.println("Request.UserPrincipal=" + r.getUserPrincipal());

        Alerta alerta = new Alerta();
        alerta.enviarAlerta("HibernateFilterApplication", e, "", ServicioHelper.EMAIL);
        alerta = null;
        
        e.printStackTrace();
        throw new ServletException(e.getMessage(), e);
    }
	
	private void logFilterException(ServletRequest request, ServletResponse response, Throwable e) throws IOException, ServletException {
		Alerta alerta = new Alerta();
	    alerta.enviarAlerta("HibernateSessionRequestAppFilter", e, "", ServicioHelper.EMAIL);
	    alerta = null;
	}
}
