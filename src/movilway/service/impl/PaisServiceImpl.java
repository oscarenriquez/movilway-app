package movilway.service.impl;

import movilway.service.PaisService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.PaisDao;
import movilway.dao.domain.Pais;
import movilway.dao.impl.PaisDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class PaisServiceImpl<T> extends GenericServiceImpl<T> implements PaisService<T> {

	private static PaisService<Pais> service;
	private PaisDao<Pais> dao;
	
	@SuppressWarnings("unchecked")
	private PaisServiceImpl(){
		dao = PaisDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final PaisService<Pais> getInstance(){				
		if(service == null) {
			service = new PaisServiceImpl<>();
		}				
		return service;
	}
}
