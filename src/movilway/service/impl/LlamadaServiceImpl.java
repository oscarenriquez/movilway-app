package movilway.service.impl;

import movilway.service.LlamadaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.LlamadaDao;
import movilway.dao.domain.Llamada;
import movilway.dao.impl.LlamadaDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class LlamadaServiceImpl<T> extends GenericServiceImpl<T> implements LlamadaService<T> {

	private static LlamadaService<Llamada> service;
	private LlamadaDao<Llamada> dao;
	
	@SuppressWarnings("unchecked")
	private LlamadaServiceImpl(){
		dao = LlamadaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final LlamadaService<Llamada> getInstance(){				
		if(service == null) {
			service = new LlamadaServiceImpl<>();
		}				
		return service;
	}
}
