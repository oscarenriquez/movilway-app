package movilway.service.impl;

import movilway.service.ProvinciaService;
import movilway.dao.domain.Provincia;
import movilway.service.util.GenericServiceImpl;

public class ProvinciaServiceServiceImpl<T> extends GenericServiceImpl<T> implements ProvinciaService<T> {

	private static ProvinciaService<Provincia> service;

	private ProvinciaServiceServiceImpl(){}
	
	public static final ProvinciaService<Provincia> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new ProvinciaServiceServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
