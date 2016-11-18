package movilway.dao.impl;

import movilway.dao.TipoCampanaDao;
import movilway.dao.domain.TipoCampana;
import movilway.dao.util.GenericDaoHibernateApplication;

public class TipoCampanaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements TipoCampanaDao<T> {

	private static TipoCampanaDao<TipoCampana> dao;

	private TipoCampanaDaoHibernateImpl(){}
	
	public static final TipoCampanaDao<TipoCampana> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new TipoCampanaDaoHibernateImpl<TipoCampana>();
				}
			}
		}		
		return dao;
	}
}
