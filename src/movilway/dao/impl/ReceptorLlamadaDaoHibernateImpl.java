package movilway.dao.impl;

import movilway.dao.ReceptorLlamadaDao;
import movilway.dao.domain.ReceptorLlamada;
import movilway.dao.util.GenericDaoHibernateApplication;

public class ReceptorLlamadaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements ReceptorLlamadaDao<T> {

	private static ReceptorLlamadaDao<ReceptorLlamada> dao;

	private ReceptorLlamadaDaoHibernateImpl(){}
	
	public static final ReceptorLlamadaDao<ReceptorLlamada> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new ReceptorLlamadaDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
