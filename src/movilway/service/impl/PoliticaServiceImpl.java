package movilway.service.impl;

import movilway.service.PoliticaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.PoliticaDao;
import movilway.dao.domain.Politica;
import movilway.dao.impl.PoliticaDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class PoliticaServiceImpl<T> extends GenericServiceImpl<T> implements PoliticaService<T> {

	private static PoliticaService<Politica> service;
	private PoliticaDao<Politica> dao;
	
	@SuppressWarnings("unchecked")
	private PoliticaServiceImpl(){
		dao = PoliticaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final PoliticaService<Politica> getInstance(){				
		if(service == null) {
			service = new PoliticaServiceImpl<>();
		}			
		return service;
	}
}
