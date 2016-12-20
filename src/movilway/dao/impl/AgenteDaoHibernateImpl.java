package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;

import movilway.dao.AgenteDao;
import movilway.dao.domain.Agente;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class AgenteDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements AgenteDao<T> {

	private static AgenteDao<Agente> dao;
	
	private AgenteDaoHibernateImpl(){}
	
	public static final AgenteDao<Agente> getInstance(){				
		if(dao == null) {
			dao = new AgenteDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public List<Agente> getListAgentes(Long empresaId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from Agente where tipoAgente.empresaId = :empresaId").setLong("empresaId", empresaId).list();
			List<Agente> agentes = new ArrayList<>();
			for(Object obj : list){
				agentes.add((Agente) obj);
			}
			return agentes;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

}
