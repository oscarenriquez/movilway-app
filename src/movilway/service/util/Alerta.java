package movilway.service.util;

import java.util.Properties;
import java.util.ResourceBundle;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Alerta {

	private static final int MENSAJE_ALERTA = 1;
	private static String URL_DATABASE;

	public Alerta() {
		super();
	}
	
	public static String getCustomStackTrace(Throwable aThrowable,String urlApp) {
	    final StringBuilder result = new StringBuilder(urlApp+" ");
	    final String NEW_LINE = System.getProperty("line.separator");
	    result.append(NEW_LINE);
	    result.append(aThrowable.toString());
	    result.append(NEW_LINE);
	    
	    for (StackTraceElement element : aThrowable.getStackTrace() ){
	      result.append( element );
	      result.append( NEW_LINE );
	    }
	    return result.toString();
   }

	public void enviarAlerta(String proceso, String error, String email) {
		try {
			Transport.send(generaMensaje(proceso, error, email, MENSAJE_ALERTA));
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	public void enviarAlerta(String proceso, Throwable e, String usuario, String email) {

		StackTraceElement[] stack = e.getStackTrace();
		StringBuilder sb = new StringBuilder("Usuario: " + usuario);
		sb.append("\n");
		sb.append(e.toString());
		sb.append("\n");
		for (int i = 0; i < stack.length; i++) {
			sb.append(stack[i]).append("\n");
		}
		try {
			Transport.send(generaMensaje(proceso, sb.toString(), email, MENSAJE_ALERTA));
		} catch (MessagingException me) {
			me.printStackTrace();
		}
	}
	
	public void enviarAlerta(String proceso, Throwable e, String usuario, String email,String urlApp) {
		try {
			Transport.send(generaMensaje(proceso, getCustomStackTrace(e,urlApp), email, MENSAJE_ALERTA));
		} catch (MessagingException me) {
			me.printStackTrace();
		}
	}
	
	public static void enviarNotificacionSeguimiento(Message message) {
		try {
			Transport.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unused")
	private String getURL() {
		if (URL_DATABASE == null) {
			URL_DATABASE = "**" + System.getProperty("os.name").toString() + ", " +
			        System.getProperty("os.version").toString() + ", " +
			        System.getProperty("user.dir").toString() + ", " +
			        System.getProperty("user.home").toString() + ", " +
			        System.getProperty("user.name").toString();
		}
		return URL_DATABASE;
	}

	private MimeMessage generaMensaje(String proceso, String error, String email, int tipo) {
		ResourceBundle bundle = ResourceBundle.getBundle("alertmailMovilway");
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", bundle.getString("mail.smtp.host"));
		props.setProperty("mail.smtp.starttls.enable", bundle.getString("mail.smtp.starttls.enable"));
		props.setProperty("mail.smtp.port", bundle.getString("mail.smtp.port"));
		props.setProperty("mail.smtp.user", bundle.getString("mail.smtp.user"));
		props.setProperty("mail.smtp.auth", bundle.getString("mail.smtp.auth"));

		Session sessionmail = Session.getDefaultInstance(props);
		sessionmail.setDebug(false);

		MimeMessage message = new MimeMessage(sessionmail);
		try {
			message.setFrom(new InternetAddress(bundle.getString("mail.send.address")));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			message.setSubject(bundle.getString("mail.message.subject"));
			switch (tipo) {
				case MENSAJE_ALERTA:
					message.setText(bundle.getString("mail.message.head")
					        + bundle.getString("mail.message.line2")
					        + proceso
					        + bundle.getString("mail.message.line1")
					        + error
					        + bundle.getString("mail.message.line3")
					        + bundle.getString("mail.message.line4")
					        + bundle.getString("mail.message.line5")
					        + bundle.getString("mail.message.line6"),
					        "ISO-8859-1", "html");
					break;
			}
		} catch (MessagingException e) {
			System.out.println("Excepción al momento de intentar crear el mensaje, " + e.getMessage());
		}

		return message;
	}

}
