package movilway.service;

import java.util.List;

import security.dao.domain.LoginFallido;
import security.dao.domain.LoginLog;
import movilway.dao.domain.Usuario;
import movilway.dao.exception.InfraestructureException;

public interface UsuarioService {

	public Usuario getUsuario(Long idUsuario) throws InfraestructureException;

	public List<Usuario> getListaUsuarios() throws InfraestructureException;

	public List<LoginFallido> getListaLoginFallido(String sUser, int inicial, int cantidad) throws InfraestructureException;

	public List<LoginFallido> getListaLoginFallidoFiltrado(String sUser, String globalSearch, String search, String sortDir, int cols, int inicial, int cantidad) throws InfraestructureException;

	public List<LoginLog> getListaLoginLogFiltrado(String sUser, String globalSearch, String search, String sortDir, int cols, int inicial, int cantidad) throws InfraestructureException;

	public Integer getCantidadLoginLog(String sUser, String globalSearch, String search) throws InfraestructureException;

	public Integer getCantidadLoginLog(String sUser) throws InfraestructureException;
	
	public Usuario getUsuario(String userLogin) throws InfraestructureException;
	
	public List<Usuario> getListaUsuariosXGrupoID(String id_Users)throws InfraestructureException;
}
