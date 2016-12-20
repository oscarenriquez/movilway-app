package movilway.service.impl;

import java.util.List;

import movilway.dao.PuntoVentaDao;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
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
			service = new PuntoVentaServiceImpl<>();
		}			
		return service;
	}

	@Override
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(Long paisId, Long estadoId, Long provinciaId)	throws InfraestructureException {
		return dao.getListaPuntosVentaByPaisEstadoRegion(paisId, estadoId, provinciaId);
	}

	@Override
	public PuntoVenta getPuntoVentaByPuntoventaId(String puntoventaId, Long empresaId) throws InfraestructureException {		
		return dao.getPuntoVentaByPuntoventaId(puntoventaId, empresaId);
	}
}
