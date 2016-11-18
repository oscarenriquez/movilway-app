package movilway.service.impl;

import movilway.service.TipoPuntoVentaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.TipoPuntoVenta;

public class TipoPuntoVentaServiceImpl<T> extends GenericServiceImpl<T> implements TipoPuntoVentaService<T> {

	private static TipoPuntoVentaService<TipoPuntoVenta> service;

	private TipoPuntoVentaServiceImpl(){}
	
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
