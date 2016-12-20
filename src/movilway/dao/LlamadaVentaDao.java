package movilway.dao;

import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface LlamadaVentaDao<T> extends GenericDao<T>  {

	public Integer getCorrelativoLlamadaVenta(Long detalleId) throws InfraestructureException;
}
