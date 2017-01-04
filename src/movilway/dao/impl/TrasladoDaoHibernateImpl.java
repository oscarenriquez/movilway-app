package movilway.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.criterion.Order;

import static org.hibernate.criterion.Restrictions.eq;
import static org.hibernate.criterion.Restrictions.ge;

import movilway.dao.TrasladoDao;
import movilway.dao.domain.Traslado;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class TrasladoDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements TrasladoDao<T> {

	private static TrasladoDao<Traslado> dao;

	private TrasladoDaoHibernateImpl() {
	}

	public static final TrasladoDao<Traslado> getInstance() {
		if (dao == null) {
			dao = new TrasladoDaoHibernateImpl<>();
		}
		return dao;
	}

	@Override
	public List<Traslado> getTrasladoByLlamada(Date fechaTraslado, String puntoventaOrigenId, String puntoventaDestinoId) throws InfraestructureException {
		try {
			List<?> list = getSession().createCriteria(Traslado.class)
					.add(ge("fechahora", fechaTraslado)) // QUE LA FECHA DEL TRASLADO SEA MAYOR O IGUAL A LA DE LA LLAMADA
					.add(eq("puntoOrigenId", puntoventaOrigenId)) // QUE EL PUNTO DE ORIGEN SEA EL MISMO QUE DE LA LLAMADA
					.add(eq("puntoDestinoId", puntoventaDestinoId))// QUE EL PUNTO DE DESTINO SEA EL MISMO QUE LA LLAMDA
					.addOrder(Order.desc("fechahora")) // ORDENADO DESDE EL MAS RECIENTE
					.list();
			
			List<Traslado> traslado = new ArrayList<>();
			
			for(Object obj : list) {
				traslado.add((Traslado) obj);
			}
			
			return traslado;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
