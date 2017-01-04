package movilway.dao;

import java.util.Date;
import java.util.List;

import movilway.dao.domain.Traslado;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface TrasladoDao<T> extends GenericDao<T> {

	public List<Traslado> getTrasladoByLlamada(Date fechaTrasalado, String puntoventaOrigenId, String puntoventaDestinoId) throws InfraestructureException;
}
