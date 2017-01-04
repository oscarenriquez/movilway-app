package movilway.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;

import movilway.dao.PuntoVentaDao;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class PuntoVentaDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements PuntoVentaDao<T> {

	private static PuntoVentaDao<PuntoVenta> dao;

	private PuntoVentaDaoHibernateImpl(){}
	
	public static final PuntoVentaDao<PuntoVenta> getInstance(){				
		if(dao == null) {
			dao = new PuntoVentaDaoHibernateImpl<>();
		}			
		return dao;
	}
	
	private String arrayToString(String[] array){
		if(array != null && array.length > 0){
			String result = Arrays.toString(array);
			result = result.substring(1, (result.length() - 1));
			return result;
		} 
		return "";
	}
		
	private String getSql () {
		StringBuilder sbSql = new StringBuilder();
		sbSql.append(" SELECT "); 
		sbSql.append("   t1.nivel, ");
		sbSql.append("   t1.puntoventa_id, ");  
		sbSql.append("   t1.telefono, ");
		sbSql.append("   t1.descripcion, ");
		sbSql.append("   t1.pais_id, t2.abrev pais_abrev, ");
		sbSql.append("   t1.estado_id, t3.abrev depto_abrev, ");
		sbSql.append("   t1.provincia_id, t4.abrev municipio_abrev, t4.descripcion municipio_desc, ");
		sbSql.append("   t1.regionprovincia_id, t5.abrev zona, ");
		sbSql.append("   t1.direccion, ");
		sbSql.append("   t1.saldo, t1.saldo_fechahora actualizadoAL, ");
		sbSql.append("   t1.punto_abastecimiento, ");
		sbSql.append("   t1.latitud, ");
		sbSql.append("   t1.longitud, ");
		sbSql.append("   t6.puntoventa_id padre_id, ");
		sbSql.append("   t6.telefono padre_telefono, t6.descripcion padre_descripcion, t6.nivel nivel_padre ");
		sbSql.append(" FROM "); 
		sbSql.append("   punto_venta t1 "); 
		sbSql.append(" LEFT OUTER JOIN pais t2 on (t1.pais_id=t2.pais_id) ");
		sbSql.append(" LEFT OUTER JOIN estado t3 on (t1.estado_id=t3.estado_id) ");
		sbSql.append(" LEFT OUTER JOIN provincia t4 on (t1.provincia_id=t4.provincia_id) ");
		sbSql.append(" LEFT OUTER JOIN region_provincia t5 on (t1.regionprovincia_id=t5.regionprovincia_id) ");
		sbSql.append(" JOIN punto_venta t6 on (t1.d_puntoventasuperior=t6.puntoventa_id) ");
		sbSql.append(" WHERE t1.empresa_id = :empresaId "); 
		sbSql.append("   AND t1.saldo < t1.punto_abastecimiento "); 
		sbSql.append("   AND t6.tipopuntoventa_id= :tipoPuntoVentaPadre ");
		return sbSql.toString();
	}

	@Override
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(String puntoventaId, Integer nivel, Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException {
		try {
			List<?> list = getSession()
					.createQuery("from PuntoVenta where puntoventaId != :puntoventaId and cast(nivel as int) < :nivel and pais.paisId = :paisId and estado.estadoId = :estadoId order by nivel asc ")
					.setString("puntoventaId", puntoventaId)
					.setInteger("nivel", nivel)
					.setLong("paisId", paisId)
					.setLong("estadoId", estadoId)					
					.list();// Listado de puntos de venta
			List<PuntoVenta> puntosVenta = new ArrayList<>();
			for(Object obj : list){
				puntosVenta.add((PuntoVenta)obj);
			}
			return puntosVenta;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

	@Override
	public PuntoVenta getPuntoVentaByPuntoventaId(String puntoventaId, Long empresaId) throws InfraestructureException {
		try {			
			return (PuntoVenta) getSession().createCriteria(PuntoVenta.class)
											.add(Restrictions.eq("puntoventaId", puntoventaId))
											.add(Restrictions.eq("empresaId", empresaId))
											.uniqueResult(); // Punto de venta
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

	@Override
	public PuntoVenta getPuntoVentaByTelefono(Integer telefono, Long empresaId) throws InfraestructureException {		
		try {			
			return (PuntoVenta) getSession().createCriteria(PuntoVenta.class)
											.add(Restrictions.eq("telefono", telefono))
											.add(Restrictions.eq("empresaId", empresaId))
											.setMaxResults(1)
											.uniqueResult(); // Punto de venta
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}
	}

	@Override
	public Integer getTotalPuntoVenta(Long empresaId, String sqlSearch, String searchTerm) throws InfraestructureException {		
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" select count(*) as cant from PuntoVenta t1 where t1.empresaId = :empresaId ");
			if(searchTerm != null && !searchTerm.isEmpty()) {
				sbHql.append(sqlSearch);
			}
			
			Query query = getSession().createQuery(sbHql.toString());
			query.setLong("empresaId", empresaId);			
			
			if(searchTerm != null && !searchTerm.isEmpty()) {
				query.setString("searchTerm", searchTerm);
			}
			
			Number num = (Number) query.uniqueResult();
			
			if(num == null)
				return 0;
			
			return num.intValue();
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	@Override
	public List<PuntoVenta> getListaPuntoVentaDataTable(Long empresaId, String sqlSearch, String searchTerm, Integer start, Integer amount) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" select t1 from PuntoVenta t1 where t1.empresaId = :empresaId ");
			if(searchTerm != null && !searchTerm.isEmpty()) {
				sbHql.append(sqlSearch);
			}
			
			sbHql.append(" order by t1.descripcion asc ");
			
			Query query = getSession().createQuery(sbHql.toString());
			query.setLong("empresaId", empresaId);
			
			if(searchTerm != null && !searchTerm.isEmpty()) {
				query.setString("searchTerm", searchTerm);
			}
			query.setFirstResult(start);
			query.setMaxResults(amount);
			
			List<?> lista = query.list();
			List<PuntoVenta> puntosVenta = new ArrayList<>();
			
			for(Object obj : lista) {
				puntosVenta.add((PuntoVenta) obj);
			}
			
			return puntosVenta;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}

	@Override
	public List<PuntoVenta> getListaPuntoVentaFiltered(Long tipoPuntoVentaPadre, Long empresaId, String[] tipoPuntoVenta, String puntoVentaSuperior, String nivel,
			BigDecimal saldoMin, BigDecimal saldoMax, Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin,
			BigDecimal abstMax, String[] paises, String[] estados, String[] provincias, String[] regiones,
			String[] respuestas) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(" select pt from PuntoVenta pt, PuntoVenta pt2 ");
			sbHql.append(" where pt2.puntoventaId = pt.DPuntoventasuperior ");
			sbHql.append(" and pt2.tipoPuntoVenta.tipopuntoventaId = :tipoPuntoVentaPadre ");
			sbHql.append(" and pt.empresaId = :empresaId ");
			String strTipoPuntoVenta = arrayToString(tipoPuntoVenta);
			String strPaises = arrayToString(paises);
			String strEstados = arrayToString(estados);			
			String strProvincias = arrayToString(provincias);
			String strRegiones = arrayToString(regiones);
			String strRespuestas = arrayToString(respuestas);
			
			if(!strTipoPuntoVenta.isEmpty()) {
				sbHql.append(" and pt.tipoPuntoVenta.tipopuntoventaId in (").append(strTipoPuntoVenta).append(") "); 
			}
			
			if(!strPaises.isEmpty()) {
				sbHql.append(" and pt.pais.paisId in (").append(strPaises).append(") ");
			}
			
			if(!strEstados.isEmpty()) {
				sbHql.append(" and pt.estado.estadoId  in (").append(strEstados).append(") ");
			}
			
			if(!strProvincias.isEmpty()) {
				sbHql.append(" and pt.provincia.provinciaId  in (").append(strProvincias).append(") ");
			}
			
			if(!strRegiones.isEmpty()) {
				sbHql.append(" and pt.regionProvincia.regionprovinciaId  in (").append(strRegiones).append(") ");
			}
			
			if(!strRespuestas.isEmpty()) {
				sbHql.append(" and pt.ultimaRespuesta.respuestaId  in (").append(strRespuestas).append(") ");
			}
			
			if(!puntoVentaSuperior.isEmpty()) {
				sbHql.append(" and pt.DPuntoventasuperior = :puntoVentaSuperior ");
			}
			
			if(!nivel.isEmpty()) {
				sbHql.append(" and pt.nivel = :nivel ");
			}
			
			if(saldoMin != null) {
				sbHql.append(" and pt.saldo >= :saldoMin ");
			}
			
			if(saldoMax != null) {
				sbHql.append(" and pt.saldo <= :saldoMax ");
			}
			
			if(saldoFechaInicio != null) {
				sbHql.append(" and pt.saldoFechahora >= :saldoFechaInicio ");
			}
			
			if(saldoFechaFin != null) {
				sbHql.append(" and pt.saldoFechahora <= :saldoFechaFin ");
			}
			
			if(abstMin != null) {
				sbHql.append(" and pt.puntoAbastecimiento >= :abstMin ");
			}			
			
			if(abstMax != null) {
				sbHql.append(" and pt.puntoAbastecimiento <= :abstMax ");
			}
			
			Query query = getSession().createQuery(sbHql.toString());
			query.setLong("tipoPuntoVentaPadre", tipoPuntoVentaPadre);
			query.setLong("empresaId", empresaId);
			
			if(!puntoVentaSuperior.isEmpty()) {				
				query.setString("puntoVentaSuperior", puntoVentaSuperior);
			}
			
			if(!nivel.isEmpty()) {				
				query.setString("nivel", nivel);
			}
			
			if(saldoMin != null) {				
				query.setBigDecimal("saldoMin", saldoMin);			
			}
			
			if(saldoMax != null) {
				query.setBigDecimal("saldoMax", saldoMax);
			}
			
			if(saldoFechaInicio != null) {				
				query.setDate("saldoFechaInicio", saldoFechaInicio);				
			}
			
			if(saldoFechaFin != null) {
				query.setDate("saldoFechaFin", saldoFechaFin);
			}
			
			if(abstMin != null) {
				query.setBigDecimal("abstMin", abstMin);				
			}
			
			if(abstMax != null) {				
				query.setBigDecimal("abstMax", abstMax);
			}
			
			List<?> list = query.list();
			List<PuntoVenta> lista = new ArrayList<>();
			for(Object obj : list) {
				lista.add((PuntoVenta)obj);
			}
			return lista;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}		

	@Override
	public List<Map<String, Object>> getListaPuntoVentaFilteredReport(Long tipoPuntoVentaPadre, Long empresaId,
			String[] tiposPuntoVenta, String puntoVentaSuperior, String nivel, BigDecimal saldoMin, BigDecimal saldoMax,
			Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin, BigDecimal abstMax, String[] paises,
			String[] estados, String[] provincias, String[] regiones, String[] respuestas)
			throws InfraestructureException {		
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append(getSql());			
			
			String strTipoPuntoVenta = arrayToString(tiposPuntoVenta);
			String strPaises = arrayToString(paises);
			String strEstados = arrayToString(estados);			
			String strProvincias = arrayToString(provincias);
			String strRegiones = arrayToString(regiones);
			String strRespuestas = arrayToString(respuestas);
			
			if(strTipoPuntoVenta != null && !strTipoPuntoVenta.isEmpty()) {
				sbHql.append(" and t1.tipopuntoventa_id in (").append(strTipoPuntoVenta).append(") "); 
			}
			
			if(strPaises != null && !strPaises.isEmpty()) {
				sbHql.append(" and t1.pais_id in (").append(strPaises).append(") ");
			}
			
			if(strEstados != null && !strEstados.isEmpty()) {
				sbHql.append(" and t1.estado_id  in (").append(strEstados).append(") ");
			}
			
			if(strProvincias != null && !strProvincias.isEmpty()) {
				sbHql.append(" and t1.provincia_id  in (").append(strProvincias).append(") ");
			}
			
			if(strRegiones != null && !strRegiones.isEmpty()) {
				sbHql.append(" and t1.regionprovincia_id  in (").append(strRegiones).append(") ");
			}
			
			if(strRegiones != null && !strRespuestas.isEmpty()) {
				sbHql.append(" and t1.ult_respuesta  in (").append(strRespuestas).append(") ");
			}
			
			if(puntoVentaSuperior != null && !puntoVentaSuperior.isEmpty()) {
				sbHql.append(" and t1.d_puntoventasuperior = :puntoVentaSuperior ");
			}
			
			if(nivel != null && !nivel.isEmpty()) {
				sbHql.append(" and t1.nivel = :nivel ");
			}
			
			if(saldoMin != null) {
				sbHql.append(" and t1.saldo >= :saldoMin ");
			}
			
			if(saldoMax != null) {
				sbHql.append(" and t1.saldo <= :saldoMax ");
			}
			
			if(saldoFechaInicio != null) {
				sbHql.append(" and t1.saldo_fechahora >= :saldoFechaInicio ");
			}
			
			if(saldoFechaFin != null) {
				sbHql.append(" and t1.saldo_fechahora <= :saldoFechaFin ");
			}
			
			if(abstMin != null) {
				sbHql.append(" and t1.punto_abastecimiento >= :abstMin ");
			}			
			
			if(abstMax != null) {
				sbHql.append(" and t1.punto_abastecimiento <= :abstMax ");
			}
			
			Query query = getSession().createSQLQuery(sbHql.toString());
			query.setLong("tipoPuntoVentaPadre", tipoPuntoVentaPadre);
			query.setLong("empresaId", empresaId);
			
			if(puntoVentaSuperior != null && !puntoVentaSuperior.isEmpty()) {				
				query.setString("puntoVentaSuperior", puntoVentaSuperior);
			}
			
			if(nivel != null && !nivel.isEmpty()) {				
				query.setString("nivel", nivel);
			}
			
			if(saldoMin != null) {				
				query.setBigDecimal("saldoMin", saldoMin);			
			}
			
			if(saldoMax != null) {
				query.setBigDecimal("saldoMax", saldoMax);
			}
			
			if(saldoFechaInicio != null) {				
				query.setDate("saldoFechaInicio", saldoFechaInicio);				
			}
			
			if(saldoFechaFin != null) {
				query.setDate("saldoFechaFin", saldoFechaFin);
			}
			
			if(abstMin != null) {
				query.setBigDecimal("abstMin", abstMin);				
			}
			
			if(abstMax != null) {				
				query.setBigDecimal("abstMax", abstMax);
			}
			
			List<?> list = query.list();
			List<Map<String, Object>> lista = new ArrayList<>();
			for(Object obj : list) {
				Object[] aObj = (Object[]) obj;
				
				String mNivel = (String) aObj[0];
				String mPuntoVentaId = (String) aObj[1];
				Number mTelefono = (Number) aObj[2];
				String mDescripcion = (String) aObj[3];
				Number mPaisId = (Number) aObj[4];
				String mPaisAbrev = (String) aObj[5];
				Number mEstadoId = (Number) aObj[6];
				String mEstadoAbrev = (String) aObj[7];
				Number mProvinciaId = (Number) aObj[8];
				String mProvinciaAbrev = (String) aObj[9];
				String mProvinciaDescr = (String) aObj[10];
				Number mRegionId = (Number) aObj[11];
				String mRegionAbrev = (String) aObj[12];
				String mDireccion = (String) aObj[13];
				Number mSaldo = (Number) aObj[14];
				Date mSaldoFechaHora = (Date) aObj[15];
				Number mPuntoAbastecimiento = (Number) aObj[16];
				Number mLatitud = (Number) aObj[17];
				Number mLongitud = (Number) aObj[18];
				String mPuntoVentaIdPadre = (String) aObj[19];
				Number mTelefonoPadre = (Number) aObj[20];
				String mDescripcionPadre = (String) aObj[21];
				String mNivelPadre = (String) aObj[22];
								
				Map<String, Object> mapa = new HashMap<>();
				
				mapa.put("nivel", mNivel);
				mapa.put("puntoVentaId", mPuntoVentaId);
				mapa.put("telefono", mTelefono == null ? 0 : mTelefono.intValue());
				mapa.put("descripcion", mDescripcion);
				mapa.put("paisId", mPaisId == null ? 0L : mPaisId.longValue());
				mapa.put("paisAbrev", mPaisAbrev);
				mapa.put("estadoId", mEstadoId == null ? 0L : mEstadoId.longValue());
				mapa.put("estadoAbrev", mEstadoAbrev);
				mapa.put("provinciaId", mProvinciaId == null ? 0L : mProvinciaId.longValue());
				mapa.put("provinciaAbrev", mProvinciaAbrev);
				mapa.put("provinciaDescr", mProvinciaDescr);
				mapa.put("regionId", mRegionId == null ? 0L : mRegionId.longValue());
				mapa.put("regionAbrev", mRegionAbrev);
				mapa.put("direccion", mDireccion);
				mapa.put("saldo", mSaldo == null ? 0D : mSaldo.doubleValue());
				mapa.put("saldoFechaHora", mSaldoFechaHora);
				mapa.put("puntoAbastecimiento", mPuntoAbastecimiento == null ? 0D : mPuntoAbastecimiento.doubleValue());
				mapa.put("latitud", mLatitud == null ? 0D : mLatitud.doubleValue());
				mapa.put("longitud", mLongitud == null ? 0D : mLongitud.doubleValue());
				mapa.put("puntoVentaIdPadre", mPuntoVentaIdPadre);
				mapa.put("telefonoPadre", mTelefonoPadre == null ? 0 : mTelefonoPadre.intValue());
				mapa.put("descripcionPadre", mDescripcionPadre);
				mapa.put("nivelPadre", mNivelPadre);
				
				lista.add(mapa);
			}
			return lista;
		} catch (HibernateException he) {
			throw new InfraestructureException(he);
		}
	}
}
