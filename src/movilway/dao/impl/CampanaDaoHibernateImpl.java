package movilway.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;

import movilway.dao.CampanaDao;
import movilway.dao.domain.Campana;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;
import movilway.dao.util.Utils;

public class CampanaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements CampanaDao<T> {

	private static CampanaDao<Campana> dao;

	private CampanaDaoHibernateImpl(){}
	
	public static final CampanaDao<Campana> getInstance(){				
		if(dao == null) {
			dao = new CampanaDaoHibernateImpl<>();
		}			
		return dao;
	}

	@Override
	public List<Map<String, Object>> getInforCampanasByUser(Long userId, String estatus) throws InfraestructureException {
		try {
			StringBuilder sb = new StringBuilder();			
			sb.append(" select c.campana_id, tc.descripcion, c.observaciones, c.fechahora_inicio, c.estatus, count(*) total, ");
			sb.append(" sum(case when cd.estatus = :estatus then 1 else 0 end) called, ");			
			sb.append(" tc.tipocampana_id ");
			sb.append(" from agente a ");
			sb.append(" inner join campana_detalle cd on (a.agente_id = cd.agente_id) ");
			sb.append(" inner join campana c on (cd.campana_id = c.campana_id) ");
			sb.append(" inner join tipo_campana tc on (c.tipocampana_id = tc.tipocampana_id) ");
			sb.append(" where a.user_id = :userId ");
			sb.append(" group by c.campana_id, tc.descripcion, c.observaciones, c.fechahora_inicio, c.estatus, tc.tipocampana_id ");
			
			List<?> list = getSession().createSQLQuery(sb.toString()).setLong("userId", userId).setString("estatus", estatus).list();
			List<Map<String, Object>> resultado = new ArrayList<>();
			for(Object obj : list) {
				Object[] o = (Object[]) obj;
				Number campanaId = (Number) o[0];
				String descripcion = (String) o[1];
				String observaciones = (String) o[2];
				Date fechahoraInicio = (Date) o[3];
				String Estatus = (String) o[4];
				Number total = (Number) o[5];
				Number llamadaNotif = (Number) o[6];				
				Number tipocampanaId = (Number) o[7];
				
				Map<String, Object> mapa = new HashMap<>();
				mapa.put("campanaId", Utils.getLongValue(campanaId));
				mapa.put("descripcion", descripcion);
				mapa.put("observaciones", observaciones);
				mapa.put("fechahoraInicio", fechahoraInicio);
				mapa.put("estatus", Estatus);
				mapa.put("total", Utils.getIntegerValue(total));
				mapa.put("llamadaNotif", Utils.getIntegerValue(llamadaNotif));				
				mapa.put("tipocampanaId", Utils.getLongValue(tipocampanaId));
				
				resultado.add(mapa);
			}
			
			return resultado;
		} catch (HibernateException he) {			
			throw new InfraestructureException(he);
		}		
	}

	@Override
	public List<CampanaDetalle> getListaCampanaDetalle(Long campanaId, Integer amount, String estatus, String dateSubstract) throws InfraestructureException {		
		try {
			StringBuilder sb = new StringBuilder();			
			sb.append(" select cd from Campana c inner join c.campanaDetalles cd ");
			sb.append(" where c.campanaId = :campanaId ");
			sb.append(" and cd.estatus = :estatus ");
			sb.append(" and ( cd.fechaProgramada is null or cd.fechaProgramada < addtime(now(), :dateSubstract) ) ");
			sb.append(" order by cd.detalleId asc ");
			
			StringBuilder sb2 = new StringBuilder();
			sb2.append(" select cd from Campana c inner join c.campanaDetalles cd ");
			sb2.append(" where c.campanaId = :campanaId ");
			sb2.append(" and cd.estatus = :estatus ");
			sb2.append(" and cd.fechaProgramada is not null ");
			sb2.append(" and cd.fechaProgramada >= addtime(now(), :dateSubstract) ");
			sb2.append(" order by cd.fechaProgramada asc ");
			
			List<?> list = getSession().createQuery(sb.toString())
					.setLong("campanaId", campanaId)
					.setString("estatus", estatus)
					.setString("dateSubstract", dateSubstract)
					.setMaxResults(amount).list();
			
			List<?> listProgramada = getSession().createQuery(sb2.toString())
					.setLong("campanaId", campanaId)
					.setString("estatus", estatus)
					.setString("dateSubstract", dateSubstract)
					.setMaxResults(amount).list();
			
			List<CampanaDetalle> resultado = new ArrayList<>();
			
			for( Object obj : listProgramada ) {
				resultado.add((CampanaDetalle) obj);
			}
			
			for( Object obj : list ) {
				if(resultado.size() == amount)
					break;
				
				resultado.add((CampanaDetalle) obj);
			}
			
			return resultado;
		} catch (HibernateException he) {			
			throw new InfraestructureException(he);
		}				
	}
}
