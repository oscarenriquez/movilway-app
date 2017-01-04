package movilway.service;

import java.util.List;

import movilway.dao.domain.LlamadaVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface LlamadaVentaService<T> extends GenericService<T>  {

	public Integer getCorrelativoLlamadaVenta(Long detalleId) throws InfraestructureException;
	
	public List<LlamadaVenta> getLlamadaVentaByDetalle(Long detalleId) throws InfraestructureException;
}
