package movilway.service;

import java.util.List;

import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface PuntoVentaService<T> extends GenericService<T>  {

	public PuntoVenta getPuntoVentaByPuntoventaId(String puntoventaId, Long empresaId) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException;
}
