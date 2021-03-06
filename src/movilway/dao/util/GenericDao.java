package movilway.dao.util;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import movilway.dao.exception.InfraestructureException;

public interface GenericDao<T> {

	public void saveEntity(T entity) throws InfraestructureException;
	
	public Long saveUpdateEntity(T entity) throws InfraestructureException;
	
	public void updateEntity(T entity) throws InfraestructureException;
	
	public void deleteEntity(T entity) throws InfraestructureException;
	
	public T loadEntity(Class<T> entityClass, Serializable entityID) throws InfraestructureException;
	
	public List<T> getAllEntities(Class<T> entityClass) throws InfraestructureException;
	
	public List<T> getAllEntitiesFiltered(Class<T> entityClass, Map<String, Serializable> parameters) throws InfraestructureException;
}
