package movilway.view;

import movilway.dao.domain.*;
import movilway.dao.exception.InfraestructureException;
import movilway.service.*;

public interface ServiceLocator {

	public AgenteService<Agente> getAgenteService() throws InfraestructureException;
	
	public ArchivoSaldosService<ArchivoSaldos> getArchivoSaldosService() throws InfraestructureException;
	
	public ArchivoTraspasosService<ArchivoTraspasos> getArchivosTraspasosService() throws InfraestructureException;
	
	public CampanaService<Campana> getCampanaService() throws InfraestructureException;
	
	public CampanaDetalleService<CampanaDetalle> getCampanaDetalleService() throws InfraestructureException;
	
	public EstadoService<Estado> getEstadoService() throws InfraestructureException;
	
	public LlamadaService<Llamada> getLlamadaService() throws InfraestructureException;
	
	public LlamadaVentaService<LlamadaVenta> getLlamadaVentaService() throws InfraestructureException;
	
	public PaisService<Pais> getPaisService() throws InfraestructureException;
	
	public PoliticaService<Politica> getPoliticaService() throws InfraestructureException;
	
	public ProvinciaService<Provincia> getProvinciaService() throws InfraestructureException;
	
	public PuntoVentaService<PuntoVenta> getPuntoVentaService() throws InfraestructureException;
	
	public ReceptorLlamadaService<ReceptorLlamada> getReceptorLlamadaService() throws InfraestructureException;
	
	public RespuestaLlamadaService<RespuestaLlamada> getRespuestaLlamadaService() throws InfraestructureException;
	
	public TipoAgenteService<TipoAgente> getTipoAgenteService() throws InfraestructureException;
	
	public TipoCampanaService<TipoCampana> getTipoCampanaService() throws InfraestructureException;
	
	public TipoPuntoVentaService<TipoPuntoVenta> getTipoPuntoVenta() throws InfraestructureException;
	
	public TrasladoService<Traslado> getTrasladoService() throws InfraestructureException;
	
	public UsuarioService getUsuarioService() throws InfraestructureException;
	
	public RegionProvinciaService<RegionProvincia> getRegionProvinciaService() throws InfraestructureException;
	
	public HistoricoSaldosService<HistoricoSaldos> getHistoricoSaldosService() throws InfraestructureException;
}
