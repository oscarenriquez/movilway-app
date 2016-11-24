package movilway.dao.impl;

import movilway.dao.TrasladoDao;
import movilway.dao.domain.Traslado;
import movilway.dao.util.GenericDaoHibernateApplication;

public class TrasladoDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements TrasladoDao<T> {

	private static TrasladoDao<Traslado> dao;

	private TrasladoDaoHibernateImpl(){}
	
	public static final TrasladoDao<Traslado> getInstance(){				
		if(dao == null) {
			dao = new TrasladoDaoHibernateImpl<>();
		}			
		return dao;
	}
}
