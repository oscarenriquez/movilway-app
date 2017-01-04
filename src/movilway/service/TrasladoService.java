package movilway.service;

import java.util.Date;
import java.util.List;

import movilway.dao.domain.Traslado;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface TrasladoService<T> extends GenericService<T> {

	public List<Traslado> getTrasladoByLlamada(Date fechaTrasalado, String puntoventaOrigenId, String puntoventaDestinoId) throws InfraestructureException;
}
