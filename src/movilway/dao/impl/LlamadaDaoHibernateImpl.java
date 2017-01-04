package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;

import movilway.dao.LlamadaDao;
import movilway.dao.domain.Llamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class LlamadaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements LlamadaDao<T> {

	private static LlamadaDao<Llamada> dao;

	private LlamadaDaoHibernateImpl(){}
	
	public static final LlamadaDao<Llamada> getInstance(){				
		if(dao == null) {
			dao = new LlamadaDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public Integer getCorrelativoLlamada(Long detalleId) throws InfraestructureException {
		try {
			return (Integer) getSession().createSQLQuery("select ifnull(max(l.corr_llamada), 0) as Correlativo from llamada as l where l.detalle_id = :detalleId ")
							.addScalar("Correlativo", StandardBasicTypes.INTEGER)
							.setLong("detalleId", detalleId)					
							.uniqueResult();
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	@Override
	public List<Llamada> getLlamadaByDetalle(Long detalleId) throws InfraestructureException {
		try {
			List<?> list = getSession().createCriteria(Llamada.class).createCriteria("id").add(Restrictions.eq("detalleId", detalleId)).addOrder(Order.desc("corrLlamada")).list();
			List<Llamada> llamadas = new ArrayList<>();
			
			for(Object obj : list) {
				llamadas.add((Llamada) obj);
			}
			
			return llamadas;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
