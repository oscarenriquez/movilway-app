package movilway.dao;

import java.util.List;

import movilway.dao.domain.LlamadaVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface LlamadaVentaDao<T> extends GenericDao<T>  {

	public Integer getCorrelativoLlamadaVenta(Long detalleId) throws InfraestructureException;
	
	public List<LlamadaVenta> getLlamadaVentaByDetalle(Long detalleId) throws InfraestructureException;
}
