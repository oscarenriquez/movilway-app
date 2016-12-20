package movilway.dao;

import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface LlamadaDao<T> extends GenericDao<T>  {

	public Integer getCorrelativoLlamada(Long detalleId) throws InfraestructureException;
}
