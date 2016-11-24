package movilway.dao.impl;

import movilway.dao.CampanaDetalleDao;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.util.GenericDaoHibernateApplication;

public class CampanaDetalleDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements CampanaDetalleDao<T> {

	private static CampanaDetalleDao<CampanaDetalle> dao;

	private CampanaDetalleDaoHibernateImpl(){}
	
	public static final CampanaDetalleDao<CampanaDetalle> getInstance(){				
		if(dao == null) {
			dao = new CampanaDetalleDaoHibernateImpl<>();
		}			
		return dao;
	}
}
