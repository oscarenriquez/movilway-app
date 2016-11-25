package movilway.service;

import java.util.List;

import movilway.dao.domain.Estado;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface EstadoService<T> extends GenericService<T> {

	public List<Estado> getListaEstadosByPais(Long paisId) throws InfraestructureException;
}
