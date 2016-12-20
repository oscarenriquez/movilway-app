package movilway.service;

import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface LlamadaService<T> extends GenericService<T>  {

	public Integer getCorrelativoLlamada(Long detalleId) throws InfraestructureException;
}
