package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;

import movilway.dao.PuntoVentaDao;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class PuntoVentaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements PuntoVentaDao<T> {

	private static PuntoVentaDao<PuntoVenta> dao;

	private PuntoVentaDaoHibernateImpl(){}
	
	public static final PuntoVentaDao<PuntoVenta> getInstance(){				
		if(dao == null) {
			dao = new PuntoVentaDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from PuntoVenta where pais.paisId = :paisId and estado.estadoId = :estadoId and provincia.provinciaId = :provinciaId ")
					.setLong("paisId", paisId)
					.setLong("estadoId", estadoId)
					.setLong("provinciaId", provinciaId)
					.list();
			List<PuntoVenta> puntosVenta = new ArrayList<>();
			for(Object obj : list){
				puntosVenta.add((PuntoVenta)obj);
			}
			return puntosVenta;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}
}
