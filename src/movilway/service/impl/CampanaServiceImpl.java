package movilway.service.impl;

import movilway.service.CampanaService;
import movilway.service.util.GenericServiceImpl;

import java.util.List;
import java.util.Map;

import movilway.dao.CampanaDao;
import movilway.dao.domain.Campana;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.CampanaDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class CampanaServiceImpl<T> extends GenericServiceImpl<T> implements CampanaService<T> {

	private static CampanaService<Campana> service;
	private CampanaDao<Campana> dao;
	
	@SuppressWarnings("unchecked")
	private CampanaServiceImpl(){
		dao = CampanaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final CampanaService<Campana> getInstance(){				
		if(service == null) {
			service = new CampanaServiceImpl<>();
		}			
		return service;
	}
	
	@Override
	public Campana getCampanaActiva(Long empresaId, String estatus) throws InfraestructureException {		
		return dao.getCampanaActiva(empresaId, estatus);
	}

	@Override
	public Campana getCampanaAbastecimientoActiva(Long empresaId, String estatus, Long tipocampanaId) throws InfraestructureException {
		return dao.getCampanaAbastecimientoActiva(empresaId, estatus, tipocampanaId);
	}
	
	@Override
	public List<Map<String, Object>> getInforCampanasByUser(Long userId, String estatus) throws InfraestructureException {
		return dao.getInforCampanasByUser(userId, estatus);
	}

	@Override
	public List<CampanaDetalle> getListaCampanaDetalle(Long campanaId, Integer amount, String estatus, String dateSubstract) throws InfraestructureException {		
		return dao.getListaCampanaDetalle(campanaId, amount, estatus, dateSubstract);
	}

	@Override
	public List<Campana> getListaCampanas(Long empresaId) throws InfraestructureException {		
		return dao.getListaCampanas(empresaId);
	}
}
