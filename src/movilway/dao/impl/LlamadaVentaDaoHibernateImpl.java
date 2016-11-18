package movilway.dao.impl;

import movilway.dao.LlamadaVentaDao;
import movilway.dao.domain.LlamadaVenta;
import movilway.dao.util.GenericDaoHibernateApplication;

public class LlamadaVentaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements LlamadaVentaDao<T> {

	private static LlamadaVentaDao<LlamadaVenta> dao;

	private LlamadaVentaDaoHibernateImpl(){}
	
	public static final LlamadaVentaDao<LlamadaVenta> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new LlamadaVentaDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
