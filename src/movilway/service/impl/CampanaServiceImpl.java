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
	public List<Map<String, Object>> getInforCampanasByUser(Long userId, String estatus) throws InfraestructureException {
		return dao.getInforCampanasByUser(userId, estatus);
	}

	@Override
	public List<CampanaDetalle> getListaCampanaDetalle(Long campanaId, Integer amount, String estatus) throws InfraestructureException {		
		return dao.getListaCampanaDetalle(campanaId, amount, estatus);
	}
}
