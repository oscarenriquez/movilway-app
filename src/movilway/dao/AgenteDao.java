package movilway.dao;

import java.util.List;

import movilway.dao.domain.Agente;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface AgenteDao<T> extends GenericDao<T> {

	public List<Agente> getListAgentes(Long empresaId) throws InfraestructureException;
}
