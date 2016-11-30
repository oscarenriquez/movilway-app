package movilway.service;

import java.util.List;

import movilway.dao.domain.RegionProvincia;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface RegionProvinciaService<T> extends GenericService<T>  {

	public List<RegionProvincia> getListaRegionProvincia(Long provinciaId) throws InfraestructureException;
}
