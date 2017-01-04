package movilway.view.helper;

import static movilway.service.util.FechaHoraUtil.getFechaStringLarga;
import static movilway.service.util.FechaHoraUtil.getFormatDateLong;
import static movilway.service.util.FechaHoraUtil.getParseDateLong;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Campana;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.domain.Llamada;
import movilway.dao.domain.LlamadaId;
import movilway.dao.domain.LlamadaVenta;
import movilway.dao.domain.LlamadaVentaId;
import movilway.dao.domain.Politica;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.domain.ReceptorLlamada;
import movilway.dao.domain.RespuestaLlamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import movilway.dao.util.Utils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class InboxHelper extends ServicioHelper {

	public static final Double CIEN = 100D;
	
	public void dispacherMenuInbox (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/inbox.jsp");
	}		
	
	public void getInfoGeneralByAgente (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONArray campanas = new JSONArray();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){				
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Long userId = getUsuarioId();
							List<Map<String, Object>> lista = getServiceLocator().getCampanaService().getInforCampanasByUser(userId, CampanaDetalle.COMPLETADO);
							
							Double totalGeneral = 0D;
							Double avanceGeneral = 0D;
							for(Map<String, Object> mapa : lista) {
								Integer total = Utils.getValue(mapa.get("total"));
								Integer llamadaNotif = Utils.getValue(mapa.get("llamadaNotif"));								
								
								Long campanaId = Utils.getValue(mapa.get("campanaId"));
								Long tipocampanaId = Utils.getValue(mapa.get("tipocampanaId"));
								
								String descripcion = Utils.getStringValue(mapa.get("descripcion"));
								String observaciones = Utils.getStringValue(mapa.get("observaciones"));
								String estatus = Utils.getStringValue(mapa.get("estatus"));
								
								Date fechahoraInicio = Utils.getDateValue(mapa.get("fechahoraInicio"));
								
								totalGeneral += total.doubleValue();
								
								Double porcentaje = 0D;																
								avanceGeneral += llamadaNotif.doubleValue();
								porcentaje = (llamadaNotif.doubleValue() / total.doubleValue()) * CIEN; 													
								
								JSONObject campana = new JSONObject();
								campana.put("tipocampanaId", tipocampanaId);
								campana.put("campanaId", campanaId);
								campana.put("descripcion", descripcion);
								campana.put("observaciones", observaciones);
								campana.put("total", total);
								campana.put("estatus", estatus);
								campana.put("fechahoraInicio", getFechaStringLarga(fechahoraInicio));
								campana.put("porcentaje", Math.round(porcentaje.doubleValue()));
								campana.put("llamadas", llamadaNotif);
								
								campanas.add(campana);
							}
							
							Double porcentaje = (avanceGeneral.doubleValue() / totalGeneral.doubleValue()) * CIEN;							
							
							result.put("campanas", campanas);
							result.put("porcentaje", Math.round(porcentaje.doubleValue()));
							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("getInfoGeneralByAgente", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("getInfoGeneralByAgente", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}						
					} else {
						isSuccess = false;
						msg = FALTA_PERMISOS;
					}				
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("getInfoGeneralByAgente", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void cargaCuentasInbox (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONArray detalles = new JSONArray();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String campanaId = getNumberValue(req.getParameter("campanaId"));
				String amount = getNumberValue(req.getParameter("amount"));
				if(vParam(campanaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							if(amount.isEmpty() || amount.equals("0")) {
								amount = "10";
							}
							Long campanaIdL = Long.valueOf(campanaId);
							Campana campana =  getServiceLocator().getCampanaService().loadEntity(Campana.class, campanaIdL);
							if(campana != null) {
								Boolean isVenta = campana.getTipoCampana().getId().equals(ABASTECIMIENTO);								
								List<Politica> politicas = getServiceLocator().getPoliticaService().getListPoliticasByCampana(campanaIdL);
								
								// Obtiene listado de detalles ordenadas
								String horaProgramada = getBundle().getString("movilway.param.campana.llamadaProgramada"); // Avisar antes de hora programada
								List<CampanaDetalle> campDetalles = getServiceLocator().getCampanaService().getListaCampanaDetalle(campanaIdL, Integer.valueOf(amount), CampanaDetalle.ASIGNADA, horaProgramada);
								
								// Listado de detalles que no generan orden y es de abastecimiento
								List<CampanaDetalle> campDetallesParaCancelar = new ArrayList<>();
								
								if(vList(campDetalles)) {
									for( CampanaDetalle detalle : campDetalles ) {
										JSONObject obj = new JSONObject();
										PuntoVenta puntoVenta = detalle.getPuntoVenta();
										
										if(!puntoVenta.generaOrden() && isVenta) {
											campDetallesParaCancelar.add(detalle);
											continue;
										}
										
										obj.put("isVenta", isVenta);
										obj.put("telefono", puntoVenta.getTelefono());
										obj.put("detalleId", detalle.getDetalleId());
										obj.put("contacto", puntoVenta.getContacto());
										obj.put("puntoventaId", puntoVenta.getPuntoventaId());
										obj.put("nivel", puntoVenta.getNivel());
										obj.put("descripcion", puntoVenta.getDescripcion());
										obj.put("direccion", puntoVenta.getDireccion());
										obj.put("observaciones", puntoVenta.getObservaciones());
										obj.put("tipoPuntoVenta", puntoVenta.getTipoPuntoVenta().getDescripcion());
										obj.put("saldo", puntoVenta.getSaldo());
										obj.put("saldoFechahora", getFechaStringLarga(puntoVenta.getSaldoFechahora()));
										obj.put("puntoAbastecimiento", puntoVenta.getPuntoAbastecimiento());									
										obj.put("pais", puntoVenta.getPais() != null ? puntoVenta.getPais().getDescripcion() : "");									
										obj.put("estado", puntoVenta.getEstado() != null ?  puntoVenta.getEstado().getDescripcion() : "");
										obj.put("provincia", puntoVenta.getProvincia() != null ? puntoVenta.getProvincia().getDescripcion() : "");
										obj.put("region", puntoVenta.getRegionProvincia() != null ? puntoVenta.getRegionProvincia().getDescripcion() : "");
										obj.put("paisId", puntoVenta.getPais() != null ? puntoVenta.getPais().getId() : 0L);
										obj.put("estadoId", puntoVenta.getEstado() != null ? puntoVenta.getEstado().getId() : 0L);
										obj.put("provinciaId", puntoVenta.getProvincia() != null ? puntoVenta.getProvincia().getId() : 0L);
										obj.put("regionId", puntoVenta.getRegionProvincia() != null ? puntoVenta.getRegionProvincia().getId() : 0L);
										obj.put("fechaProgramada", getFormatDateLong(detalle.getFechaProgramada()));
										JSONArray jsArrPoliticas = new JSONArray();
										for(Politica politica : politicas) {
											JSONObject o = new JSONObject();
											o.put("numLinea", politica.getNumLinea());
											o.put("texto", politica.getTexto());
											jsArrPoliticas.add(o);
										}
										
										obj.put("politicas", jsArrPoliticas);
										detalles.add(obj);
									}
								} 
								// Inicia Cancelacion de Ordenes de llamadas
								for( CampanaDetalle detalle : campDetallesParaCancelar ) {
									detalle.setEstatus(CampanaDetalle.CANCELADO);
									getServiceLocator().getCampanaDetalleService().updateEntity(detalle);
									HibernateUtil.flushSession();
								}
								
								result.put("detalles", detalles);
								result.put("textoReferencia", campana.getTipoCampana().getDescripcion() + " (" + campana.getObservaciones() + ")");
							} else {
								isSuccess = false;
							}
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("cargaCuentasInbox", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("cargaCuentasInbox", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}						
					} else {
						isSuccess = false;
						msg = FALTA_PERMISOS;
					}
				} else {
					isSuccess = false;
					msg = PARAM_NECESARIOS;
				}
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);			
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("cargaCuentasInbox", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void iniciarLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();			
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String detalleId = getNumberValue(req.getParameter("detalleId"));				
				if(vParam(detalleId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							Long detalleIdLong = Long.valueOf(detalleId);													
							LlamadaId id = new LlamadaId();
							id.setDetalleId(detalleIdLong);
							id.setCorrLlamada((getServiceLocator().getLlamadaService().getCorrelativoLlamada(detalleIdLong) + 1));
							Llamada llamada = getServiceLocator().getLlamadaService().loadEntity(Llamada.class, id);
							if(llamada != null) {
								llamada.setFechahoraFin(new Date());
								getServiceLocator().getLlamadaService().updateEntity(llamada);
							} else {
								llamada = new Llamada();
								llamada.setId(id);
								llamada.setFechahoraInicio(new Date());
								llamada.setFechahoraFin(new Date());
								llamada.setEmpresaId(getEmpresaId());
								getServiceLocator().getLlamadaService().saveEntity(llamada);
								
								CampanaDetalle detalle = getServiceLocator().getCampanaDetalleService().loadEntity(CampanaDetalle.class, detalleIdLong);
								detalle.setEstatus(CampanaDetalle.LLAMADA_ENCURSO);
								getServiceLocator().getCampanaDetalleService().updateEntity(detalle);
							}	
							HibernateUtil.flushSession();
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("iniciarLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("iniciarLlamada", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}						
					} else {
						isSuccess = false;
						msg = FALTA_PERMISOS;
					}
				} else {
					isSuccess = false;
					msg = PARAM_NECESARIOS;
				}
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);			
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("iniciarLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void finalizarLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();			
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String detalleId = getNumberValue(req.getParameter("detalleId"));
				String receptorId = getNumberValue(req.getParameter("receptorId"));
				String respuestaId = getNumberValue(req.getParameter("respuestaId"));
				String comentarios = getStringValue(req.getParameter("comentarios"));
				String fechaProgramada = getStringValue(req.getParameter("fechaProgramada"));
				String telefonoLlamado = getNumberValue(req.getParameter("telefonoLlamado"));
				String referencia = getStringValue(req.getParameter("referencia"));
				if(vParam(detalleId) && vParam(receptorId) && vParam(respuestaId) && vParam(comentarios) && vParam(telefonoLlamado) && vParam(referencia)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							Long detalleIdLong = Long.valueOf(detalleId);														
							LlamadaId id = new LlamadaId();
							id.setDetalleId(detalleIdLong);
							id.setCorrLlamada(getServiceLocator().getLlamadaService().getCorrelativoLlamada(detalleIdLong));
							
							RespuestaLlamada respuesta = getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.valueOf(respuestaId));
							
							Llamada llamada = getServiceLocator().getLlamadaService().loadEntity(Llamada.class, id);
							llamada.setComentarios(comentarios);
							llamada.setReferencia(referencia);
							llamada.setTelefonoLlamado(Integer.valueOf(telefonoLlamado));
							llamada.setReceptorLlamada(getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.valueOf(receptorId)));
							llamada.setRespuestaLlamada(respuesta);
							llamada.setEmpresaId(getEmpresaId());
							
							llamada.setFechahoraFin(new Date());
							
							getServiceLocator().getLlamadaService().updateEntity(llamada);
							HibernateUtil.flushSession();
							
							
							CampanaDetalle detalle = getServiceLocator().getCampanaDetalleService().loadEntity(CampanaDetalle.class, detalleIdLong);
							if(respuesta.getGeneraLlamada()){
								detalle.setEstatus(CampanaDetalle.ASIGNADA);
								detalle.setFechaProgramada(getParseDateLong(fechaProgramada));
							} else {
								detalle.setEstatus(CampanaDetalle.COMPLETADO);
							}
																											
							getServiceLocator().getCampanaDetalleService().updateEntity(detalle);
							HibernateUtil.flushSession();
							
							PuntoVenta puntoVenta = detalle.getPuntoVenta();
							
							puntoVenta.setUltimaRespuesta(respuesta);
							getServiceLocator().getPuntoVentaService().updateEntity(puntoVenta);
							HibernateUtil.flushSession();
							
							isSuccess = true;
							msg = CREATE;
							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("finalizarLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("finalizarLlamada", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}						
					} else {
						isSuccess = false;
						msg = FALTA_PERMISOS;
					}
				} else {
					isSuccess = false;
					msg = PARAM_NECESARIOS;
				}
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);			
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("finalizarLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void eliminarLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();			
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String detalleId = getNumberValue(req.getParameter("detalleId"));				
				if(vParam(detalleId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							Long detalleIdLong = Long.valueOf(detalleId);														
							LlamadaId id = new LlamadaId();
							id.setDetalleId(detalleIdLong);
							id.setCorrLlamada(getServiceLocator().getLlamadaService().getCorrelativoLlamada(detalleIdLong));
														
							Llamada llamada = getServiceLocator().getLlamadaService().loadEntity(Llamada.class, id);
							
							getServiceLocator().getLlamadaService().deleteEntity(llamada);
							HibernateUtil.flushSession();
							
							isSuccess = true;
							msg = DELETE;
							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("eliminarLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("eliminarLlamada", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}						
					} else {
						isSuccess = false;
						msg = FALTA_PERMISOS;
					}
				} else {
					isSuccess = false;
					msg = PARAM_NECESARIOS;
				}
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);			
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("finalizarLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void finalizarLlamadaVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();			
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String detalleId = getNumberValue(req.getParameter("detalleId"));
				
				String receptorId = getNumberValue(req.getParameter("receptorId"));
				String respuestaId = getNumberValue(req.getParameter("respuestaId"));				
				String fechaProgramada = getStringValue(req.getParameter("fechaProgramada"));
				String telefonoLlamado = getNumberValue(req.getParameter("telefonoLlamado"));
				String referencia = getStringValue(req.getParameter("referencia"));
				
				String montoTraspaso = getNumberValue(req.getParameter("montoTraspaso"));
				String origenPuntoVentaId = getStringValue(req.getParameter("origenPuntoventaId"));				
				String comentarios = getStringValue(req.getParameter("comentarios"));
				
				if(montoTraspaso.isEmpty())
					montoTraspaso = "0";
				
				if(vParam(detalleId) && vParam(comentarios) && vParam(montoTraspaso)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){
						try{
							Long detalleIdLong = Long.valueOf(detalleId);							
							CampanaDetalle detalle = getServiceLocator().getCampanaDetalleService().loadEntity(CampanaDetalle.class, detalleIdLong);
							
							PuntoVenta puntoVenta = detalle.getPuntoVenta();							
							
							// Inicia registro de llamada
							LlamadaId id = new LlamadaId();
							id.setDetalleId(detalleIdLong);
							id.setCorrLlamada(getServiceLocator().getLlamadaService().getCorrelativoLlamada(detalleIdLong));
							
							RespuestaLlamada respuesta = getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.valueOf(respuestaId));
							
							Llamada llamada = getServiceLocator().getLlamadaService().loadEntity(Llamada.class, id);
							llamada.setComentarios(comentarios);
							llamada.setReferencia(referencia);
							llamada.setTelefonoLlamado(Integer.valueOf(telefonoLlamado));
							llamada.setReceptorLlamada(getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.valueOf(receptorId)));
							llamada.setRespuestaLlamada(respuesta);
							llamada.setEmpresaId(getEmpresaId());
							
							llamada.setFechahoraFin(new Date());
							
							getServiceLocator().getLlamadaService().updateEntity(llamada);
							HibernateUtil.flushSession();
							// Fin
																							
							if(respuesta.getGeneraLlamada()){
								detalle.setEstatus(CampanaDetalle.ASIGNADA);
								detalle.setFechaProgramada(getParseDateLong(fechaProgramada));
							} else {
								detalle.setEstatus(CampanaDetalle.COMPLETADO);
							}														
																											
							getServiceLocator().getCampanaDetalleService().updateEntity(detalle);
							HibernateUtil.flushSession();																
							
							puntoVenta.setUltimaRespuesta(respuesta);
							getServiceLocator().getPuntoVentaService().updateEntity(puntoVenta);
							HibernateUtil.flushSession();
							
							BigDecimal montoTraspasoBg = new BigDecimal(montoTraspaso);
							
							// Si no genera llamada y el monto de traspaso es mayor a cero crear llamada de venta
							if(!respuesta.getGeneraLlamada() && montoTraspasoBg.intValue() > 0) {
								
								if(vParam(origenPuntoVentaId)) {
									PuntoVenta puntoOrigen = getServiceLocator().getPuntoVentaService().getPuntoVentaByPuntoventaId(origenPuntoVentaId, getEmpresaId());
									
									BigDecimal saldoOrigen = puntoOrigen.getSaldo();									
									
									if(montoTraspasoBg.compareTo(saldoOrigen) <= 0) {																
										// Inicia registro de llamada de venta
										LlamadaVentaId idVenta = new LlamadaVentaId();
										idVenta.setDetalleId(detalleIdLong);
										idVenta.setCorrLlamada((getServiceLocator().getLlamadaVentaService().getCorrelativoLlamadaVenta(detalleIdLong) + 1));
										
										LlamadaVenta llamadaVenta = new LlamadaVenta();
										llamadaVenta.setId(idVenta);
										llamadaVenta.setComentarios(comentarios);
										llamadaVenta.setMontoTraspaso(montoTraspasoBg);
										llamadaVenta.setOrigenPuntoventaId(origenPuntoVentaId);
										llamadaVenta.setDestinoPuntoventaId(puntoVenta.getPuntoventaId());
										llamadaVenta.setFechaLlamada(new Date());
										llamadaVenta.setEmpresaId(getEmpresaId());
										
										getServiceLocator().getLlamadaVentaService().saveEntity(llamadaVenta);
										HibernateUtil.flushSession();
										// Fin																
										
										isSuccess = true;
										msg = CREATE;
										
										/*// Se crea traslado
										// ---->
										// ---->								
										Traslado traslado = new Traslado();
										traslado.setEmpresaId(getEmpresaId());
										traslado.setFechahora(new Date());
										traslado.setPuntoDestinoId(puntoDestino.getPuntoventaId());
										traslado.setPuntoOrigenId(puntoOrigen.getPuntoventaId());
										traslado.setMontoAntesDestino(saldoDestino);
										traslado.setMontoAntesOrigen(saldoOrigen);
										traslado.setMontoDespuesOrigen(saldoOrigen.subtract(montoTraspasoBg)); // Saldo origen menos monto traslado
										traslado.setMontoTransf(montoTraspasoBg);
										traslado.setMontoDespuesDestino(saldoDestino.add(montoTraspasoBg)); // Saldo destion mas monto traslado
																		
										getServiceLocator().getTrasladoService().saveEntity(traslado);
										
										// Se actualiza saldo en origen
										puntoOrigen.setSaldo(saldoOrigen.subtract(montoTraspasoBg));
										puntoOrigen.setSaldoFechahora(new Date());
										getServiceLocator().getPuntoVentaService().updateEntity(puntoOrigen);
										
										// Se actualiza saldo en destino
										puntoDestino.setSaldo(saldoDestino.add(montoTraspasoBg));
										puntoDestino.setSaldoFechahora(new Date());
										getServiceLocator().getPuntoVentaService().updateEntity(puntoDestino);
										HibernateUtil.flushSession();*/																																								
										
									} else {
										isSuccess = false;
										msg = AMOUNT_NOT_AVAILABLE;
									}	
								} else {
									isSuccess = false;
									msg = PARAM_NECESARIOS;
								}
							}																																							
							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("finalizarLlamadaVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("finalizarLlamadaVenta", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}						
					} else {
						isSuccess = false;
						msg = FALTA_PERMISOS;
					}
				} else {
					isSuccess = false;
					msg = PARAM_NECESARIOS;
				}
			} else {
				isSuccess = false;
				msg = SESION_EXPIRADA;
			}
			
			result.put("isSuccess", isSuccess);
			result.put("permiso", permiso);
			result.put("msg", msg);			
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("finalizarLlamadaVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}