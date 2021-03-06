package movilway.dao.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.spi.SessionFactoryImplementor;

import movilway.dao.exception.InfraestructureException;

public abstract class GenericDaoHibernateApplication <T> implements GenericDao<T> {

	public GenericDaoHibernateApplication() {

	}

	/**
	 * Permite obtener el Dialecto de base de datos con el que se obtuvo la conexion a la base de datos.
	 * 
	 * @return
	 */
	public Dialect getCurrentDialect() throws InfraestructureException {
		return ((SessionFactoryImplementor) HibernateUtil.getSession().getSessionFactory()).getDialect();
	}

	/**
	 * Facilitador para obtener la sesion actual
	 * 
	 * @return
	 * @throws InfraestructureException
	 */
	public Session getSession() throws InfraestructureException {
		return HibernateUtil.getSession();
	}
	
	/**
	 * Permite persistir cualquier entidad que recibe como parametro.
	 * 
	 * @param entity
	 * @return
	 * @throws InfraestructureException
	 */
	@Override
	public synchronized void saveEntity(T entity) throws InfraestructureException {
		try {
			Session session = getSession();
			session.persist(entity);		
			HibernateUtil.flushSession();
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
	
	@Override
	public synchronized Long saveUpdateEntity(T entity) throws InfraestructureException {
		try {
			Session session = getSession();
			return (Long) session.save(entity);					
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	/**
	 * Permite actualizar cualquier entidad que recibe como parametro.
	 * 
	 * @param entity
	 * @throws InfraestructureException
	 */
	@Override
	public void updateEntity(T entity) throws InfraestructureException {
		try {
			Session session = getSession();
			session.saveOrUpdate(entity);
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	/**
	 * Permite eliminar cualquier entidad que recibe como parametro.
	 * 
	 * @param entity
	 * @throws InfraestructureException
	 */
	@Override
	public void deleteEntity(T entity) throws InfraestructureException {
		try {
			Session session = getSession();
			session.delete(entity);
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	/**
	 * Obtiene de la base de datos la entidad del tipo de la clase y entityID que recibe como parametro.
	 * 
	 * @param entityClass
	 * @param entityID
	 * @return
	 * @throws InfraestructureException
	 */
	@Override
	@SuppressWarnings("unchecked")
	public T loadEntity(Class<T> entityClass, Serializable entityID) throws InfraestructureException {
		try {
			Session session = getSession();
			return (T) session.get(entityClass, entityID);
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	/**
	 * Retorna una lista de entidades del tipo de la clase que recibe como parametro.
	 * 
	 * @param entityClass
	 * @return
	 * @throws InfraestructureException
	 */	
	@Override
	@SuppressWarnings("unchecked")
	public List<T> getAllEntities(Class<T> entityClass) throws InfraestructureException {
		try {
			Session session = getSession();
	
			String className = entityClass.getName();
			List<?> allEntities = session.createQuery("from " + className + " order by id asc").list();
			List<T> list = new ArrayList<>(allEntities.size());
			for(Object obj : allEntities) {
				list.add((T) obj);
			}
	
			return list;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}	

	/**
	 * 
	 * @param hql
	 * @param parameters
	 * @param first
	 * @param amount
	 * @return
	 * @throws InfraestructureException
	 */
	@Override
	@SuppressWarnings("unchecked")
	public List<T> getAllEntitiesFiltered(Class<T> entityClass, Map<String, Serializable> parameters) throws InfraestructureException {
		try {
			Session session = getSession();
	
			String className = entityClass.getName();
			StringBuilder sbHql = new StringBuilder();
			sbHql.append("from ").append(className).append(" where 1 = 1 ");
			Set<String> keySet = parameters.keySet();
			for(String key : keySet){
				sbHql.append(" and ").append(key).append(" = :").append(key);
			}
			Query query = session.createQuery(sbHql.toString());
			query.setProperties(parameters);
			
			List<T> result = (List<T>) query.list();
	
			return result;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
	
	/**
	 * Permite obtener una lista de entidades con pagineo de acuerdo al hql que recibe como parametro.
	 * 
	 * @param hql
	 * @param parameters
	 * @param first
	 * @param amount
	 * @return
	 * @throws InfraestructureException
	 */
	public List<Object> executeQueryPaginated(String hql, Object[] parameters, int first, int amount) throws InfraestructureException {
		Session session = getSession();

		Query query = session.createQuery(hql);
		for (int i = 0; i < parameters.length; i++) {
			query.setParameter(i, parameters[i]);
		}

		query.setFirstResult(first);
		query.setMaxResults(amount);

		@SuppressWarnings("unchecked")
		List<Object> result = query.list();

		return result;
	}
	
	/**
	 * Retorna una lista de entidades de acuerdo al resultado del query que se crea del hql y parameters que recibe.
	 * 
	 * @param hql
	 * @param parameters
	 * @return
	 * @throws InfraestructureException
	 */
	@SuppressWarnings("unchecked")
	public List<Object> executeQuery(String hql, Object[] parameters) throws InfraestructureException {
		Session session = getSession();

		Query query = session.createQuery(hql);
		for (int i = 0; i < parameters.length; i++) {
			query.setParameter(i, parameters[i]);
		}

		List<Object> result = query.list();
		return result;
	}
}
