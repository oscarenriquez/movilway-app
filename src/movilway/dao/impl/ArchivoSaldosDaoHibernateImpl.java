package movilway.dao.impl;

import movilway.dao.ArchivoSaldosDao;
import movilway.dao.domain.ArchivoSaldos;
import movilway.dao.util.GenericDaoHibernateApplication;

public class ArchivoSaldosDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements ArchivoSaldosDao<T> {	

	private static ArchivoSaldosDao<ArchivoSaldos> dao;
	
	private ArchivoSaldosDaoHibernateImpl(){}
	
	public static final ArchivoSaldosDao<ArchivoSaldos> getInstance(){				
		if(dao == null) {
			dao = new ArchivoSaldosDaoHibernateImpl<>();
		}			
		return dao;
	}
}
