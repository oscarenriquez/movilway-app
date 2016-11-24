package movilway.service.impl;

import movilway.dao.ProvinciaDao;
import movilway.dao.domain.Provincia;
import movilway.dao.impl.ProvinciaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.ProvinciaService;
import movilway.service.util.GenericServiceImpl;

public class ProvinciaServiceImpl<T> extends GenericServiceImpl<T> implements ProvinciaService<T> {

	private static ProvinciaService<Provincia> service;
	private ProvinciaDao<Provincia> dao;
	
	@SuppressWarnings("unchecked")
	private ProvinciaServiceImpl(){
		dao = ProvinciaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final ProvinciaService<Provincia> getInstance(){				
		if(service == null) {
			service = new ProvinciaServiceImpl<>();
		}			
		return service;
	}
}
