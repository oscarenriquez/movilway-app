package movilway.dao;

import java.util.List;

import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface PuntoVentaDao<T> extends GenericDao<T>  {

	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException;
}
