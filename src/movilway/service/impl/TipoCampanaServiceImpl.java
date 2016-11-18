package movilway.service.impl;

import movilway.service.TipoCampanaService;
import movilway.dao.domain.TipoCampana;
import movilway.service.util.GenericServiceImpl;

public class TipoCampanaServiceImpl<T> extends GenericServiceImpl<T> implements TipoCampanaService<T> {

	private static TipoCampanaService<TipoCampana> service;

	private TipoCampanaServiceImpl(){}
	
	public static final TipoCampanaService<TipoCampana> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new TipoCampanaServiceImpl<TipoCampana>();
				}
			}
		}		
		return service;
	}
}
