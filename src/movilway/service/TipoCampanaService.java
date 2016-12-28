package movilway.service;

import movilway.dao.domain.TipoCampana;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface TipoCampanaService<T> extends GenericService<T> {

	public TipoCampana getTipoCampanaAbastecimiento(Long empresaId, String descripcion) throws InfraestructureException;
}
