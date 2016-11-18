package movilway.service.impl;

import movilway.service.PoliticaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.Politica;

public class PoliticaServiceImpl<T> extends GenericServiceImpl<T> implements PoliticaService<T> {

	private static PoliticaService<Politica> service;

	private PoliticaServiceImpl(){}
	
	public static final PoliticaService<Politica> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new PoliticaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
