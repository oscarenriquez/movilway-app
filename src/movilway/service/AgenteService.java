package movilway.service;

import java.util.List;

import movilway.dao.domain.Agente;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface AgenteService<T> extends GenericService<T> {

	public List<Agente> getListAgentes(Long empresaId) throws InfraestructureException;
}
