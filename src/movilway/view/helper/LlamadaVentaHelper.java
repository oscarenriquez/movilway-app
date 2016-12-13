package movilway.view.helper;

import java.io.IOException;
import java.math.BigDecimal;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.LlamadaVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class LlamadaVentaHelper extends ServicioHelper {

	public void crearLlamadaVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String comentarios = getStringValue(req.getParameter("comentarios"));								
				String destinoPuntoventaId = getNumberValue(req.getParameter("destinoPuntoventaId"));
				String origenPuntoventaId = getNumberValue(req.getParameter("origenPuntoventaId"));
				String montoTraspaso = getNumberValue(req.getParameter("montoTraspaso"));
				if(vParam(comentarios) && vParam(destinoPuntoventaId) && vParam(origenPuntoventaId) && vParam(montoTraspaso)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							LlamadaVenta llamadaVenta = new LlamadaVenta();
							llamadaVenta.setComentarios(comentarios);
							llamadaVenta.setDestinoPuntoventaId(destinoPuntoventaId);
							llamadaVenta.setOrigenPuntoventaId(origenPuntoventaId);
							llamadaVenta.setMontoTraspaso(new BigDecimal(montoTraspaso));
							getServiceLocator().getLlamadaVentaService().saveEntity(llamadaVenta);
							msg = CREATE;
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearLlamadaVenta", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearLlamadaVenta", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearLlamadaVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
