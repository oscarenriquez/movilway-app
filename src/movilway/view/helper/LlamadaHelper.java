package movilway.view.helper;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.Llamada;
import movilway.dao.domain.ReceptorLlamada;
import movilway.dao.domain.RespuestaLlamada;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class LlamadaHelper extends ServicioHelper {

	public void crearLlamada (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){
				String comentarios = getStringValue(req.getParameter("comentarios"));								
				String receptorId = getNumberValue(req.getParameter("receptorId"));
				String respuestaId = getNumberValue(req.getParameter("respuestaId"));
				String telefonoLlamado = getNumberValue(req.getParameter("telefonoLlamado"));
				if(vParam(comentarios) && vParam(respuestaId) && vParam(receptorId) && vParam(telefonoLlamado)){
					permiso = pageAcceso(req, getServicesid(), getContext());
					if(permiso){						
						try{
							Date fechahoraInicio = (Date) getSession().getAttribute("fechahoraInicio");
							if(fechahoraInicio != null){
								Llamada llamada = new Llamada();
								llamada.setComentarios(comentarios);
								llamada.setFechahoraInicio(fechahoraInicio);
								llamada.setFechahoraFin(new Date());
								llamada.setReceptorLlamada(getServiceLocator().getReceptorLlamadaService().loadEntity(ReceptorLlamada.class, Long.valueOf(receptorId)));
								llamada.setRespuestaLlamada(getServiceLocator().getRespuestaLlamadaService().loadEntity(RespuestaLlamada.class, Long.valueOf(respuestaId)));
								llamada.setTelefonoLlamado(Integer.valueOf(telefonoLlamado));
								getServiceLocator().getLlamadaService().saveEntity(llamada);
								msg = CREATE;
							} else {
								isSuccess = false;
								msg = PARAM_NECESARIOS;
							}
						} catch (InfraestructureException ie) {
							try {
								HibernateUtil.rollbackTransaction();
							} catch (InfraestructureException e) {
								e.printStackTrace();
							}
							getAlerta().enviarAlerta("crearLlamada", ie, getUsuarioBean(),  EMAIL);
							ie.printStackTrace();
							msg = DISABLED_BD;
							isSuccess = false;
						} catch (Exception e){
							getAlerta().enviarAlerta("crearLlamada", e, getUsuarioBean(),  EMAIL);
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
			getAlerta().enviarAlerta("crearLlamada", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
