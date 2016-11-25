package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;

import movilway.dao.EstadoDao;
import movilway.dao.domain.Estado;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class EstadoDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements EstadoDao<T> {

	private static EstadoDao<Estado> dao;

	private EstadoDaoHibernateImpl(){}
	
	public static final EstadoDao<Estado> getInstance(){				
		if(dao == null) {
			dao = new EstadoDaoHibernateImpl<>();
		}				
		return dao;
	}

	@Override
	public List<Estado> getListaEstadosByPais(Long paisId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from Estado where pais.paisId = :paisId").setLong("paisId", paisId).list();
			List<Estado> estados = new ArrayList<>();
			for(Object obj : list){
				estados.add((Estado)obj);
			}
			return estados;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}
}
