package movilway.dao.impl;

import movilway.dao.EstadoDao;
import movilway.dao.domain.Estado;
import movilway.dao.util.GenericDaoHibernateApplication;

public class EstadoDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements EstadoDao<T> {

	private static EstadoDao<Estado> dao;

	private EstadoDaoHibernateImpl(){}
	
	public static final EstadoDao<Estado> getInstance(){				
		if(dao == null) {
			dao = new EstadoDaoHibernateImpl<>();
		}				
		return dao;
	}
}
