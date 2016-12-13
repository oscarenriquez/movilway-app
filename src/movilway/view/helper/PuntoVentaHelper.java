package movilway.view.helper;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import movilway.dao.domain.PuntoVenta;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class PuntoVentaHelper extends ServicioHelper {

	public void comboBoxPuntosDeVenta (HttpServletRequest req, HttpServletResponse resp, int key) throws ServletException, IOException {		
		try{
			setDefaultValues(req, key);
			JSONObject result = new JSONObject();
			JSONObject formulario = new JSONObject();
			Boolean isSuccess = true;
			Boolean permiso = false;
			String msg = "";
			
			if(getSession() != null){												
				permiso = pageAcceso(req, getServicesid(), getContext());
				if(permiso){						
					try{
						String paisId = getNumberValue(req.getParameter("paisId"));
						String estadoId = getNumberValue(req.getParameter("estadoId"));
						String provinciaId = getNumberValue(req.getParameter("provinciaId"));
						JSONArray lista = new JSONArray();										
						List<PuntoVenta> listaPuntosVenta = getServiceLocator().getPuntoVentaService().getListaPuntosVentaByPaisEstadoRegion(Long.valueOf(paisId), Long.valueOf(estadoId), Long.valueOf(provinciaId));
						JSONObject seleccione = new JSONObject();
						seleccione.put("ID", "");
						seleccione.put("DESCRIPCION", "-- seleccione --");
						lista.add(seleccione);
						for(PuntoVenta puntoVenta : listaPuntosVenta) {
							JSONObject jsObj = new JSONObject();
							DecimalFormat df = new DecimalFormat("###,###,###,###.##");
							String label = puntoVenta.getRegionProvincia().getDescripcion() + " - "+ puntoVenta.getDescripcion().toUpperCase() + " -  Q " + df.format(puntoVenta.getSaldo());
							jsObj.put("ID", puntoVenta.getPuntoventaId());
							jsObj.put("DESCRIPCION", label);
							lista.add(jsObj);
						}
						formulario.put("comboBox", lista);
					} catch (InfraestructureException ie) {
						try {
							HibernateUtil.rollbackTransaction();
						} catch (InfraestructureException e) {
							e.printStackTrace();
						}
						getAlerta().enviarAlerta("comboBoxPuntosDeVenta", ie, getUsuarioBean(),  EMAIL);
						ie.printStackTrace();
						msg = DISABLED_BD;
						isSuccess = false;
					} catch (Exception e){
						getAlerta().enviarAlerta("comboBoxPuntosDeVenta", e, getUsuarioBean(),  EMAIL);
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
			result.put("formulario", formulario);
			
			printJson(resp, result);
		} catch(Exception e){
			e.printStackTrace();
			getAlerta().enviarAlerta("comboBoxPuntosDeVenta", e, getUsuarioBean(), ServicioHelper.EMAIL);
		}
	}
}
