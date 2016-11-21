package movilway.service.impl;

import movilway.dao.TipoPuntoVentaDao;
import movilway.dao.domain.TipoPuntoVenta;
import movilway.dao.impl.TipoPuntoVentaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.TipoPuntoVentaService;
import movilway.service.util.GenericServiceImpl;

public class TipoPuntoVentaServiceImpl<T> extends GenericServiceImpl<T> implements TipoPuntoVentaService<T> {

	private static TipoPuntoVentaService<TipoPuntoVenta> service;
	private TipoPuntoVentaDao<TipoPuntoVenta> dao;
	
	@SuppressWarnings("unchecked")
	private TipoPuntoVentaServiceImpl(){
		dao = TipoPuntoVentaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final TipoPuntoVentaService<TipoPuntoVenta> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new TipoPuntoVentaServiceImpl<TipoPuntoVenta>();
				}
			}
		}		
		return service;
	}
}
