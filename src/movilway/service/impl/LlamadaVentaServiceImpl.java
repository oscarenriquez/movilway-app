package movilway.service.impl;

import movilway.service.LlamadaVentaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.LlamadaVenta;

public class LlamadaVentaServiceImpl<T> extends GenericServiceImpl<T> implements LlamadaVentaService<T> {

	private static LlamadaVentaService<LlamadaVenta> service;

	private LlamadaVentaServiceImpl(){}
	
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
