package movilway.dao.impl;

import movilway.dao.PaisDao;
import movilway.dao.domain.Pais;
import movilway.dao.util.GenericDaoHibernateApplication;

public class PaisDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements PaisDao<T> {

	private static PaisDao<Pais> dao;

	private PaisDaoHibernateImpl(){}
	
	public static final PaisDao<Pais> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new PaisDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
