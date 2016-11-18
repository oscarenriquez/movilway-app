package movilway.service.impl;

import movilway.service.RespuestaLlamadaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.domain.RespuestaLlamada;

public class RespuestaLlamadaServiceImpl<T> extends GenericServiceImpl<T> implements RespuestaLlamadaService<T> {

	private static RespuestaLlamadaService<RespuestaLlamada> service;

	private RespuestaLlamadaServiceImpl(){}
	
	public static final RespuestaLlamadaService<RespuestaLlamada> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new RespuestaLlamadaServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
