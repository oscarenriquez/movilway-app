package movilway.service.impl;

import movilway.service.CampanaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.CampanaDao;
import movilway.dao.domain.Campana;
import movilway.dao.impl.CampanaDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class CampanaServiceImpl<T> extends GenericServiceImpl<T> implements CampanaService<T> {

	private static CampanaService<Campana> service;
	private CampanaDao<Campana> dao;
	
	@SuppressWarnings("unchecked")
	private CampanaServiceImpl(){
		dao = CampanaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
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
