package movilway.dao.impl;

import org.hibernate.HibernateException;
import org.hibernate.type.StandardBasicTypes;

import movilway.dao.LlamadaVentaDao;
import movilway.dao.domain.LlamadaVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class LlamadaVentaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements LlamadaVentaDao<T> {

	private static LlamadaVentaDao<LlamadaVenta> dao;

	private LlamadaVentaDaoHibernateImpl(){}
	
	public static final LlamadaVentaDao<LlamadaVenta> getInstance(){				
		if(dao == null) {
			dao = new LlamadaVentaDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public Integer getCorrelativoLlamadaVenta(Long detalleId) throws InfraestructureException {
		try {
			return (Integer) getSession().createSQLQuery("select ifnull(max(l.corr_llamada), 0) as Correlativo from llamada_venta as l where l.detalle_id = :detalleId ")
								.addScalar("Correlativo", StandardBasicTypes.INTEGER)
								.setLong("detalleId", detalleId)
								.uniqueResult();
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
