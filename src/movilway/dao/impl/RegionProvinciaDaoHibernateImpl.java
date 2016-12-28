package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;

import movilway.dao.RegionProvinciaDao;
import movilway.dao.domain.RegionProvincia;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class RegionProvinciaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements RegionProvinciaDao<T> {

	private static RegionProvinciaDao<RegionProvincia> dao;
	
	private RegionProvinciaDaoHibernateImpl() {}
	
	public static final RegionProvinciaDao<RegionProvincia> getInstance() {
		if(dao == null){
			dao = new RegionProvinciaDaoHibernateImpl<>();
		}
		return dao;
	}
	
	@Override
	public List<RegionProvincia> getListaRegionProvincia(Long provinciaId, String provinciasId) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" from RegionProvincia ");
			if(provinciaId != null && !provinciaId.equals(0L) && provinciaId > 0L){
				sbHql.append(" where provincia.provinciaId = :provinciaId ");
			} else {
				sbHql.append(" where provincia.provinciaId in (").append(provinciasId).append(") "); 
			}
			
			Query query = getSession().createQuery(sbHql.toString());
			if(provinciaId != null && !provinciaId.equals(0L) && provinciaId > 0L){
				query.setLong("estadoId", provinciaId);
			}
			List<?> list = query.list();
			List<RegionProvincia> regiones = new ArrayList<>();
			for(Object obj : list){
				regiones.add((RegionProvincia)obj);
			}
			return regiones;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

}
