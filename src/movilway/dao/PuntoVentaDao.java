package movilway.dao;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface PuntoVentaDao<T> extends GenericDao<T>  {

	public PuntoVenta getPuntoVentaByPuntoventaId(String puntoventaId, Long empresaId) throws InfraestructureException;
	
	public PuntoVenta getPuntoVentaByTelefono(Integer telefono, Long empresaId) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntosVentaByPaisEstadoRegion(Long paisId, Long estadoId, Long provinciaId) throws InfraestructureException;
	
	public Integer getTotalPuntoVenta(Long empresaId, String sqlSearch, String searchTerm) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntoVentaDataTable(Long empresaId, String sqlSearch, String searchTerm, Integer start, Integer amount) throws InfraestructureException;
	
	public List<PuntoVenta> getListaPuntoVentaFiltered(Long empresaId, String[] tipoPuntoVenta, String puntoVentaSuperior, String nivel, 
			BigDecimal saldoMin, BigDecimal saldoMax, Date saldoFechaInicio, Date saldoFechaFin, BigDecimal abstMin, BigDecimal abstMax, 
			String[] paises, String[] estados, String[] provincias, String[] regiones, String[] respuestas) throws InfraestructureException;
}
