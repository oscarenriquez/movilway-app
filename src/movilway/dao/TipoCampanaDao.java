package movilway.dao;

import movilway.dao.domain.TipoCampana;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface TipoCampanaDao<T> extends GenericDao<T> {

	public TipoCampana getTipoCampanaAbastecimiento(Long empresaId, String descripcion) throws InfraestructureException;
}
