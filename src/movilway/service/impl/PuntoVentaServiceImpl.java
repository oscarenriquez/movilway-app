package movilway.service.impl;

import movilway.dao.PuntoVentaDao;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.impl.PuntoVentaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.PuntoVentaService;
import movilway.service.util.GenericServiceImpl;

public class PuntoVentaServiceImpl<T> extends GenericServiceImpl<T> implements PuntoVentaService<T> {

	private static PuntoVentaService<PuntoVenta> service;
	private PuntoVentaDao<PuntoVenta> dao;
	
	@SuppressWarnings("unchecked")
	private PuntoVentaServiceImpl(){
		dao = PuntoVentaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final PuntoVentaService<PuntoVenta> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new PuntoVentaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
