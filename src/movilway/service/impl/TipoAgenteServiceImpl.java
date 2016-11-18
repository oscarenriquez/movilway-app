package movilway.service.impl;

import movilway.service.TipoAgenteService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.TipoAgente;

public class TipoAgenteServiceImpl<T> extends GenericServiceImpl<T> implements TipoAgenteService<T> {

	private static TipoAgenteService<TipoAgente> service;

	private TipoAgenteServiceImpl(){}
	
	public static final TipoAgenteService<TipoAgente> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new TipoAgenteServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
