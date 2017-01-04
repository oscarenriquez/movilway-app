package movilway.view.helper;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.commons.compress.utils.IOUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import movilway.dao.domain.Agente;
import movilway.dao.domain.ArchivoSaldos;
import movilway.dao.domain.Campana;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.domain.HistoricoSaldos;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.domain.TipoCampana;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONObject;

import static movilway.service.util.FechaHoraUtil.*;

@SuppressWarnings("serial")
public class UploadExcelHelper extends ServicioHelper {

	public void dispacherMenuArchivoSaldos(HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/cargaExcel.jsp");
	}

	public void cargarArchivoSaldosExcel(HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		try {
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONObject resumen = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";

			if (getSession() != null) {
				Part part = req.getPart("file");
				String texto = getStringValue(req.getParameter("texto"));
				String[] agentes = req.getParameterValues("agentes");
				if (part != null && vParam(texto)) {
					permiso = pageAcceso(req, getServicesid(), getContext());
					if (permiso) {
						try {
							// ACTUALIZA SALDOS Y CREA HISTORICO DE SALDOS
							List<HistoricoSaldos> lista = crearHistoricoSaldos(part.getInputStream());
							
							List<PuntoVenta> listaPuntoVenta = new ArrayList<>();
							String fileName = getFileName(part);
							Integer numLinea = lista.size();
							
							resumen.put("nombreArchivo", fileName);
							resumen.put("registrosProcesados", numLinea);
							
							final InputStream is = part.getInputStream();

							ArchivoSaldos archivoSaldos = new ArchivoSaldos();
							archivoSaldos.setArchivo(IOUtils.toByteArray(is));
							archivoSaldos.setEmpresaId(getEmpresaId());
							archivoSaldos.setFechahoraCarga(new Date());
							archivoSaldos.setNombreArchivo(fileName);
							archivoSaldos.setNumLinea(numLinea);
							archivoSaldos.setTexto(texto);
							archivoSaldos.setUsuarioCarga(getUsuarioBean());
							
							for(HistoricoSaldos historicoSaldos : lista) {
								archivoSaldos.addHistoricoSaldos(historicoSaldos);
								
								// OBTIENE LISTA DE PUNTOS DE VENTAS QUE GENERAN CAMPANA
								PuntoVenta puntoVenta = historicoSaldos.getPuntoVenta(); 
								if(puntoVenta.generaOrden()){
									listaPuntoVenta.add(puntoVenta);
								}
							}

							
							getServiceLocator().getArchivoSaldosService().saveEntity(archivoSaldos);
							HibernateUtil.flushSession();
							msg = FILE_SAVED;
							
							if(listaPuntoVenta.size() > 0) { // SI EXISTEN PUNTOS DE VENTAS PARA CAMPANA
								// OBTIENE CAMPANA DE ABASTECIMIENTO
								TipoCampana tipoCampana = getServiceLocator().getTipoCampanaService().getTipoCampanaAbastecimiento(getEmpresaId(), getBundle().getString("movilway.campana.abastecimiento.descripcion"));
								if(tipoCampana == null)
									throw new IllegalArgumentException(ABAST_UNAVAILABLE);																
								
								Campana campana = getServiceLocator().getCampanaService().getCampanaAbastecimientoActiva(getEmpresaId(), Campana.ASIGNADA, tipoCampana.getTipocampanaId());																
								
								if(campana == null) { // SI NO EXISTE SE CREA LA CAMPANA
									Calendar fechahoraFinal = Calendar.getInstance();
									fechahoraFinal.add(Calendar.DAY_OF_MONTH, Integer.valueOf(getBundle().getString("movilway.campana.automatica.diasVigencia")));								
									campana = new Campana();
									campana.setFechahoraInicio(new Date());
									campana.setFechahoraFin(fechahoraFinal.getTime());
									campana.setEstatus(Campana.EN_ESPERA);
									campana.setObservaciones(getBundle().getString("movilway.campana.abastecimiento.observaciones") + " #"+fileName+" #" +getFechaLarga(Calendar.getInstance()));
									campana.setUserId(getUsuarioId());								
									campana.setTipoCampana(tipoCampana);
									
									Long campanaId = getServiceLocator().getCampanaService().saveUpdateEntity(campana);
									HibernateUtil.flushSession();
									
									campana = getServiceLocator().getCampanaService().loadEntity(Campana.class, campanaId);
								}								
								
								// CREACION DE DETALLE Y ASIGNACION								
								List<Agente> listaAgentes = getListaAgentes(agentes);
								int numAgentes = listaAgentes.size(), i = 0;
								Collections.sort(listaPuntoVenta, PuntoVenta.BY_SALDO);
								
								for(PuntoVenta puntoVenta : listaPuntoVenta) {
									CampanaDetalle campanaDetalle = new CampanaDetalle();
									campanaDetalle.setPuntoVenta(puntoVenta);
									campanaDetalle.setEstatus(CampanaDetalle.ASIGNADA);									
									campanaDetalle.setAgente(listaAgentes.get(i));									
									
									if(!campana.existeEnCampana(campanaDetalle)) { // SI NO EXISTE
										campana.addCampanaDetalle(campanaDetalle); // SE AGREGA A LA CAMPANA
										
										i++;
										if(i == numAgentes)
											i = 0;
									}
								}
								campana.setEstatus(Campana.ASIGNADA);
								getServiceLocator().getCampanaService().updateEntity(campana);
								HibernateUtil.flushSession();
								
								resumen.put("generaOrden", true);
								resumen.put("ordenesLlamada", listaPuntoVenta.size());
								resumen.put("campanaObservaciones", campana.getObservaciones());
								resumen.put("campanaFechaInicio", getStringDate(campana.getFechahoraInicio()));
							} else {
								resumen.put("generaOrden", false);
							}

						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("cargarArchivoSaldosExcel", ie, getUsuarioBean(), EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (IllegalArgumentException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							msg = ie.getMessage();
							isSuccess = false;
						} catch (Exception ex) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("cargarArchivoSaldosExcel", ex, getUsuarioBean(), EMAIL);
							ex.printStackTrace();
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
			result.put("resumen", resumen);
			result.put("permiso", permiso);
			result.put("msg", msg);

			printJson(resp, result);
		} catch (Exception e) {
			e.printStackTrace();
			getAlerta().enviarAlerta("cargarArchivoSaldosExcel", e, getUsuarioBean(), ServicioHelper.EMAIL);
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

	private String getFileName(final Part part) {
		for (String content : part.getHeader("content-disposition").split(Pattern.quote(";"))) {
			if (content.trim().startsWith("filename")) {
				return content.substring(content.indexOf('=') + 1).trim().replace("\"", "").trim();
			}
		}
		return null;
	}

	private List<HistoricoSaldos> crearHistoricoSaldos(final InputStream is)	throws IllegalArgumentException, InfraestructureException {
		List<HistoricoSaldos> lista = new ArrayList<>();

		StringTokenizer headersToken = new StringTokenizer(getBundle().getString("movilway.archivoexcel.saldos.cabecera"), Pattern.quote("|"));
		Integer numCols = Integer.valueOf(getBundle().getString("movilway.archivoexcel.saldos.columnas"));
		String keyColSaldo = getBundle().getString("movilway.archivoexcel.saldos.colSaldo");
		String keyColPuntoVenta = getBundle().getString("movilway.archivoexcel.saldos.colPuntoVenta");
		
		if (numCols == headersToken.countTokens()) {

			Map<Integer, String> headers = new HashMap<>();
			for (int i = 0; headersToken.hasMoreTokens(); i++) {
				headers.put(i, headersToken.nextToken());
			}

			List<Map<String, Object>> mapas = new ArrayList<>();
			
			try (POIFSFileSystem fs = new POIFSFileSystem(is); HSSFWorkbook wb = new HSSFWorkbook(fs)) {				
				if (wb != null) {
					HSSFSheet sheet = wb.getSheetAt(0);
					Iterator<?> rows = sheet.rowIterator();
					while (rows.hasNext()) {
						Map<String, Object> mapa = new HashMap<>();
						HSSFRow row = (HSSFRow) rows.next();						
						Iterator<?> cells = row.cellIterator();
						for(int i = 0; cells.hasNext(); i++) {
							HSSFCell cell = (HSSFCell) cells.next();							
							switch (cell.getCellType()) {
							case HSSFCell.CELL_TYPE_NUMERIC:
								mapa.put(headers.get(i), cell.getNumericCellValue());
								break;
							case HSSFCell.CELL_TYPE_STRING:
								mapa.put(headers.get(i), cell.getStringCellValue());							
								break;
							case HSSFCell.CELL_TYPE_BOOLEAN:
								mapa.put(headers.get(i), cell.getBooleanCellValue());
								break;
							case HSSFCell.CELL_TYPE_BLANK:								
								break;
							default:
								mapa.put(headers.get(i), cell.getDateCellValue());
								break;
							}
						}
						
						if(mapa.keySet().size() == numCols && mapa.get(keyColSaldo).toString().matches("\\d+(\\.\\d{1,2})?")) {
							mapas.add(mapa);
						}
					}
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
			
			for(Map<String, Object> mapa : mapas) {
				Number numSaldo = null;
				String strNumSaldo = null;
				if(mapa.get(keyColSaldo) instanceof Number){
					numSaldo = (Number) mapa.get(keyColSaldo);
				} else {
					strNumSaldo = mapa.get(keyColSaldo).toString();
					numSaldo = Double.valueOf(strNumSaldo);
				}
				String puntoventaId = (String) mapa.get(keyColPuntoVenta);
				PuntoVenta puntoVenta = getServiceLocator().getPuntoVentaService().getPuntoVentaByPuntoventaId(puntoventaId, getEmpresaId());
				if(puntoVenta != null && numSaldo != null) {
					BigDecimal saldo = new BigDecimal(numSaldo.doubleValue());					
					
					puntoVenta.setSaldo(saldo);
					puntoVenta.setSaldoFechahora(new Date());
					getServiceLocator().getPuntoVentaService().updateEntity(puntoVenta);
					HibernateUtil.flushSession();
					
					HistoricoSaldos historicoSaldos = new HistoricoSaldos();
					historicoSaldos.setPuntoVenta(puntoVenta);
					historicoSaldos.setPuntoventaId(puntoventaId);
					historicoSaldos.setEmpresaId(getEmpresaId());
					historicoSaldos.setFechaSaldo(new Date());
					historicoSaldos.setSaldo(saldo);
					lista.add(historicoSaldos);
				}				
			}
			
			return lista;
		} else {
			throw new IllegalArgumentException("El numero de columnas del archivo no coincide con el formato esperado !");
		}
	}

}
