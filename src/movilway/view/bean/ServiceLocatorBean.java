package movilway.view.bean;

import movilway.dao.domain.*;
import movilway.dao.exception.InfraestructureException;
import movilway.service.*;
import movilway.service.impl.*;
import movilway.view.ServiceLocator;

public class ServiceLocatorBean implements ServiceLocator {
	
	private static ServiceLocator serviceLocator;
	
	private ServiceLocatorBean() {}
	
	public static final ServiceLocator getInstance(){
		if(serviceLocator == null){			
			serviceLocator = new ServiceLocatorBean();				
		}
		return serviceLocator;
	}

	@Override
	public AgenteService<Agente> getAgenteService() throws InfraestructureException {		
		return AgenteServiceImpl.getInstance();
	}

	@Override
	public ArchivoSaldosService<ArchivoSaldos> getArchivoSaldosService() throws InfraestructureException {		
		return ArchivoSaldosServiceImpl.getInstance();
	}

	@Override
	public ArchivoTraspasosService<ArchivoTraspasos> getArchivosTraspasosService() throws InfraestructureException {
		return ArchivoTraspasosServiceImpl.getInstance();
	}

	@Override
	public CampanaService<Campana> getCampanaService() throws InfraestructureException {
		return CampanaServiceImpl.getInstance();
	}

	@Override
	public CampanaDetalleService<CampanaDetalle> getCampanaDetalleService() throws InfraestructureException {
		return CampanaDetalleServiceImpl.getInstance();
	}

	@Override
	public EstadoService<Estado> getEstadoService() throws InfraestructureException {
		return EstadoServiceImpl.getInstance();
	}

	@Override
	public LlamadaService<Llamada> getLlamadaService() throws InfraestructureException {		
		return LlamadaServiceImpl.getInstance();
	}

	@Override
	public LlamadaVentaService<LlamadaVenta> getLlamadaVentaService() throws InfraestructureException {
		return LlamadaVentaServiceImpl.getInstance();
	}

	@Override
	public PaisService<Pais> getPaisService() throws InfraestructureException {
		return PaisServiceImpl.getInstance();
	}

	@Override
	public PoliticaService<Politica> getPoliticaService() throws InfraestructureException {
		return PoliticaServiceImpl.getInstance();
	}

	@Override
	public ProvinciaService<Provincia> getProvinciaService() throws InfraestructureException {
		return ProvinciaServiceImpl.getInstance();
	}

	@Override
	public PuntoVentaService<PuntoVenta> getPuntoVentaService() throws InfraestructureException {
		return PuntoVentaServiceImpl.getInstance();
	}

	@Override
	public ReceptorLlamadaService<ReceptorLlamada> getReceptorLlamadaService() throws InfraestructureException {
		return ReceptorLlamadaServiceImpl.getInstance();
	}

	@Override
	public RespuestaLlamadaService<RespuestaLlamada> getRespuestaLlamadaService() throws InfraestructureException {
		return RespuestaLlamadaServiceImpl.getInstance();
	}

	@Override
	public TipoAgenteService<TipoAgente> getTipoAgenteService() throws InfraestructureException {
		return TipoAgenteServiceImpl.getInstance();
	}

	@Override
	public TipoCampanaService<TipoCampana> getTipoCampanaService() throws InfraestructureException {
		return TipoCampanaServiceImpl.getInstance();
	}

	@Override
	public TipoPuntoVentaService<TipoPuntoVenta> getTipoPuntoVenta() throws InfraestructureException {
		return TipoPuntoVentaServiceImpl.getInstance();
	}

	@Override
	public TrasladoService<Traslado> getTrasladoService() throws InfraestructureException {
		return TrasladoServiceImpl.getInstance();
	}

	@Override
	public UsuarioService getUsuarioService() throws InfraestructureException {
		return UsuarioServiceImpl.build();
	}

}
