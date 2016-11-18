package movilway.dao.impl;

import movilway.dao.PoliticaDao;
import movilway.dao.domain.Politica;
import movilway.dao.util.GenericDaoHibernateApplication;

public class PoliticaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements PoliticaDao<T> {

	private static PoliticaDao<Politica> dao;

	private PoliticaDaoHibernateImpl(){}
	
	public static final PoliticaDao<Politica> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new PoliticaDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
