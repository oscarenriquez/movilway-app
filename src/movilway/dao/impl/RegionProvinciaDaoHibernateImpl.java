package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;

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
	public List<RegionProvincia> getListaRegionProvincia(Long provinciaId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from RegionProvincia where provincia.provinciaId = :provinciaId").setLong("provinciaId", provinciaId).list();
			List<RegionProvincia> provincias = new ArrayList<>();
			for(Object obj : list){
				provincias.add((RegionProvincia)obj);
			}
			return provincias;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

}
