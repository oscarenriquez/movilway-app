package movilway.service.impl;

import movilway.service.ReceptorLlamadaService;
import movilway.dao.ReceptorLlamadaDao;
import movilway.dao.domain.ReceptorLlamada;
import movilway.dao.impl.ReceptorLlamadaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.util.GenericServiceImpl;

public class ReceptorLlamadaServiceImpl<T> extends GenericServiceImpl<T> implements ReceptorLlamadaService<T> {

	private static ReceptorLlamadaService<ReceptorLlamada> service;
	private ReceptorLlamadaDao<ReceptorLlamada> dao;
	
	@SuppressWarnings("unchecked")
	private ReceptorLlamadaServiceImpl(){
		dao = ReceptorLlamadaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final ReceptorLlamadaService<ReceptorLlamada> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new ReceptorLlamadaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
