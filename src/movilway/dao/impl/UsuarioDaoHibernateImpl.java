package movilway.dao.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

import security.dao.domain.LoginFallido;
import security.dao.domain.LoginLog;
import movilway.dao.UsuarioDao;
import movilway.dao.domain.Usuario;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDaoHibernateApplication;

public class UsuarioDaoHibernateImpl extends GenericDaoHibernateApplication<Usuario> implements UsuarioDao {

	private static UsuarioDao usuarioDao;

	public UsuarioDaoHibernateImpl() {
		super();
	}

	public static final UsuarioDao build() {
		if (usuarioDao == null) {
			usuarioDao = new UsuarioDaoHibernateImpl();
		}

		return usuarioDao;
	}

	@Override
	public Usuario getUsuario(Long idUsuario) throws InfraestructureException {
		return loadEntity(Usuario.class, idUsuario);
	}

	@Override
	public List<Usuario> getListaUsuarios() throws InfraestructureException {
		return getAllEntities(Usuario.class);
	}

	@Override
	public List<LoginFallido> getListaLoginFallido(String sUser, int inicial, int cantidad) throws InfraestructureException {
		List<LoginFallido> listaLoginFallido = new ArrayList<LoginFallido>();

		StringBuilder sbHql = new StringBuilder();
		sbHql.append("from LoginFallido ");
		sbHql.append("where usuario = ? ");
		String[] parametros = { sUser };

		List<Object> lista = executeQueryPaginated(sbHql.toString(), parametros, inicial, cantidad);
		Iterator<Object> iter = lista.iterator();
		while (iter.hasNext()) {
			listaLoginFallido.add((LoginFallido) iter.next());
		}

		return listaLoginFallido;
	}

	@Override
	public List<LoginFallido> getListaLoginFallidoFiltrado(String sUser, String globalSearch, String search, String sortDir, int cols,
	        int inicial, int cantidad) throws InfraestructureException {
		List<LoginFallido> listaLoginFallido = new ArrayList<LoginFallido>();

		StringBuilder sbHql = new StringBuilder();
		sbHql.append("from LoginFallido ");
		sbHql.append("where usuario = ? ").append(globalSearch).append(sortDir);
		String[] parametros = new String[++cols];
		for (int i = 0; i < parametros.length; i++) {
			if (i == 0) {
				parametros[i] = sUser;
			} else {
				parametros[i] = search;
			}
		}

		List<Object> lista = executeQueryPaginated(sbHql.toString(), parametros, inicial, cantidad);
		Iterator<Object> iter = lista.iterator();
		while (iter.hasNext()) {
			listaLoginFallido.add((LoginFallido) iter.next());
		}

		return listaLoginFallido;
	}

	@Override
	public List<LoginLog> getListaLoginLogFiltrado(String sUser, String globalSearch, String search, String sortDir, int cols, int inicial,
	        int cantidad) throws InfraestructureException {
		List<LoginLog> listaLoginLog = new ArrayList<LoginLog>();

		StringBuilder sbHql = new StringBuilder();
		sbHql.append("from LoginLog  ");
		sbHql.append("where usuario.user  = ? ").append(globalSearch).append(sortDir);
		String[] parametros = new String[++cols];
		for (int i = 0; i < parametros.length; i++) {
			if (i == 0) {
				parametros[i] = sUser;
			} else {
				parametros[i] = search;
			}
		}

		List<Object> lista = executeQueryPaginated(sbHql.toString(), parametros, inicial, cantidad);
		Iterator<Object> iter = lista.iterator();
		while (iter.hasNext()) {
			listaLoginLog.add((LoginLog) iter.next());
		}

		return listaLoginLog;
	}

	@Override
	public Integer getCantidadLoginLog(String sUser, String globalSearch, String search) throws InfraestructureException {
		StringBuilder hql = new StringBuilder();
		hql.append("select count(*) from ").append(LoginLog.class.getName()).append(" where usuario.user = ? ").append(globalSearch);
		Object[] parameters = new Object[5];
		parameters[0] = sUser;
		parameters[1] = search;
		parameters[2] = search;
		parameters[3] = search;
		parameters[4] = search;

		List<Object> list = executeQuery(hql.toString(), parameters);
		Iterator<Object> iter = list.iterator();
		Long cantidad = (long) 0;
		while (iter.hasNext()) {
			cantidad = (Long) iter.next();
		}

		return cantidad.intValue();
	}

	@Override
	public Integer getCantidadLoginLog(String sUser) throws InfraestructureException {
		StringBuilder hql = new StringBuilder();
		hql.append("select count(*) from ").append(LoginLog.class.getName()).append(" where usuario.user = ? ");
		Object[] parameters = new Object[1];
		parameters[0] = sUser;

		List<Object> list = executeQuery(hql.toString(), parameters);
		Iterator<Object> iter = list.iterator();
		Long cantidad = (long) 0;
		while (iter.hasNext()) {
			cantidad = (Long) iter.next();
		}

		return cantidad.intValue();
	}

	@Override
	public Usuario getUsuario(String userLogin) throws InfraestructureException {
		try {
			StringBuilder hql = new StringBuilder();
			hql.append("from ").append(Usuario.class.getName()).append(" where upper(user) = :userLogin and enabled = true ");
			
			Session session = getSession();
			
			Query query = session.createQuery(hql.toString());
			query.setString("userLogin", userLogin);						
			
			Usuario user = (Usuario) query.uniqueResult();
			
			return user;
		} catch (HibernateException he){
			throw new InfraestructureException(he);
		}		
	}
	
	@Override
	public List<Usuario> getListaUsuariosXGrupoID(String id_Users) throws InfraestructureException {
		List<Usuario> listaUsuario = new ArrayList<Usuario>();

		StringBuilder sbHql = new StringBuilder();
		sbHql.append(" from Usuario u");
		sbHql.append(" where u.id in ( ").append(id_Users).append(" ) ");

		Query query = getSession().createQuery(sbHql.toString());

		@SuppressWarnings("unchecked")
		List<Object> lista = query.list();

		for (Object obj : lista) {
			listaUsuario.add((Usuario) obj);
		}

		return listaUsuario;
	}
}
