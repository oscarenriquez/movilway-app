package movilway.service;

import java.util.List;

import movilway.dao.domain.Llamada;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface LlamadaService<T> extends GenericService<T>  {

	public Integer getCorrelativoLlamada(Long detalleId) throws InfraestructureException;
	
	public List<Llamada> getLlamadaByDetalle(Long detalleId) throws InfraestructureException;
}
