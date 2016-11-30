package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;

import movilway.dao.ProvinciaDao;
import movilway.dao.domain.Provincia;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class ProvinciaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements ProvinciaDao<T> {

	private static ProvinciaDao<Provincia> dao;

	private ProvinciaDaoHibernateImpl(){}
	
	public static final ProvinciaDao<Provincia> getInstance(){				
		if(dao == null) {
			dao = new ProvinciaDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public List<Provincia> getListaProvinciasByEstado(Long estadoId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from Provincia where estado.estadoId = :estadoId").setLong("estadoId", estadoId).list();
			List<Provincia> provincias = new ArrayList<>();
			for(Object obj : list){
				provincias.add((Provincia)obj);
			}
			return provincias;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}
	
}
