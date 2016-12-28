package movilway.dao;

import java.util.List;

import movilway.dao.domain.Provincia;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface ProvinciaDao<T> extends GenericDao<T>  {

	public List<Provincia> getListaProvinciasByEstado(Long estadoId, String estadosId) throws InfraestructureException;
		
}
