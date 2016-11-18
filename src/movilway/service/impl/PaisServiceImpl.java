package movilway.service.impl;

import movilway.service.PaisService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.Pais;

public class PaisServiceImpl<T> extends GenericServiceImpl<T> implements PaisService<T> {

	private static PaisService<Pais> service;

	private PaisServiceImpl(){}
	
	public static final PaisService<Pais> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new PaisServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
