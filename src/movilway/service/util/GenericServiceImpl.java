package movilway.service.util;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public abstract class GenericServiceImpl<T> implements GenericService<T> {

	protected GenericDao<T> genericDao;
	
	private GenericDao<T> getGenericDao() {
		return genericDao;
	}
	
	@Override
	public void saveEntity(T entity) throws InfraestructureException {
		getGenericDao().saveEntity(entity);
	}

	@Override
	public void updateEntity(T entity) throws InfraestructureException {
		getGenericDao().updateEntity(entity);
	}

	@Override
	public void deleteEntity(T entity) throws InfraestructureException {
		getGenericDao().deleteEntity(entity);
	}

	@Override
	public T loadEntity(Class<T> entityClass, Serializable entityID) throws InfraestructureException {
		return getGenericDao().loadEntity(entityClass, entityID);
	}

	@Override
	public List<T> getAllEntities(Class<T> entityClass) throws InfraestructureException {
		return getGenericDao().getAllEntities(entityClass);
	}

	@Override
	public List<T> getAllEntitiesFiltered(Class<T> entityClass, Map<String, Serializable> parameters) throws InfraestructureException {
		return getGenericDao().getAllEntitiesFiltered(entityClass, parameters);
	}

}
