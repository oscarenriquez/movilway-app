package movilway.dao.util;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import movilway.dao.exception.InfraestructureException;

public class HibernateUtil {
	
	private static SessionFactory sessionFactory;
	private static final ThreadLocal<Session> session = new ThreadLocal<Session>();
	private static final ThreadLocal<Transaction> transaction = new ThreadLocal<Transaction>();

	public static void setSessionFactory(SessionFactory sfactory) throws InfraestructureException {
		try {
			sessionFactory = sfactory;
		} catch (HibernateException he) {
			throw new InfraestructureException(he.getMessage(), he);
		}

	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static Session getSession() throws InfraestructureException {
		synchronized (session) {
			Session s = session.get();		
			try {
				if ((s == null) || !s.isOpen()) {
					s = sessionFactory.getCurrentSession();
					session.set(s);
				}
			} catch (HibernateException he) {
				throw new InfraestructureException(he.getMessage(), he);
			}

			return s;
		}		
	}

	public static void beginTransaction() throws InfraestructureException {
		Transaction tx = transaction.get();
		try {
			if ((tx == null) || !tx.isActive()) {
				tx = getSession().beginTransaction();
				transaction.set(tx);
			}
		} catch (HibernateException he) {
			throw new InfraestructureException(he.getMessage(), he);
		}
	}

	public static void commitTransaction() throws InfraestructureException {
		Transaction tx = transaction.get();
		try {
			if ((tx != null) && !tx.wasCommitted() && !tx.wasRolledBack()) {
				tx.commit();
				transaction.set(null);
			}
		} catch (HibernateException he) {
			rollbackTransaction();
			throw new InfraestructureException(he.getMessage(), he);
		}
	}

	public static void rollbackTransaction() throws InfraestructureException {
		Transaction tx = transaction.get();
		try {
			if ((tx != null) && !tx.wasCommitted() && !tx.wasRolledBack()) {
				tx.rollback();
				transaction.set(null);
			}
		} catch (HibernateException he) {
			throw new InfraestructureException(he.getMessage(), he);
		}
	}

	public static void closeSession() throws InfraestructureException {
		try {
			Session s = session.get();
			if ((s != null) && s.isOpen()) {
				s.close();
				session.set(null);
			}
		} catch (HibernateException he) {
			throw new InfraestructureException(he.getMessage(), he);
		}
	}

	public static void flushSession() throws InfraestructureException {
		try {
			getSession().flush();
		} catch (HibernateException he) {
			throw new InfraestructureException(he.getMessage(), he);
		}
	}
}