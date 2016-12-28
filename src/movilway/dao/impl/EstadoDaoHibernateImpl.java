package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;

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
	public List<Estado> getListaEstadosByPais(Long paisId, String paisesId) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" from Estado ");
			if(paisId != null && !paisId.equals(0L) && paisId > 0L){
				sbHql.append(" where pais.paisId = :paisId ");
			} else {
				sbHql.append(" where pais.paisId in (").append(paisesId).append(") "); 
			}
			
			Query query = getSession().createQuery(sbHql.toString());
			if(paisId != null && !paisId.equals(0L) && paisId > 0L){
				query.setLong("paisId", paisId);
			}
			List<?> list = query.list();
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
