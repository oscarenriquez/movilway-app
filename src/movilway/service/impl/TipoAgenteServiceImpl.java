package movilway.service.impl;

import movilway.service.TipoAgenteService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.TipoAgenteDao;
import movilway.dao.domain.TipoAgente;
import movilway.dao.impl.TipoAgenteDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class TipoAgenteServiceImpl<T> extends GenericServiceImpl<T> implements TipoAgenteService<T> {

	private static TipoAgenteService<TipoAgente> service;
	private TipoAgenteDao<TipoAgente> dao;
	
	@SuppressWarnings("unchecked")
	private TipoAgenteServiceImpl(){
		dao = TipoAgenteDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final TipoAgenteService<TipoAgente> getInstance(){				
		if(service == null) {
			service = new TipoAgenteServiceImpl<>();
		}				
		return service;
	}
}
