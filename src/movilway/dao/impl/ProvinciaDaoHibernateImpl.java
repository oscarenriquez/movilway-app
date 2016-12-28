package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;

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
	public List<Provincia> getListaProvinciasByEstado(Long estadoId, String estadosId) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" from Provincia ");
			if(estadoId != null && !estadoId.equals(0L) && estadoId > 0L){
				sbHql.append(" where estado.estadoId = :estadoId ");
			} else {
				sbHql.append(" where estado.estadoId in (").append(estadosId).append(") "); 
			}
			
			Query query = getSession().createQuery(sbHql.toString());
			if(estadoId != null && !estadoId.equals(0L) && estadoId > 0L){
				query.setLong("estadoId", estadoId);
			}
			List<?> list = query.list();
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
