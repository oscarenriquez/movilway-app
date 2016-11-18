package movilway.service.impl;

import movilway.service.CampanaDetalleService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.CampanaDetalle;

public class CampanaDetalleServiceImpl<T> extends GenericServiceImpl<T> implements CampanaDetalleService<T> {

	private static CampanaDetalleService<CampanaDetalle> service;

	private CampanaDetalleServiceImpl(){}
	
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
