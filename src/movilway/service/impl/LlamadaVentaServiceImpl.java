package movilway.service.impl;

import movilway.dao.LlamadaVentaDao;
import movilway.dao.domain.LlamadaVenta;
import movilway.dao.impl.LlamadaVentaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.LlamadaVentaService;
import movilway.service.util.GenericServiceImpl;

public class LlamadaVentaServiceImpl<T> extends GenericServiceImpl<T> implements LlamadaVentaService<T> {

	private static LlamadaVentaService<LlamadaVenta> service;
	private LlamadaVentaDao<LlamadaVenta> dao;
	
	@SuppressWarnings("unchecked")
	private LlamadaVentaServiceImpl(){
		dao = LlamadaVentaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final LlamadaVentaService<LlamadaVenta> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new LlamadaVentaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
