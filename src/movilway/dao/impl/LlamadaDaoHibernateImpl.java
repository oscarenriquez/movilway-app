package movilway.dao.impl;

import movilway.dao.LlamadaDao;
import movilway.dao.domain.Llamada;
import movilway.dao.util.GenericDaoHibernateApplication;

public class LlamadaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements LlamadaDao<T> {

	private static LlamadaDao<Llamada> dao;

	private LlamadaDaoHibernateImpl(){}
	
	public static final LlamadaDao<Llamada> getInstance(){				
		if(dao == null) {
			dao = new LlamadaDaoHibernateImpl<>();
		}			
		return dao;
	}
}
