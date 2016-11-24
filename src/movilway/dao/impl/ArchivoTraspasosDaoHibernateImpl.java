package movilway.dao.impl;

import movilway.dao.ArchivoTraspasosDao;
import movilway.dao.domain.ArchivoTraspasos;
import movilway.dao.util.GenericDaoHibernateApplication;

public class ArchivoTraspasosDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements ArchivoTraspasosDao<T> {
	
	private static ArchivoTraspasosDao<ArchivoTraspasos> dao;

	private ArchivoTraspasosDaoHibernateImpl(){}
	
	public static final ArchivoTraspasosDao<ArchivoTraspasos> getInstance(){				
		if(dao == null) {
			dao = new ArchivoTraspasosDaoHibernateImpl<>();
		}			
		return dao;
	}
}
