package movilway.dao.impl;

import movilway.dao.PuntoVentaDao;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.util.GenericDaoHibernateApplication;

public class PuntoVentaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements PuntoVentaDao<T> {

	private static PuntoVentaDao<PuntoVenta> dao;

	private PuntoVentaDaoHibernateImpl(){}
	
	public static final PuntoVentaDao<PuntoVenta> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new PuntoVentaDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
