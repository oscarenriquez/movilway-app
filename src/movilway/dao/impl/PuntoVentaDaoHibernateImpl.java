package movilway.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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

	@Override
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException {
		try {
			List<?> list = getSession().createQuery("from PuntoVenta where pais.paisId = :paisId and estado.estadoId = :estadoId and provincia.provinciaId = :provinciaId ")
					.setLong("paisId", paisId)
					.setLong("estadoId", estadoId)
					.setLong("provinciaId", provinciaId)
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
	public List<PuntoVenta> getListaPuntoVentaFiltered(Long empresaId, String[] tipoPuntoVenta, String puntoVentaSuperior, String nivel,
			BigDecimal saldoMin, BigDecimal saldoMax, Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin,
			BigDecimal abstMax, String[] paises, String[] estados, String[] provincias, String[] regiones,
			String[] respuestas) throws InfraestructureException {
		try {
			StringBuilder sbHql = new StringBuilder();
			sbHql.append("from PuntoVenta where empresaId = :empresaId ");
			String strTipoPuntoVenta = arrayToString(tipoPuntoVenta);
			String strPaises = arrayToString(paises);
			String strEstados = arrayToString(estados);			
			String strProvincias = arrayToString(provincias);
			String strRegiones = arrayToString(regiones);
			//String strRespuestas = arrayToString(respuestas);
			
			if(!strTipoPuntoVenta.isEmpty()) {
				sbHql.append(" and tipoPuntoVenta.tipopuntoventaId in (").append(strTipoPuntoVenta).append(") "); 
			}
			
			if(!strPaises.isEmpty()) {
				sbHql.append(" and pais.paisId in (").append(strPaises).append(") ");
			}
			
			if(!strEstados.isEmpty()) {
				sbHql.append(" and estado.estadoId  in (").append(strEstados).append(") ");
			}
			
			if(!strProvincias.isEmpty()) {
				sbHql.append(" and provincia.provinciaId  in (").append(strProvincias).append(") ");
			}
			
			if(!strRegiones.isEmpty()) {
				sbHql.append(" and regionProvincia.regionprovinciaId  in (").append(strRegiones).append(") ");
			}
			
			if(!puntoVentaSuperior.isEmpty()) {
				sbHql.append(" and DPuntoventasuperior = :puntoVentaSuperior ");
			}
			
			if(!nivel.isEmpty()) {
				sbHql.append(" and nivel = :nivel ");
			}
			
			if(saldoMin != null) {
				sbHql.append(" and saldo >= :saldoMin ");
			}
			
			if(saldoMax != null) {
				sbHql.append(" and saldo <= :saldoMax ");
			}
			
			if(saldoFechaInicio != null) {
				sbHql.append(" and saldoFechahora >= :saldoFechaInicio ");
			}
			
			if(saldoFechaFin != null) {
				sbHql.append(" and saldoFechahora <= :saldoFechaFin ");
			}
			
			if(abstMin != null) {
				sbHql.append(" and puntoAbastecimiento >= :abstMin ");
			}			
			
			if(abstMax != null) {
				sbHql.append(" and puntoAbastecimiento <= :abstMax ");
			}
			
			Query query = getSession().createQuery(sbHql.toString());
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
	
	private String arrayToString(String[] array){
		if(array != null && array.length > 0){
			String result = Arrays.toString(array);
			result = result.substring(1, (result.length() - 1));
			return result;
		} 
		return "";
	}
}
