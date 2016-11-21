package movilway.service.impl;

import movilway.service.RespuestaLlamadaService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.RespuestaLlamadaDao;
import movilway.dao.domain.RespuestaLlamada;
import movilway.dao.impl.RespuestaLlamadaDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class RespuestaLlamadaServiceImpl<T> extends GenericServiceImpl<T> implements RespuestaLlamadaService<T> {

	private static RespuestaLlamadaService<RespuestaLlamada> service;
	private RespuestaLlamadaDao<RespuestaLlamada> dao;
	
	@SuppressWarnings("unchecked")
	private RespuestaLlamadaServiceImpl(){
		dao = RespuestaLlamadaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
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
