package movilway.service.impl;

import movilway.service.TrasladoService;
import movilway.dao.domain.Traslado;
import movilway.service.util.GenericServiceImpl;

public class TrasladoServiceImpl<T> extends GenericServiceImpl<T> implements TrasladoService<T> {

	private static TrasladoService<Traslado> service;

	private TrasladoServiceImpl(){}
	
	public static final TrasladoService<Traslado> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new TrasladoServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
