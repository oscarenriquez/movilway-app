package movilway.service.impl;

import java.util.List;

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

}
