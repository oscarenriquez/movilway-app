package movilway.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;

import movilway.dao.PoliticaDao;
import movilway.dao.domain.Politica;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class PoliticaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements PoliticaDao<T> {

	private static PoliticaDao<Politica> dao;

	private PoliticaDaoHibernateImpl() {
	}

	public static final PoliticaDao<Politica> getInstance() {
		if (dao == null) {
			dao = new PoliticaDaoHibernateImpl<>();
		}
		return dao;
	}

	@Override
	public List<Politica> getListPoliticasByCampana(Long campanaId) throws InfraestructureException {
		try {
			List<?> lista = getSession()
					.createQuery(" select p from Politica p, Campana c where c.tipoCampana.tipocampanaId = p.tipoCampana.tipocampanaId and c.campanaId = :campanaId order by p.numLinea ")
					.setLong("campanaId", campanaId).list();

			List<Politica> politicas = new ArrayList<Politica>();

			for (Object obj : lista) {
				politicas.add((Politica) obj);
			}

			return politicas;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
