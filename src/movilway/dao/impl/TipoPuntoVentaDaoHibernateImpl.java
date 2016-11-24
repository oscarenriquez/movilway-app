package movilway.dao.impl;

import movilway.dao.TipoPuntoVentaDao;
import movilway.dao.domain.TipoPuntoVenta;
import movilway.dao.util.GenericDaoHibernateApplication;

public class TipoPuntoVentaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements TipoPuntoVentaDao<T> {

	private static TipoPuntoVentaDao<TipoPuntoVenta> dao;

	private TipoPuntoVentaDaoHibernateImpl(){}
	
	public static final TipoPuntoVentaDao<TipoPuntoVenta> getInstance(){				
		if(dao == null) {
			dao = new TipoPuntoVentaDaoHibernateImpl<TipoPuntoVenta>();
		}			
		return dao;
	}
}
