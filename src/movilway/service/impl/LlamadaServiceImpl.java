package movilway.service.impl;

import movilway.service.LlamadaService;
import movilway.service.util.GenericServiceImpl;

import java.util.List;

import movilway.dao.LlamadaDao;
import movilway.dao.domain.Llamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.LlamadaDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class LlamadaServiceImpl<T> extends GenericServiceImpl<T> implements LlamadaService<T> {

	private static LlamadaService<Llamada> service;
	private LlamadaDao<Llamada> dao;
	
	@SuppressWarnings("unchecked")
	private LlamadaServiceImpl(){
		dao = LlamadaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final LlamadaService<Llamada> getInstance(){				
		if(service == null) {
			service = new LlamadaServiceImpl<>();
		}				
		return service;
	}

	@Override
	public Integer getCorrelativoLlamada(Long detalleId) throws InfraestructureException {		
		return dao.getCorrelativoLlamada(detalleId);
	}

	@Override
	public List<Llamada> getLlamadaByDetalle(Long detalleId) throws InfraestructureException {		
		return dao.getLlamadaByDetalle(detalleId);
	}
}
