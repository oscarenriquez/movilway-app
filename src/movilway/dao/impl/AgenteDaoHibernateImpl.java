package movilway.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Query;

import movilway.dao.AgenteDao;
import movilway.dao.domain.Agente;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class AgenteDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements AgenteDao<T> {

	private static AgenteDao<Agente> dao;
	
	private AgenteDaoHibernateImpl(){}
	
	public static final AgenteDao<Agente> getInstance(){				
		if(dao == null) {
			dao = new AgenteDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public List<Agente> getListAgentes(Long empresaId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from Agente where tipoAgente.empresaId = :empresaId").setLong("empresaId", empresaId).list();
			List<Agente> agentes = new ArrayList<>();
			for(Object obj : list){
				agentes.add((Agente) obj);
			}
			return agentes;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

	@Override
	public List<Map<String, Object>> getListAgentesByCampana(Long campanaId, String estatus) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" select cd.agente.nombre, cd.agente.agenteId, count(cd) ");
			sbHql.append(" from Campana c inner join c.campanaDetalles cd  ");
			sbHql.append(" where c.campanaId = :campanaId and cd.estatus = :estatus ");
			sbHql.append(" group by cd.agente.nombre, cd.agente.agenteId ");
			
			Query query = getSession().createQuery(sbHql.toString());
			query.setLong("campanaId", campanaId);
			query.setString("estatus", estatus);
			
			List<?> list = query.list();
			List<Map<String, Object>> result = new ArrayList<>();
			for(Object obj : list) {
				Object[] oobj = (Object[]) obj;
				String nombre = (String) oobj[0];
				Number agenteId = (Number) oobj[1];
				Number cant = (Number) oobj[1];
				
				Map<String, Object> map = new HashMap<>();
				map.put("nombre", nombre);
				map.put("agenteId", agenteId.longValue());
				map.put("cant", cant.intValue());
				result.add(map);
			}
			
			return result;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}		
	}

}
