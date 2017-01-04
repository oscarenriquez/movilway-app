package movilway.service.impl;

import java.util.Date;
import java.util.List;

import movilway.dao.TrasladoDao;
import movilway.dao.domain.Traslado;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.TrasladoDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.TrasladoService;
import movilway.service.util.GenericServiceImpl;

public class TrasladoServiceImpl<T> extends GenericServiceImpl<T> implements TrasladoService<T> {

	private static TrasladoService<Traslado> service;
	private TrasladoDao<Traslado> dao;

	@SuppressWarnings("unchecked")
	private TrasladoServiceImpl() {
		dao = TrasladoDaoHibernateImpl.getInstance();
		genericDao = (GenericDao<T>) dao;
	}

	public static final TrasladoService<Traslado> getInstance() {
		if (service == null) {
			service = new TrasladoServiceImpl<>();
		}
		return service;
	}

	@Override
	public List<Traslado> getTrasladoByLlamada(Date fechaTrasalado, String puntoventaOrigenId, String puntoventaDestinoId) throws InfraestructureException {
		return dao.getTrasladoByLlamada(fechaTrasalado, puntoventaOrigenId, puntoventaDestinoId);
	}
}
