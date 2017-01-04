package movilway.service.impl;

import java.io.File;
import java.util.List;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import security.dao.domain.LoginFallido;
import security.dao.domain.LoginLog;
import movilway.dao.UsuarioDao;
import movilway.dao.domain.Usuario;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.impl.UsuarioDaoHibernateImpl;
import movilway.service.UsuarioService;

public class UsuarioServiceImpl implements UsuarioService {

	private static UsuarioService usuarioService;
	private UsuarioDao usuarioDao;

	public UsuarioServiceImpl() {
		usuarioDao = UsuarioDaoHibernateImpl.build();
	}

	public static final UsuarioService build() {
		if (usuarioService == null) {
			usuarioService = new UsuarioServiceImpl();
		}

		return usuarioService;
	}

	public UsuarioDao getUsuarioDao() {
		return usuarioDao;
	}

	@Override
	public Usuario getUsuario(Long idUsuario) throws InfraestructureException {
		return getUsuarioDao().getUsuario(idUsuario);
	}

	@Override
	public List<Usuario> getListaUsuarios() throws InfraestructureException {
		return getUsuarioDao().getListaUsuarios();
	}

	@Override
	public List<LoginFallido> getListaLoginFallido(String sUser, int inicial, int cantidad) throws InfraestructureException {
		return this.getUsuarioDao().getListaLoginFallido(sUser, inicial, cantidad);
	}

	@Override
	public List<LoginFallido> getListaLoginFallidoFiltrado(String sUser, String globalSearch, String search, String sortDir, int cols,
	        int inicial, int cantidad) throws InfraestructureException {
		return getUsuarioDao().getListaLoginFallidoFiltrado(sUser, globalSearch, search, sortDir, cols, inicial, cantidad);
	}

	@Override
	public List<LoginLog> getListaLoginLogFiltrado(String sUser, String globalSearch, String search, String sortDir, int cols, int inicial,
	        int cantidad) throws InfraestructureException {
		return getUsuarioDao().getListaLoginLogFiltrado(sUser, globalSearch, search, sortDir, cols, inicial, cantidad);
	}

	@Override
	public Integer getCantidadLoginLog(String sUser, String globalSearch, String search) throws InfraestructureException {
		return getUsuarioDao().getCantidadLoginLog(sUser, globalSearch, search);
	}

	@Override
	public Integer getCantidadLoginLog(String sUser) throws InfraestructureException {
		return getUsuarioDao().getCantidadLoginLog(sUser);
	}

	@Override
	public Usuario getUsuario(String userLogin) throws InfraestructureException {
		return getUsuarioDao().getUsuario(userLogin);
	}

	@Override
	public List<Usuario> getListaUsuariosXGrupoID(String id_Users)throws InfraestructureException {
		return getUsuarioDao().getListaUsuariosXGrupoID(id_Users);
	}

	@Override
	public void enviarInforme(String email, String attachFile) throws InfraestructureException {
		ResourceBundle bundle = ResourceBundle.getBundle("alertmailDashP");
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", bundle.getString("mail.smtp.host"));
		props.setProperty("mail.smtp.starttls.enable", bundle.getString("mail.smtp.starttls.enable"));
		props.setProperty("mail.smtp.port", bundle.getString("mail.smtp.port"));
		props.setProperty("mail.smtp.user", bundle.getString("mail.smtp.user"));
		props.setProperty("mail.smtp.auth", bundle.getString("mail.smtp.auth"));

		Session sessionmail = Session.getDefaultInstance(props);
		sessionmail.setDebug(false);
		
		File file = new File(attachFile);
					
		MimeMessage message = new MimeMessage(sessionmail);			
		try {
			message.setFrom(new InternetAddress(bundle.getString("mail.send.address")));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			message.setSubject(bundle.getString("mail.msg.reporte.mapa.subject"));
			
			DataSource fds = new FileDataSource(file);				
			
			MimeBodyPart mbp1 = new MimeBodyPart();
			StringBuilder textContent = new StringBuilder();
			textContent.append(bundle.getString("mail.msg.reporte.mapa.head"));
			textContent.append(bundle.getString("mail.msg.reporte.mapa.line1"));
			textContent.append(bundle.getString("mail.msg.reporte.mapa.line2"));				
			textContent.append(bundle.getString("mail.msg.reporte.mapa.line3"));
			textContent.append(bundle.getString("mail.msg.reporte.mapa.line4"));
			textContent.append(bundle.getString("mail.msg.reporte.mapa.line5"));
			textContent.append(bundle.getString("mail.msg.reporte.mapa.line6"));
		    mbp1.setText(textContent.toString(), "ISO-8859-1", "html");
		    
		    MimeBodyPart mbp2 = new MimeBodyPart();
		    mbp2.setDataHandler(new DataHandler(fds));   
		    mbp2.setFileName(file.getName());    

		    Multipart mp = new MimeMultipart();
		    mp.addBodyPart(mbp1);
		    mp.addBodyPart(mbp2);
		    message.setContent(mp);
		    message.saveChanges();

		    // Set the Date: header
		    message.setSentDate(new java.util.Date());
			
		    Transport.send(message);
		    
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (Exception e){
			e.printStackTrace();
		}
		
		if (file.isFile()) {
			file.delete();
		}		
	}

}
