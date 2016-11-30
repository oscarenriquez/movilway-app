package movilway.dao;

import java.util.List;

import movilway.dao.domain.RegionProvincia;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface RegionProvinciaDao<T> extends GenericDao<T> {

	public List<RegionProvincia> getListaRegionProvincia(Long provinciaId) throws InfraestructureException;
	
}
