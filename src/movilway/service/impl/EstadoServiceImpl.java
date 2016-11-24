package movilway.service.impl;

import movilway.service.EstadoService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.EstadoDao;
import movilway.dao.domain.Estado;
import movilway.dao.impl.EstadoDaoHibernateImpl;
import movilway.dao.util.GenericDao;


public class EstadoServiceImpl<T> extends GenericServiceImpl<T> implements EstadoService<T> {

	private static EstadoService<Estado> service;
	private EstadoDao<Estado> dao;
	
	@SuppressWarnings("unchecked")
	private EstadoServiceImpl(){
		dao = EstadoDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final EstadoService<Estado> getInstance(){				
		if(service == null) {
			service = new EstadoServiceImpl<>();
		}			
		return service;
	}
}
