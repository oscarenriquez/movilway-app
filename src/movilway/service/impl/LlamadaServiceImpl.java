package movilway.service.impl;

import movilway.service.LlamadaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.Llamada;

public class LlamadaServiceImpl<T> extends GenericServiceImpl<T> implements LlamadaService<T> {

	private static LlamadaService<Llamada> service;

	private LlamadaServiceImpl(){}
	
	public static final LlamadaService<Llamada> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new LlamadaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
