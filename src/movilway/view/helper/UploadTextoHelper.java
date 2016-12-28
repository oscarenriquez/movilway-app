package movilway.view.helper;

import static movilway.service.util.FechaHoraUtil.getFechaDateLarga;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.commons.compress.utils.IOUtils;

import movilway.dao.domain.ArchivoTraspasos;
import movilway.dao.domain.PuntoVenta;
import movilway.dao.domain.Traslado;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class UploadTextoHelper extends ServicioHelper {

	public void dispacherMenuArchivoTraspasos (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {
		dispacherController(req, resp, key, "/jsp/cargaTexto.jsp");
	}
	
	public void cargaArchivoTraspasosTexto (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONObject resumen = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				Part part = req.getPart("file");
				String texto = getStringValue(req.getParameter("texto"));
				if(part != null && vParam(texto)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{						
																					
							String fileName = getFileName(part);
							Integer numLinea = crearTraslados(part.getInputStream());
							
							resumen.put("nombreArchivo", fileName);
							resumen.put("registrosProcesados", numLinea);
							
							final InputStream is = part.getInputStream();
							
							ArchivoTraspasos archivoTraspasos = new ArchivoTraspasos();							
							archivoTraspasos.setArchivo(IOUtils.toByteArray(is));
							archivoTraspasos.setEmpresaId(getEmpresaId());
							archivoTraspasos.setFechahoraCarga(new Date());
							archivoTraspasos.setNombreArchivo(fileName);
							archivoTraspasos.setNumLinea(numLinea);
							archivoTraspasos.setTexto(texto);
							archivoTraspasos.setUsuarioCarga(getUsuarioBean());
							
							getServiceLocator().getArchivosTraspasosService().saveEntity(archivoTraspasos);
							HibernateUtil.flushSession();
							
							msg = FILE_SAVED;																			
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("cargaArchivoTraspasosTexto", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("cargaArchivoTraspasosTexto", e, getUsuarioBean(),  EMAIL);
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
			result.put("resumen", resumen);
			result.put("permiso", permiso);
			result.put("msg", msg);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("cargaArchivoTraspasosTexto", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
	
	private static List<String> getStringFromInputStream(InputStream is) {		 		
		List<String> lista = new ArrayList<>();
		String line;
		try(BufferedReader br = new BufferedReader(new InputStreamReader(is)) ) {			
			while ((line = br.readLine()) != null) {
				lista.add(line);
			}

		} catch (IOException e) {
			e.printStackTrace();
		} 
		return lista;

	}
	
	private String getFileName(final Part part) {	    	   
	    for (String content : part.getHeader("content-disposition").split(";")) {
	        if (content.trim().startsWith("filename")) {
	            return content.substring(content.indexOf('=') + 1).trim().replace("\"", "").trim();
	        }
	    }
	    return null;
	}
	
	private Integer crearTraslados(final InputStream is)	throws IllegalArgumentException, InfraestructureException {
		Integer num = 0;
		
		StringTokenizer headersToken = new StringTokenizer(getBundle().getString("movilway.archivotexto.traspasos.cabecera"), Pattern.quote("|"));
		Integer numCols = Integer.valueOf(getBundle().getString("movilway.archivotexto.traspasos.columnas"));
		
		String keyColFechahora = getBundle().getString("movilway.archivotexto.traspasos.colFechahora");
		String keyColMontoTrans = getBundle().getString("movilway.archivotexto.traspasos.colMontoTrans");
		String keyColPuntoVentaDestTel = getBundle().getString("movilway.archivotexto.traspasos.colTelDestino");
		String keyColPuntoVentaOriTel = getBundle().getString("movilway.archivotexto.traspasos.colTelOrigen");
		String keyColDestinoMontAntes = getBundle().getString("movilway.archivotexto.traspasos.colMontoAntesDestino");
		String keyColDestinoMontDespues = getBundle().getString("movilway.archivotexto.traspasos.colMontoDespuesDestino");
		String keyColOrigenMontAntes = getBundle().getString("movilway.archivotexto.traspasos.colPuntoAntesOrigen");
		String keyColOrigenMontDespues = getBundle().getString("movilway.archivotexto.traspasos.colMontoDespuesOrigen");
		
		if (numCols == headersToken.countTokens()) {

			Map<Integer, String> headers = new HashMap<>();
			for (int i = 0; headersToken.hasMoreTokens(); i++) {
				headers.put(i, headersToken.nextToken());
			}

			List<Map<String, String>> mapas = new ArrayList<>();
			List<String> listaString = getStringFromInputStream(is);
			
			num = listaString.size();
			for(String linea : listaString) {
				StringTokenizer tokens = new StringTokenizer(linea, "|");
				int i = 0;
				Map<String, String> mapa = new HashMap<>();
				while(tokens.hasMoreTokens()){					
					mapa.put(headers.get(i), tokens.nextToken());
					i++;
				}
				mapas.add(mapa);
			}
			
			for(Map<String, String> mapa : mapas) {																															
				String fechahora = mapa.get(keyColFechahora);
				String montoAntesDestino = mapa.get(keyColDestinoMontAntes);
				String montoAntesOrigen = mapa.get(keyColOrigenMontAntes);
				String montoDespuesDestino = mapa.get(keyColDestinoMontDespues);
				String montoDespuesOrigen = mapa.get(keyColOrigenMontDespues);
				String montoTransf = mapa.get(keyColMontoTrans);
				String telefonoOrigen = mapa.get(keyColPuntoVentaOriTel);
				String telefonoDestino = mapa.get(keyColPuntoVentaDestTel);
				
				if(montoAntesDestino.matches("\\d+(\\.\\d{1,2})?") 
						&& montoAntesOrigen.matches("\\d+(\\.\\d{1,2})?") 
						&& montoDespuesDestino.matches("\\d+(\\.\\d{1,2})?") 
						&& montoDespuesOrigen.matches("\\d+(\\.\\d{1,2})?")
						&& montoTransf.matches("\\d+(\\.\\d{1,2})?")) {					
						
					try  {
						PuntoVenta puntoVentaOrigen = getServiceLocator().getPuntoVentaService().getPuntoVentaByTelefono(Integer.valueOf(telefonoOrigen), getEmpresaId());
						PuntoVenta puntoVentaDestino = getServiceLocator().getPuntoVentaService().getPuntoVentaByTelefono(Integer.valueOf(telefonoDestino), getEmpresaId());
						if(puntoVentaOrigen != null && puntoVentaDestino != null) {
							Traslado traslado = new Traslado();
							traslado.setEmpresaId(getEmpresaId());
							traslado.setFechahora(getFechaDateLarga(fechahora));
							traslado.setMontoAntesDestino(new BigDecimal(montoAntesDestino));
							traslado.setMontoAntesOrigen(new BigDecimal(montoAntesOrigen));
							traslado.setMontoDespuesDestino(new BigDecimal(montoDespuesDestino));
							traslado.setMontoDespuesOrigen(new BigDecimal(montoDespuesOrigen));
							traslado.setMontoTransf(new BigDecimal(montoTransf));
							traslado.setPuntoDestinoId(puntoVentaDestino.getPuntoventaId());
							traslado.setPuntoOrigenId(puntoVentaOrigen.getPuntoventaId());
							
							getServiceLocator().getTrasladoService().saveEntity(traslado);							
						}						
					} catch (Exception ex) {
						ex.printStackTrace();
					}
					
					HibernateUtil.flushSession();
				}											
			}
			
			return num;
		} else {
			throw new IllegalArgumentException("El numero de columnas del archivo no coincide con el formato esperado !");
		}
	}
}
