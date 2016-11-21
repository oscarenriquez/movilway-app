package movilway.view.servlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import security.view.util.Mensajes;

@WebServlet(name = "MensajeServlet", urlPatterns = { "/Mensaje" }, loadOnStartup = 2)
public class MensajeServlet extends HttpServlet implements Servlet {
	private static final long serialVersionUID = 1L;
	private JSONObject result;
	private JSONArray array;

	public MensajeServlet() {
		super();
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.mensaje(request, response);
	}

	protected synchronized void mensaje(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String Msg = null;
		int ID = 0;
		Boolean IsSuccess = false;
		Boolean IsCaptcha = false;
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); 
		response.setHeader("Cache-Control","max-age=60,stale-while-revalidate=60"); 
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Last-Modified", dateFormat.format(new Date()));
		
		if (Mensajes._MSG.isActivo()) {
			// es de login 	
			if (Mensajes.MSGLOGIN.isActivo()) {
				Msg = Mensajes.MSGLOGIN.getMsg();
				Mensajes.MSGLOGIN.setActivo(false);
				Mensajes.MSGLOGIN.setMensajes(false, "");
				Mensajes._MSG.setMensajes(false, "");
				IsSuccess = true;

				// es captcha y no esta correcto		
			} else if (Mensajes._MSGCAPTCHA.isActivo()) {
				Msg = Mensajes._MSGCAPTCHA.getMsg();
				Mensajes._MSGCAPTCHA.setActivo(false);
				Mensajes._MSGCAPTCHA.setMensajes(false, "");
				Mensajes._MSG.setMensajes(false, "");
				IsCaptcha = true;
				IsSuccess = false;

				// es captcha y es correcto			
			} else if (!(Mensajes._MSGCAPTCHA.isActivo())) {
				Msg = Mensajes._MSGCAPTCHA.getMsg();
				Mensajes._MSGCAPTCHA.setActivo(false);
				Mensajes._MSGCAPTCHA.setMensajes(false, "");
				Mensajes._MSG.setMensajes(false, "");
				IsCaptcha = true;
				IsSuccess = true;
			} 
			
			if ((Mensajes._MSGERROR.isActivo())) {
				Msg = Mensajes._MSGERROR.getMsg();
				Mensajes._MSGERROR.setActivo(false);
				Mensajes._MSGERROR.setMensajes(false, "");
				Mensajes._MSG.setMensajes(false, "");
				IsCaptcha = false;
				IsSuccess = true;
			}

			Mensajes._MSG.setActivo(false);
		}

		result = new JSONObject();
		array = new JSONArray();
		array.add(ID);
		result.put("IsSuccess", IsSuccess);
		result.put("Msg", Msg);
		result.put("IsCaptcha", IsCaptcha);
		result.put("Data", array);
		response.setContentType("application/x-json;charset=UTF-8");
		response.setHeader("Cache-Control", "no-store");

		try {
			response.getWriter().print(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
