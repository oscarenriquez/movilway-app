package movilway.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import movilway.dao.PuntoVentaDao;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.PuntoVentaDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.PuntoVentaService;
import movilway.service.util.GenericServiceImpl;

public class PuntoVentaServiceImpl<T> extends GenericServiceImpl<T> implements PuntoVentaService<T> {

	private static PuntoVentaService<PuntoVenta> service;
	private PuntoVentaDao<PuntoVenta> dao;
	
	@SuppressWarnings("unchecked")
	private PuntoVentaServiceImpl(){
		dao = PuntoVentaDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final PuntoVentaService<PuntoVenta> getInstance(){				
		if(service == null) {
			service = new PuntoVentaServiceImpl<>();
		}			
		return service;
	}

	@Override
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(String puntoventaId, Integer nivel, Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException {
		return dao.getListaPuntosVentaByPaisEstadoRegion(puntoventaId, nivel, paisId, estadoId, provinciaId);
	}

	@Override
	public PuntoVenta getPuntoVentaByPuntoventaId(String puntoventaId, Long empresaId) throws InfraestructureException {		
		return dao.getPuntoVentaByPuntoventaId(puntoventaId, empresaId);
	}

	@Override
	public PuntoVenta getPuntoVentaByTelefono(Integer telefono, Long empresaId) throws InfraestructureException {		
		return dao.getPuntoVentaByTelefono(telefono, empresaId);
	}

	@Override
	public Integer getTotalPuntoVenta(Long empresaId, String sqlSearch, String searchTerm) throws InfraestructureException {
		return dao.getTotalPuntoVenta(empresaId, sqlSearch, searchTerm);
	}

	@Override
	public List<PuntoVenta> getListaPuntoVentaDataTable(Long empresaId, String sqlSearch, String searchTerm, Integer start, Integer amount) throws InfraestructureException {
		return dao.getListaPuntoVentaDataTable(empresaId, sqlSearch, searchTerm, start, amount);
	}

	@Override
	public List<PuntoVenta> getListaPuntoVentaFiltered(Long tipoPuntoVentaPadre, Long empresaId, String[] tipoPuntoVenta, String puntoVentaSuperior, String nivel,
			BigDecimal saldoMin, BigDecimal saldoMax, Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin,
			BigDecimal abstMax, String[] paises, String[] estados, String[] provincias, String[] regiones,
			String[] respuestas) throws InfraestructureException {		
		return dao.getListaPuntoVentaFiltered(tipoPuntoVentaPadre, empresaId, tipoPuntoVenta, puntoVentaSuperior, nivel, saldoMin, saldoMax, saldoFechaInicio, saldoFechaFin, 
				abstMin, abstMax, paises, estados, provincias, regiones, respuestas);
	}

	@Override
	public List<Map<String, Object>> getListaPuntoVentaFilteredReport(Long tipoPuntoVentaPadre, Long empresaId,
			String[] tiposPuntoVenta, String puntoVentaSuperior, String nivel, BigDecimal saldoMin, BigDecimal saldoMax,
			Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin, BigDecimal abstMax, String[] paises,
			String[] estados, String[] provincias, String[] regiones, String[] respuestas)
			throws InfraestructureException {		
		return dao.getListaPuntoVentaFilteredReport(tipoPuntoVentaPadre, empresaId, tiposPuntoVenta, puntoVentaSuperior, nivel, saldoMin, saldoMax, saldoFechaInicio, saldoFechaFin, 
				abstMin, abstMax, paises, estados, provincias, regiones, respuestas);
	}
}
