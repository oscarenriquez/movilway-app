package movilway.dao;

import java.util.List;

import movilway.dao.domain.Llamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface LlamadaDao<T> extends GenericDao<T>  {

	public Integer getCorrelativoLlamada(Long detalleId) throws InfraestructureException;
	
	public List<Llamada> getLlamadaByDetalle(Long detalleId) throws InfraestructureException;
}
