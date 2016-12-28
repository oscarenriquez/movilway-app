package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.criterion.Restrictions;

import movilway.dao.CampanaDetalleDao;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class CampanaDetalleDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements CampanaDetalleDao<T> {

	private static CampanaDetalleDao<CampanaDetalle> dao;

	private CampanaDetalleDaoHibernateImpl(){}
	
	public static final CampanaDetalleDao<CampanaDetalle> getInstance(){				
		if(dao == null) {
			dao = new CampanaDetalleDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public List<CampanaDetalle> getListaCampanaDetalleByAgente(Long agenteId, String estatus) throws InfraestructureException {
		try {
			List<?> list = getSession()
					.createCriteria(CampanaDetalle.class)
					.add(Restrictions.eq("estatus", estatus))
					.createCriteria("agente")
					.add(Restrictions.eq("agenteId", agenteId))					
					.list();
			
			List<CampanaDetalle> listaDetalles = new ArrayList<>();
			
			for(Object obj : list) {
				listaDetalles.add((CampanaDetalle) obj);
			}
			
			return listaDetalles;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
