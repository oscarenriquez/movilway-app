package movilway.dao.impl;

import movilway.dao.TipoAgenteDao;
import movilway.dao.domain.TipoAgente;
import movilway.dao.util.GenericDaoHibernateApplication;

public class TipoAgenteDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements TipoAgenteDao<T> {

	private static TipoAgenteDao<TipoAgente> dao;

	private TipoAgenteDaoHibernateImpl(){}
	
	public static final TipoAgenteDao<TipoAgente> getInstance(){				
		if(dao == null) {
			dao = new TipoAgenteDaoHibernateImpl<>();
		}			
		return dao;
	}
}
