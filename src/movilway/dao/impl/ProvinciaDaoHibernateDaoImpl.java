package movilway.dao.impl;

import movilway.dao.ProvinciaDao;
import movilway.dao.domain.Provincia;
import movilway.dao.util.GenericDaoHibernateApplication;

public class ProvinciaDaoHibernateDaoImpl<T> extends GenericDaoHibernateApplication<T> implements ProvinciaDao<T> {

	private static ProvinciaDao<Provincia> dao;

	private ProvinciaDaoHibernateDaoImpl(){}
	
	public static final ProvinciaDao<Provincia> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new ProvinciaDaoHibernateDaoImpl<>();
				}
			}
		}		
		return dao;
	}
}
