package movilway.service;

import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface LlamadaVentaService<T> extends GenericService<T>  {

	public Integer getCorrelativoLlamadaVenta(Long detalleId) throws InfraestructureException;
}
