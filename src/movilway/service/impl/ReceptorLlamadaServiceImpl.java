package movilway.service.impl;

import movilway.service.ReceptorLlamadaService;
import movilway.dao.domain.ReceptorLlamada;
import movilway.service.util.GenericServiceImpl;

public class ReceptorLlamadaServiceImpl<T> extends GenericServiceImpl<T> implements ReceptorLlamadaService<T> {

	private static ReceptorLlamadaService<ReceptorLlamada> service;

	private ReceptorLlamadaServiceImpl(){}
	
	public static final ReceptorLlamadaService<ReceptorLlamada> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new ReceptorLlamadaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
