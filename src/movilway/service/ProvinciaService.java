package movilway.service;

import java.util.List;

import movilway.dao.domain.Provincia;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface ProvinciaService<T> extends GenericService<T>  {

	public List<Provincia> getListaProvinciasByEstado(Long estadoId) throws InfraestructureException;
	
}
