package movilway.dao.impl;

import org.hibernate.HibernateException;

import movilway.dao.TipoCampanaDao;
import movilway.dao.domain.TipoCampana;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class TipoCampanaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements TipoCampanaDao<T> {

	private static TipoCampanaDao<TipoCampana> dao;

	private TipoCampanaDaoHibernateImpl(){}
	
	public static final TipoCampanaDao<TipoCampana> getInstance(){			
		if(dao == null) {
			dao = new TipoCampanaDaoHibernateImpl<TipoCampana>();
		}				
		return dao;
	}

	@Override
	public TipoCampana getTipoCampanaAbastecimiento(Long empresaId, String descripcion)	throws InfraestructureException {
		try {
			return (TipoCampana) getSession()
					.createQuery("from TipoCampana where empresaId = :empresaId and upper(descripcion) like :descripcion and estatus = true ")
					.setLong("empresaId", empresaId)
					.setString("descripcion", "%"+descripcion.toUpperCase().trim()+"%")
					.setMaxResults(1)
					.uniqueResult();
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
