package movilway.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface PuntoVentaService<T> extends GenericService<T>  {

	public PuntoVenta getPuntoVentaByPuntoventaId(String puntoventaId, Long empresaId) throws InfraestructureException;
	
	public PuntoVenta getPuntoVentaByTelefono(Integer telefono, Long empresaId) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(String puntoventaId, Integer nivel, Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException;
	
	public Integer getTotalPuntoVenta(Long empresaId, String sqlSearch, String searchTerm) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntoVentaDataTable(Long empresaId, String sqlSearch, String searchTerm, Integer start, Integer amount) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntoVentaFiltered(Long tipoPuntoVentaPadre, Long empresaId, String[] tipoPuntoVenta, String puntoVentaSuperior, String nivel, 
			BigDecimal saldoMin, BigDecimal saldoMax, Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin, BigDecimal abstMax, 
			String[] paises, String[] estados, String[] provincias, String[] regiones, String[] respuestas) throws InfraestructureException;
	
	public List<Map<String, Object>> getListaPuntoVentaFilteredReport(Long tipoPuntoVentaPadre, Long empresaId, String[] tiposPuntoVenta, String puntoVentaSuperior, String nivel, 
			BigDecimal saldoMin, BigDecimal saldoMax, Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin, BigDecimal abstMax, 
			String[] paises, String[] estados, String[] provincias, String[] regiones, String[] respuestas) throws InfraestructureException;
}
