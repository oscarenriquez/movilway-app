package movilway.view.helper;

import static movilway.service.util.FechaHoraUtil.getFormatDateLong;
import static movilway.service.util.FechaHoraUtil.getParseDateLong;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Agente;
import movilway.dao.domain.Campana;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.domain.TipoCampana;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class GeneraCampanaHelper extends ServicioHelper {

	public void dispacherMenuGeneraCampana(HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/generaCampana.jsp");
	}
	
	public void dispacherMenuCampanas(HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/campanas.jsp");
	}
	
	public void generaCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String tipoCampana = getNumberValue(req.getParameter("tipoCampana"));
				String observaciones = getStringValue(req.getParameter("observaciones"));
				String fechaHoraInicio = getStringValue(req.getParameter("fechaHoraInicio"));
				String fechaHoraFin = getStringValue(req.getParameter("fechaHoraFin"));
				String[] tipoPuntoVenta = req.getParameterValues("tipoPuntoVenta");
				String puntoVentaSuperior = getStringValue(req.getParameter("puntoVentaSuperior"));
				String nivel = getStringValue(req.getParameter("nivel"));
				String saldoMin = getStringValue(req.getParameter("saldoMin"));
				String saldoMax = getStringValue(req.getParameter("saldoMax"));
				String saldoFechaHoraInicio = getStringValue(req.getParameter("saldoFechaHoraInicio"));
				String saldoFechaHoraFinal = getStringValue(req.getParameter("saldoFechaHoraFinal"));
				String puntoAbastecimientoMin = getStringValue(req.getParameter("puntoAbastecimientoMin"));
				String puntoAbastecimientoMax = getStringValue(req.getParameter("puntoAbastecimientoMax"));
				String[] paises = req.getParameterValues("paises");
				String[] estados = req.getParameterValues("estados");
				String[] provincias = req.getParameterValues("provincias");
				String[] regiones = req.getParameterValues("regionProvincia");
				String[] respuestas = req.getParameterValues("respuestas");
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){	
					if(vParam(tipoCampana) && vParam(observaciones) && vParam(fechaHoraFin) && vParam(fechaHoraInicio)){
						try{
							int cant = 0;
							Date saldoFechaInicio = null;
							Date saldoFechaFin = null;
							BigDecimal abastMin = null;
							BigDecimal abastMax = null;
							BigDecimal saldoMinbg = null;
							BigDecimal saldoMaxbg = null;
							
							if(!saldoFechaHoraInicio.isEmpty() && saldoFechaHoraInicio.length() == 16){
								saldoFechaInicio = getParseDateLong(saldoFechaHoraInicio);
							}
							
							if(!saldoFechaHoraFinal.isEmpty() && saldoFechaHoraFinal.length() == 16){
								saldoFechaFin = getParseDateLong(saldoFechaHoraFinal);
							}
													
							if(!puntoAbastecimientoMin.isEmpty()) {
								try {
									abastMin = new BigDecimal(puntoAbastecimientoMin);									
								} catch (Exception unused) {}								
							}
							
							if(!puntoAbastecimientoMax.isEmpty()) {
								try {								
									abastMax = new BigDecimal(puntoAbastecimientoMax);
								} catch (Exception unused) {}								
							}

							if(!saldoMin.isEmpty()) {
								try {
									saldoMinbg = new BigDecimal(saldoMin);									
								} catch (Exception unused) {}								
							}														
							
							if(!saldoMax.isEmpty()) {
								try {									
									saldoMaxbg = new BigDecimal(saldoMax);
								} catch (Exception unused) {}								
							}
							
							List<PuntoVenta> listaPuntoVenta = getServiceLocator().getPuntoVentaService().getListaPuntoVentaFiltered(getEmpresaId(), tipoPuntoVenta, puntoVentaSuperior, nivel, 
									saldoMinbg, saldoMaxbg, saldoFechaInicio, saldoFechaFin, abastMin, abastMax, paises, estados, provincias, regiones, respuestas);
							Campana campana = new Campana();
							
							campana.setEstatus(Campana.EN_ESPERA);
							campana.setFechahoraInicio(getParseDateLong(fechaHoraInicio));
							campana.setFechahoraFin(getParseDateLong(fechaHoraFin));
							campana.setObservaciones(observaciones);
							campana.setTipoCampana(getServiceLocator().getTipoCampanaService().loadEntity(TipoCampana.class, Long.valueOf(tipoCampana)));
							campana.setUserId(getUsuarioId());
							
							Long campanaId = getServiceLocator().getCampanaService().saveUpdateEntity(campana);
							HibernateUtil.flushSession();
							
							campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, campanaId);
							
							JSONArray array = new JSONArray();
							for(PuntoVenta puntoVenta : listaPuntoVenta) {							
								CampanaDetalle campanaDetalle = new CampanaDetalle();
								campanaDetalle.setPuntoVenta(puntoVenta);
								campanaDetalle.setEstatus(CampanaDetalle.EN_ESPERA);									
								campanaDetalle.setAgente(null);									
								campana.addCampanaDetalle(campanaDetalle);
								
								JSONArray ja = new JSONArray();
								ja.add(puntoVenta.getPuntoventaId());
								ja.add(puntoVenta.getDescripcion());
								ja.add(puntoVenta.getDireccion());
								ja.add(df.format(puntoVenta.getSaldo()));
								ja.add(getFormatDateLong(puntoVenta.getSaldoFechahora()));
								ja.add(df.format(puntoVenta.getPuntoAbastecimiento()));
								array.add(ja);
								cant++;
							}
							
							getServiceLocator().getCampanaService().updateEntity(campana);
							HibernateUtil.flushSession();
							
							result.put("campanaId", campanaId);
							result.put("detalle", array);
							result.put("cant", cant);
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("generaCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("generaCampana", e, getUsuarioBean(),  EMAIL);
							e.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						}
					} else {
						isSuccess = false;
						msg = PARAM_NECESARIOS;
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
			getAlerta().enviarAlerta("generaCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void confirmarCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String campanaId = getNumberValue(req.getParameter("campanaId"));
				String[] agentes = req.getParameterValues("agentes");
				if(vParam(campanaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							List<Agente> listaAgentes = getListaAgentes(agentes);
							int numAgentes = listaAgentes.size(), i = 0;
							
							Campana campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, Long.valueOf(campanaId));
							
							if(campana != null){
								List<CampanaDetalle> listaDetalles = new ArrayList<>(campana.getCampanaDetalles());
								Collections.sort(listaDetalles, CampanaDetalle.BY_SALDO);
								
								for(CampanaDetalle campanaDetalle : listaDetalles) {
									campanaDetalle.setEstatus(CampanaDetalle.ASIGNADA);									
									campanaDetalle.setAgente(listaAgentes.get(i));									
									i++;
									if(i == numAgentes)
										i = 0;
								}
								
								campana.setEstatus(Campana.ASIGNADA);
								getServiceLocator().getCampanaService().updateEntity(campana);
								HibernateUtil.flushSession();
								
								msg = CREATE;
								isSuccess = true;
							} else {
								isSuccess = false;
								msg = DISABLED_BD;
							}							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("confirmarCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("confirmarCampana", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("confirmarCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void cancelarCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String campanaId = getNumberValue(req.getParameter("campanaId"));				
				if(vParam(campanaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Campana campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, Long.valueOf(campanaId));
							if(campana != null) {								
								getServiceLocator().getCampanaService().deleteEntity(campana);
								HibernateUtil.flushSession();
								isSuccess = true;
								msg = DELETE;
							}
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("cancelarCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("cancelarCampana", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("cancelarCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void reasignarCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String campanaId = getNumberValue(req.getParameter("campanaId"));
				String agente = getNumberValue(req.getParameter("agente"));
				String[] agentes = req.getParameterValues("agentes");
				if(vParam(campanaId) && vParam(agente)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							List<Agente> listaAgentes = getListaAgentes(agentes);
							int numAgentes = listaAgentes.size(), i = 0;
							
							Campana campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, Long.valueOf(campanaId));
							
							if(campana != null){
								List<CampanaDetalle> listaDetalles = getServiceLocator().getCampanaDetalleService().getListaCampanaDetalleByAgente(Long.valueOf(agente), CampanaDetalle.ASIGNADA);
								Collections.sort(listaDetalles, CampanaDetalle.BY_SALDO);
								
								for(CampanaDetalle campanaDetalle : listaDetalles) {																	
									campanaDetalle.setAgente(listaAgentes.get(i));
									campanaDetalle.setEstatus(CampanaDetalle.ASIGNADA);
									i++;
									if(i == numAgentes)
										i = 0;
								}
																
								getServiceLocator().getCampanaService().updateEntity(campana);
								HibernateUtil.flushSession();
								
								isSuccess = true;
								msg = UPDATE;
							} else {
								isSuccess = false;
								msg = DISABLED_BD;
							}							
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("reasignarCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("reasignarCampana", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("reasignarCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void finalizarCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String campanaId = getNumberValue(req.getParameter("campanaId"));				
				if(vParam(campanaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Campana campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, Long.valueOf(campanaId));
							if(campana != null) {
								Set<CampanaDetalle> detalles = campana.getCampanaDetalles();
								
								for(CampanaDetalle detalle : detalles) {
									if(!detalle.getEstatus().equals(CampanaDetalle.COMPLETADO) && !detalle.getEstatus().equals(CampanaDetalle.CANCELADO))
										detalle.setEstatus(CampanaDetalle.CANCELADO);									
								}
								
								campana.setEstatus(CampanaDetalle.COMPLETADO);
								
								getServiceLocator().getCampanaService().updateEntity(campana);
								HibernateUtil.flushSession();
								
								isSuccess = true;
								msg = UPDATE;
							}
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("finalizarCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("finalizarCampana", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("finalizarCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void detalleCampana (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String campanaId = getNumberValue(req.getParameter("campanaId"));				
				if(vParam(campanaId)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Campana campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, Long.valueOf(campanaId));
							if(campana != null) {
								List<CampanaDetalle> detalles = new ArrayList<>(campana.getCampanaDetalles());
								if(campana.getEstatus().equals(Campana.ASIGNADA)){
									Collections.sort(detalles, CampanaDetalle.BY_AGENTE);
								} else {
									Collections.sort(detalles, CampanaDetalle.BY_SALDO);
								}
								
								int cant = 0;
								JSONArray array = new JSONArray();
								for(CampanaDetalle detalle : detalles) {									
									PuntoVenta puntoVenta = detalle.getPuntoVenta();
									JSONArray ja = new JSONArray();
									ja.add(puntoVenta.getPuntoventaId());
									ja.add(puntoVenta.getDescripcion());
									ja.add(puntoVenta.getDireccion());
									ja.add(df.format(puntoVenta.getSaldo()));
									ja.add(getFormatDateLong(puntoVenta.getSaldoFechahora()));
									ja.add(df.format(puntoVenta.getPuntoAbastecimiento()));
									Agente agente = detalle.getAgente(); 
									ja.add(agente == null ? "--"  : agente.getNombre());
									array.add(ja);
									cant++;
								}
								
								result.put("campanaId", campanaId);
								result.put("detalle", array);
								result.put("cant", cant);
							}
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("finalizarCampana", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("finalizarCampana", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("finalizarCampana", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	public void listaCampanas (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){												
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{						
						List<Campana> listaCampanas = getServiceLocator().getCampanaService().getListaCampanas(getEmpresaId());
						JSONArray lista = new JSONArray();
						for(Campana campana : listaCampanas) {
							List<Map<String, Object>> options = new ArrayList<>();														
							Map<String, Object> option = null;
							
							if(campana.getEstatus().equals(Campana.EN_ESPERA)) {
								option = new HashMap<>();
								option.put("icon", ICON_USER);
								option.put("params", "CampanaCtrl.fnAsignarAgente("+campana.getCampanaId()+")");
								option.put("label", "Asignar Agentes");
								options.add(option);
								
								option = new HashMap<>();
								option.put("icon", ICON_ELIMINAR);
								option.put("params", "CampanaCtrl.fnEliminarCampana("+campana.getCampanaId()+")");
								option.put("label", "Eliminar");
								options.add(option);
							}
							
							if(campana.getEstatus().equals(Campana.ASIGNADA)) {
								option = new HashMap<>();
								option.put("icon", ICON_EDITAR);
								option.put("params", "CampanaCtrl.fnReAsignarAgente("+campana.getCampanaId()+")");
								option.put("label", "Re-asignar");
								options.add(option);
								
								option = new HashMap<>();
								option.put("icon", ICON_AUTORIZA);
								option.put("params", "CampanaCtrl.fnFinalizarCampana("+campana.getCampanaId()+")");
								option.put("label", "Finalizar");
								options.add(option);
							}
									
							option = new HashMap<>();
							option.put("icon", ICON_DETALLE);
							option.put("params", "CampanaCtrl.fnDetalleCampana("+campana.getCampanaId()+")");
							option.put("label", "Ver Detalles");
							options.add(option);							
							
							JSONArray array = new JSONArray();														
							
							array.add(getHtmlLink(options));
							array.add(campana.getTipoCampana().getDescripcion());
							array.add(campana.getEstatus());
							array.add(campana.getObservaciones());
							array.add(getFormatDateLong(campana.getFechahoraInicio()));
							array.add(getFormatDateLong(campana.getFechahoraFin()));
							lista.add(array);
						}
						result.put("lista", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("listaCampanas", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("listaCampanas", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("listaCampanas", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	private List<Agente> getListaAgentes(String[] agentes) throws InfraestructureException {
		List<Agente> listaAgentes = new ArrayList<>();
		for(String agente : agentes) {
			Agente a = getServiceLocator().getAgenteService().loadEntity(Agente.class, Long.valueOf(agente));
			if(a != null && a.getEstatus()) {
				listaAgentes.add(a);
			}
		}
		return listaAgentes;
	}
}
