package movilway.service.impl;

import movilway.dao.TipoCampanaDao;
import movilway.dao.domain.TipoCampana;
import movilway.dao.impl.TipoCampanaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.TipoCampanaService;
import movilway.service.util.GenericServiceImpl;

public class TipoCampanaServiceImpl<T> extends GenericServiceImpl<T> implements TipoCampanaService<T> {

	private static TipoCampanaService<TipoCampana> service;
	private TipoCampanaDao<TipoCampana> dao;
	
	@SuppressWarnings("unchecked")
	private TipoCampanaServiceImpl(){
		dao = TipoCampanaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final TipoCampanaService<TipoCampana> getInstance(){				
		if(service == null) {
			service = new TipoCampanaServiceImpl<TipoCampana>();
		}		
		return service;
	}
}
