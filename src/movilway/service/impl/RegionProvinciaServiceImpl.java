package movilway.service.impl;

import java.util.List;

import movilway.dao.RegionProvinciaDao;
import movilway.dao.domain.RegionProvincia;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.RegionProvinciaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.RegionProvinciaService;
import movilway.service.util.GenericServiceImpl;

public class RegionProvinciaServiceImpl<T> extends GenericServiceImpl<T> implements RegionProvinciaService<T>  {

	private static RegionProvinciaService<RegionProvincia> service;
	private RegionProvinciaDao<RegionProvincia> dao;
	
	@SuppressWarnings("unchecked")
	private RegionProvinciaServiceImpl(){
		dao = RegionProvinciaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final RegionProvinciaService<RegionProvincia> getInstance(){				
		if(service == null) {
			service = new RegionProvinciaServiceImpl<>();
		}		
		return service;
	}
	
	@Override
	public List<RegionProvincia> getListaRegionProvincia(Long provinciaId) throws InfraestructureException {		
		return dao.getListaRegionProvincia(provinciaId);
	}

}
