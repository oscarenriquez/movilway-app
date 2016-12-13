package movilway.service;

import java.util.List;

import movilway.dao.domain.Politica;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface PoliticaService<T> extends GenericService<T>  {

	public List<Politica> getListPoliticasByCampana(Long campanaId) throws InfraestructureException;
}
