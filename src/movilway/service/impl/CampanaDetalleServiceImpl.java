package movilway.service.impl;

import movilway.dao.CampanaDetalleDao;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.impl.CampanaDetalleDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.CampanaDetalleService;
import movilway.service.util.GenericServiceImpl;

public class CampanaDetalleServiceImpl<T> extends GenericServiceImpl<T> implements CampanaDetalleService<T> {

	private static CampanaDetalleService<CampanaDetalle> service;
	private CampanaDetalleDao<CampanaDetalle> dao;
	
	@SuppressWarnings("unchecked")
	private CampanaDetalleServiceImpl(){
		dao = CampanaDetalleDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final CampanaDetalleService<CampanaDetalle> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new CampanaDetalleServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
