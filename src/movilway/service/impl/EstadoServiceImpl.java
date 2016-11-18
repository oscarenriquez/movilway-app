package movilway.service.impl;

import movilway.service.EstadoService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.Estado;


public class EstadoServiceImpl<T> extends GenericServiceImpl<T> implements EstadoService<T> {

	private static EstadoService<Estado> service;

	private EstadoServiceImpl(){}
	
	public static final EstadoService<Estado> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new EstadoServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
