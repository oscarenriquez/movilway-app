package movilway.dao.impl;

import movilway.dao.RespuestaLlamadaDao;
import movilway.dao.domain.RespuestaLlamada;
import movilway.dao.util.GenericDaoHibernateApplication;

public class RespuestaLlamadaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements RespuestaLlamadaDao<T> {

	private static RespuestaLlamadaDao<RespuestaLlamada> dao;

	private RespuestaLlamadaDaoHibernateImpl(){}
	
	public static final RespuestaLlamadaDao<RespuestaLlamada> getInstance(){		
		if(dao == null) {
			synchronized (dao) {
				if(dao == null) {
					dao = new RespuestaLlamadaDaoHibernateImpl<>();
				}
			}
		}		
		return dao;
	}
}
