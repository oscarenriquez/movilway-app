package movilway.view.helper;

import java.io.IOException;
import java.math.BigDecimal;
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
import movilway.dao.domain.TipoCampana;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import movilway.dao.util.Utils;
import movilway.service.util.FechaHoraUtil;
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
								campana.put("fechahoraInicio", FechaHoraUtil.getFechaStringLarga(fechahoraInicio));
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
				if(vParam(campanaId) && vParam(amount)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							if(amount.equals("0")) {
								amount = "10";
							}
							Long campanaIdL = Long.valueOf(campanaId);
							Campana campana =  getServiceLocator().getCampanaService().loadEntity(Campana.class, campanaIdL);
							if(campana != null) {
								Boolean isVenta = campana.getTipoCampana().getId().equals(TipoCampana.VENTA);
								List<Politica> politicas = getServiceLocator().getPoliticaService().getListPoliticasByCampana(campanaIdL);
								List<CampanaDetalle> campDetalles = getServiceLocator().getCampanaService().getListaCampanaDetalle(campanaIdL, Integer.valueOf(amount), CampanaDetalle.ASIGNADA);
																						
								for( CampanaDetalle detalle : campDetalles ) {
									JSONObject obj = new JSONObject();
									PuntoVenta puntoVenta = detalle.getPuntoVenta();
									obj.put("isVenta", isVenta);
									obj.put("telefono", puntoVenta.getTelefono());
									obj.put("detalleId", detalle.getDetalleId());
									obj.put("contacto", puntoVenta.getContacto());
									obj.put("descripcion", puntoVenta.getDescripcion());
									obj.put("direccion", puntoVenta.getDireccion());
									obj.put("observaciones", puntoVenta.getObservaciones());
									obj.put("tipoPuntoVenta", puntoVenta.getTipoPuntoVenta().getDescripcion());
									obj.put("saldo", puntoVenta.getSaldo());
									obj.put("saldoFechahora", FechaHoraUtil.getFechaStringLarga(puntoVenta.getSaldoFechahora()));
									obj.put("puntoAbastecimiento", puntoVenta.getPuntoAbastecimiento());
									obj.put("pais", puntoVenta.getPais().getDescripcion());									
									obj.put("estado", puntoVenta.getEstado().getDescripcion());
									obj.put("provincia", puntoVenta.getProvincia().getDescripcion());
									obj.put("region", puntoVenta.getRegionProvincia().getDescripcion());
									obj.put("paisId", puntoVenta.getPais().getId());									
									obj.put("estadoId", puntoVenta.getEstado().getId());
									obj.put("provinciaId", puntoVenta.getProvincia().getId());
									obj.put("regionId", puntoVenta.getRegionProvincia().getId());
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
							id.setCorrLlamada(1);
							Llamada llamada = getServiceLocator().getLlamadaService().loadEntity(Llamada.class, id);
							if(llamada != null) {
								llamada.setFechahoraFin(new Date());
								getServiceLocator().getLlamadaService().updateEntity(llamada);
							} else {
								llamada = new Llamada();
								llamada.setId(id);
								llamada.setFechahoraInicio(new Date());
								llamada.setFechahoraFin(new Date());
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
				String telefonoLlamado = getNumberValue(req.getParameter("telefonoLlamado"));
				String referencia = getStringValue(req.getParameter("referencia"));
				if(vParam(detalleId) && vParam(receptorId) && vParam(respuestaId) && vParam(comentarios) && vParam(telefonoLlamado) && vParam(referencia)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							Long detalleIdLong = Long.valueOf(detalleId);														
							LlamadaId id = new LlamadaId();
							id.setDetalleId(detalleIdLong);
							id.setCorrLlamada(1);
							
							Llamada llamada = getServiceLocator().getLlamadaService().loadEntity(Llamada.class, id);
							llamada.setComentarios(comentarios);
							llamada.setReferencia(referencia);
							llamada.setTelefonoLlamado(Integer.valueOf(telefonoLlamado));
							llamada.setReceptorLlamada(getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.valueOf(receptorId)));
							llamada.setRespuestaLlamada(getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.valueOf(respuestaId)));
							
							llamada.setFechahoraFin(new Date());
							
							getServiceLocator().getLlamadaService().updateEntity(llamada);
							HibernateUtil.flushSession();
							
							CampanaDetalle detalle = getServiceLocator().getCampanaDetalleService().loadEntity(CampanaDetalle.class, detalleIdLong);
							detalle.setEstatus(CampanaDetalle.COMPLETADO);							
							getServiceLocator().getCampanaDetalleService().updateEntity(detalle);
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
	
	public void finalizarLlamadaVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();			
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String detalleId = getNumberValue(req.getParameter("detalleId"));
				String montoTraspaso = getNumberValue(req.getParameter("montoTraspaso"));
				String origenPuntoVentaId = getNumberValue(req.getParameter("origenPuntoVentaId"));
				String destinoPuntoVentaId = getNumberValue(req.getParameter("destinoPuntoVentaId"));
				String comentarios = getStringValue(req.getParameter("comentarios"));
				if(vParam(detalleId) && vParam(destinoPuntoVentaId) && vParam(origenPuntoVentaId) && vParam(comentarios) && vParam(montoTraspaso)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{							
							Long detalleIdLong = Long.valueOf(detalleId);														
							LlamadaVentaId id = new LlamadaVentaId();
							id.setDetalleId(detalleIdLong);
							id.setCorrLlamada(1);
							
							LlamadaVenta llamada = new LlamadaVenta();
							llamada.setId(id);
							llamada.setComentarios(comentarios);
							llamada.setMontoTraspaso(new BigDecimal(montoTraspaso));
							llamada.setOrigenPuntoventaId(origenPuntoVentaId);
							llamada.setDestinoPuntoventaId(destinoPuntoVentaId);
							
							getServiceLocator().getLlamadaVentaService().saveEntity(llamada);
							HibernateUtil.flushSession();
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