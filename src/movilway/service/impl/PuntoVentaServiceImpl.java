package movilway.service.impl;

import movilway.service.PuntoVentaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.PuntoVenta;

public class PuntoVentaServiceImpl<T> extends GenericServiceImpl<T> implements PuntoVentaService<T> {

	private static PuntoVentaService<PuntoVenta> service;

	private PuntoVentaServiceImpl(){}
	
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
