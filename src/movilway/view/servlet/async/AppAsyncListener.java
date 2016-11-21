package movilway.view.servlet.async;

import java.io.IOException;

import javax.servlet.AsyncEvent;
import javax.servlet.AsyncListener;
import javax.servlet.http.HttpServletRequest;

import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import movilway.view.helper.ServicioHelper;

public class AppAsyncListener implements AsyncListener  {

	public static enum STATE {complete, error, start, timeout};
	private STATE state;
	
	@Override
	public void onComplete(AsyncEvent asyncEvent) throws IOException {
		state = STATE.complete;			
	}

	@Override
	public void onError(AsyncEvent asyncEvent) throws IOException {
		state = STATE.error;
		HttpServletRequest request = (HttpServletRequest) asyncEvent.getAsyncContext().getRequest();
		String keys = request.getParameter("key") != null ? request.getParameter("key") : "0";
		System.out.println(ServicioHelper.getUrlApp((HttpServletRequest)asyncEvent.getAsyncContext().getRequest())+" | AppAsyncListener-movilway onError  | Keys "+keys);		
		try {
			HibernateUtil.rollbackTransaction();
		} catch (InfraestructureException e1) {
			e1.printStackTrace();

		}
	}

	@Override
	public void onStartAsync(AsyncEvent asyncEvent) throws IOException {
		state = STATE.start;
		System.out.println(ServicioHelper.getUrlApp((HttpServletRequest)asyncEvent.getAsyncContext().getRequest())+" | AppAsyncListener-movilway onStartAsync");
	}

	@Override
	public void onTimeout(AsyncEvent asyncEvent) throws IOException {
		state = STATE.timeout;
		HttpServletRequest request = (HttpServletRequest) asyncEvent.getAsyncContext().getRequest();
		String keys = request.getParameter("key") != null ? request.getParameter("key") : "0";
		System.out.println(ServicioHelper.getUrlApp((HttpServletRequest)asyncEvent.getAsyncContext().getRequest())+" | AppAsyncListener-movilway onTimeout | Keys "+keys);
		try {
			HibernateUtil.rollbackTransaction();
		} catch (InfraestructureException e1) {
			e1.printStackTrace();
		}
	}
	
	public STATE getState(){		
		return state;
	}

}