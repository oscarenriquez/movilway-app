package movilway.dao.impl;

import movilway.dao.AgenteDao;
import movilway.dao.domain.Agente;
import movilway.dao.util.GenericDaoHibernateApplication;

public class AgenteDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements AgenteDao<T> {

	private static AgenteDao<Agente> dao;
	
	private AgenteDaoHibernateImpl(){}
	
	public static final AgenteDao<Agente> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new AgenteDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}

}
