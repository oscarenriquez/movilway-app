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

import security.dao.exception.InfraestructureException;
import security.dao.util.HibernateUtil;
import movilway.service.util.Alerta;
import movilway.view.exception.FilterException;
import movilway.view.helper.ServicioHelper;

@WebFilter(filterName = "HibernateFilterQuestion", urlPatterns = { "/Question" })
public class HibernateSessionRequestQuestionFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		try{
			try {
				HibernateUtil.beginTransaction();
				chain.doFilter(request, response);
				HibernateUtil.commitTransaction();		
			} catch (InfraestructureException e) {
				try {
					HibernateUtil.rollbackTransaction();
				} catch (InfraestructureException e1) {
					e1.printStackTrace();
					throw new FilterException("Rollback - " + e1.getMessage(), e1);
				}
				e.printStackTrace();
				throw new FilterException("Begin - Commit - " + e.getMessage(), e);
			} finally {
				try {
					if(HibernateUtil.getSession().isOpen()){
						HibernateUtil.closeSession();
					  }
				} catch (InfraestructureException e) {
					e.printStackTrace();
					throw new FilterException("CloseSession - " + e.getMessage(), e);
				}
			}
		} catch (FilterException e){
			logFilterException(request, response, e);
		} catch (Throwable e){
			logException(request, response, e);
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		//HibernateUtil.getSessionFactory();
	}

	@Override
	public void destroy() {
		//HibernateUtil.closePool();
	}
	
	private void logException(ServletRequest request, ServletResponse response, Throwable e) throws IOException, ServletException {
        HttpServletRequest r = (HttpServletRequest) request;
        System.err.println("Request.RequestURL=" + r.getRequestURL());
        System.err.println("Request.UserPrincipal=" + r.getUserPrincipal());
                
        Alerta alerta = new Alerta();
        alerta.enviarAlerta("HibernateFilterQuestion", e, "", ServicioHelper.EMAIL);
        alerta = null;
        
        e.printStackTrace();
        throw new ServletException(e.getMessage(), e);
    }
	
	private void logFilterException(ServletRequest request, ServletResponse response, Throwable e) throws IOException, ServletException {		
		 Alerta alerta = new Alerta();
	     alerta.enviarAlerta("HibernateSessionRequestQuestionFilter", e, "", ServicioHelper.EMAIL);
	     alerta = null;
	}
}
