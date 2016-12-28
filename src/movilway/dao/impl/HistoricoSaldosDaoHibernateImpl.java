package movilway.dao.impl;

import movilway.dao.HistoricoSaldosDao;
import movilway.dao.domain.HistoricoSaldos;
import movilway.dao.util.GenericDaoHibernateApplication;

public class HistoricoSaldosDaoHibernateImpl<T> extends GenericDaoHibernateApplication<T> implements HistoricoSaldosDao<T> {

private static HistoricoSaldosDao<HistoricoSaldos> dao;
	
	private HistoricoSaldosDaoHibernateImpl(){}
	
	public static final HistoricoSaldosDao<HistoricoSaldos> getInstance(){				
		if(dao == null) {
			dao = new HistoricoSaldosDaoHibernateImpl<>();
		}			
		return dao;
	}
}
