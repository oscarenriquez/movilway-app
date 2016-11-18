package movilway.dao.impl;

import movilway.dao.CampanaDao;
import movilway.dao.domain.Campana;
import movilway.dao.util.GenericDaoHibernateApplication;

public class CampanaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements CampanaDao<T> {

	private static CampanaDao<Campana> dao;

	private CampanaDaoHibernateImpl(){}
	
	public static final CampanaDao<Campana> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new CampanaDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
