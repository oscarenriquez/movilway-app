package movilway.dao;

import java.util.List;

import movilway.dao.domain.Estado;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface EstadoDao<T> extends GenericDao<T> {

	public List<Estado> getListaEstadosByPais(Long paisId, String paisesId) throws InfraestructureException;
}
