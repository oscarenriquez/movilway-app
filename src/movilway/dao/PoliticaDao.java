package movilway.dao;

import java.util.List;

import movilway.dao.domain.Politica;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface PoliticaDao<T> extends GenericDao<T>  {

	public List<Politica> getListPoliticasByCampana(Long campanaId) throws InfraestructureException;
}
