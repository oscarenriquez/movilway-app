package movilway.service.impl;

import movilway.service.AgenteService;

import java.util.List;
import java.util.Map;

import movilway.dao.AgenteDao;
import movilway.dao.domain.Agente;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.AgenteDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.util.GenericServiceImpl;

public class AgenteServiceImpl<T> extends GenericServiceImpl<T> implements AgenteService<T> {

	private static AgenteService<Agente> Service;
	private AgenteDao<Agente> dao;
	
	@SuppressWarnings("unchecked")
	private AgenteServiceImpl(){
		dao = AgenteDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final AgenteService<Agente> getInstance(){				
		if(Service == null) {
			Service = new AgenteServiceImpl<>();
		}		
		return Service;
	}

	@Override
	public List<Agente> getListAgentes(Long empresaId) throws InfraestructureException {		
		return dao.getListAgentes(empresaId);
	}

	@Override
	public List<Map<String, Object>> getListAgentesByCampana(Long campanaId, String estatus) throws InfraestructureException {
		return dao.getListAgentesByCampana(campanaId, estatus);
	}

}
