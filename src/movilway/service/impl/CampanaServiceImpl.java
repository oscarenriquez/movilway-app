package movilway.service.impl;

import movilway.service.CampanaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.Campana;

public class CampanaServiceImpl<T> extends GenericServiceImpl<T> implements CampanaService<T> {

	private static CampanaService<Campana> service;

	private CampanaServiceImpl(){}
	
	public static final CampanaService<Campana> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new CampanaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
